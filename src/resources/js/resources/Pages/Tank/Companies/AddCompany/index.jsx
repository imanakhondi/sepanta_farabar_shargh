import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../../common/FormikControl";
import { addCompanyPage, validation } from "../../../../constants/strings/fa";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Company } from "../../../../http/entities/Copmany";

const initialValues = {
    companyName: "",
    mobile: "",
};
const validationSchema = Yup.object({
    companyName: Yup.string().min(2,`${validation.minMessage}`).max(50,`${validation.maxMessage}`).required(`${validation.stringMessage}`),
});

const AddCompany = () => {
    const company = new Company();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        const { companyName, mobile } = values;
        setLoading(true);
        const result = await company.storeCompany(companyName, mobile);

        if (result === null) {
            dispatch(setMessageAction(company.errorMessage, company.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${addCompanyPage.submitted}`);
        window.location.reload();
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });

    return (
        <FormikForm
            onSubmit={formik.handleSubmit}
            loading={loading}
            error={messageState}
            title={`${addCompanyPage._title}`}
            subTitle={`${addCompanyPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="companyName"
                formik={formik}
                pageString={addCompanyPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={addCompanyPage}
            />
        </FormikForm>
    );
};

export default AddCompany;
