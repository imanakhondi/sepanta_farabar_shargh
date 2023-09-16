import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import FormikControl from "../../../common/FormikControl";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { toast } from "react-toastify";
import { editCityPage, validation } from "../../../constants/strings/fa";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_PATH } from "../../../constants";
import { City } from "../../../http/entities/City";

const initialValues = {
    name: "",
};

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, `${validation.minMessage}`)
        .max(50, `${validation.maxMessage}`)
        .required(`${validation.stringMessage}`),
});

const EditCity = () => {
    const params = useParams();
    const cityId = params.id;
    const navigate = useNavigate();
    const city = new City();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const getCity = async () => {
        setLoading(true);
        const result = await city.getCity(cityId);
        if (result === null) {
            dispatch(setMessageAction(city.errorMessage, city.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        setFormValues(result.item);
    };

    useEffect(() => {
        dispatch(clearMessageAction());
        getCity();
    }, []);

    const onSubmit = async ({ name }) => {
        setLoading(true);
        const result = await city.updateCity(cityId, name);

        if (result === null) {
            dispatch(setMessageAction(city.errorMessage, city.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${editCityPage.submitted}`);
        navigate(`${BASE_PATH}/cities`);
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
            title={`${editCityPage._title}`}
            subTitle={`${editCityPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={editCityPage}
            />
        </FormikForm>
    );
};

export default EditCity;
