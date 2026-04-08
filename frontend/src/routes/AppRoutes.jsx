import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood.jsx'
import { Profile } from '../pages/food-partner/Profile.jsx'
import Saved from '../pages/Saved';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
      <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
      <Route path="/create-food" element={<CreateFood />} />
      <Route path="/food-partner/profile/:id?" element={<Profile />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default AppRoutes