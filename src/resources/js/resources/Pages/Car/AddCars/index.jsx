import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { addCarPage } from "../../../constants/strings/fa";
import { Car } from "../../../http/entities/Car";
import { useDispatch, useSelector } from "react-redux";
import { clearMessageAction, setMessageAction } from "../../../state/message/messageAction";
import { toast } from "react-toastify";

let initialValues = {
    name: "",
    family: "",
    nationalCode: "",
    mobile: "",
    carLicensePlateNum: "",
    carTransitLicensePlateNum: "",
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
    carLicensePlateNum: Yup.string(),
    carTransitLicensePlateNum: Yup.string(),
});
const AddCars = () => {
    const car = new Car();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        values.carLicensePlateNum = `${values.CLPN1}${values.CLPN2}${values.CLPN3}${values.CLPN4}`;
        values.carTransitLicensePlateNum = `${values.CTLPN1}${values.CTLPN2}${values.CTLPN3}${values.CTLPN4}`;
        const {
            name,
            family,
            nationalCode,
            mobile,
            carLicensePlateNum,
            carTransitLicensePlateNum,
        } = values;
        setLoading(true);
        const result = await car.storeCar(
            name,
            family,
            nationalCode,
            mobile,
            carLicensePlateNum,
            carTransitLicensePlateNum
        );
        if (result === null) {
            //show message failure
            dispatch(setMessageAction(car.errorMessage, car.errorCode));
            setLoading(false);

            return;
        }
        setLoading(false);
        toast.success(`${addCarPage.submitted}`)
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
            title={`${addCarPage._title}`}
            subTitle={`${addCarPage._subTitle}`}
        >
            <FormikControl
                control="input"
                name="name"
                formik={formik}
                pageString={addCarPage}
            />
            <FormikControl
                control="input"
                name="family"
                formik={formik}
                pageString={addCarPage}
            />
            <FormikControl
                control="input"
                name="nationalCode"
                formik={formik}
                pageString={addCarPage}
            />
            <FormikControl
                control="input"
                name="mobile"
                formik={formik}
                pageString={addCarPage}
            />
            <span className="block w-full text-xs mt-5 text-black/50">
                {addCarPage.carLicensePlateNum}
            </span>
            <div className="flex gap-x-2">
                <FormikControl
                    control="input"
                    name="CLPN4"
                    formik={formik}
                    pageString={addCarPage}
                    custom="!w-[50px] md:!w-[100px]"
                    //   type="number"
                />
                <FormikControl
                    control="input"
                    name="CLPN3"
                    formik={formik}
                    pageString={addCarPage}
                    //   type="number"
                    custom="!w-[50px] md:!w-[100px]"
                />
                <FormikControl
                    control="input"
                    name="CLPN2"
                    formik={formik}
                    custom="!w-[50px]"
                    pageString={addCarPage}
                />
                <FormikControl
                    control="input"
                    name="CLPN1"
                    formik={formik}
                    pageString={addCarPage}
                    //   type="number"
                    custom="!w-[50px] md:!w-[100px]"
                />
            </div>
            <span className="block w-full text-xs mt-5 text-black/50">
                {addCarPage.carTransitLicensePlateNum}
            </span>
            <div className="flex gap-x-2">
                <FormikControl
                    control="input"
                    name="CTLPN4"
                    formik={formik}
                    pageString={addCarPage}
                    custom="!w-[50px] md:!w-[100px]"
                    //   type="number"
                />
                <FormikControl
                    control="input"
                    name="CTLPN3"
                    formik={formik}
                    pageString={addCarPage}
                    //   type="number"
                    custom="!w-[50px] md:!w-[100px]"
                />
                <FormikControl
                    control="input"
                    name="CTLPN2"
                    formik={formik}
                    custom="!w-[50px]"
                    pageString={addCarPage}
                />
                <FormikControl
                    control="input"
                    name="CTLPN1"
                    formik={formik}
                    pageString={addCarPage}
                    //   type="number"
                    custom="!w-[50px] md:!w-[100px]"
                />
            </div>
        </FormikForm>
    );
};

export default AddCars;
