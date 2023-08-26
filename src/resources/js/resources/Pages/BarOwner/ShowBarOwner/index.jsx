import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BarOwner } from "../../../http/entities/BarOwner";
import { showBarOwnerPage } from "../../../constants/strings/fa";
import { BASE_PATH } from "../../../constants";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../common/Loading";

const ShowBarOwner = () => {
    const barOwner = new BarOwner();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const barOwnerId = params.id;
    const [showBarOwner, setShowBarOwner] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const getBarOwner = async () => {
        setLoading(true);
        const result = await barOwner.getBarOwner(barOwnerId);
        if (result === null) {
            dispatch(
                setMessageAction(barOwner.errorMessage, barOwner.errorCode)
            );
            setLoading(false);

            return;
        }

        setLoading(false);
        setShowBarOwner(result.item);
    };
    const objToArr = showBarOwner && Object.entries(showBarOwner);

    useEffect(() => {
        dispatch(clearMessageAction());
        getBarOwner();
    }, []);

    const renderBarOwner = () => {
        return objToArr?.map((item, index) => {
            return (
                <div className="flex text-sm" key={index}>
                    <p className="flex-1 px-2 py-2 text-primaryColorDark">
                        {showBarOwnerPage[item[0]]} :{" "}
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
            {showBarOwner && messageState.message === null && !loading && (
                <>
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex flex-col">
                            <h2 className="font-bold text-primaryColorDark">
                                {showBarOwnerPage._title}
                            </h2>
                            <h3 className="text-primaryColor text-sm mt-1 ">
                                {showBarOwnerPage._subTitle}
                            </h3>
                        </div>
                        <div>
                            <Link
                                to={`${BASE_PATH}/barOwner/edit/${barOwnerId}`}
                                className="py-2 px-4 bg-btnPrimaryColor text-white text-sm border-2 border-btnPrimaryColor duration-100 font-IRANSansWeb font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-navBgColor focus:ring-opacity-75"
                            >
                                {showBarOwnerPage.edit}
                            </Link>
                        </div>
                    </div>
                    {renderBarOwner()}
                </>
            )}
        </div>
    );
};

export default ShowBarOwner;
