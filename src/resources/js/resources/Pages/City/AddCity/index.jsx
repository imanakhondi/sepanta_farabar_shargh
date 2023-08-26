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
import { addCityPage, validation } from "../../../constants/strings/fa";
import { City } from "../../../http/entities/City";

const initialValues = {
    cityName: "",
};

const validationSchema = Yup.object({
    cityName: Yup.string().min(2,`${validation.minMessage}`).max(50,`${validation.maxMessage}`).required(`${validation.stringMessage}`),
});

const AddCity = () => {
    const city = new City();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async ({ cityName }) => {
        setLoading(true);
        const result = await city.storeCity(cityName);

        if (result === null) {
            dispatch(setMessageAction(city.errorMessage, city.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${addCityPage.submitted}`);
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
            title={`${addCityPage._title}`}
            subTitle={`${addCityPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="cityName"
                formik={formik}
                pageString={addCityPage}
            />
        </FormikForm>
    );
};

export default AddCity;
