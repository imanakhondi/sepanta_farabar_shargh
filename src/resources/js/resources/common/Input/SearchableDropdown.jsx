import { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({
    selectOptions,
    label = "name",
    // value,
    // onChange,
    formik,
    name,
    strings = null,
    pageString,
}) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const [value, setValue] = useState("");

    const [labelTwo, setLabelTwo] = useState(
        strings && name in strings ? strings[name] : ""
    );
    const [placeholder, setPlaceholder] = useState(
        strings && `${name}Placeholder` in strings
            ? strings[`${name}Placeholder`]
            : ""
    );

    useEffect(() => {
        if (!strings) {
            setLabelTwo(
                pageString && name in pageString ? pageString[name] : ""
            );
            setPlaceholder(
                pageString && `${name}Placeholder` in pageString
                    ? pageString[`${name}Placeholder`]
                    : ""
            );
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", toggle);
        return () => document.removeEventListener("click", toggle);
    }, []);
    const handleChange = (val) => {
        setValue(val.companyName || val.tankNo || val.name);
        formik.setFieldValue(`${name}`, val.id);
    };

    const selectOption = (option) => {
        setQuery(() => "");
        // handleChange(option[label]);   wichtig
        handleChange(option);
        setIsOpen((isOpen) => !isOpen);
    };

    function toggle(e) {
        setIsOpen(e && e.target === inputRef.current);
    }

    const getDisplayValue = () => {
        if (query) return query;
        if (value) return value;

        return "";
    };

    const filter = (selectOptions) => {
        return (
            selectOptions.length &&
            selectOptions.filter((option) =>
                typeof option[label] === "string"
                    ? option[label].toLowerCase().indexOf(query.toLowerCase()) >
                      -1
                    : option[label] > -1
            )
        );
    };

    return (
        <div className="flex flex-col">
            <label
                htmlFor=""
                className="text-primaryColor dark:text-primaryColorDark mb-1 text-xs"
            >
                {labelTwo}
            </label>
            <div className="dropdown flex flex-col mt-2 w-full lg:w-[300px] xl:w-[400px] relative cursor-pointer">
                <div className="control ">
                    <div className="selected-value ">
                        <input
                            ref={inputRef}
                            type="text"
                            {...formik.getFieldProps(name)}
                            value={
                                value ||
                                formik.values[name] ||
                                getDisplayValue()
                            }
                            name={name}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                handleChange(null);
                            }}
                            onClick={toggle}
                            placeholder={placeholder}
                            className=" w-full block text-sm text-black/50 bg-transparent rounded-xl border-2 border-borderColor mb-1 px-4 py-3 placeholder:text-black/50 placeholder:text-xs dark:placeholder:text-white/20 focus:border-navBgColor focus:ring-primaryColor autofill:bg-transparent dark:focus:ring-primaryColorDark focus:ring-opacity-20 dark:focus:border-primaryColorDark focus:border-opacity-40 focus-visible:outline-0 dark:bg-mainBgColorDark dark:border-borderColorDark "
                        />
                    </div>
                    <div className={`arrow  ${isOpen ? "open" : ""}`}></div>
                </div>
                {formik.errors[name] && formik.touched[name] && (
                    <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
                        {formik.errors[name]}
                    </div>
                )}

                <div
                    className={`options bg-white border border-borderColor box-border -mt-[1px] max-h-48 overflow-y-auto absolute top-full w-full z-50 rounded-xl ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    {selectOptions?.length &&
                        filter(selectOptions).map((option) => {
                            return (
                                <div
                                    onClick={() => selectOption(option)}
                                    className={`option text-black/50 box-border cursor-pointer block py-2 px-3 hover:bg-[#f2f9fc] hover:text-black/80 ${
                                        option[label] === value
                                            ? "bg-[#f2f9fc] text-black/80"
                                            : ""
                                    }`}
                                    key={option.id}
                                    id={`${name}-${option.id}`}
                                >
                                    {option[label]}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default SearchableDropdown;
