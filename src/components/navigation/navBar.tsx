"use client";
import { useState } from "react";
import { LoginButton } from "../general/loginButton";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FundWalletButton } from "../general/fundWalletButton";

export const NavBar = () => { 
  const [navbarOpen, setNavbarOpen] = useState(false);

  
  return (
    <>
      <Button onClick={() => setNavbarOpen((prev) => !prev)} className="fixed top-6 right-6 z-50" size="icon">
        {navbarOpen ? <XIcon /> : <MenuIcon />}
      </Button>
      {navbarOpen && (
      <div className="fixed top-6 left-1/2 -translate-x-1/2 p-2 pl-4 rounded-lg bg-popover shadow-sm z-50">
        <div className="flex items-center gap-4">
            <p className="font-serif text-3xl">C</p>
            <FundWalletButton />
            <LoginButton />
          </div>
        </div>
      )}
    </>
  )
}