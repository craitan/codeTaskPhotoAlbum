import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                </div>
                <NavLink className="btn btn-ghost text-xl" to={"/"}>Photo Album</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className="mr-2"><NavLink to={"/photo-upload"}> Upload Photo</NavLink></li>
                    <li><NavLink to={"/photos"}> All Photos</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    )
};

export default NavBar;