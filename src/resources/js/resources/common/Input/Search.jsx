import React from "react";

const Search = ({ value, setValue }) => {
  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  return (
    <input
      type="text"
      onChange={changeHandler}
      value={value}
      placeholder="جستجو"
      className="w-2/3 block bg-transparent data:bg-[#2E3034] text-primaryColor dark:text-primaryColorDark text-sm shadow-sm border border-borderColor rounded-xl px-4 py-3 placeholder:text-slate-400/90 focus:ring-primaryOne focus:border-primaryOne dark:placeholder:text-white/20 focus:ring-4 focus:ring-primaryColor dark:focus:ring-primaryColorDark focus:ring-opacity-20 focus:border-primaryColor dark:focus:border-primaryColorDark focus:border-opacity-40 focus-visible:outline-0 dark:bg-mainBgColorDark dark:border-borderColorDark"
    />
  );
};

export default Search;
