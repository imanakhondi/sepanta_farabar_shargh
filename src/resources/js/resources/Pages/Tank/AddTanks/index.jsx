import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { addTankPage } from "../../../constants/strings/fa";
import { Tank } from "../../../http/entities/Tank";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { useDispatch, useSelector } from "react-redux";

const initialValues = {
    name: "",
    family: "",
    nationalCode: "",
    mobile: "",
    tankNum: "",
};
const validationSchema = Yup.object({
    name: Yup.string(),
    family: Yup.string(),
    tankNum: Yup.string(),
});

const AddTanks = () => {
    const tank = new Tank();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        const { name, family, nationalCode, mobile, tankNum } = values;
        const result = await tank.storeTank(
            name,
            family,
            nationalCode,
            mobile,
            tankNum
        );

        if (result === null) {
            //show message failure
            dispatch(setMessageAction(tank.errorMessage, tank.errorCode));
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
            title={`${addTankPage._title}`}
            subTitle={`${addTankPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={addTankPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={addTankPage}
            />
            <FormikControl
                control="input"
                name="nationalCode"
                formik={formik}
                pageString={addTankPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={addTankPage}
            />
            <FormikControl
                control="input"
                name="tankNum"
                formik={formik}
                pageString={addTankPage}
                type="number"
            />
        </FormikForm>
    );
};

export default AddTanks;
