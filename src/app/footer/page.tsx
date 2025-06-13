const Footer = () => {
    return (
      <footer className="bg-[#282D33] text-white py-4 p-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-2 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Viviane. Todos os direitos reservados.
            </p>
          </div>
  
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm hover:text-gray-200 transition-all"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  