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
import { useParams } from "react-router-dom";

const initialValues = {
    tankNo: "",
    psiDate: "",
    testValidityDate: "",
    capotageDate: "",
};
const validationSchema = Yup.object({
    tankNo: Yup.string(),
    psiDate: Yup.string(),
    testValidityDate: Yup.string(),
    capotageDate: Yup.string(),
});

const AddTank = () => {
    const tank = new Tank();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const companyId = params.id;

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        const { tankNo, psiDate, testValidityDate, capotageDate } = values;
        setLoading(true);
        const result = await tank.storeTank(
            companyId,
            tankNo,
            psiDate,
            testValidityDate,
            capotageDate
        );

        if (result === null) {
            dispatch(setMessageAction(tank.errorMessage, tank.errorCode));
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
                formik.setFieldValue(
                    "testValidityDate",
                    event.toString()
                );
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
