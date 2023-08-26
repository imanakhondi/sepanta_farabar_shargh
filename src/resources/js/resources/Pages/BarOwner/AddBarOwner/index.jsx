import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { addBarOwnerPage, validation } from "../../../constants/strings/fa";
import { BarOwner } from "../../../http/entities/BarOwner";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialValues = {
    companyName: "",
    name: "",
    family: "",
    mobile: "",
};
const validationSchema = Yup.object({
    companyName: Yup.string()
        .min(2, `${validation.minMessage}`)
        .max(50, `${validation.maxMessage}`)
        .required(`${validation.stringMessage}`),
});

const AddBarOwner = () => {
    const barOwner = new BarOwner();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        const { companyName, name, family, mobile } = values;
        setLoading(true);
        const result = await barOwner.storeBarOwner(
            companyName,
            name,
            family,
            mobile
        );

        if (result === null) {
            dispatch(
                setMessageAction(barOwner.errorMessage, barOwner.errorCode)
            );
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${addBarOwnerPage.submitted}`);
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
            title={`${addBarOwnerPage._title}`}
            subTitle={`${addBarOwnerPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="companyName"
                formik={formik}
                pageString={addBarOwnerPage}
            />
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={addBarOwnerPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={addBarOwnerPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={addBarOwnerPage}
            />
        </FormikForm>
    );
};

export default AddBarOwner;
