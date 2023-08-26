import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../../common/FormikControl";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_PATH } from "../../../../constants";
import { editCarIntroductionPage } from "../../../../constants/strings/fa";

import { CarIntroduction } from "../../../../http/entities/CarIntroduction";

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
    driverName: Yup.string(),
    irNo: Yup.string(),
    transitNo: Yup.string(),
    tankNo: Yup.string(),
    licenseNo: Yup.string(),
    mobile: Yup.string(),
});

const EditCarIntroduction = () => {
    const params = useParams();
    const carId = params.id;
    const navigate = useNavigate();
    const carIntroduction = new CarIntroduction();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const getCarIntroduction = async () => {
        setLoading(true);
        const result = await carIntroduction.getCarIntroduction(carId);
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
        setFormValues(result.item);
    };

    useEffect(() => {
        dispatch(clearMessageAction());
        // getCarIntroduction();
        setFormValues({
            driverInfo: "آوا شریعت-0740004931-09356451716",
            carInfo: "21ع426-12 / 21u222-36",
            tankInfo: "123",
        });
    }, []);

    const onSubmit = async (values) => {
        const { driverInfo, carInfo, tankInfo } = values;
        setLoading(true);
        const result = await carIntroduction.updateCarIntroduction(
            carId,
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
        toast.success(`${editCarIntroductionPage.submitted}`);
        navigate(`${BASE_PATH}/cars/${carId}`);
    };

    const formik = useFormik({
        initialValues: formValues || initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
    });
    return (
        <FormikForm
            onSubmit={formik.handleSubmit}
            loading={loading}
            error={messageState}
            title={`${editCarIntroductionPage._title}`}
            subTitle={`${editCarIntroductionPage._subTitle}`}
        >
            <FormikControl
                control="searchableDropdown"
                name="driverInfo"
                formik={formik}
                pageString={editCarIntroductionPage}
                selectOptions={driverInfoOptions}
            />
            <FormikControl
                control="searchableDropdown"
                name="carInfo"
                formik={formik}
                pageString={editCarIntroductionPage}
                selectOptions={carInfoOptions}
            />
            <FormikControl
                control="searchableDropdown"
                name="tankInfo"
                formik={formik}
                pageString={editCarIntroductionPage}
                selectOptions={tankInfoOptions}
            />
        </FormikForm>
    );
};

export default EditCarIntroduction;
