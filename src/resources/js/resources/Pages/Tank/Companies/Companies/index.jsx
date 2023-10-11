import { useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import {
    addCompanyPage,
    general,
    CompaniesPage,
} from "../../../../constants/strings/fa";
import Operation from "../../../../components/Table/Operation";
import { Company } from "../../../../http/entities/Copmany";
import { BASE_PATH } from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setMessageAction } from "../../../../state/message/messageAction";

const Companies = () => {
    const company = new Company();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const filterdData = data.sort((a, b) => b.id - a.id);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();

    const getCompanies = async () => {
        setLoading(true);
        const result = await company.getAllCompanies(pageSize, currentPage);
        if (result === null) {
            dispatch(setMessageAction(company.errorMessage, company.errorCode));
            setLoading(false);

            return;
        }
        setTimeout(() => setLoading(false), 200);
        setData(result.items);
        setCount(result.count);
    };
    useEffect(() => {
        getCompanies();
    }, [currentPage]);

    const renderHeader = () => {
        return (
            <tr className="">
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addCompanyPage.companyName}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {general.actions}
                </th>
            </tr>
        );
    };

    const renderItems = () => {
        return filterdData.map((item) => {
            return (
                <tr key={item.id} className="">
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl">
                        {item.name}
                    </td>
                    <Operation
                        link={`${BASE_PATH}/company/edit/${item.id}`}
                        addLink={`${BASE_PATH}/company/tank/${item.id}`}
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
                        title={`${CompaniesPage._title}`}
                        subTitle={`${CompaniesPage._subTitle}`}
                        loading={loading}
                    />
                </div>
            )}
        </div>
    );
};

export default Companies;
