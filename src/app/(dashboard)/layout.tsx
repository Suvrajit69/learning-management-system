import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/footer"))

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="flex-1 md:pl-56 pt-[80px] overflow-y-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
