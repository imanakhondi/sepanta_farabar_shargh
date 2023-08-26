import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { clearMessageAction } from "../../../../state/message/messageAction";
import FormikForm from "../../../../common/FormikForm";
import { addIntroductionPage } from "../../../../constants/strings/fa";
import FormikControl from "../../../../common/FormikControl";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
    registryDate: "",
    remittanceName: "",
    loadingDate: "",
    loadingTonnage: "",
    carrierUnitUSD: "",
    carrierTotalUSD: "",
    carrierUnitIRR: "",
    carrierTotalIRR: "",
    carrierLoadingCommission: "",
    forwardingLoadingCommission: "",
};
const validationSchema = Yup.object({
    registryDate: Yup.string(),
    remittanceName: Yup.string(),
    loadingDate: Yup.string(),
    loadingTonnage: Yup.string(),
    carrierUnitUSD: Yup.string(),
    carrierTotalUSD: Yup.string(),
    carrierUnitIRR: Yup.string(),
    carrierTotalIRR: Yup.string(),
    carrierLoadingCommission: Yup.string(),
    forwardingLoadingCommission: Yup.string(),
});

const StepTwo = ({
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
        const result={
            registryDate: "1402/05/01",
            remittanceName: "امیان",
            loadingDate: "1402/05/12",
            loadingTonnage: "25",
            carrierUnitUSD: "236",
            carrierTotalUSD: "254",
            carrierUnitIRR: "300",
            carrierTotalIRR: "145",
            carrierLoadingCommission: "100",
            forwardingLoadingCommission: "548",
        }
        // setFormValues(result);
    }, []);

    const updateHandler = (e, values) => {
        e.preventDefault();
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
    };

    const onSubmit = (values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
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
            showEditBTN={formValues}
            onClick={(e) => updateHandler(e, formik.values)}
        >
            <FormikControl
                control="date"
                name="registryDate"
                formik={formik}
                pageString={addIntroductionPage}
                onChange={(event) => {
                    formik.setFieldValue("registryDate", event.toString());
                }}
            />
            <FormikControl
                control="input"
                name="remittanceName"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="date"
                name="loadingDate"
                formik={formik}
                pageString={addIntroductionPage}
                onChange={(event) => {
                    formik.setFieldValue("loadingDate", event.toString());
                }}
            />
            <FormikControl
                control="input"
                name="loadingTonnage"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="input"
                name="carrierUnitUSD"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="input"
                name="carrierTotalUSD"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="input"
                name="carrierUnitIRR"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="input"
                name="carrierTotalIRR"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="input"
                name="carrierLoadingCommission"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="input"
                name="forwardingLoadingCommission"
                formik={formik}
                pageString={addIntroductionPage}
            />
        </FormikForm>
    );
};

export default StepTwo;
