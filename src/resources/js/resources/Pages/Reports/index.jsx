import { useFormik } from "formik";
import FormikForm from "../../common/FormikForm";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useState } from "react";
import { reportsPage } from "../../constants/strings/fa";
import FormikControl from "../../common/FormikControl";

const initialValues = {
    date: "",
    name: "",
};

const validationSchema = Yup.object({
    date: Yup.string(),
});

const Reports = () => {
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onSubmit = (values) => {
        console.log(values);
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });

    return (
        <div>
            <FormikForm
                onSubmit={formik.handleSubmit}
                loading={loading}
                error={messageState}
                title={`${reportsPage._title}`}
                subTitle={`${reportsPage._subTitle}`}
            >
                <FormikControl
                    control="date"
                    name="date"
                    formik={formik}
                    pageString={reportsPage}
                    onChange={(event) => {
                        formik.setFieldValue("date", event.toString());
                    }}
                />
                <FormikControl
                    control="input"
                    name="name"
                    formik={formik}
                    pageString={reportsPage}
                />
            </FormikForm>
        </div>
    );
};

export default Reports;
