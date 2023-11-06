import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../../state/message/messageAction";
import FormikForm from "../../../../../common/FormikForm";
import FormikControl from "../../../../../common/FormikControl";
import { addIntroductionPage } from "../../../../../constants/strings/fa";
import { useNavigate, useParams } from "react-router-dom";
import { CarIntroduction } from "../../../../../http/entities/CarIntroduction";
import { toast } from "react-toastify";
import { BASE_PATH } from "../../../../../constants";

const initialValues = {
    unloadingDate: "",
    unloadingTonnage: "",
    difference: "",
    allowableDeficit: "",
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
    const carIntroduction = new CarIntroduction();
    const { params, carid } = useParams();
    const navigate = useNavigate();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(null);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    useEffect(() => {
        dispatch(clearMessageAction());
        const getCarIntroduction = async () => {
            setLoading(true);
            const result = await carIntroduction.getCarIntroduction(carid);

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
        getCarIntroduction();
    }, []);

    const onSubmit = async (values) => {
        const data = { ...formData, ...values };
        const {
            unloadingDate,
            unloadingTonnage,
            difference,
            allowableDeficit,
            deficitOrSurplus,
            unloadingReceipt,
        } = data;
        setLoading(true);
        const result = await carIntroduction.storeCarIntroductionThirdStep(
            carid,
            unloadingDate,
            unloadingTonnage,
            difference,
            allowableDeficit,
            deficitOrSurplus,
            unloadingReceipt
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
        toast.success(`${addIntroductionPage.submittedThree}`);
        window.location.reload();

        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
    };

    const updateHandler = async (e, values) => {
        e.preventDefault();
        const data = { ...formData, ...values };
        const {
            unloadingDate,
            unloadingTonnage,
            difference,
            allowableDeficit,
            deficitOrSurplus,
            unloadingReceipt,
        } = data;
        setLoading(true);
        const result = await carIntroduction.storeCarIntroductionThirdStep(
            carid,
            unloadingDate,
            unloadingTonnage,
            difference,
            allowableDeficit,
            deficitOrSurplus,
            unloadingReceipt
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
        toast.success(`${addIntroductionPage.submittedThree}`);
        navigate(`${BASE_PATH}/introduction/cars/${params}`);

        setFormData(data);
    };

    const formik = useFormik({
        initialValues: formValues || initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
    });

    useEffect(() => {
        if (formik.values.unloadingTonnage) {
            const difference =
                formValues?.loadingTonnage - formik.values.unloadingTonnage;
            formik.setFieldValue("difference", difference.toString() || "");
        }
    }, [formik.values.unloadingTonnage]);

    useEffect(() => {
        if (formik.values.allowableDeficit) {
            const deficitOrSurplusOne =
                formik.values.allowableDeficit - formik.values.difference;
            formik.setFieldValue(
                "deficitOrSurplus",
                deficitOrSurplusOne >= 0
                    ? `${deficitOrSurplusOne.toString() + " مجاز "}`
                    : `${deficitOrSurplusOne.toString() + " غیر مجاز "}` || ""
            );
        }
        // const deficitOrSurplusOne =
        //     formik.values.allowableDeficit - formik.values.difference;
        // console.log(deficitOrSurplusOne);
        // formik.setFieldValue(
        //     "deficitOrSurplus",
        //     deficitOrSurplusOne >= 0 && formik.values.difference > 0
        //         ? ` ${addIntroductionPage.allowed}`
        //         : deficitOrSurplusOne < 0
        //         ? "iman"
        //         : ` ${addIntroductionPage.notAllowed}` || ""
        // );
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
