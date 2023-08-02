import React from "react";
import { Link } from "react-router-dom";
const Operation = ({link}) => {
    return (
        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
            <Link to={link}>
                <i className="icon-edit4 before:content-['\e88c'] text-2xl cursor-pointer font-bold text-green-500"></i>
            </Link>
            <i className="icon-trash4 before:content-['\eaa0'] text-2xl cursor-pointer font-bold text-red-500"></i>
        </td>
    );
};

export default Operation;
