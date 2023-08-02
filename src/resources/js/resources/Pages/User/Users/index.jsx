import React, { useEffect, useState } from "react";
import { User } from "../../../http/entities/User";
import { addUserPage, general, UserPage } from "../../../constants/strings/fa";
import Operation from "../../../components/Table/Operation";
import Table from "../../../components/Table/Table";
import { useSelector } from "react-redux";
import Loading from "../../../common/Input/Loading";

const Users = () => {
    const user = new User();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;
    const userState = useSelector((state) => state.userReducer);
    const filterdData = data
        .sort((a, b) => b.id - a.id)
        .slice(firstIndex, lastIndex);
    const getUsers = async () => {
        setLoading(true);
        const result = await user.getAllUsers();
        if (result !== null) {
            setLoading(false);
            setData(result.items);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const renderHeader = () => {
        return (
            <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {general.row}
                </th>
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
        return (
            filterdData &&
            filterdData.map((item, index) => {
                return (
                    <tr key={index} className="">
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.id}
                        </td>
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl">
                            {item.name}
                        </td>
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.family}
                        </td>
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.mobile}
                        </td>
                        <Operation />
                    </tr>
                );
            })
        );
    };
    return (
        <div className="container">
            {loading && <Loading />}
            {data && (
                <div>
                    <Table
                        pageSize={pageSize}
                        renderHeader={renderHeader}
                        renderItems={renderItems}
                        items={data}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        title={`${UserPage._title}`}
                        subTitle={`${UserPage._subTitle}`}
                    />
                </div>
            )}
        </div>
    );
};

export default Users;
