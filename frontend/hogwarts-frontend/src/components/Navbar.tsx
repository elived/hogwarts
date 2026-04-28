import "./styles/NavbarStyle.css";
import {useNavigate, useLocation, Outlet, Navigate} from "react-router-dom";


type NavLink = {
    text: string;
    url: string;
    onClickAction?: () => void;
}

type NavbarProps = {
    links: NavLink[];
};


export const AdminRoute = () => {
    const role = localStorage.getItem("role");
    const isAdmin = role === "ADMIN";

    return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};


const Navbar: React.FC<NavbarProps> = ({ links }) => {
    const navigator = useNavigate();
    const location = useLocation();

    const role = localStorage.getItem("role");
    const isAdmin = role === "ADMIN";


    const isLoggedIn = !!localStorage.getItem("authToken");
    const visibleLinks = links.filter(link => {
        if (link.text === "Login" && isLoggedIn) return false;
        if (link.text === "Logout" && !isLoggedIn) return false;
        if (link.text === "Admin" && !isAdmin) return false;
        return true;
    })
    
    const showBackButton = 
        location.pathname !== '/' && 
        location.pathname !== '/houses' &&
        location.pathname !== '/students' &&
        location.pathname !== '/rooms' &&
        location.pathname !== '/login' &&
        location.pathname !== '/register' &&
        location.pathname !== '/admin';
    
    return (
        <div className="app-layout">
            <nav className="navbar">
                <ul className="navbar-list">
                    {visibleLinks.map((link, index) => (
                        <li key={index} className="navbar-item">
                            <button className={`nav-button nav-${link.text.toLowerCase()}`}
                                    onClick={() => {
                                        if (link.onClickAction) {
                                            link.onClickAction();
                                        }
                                        navigator(link.url)
                                    }}>
                                {link.text}</button>
                        </li>
                    ))}
                    {showBackButton && (
                        <button className="nav-button nav-back" onClick={() => navigator(-1)}>
                            Back
                        </button>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;