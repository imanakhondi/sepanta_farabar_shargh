import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { editUserPage } from "../../../constants/strings/fa";
import { User } from "../../../http/entities/User";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_PATH } from "../../../constants";
import { toast } from "react-toastify";

const initialValues = {
    username: "",
    name: "",
    family: "",
    nationalNo: "",
    mobile: "",
    email: "",
    // password: "",
    // confirmPassword: "",
};
const validationSchema = Yup.object({
    // username: Yup.string(),
    name: Yup.string(),
    family: Yup.string(),
    nationalNo: Yup.string(),
    mobile: Yup.string(),
    email: Yup.string(),
    // password: Yup.string(),
    // confirmPassword: Yup.string(),
});

const Edituser = () => {
    const params = useParams();
    const userId = params.id;
    const navigate = useNavigate();
    const user = new User();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);
    const getUser = async () => {
        setLoading(true);
        const result = await user.getUser(userId);
        console.log(result);
        if (result !== null) {
            setLoading(false);
            setFormValues(result.item);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    const onSubmit = async (values) => {
        const {
            // username,
            name,
            family,
            nationalNo,
            mobile,
            email,
            // password,
        } = values;
        setLoading(true);
        const result = await user.updateUser(
            userId,
            // username,
            name,
            family,
            nationalNo,
            mobile,
            email
            // password
        );

        if (result === null) {
            //show message failure
            dispatch(setMessageAction(user.errorMessage, user.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${editUserPage.submitted}`);
        navigate(`${BASE_PATH}/users`);
        //show message success
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
            title={`${editUserPage._title}`}
            subTitle={`${editUserPage._subTitle}`}
        >
            {/* <FormikControl
                control="input"
                name="username"
                formik={formik}
                pageString={editUserPage}
            /> */}
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={editUserPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={editUserPage}
            />
            <FormikControl
                control="input"
                name="nationalNo"
                formik={formik}
                pageString={editUserPage}
            />
             <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={editUserPage}
            /> 
            <FormikControl
                control="input"
                name="email"
                formik={formik}
                pageString={editUserPage}
                type="email"
            />
            {/* <FormikControl
                control="input"
                name="password"
                formik={formik}
                pageString={editUserPage}
                type="password"
            />
            <FormikControl
                control="input"
                name="confirmPassword"
                formik={formik}
                pageString={editUserPage}
                type="password"
            /> */}
        </FormikForm>
    );
};

export default Edituser;
