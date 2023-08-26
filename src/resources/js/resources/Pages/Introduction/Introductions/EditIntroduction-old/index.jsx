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
    name: Yup.string(),
    family: Yup.string(),
    tankNo: Yup.string(),
});

const EditIntroduction = () => {
    const params = useParams();
    const tankId = params.id;
    const navigate = useNavigate();
    const tank = new Tank();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const getTank = async () => {
        setLoading(true);
        const result = await tank.getTank(tankId);
        if (result !== null) {
            setLoading(false);
            setFormValues(result.item);
        }
    };

    useEffect(() => {
        getTank();
    }, []);

    const onSubmit = async (values) => {
        const { name, family, nationalNo, mobile, tankNo } = values;
        const result = await tank.updateTank(
            tankId,
            name,
            family,
            nationalNo,
            mobile,
            tankNo
        );

        if (result === null) {
            //show message failure
            dispatch(setMessageAction(tank.errorMessage, tank.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${editTankPage.submitted}`);
        navigate(`${BASE_PATH}/tanks`);
        //show message success
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
                name="name"
                formik={formik}
                pageString={editTankPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={editTankPage}
            />
            <FormikControl
                control="input"
                name="nationalNo"
                formik={formik}
                pageString={editTankPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={editTankPage}
            />
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

export default EditIntroduction;
