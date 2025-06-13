"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  // Garante que só renderiza no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const noNavbarRoutes = ["/login"];
  if (!isClient || noNavbarRoutes.includes(pathname)) {
    return null;
  }

  const toggleMenu = () => {
    console.log("Menu toggled");
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="bg-[#2A332F] text-white px-6 py-4 h-16 flex items-center justify-between shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="text-xl font-bold">Anne Brink Feltro</div>

        {/* Ícone de menu para mobile */}
        <button
          className="lg:hidden p-2"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>

        {/* Menu Principal Desktop */}
        <nav className="hidden lg:block">
          <ul className="flex gap-8 m-6">
            <li className="relative group">
              <Link
                href="/home"
                className="relative text-white text-lg font-medium py-2 transition-all duration-300 ease-in-out before:absolute before:w-0 before:h-1 before:bg-[#9CBFAF] before:bottom-0 before:left-0 before:transition-all before:duration-300 group-hover:before:w-full"
              >
                Home
              </Link>
            </li>
            <li className="relative group">
              <Link
                href="/products/new/"
                className="relative text-white text-lg font-medium py-2 transition-all duration-300 ease-in-out before:absolute before:w-0 before:h-1 before:bg-[#9CBFAF] before:bottom-0 before:left-0 before:transition-all before:duration-300 group-hover:before:w-full"
              >
                Cadastrar Produto
              </Link>
            </li>
            <li className="relative group">
              <Link
                href="/products"
                className="relative text-white text-lg font-medium py-2 transition-all duration-300 ease-in-out before:absolute before:w-0 before:h-1 before:bg-[#9CBFAF] before:bottom-0 before:left-0 before:transition-all before:duration-300 group-hover:before:w-full"
              >
                Listagem
              </Link>
            </li>
            <li className="relative group">
              <Link
                href="/"
                className="relative text-white text-lg font-medium py-2 transition-all duration-300 ease-in-out before:absolute before:w-0 before:h-1 before:bg-[#9CBFAF] before:bottom-0 before:left-0 before:transition-all before:duration-300 group-hover:before:w-full"
              >
                Sair
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Menu Responsivo (Mobile) */}
      <div
        className={`fixed top-16 right-0 h-full bg-[#4C9644] text-white w-64 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } z-50 lg:hidden`}
      >
        <ul className="flex flex-col gap-6 p-6">
          <li>
            <Link href="/home" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/products/new/" onClick={closeMenu}>
              Cadastrar Produto
            </Link>
          </li>
          <li>
            <Link href="/products" onClick={closeMenu}>
              Listagem
            </Link>
          </li>
          <li>
            <Link href="/" onClick={closeMenu}>
              Sair
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay ao fundo no mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
}
