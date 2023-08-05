import React from "react";
import { Link } from "react-router-dom";
const Operation = ({ link, showLink }) => {
    return (
        <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
            <Link to={showLink}>
                <i className="icon-trash4 before:content-['\e8a4'] text-2xl cursor-pointer font-bold text-blue-500"></i>
            </Link>
            <Link to={link}>
                <i className="icon-edit4 before:content-['\e88c'] text-2xl cursor-pointer font-bold text-green-500"></i>
            </Link>
            {/* <i className="icon-trash4 before:content-['\eaa0'] text-2xl cursor-pointer font-bold text-red-500"></i> */}
        </td>
    );
};

export default Operation;
