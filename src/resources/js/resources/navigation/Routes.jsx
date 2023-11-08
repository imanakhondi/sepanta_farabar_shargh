import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Pages from "../pages";
import PanelLayout from "../layout/PanelLayout";

export default function authRoute() {
    return (
        <Routes>
            <Route path="/" element={<Pages.HomePage />} />
            <Route path="login" element={<Pages.LoginUser />} />
            <Route path="signup" element={<Pages.Signup />} />
            <Route path="forget-password" element={<Pages.ForgetPassword />} />
            <Route path="panel" element={<PanelLayout />}>
                <Route path="dashboard" element={<Pages.DashboardPage />} />
                <Route path="users" element={<Pages.Users />} />
                <Route
                    path="change-password"
                    element={<Pages.ChangePassword />}
                />

                <Route path="user/show/:id" element={<Pages.ShowUser />} />
                <Route path="user/add" element={<Pages.AddUser />} />
                <Route path="user/edit/:id" element={<Pages.Edituser />} />

                <Route path="cars" element={<Pages.Cars />} />
                <Route path="car/show/:id" element={<Pages.ShowCar />} />
                <Route path="car/add" element={<Pages.AddCars />} />
                <Route path="car/edit/:id" element={<Pages.EditCars />} />

                <Route path="drivers" element={<Pages.Drivers />} />
                <Route path="driver/show/:id" element={<Pages.ShowDriver />} />
                <Route path="driver/add" element={<Pages.AddDrivers />} />
                <Route path="driver/edit/:id" element={<Pages.EditDrivers />} />

                <Route path="companies" element={<Pages.Companies />} />
                <Route path="company/add" element={<Pages.AddCompany />} />
                <Route path="company/edit/:id" element={<Pages.EditCompany />} />

                <Route path="company/tank/:id" element={<Pages.Tanks />} />
                <Route path="company/tank/show/:id" element={<Pages.ShowTank />} />
                {/* <Route path="company/tank/add/:id" element={<Pages.AddTanks />} /> */}
                <Route path="company/tank/edit/:id" element={<Pages.EditTanks />} />

                <Route path="company/tank/repairs/:id" element={<Pages.RepairsTank />} />
                <Route path="company/tank/repairs/edit/:params/:id" element={<Pages.EditRepairTank />} />

                <Route path="introductions" element={<Pages.Introductions />} />
                <Route path="introduction/show/:id" element={<Pages.ShowIntroduction />} />
                <Route path="introduction/add" element={<Pages.AddIntroduction />} />
                <Route path="introduction/edit/:id" element={<Pages.EditIntroduction />} />
                <Route path="introduction/cars/:id" element={<Pages.CarsIntroduction />} />
                <Route path="introduction/car/edit/:carId" element={<Pages.EditCarIntroduction />} />
                <Route path="introduction/car/complete/:params/:carid" element={<Pages.CompleteCarIntroduction />} />

                <Route path="cities" element={<Pages.Cities />} />
                <Route path="city/add" element={<Pages.AddCity />} />
                <Route path="city/edit/:id" element={<Pages.EditCity />} />
                
                <Route path="barowners" element={<Pages.BarOwners />} />
                <Route path="barowner/show/:id" element={<Pages.ShowBarOwner />} />
                <Route path="barowner/add" element={<Pages.AddBarOwners />} />
                <Route path="barowner/edit/:id" element={<Pages.EditBarOwners />} />
            </Route>
        </Routes>
    );
}
