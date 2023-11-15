import { useFormik } from "formik";
import FormikForm from "../../common/FormikForm";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useState } from "react";
import { general, reportsPage } from "../../constants/strings/fa";
import FormikControl from "../../common/FormikControl";
import Table from "../../components/Table/Table";
import { BASE_PATH } from "../../constants";
import Operation from "../../components/Table/Operation";

const initialValues = {
    date: "",
    name: "",
};

const validationSchema = Yup.object({
    date: Yup.string(),
});

const Reports = () => {
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const filterdData = data.sort((a, b) => b.id - a.id);

    const onSubmit = (values) => {
        console.log(values);
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });

    const renderHeader = () => {
        return (
            <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {reportsPage.driverName}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {reportsPage.irNo}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {reportsPage.tankNo}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {reportsPage.startPoint}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {reportsPage.endPoint}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {general.actions}
                </th>
            </tr>
        );
    };

    const renderItems = () => {
        const cancelHandler = (id) => {
            console.log(id);
        };
        return filterdData.map((item) => {
            return (
                <tr key={item.id} id={item.id} className="">
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl">
                        {item.driverName} {item.driverFamily}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.truckIrlNo}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.tankNo}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.firstPointName}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.endPointName}
                    </td>
                    <Operation
                        link={`${BASE_PATH}/introduction/car/edit/${item.id}`}
                        // continueLink={`${BASE_PATH}/introduction/car/complete/${introductionId}/${item.id}`}
                        onCancel={() => cancelHandler(item.id)}
                    />
                </tr>
            );
        });
    };

    return (
        <div>
            <FormikForm
                onSubmit={formik.handleSubmit}
                loading={loading}
                error={messageState}
                title={`${reportsPage._title}`}
                subTitle={`${reportsPage._subTitle}`}
            >
                <FormikControl
                    control="date"
                    name="date"
                    formik={formik}
                    pageString={reportsPage}
                    onChange={(event) => {
                        formik.setFieldValue("date", event.toString());
                    }}
                />
                <FormikControl
                    control="input"
                    name="name"
                    formik={formik}
                    pageString={reportsPage}
                />
            </FormikForm>

            <div className="container flex flex-col">
                {messageState.message !== null && (
                    <span className="py-2 text-center rounded-lg bg-red-200 text-red-500 border border-red-500">
                        {messageState.message}
                    </span>
                )}
                {/* {data && messageState.message === null && ( */}
                {true && (
                    <div>
                        <Table
                            pageSize={pageSize}
                            renderHeader={renderHeader}
                            renderItems={renderItems}
                            items={data}
                            count={count}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            loading={loading}
                            // showBTN
                            // modal={modal}
                            // setModal={setModal}
                            // addLink={`${BASE_PATH}/company/tank/add/${companyId}`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
