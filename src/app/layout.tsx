import "./styles/globals.css";
import Navbar from "./navbar/navbar"; 

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
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
