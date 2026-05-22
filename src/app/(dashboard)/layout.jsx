import DashboardSidebar from "@/components/DashboardSidebar";

const layout = ({ children }) => {
  return (
    <div className="px-3">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8 relative max-w-7xl mx-auto">
        <DashboardSidebar />

        {/* Content */}
        <div className="sm:col-span-2 lg:col-span-3">{children}</div>
      </div>
    </div>
  );
};
export default layout;
