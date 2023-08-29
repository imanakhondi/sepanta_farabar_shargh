import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { clearMessageAction } from "../../../../../state/message/messageAction";
import FormikForm from "../../../../../common/FormikForm";
import FormikControl from "../../../../../common/FormikControl";
import { addIntroductionPage } from "../../../../../constants/strings/fa";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
    unloadingDate: "",
    unloadingTonnage: "",
    difference: "",
    allowableDeficit: "",
    deficitOrSurplus: "",
    unloadingReceipt: "",
};
let loadingTonnage = 1000;

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

    useEffect(() => {
        const difference = loadingTonnage - formik.values.unloadingTonnage;
        formik.setFieldValue("difference", difference.toString() || "");
    }, [formik.values.unloadingTonnage]);

    useEffect(() => {
        // const deficitOrSurplusOne =
        //     formik.values.allowableDeficit - formik.values.difference;
        // formik.setFieldValue(
        //     "deficitOrSurplus",
        //     `${deficitOrSurplusOne}>= ${0} ? ${
        //         deficitOrSurplusOne.toString() + " مجاز "
        //     }:${deficitOrSurplusOne.toString() + " غیر مجاز "}` || ""
        // );
        const deficitOrSurplusOne =
            formik.values.allowableDeficit - formik.values.difference;
        formik.setFieldValue(
            "deficitOrSurplus",
            deficitOrSurplusOne >= 0
                ? `${deficitOrSurplusOne.toString()} ${
                      addIntroductionPage.allowed
                  }`
                : `${Math.abs(deficitOrSurplusOne.toString())} ${
                      addIntroductionPage.notAllowed
                  }` || ""
        );
    }, [formik.values.allowableDeficit]);

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
                name="difference"
                formik={formik}
                pageString={addIntroductionPage}
                readOnly
            />
            <FormikControl
                control="input"
                name="allowableDeficit"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="input"
                name="deficitOrSurplus"
                formik={formik}
                pageString={addIntroductionPage}
                readOnly
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
