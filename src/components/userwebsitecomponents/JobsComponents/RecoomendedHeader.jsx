"use client";
import React from "react";

export const RecommendedHeader = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col w-full bg-white border-b border-gray-100 px-48 py-8">
      {/* Top row */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Recommended jobs for you
        </h2>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-600">
            You can select upto{" "}
            <span className="font-medium text-gray-900">5 jobs</span> to apply
          </p>
          <button className="bg-indigo-200 hover:bg-indigo-300 text-indigo-900 font-semibold px-6 py-2 rounded-full transition">
            Apply
          </button>
        </div>
      </div>

      {/* Tabs row */}
      <div className="flex items-center gap-6 mt-5 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`relative pb-2 transition-colors ${
              activeTab === tab.name
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab.name} ({tab.count})
            {activeTab === tab.name && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
