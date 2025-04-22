import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import style from "./Layout.module.css";
import CartContextProvider from "../../../application/context/CartContext";

function Layout({ children }) {
  return (
    <>
      <NavigationBar />
      <main className={`${style.main_flex}`}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
