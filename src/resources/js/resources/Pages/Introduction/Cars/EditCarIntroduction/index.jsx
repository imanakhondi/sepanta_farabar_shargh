import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../../common/FormikControl";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_PATH } from "../../../../constants";
import { editCarIntroductionPage } from "../../../../constants/strings/fa";

import { CarIntroduction } from "../../../../http/entities/CarIntroduction";

const initialValues = {
    driverInfoOptions: [],
    carInfoOptions: [],
    tankInfoOptions: [],
    driverInfo: "",
    carInfo: "",
    tankInfo: "",
};
const validationSchema = Yup.object({
    driverName: Yup.string(),
    irNo: Yup.string(),
    transitNo: Yup.string(),
    tankNo: Yup.string(),
    licenseNo: Yup.string(),
    mobile: Yup.string(),
});

const EditCarIntroduction = () => {
    // const params = useParams();
    // const carId = params.id;
    const { tankId, introductionId } = useParams();
    const navigate = useNavigate();
    const carIntroduction = new CarIntroduction();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(clearMessageAction());

        const getAllProps = async () => {
            setLoading(true);
            const result = await carIntroduction.getAddCarsIntroductionProps(
                tankId
            );

            if (result === null) {
                dispatch(
                    setMessageAction(
                        carIntroduction.errorMessage,
                        carIntroduction.errorCode
                    )
                );
                setLoading(false);

                return;
            }
            setTimeout(() => setLoading(false), 200);

            const drivers = result.drivers?.map((driver) => ({
                id: driver.id,
                name: `${driver.name} - ${driver.family} - ${driver.nationalNo} - ${driver.mobile}`,
            }));

            const trucks = result.trucks?.map((truck) => ({
                id: truck.id,
                name: `${truck.irNo} - ${truck.transitNo} `,
            }));

            const tanks = result.tanks?.map((tank) => ({
                id: tank.id,
                name: `${tank.tankNo} `,
            }));

            formik.setFieldValue("driverInfoOptions", drivers);
            formik.setFieldValue("carInfoOptions", trucks);
            formik.setFieldValue("tankInfoOptions", tanks);
        };
        getAllProps();
    }, []);

    useEffect(() => {
        dispatch(clearMessageAction());
        const getCarIntroduction = async () => {
            setLoading(true);
            const result = await carIntroduction.getCarIntroduction(introductionId);

            if (result === null) {
                dispatch(
                    setMessageAction(
                        carIntroduction.errorMessage,
                        carIntroduction.errorCode
                    )
                );
                setLoading(false);

                return;
            }
            setLoading(false);
            setFormValues(result.item);
        };
        getCarIntroduction();
        // setFormValues({
        //     driverInfo: "آوا شریعت-0740004931-09356451716",
        //     carInfo: "21ع426-12 / 21u222-36",
        //     tankInfo: "123",
        // });
    }, []);

    const onSubmit = async (values) => {
        const { driverInfo, carInfo, tankInfo } = values;
        setLoading(true);
        const result = await carIntroduction.updateCarIntroduction(
            introductionId,
            driverInfo,
            carInfo,
            tankInfo
        );
        if (result === null) {
            dispatch(
                setMessageAction(
                    carIntroduction.errorMessage,
                    carIntroduction.errorCode
                )
            );
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${editCarIntroductionPage.submitted}`);
        // navigate(`${BASE_PATH}/cars/${introductionId}`);
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
            title={`${editCarIntroductionPage._title}`}
            subTitle={`${editCarIntroductionPage._subTitle}`}
        >
            <FormikControl
                control="searchableDropdown"
                name="driverInfo"
                formik={formik}
                pageString={editCarIntroductionPage}
                selectOptions={formik.values.driverInfoOptions}
            />
            <FormikControl
                control="searchableDropdown"
                name="carInfo"
                formik={formik}
                pageString={editCarIntroductionPage}
                selectOptions={formik.values.carInfoOptions}
            />
            <FormikControl
                control="searchableDropdown"
                name="tankInfo"
                formik={formik}
                pageString={editCarIntroductionPage}
                selectOptions={formik.values.tankInfoOptions}
            />
        </FormikForm>
    );
};

export default EditCarIntroduction;
