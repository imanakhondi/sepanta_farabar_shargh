import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormikForm from "../../../../common/FormikForm";
import * as Yup from "yup";
import FormikControl from "../../../../common/FormikControl";
import { repairTankPage } from "../../../../constants/strings/fa";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_PATH } from "../../../../constants";
import { Repair } from "../../../../http/entities/Repair";

const initialValues = {
    repairDate: "",
    cost: "",
    description: "",
};
const validationSchema = Yup.object({
    tankNo: Yup.string(),
});

const EditRepairTank = () => {
    const params = useParams();
    const tankId = params.id;
    const navigate = useNavigate();
    const repair = new Repair();
    const [formValues, setFormValues] = useState(null);
    const messageState = useSelector((state) => state.messageReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        dispatch(clearMessageAction());
        
            const getRepairTank = async () => {
                setLoading(true);
                const result = await repair.getTankRepair(tankId);
                if (result === null) {
                    dispatch(setMessageAction(repair.errorMessage, repair.errorCode));
                    setLoading(false);
        
                    return;
                }
                setLoading(false);
                setFormValues(result.item);
            };
            getRepairTank();
    }, []);
console.log("tankId: ", tankId);
    const onSubmit = async (values) => {
        const { repairDate, cost, description } = values;
        const result = await repair.updateRepairTank(
            tankId,
            repairDate,
            cost,
            description
        );

        if (result === null) {
            dispatch(setMessageAction(repair.errorMessage, repair.errorCode));
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.success(`${repairTankPage.submitted}`);
        // navigate(`${BASE_PATH}/companies`);
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
            title={`${repairTankPage._titleAdd}`}
            subTitle={`${repairTankPage._subTitleAdd}`}
        >
            <FormikControl
                control="date"
                name="repairDate"
                formik={formik}
                pageString={repairTankPage}
                onChange={(event) => {
                    formik.setFieldValue("repairDate", event.toString());
                }}
            />
            <FormikControl
                control="input"
                name="cost"
                formik={formik}
                pageString={repairTankPage}
            />
            <FormikControl
                control="textarea"
                name="description"
                formik={formik}
                pageString={repairTankPage}
            />
        </FormikForm>
    );
};

export default EditRepairTank;
