import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikForm from "../../../../common/FormikForm";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import { editIntroductionPage } from "../../../../constants/strings/fa";
import FormikControl from "../../../../common/FormikControl";
import { useNavigate, useParams } from "react-router-dom";
import { Introduction } from "../../../../http/entities/Introduction";
import { toast } from "react-toastify";
import { BASE_PATH } from "../../../../constants";

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
    carrier: Yup.string(),
    startPoint: Yup.string(),
    endPoint: Yup.string(),
    ownerUnitUSD: Yup.string(),
    ownerUnitIRR: Yup.string(),
});
const EditIntroduction = () => {
    const params = useParams();
    const introductionId = params.id;
    const navigate = useNavigate();
    const introduction = new Introduction();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const getIntroduction = async () => {
        setLoading(true);
        const result = await introduction.getIntroduction(introductionId);
        if (result === null) {
            dispatch(
                setMessageAction(
                    introduction.errorMessage,
                    introduction.errorCode
                )
            );
            setLoading(false);

            return;
        }
        setLoading(false);
        setFormValues(result.item);
    };

    useEffect(() => {
        dispatch(clearMessageAction());
        // getIntroduction();
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

    const onSubmit = async (values) => {
        const {
            introductionNo,
            introductionDate,
            barOwner,
            carrier,
            startPoint,
            endPoint,
            ownerUnitUSD,
            ownerUnitIRR,
        } = values;
        setLoading(true);
        const result = await introduction.updateIntroduction(
            introductionId,
            introductionNo,
            introductionDate,
            barOwner,
            carrier,
            startPoint,
            endPoint,
            ownerUnitUSD,
            ownerUnitIRR
        );

        if (result === null) {
            dispatch(
                setMessageAction(
                    introduction.errorMessage,
                    introduction.errorCode
                )
            );
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${editIntroductionPage.submitted}`);
        navigate(`${BASE_PATH}/introductions`);
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
            title={`${editIntroductionPage._title}`}
            subTitle={`${editIntroductionPage._subTitle}`}
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

export default EditIntroduction;
