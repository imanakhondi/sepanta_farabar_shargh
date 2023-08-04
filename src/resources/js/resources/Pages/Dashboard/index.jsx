import React, { useEffect, useState } from "react";
import { User } from "../../http/entities/User";
import { Tank } from "../../http/entities/Tank";
import { Driver } from "../../http/entities/Driver";
import { Car } from "../../http/entities/Car";

const Dashboard = () => {
    const user = new User();
    const tank = new Tank();
    const driver = new Driver();
    const car = new Car();
    const [usersCount, setUsersCount] = useState(null);
    const [tanksCount, setTanksCount] = useState(null);
    const [driversCount, setDriversCount] = useState(null);
    const [carsCount, setCarsCount] = useState(null);

    const getData = async () => {
        const users = await user.getAllUsers();
        const tanks = await tank.getAllTanks();
        const drivers = await driver.getAllDrivers();
        const cars = await car.getAllCars();
        setUsersCount(users.count);
        setTanksCount(tanks.count);
        setDriversCount(drivers.count);
        setCarsCount(cars.count);
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <h1>تعداد کاربران :</h1>
            <h2>{usersCount}</h2>
            <h1>تعداد تانکرها :</h1>
            <h2>{tanksCount}</h2>
            <h1>تعداد رانندگان :</h1>
            <h2>{driversCount}</h2>
            <h1>تعداد ماشین ها :</h1>
            <h2>{carsCount}</h2>
        </div>
    );
};

export default Dashboard;
