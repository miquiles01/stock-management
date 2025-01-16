'use client';

import './styles/globals.css'; 
import Navbar from './navbar/navbar'; 
import Footer from './footer/page'; 
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="pt-br">
      <head>
      </head>
      <body className="flex flex-col min-h-screen">
        {pathname !== '/' && <Navbar />}
        
        <main className="flex-grow">{children}</main>
        
        {pathname !== '/' && <Footer />}
      </body>
    </html>
  );
}
