import React, { useEffect, useState } from "react";
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

let initialValues = {
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

const EditCars = () => {
    const params = useParams();
    const carId = params.id;
    const navigate = useNavigate();
    const car = new Car();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const getCar = async () => {
        setLoading(true);
        const result = await car.getCar(carId);
        console.log(result);
        if (result !== null) {
            setLoading(false);
            setFormValues(result.item);
            console.log([...result.item.irNo]);
            let CLPN1 = `${[...result.item.irNo][0]}${
                [...result.item.irNo][1]
            }`;
            let CLPN2 = `${[...result.item.irNo][2]}`;
            let CLPN3 = `${[...result.item.irNo][3]}${
                [...result.item.irNo][4]
            }${[...result.item.irNo][5]}`;
            let CLPN4 = `${[...result.item.irNo][6]}${
                [...result.item.irNo][7]
            }`;
            console.log(CLPN1, CLPN2, CLPN3, CLPN4);
            setFormValues(result.item, CLPN1, CLPN2, CLPN3, CLPN4);
        }
    };

    useEffect(() => {
        getCar();
    }, []);

    const onSubmit = async (values) => {
        // values.irNo = `${values.CLPN1}${values.CLPN2}${values.CLPN3}${values.CLPN4}`;
        // values.transitNo = `${values.CTLPN1}${values.CTLPN2}${values.CTLPN3}${values.CTLPN4}`;
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
            //show message failure
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
            {/* <span className="block w-full text-xs mt-5 text-black/50">
                {editCarPage.irNo}
            </span>
            <div className="flex gap-x-2">
                <FormikControl
                    control="input"
                    name="CLPN4"
                    formik={formik}
                    pageString={editCarPage}
                    custom="!w-[50px] md:!w-[100px]"
                    //   type="number"
                />
                <FormikControl
                    control="input"
                    name="CLPN3"
                    formik={formik}
                    pageString={editCarPage}
                    //   type="number"
                    custom="!w-[50px] md:!w-[100px]"
                />
                <FormikControl
                    control="input"
                    name="CLPN2"
                    formik={formik}
                    custom="!w-[50px]"
                    pageString={editCarPage}
                />
                <FormikControl
                    control="input"
                    name="CLPN1"
                    formik={formik}
                    pageString={editCarPage}
                    //   type="number"
                    custom="!w-[50px] md:!w-[100px]"
                />
            </div>
            <span className="block w-full text-xs mt-5 text-black/50">
                {editCarPage.transitNo}
            </span>
            <div className="flex gap-x-2">
                <FormikControl
                    control="input"
                    name="CTLPN4"
                    formik={formik}
                    pageString={editCarPage}
                    custom="!w-[50px] md:!w-[100px]"
                    //   type="number"
                />
                <FormikControl
                    control="input"
                    name="CTLPN3"
                    formik={formik}
                    pageString={editCarPage}
                    //   type="number"
                    custom="!w-[50px] md:!w-[100px]"
                />
                <FormikControl
                    control="input"
                    name="CTLPN2"
                    formik={formik}
                    custom="!w-[50px]"
                    pageString={editCarPage}
                />
                <FormikControl
                    control="input"
                    name="CTLPN1"
                    formik={formik}
                    pageString={editCarPage}
                    //   type="number"
                    custom="!w-[50px] md:!w-[100px]"
                />
            </div> */}
        </FormikForm>
    );
};

export default EditCars;
