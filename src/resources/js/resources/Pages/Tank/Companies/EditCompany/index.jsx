import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../../common/FormikControl";
import { editCompanyPage, validation } from "../../../../constants/strings/fa";
import { Company } from "../../../../http/entities/Copmany";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_PATH } from "../../../../constants";

const initialValues = {
    name: "",
    mobile: "",
};
const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, `${validation.minMessage}`)
        .max(50, `${validation.maxMessage}`)
        .required(`${validation.stringMessage}`),
});

const EditCompany = () => {
    const params = useParams();
    const companyId = params.id;
    const navigate = useNavigate();
    const company = new Company();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const getCompany = async () => {
        setLoading(true);
        const result = await company.getCompany(companyId);
        if (result === null) {
            dispatch(setMessageAction(company.errorMessage, company.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        setFormValues(result.item);
    };

    useEffect(() => {
        getCompany();
    }, []);

    const onSubmit = async (values) => {
        const { name, mobile } = values;
        const result = await company.updateCompany(companyId, name, mobile);

        if (result === null) {
            dispatch(setMessageAction(company.errorMessage, company.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${editCompanyPage.submitted}`);
        navigate(`${BASE_PATH}/companies`);
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
            title={`${editCompanyPage._title}`}
            subTitle={`${editCompanyPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={editCompanyPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={editCompanyPage}
            />
        </FormikForm>
    );
};

export default EditCompany;
