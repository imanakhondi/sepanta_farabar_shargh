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
};
const validationSchema = Yup.object({
    // username: Yup.string(),
    name: Yup.string(),
    family: Yup.string(),
    nationalNo: Yup.string(),
    mobile: Yup.string(),
    email: Yup.string(),
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

    const getUser = async () => {
        setLoading(true);
        const result = await user.getUser(userId);
        if (result === null) {
            dispatch(setMessageAction(user.errorMessage, user.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        setFormValues(result.item);
    };

    useEffect(() => {
        dispatch(clearMessageAction());
        getUser();
    }, []);

    const onSubmit = async (values) => {
        const {
            name,
            family,
            nationalNo,
            mobile,
            email,
        } = values;
        setLoading(true);
        const result = await user.updateUser(
            userId,
            name,
            family,
            nationalNo,
            mobile,
            email
        );

        if (result === null) {
            dispatch(setMessageAction(user.errorMessage, user.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${editUserPage.submitted}`);
        navigate(`${BASE_PATH}/users`);
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
        </FormikForm>
    );
};

export default Edituser;
