import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth";

export const Navbar = () => {
    const navigate = useNavigate();

    const { user, logged, logout } = useContext(AuthContext);

    const onLogout = () => {
        logout();

        navigate("/login", {
            replace: true,
        });
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            <Link className="navbar-brand" to="/">
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink
                        className={({ isActive }) => (isActive ? "nav-item nav-link active" : "nav-item nav-link")}
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => (isActive ? "nav-item nav-link active" : "nav-item nav-link")}
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => (isActive ? "nav-item nav-link active" : "nav-item nav-link")}
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto d-flex align-items-center ">
                    {logged && <span className="nav-item nav-link text-primary ">{user.name}</span>}
                    <button className="nav-item nav-link btn" onClick={onLogout}>
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    );
};
