import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../../state/message/messageAction";
import FormikForm from "../../../../../common/FormikForm";
import { addIntroductionPage } from "../../../../../constants/strings/fa";
import FormikControl from "../../../../../common/FormikControl";
import { useNavigate, useParams } from "react-router-dom";
import { CarIntroduction } from "../../../../../http/entities/CarIntroduction";
import { toast } from "react-toastify";
import { initialValues } from ".";

export const StepTwo = ({
    formData,
    setFormData,
    activeStepIndex,
    setActiveStepIndex,
}) => {
    const carIntroduction = new CarIntroduction();
    const { params, carid } = useParams();
    const introductionId = params;
    const navigate = useNavigate();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(null);

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
            console.log("rrrrrrr", result);
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

            formik.setFieldValue(
                "carrierRateUSD",
                result.introduction.ownerUnitIRR
            );
            formik.setFieldValue(
                "carrierRateIRR",
                result.introduction.ownerUnitUSD
            );

            // formik.setFieldValue(
            //     "carrierTotalUSD",
            //     result.introduction.carrierTotalUSD
            // );
            // formik.setFieldValue(
            //     "carrierTotalIRR",
            //     result.introduction.carrierTotalIRR
            // );
        };
        getAllProps();
    }, []);

    useEffect(() => {
        dispatch(clearMessageAction());
        const getCarIntroduction = async () => {
            setLoading(true);
            const result = await carIntroduction.getCarIntroduction(carid);

            console.log(result);

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
        toast.success(`${addIntroductionPage.submitted}`);
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
    };

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
        toast.success(`${addIntroductionPage.submitted}`);
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
        console.log("carrierTotalIRR", formik.values.carrierTotalIRR);
        const carrierTotalUSD =
            formik.values.loadingTonnage * formik.values.carrierRateUSD;
        const carrierTotalIRR =
            formik.values.loadingTonnage * formik.values.carrierRateIRR;

        formik.setFieldValue(
            "carrierTotalUSD",
            carrierTotalUSD.toString() || ""
        );
        formik.setFieldValue(
            "carrierTotalIRR",
            carrierTotalIRR.toString() || ""
        );

        const ownerTotalIRR =
            formik.values.loadingTonnage * formik.values.carrierUnitIRR;
        const ownerTotalUSD =
            formik.values.loadingTonnage * formik.values.carrierUnitUSD;

        if (
            formik.values.carrierUnitUSD !== "" &&
            formik.values.carrierUnitIRR !== ""
        ) {
            console.log("daryaaaaaaaaaa");
            formik.setFieldValue(
                "ownerTotalIRR",
                ownerTotalIRR.toString() || ""
            );
            formik.setFieldValue(
                "ownerTotalUSD",
                ownerTotalUSD.toString() || ""
            );
        }
    }, [formik.values.loadingTonnage]);

    useEffect(() => {
        const ownerTotalIRR =
            formik.values.loadingTonnage * formik.values.carrierUnitIRR;
        const ownerTotalUSD =
            formik.values.loadingTonnage * formik.values.carrierUnitUSD;

        formik.setFieldValue("ownerTotalIRR", ownerTotalIRR.toString() || "");
        formik.setFieldValue("ownerTotalUSD", ownerTotalUSD.toString() || "");
    }, [formik.values.carrierUnitUSD, formik.values.carrierUnitIRR]);

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
