import {Outlet} from "react-router-dom";
import Navigation from "../components/Navigation.jsx";

const MainLayout = () => {
    return (
        <div>
            <header className="flex justify-center p-2">
                <Navigation />
            </header>
            <div className="py-2 container mx-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;