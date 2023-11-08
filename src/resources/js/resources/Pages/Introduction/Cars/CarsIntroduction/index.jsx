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
import { useParams } from "react-router-dom";

const initialValues = {
    driverInfoOptions: [],
    carInfoOptions: [],
    tankInfoOptions: [],
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
    const params = useParams();
    const introductionId = params.id;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [modal, setModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const filterdData = data.sort((a, b) => b.id - a.id);
    const [isShow, setIsShow] = useState({
        nameDriver: true,
        nameCar: false,
        irNo: true,
        transitNo: false,
        tankNo: true,
        nationalNoDriver: true,
        nationalNoCar: false,
        mobileDriver: false,
        mobileCar: false,
        licenseNo: false,
        startPoint: false,
        endPoint: false,
        actions: true,
    });

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        const { driverInfo, carInfo, tankInfo } = values;
        console.log(driverInfo, carInfo, tankInfo);
        setLoading(true);
        const result = await carIntroduction.storeCarIntroductionFirstStep(
            introductionId,
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

    useEffect(() => {
        dispatch(clearMessageAction());

        const getAllProps = async () => {
            setLoading(true);
            const result = await carIntroduction.getAddCarsIntroductionProps(
                introductionId
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

            const drivers = result.drivers?.map((driver) => ({
                id: driver.id,
                name: `${driver.name} - ${driver.family} - ${driver.nationalNo} - ${driver.mobile}`,
            }));

            const trucks = result.trucks?.map((truck) => ({
                id: truck.id,
                name: `${truck.irNo} - ${truck.transitNo} `,
            }));

            const tanks = result.tanks?.map((tank) => ({
                id: tank.id,
                name: `${tank.tankNo} `,
            }));

            formik.setFieldValue("driverInfoOptions", drivers);
            formik.setFieldValue("carInfoOptions", trucks);
            formik.setFieldValue("tankInfoOptions", tanks);
        };
        getAllProps();
    }, []);

    useEffect(() => {
        const getCarsIntroduction = async () => {
            setLoading(true);
            const result = await carIntroduction.getCarsIntroduction(
                introductionId,
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
        getCarsIntroduction();
    }, [currentPage]);

    const renderForm = () => {
        return (
            <FormikForm
                onSubmit={formik.handleSubmit}
                loading={loading}
                error={messageState}
                title={`${addCarIntroductionPage._title}`}
                subTitle={`${addCarIntroductionPage._subTitle}`}
                onCancel={() => setModal(false)}
            >
                <FormikControl
                    control="searchableDropdown"
                    name="driverInfo"
                    formik={formik}
                    pageString={addCarIntroductionPage}
                    selectOptions={formik.values.driverInfoOptions}
                />
                <FormikControl
                    control="searchableDropdown"
                    name="carInfo"
                    formik={formik}
                    pageString={addCarIntroductionPage}
                    selectOptions={formik.values.carInfoOptions}
                />
                <FormikControl
                    control="searchableDropdown"
                    name="tankInfo"
                    formik={formik}
                    pageString={addCarIntroductionPage}
                    selectOptions={formik.values.tankInfoOptions}
                />
            </FormikForm>
        );
    };

    const renderHeader = () => {
        return (
            <tr>
                {isShow.nameDriver && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.driverName}
                    </th>
                )}
                {isShow.nameCar && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.carName}
                    </th>
                )}
                {isShow.irNo && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.irNo}
                    </th>
                )}
                {isShow.transitNo && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.transitNo}
                    </th>
                )}
                {isShow.tankNo && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.tankNo}
                    </th>
                )}
                {isShow.nationalNoDriver && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.nationalNoDriver}
                    </th>
                )}
                {isShow.nationalNoCar && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.nationalNoCar}
                    </th>
                )}
                {isShow.mobileDriver && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.mobileDriver}
                    </th>
                )}
                {isShow.mobileCar && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.mobileCar}
                    </th>
                )}
                {isShow.licenseNo && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.licenseNo}
                    </th>
                )}
                {isShow.startPoint && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.startPoint}
                    </th>
                )}
                {isShow.endPoint && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {addCarIntroductionPage.endPoint}
                    </th>
                )}
                {isShow.actions && (
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                        {general.actions}
                    </th>
                )}
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
                    {isShow.nameDriver && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl">
                            {item.driverName} {item.driverFamily}
                        </td>
                    )}
                    {isShow.nameCar && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl">
                            {item.truckName} {item.truckFamily}
                        </td>
                    )}
                    {isShow.irNo && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.truckIrlNo}
                        </td>
                    )}
                    {isShow.transitNo && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.truckTransitNo}
                        </td>
                    )}
                    {isShow.tankNo && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.tankNo}
                        </td>
                    )}
                    {isShow.nationalNoDriver && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.driverNationalNo}
                        </td>
                    )}
                    {isShow.nationalNoCar && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.truckNationalNo}
                        </td>
                    )}
                    {isShow.mobileDriver && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.driverMobile}
                        </td>
                    )}
                    {isShow.mobileCar && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.truckMobile}
                        </td>
                    )}
                    {isShow.licenseNo && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.driverLicenseNo}
                        </td>
                    )}
                    {isShow.startPoint && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.firstPointName}
                        </td>
                    )}
                    {isShow.endPoint && (
                        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                            {item.endPointName}
                        </td>
                    )}
                    {isShow.actions && (
                        <Operation
                            link={`${BASE_PATH}/introduction/car/edit/${item.id}`}
                            continueLink={`${BASE_PATH}/introduction/car/complete/${introductionId}/${item.id}`}
                            onCancel={() => cancelHandler(item.id)}
                        />
                    )}
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
                    <div className="flex flex-wrap my-5">
                        <IsInput
                            name="nameDriver"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.driverName}
                        />
                        <IsInput
                            name="nameCar"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.carName}
                        />
                        <IsInput
                            name="irNo"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.irNo}
                        />
                        <IsInput
                            name="transitNo"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.transitNo}
                        />
                        <IsInput
                            name="tankNo"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.tankNo}
                        />
                        <IsInput
                            name="nationalNoDriver"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.nationalNoDriver}
                        />
                        <IsInput
                            name="nationalNoCar"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.nationalNoCar}
                        />
                        <IsInput
                            name="mobileDriver"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.mobileDriver}
                        />
                        <IsInput
                            name="mobileCar"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.mobileCar}
                        />
                        <IsInput
                            name="licenseNo"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.licenseNo}
                        />
                        <IsInput
                            name="startPoint"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.startPoint}
                        />
                        <IsInput
                            name="endPoint"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={addCarIntroductionPage.endPoint}
                        />
                        <IsInput
                            name="actions"
                            isShow={isShow}
                            setIsShow={setIsShow}
                            label={general.actions}
                        />
                    </div>
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

export const IsInput = ({ name, label, isShow, setIsShow }) => {
    const handleChange = (e) => {
        setIsShow({
            ...isShow,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value,
        });
    };
    return (
        <div className={`flex flex-col mt-2 w-full lg:w-[200px] xl:w-[300px]`}>
            <div className="col-start-2 col-span-3 flex items-center ">
                <input
                    type="checkbox"
                    id={name}
                    name={name}
                    onChange={(e) => handleChange(e)}
                    checked={isShow[name]}
                    className="cursor-pointer"
                />
                <label htmlFor={name} className="text-sm mr-2 cursor-pointer">
                    {label}
                </label>
            </div>
        </div>
    );
};
