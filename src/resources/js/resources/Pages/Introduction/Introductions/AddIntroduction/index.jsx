import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikForm from "../../../../common/FormikForm";
import { useDispatch, useSelector } from "react-redux";
import { clearMessageAction, setMessageAction } from "../../../../state/message/messageAction";
import { addIntroductionPage } from "../../../../constants/strings/fa";
import FormikControl from "../../../../common/FormikControl";
import { Introduction } from "../../../../http/entities/Introduction";
import { toast } from "react-toastify";

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
    startPoint: "",
    endPoint: "",
    ownerUnitUSD: "",
    ownerUnitIRR: "",
};
const validationSchema = Yup.object({
    introductionNo: Yup.string(),
    introductionDate: Yup.string(),
    barOwner: Yup.string(),
    startPoint: Yup.string(),
    endPoint: Yup.string(),
    ownerUnitUSD: Yup.string(),
    ownerUnitIRR: Yup.string(),
});
const AddIntroduction = () => {
    const introduction=new Introduction()
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit =async (values) => {
        const {
            introductionNo,
            introductionDate,
            barOwner,
            startPoint,
            endPoint,
            ownerUnitUSD,
            ownerUnitIRR
        } = values;
        setLoading(true);
        const result = await introduction.storeIntroduction(
            introductionNo,
            introductionDate,
            barOwner,
            startPoint,
            endPoint,
            ownerUnitUSD,
            ownerUnitIRR
        );

        if (result === null) {
            dispatch(
                setMessageAction(barOwner.errorMessage, barOwner.errorCode)
            );
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${addIntroductionPage.submitted}`);
        window.location.reload();
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });

    return (
        <FormikForm
            onSubmit={formik.handleSubmit}
            loading={loading}
            error={messageState}
            title={`${addIntroductionPage._title}`}
            subTitle={`${addIntroductionPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="introductionNo"
                formik={formik}
                pageString={addIntroductionPage}
                readOnly
            />
            <FormikControl
                control="date"
                name="introductionDate"
                formik={formik}
                pageString={addIntroductionPage}
                onChange={(event) => {
                    formik.setFieldValue("introductionDate", event.toString());
                }}
            />
            <FormikControl
                control="searchableDropdown"
                name="barOwner"
                formik={formik}
                pageString={addIntroductionPage}
                selectOptions={barOwnerOptions}
                label="name"
            />
            {/* <FormikControl
                control="input"
                name="carrier"
                formik={formik}
                pageString={addIntroductionPage}
            /> */}
            <FormikControl
                control="searchableDropdown"
                name="startPoint"
                formik={formik}
                pageString={addIntroductionPage}
                selectOptions={startPointOptions}
            />
            <FormikControl
                control="searchableDropdown"
                name="endPoint"
                formik={formik}
                pageString={addIntroductionPage}
                selectOptions={endPointOptions}
            />
            <FormikControl
                control="input"
                name="ownerUnitUSD"
                formik={formik}
                pageString={addIntroductionPage}
            />
            <FormikControl
                control="input"
                name="ownerUnitIRR"
                formik={formik}
                pageString={addIntroductionPage}
            />
        </FormikForm>
    );
};

export default AddIntroduction;
