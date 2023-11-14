import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../../state/message/messageAction";
import FormikForm from "../../../../../common/FormikForm";
import { addIntroductionPage } from "../../../../../constants/strings/fa";
import FormikControl from "../../../../../common/FormikControl";
import { useParams } from "react-router-dom";
import { CarIntroduction } from "../../../../../http/entities/CarIntroduction";
import { toast } from "react-toastify";

const initialValues = {
    registryDate: "",
    remittanceName: "",
    loadingDate: "",
    loadingTonnage: "",
    carrierUnitUSD: "",
    carrierTotalUSD: "",
    carrierUnitIRR: "",
    carrierTotalIRR: "",
    ownerTotalUSD: "",
    ownerTotalIRR: "",
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
    const carIntroduction = new CarIntroduction();
    const { params, carid } = useParams();
    const introductionId = params;
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const [carrierRateUSD, setCarrierRateUSD] = useState(null);
    const [carrierRateIRR, setCarrierRateIRR] = useState(null);

    const onSubmit = async (values) => {
        const data = { ...formData, ...values };
        const {
            registryDate,
            remittanceName,
            loadingDate,
            loadingTonnage,
            carrierUnitUSD,
            carrierTotalUSD,
            carrierUnitIRR,
            carrierTotalIRR,
            ownerTotalUSD,
            ownerTotalIRR,
            carrierLoadingCommission,
            forwardingLoadingCommission,
        } = data;
        setLoading(true);
        const result = await carIntroduction.storeCarIntroductionSecondStep(
            introductionId,
            registryDate,
            remittanceName,
            loadingDate,
            loadingTonnage,
            carrierUnitUSD,
            carrierTotalUSD,
            carrierUnitIRR,
            carrierTotalIRR,
            ownerTotalUSD,
            ownerTotalIRR,
            carrierLoadingCommission,
            forwardingLoadingCommission
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
        toast.success(`${addIntroductionPage.submittedTwo}`);
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

    useEffect(() => {
        dispatch(clearMessageAction());
        const result = {
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
        };
        // setFormValues(result);
    }, []);

    useEffect(() => {
        dispatch(clearMessageAction());

        const getAllProps = async () => {
            setLoading(true);
            const result = await carIntroduction.getAddCarsIntroductionProps(
                introductionId
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
            setTimeout(() => setLoading(false), 200);

            setCarrierRateUSD(result.introduction.ownerUnitUSD);
            setCarrierRateIRR(result.introduction.ownerUnitIRR);
        };
        getAllProps();
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

    useEffect(() => {
        const carrierTotalUSD = formik.values.loadingTonnage * carrierRateUSD/1000;
        const carrierTotalIRR = formik.values.loadingTonnage * carrierRateIRR/1000;

        formik.setFieldValue("carrierTotalUSD", carrierTotalUSD.toString());
        formik.setFieldValue("carrierTotalIRR", carrierTotalIRR.toString());

        const ownerTotalIRR =
            formik.values.loadingTonnage * formik.values.carrierUnitIRR/1000;
        const ownerTotalUSD =
            formik.values.loadingTonnage * formik.values.carrierUnitUSD/1000;

        formik.setFieldValue("ownerTotalIRR", ownerTotalIRR.toString());
        formik.setFieldValue("ownerTotalUSD", ownerTotalUSD.toString());
    }, [formik.values.loadingTonnage]);

    useEffect(() => {
        const ownerTotalIRR =
            formik.values.loadingTonnage * formik.values.carrierUnitIRR/1000;
        const ownerTotalUSD =
            formik.values.loadingTonnage * formik.values.carrierUnitUSD/1000;

        formik.setFieldValue("ownerTotalIRR", ownerTotalIRR.toString());
        formik.setFieldValue("ownerTotalUSD", ownerTotalUSD.toString());
    }, [formik.values.carrierUnitUSD, formik.values.carrierUnitIRR]);

    const updateHandler = async (e, values) => {
        e.preventDefault();
        const data = { ...formData, ...values };
        const {
            registryDate,
            remittanceName,
            loadingDate,
            loadingTonnage,
            carrierUnitUSD,
            carrierTotalUSD,
            carrierUnitIRR,
            carrierTotalIRR,
            ownerTotalUSD,
            ownerTotalIRR,
            carrierLoadingCommission,
            forwardingLoadingCommission,
        } = data;
        setLoading(true);
        const result = await carIntroduction.storeCarIntroductionSecondStep(
            carid,
            registryDate,
            remittanceName,
            loadingDate,
            loadingTonnage,
            carrierUnitUSD,
            carrierTotalUSD,
            carrierUnitIRR,
            carrierTotalIRR,
            ownerTotalUSD,
            ownerTotalIRR,
            carrierLoadingCommission,
            forwardingLoadingCommission
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
        toast.success(`${addIntroductionPage.submittedTwo}`);
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
    };

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
                type="number"
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
                readOnly
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
                readOnly
            />
            <FormikControl
                control="input"
                name="ownerTotalUSD"
                formik={formik}
                pageString={addIntroductionPage}
                readOnly
            />
            <FormikControl
                control="input"
                name="ownerTotalIRR"
                formik={formik}
                pageString={addIntroductionPage}
                readOnly
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
