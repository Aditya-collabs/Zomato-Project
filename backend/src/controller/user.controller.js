const saveModel = require('../models/save.model');
const foodModel = require('../models/food.model');

// return list of foods saved by authenticated user
async function getSavedVideos(req, res) {
    const user = req.user;

    // find all save documents for user and populate food details
    const saves = await saveModel.find({ user: user._id }).populate('food');

    const savedFoods = saves.map((s) => s.food);

    res.status(200).json({
        message: 'Saved videos fetched successfully',
        saved: savedFoods
    });
}

module.exports = {
    getSavedVideos
};
