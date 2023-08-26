import { useEffect, useState } from "react";
import { Dashboard } from "../../http/entities/Dashboard";
import {
    clearMessageAction,
    setMessageAction,
} from "../../state/message/messageAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../common/Loading";

const DashboardPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const dashboard = new Dashboard();

    const getData = async () => {
        setLoading(true);
        const result = await dashboard.getDashboard();
        if (result === null) {
            dispatch(
                setMessageAction(dashboard.errorMessage, dashboard.errorCode)
            );
            setLoading(false);

            return;
        }
            setTimeout(() => setLoading(false), 200);
            setData(result);
    };
    useEffect(() => {
        dispatch(clearMessageAction());
        getData();
    }, []);
    return (
        <div className="flex flex-col">
            {loading && <Loading />}
            {messageState.message && (
                <span className="py-2 text-center rounded-lg bg-red-200 text-red-500 border border-red-500">
                    {messageState.message}
                </span>
            )}
            {!loading && data && (
                <>
                    <h1>تعداد کاربران :</h1>
                    <h2>{data.usersCount}</h2>
                    <h1>تعداد تانکرها :</h1>
                    <h2>{data.trucksCount}</h2>
                </>
            )}
        </div>
    );
};
export default DashboardPage;
