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

const initialValues = {
    barOwnerOptions: [],
    startPointOptions: [],
    endPointOptions: [],
    introductionNo: `${Date.now()}`,
    introductionDate: "",
    barOwner: "",
    startPoint: "",
    endPoint: "",
    ownerUnitUSD: "",
    ownerUnitIRR: "",
    barOwnerId: null,
    startPointId: null,
    endPointId: null,
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

    useEffect(() => {
        dispatch(clearMessageAction());
        const getAllProps = async () => {
            setLoading(true);
            const result = await introduction.getAllIntroductionProps();
         
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
            setTimeout(() => setLoading(false), 200);
            formik.setFieldValue("barOwnerOptions", result.barOwners);
            formik.setFieldValue("startPointOptions", result.cities);
            formik.setFieldValue("endPointOptions", result.cities);
        };
        getAllProps();
    }, []);

    useEffect(() => {
        dispatch(clearMessageAction());

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
            setFormValues({
                ...result.item,
                barOwner: result.item.barOwnerCompanyName,
                startPoint: result.item.startPointName,
                endPoint: result.item.endPointName,
            });
        };

        getIntroduction();
    }, []);

    const onSubmit = async (values) => {
        const {
            introductionNo,
            introductionDate,
            barOwner,
            startPoint,
            endPoint,
            ownerUnitUSD,
            ownerUnitIRR,
        } = values;
        setLoading(true);
        const result = await introduction.updateIntroduction(
            barOwner,
            startPoint,
            endPoint,
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
                selectOptions={formik.values.barOwnerOptions}
                label="companyName"
            />
            <FormikControl
                control="searchableDropdown"
                name="startPoint"
                formik={formik}
                pageString={editIntroductionPage}
                selectOptions={formik.values.startPointOptions}
            />
            <FormikControl
                control="searchableDropdown"
                name="endPoint"
                formik={formik}
                pageString={editIntroductionPage}
                selectOptions={formik.values.endPointOptions}
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
