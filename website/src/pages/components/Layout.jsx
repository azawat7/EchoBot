import Footer from "./footer/Footer";
import Navbar from "./nav/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <div className="h-screen">
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    );
}
