import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../../common/FormikControl";
import { editTankPage } from "../../../../constants/strings/fa";
import { Tank } from "../../../../http/entities/Tank";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_PATH } from "../../../../constants";

const initialValues = {
    tankNo: "",
    psiDate: "",
    testValidityDate: "",
    capotageDate: "",
};
const validationSchema = Yup.object({
    tankNo: Yup.string(),
});

const EditTank = () => {
    const params = useParams();
    const tankId = params.id;
    const navigate = useNavigate();
    const tank = new Tank();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const getTank = async () => {
        setLoading(true);
        const result = await tank.getTank(tankId);
        if (result === null) {
            dispatch(
                setMessageAction(tank.errorMessage, tank.errorCode)
            );
            setLoading(false);

            return;
        }
            setLoading(false);
            setFormValues(result.item);
    };

    useEffect(() => {
        dispatch(clearMessageAction());
        getTank();
    }, []);

    const onSubmit = async (values) => {
        const { tankNo, psiDate, testValidityDate, capotageDate } = values;
        const result = await tank.updateTank(
            tankId,
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
        toast.success(`${editTankPage.submitted}`);
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
            title={`${editTankPage._title}`}
            subTitle={`${editTankPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="tankNo"
                formik={formik}
                pageString={editTankPage}
                type="number"
            />
            <FormikControl
                control="date"
                name="psiDate"
                formik={formik}
                pageString={editTankPage}
                onChange={(event) => {
                    formik.setFieldValue("psiDate", event.toString());
                }}
            />
            <FormikControl
                control="date"
                name="testValidityDate"
                formik={formik}
                pageString={editTankPage}
                onChange={(event) => {
                    formik.setFieldValue("testValidityDate", event.toString());
                }}
            />
            <FormikControl
                control="date"
                name="capotageDate"
                formik={formik}
                pageString={editTankPage}
                onChange={(event) => {
                    formik.setFieldValue("capotageDate", event.toString());
                }}
            />
        </FormikForm>
    );
};

export default EditTank;
