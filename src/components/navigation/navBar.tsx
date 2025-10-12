'use client';
import { useState } from 'react';
import { LoginButton } from '../general/loginButton';
import { MenuIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { FundWalletButton } from '../general/fundWalletButton';
import { AnimatedMenuIcon, AnimatedXIcon } from '../icons/animated';
import { AnimatePresence, motion } from 'motion/react';
export const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setNavbarOpen((prev) => !prev)}
        className="fixed top-6 right-6 z-50"
        size="icon"
      >
        {navbarOpen ? (
          <AnimatedXIcon className="stroke-3" />
        ) : (
          <AnimatedMenuIcon className="stroke-3" />
        )}
      </Button>
      <AnimatePresence initial={false}>
        {navbarOpen && (
          <motion.div
            className="transition-none bg-popover fixed top-6 left-1/2 z-40 -translate-x-1/2 rounded-lg p-2 pl-4 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: {bounce: 0, duration: 0.1} }}
            transition={{ type: 'spring', bounce: 0.75, duration: 1.5 }}
          >
            <div className="flex items-center gap-4">
              <p className="font-serif text-3xl">C</p>
              <FundWalletButton />
              <LoginButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
