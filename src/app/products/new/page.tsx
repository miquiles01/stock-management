'use client';

import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  name: string;
  quantity: string;
  price: string;
  category: string;
  description?: string;
  sold?: boolean;
  soldAt?: string[];
}


const NewProductPage = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    quantity: "",
    price: "",
    category: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      const onlyDigits = value.replace(/\D/g, "");
      const formatted = (Number(onlyDigits) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      setProduct({ ...product, [name]: formatted });
      return;
    }

    setProduct({ ...product, [name]: value });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPrice = parseFloat(
      product.price.replace(/[R$\s.]/g, "").replace(",", ".")
    );

    const formattedProduct: Product = {
      ...product,
      quantity: parseInt(product.quantity, 10).toString(),
      price: cleanPrice.toFixed(2),
      sold: false,
      soldAt: [],
    };


    saveToLocalStorage(formattedProduct);
    toast.success("Produto cadastrado com sucesso!");

    setProduct({
      name: "",
      quantity: "",
      price: "",
      category: "",
      description: "",
    });
  };


  const saveToLocalStorage = (newProduct: Product) => {
    const existingProducts: Product[] = (() => {
      try {
        const stored = localStorage.getItem("products");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    })();

    existingProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(existingProducts));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg mt-20">
        <h1 className="text-3xl font-bold text-center text-[#48754B] mb-6">Cadastrar Produto</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5477A0]"
                placeholder="Digite o nome do produto"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5477A0]"
                placeholder="Quantidade disponível"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5477A0]"
                placeholder="R$ 0,00"
              />

            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5477A0]"
                placeholder="Categoria do produto"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5477A0]"
              placeholder="Descrição/Observação do produto"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-60 bg-[#447547] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#559259] transition-all"
            >
              Cadastrar
            </button>
          </div>

        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default NewProductPage;
