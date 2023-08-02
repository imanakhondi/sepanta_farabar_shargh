
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { addDriverPage } from "../../../constants/strings/fa";
import { Driver } from "../../../http/entities/Driver";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { toast } from "react-toastify";

const initialValues = {
    name: "",
    family: "",
    nationalCode: "",
    mobile: "",
    driverLicenseNum: "",
    driverSmartCard: "",
};
const validationSchema = Yup.object({
    name: Yup.string(),
    family: Yup.string(),
    nationalCode: Yup.string(),
    mobile: Yup.string(),
    driverLicenseNum: Yup.string(),
    driverSmartCard: Yup.string(),
});

const EditDrivers = () => {
    const driver = new Driver();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        const {
            name,
            family,
            nationalCode,
            mobile,
            driverLicenseNum,
            driverSmartCard,
        } = values;
        setLoading(true);
        const result = await driver.storeDriver(
            name,
            family,
            nationalCode,
            mobile,
            driverLicenseNum,
            driverSmartCard
        );
        if (result === null) {
            //show message failure
            dispatch(setMessageAction(driver.errorMessage, driver.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        toast.success(`${addDriverPage.submitted}`);
        window.location.reload();
        //show message success
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });
    return (
        <FormikForm
            onSubmit={formik.handleSubmit}
            loading={loading}
            error={messageState}
            title={`${addDriverPage._title}`}
            subTitle={`${addDriverPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={addDriverPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={addDriverPage}
            />
            <FormikControl
                control="input"
                name="nationalCode"
                formik={formik}
                pageString={addDriverPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={addDriverPage}
            />
            <FormikControl
                control="input"
                name="driverLicenseNum"
                formik={formik}
                pageString={addDriverPage}
                type="number"
            />
            <FormikControl
                control="input"
                name="driverSmartCard"
                formik={formik}
                pageString={addDriverPage}
                type="number"
            />
        </FormikForm>
    );
};

export default EditDrivers;
