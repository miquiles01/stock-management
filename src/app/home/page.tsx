"use client";

import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Product = {
  name: string;
  quantity: number;
  sold: boolean;
  price?: number;
  category?: string;
};

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]); 

  // Carregar os produtos do localStorage
  useEffect(() => {
    const storedProducts: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  // Calcular as métricas
  const totalProducts = products.length;
  const lowStockProducts = products.filter((product) => product.quantity <= 5).length;
  const soldProducts = products.filter((product) => product.sold).length;
  const inStockProducts = products.filter((product) => product.quantity > 5).length;

  const totalSoldValue = products
  .filter((product) => product.sold && product.price)
  .reduce((sum, product) => sum + parseFloat(String(product.price)), 0);

  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas",
        data: [10, 20, 30, 25, 40, 50],
        borderColor: "#65623D",
        backgroundColor: "#65623D",
        fill: true,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#333",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e0e0e0",
        },
      },
      y: {
        grid: {
          color: "#e0e0e0",
        },
        ticks: {
          color: "#333",
        },
      },
    },
  };

const cardsData = [
  {
    title: "Produtos Cadastrados",
    value: totalProducts,
    icon: "fas fa-box",
    bgColor: "#65623D",
    textColor: "#FFFFF",
  },
  {
    title: "Total Vendido",
    value: totalSoldValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
    icon: "fas fa-money-bill-wave",
    bgColor: "#838050",
    textColor: "#FFFFF",
  },
  {
    title: "Produtos Vendidos",
    value: soldProducts,
    icon: "fas fa-check-circle",
    bgColor: "#9F9B61",
    textColor: "#FFFFF",
  },
  {
    title: "Produtos em Estoque",
    value: inStockProducts,
    icon: "fas fa-warehouse",
    bgColor: "#BBB672",
    textColor: "#FFFFF",
  },
];

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl text-[#234937] font-semibold mt-16 mb-6">Análise de Vendas e Estoque</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {cardsData.map((card, index) => (
          <div
            key={index}
            style={{
              backgroundColor: card.bgColor,
              color: card.textColor,
            }}
            className="shadow-lg rounded-lg p-6 transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center justify-center w-full sm:w-76 h-48"
          >
            <div className="text-5xl mb-4">
              <i className={card.icon}></i>
            </div>
            <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
        <h2 className="text-2xl text-[#234937] font-semibold mb-6">Gráfico de Vendas - Relatório Mensal</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
