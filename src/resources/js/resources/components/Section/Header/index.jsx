import { useState } from "react";
import profile from "../../../images/profile.jpeg";
import logo from "../../../images/logo-sepanta.png";
import Modal from "../../../common/Modal";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { header, sidebar } from "../../../constants/strings/fa";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../http/entities/User";
import { userLogOut } from "../../../state/user/userAction";
const Header = ({ customStyle = "" }) => {
    const [modal, setModal] = useState(false);
    const [menuMobile, setMenuMobile] = useState(false);
    const user = new User();
    const userState = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuItems = [
        { title: `${sidebar.dashboard}`, icon: "category4", to: "dashboard" },
        {
            title: `${sidebar.driversManagement}`,
            icon: "people4",
            to: "drivers",
            submenu: [
                {
                    title: `${sidebar.drivers}`,
                    to: "drivers",
                    icon: "people4",
                    style: "",
                },
                {
                    title: `${sidebar.addDriver}`,
                    to: "driver/add",
                    icon: "profile-add4",
                    style: "",
                },
            ],
        },
        {
            title: `${sidebar.carsManagement}`,
            icon: "truck3",
            submenu: [
                {
                    title: `${sidebar.cars}`,
                    to: "cars",
                    icon: "truck-fast3",
                    style: "",
                },
                {
                    title: `${sidebar.addCar}`,
                    to: "car/add",
                    icon: "truck-tick4",
                    style: "",
                },
            ],
        },
        {
            title: `${sidebar.tanksManagement}`,
            icon: "colorfilter4",
            submenu: [
                {
                    title: `${sidebar.tanks}`,
                    to: "tanks",
                    icon: "colorfilter4",
                    style: "",
                },
                {
                    title: `${sidebar.addTank}`,
                    to: "tank/add",
                    icon: "add-square",
                    style: "",
                },
            ],
        },
        {
            title: `${sidebar.userManagement}`,
            icon: "personalcard",
            style: "",
            submenu: [
                {
                    title: `${sidebar.users}`,
                    to: "users",
                    icon: "people4",
                    style: "",
                },
                {
                    title: `${sidebar.addUsers}`,
                    to: "user/add",
                    icon: "profile-add4",
                    style: "",
                },
                {
                    title: `${sidebar.changePassword}`,
                    to: "user/change_password",
                    icon: "profile-add4",
                    style: "",
                },
            ],
        },
    ];

    const logoutHandler = () => {
        if (userState.isAuthenticated) {
            user.logOut();
            dispatch(userLogOut());
            navigate("/login");
        }
    };

    return (
        <div className="h-16 my-3 ml-5 container">
            <div className="flex items-center justify-between h-full">
                <div className="flex items-center">
                    <i
                        className="icon-element-34 text-xl ml-3 md:hidden"
                        onClick={() => {
                            setMenuMobile(!menuMobile);
                        }}
                    ></i>
                    {menuMobile && (
                        <Modal
                            modal={menuMobile}
                            setModal={setMenuMobile}
                            positionStyle="!static"
                            customStyle="!top-0 bottom-0 right-0 mt-0 w-80 !shadow-none !bg-navBgColor !z-[999]"
                        >
                            {/* <Siderbar customStyle="!block !z-[999]" /> */}

                            <div
                                className={`${customStyle}  md:block w-60 min-h-min bg-navBgColor text-primaryColor my-3 mr-6 ml-2 py-5 pl-4`}
                            >
                                <div className="flex items-center justify-center mb-5 pb-5 border-b mr-5 border-primaryColor">
                                    <img
                                        src={logo}
                                        alt=""
                                        className="w-20 h-20"
                                    />
                                </div>

                                <ul>
                                    {menuItems.map((menu, index) => {
                                        return (
                                            <MenuItem
                                                item={menu}
                                                key={index}
                                                id={index}
                                                menuMobile={menuMobile}
                                                setMenuMobile={setMenuMobile}
                                            />
                                        );
                                    })}

                                    <li
                                        className="flex items-center relative h-[50px] mb-1 pr-5 dark:text-primaryColor text-red-500 cursor-pointer "
                                        onClick={logoutHandler}
                                    >
                                        <i className="icon-logout4 text-xl ml-3"></i>
                                        <div className="xl:flex items-center w-full justify-between  text-sm  ">
                                            {sidebar.logout}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Modal>
                    )}
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => setModal(!modal)}
                    >
                        <img src={profile} alt="" className="h-10 w-10 " />
                        <div className="hidden md:flex flex-col mr-2 text-xs font-bold text-primaryColorDark">
                            <h1>
                                {userState?.user?.name} {userState?.user?.family}
                            </h1>
                            <span>{userState?.user?.username}</span>
                        </div>
                    </div>
                    {modal && (
                        <Modal modal={modal} setModal={setModal}>
                            <div>
                                <i className="icon-user4 text-xl ml-3 "></i>
                                {userState.user.name} {userState.user.family}
                            </div>
                            <Link to="">
                                <button
                                    className="cursor-pointer my-3 flex items-center"
                                    onClick={() => setModal(!modal)}
                                >
                                    <i className="icon-user-edit4 text-xl ml-3 "></i>
                                    <span>{header.editProfile}</span>
                                </button>
                            </Link>
                            <hr />
                            <div
                                onClick={logoutHandler}
                                className="cursor-pointer my-3 text-red-500 flex items-center"
                            >
                                <i className="icon-logout4 text-xl ml-3 "></i>
                                <span>{header.logout}</span>
                            </div>
                        </Modal>
                    )}
                </div>
                {/* <Search /> */}
            </div>
        </div>
    );
};

export default Header;

export const MenuItem = ({ item, index, id, setMenuMobile, menuMobile }) => {
    const [subMenu, setSubMenu] = useState(false);
    const [sub, setSub] = useState(false);
   
    return (
        <>
            {item.submenu ? (
                <>
                    <li
                        aria-expanded={subMenu ? "true" : "false"}
                        role="link"
                        className="clickSlide"
                        id={id}
                        onClick={() => {
                            setSubMenu(!subMenu);
                        }}
                    >
                        <NavLink
                            className={
                                sub
                                    ? "bg-slate-100 flex items-center text-slate-800 h-[50px] mb-1 pr-5 rounded-l-xl relative z-10  "
                                    : "flex items-center text-primaryColor relative h-[50px] mb-1 pr-5 rounded-l-xl dark:text-primaryColor "
                            }
                        >
                            <i className={`icon-${item.icon} text-xl ml-3`}></i>
                            <div className="xl:flex items-center w-full justify-between text-sm">
                                {item.title}
                                {subMenu ? (
                                    <i className="icon-arrow-up before:content-['\eeb2']"></i>
                                ) : (
                                    <i className="icon-arrow-bottom before:content-['\ee9b']"></i>
                                )}
                            </div>
                        </NavLink>
                        <Dropdown
                            submenus={item.submenu}
                            dropdown={subMenu}
                            sub={sub}
                            setSub={setSub}
                            menuMobile={menuMobile}
                            setMenuMobile={setMenuMobile}
                        />
                    </li>
                </>
            ) : (
                <li>
                    <NavLink
                        to={item.to}
                        key={index}
                        className={(navData) => {
                            return navData.isActive
                                ? " flex items-center font-bold text-white bg-btnPrimaryColor h-[50px] mb-1 pr-5 rounded-l-xl relative z-10 dark:text-warningColor"
                                : `flex items-center text-primaryColor relative h-[50px] mb-1 pr-5 rounded-l-xl hover:bg-btnPrimaryColor hover:text-white dark:text-primaryColor ${item.style} `;
                        }}
                    >
                        <i className={`icon-${item.icon} text-xl ml-3`}></i>
                        <div className="xl:flex items-center w-full justify-between  text-sm  ">
                            {item.title}
                        </div>
                    </NavLink>
                </li>
            )}
        </>
    );
};

export const Dropdown = ({ submenus, dropdown, menuMobile, setMenuMobile }) => {
    return (
        <ul
            className={`mr-1 xl:mr-0 ${
                dropdown
                    ? "h-auto rounded-lg bg-[#00000006] dark:bg-[#0000001a]"
                    : "h-0 overflow-hidden"
            } `}
        >
            {submenus.map((submenu, index) => (
                <li key={index} onClick={() => setMenuMobile(!menuMobile)}>
                    <NavLink
                        to={submenu.to}
                        className={(navData) => {
                            return navData.isActive
                                ? ` flex items-center h-[50px] mb-1 pr-5 font-bold rounded-l-xl relative z-10 bg-btnPrimaryColor text-white dark:text-warningColor`
                                : "flex items-center text-primaryColor relative h-[50px] mb-1 pr-5 rounded-l-xl transition-all duration-200 hover:text-white hover:bg-btnPrimaryColor dark:text-primaryColor ";
                        }}
                    >
                        <i className={`icon-${submenu.icon} text-xl ml-3`}></i>
                        <div className=" xl:flex items-center w-full justify-between text-sm">
                            {submenu.title}
                            <div className="ml-5 z-10">{submenu.iconTwo}</div>
                        </div>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};
