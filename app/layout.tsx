import React, { ReactNode } from "react";
import "@/assets/styles/globals.css";
import "photoswipe/dist/photoswipe.css";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/components/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";
export const metadata = {
  title: "Yarik's Agency Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental,find rentals, find properties",
};
interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
