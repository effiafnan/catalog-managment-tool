import React from "react";
import Sidebar from "../SideBar";
import MainContent from "../MainContent";

const Dashboard = ({ children }) => {
  return (
    <div className="flex h-screen flex-row">
      {/* Sidebar */}
      <div className="w-[360px]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
