import { useEffect, useState } from "react";
import { Tank } from "../../../../http/entities/Tank";
import { Repair } from "../../../../http/entities/Repair";
import { repairTankPage, general } from "../../../../constants/strings/fa";
import Operation from "../../../../components/Table/Operation";
import { BASE_PATH } from "../../../../constants";
import Table from "../../../../components/Table/Table";
import Modal from "../../../../common/Modal";
import FormikForm from "../../../../common/FormikForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import FormikControl from "../../../../common/FormikControl";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
    repairDate: "",
    repairCost: "",
    repairDesc: "",
};
const validationSchema = Yup.object({
    repairDate: Yup.string(),
    repairCost: Yup.string(),
    repairDesc: Yup.string(),
});

const RepairsTank = () => {
    const params = useParams();
    const tankId = params.id;
    const navigate = useNavigate();
    const repair = new Repair();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const filterdData = data.sort((a, b) => b.id - a.id);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    useEffect(() => {
        const getRepairsTank = async () => {
            setLoading(true);
            const result = await repair.getAllRepairsTank(
                tankId,
                pageSize,
                currentPage
            );
            if (result === null) {
                dispatch(setMessageAction(repair.errorMessage, repair.errorCode));
                setLoading(false);
    
                return;
            }
            setTimeout(() => setLoading(false), 200);
            setData(result.items);
            setCount(result.count);
        };
        getRepairsTank();
    }, [currentPage]);

    const onSubmit = async (values) => {
        const { repairDate, repairCost, repairDesc } = values;
        setLoading(true);
        const result = await repair.storeRepairTank(
            tankId,
            repairDate,
            repairCost,
            repairDesc
        );

        if (result === null) {
            dispatch(setMessageAction(repair.errorMessage, repair.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${repairTankPage.submitted}`);
        window.location.reload();
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });
   
    const renderForm = () => {
        return (
            <FormikForm
                onSubmit={formik.handleSubmit}
                loading={loading}
                error={messageState}
                title={`${repairTankPage._titleAdd}`}
                subTitle={`${repairTankPage._subTitleAdd}`}
                onCancel={() =>setModal(false)}
            >
                <FormikControl
                    control="date"
                    name="repairDate"
                    formik={formik}
                    pageString={repairTankPage}
                    onChange={(event) => {
                        formik.setFieldValue("repairDate", event.toString());
                    }}
                />
                <FormikControl
                    control="input"
                    name="repairCost"
                    formik={formik}
                    pageString={repairTankPage}
                />
                <FormikControl
                    control="textarea"
                    name="repairDesc"
                    formik={formik}
                    pageString={repairTankPage}
                />
            </FormikForm>
        );
    };

    const renderHeader = () => {
        return (
            <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {repairTankPage.repairDate}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {repairTankPage.repairCost}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {repairTankPage.repairDesc}
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
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl">
                        {item.repairDate}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.cost}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.description}
                    </td>
                    <Operation
                        link={`${BASE_PATH}/company/tank/repairs/edit/${tankId}/${item.id}`}
                        // showLink={`${BASE_PATH}/tank/show/${item.id}`}
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
                                title={`${repairTankPage._title}`}
                                subTitle={`${repairTankPage._subTitle}`}
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

export default RepairsTank;
