import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { editBarOwnerPage, validation } from "../../../constants/strings/fa";
import { BarOwner } from "../../../http/entities/BarOwner";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_PATH } from "../../../constants";

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

const EditBarOwner = () => {
    const params = useParams();
    const barOwnerId = params.id;
    const navigate = useNavigate();
    const barOwner = new BarOwner();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const getBarOwner = async () => {
        setLoading(true);
        const result = await barOwner.getBarOwner(barOwnerId);
        console.log(result);
        if (result === null) {
            dispatch(
                setMessageAction(barOwner.errorMessage, barOwner.errorCode)
            );
            setLoading(false);

            return;
        }
        setLoading(false);
        setFormValues(result.item);
    };

    useEffect(() => {
        dispatch(clearMessageAction());
        getBarOwner();
    }, []);

    const onSubmit = async (values) => {
        const { companyName, name, family, mobile } = values;
        setLoading(true);
        const result = await barOwner.updateBarOwner(
            barOwnerId,
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
        toast.success(`${editBarOwnerPage.submitted}`);
        navigate(`${BASE_PATH}/barOwners`);
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
            title={`${editBarOwnerPage._title}`}
            subTitle={`${editBarOwnerPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="companyName"
                formik={formik}
                pageString={editBarOwnerPage}
            />
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={editBarOwnerPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={editBarOwnerPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={editBarOwnerPage}
            />
        </FormikForm>
    );
};

export default EditBarOwner;
