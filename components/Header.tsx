
import React from 'react';
import { Logo } from './icons/Logo';
import { MenuIcon, CloseIcon } from './icons/Icons';

interface HeaderProps {
    isMenuOpen: boolean;
    setMenuOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setMenuOpen }) => {
  return (
    <header className="w-full bg-primary text-white shadow-md z-50 sticky top-0 md:relative">
      <div className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center">
            <Logo />
            <span className="ml-3 text-lg font-semibold whitespace-nowrap hidden sm:inline">Creator Platform</span>
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};
