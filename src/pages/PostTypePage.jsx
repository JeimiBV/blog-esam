import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router";

const PostTypePage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={"Tipo de pulicación"} />
      <div className="min-h-screen px-4 py-6 bg-white">
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white h-full m-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PostTypePage;
