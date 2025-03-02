import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

const Layout = () => {
  const [selectedCategories, setCategories] = useState([]); 

  return (
    <>
      <TopBar setCategories={setCategories} />
      <Outlet context={{ selectedCategories }}/>
    </>
  );
};

export default Layout;
