import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; 

interface Product {
  name: string;
  quantity: number;
  price: number;
  category: string;
}

const EditProductPage = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    quantity: 0,
    price: 0,
    category: "",
  });

  const router = useRouter();
  const { index } = router.query; 

  useEffect(() => {
    if (index) {
      const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const currentProduct = storedProducts[parseInt(index as string)]; 
      if (currentProduct) {
        setProduct(currentProduct);
      }
    }
  }, [index]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    if (index) {
      storedProducts[parseInt(index as string)] = product;
      localStorage.setItem("products", JSON.stringify(storedProducts));
      router.push("/"); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg mt-20">
        <h1 className="text-3xl font-bold text-center text-[#E07A5F] mb-6">
          Editar Produto
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#E07A5F] mb-2">
            Nome
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#E07A5F] mb-2">
            Quantidade
          </label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#E07A5F] mb-2">
            Preço
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#E07A5F] mb-2">
            Categoria
          </label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-400 transition-all"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
