import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

type NavLink = {
    text: string;
    url: string;
    onClickAction?: () => void;
};

type Props = {
    links: NavLink[];
};

export const ProtectedLayout = ({ links }: Props) => {
    return (
        <div className="main-layout">
            <Navbar links={links} />
            <main className="page-content">
                <Outlet />
            </main>
        </div>
    );
};