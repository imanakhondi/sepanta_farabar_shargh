import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../../common/FormikControl";
import { addTankPage, validation } from "../../../../constants/strings/fa";
import { Tank } from "../../../../http/entities/Tank";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Company } from "../../../../http/entities/Copmany";

const initialValues = {
    name: "",
    family: "",
    nationalNo: "",
    mobile: "",
    tankNo: "",
    psiDate: "",
    testValidityDate: "",
    capotageDate: "",
};
const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, `${validation.minMessage}`)
        .max(50, `${validation.maxMessage}`)
        .required(`${validation.stringMessage}`),
});

const AddTank = () => {
    const Company = new Company();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        const {
            name,
            family,
            nationalNo,
            mobile,
            tankNo,
            psiDate,
            testValidityDate,
            capotageDate,
        } = values;
        setLoading(true);
        const result = await Company.storeCompany(
            name,
            family,
            nationalNo,
            mobile,
            tankNo,
            psiDate,
            testValidityDate,
            capotageDate
        );

        if (result === null) {
            dispatch(
                setMessageAction(
                    Company.errorMessage,
                    Company.errorCode
                )
            );
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${addTankPage.submitted}`);
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
            title={`${addTankPage._title}`}
            subTitle={`${addTankPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={addTankPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={addTankPage}
            />
            <FormikControl
                control="input"
                name="nationalNo"
                formik={formik}
                pageString={addTankPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={addTankPage}
            />
            <FormikControl
                control="input"
                name="tankNo"
                formik={formik}
                pageString={addTankPage}
                type="number"
            />
            <FormikControl
                control="date"
                name="psiDate"
                formik={formik}
                pageString={addTankPage}
                onChange={(event) => {
                    formik.setFieldValue("psiDate", event.toString());
                }}
            />
            <FormikControl
                control="date"
                name="testValidityDate"
                formik={formik}
                pageString={addTankPage}
                onChange={(event) => {
                    formik.setFieldValue("testValidityDate", event.toString());
                }}
            />
            <FormikControl
                control="date"
                name="capotageDate"
                formik={formik}
                pageString={addTankPage}
                onChange={(event) => {
                    formik.setFieldValue("capotageDate", event.toString());
                }}
            />
        </FormikForm>
    );
};

export default AddTank;
