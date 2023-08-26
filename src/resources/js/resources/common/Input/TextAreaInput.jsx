import React, { useEffect, useState } from "react";
const TextAreaInput = ({
    name,
    formik,
    strings = null,
    showLabel = false,
    custom = "",
    customStyleInput,
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
        <div
            className={`${custom} flex flex-col justify-center mt-2 w-full md:w-full`}
        >
            {showLabel && (
                <label className="intro-x text-primaryColor mb-1 text-sm">
                    {label}
                </label>
            )}
            <textarea
                name={name}
                className={`${customStyleInput} w-full block text-sm bg-transparent rounded-xl border-2 border-borderColor mb-1 px-4 py-3 placeholder:text-black/50 placeholder:text-xs dark:placeholder:text-white/20 focus:border-navBgColor focus:ring-primaryColor autofill:bg-transparent dark:focus:ring-primaryColorDark focus:ring-opacity-20 dark:focus:border-primaryColorDark focus:border-opacity-40 focus-visible:outline-0 dark:bg-mainBgColorDark dark:border-borderColorDark `}
                placeholder={placeholder}
                {...formik.getFieldProps({ name })}
            ></textarea>
        </div>
    );
};

export default TextAreaInput;
