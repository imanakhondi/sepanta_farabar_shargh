import React, { useEffect, useState } from 'react';
import { User } from '../../../http/entities/User';
import { Link, useParams } from 'react-router-dom';
import { BASE_PATH } from '../../../constants';
import { showUserPage } from '../../../constants/strings/fa';

const ShowUser = () => {
    const user = new User();
    const params = useParams();
    const userId = params.id;
    const [showCar, setShowCar] = useState(null);
    const getCar = async () => {
        const result = await user.getUser(userId);
        setShowCar(result.item);
    };
    const objToArr = showCar && Object.entries(showCar);

    useEffect(() => {
        getCar();
    }, []);

    const renderCar = () => {
        return objToArr?.map((item, index) => {
            return (
                <div className="flex text-sm" key={index}>
                    <p className="flex-1 px-2 py-2 text-primaryColorDark">{showUserPage[item[0]]} : </p>
                    <p className="flex-[2] px-2 py-2 text-red-500">{item[1]}</p>
                </div>
            );
        });
    };
    return (
        <div className="flex flex-col bg-white rounded-xl shadow-lg px-10 py-10 mx-3">
            <div className="flex justify-between items-center mb-5">
                <div className="flex flex-col">
                    <h2 className="font-bold text-primaryColorDark">
                        {showUserPage._title}
                    </h2>
                    <h3 className="text-primaryColor text-sm mt-1 ">
                        {showUserPage._subTitle}
                    </h3>
                </div>
                <div>
                    <Link
                        to={`${BASE_PATH}/user/edit/${userId}`}
                        className="py-2 px-4 bg-btnPrimaryColor text-white text-sm border-2 border-btnPrimaryColor duration-100 font-IRANSansWeb font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-navBgColor focus:ring-opacity-75"
                    >
                        {showUserPage.edit}
                    </Link>
                </div>
            </div>
            {renderCar()}
        </div>
    );
}
 
export default ShowUser;