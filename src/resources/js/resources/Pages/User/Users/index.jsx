import { useEffect, useState } from "react";
import { User } from "../../../http/entities/User";
import { addUserPage, general, UserPage } from "../../../constants/strings/fa";
import Operation from "../../../components/Table/Operation";
import Table from "../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { BASE_PATH } from "../../../constants";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";

const Users = () => {
    const user = new User();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const filterdData = data.sort((a, b) => b.id - a.id);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const getUsers = async () => {
        setLoading(true);
        const result = await user.getAllUsers(pageSize, currentPage);
        if (result === null) {
            dispatch(setMessageAction(user.errorMessage, user.errorCode));
            setLoading(false);

            return;
        }
        setTimeout(() => setLoading(false), 200);
        setData(result.items);
        setCount(result.count);
    };

    useEffect(() => {
        getUsers();
    }, [currentPage]);

    const renderHeader = () => {
        return (
            <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addUserPage.name}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addUserPage.family}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addUserPage.mobile}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {general.actions}
                </th>
            </tr>
        );
    };

    const renderItems = () => {
        return filterdData.map((item, index) => {
            return (
                <tr key={item.id} id={item.id} className="">
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl">
                        {item.name}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.family}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.mobile}
                    </td>
                    <Operation
                        link={`${BASE_PATH}/user/edit/${item.id}`}
                        showLink={`${BASE_PATH}/user/show/${item.id}`}
                    />
                </tr>
            );
        });
    };
    return (
        <div className="container flex flex-col">
            {messageState.message !== null && (
                <span className="py-2 text-center rounded-lg bg-red-200 text-red-500 border border-red-500">
                    {messageState.message}
                </span>
            )}
            {data && messageState.message === null && (
                <div>
                    <Table
                        pageSize={pageSize}
                        renderHeader={renderHeader}
                        renderItems={renderItems}
                        items={data}
                        count={count}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        title={`${UserPage._title}`}
                        subTitle={`${UserPage._subTitle}`}
                        loading={loading}
                    />
                </div>
            )}
        </div>
    );
};

export default Users;
