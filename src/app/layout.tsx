import Link from "next/link"; // Importando o Link do Next.js
import "./styles/globals.css";

export const metadata = {
  title: "Sistema de Estoque",
  description: "Gerenciamento de estoque com Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-100">
        <header className="bg-[#4C9644] text-white p-4 h-16 flex items-center justify-between shadow-lg transition-all duration-300 ease-in-out">
          <div className="text-xl font-bold">Sistema de Estoque</div>

          <nav>
            <ul className="flex gap-8 m-6">
              <li className="relative group">
                <Link
                  href="/"
                  className="relative text-white text-lg font-medium py-2 transition-all duration-300 ease-in-out before:absolute before:w-0 before:h-1 before:bg-[#EAD222] before:bottom-0 before:left-0 before:transition-all before:duration-300 group-hover:before:w-full"
                >
                  Home
                </Link>
              </li>
              <li className="relative group">
                <Link
                  href="/products/new/" 
                  className="relative text-white text-lg font-medium py-2 transition-all duration-300 ease-in-out before:absolute before:w-0 before:h-1 before:bg-[#EAD222] before:bottom-0 before:left-0 before:transition-all before:duration-300 group-hover:before:w-full"
                >
                  Cadastrar Produto
                </Link>
              </li>
              <li className="relative group">
                <Link
                  href="/products"
                  className="relative text-white text-lg font-medium py-2 transition-all duration-300 ease-in-out before:absolute before:w-0 before:h-1 before:bg-[#EAD222] before:bottom-0 before:left-0 before:transition-all before:duration-300 group-hover:before:w-full"
                >
                  Listagem
                </Link>
              </li>
              <li className="relative group">
                <Link
                  href="/login"
                  className="relative text-white text-lg font-medium py-2 transition-all duration-300 ease-in-out before:absolute before:w-0 before:h-1 before:bg-[#EAD222] before:bottom-0 before:left-0 before:transition-all before:duration-300 group-hover:before:w-full"
                >
                  Sair
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
