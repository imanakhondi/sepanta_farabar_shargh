import { useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import {
    showBarOwnerPage,
    general,
    BarOwnerPage,
} from "../../../constants/strings/fa";
import Operation from "../../../components/Table/Operation";
import { BarOwner } from "../../../http/entities/BarOwner";
import { BASE_PATH } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";

const BarOwners = () => {
    const barOwner = new BarOwner();
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

    const getBarOwners = async () => {
        setLoading(true);
        const result = await barOwner.getAllBarOwners(pageSize, currentPage);
        if (result === null) {
            dispatch(
                setMessageAction(barOwner.errorMessage, barOwner.errorCode)
            );
            setLoading(false);

            return;
        }
        setTimeout(() => setLoading(false), 200);
        setData(result.items);
        setCount(result.count);
    };
    useEffect(() => {
        getBarOwners();
    }, [currentPage]);

    const renderHeader = () => {
        return (
            <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {showBarOwnerPage.companyName}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {showBarOwnerPage.name}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {showBarOwnerPage.family}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {showBarOwnerPage.mobile}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {showBarOwnerPage.tankNo}
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
                        {item.companyName}
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
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.tankNo}
                    </td>
                    <Operation
                        link={`${BASE_PATH}/barOwner/edit/${item.id}`}
                        showLink={`${BASE_PATH}/barOwner/show/${item.id}`}
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
                        title={`${BarOwnerPage._title}`}
                        subTitle={`${BarOwnerPage._subTitle}`}
                        loading={loading}
                    />
                </div>
            )}
        </div>
    );
};

export default BarOwners;
