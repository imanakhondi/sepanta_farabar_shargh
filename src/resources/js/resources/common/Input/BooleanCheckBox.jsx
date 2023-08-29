import { useEffect, useState } from "react";

const BooleanCheckBox = ({
    formik,
    name,
    strings = null,
    showLabel = false,
    custom = "",
    customStyleInput = "",
    pageString,
}) => {
    const [label, setLabel] = useState(
        strings && name in strings ? strings[name] : ""
    );
    const [placeholder, setPlaceholder] = useState(
        strings && `${name}Placeholder` in strings
            ? strings[`${name}Placeholder`]
            : ""
    );
    useEffect(() => {
        if (!strings) {
            setLabel(pageString && name in pageString ? pageString[name] : "");
            setPlaceholder(
                pageString && `${name}Placeholder` in pageString
                    ? pageString[`${name}Placeholder`]
                    : ""
            );
        }
    }, []);
    return (
        <div  className={`${custom} flex flex-col mt-2 w-full lg:w-[300px] xl:w-[400px]`}>
            {showLabel && (
                <label className="intro-x text-slate-600 mb-1 text-sm">
                    {label}
                </label>
            )}
            <div className="col-start-2 col-span-3 flex items-center">
                <input
                    type="checkbox"
                    id={name}
                    name={name}
                    value={true}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values[name]}
                />
                <label htmlFor={name} className="text-sm mr-2"> {label}</label>
            </div>
            {formik.errors[name] && formik.touched[name] && (
                <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
                    {formik.errors[name]}
                </div>
            )}
        </div>
    );
};

export default BooleanCheckBox;
