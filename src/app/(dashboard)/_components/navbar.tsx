import NavbarRoutes from "@/components/navbarRoutes";
import MobileSidebar from "./mobileSidebar";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar/>
      <NavbarRoutes/>
    </div>
  );
};

export default Navbar;
