const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');


async function getFoodPartnerProfile(req, res) {
    console.log("Backend: Fetching profile for ID:", req.params.id);
    const foodPartnerId = req.params.id || req.user.id; // Agar id parameter nahi diya gaya hai toh authenticated user ka profile return karega

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });
    foodPartner.foodItems = foodItemsByFoodPartner; // Food Partner ke saath uske food items bhi attach kar rahe hain

    if (!foodPartner) {
        return res.status(404).json({ error: "Food Partner not found" });
    }

    res.status(200).json({
        message: "Food Partner profile retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(), //toObject() use karke tum usse plain JavaScript object mein convert kar rahe ho.
            foodItems: foodItemsByFoodPartner 
        }
    });
}

module.exports = {
    getFoodPartnerProfile
}