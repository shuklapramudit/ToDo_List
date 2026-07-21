import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";

function ProtectedLayout() {
    return (
        <div className="protected-layout">
            <Header />
            <main className="protected-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default ProtectedLayout;
