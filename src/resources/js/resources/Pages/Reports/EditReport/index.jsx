import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import FormikForm from "../../../common/FormikForm";
import FormikControl from "../../../common/FormikControl";
import { editreportsPage } from "../../../constants/strings/fa";
import { CarIntroduction } from "../../../http/entities/CarIntroduction";
import { useParams } from "react-router-dom";

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

const EditReport = () => {
    const carIntroduction = new CarIntroduction();
    const params=useParams()
    const introductionId=params.id
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);

    useEffect(() => {
        dispatch(clearMessageAction());
        const getCarIntroduction = async () => {
            setLoading(true);
            const result = await carIntroduction.getCarIntroduction(introductionId);

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
            unloadingDate,
            unloadingTonnage,
            difference,
            allowableDeficit,
            deficitOrSurplus,
            unloadingReceipt,
        } = values;
        setLoading(true);
        const result = await carIntroduction.storeCarIntroductionReport(
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
            forwardingLoadingCommission,
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
        toast.success(`${editreportsPage.submittedThree}`);
        window.location.reload();
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
        >
            <FormikControl
                control="date"
                name="registryDate"
                formik={formik}
                pageString={editreportsPage}
                onChange={(event) => {
                    formik.setFieldValue("registryDate", event.toString());
                }}
            />
            <FormikControl
                control="input"
                name="remittanceName"
                formik={formik}
                pageString={editreportsPage}
            />
            <FormikControl
                control="date"
                name="loadingDate"
                formik={formik}
                pageString={editreportsPage}
                onChange={(event) => {
                    formik.setFieldValue("loadingDate", event.toString());
                }}
            />
            <FormikControl
                control="input"
                name="loadingTonnage"
                formik={formik}
                pageString={editreportsPage}
                type="number"
            />
            <FormikControl
                control="input"
                name="carrierUnitUSD"
                formik={formik}
                pageString={editreportsPage}
            />
            <FormikControl
                control="input"
                name="carrierTotalUSD"
                formik={formik}
                pageString={editreportsPage}
                readOnly
            />
            <FormikControl
                control="input"
                name="carrierUnitIRR"
                formik={formik}
                pageString={editreportsPage}
            />
            <FormikControl
                control="input"
                name="carrierTotalIRR"
                formik={formik}
                pageString={editreportsPage}
                readOnly
            />
            <FormikControl
                control="input"
                name="ownerTotalUSD"
                formik={formik}
                pageString={editreportsPage}
                readOnly
            />
            <FormikControl
                control="input"
                name="ownerTotalIRR"
                formik={formik}
                pageString={editreportsPage}
                readOnly
            />
            <FormikControl
                control="input"
                name="carrierLoadingCommission"
                formik={formik}
                pageString={editreportsPage}
            />
            <FormikControl
                control="input"
                name="forwardingLoadingCommission"
                formik={formik}
                pageString={editreportsPage}
            />
            <FormikControl
                control="date"
                name="unloadingDate"
                formik={formik}
                pageString={editreportsPage}
                onChange={(event) => {
                    formik.setFieldValue("unloadingDate", event.toString());
                }}
            />
            <FormikControl
                control="input"
                name="unloadingTonnage"
                formik={formik}
                pageString={editreportsPage}
            />
            <FormikControl
                control="input"
                name="difference"
                formik={formik}
                pageString={editreportsPage}
                readOnly
            />
            <FormikControl
                control="input"
                name="allowableDeficit"
                formik={formik}
                pageString={editreportsPage}
            />
            <FormikControl
                control="input"
                name="deficitOrSurplus"
                formik={formik}
                pageString={editreportsPage}
                readOnly
            />
            <FormikControl
                control="input"
                name="unloadingReceipt"
                formik={formik}
                pageString={editreportsPage}
            />
        </FormikForm>
    );
};

export default EditReport;
