import { useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import {
    addTankPage,
    general,
    TankPage,
} from "../../../../constants/strings/fa";
import Operation from "../../../../components/Table/Operation";
import { Tank } from "../../../../http/entities/Tank";
import { BASE_PATH } from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import { useFormik } from "formik";

import * as Yup from "yup";
import FormikForm from "../../../../common/FormikForm";
import FormikControl from "../../../../common/FormikControl";
import Modal from "../../../../common/Modal";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const initialValues = {
    tankNo: "",
    psiDate: "",
    testValidityDate: "",
    capotageDate: "",
};
const validationSchema = Yup.object({
    tankNo: Yup.string(),
    psiDate: Yup.string(),
    testValidityDate: Yup.string(),
    capotageDate: Yup.string(),
});

const Tanks = () => {
    const tank = new Tank();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const filterdData = data.sort((a, b) => b.id - a.id);
    const params = useParams();
    const companyId = params.id;

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        const { tankNo, psiDate, testValidityDate, capotageDate } = values;
        setLoading(true);
        const result = await tank.storeTank(
            companyId,
            tankNo,
            psiDate,
            testValidityDate,
            capotageDate
        );

        if (result === null) {
            dispatch(setMessageAction(tank.errorMessage, tank.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${addTankPage.submitted}`);
        window.location.reload();
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });

    const getAllTanks = async () => {
        setLoading(true);
        const result = await tank.getAllTanks(companyId, pageSize, currentPage);
        if (result === null) {
            dispatch(setMessageAction(tank.errorMessage, tank.errorCode));
            setLoading(false);

            return;
        }
        setTimeout(() => setLoading(false), 200);
        setData(result.items);
        setCount(result.count);
    };

    useEffect(() => {
        getAllTanks();
    }, [currentPage]);

    const renderForm = () => {
        return (
            <FormikForm
                onSubmit={formik.handleSubmit}
                loading={loading}
                error={messageState}
                title={`${addTankPage._title}`}
                subTitle={`${addTankPage._subTitle}`}
                onCancel={() =>setModal(false)}
            >
                <FormikControl
                    control="input"
                    name="tankNo"
                    formik={formik}
                    pageString={addTankPage}
                    type="number"
                />
                <FormikControl
                    control="date"
                    name="psiDate"
                    formik={formik}
                    pageString={addTankPage}
                    onChange={(event) => {
                        formik.setFieldValue("psiDate", event.toString());
                    }}
                />
                <FormikControl
                    control="date"
                    name="testValidityDate"
                    formik={formik}
                    pageString={addTankPage}
                    onChange={(event) => {
                        formik.setFieldValue(
                            "testValidityDate",
                            event.toString()
                        );
                    }}
                />
                <FormikControl
                    control="date"
                    name="capotageDate"
                    formik={formik}
                    pageString={addTankPage}
                    onChange={(event) => {
                        formik.setFieldValue("capotageDate", event.toString());
                    }}
                />
            </FormikForm>
        );
    };

    const renderHeader = () => {
        return (
            <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addTankPage.tankNo}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addTankPage.capotageDate}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addTankPage.psiDate}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addTankPage.testValidityDate}
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
                <tr key={item.id} id={item.id} className="">
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl">
                        {item.tankNo}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.capotageDate}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.psiDate}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.testValidityDate}
                    </td>
                    <Operation
                        link={`${BASE_PATH}/company/tank/edit/${item.id}`}
                        showLink={`${BASE_PATH}/company/tank/show/${item.id}`}
                        repairLink={`${BASE_PATH}/company/tank/repairs/${item.id}`}
                    />
                </tr>
            );
        });
    };
    return (
        <>
            {modal ? (
                <Modal
                    modal={modal}
                    setModal={setModal}
                    customStyle="!w-full !bg-transparent shadow-none"
                >
                    {renderForm()}
                </Modal>
            ) : (
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
                                title={`${TankPage._title}`}
                                subTitle={`${TankPage._subTitle}`}
                                loading={loading}
                                showBTN
                                modal={modal}
                                setModal={setModal}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Tanks;
