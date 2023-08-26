import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { addDriverPage, validation } from "../../../constants/strings/fa";
import { Driver } from "../../../http/entities/Driver";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { toast } from "react-toastify";

const initialValues = {
    name: "",
    family: "",
    nationalNo: "",
    mobile: "",
    licenseNo: "",
    cardNo: "",
    searchTerm: "",
};
const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, `${validation.minMessage}`)
        .max(50, `${validation.maxMessage}`)
        .required(`${validation.stringMessage}`),
    // searchTerm: Yup.string().required("show"),
});

const AddDriver = () => {
    const driver = new Driver();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        const { name, family, nationalNo, mobile, licenseNo, cardNo } = values;
        setLoading(true);
        const result = await driver.storeDriver(
            name,
            family,
            nationalNo,
            mobile,
            licenseNo,
            cardNo
        );
        if (result === null) {
            dispatch(setMessageAction(driver.errorMessage, driver.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        toast.success(`${addDriverPage.submitted}`);
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
            title={`${addDriverPage._title}`}
            subTitle={`${addDriverPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={addDriverPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={addDriverPage}
            />
            <FormikControl
                control="input"
                name="nationalNo"
                formik={formik}
                pageString={addDriverPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={addDriverPage}
            />
            <FormikControl
                control="input"
                name="licenseNo"
                formik={formik}
                pageString={addDriverPage}
                type="number"
            />
            <FormikControl
                control="input"
                name="cardNo"
                formik={formik}
                pageString={addDriverPage}
                type="number"
            />
        </FormikForm>
    );
};

export default AddDriver;
