import "./styles/NavbarStyle.css";
import {useNavigate, useLocation} from "react-router-dom";


type NavLink = {
    text: string;
    url: string;
    onClickAction?: () => void;
}

type NavbarProps = {
    links: NavLink[];
};

const Navbar: React.FC<NavbarProps> = ({ links }) => {
    const navigator = useNavigate();
    const location = useLocation();
    
    const showBackButton = 
        location.pathname !== '/' && 
        location.pathname !== '/houses' &&
        location.pathname !== '/students' &&
        location.pathname !== '/rooms' &&
        location.pathname !== '/login';
    
    return (
        <div className="app-layout">
            <nav className="navbar">
                <ul className="navbar-list">
                    {links.map((link, index) => (
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