const foodModel = require('../models/food.model')
const storageService = require('../service/storage.service')
const likeModel = require('../models/likes.model')
const { v4: uuid } = require('uuid') // this will give us a special unique id
const saveModel = require('../models/save.model')


async function createFood(req, res) {

    if (!req.file) {
        return res.status(400).json({
            message: "Video file is required"
        });
    }

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "Food Created Successfully",
        food: foodItem
    })
}

async function getFoodItems(req, res) {
    // fetch all food items from database
    const foodItems = await foodModel.find({});

    // if we have a user, compute which items are liked/saved by them
    let itemsWithStatus = [];
    if (req.user) {
        const userId = req.user._id;
        const foodIds = foodItems.map((f) => f._id);

        // fetch likes and saves in bulk
        const userLikes = await likeModel.find({
            user: userId,
            food: { $in: foodIds }
        });
        const likedSet = new Set(userLikes.map((l) => l.food.toString()));

        const userSaves = await saveModel.find({
            user: userId,
            food: { $in: foodIds }
        });
        const savedSet = new Set(userSaves.map((s) => s.food.toString()));

        // count saves for each food (aggregate)
        const saveCountsAgg = await saveModel.aggregate([
            { $match: { food: { $in: foodIds } } },
            { $group: { _id: '$food', count: { $sum: 1 } } }
        ]);
        const saveCountsMap = {};
        saveCountsAgg.forEach((sc) => {
            saveCountsMap[sc._id.toString()] = sc.count;
        });

        itemsWithStatus = foodItems.map((item) => {
            const obj = item.toObject();
            obj.isLiked = likedSet.has(item._id.toString());
            obj.isSaved = savedSet.has(item._id.toString());
            obj.likes = obj.likeCount || 0;
            obj.saves = saveCountsMap[item._id.toString()] || 0;
            return obj;
        });
    } else {
        // no authenticated user, just return counts
        itemsWithStatus = foodItems.map((item) => {
            const obj = item.toObject();
            obj.likes = obj.likeCount || 0;
            obj.saves = 0;
            obj.isLiked = false;
            obj.isSaved = false;
            return obj;
        });
    }

    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems: itemsWithStatus
    });
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        });

        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        }, { new: true });

        return res.status(200).json({
            message: "Food unliked successfully",
            likeCount: updatedFood.likeCount,
            isLiked: false
        });
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    });

    const updatedFood = await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    }, { new: true });

    res.status(201).json({
        message: "Food liked successfully",
        likeCount: updatedFood.likeCount,
        isLiked: true
    });
}

async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        });

        return res.status(200).json({
            message: "Food unsaved successfully",
            isSaved: false
        });
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    });

    res.status(201).json({
        message: "Food saved successfully",
        isSaved: true
    });
}


module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood
}