import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

interface Props { 
  hidden?: boolean,
  handleClick: any
}

export default function MobileNavbar({hidden, handleClick} : Props) {

  return (
    <div className="absolute top-0 right-0">
      <div
        onClick={handleClick}
        className={hidden ? "absolute hidden top-7 right-5 cursor-pointer md:hidden" : "absolute  top-7 right-5 cursor-pointer md:hidden"}
      >
        <GiHamburgerMenu size={30} />
      </div>
    </div>
  );
}
