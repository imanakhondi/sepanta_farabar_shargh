import  { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DateInput = ({
    name,
    formik,
    strings = null,
    pageString,
    showLabel = false,
    onChange,
    custom = "",
    // customStyleInput = "",
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
        <div className={`${custom} flex flex-col mt-2 w-full lg:w-[300px] xl:w-[400px]`}>
            {showLabel && (
                <label className="text-primaryColor dark:text-primaryColorDark mb-1 text-sm">
                    {label}
                </label>
            )}
            <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={formik.values[name]}
                format="YYYY/MM/DD"
                name={name}
                onChange={onChange}
                inputClass="custom-input"
                placeholder={placeholder}
            />
            {formik.errors[name] && formik.touched[name] && (
                <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
                    {formik.errors[name]}
                </div>
            )}
        </div>
    );
};

export default DateInput;
