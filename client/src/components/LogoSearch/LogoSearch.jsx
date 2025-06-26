import React from "react";
import Logo from "../../img/logo.png";
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
const LogoSearch = () => {
  return (
    <div className="flex items-center border rounded-md px-2 py-1 bg-white shadow-sm">
      <UilSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="outline-none bg-transparent w-full"
      />
    </div>
  );
};

export default LogoSearch;
