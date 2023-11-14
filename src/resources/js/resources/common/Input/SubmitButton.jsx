import { Link, useNavigate } from "react-router-dom";
import { general } from "../../constants/strings/fa";

const SubmitButton = ({
    disabled = "",
    submit = `${general.submit}`,
    customStyleBtn = "",
    showEditBTN = false,
    onClick,
    onCancel,
    hasCancel = true,
}) => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-end gap-x-3 w-full">
            {showEditBTN ? (
                <button
                    type="submit"
                    // disabled={!formik.isValid}
                    disabled={disabled}
                    className={`${customStyleBtn} bg-btnPrimaryColor w-20 text-xs rounded-xl py-3 px-5 mt-3 text-white`}
                    onClick={onClick}
                >
                    {general.edit}
                </button>
            ) : (
                <button
                    type="submit"
                    // disabled={!formik.isValid}
                    disabled={disabled}
                    className={`${customStyleBtn} bg-btnPrimaryColor w-20 text-xs rounded-xl py-3 px-5 mt-3 text-white`}
                >
                    {submit}
                </button>
            )}
            {hasCancel && (
                <Link
                    className={`${customStyleBtn} bg-red-500 w-20 text-xs text-center rounded-xl py-3 px-5 mt-3 text-white`}
                    onClick={onCancel ? onCancel : () => navigate(-1)}
                >
                    {onCancel ? general.cancel : general.back}
                </Link>
            )}
        </div>
    );
};

export default SubmitButton;
