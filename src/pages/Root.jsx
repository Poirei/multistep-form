import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-tr from-[#007991] to-[#78ffd6] py-7 text-black">
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
