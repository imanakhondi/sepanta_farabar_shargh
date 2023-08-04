import React, { useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import {
    addDriverPage,
    general,
    DriverPage,
} from "../../../constants/strings/fa";
import Operation from "../../../components/Table/Operation";
import { Driver } from "../../../http/entities/Driver";
import Loading from "../../../common/Input/Loading";

const Drivers = () => {
    const driver = new Driver();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    // const lastIndex = currentPage * pageSize;
    // const firstIndex = lastIndex - pageSize;
    const filterdData = data.sort((a, b) => b.id - a.id);
    // .slice(firstIndex, lastIndex);
    const getDrivers = async () => {
        setLoading(true);
        const result = await driver.getAllDrivers(pageSize, currentPage);
        if (result !== null) {
            setLoading(false);
            setData(result.items);
            setCount(result.count);
        }
    };

    useEffect(() => {
        getDrivers();
    }, []);

    const renderHeader = () => {
        return (
            <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {general.row}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addDriverPage.name}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addDriverPage.family}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addDriverPage.mobile}
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
                    <Operation link={`/panel/driver/edit/${item.id}`} />
                </tr>
            );
        });
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
                        count={count}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        title={`${DriverPage._title}`}
                        subTitle={`${DriverPage._subTitle}`}
                    />
                </div>
            )}
        </div>
    );
};

export default Drivers;
