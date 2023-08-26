import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { editCarPage } from "../../../constants/strings/fa";
import { Car } from "../../../http/entities/Car";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_PATH } from "../../../constants";

const initialValues = {
    name: "",
    family: "",
    nationalNo: "",
    mobile: "",
    irNo: "",
    transitNo: "",
    CLPN1: "",
    CLPN2: "",
    CLPN3: "",
    CLPN4: "",
    CTLPN1: "",
    CTLPN2: "",
    CTLPN3: "",
    CTLPN4: "",
};
const validationSchema = Yup.object({
    name: Yup.string(),
    family: Yup.string(),
    irNo: Yup.string(),
    transitNo: Yup.string(),
});

const EditCar = () => {
    const params = useParams();
    const carId = params.id;
    const navigate = useNavigate();
    const car = new Car();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const getCar = async () => {
        setLoading(true);
        const result = await car.getCar(carId);
        if (result === null) {
            dispatch(setMessageAction(car.errorMessage, car.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        setFormValues(result.item);
        let CLPN1 = `${[...result.item.irNo][0]}${[...result.item.irNo][1]}`;
        let CLPN2 = `${[...result.item.irNo][2]}`;
        let CLPN3 = `${[...result.item.irNo][3]}${[...result.item.irNo][4]}${
            [...result.item.irNo][5]
        }`;
        let CLPN4 = `${[...result.item.irNo][6]}${[...result.item.irNo][7]}`;
        setFormValues(result.item, CLPN1, CLPN2, CLPN3, CLPN4);
    };

    useEffect(() => {
        dispatch(clearMessageAction());
        getCar();
    }, []);

    const onSubmit = async (values) => {
        const { name, family, nationalNo, mobile, irNo, transitNo } = values;
        setLoading(true);
        const result = await car.updateCar(
            carId,
            name,
            family,
            nationalNo,
            mobile,
            irNo,
            transitNo
        );
        if (result === null) {
            dispatch(setMessageAction(car.errorMessage, car.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        toast.success(`${editCarPage.submitted}`);
        navigate(`${BASE_PATH}/cars`);
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
            title={`${editCarPage._title}`}
            subTitle={`${editCarPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={editCarPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={editCarPage}
            />
            <FormikControl
                control="input"
                name="nationalNo"
                formik={formik}
                pageString={editCarPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={editCarPage}
            />
            <FormikControl
                control="input"
                name="irNo"
                formik={formik}
                pageString={editCarPage}
            />
            <FormikControl
                control="input"
                name="transitNo"
                formik={formik}
                pageString={editCarPage}
            />
        </FormikForm>
    );
};

export default EditCar;
