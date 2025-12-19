import { Outlet } from "react-router";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function Layout() {
    return (
        <>  
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}