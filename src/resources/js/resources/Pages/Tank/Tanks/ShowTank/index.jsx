import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tank } from "../../../../http/entities/Tank";
import { showTankPage } from "../../../../constants/strings/fa";
import { BASE_PATH } from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import Loading from "../../../../common/Loading";

const ShowTank = () => {
    const tank = new Tank();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const tankId = params.id;
    const [showTank, setShowTank] = useState(null);
    const [loading, setLoading] = useState(false);

    const getTank = async () => {
        setLoading(true);
        const result = await tank.getTank(tankId);
        if (result === null) {
            dispatch(setMessageAction(tank.errorMessage, tank.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        setShowTank(result.item);
    };
    const objToArr = showTank && Object.entries(showTank);

    useEffect(() => {
        dispatch(clearMessageAction());
        getTank();
    }, []);

    const renderTank = () => {
        return objToArr?.map((item, index) => {
            return (
                <div className="flex text-sm" key={index}>
                    <p className="flex-1 px-2 py-2 text-primaryColorDark">
                        {showTankPage[item[0]]} :{" "}
                    </p>
                    <p className="flex-[2] px-2 py-2 text-red-500">{item[1]}</p>
                </div>
            );
        });
    };
    return (
        <div className="flex flex-col bg-white rounded-xl shadow-lg px-10 py-10 mx-3">
            {loading && <Loading />}
            {messageState.message !== null && (
                <span className="py-2 text-center rounded-lg bg-red-200 text-red-500 border border-red-500">
                    {messageState.message}
                </span>
            )}
            {showTank && messageState.message === null && !loading && (
                <>
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex flex-col">
                            <h2 className="font-bold text-primaryColorDark">
                                {showTankPage._title}
                            </h2>
                            <h3 className="text-primaryColor text-sm mt-1 ">
                                {showTankPage._subTitle}
                            </h3>
                        </div>
                        <div>
                            <Link
                                to={`${BASE_PATH}/tank/edit/${tankId}`}
                                className="py-2 px-4 bg-btnPrimaryColor text-white text-sm border-2 border-btnPrimaryColor duration-100 font-IRANSansWeb font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-navBgColor focus:ring-opacity-75"
                            >
                                {showTankPage.edit}
                            </Link>
                        </div>
                    </div>
                    {renderTank()}
                </>
            )}
        </div>
    );
};

export default ShowTank;
