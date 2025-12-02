"use client";
import React from "react";
import {
  FaBriefcase,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaEyeSlash,
  FaBookmark,
  FaStar,
} from "react-icons/fa";

export const JobCard = ({
  title,
  company,
  rating,
  reviews,
  experience,
  salary,
  location,
  description,
  skills,
  posted,
  logo,
}) => {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex justify-between items-start hover:shadow-md transition-all duration-200 w-full max-w-3xl mx-auto mt-5">
      {/* Left Section */}
      <div className="flex-1">
        {/* Job Title and Company */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <span className="font-medium text-gray-700">{company}</span>
          <FaStar className="text-yellow-500 text-xs" />
          <span>{rating}</span>
          <span className="text-gray-400">|</span>
          <span>{reviews} Reviews</span>
        </div>

        {/* Job Info */}
        <div className="flex flex-wrap items-center gap-5 text-gray-700 text-sm mt-4">
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-gray-500" /> <span>{experience}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRupeeSign className="text-gray-500" /> <span>{salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500" /> <span>{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-3">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3 text-sm text-indigo-700">
          {skills.map((skill, i) => (
            <span key={i}>{skill}</span>
          ))}
        </div>

        {/* Posted Time */}
        <p className="text-gray-400 text-xs mt-3">{posted}</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-between h-full">
        <img
          src={logo}
          alt="Company Logo"
          className="w-12 h-12 rounded-xl object-cover border"
        />
        <div className="flex items-center gap-4 mt-6 text-gray-500 text-sm cursor-pointer">
          <div className="flex items-center gap-1 hover:text-gray-700">
            <FaEyeSlash />
            <span>Hide</span>
          </div>
          <div className="flex items-center gap-1 hover:text-gray-700">
            <FaBookmark />
            <span>Save</span>
          </div>
        </div>
      </div>
    </div>
  );
};
