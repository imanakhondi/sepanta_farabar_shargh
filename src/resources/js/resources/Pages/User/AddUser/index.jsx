import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { addUserPage } from "../../../constants/strings/fa";
import { User } from "../../../http/entities/User";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";

const initialValues = {
    username: "",
    name: "",
    family: "",
    nationalNo: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
};
const validationSchema = Yup.object({
    username: Yup.string(),
    name: Yup.string(),
    family: Yup.string(),
    nationalNo: Yup.string(),
    mobile: Yup.string(),
    email: Yup.string(),
    password: Yup.string(),
    confirmPassword: Yup.string(),
});
const AddUser = () => {
    const user = new User();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);
    const onSubmit = async (values) => {
        const {
            username,
            name,
            family,
            nationalNo,
            mobile,
            email,
            password,
            confirmPassword,
        } = values;
        setLoading(true);
        const result = await user.storeUser(
            username,
            name,
            family,
            nationalNo,
            mobile,
            email,
            password,
            confirmPassword
        );

        if (result === null) {
            //show message failure
            dispatch(setMessageAction(user.errorMessage, user.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
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
            title={`${addUserPage._title}`}
            subTitle={`${addUserPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="username"
                formik={formik}
                pageString={addUserPage}
            />
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={addUserPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={addUserPage}
            />
            <FormikControl
                control="input"
                name="nationalNo"
                formik={formik}
                pageString={addUserPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={addUserPage}
            />
            <FormikControl
                control="input"
                name="email"
                formik={formik}
                pageString={addUserPage}
                type="email"
            />
            <FormikControl
                control="input"
                name="password"
                formik={formik}
                pageString={addUserPage}
                type="password"
            />
            <FormikControl
                control="input"
                name="confirmPassword"
                formik={formik}
                pageString={addUserPage}
                type="password"
            />
        </FormikForm>
    );
};

export default AddUser;
