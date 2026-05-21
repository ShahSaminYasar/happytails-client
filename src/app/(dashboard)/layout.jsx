import DashboardSidebar from "@/components/DashboardSidebar";

const layout = ({ children }) => {
  return (
    <div className="px-3">
      <div className="w-full h-[200vh] grid grid-cols-1 md:grid-cols-4 md:gap-8 relative max-w-7xl mx-auto">
        <DashboardSidebar />

        {/* Content */}
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
};
export default layout;
