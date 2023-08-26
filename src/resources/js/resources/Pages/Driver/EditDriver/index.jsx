import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { editDriverPage, validation } from "../../../constants/strings/fa";
import { Driver } from "../../../http/entities/Driver";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_PATH } from "../../../constants";

const initialValues = {
    name: "",
    family: "",
    nationalNo: "",
    mobile: "",
    licenseNo: "",
    cardNo: "",
};
const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, `${validation.minMessage}`)
        .max(50, `${validation.maxMessage}`)
        .required(`${validation.stringMessage}`),
});

const EditDriver = () => {
    const params = useParams();
    const driverId = params.id;
    const navigate = useNavigate();
    const driver = new Driver();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const getDriver = async () => {
        setLoading(true);
        const result = await driver.getDriver(driverId);
        if (result === null) {
            dispatch(setMessageAction(driver.errorMessage, driver.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        setFormValues(result.item);
    };

    useEffect(() => {
        dispatch(clearMessageAction());
        getDriver();
    }, []);

    const onSubmit = async (values) => {
        const { name, family, nationalNo, mobile, licenseNo, cardNo } = values;
        setLoading(true);
        const result = await driver.updateDriver(
            driverId,
            name,
            family,
            nationalNo,
            mobile,
            licenseNo,
            cardNo
        );
        if (result === null) {
            dispatch(setMessageAction(driver.errorMessage, driver.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        toast.success(`${editDriverPage.submitted}`);
        navigate(`${BASE_PATH}/drivers`);
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
            title={`${editDriverPage._title}`}
            subTitle={`${editDriverPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={editDriverPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={editDriverPage}
            />
            <FormikControl
                control="input"
                name="nationalNo"
                formik={formik}
                pageString={editDriverPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={editDriverPage}
            />
            <FormikControl
                control="input"
                name="licenseNo"
                formik={formik}
                pageString={editDriverPage}
                type="number"
            />
            <FormikControl
                control="input"
                name="cardNo"
                formik={formik}
                pageString={editDriverPage}
                type="number"
            />
        </FormikForm>
    );
};

export default EditDriver;
