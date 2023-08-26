import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikForm from "../../../../common/FormikForm";
import { useDispatch, useSelector } from "react-redux";
import { clearMessageAction } from "../../../../state/message/messageAction";
import { editIntroductionPage } from "../../../../constants/strings/fa";
import FormikControl from "../../../../common/FormikControl";
import { useNavigate, useParams } from "react-router-dom";

const barOwnerOptions = [
    { id: 1, name: "سپنتا فرابر" },
    { id: 2, name: "آرشام ترابر" },
    { id: 3, name: "دلیران ترابر" },
    { id: 4, name: "ویشکا ترابر" },
];
const startPointOptions = [
    { id: 1, name: "تایباد" },
    { id: 2, name: "مشهد" },
    { id: 3, name: "فریمان" },
    { id: 4, name: "تهران" },
];
const endPointOptions = [
    { id: 1, name: "تایباد" },
    { id: 2, name: "مشهد" },
    { id: 3, name: "فریمان" },
    { id: 4, name: "تهران" },
];

const initialValues = {
    introductionNo: `${Date.now()}`,
    introductionDate: "",
    barOwner: "",
    carrier: "",
    startPoint: "",
    endPoint: "",
    ownerUnitUSD: "",
    ownerUnitIRR: "",
};
const validationSchema = Yup.object({
    introductionNo: Yup.string(),
    introductionDate: Yup.string(),
    barOwner: Yup.string(),
    tankNo: Yup.string(),
    driverName: Yup.string(),
    irNo: Yup.string(),
    transitNo: Yup.string(),
    carrier: Yup.string(),
    startPoint: Yup.string(),
    endPoint: Yup.string(),
    mobile: Yup.string(),
    ownerUnitUSD: Yup.string(),
    ownerTotalUSD: Yup.string(),
    ownerUnitIRR: Yup.string(),
    ownerTotalIRR: Yup.string(),
});
const StepOne = ({
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
        const result = {
            introductionNo: `123569`,
            introductionDate: "1402/05/01",
            barOwner: "سپنتا فرابر",
            carrier: "سپنتا",
            startPoint: "مشهد",
            endPoint: "تایباد",
            ownerUnitUSD: "15",
            ownerUnitIRR: "200",
        };
        setFormValues(result);
    }, []);
    console.log(formValues);

   
    const formik = useFormik({
        initialValues: formValues || initialValues,
        // onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
    });

    const updateHandler = (e, values) => {
        e.preventDefault();
        const data = { ...formData, ...values };
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
                control="input"
                name="introductionNo"
                formik={formik}
                pageString={editIntroductionPage}
                readOnly
            />
            <FormikControl
                control="date"
                name="introductionDate"
                formik={formik}
                pageString={editIntroductionPage}
                onChange={(event) => {
                    formik.setFieldValue("introductionDate", event.toString());
                }}
            />
            <FormikControl
                control="searchableDropdown"
                name="barOwner"
                formik={formik}
                pageString={editIntroductionPage}
                selectOptions={barOwnerOptions}
                label="name"
            />
            <FormikControl
                control="input"
                name="carrier"
                formik={formik}
                pageString={editIntroductionPage}
            />
            <FormikControl
                control="searchableDropdown"
                name="startPoint"
                formik={formik}
                pageString={editIntroductionPage}
                selectOptions={startPointOptions}
            />
            <FormikControl
                control="searchableDropdown"
                name="endPoint"
                formik={formik}
                pageString={editIntroductionPage}
                selectOptions={endPointOptions}
            />
            <FormikControl
                control="input"
                name="ownerUnitUSD"
                formik={formik}
                pageString={editIntroductionPage}
            />
            <FormikControl
                control="input"
                name="ownerUnitIRR"
                formik={formik}
                pageString={editIntroductionPage}
            />
        </FormikForm>
    );
};

export default StepOne;
