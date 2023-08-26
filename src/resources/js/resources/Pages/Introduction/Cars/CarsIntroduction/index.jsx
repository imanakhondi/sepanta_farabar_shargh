import { useEffect, useState } from "react";
import {
    general,
    addCarIntroductionPage,
    CarsIntroductionPage,
} from "../../../../constants/strings/fa";
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
import { CarIntroduction } from "../../../../http/entities/CarIntroduction";
import { toast } from "react-toastify";

const dummyData = [
    {
        id: 1,
        name: "یارمحمد گلی",
        irNo: "21ع426-12",
        tankNo: "123",
        nationalNo: "0741111111",
        endPoint: "دوغارون",
    },
    {
        id: 2,
        name: "یارمحمد گلی",
        irNo: "21ع426-12",
        tankNo: "123",
        nationalNo: "0741111111",
        endPoint: "دوغارون",
    },
    {
        id: 3,
        name: "یارمحمد گلی",
        irNo: "21ع426-12",
        tankNo: "123",
        nationalNo: "0741111111",
        endPoint: "دوغارون",
    },
    {
        id: 4,
        name: "یارمحمد گلی",
        irNo: "21ع426-12",
        tankNo: "123",
        nationalNo: "0741111111",
        endPoint: "دوغارون",
    },
];
const driverInfoOptions = [
    { id: 1, name: "آوا شریعت-0740004931-09356451716" },
    { id: 2, name: "کسرا آخوندی-0744932536-09153297600" },
    { id: 3, name: "دریا آخوندی-0742536985-09151264136" },
    { id: 4, name: "ایلیا شریعت-0741523691-09151111213" },
];
const carInfoOptions = [
    { id: 1, name: "21ع426-12 / 21u222-36" },
    { id: 2, name: "73ع865-13" },
    { id: 3, name: "99ع526-15" },
    { id: 4, name: "32ع426-15" },
];
const tankInfoOptions = [
    { id: 1, name: "123" },
    { id: 2, name: "956" },
    { id: 3, name: "241" },
    { id: 4, name: "756" },
];

const initialValues = {
    driverInfo: "",
    carInfo: "",
    tankInfo: "",
};
const validationSchema = Yup.object({
    driverInfo: Yup.string(),
    carInfo: Yup.string(),
    tankInfo: Yup.string(),
});

const CarsIntroduction = () => {
    const carIntroduction = new CarIntroduction();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const filterdData = data.sort((a, b) => b.id - a.id);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        const { driverInfo, carInfo, tankInfo } = values;
        setLoading(true);
        const result = await carIntroduction.storeCarIntroduction(
            driverInfo,
            carInfo,
            tankInfo
        );

        if (result === null) {
            dispatch(
                setMessageAction(
                    carIntroduction.errorMessage,
                    carIntroduction.errorCode
                )
            );
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${addCarIntroductionPage.submitted}`);
        window.location.reload();
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });
    const getCarsIntroduction = async () => {
        setLoading(true);
        const result = await carIntroduction.getCarsIntroduction(
            pageSize,
            currentPage
        );
        if (result === null) {
            dispatch(
                setMessageAction(
                    carIntroduction.errorMessage,
                    carIntroduction.errorCode
                )
            );
            setLoading(false);

            return;
        }
        setTimeout(() => setLoading(false), 200);
        setData(result.items);
        setCount(result.count);
    };

    useEffect(() => {
        // getCarsIntroduction();
        setData(dummyData);
    }, [currentPage]);

    const renderForm = () => {
        return (
            <FormikForm
                onSubmit={formik.handleSubmit}
                loading={loading}
                error={messageState}
                title={`${addCarIntroductionPage._title}`}
                subTitle={`${addCarIntroductionPage._subTitle}`}
            >
                <FormikControl
                    control="searchableDropdown"
                    name="driverInfo"
                    formik={formik}
                    pageString={addCarIntroductionPage}
                    selectOptions={driverInfoOptions}
                />
                <FormikControl
                    control="searchableDropdown"
                    name="carInfo"
                    formik={formik}
                    pageString={addCarIntroductionPage}
                    selectOptions={carInfoOptions}
                />
                <FormikControl
                    control="searchableDropdown"
                    name="tankInfo"
                    formik={formik}
                    pageString={addCarIntroductionPage}
                    selectOptions={tankInfoOptions}
                />
            </FormikForm>
        );
    };

    const renderHeader = () => {
        return (
            <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addCarIntroductionPage.driverName}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addCarIntroductionPage.irNo}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addCarIntroductionPage.tankNo}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addCarIntroductionPage.nationalNo}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addCarIntroductionPage.endPoint}
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
                        {item.irNo}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.tankNo}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.nationalNo}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.endPoint}
                    </td>
                    <Operation
                        link={`${BASE_PATH}/introduction/car/edit/${item.id}`}
                        continueLink={`${BASE_PATH}/introduction/car/complete/${item.id}`}
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
                                title={`${CarsIntroductionPage._title}`}
                                subTitle={`${CarsIntroductionPage._subTitle}`}
                                loading={loading}
                                showBTN
                                modal={modal}
                                setModal={setModal}
                                showText
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default CarsIntroduction;
