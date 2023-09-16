import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../common/FormikControl";
import { addCarPage, validation } from "../../../constants/strings/fa";
import { Car } from "../../../http/entities/Car";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageAction";
import { toast } from "react-toastify";

const AlphabetPersianOptions = [
    { id: "الف", title: "الف" },
    { id: "ب", title: "ب" },
    { id: "پ", title: "پ" },
    { id: "ت", title: "ت" },
    { id: "ج", title: "ج" },
    { id: "چ", title: "چ" },
    { id: "ح", title: "ح" },
    { id: "خ", title: "خ" },
    { id: "د", title: "د" },
    { id: "ذ", title: "ذ" },
    { id: "ر", title: "ر" },
    { id: "ز", title: "ز" },
    { id: "ژ", title: "ژ" },
    { id: "س", title: "س" },
    { id: "ش", title: "ش" },
    { id: "ص", title: "ص" },
    { id: "ض", title: "ض" },
    { id: "ط", title: "ط" },
    { id: "ظ", title: "ظ" },
    { id: "ع", title: "ع" },
    { id: "غ", title: "غ" },
    { id: "ف", title: "ف" },
    { id: "ق", title: "ق" },
    { id: "ک", title: "ک" },
    { id: "گ", title: "گ" },
    { id: "ل", title: "ل" },
    { id: "م", title: "م" },
    { id: "ن", title: "ن" },
    { id: "و", title: "و" },
    { id: "ه", title: "ه" },
    { id: "ی", title: "ی" },
];
const AlphabetEnglishOptions = [
    { id: "A", title: "A" },
    { id: "B", title: "B" },
    { id: "C", title: "C" },
    { id: "D", title: "D" },
    { id: "E", title: "E" },
    { id: "F", title: "F" },
    { id: "G", title: "G" },
    { id: "H", title: "H" },
    { id: "I", title: "I" },
    { id: "J", title: "J" },
    { id: "K", title: "K" },
    { id: "L", title: "L" },
    { id: "M", title: "M" },
    { id: "N", title: "N" },
    { id: "O", title: "O" },
    { id: "P", title: "P" },
    { id: "Q", title: "Q" },
    { id: "R", title: "R" },
    { id: "S", title: "S" },
    { id: "T", title: "T" },
    { id: "U", title: "U" },
    { id: "V", title: "V" },
    { id: "W", title: "W" },
    { id: "X", title: "X" },
    { id: "Y", title: "Y" },
    { id: "Z", title: "Z" },
];

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
    name: Yup.string()
        .min(2, `${validation.minMessage}`)
        .max(50, `${validation.maxMessage}`)
        .required(`${validation.stringMessage}`),
});
const AddCar = () => {
    const car = new Car();
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(clearMessageAction());
    }, []);

    const onSubmit = async (values) => {
        values.irNo = `${values.CLPN1}${values.CLPN2}${values.CLPN3}-${values.CLPN4}`;
        values.transitNo = `${values.CTLPN1}${values.CTLPN2}${values.CTLPN3}-${values.CTLPN4}`;
        const { name, family, nationalNo, mobile, irNo, transitNo } = values;
        setLoading(true);
        console.log(name, family, nationalNo, mobile, irNo, transitNo);
        const result = await car.storeCar(
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
        toast.success(`${addCarPage.submitted}`);
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
                name="nationalNo"
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
                {addCarPage.irNo}
            </span>
            <div className="flex gap-x-2">
                <FormikControl
                    control="input"
                    name="CLPN4"
                    formik={formik}
                    pageString={addCarPage}
                    custom="!w-[50px] md:!w-[100px]"
                />
                <FormikControl
                    control="input"
                    name="CLPN3"
                    formik={formik}
                    pageString={addCarPage}
                    custom="!w-[50px] md:!w-[100px]"
                />
                <FormikControl
                    control="select"
                    name="CLPN2"
                    formik={formik}
                    custom="!w-[120px]"
                    customStyleInput="rounded-xl text-xs"
                    pageString={addCarPage}
                    selectOptions={AlphabetPersianOptions}
                />
                <FormikControl
                    control="input"
                    name="CLPN1"
                    formik={formik}
                    pageString={addCarPage}
                    custom="!w-[50px] md:!w-[100px]"
                />
            </div>
            <span className="block w-full text-xs mt-5 text-black/50">
                {addCarPage.transitNo}
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
                    control="select"
                    name="CTLPN2"
                    formik={formik}
                    custom="!w-[120px]"
                    customStyleInput="rounded-xl text-xs"
                    pageString={addCarPage}
                    selectOptions={AlphabetEnglishOptions}
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

export default AddCar;
