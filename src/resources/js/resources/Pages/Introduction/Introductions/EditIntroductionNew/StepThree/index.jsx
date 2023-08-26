import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { clearMessageAction } from "../../../../state/message/messageAction";
import FormikForm from "../../../../common/FormikForm";
import FormikControl from "../../../../common/FormikControl";
import { addIntroductionPage } from "../../../../constants/strings/fa";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
    unloadingDate: "",
    unloadingTonnage: "",
    deficitOrSurplus: "",
    unloadingReceipt: "",
};

const validationSchema = Yup.object({
    unloadingDate: Yup.string(),
    unloadingTonnage: Yup.string(),
    deficitOrSurplus: Yup.string(),
    unloadingReceipt: Yup.string(),
});

const StepThree = ({
    formData,
    setFormData,
    activeStepIndex,
    setActiveStepIndex,
}) => {
    const params = useParams();
    const introductionId = params.id;
    const navigate = useNavigate();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(null);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);
    const onSubmit = (values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
    };

    const updateHandler = (e, values) => {
        e.preventDefault();
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
    };

    const formik = useFormik({
        initialValues: formValues || initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });
    return (
        <FormikForm
            onSubmit={formik.handleSubmit}
            loading={loading}
            error={messageState}
            showEditBTN={formValues}
            onClick={(e) => updateHandler(e, formik.values)}
        >
            <FormikControl
                control="date"
                name="unloadingDate"
                formik={formik}
                pageString={addIntroductionPage}
                onChange={(event) => {
                    formik.setFieldValue("unloadingDate", event.toString());
                }}
            />
            <FormikControl
                control="input"
                name="unloadingTonnage"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="input"
                name="deficitOrSurplus"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="input"
                name="unloadingReceipt"
                formik={formik}
                pageString={addIntroductionPage}
            />
        </FormikForm>
    );
};

export default StepThree;
