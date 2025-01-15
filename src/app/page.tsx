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

const Dashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  
  // Carregar os produtos do localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  // Calcular as métricas
  const totalProducts = products.length;
  const lowStockProducts = products.filter((product) => product.quantity <= 5).length;
  const soldProducts = products.filter((product) => product.sold).length; 
  const inStockProducts = products.filter((product) => product.quantity > 5).length;

  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas",
        data: [10, 20, 30, 25, 40, 50],
        borderColor: "#FF6F00", 
        backgroundColor: "#FFCC80", 
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

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl text-[#4C9644] font-semibold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-[#D9F9D6] text-[#4C9644] shadow-lg rounded-lg p-6 transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center justify-center w-full sm:w-76 h-48">
          <div className="text-5xl mb-4">
            <i className="fas fa-box"></i>
          </div>
          <h3 className="font-semibold text-lg mb-2">Produtos Cadastrados</h3>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-[#FFD9B3] text-[#D7754C] shadow-lg rounded-lg p-6 transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center justify-center w-full sm:w-76 h-48">
          <div className="text-5xl mb-4">
            <i className="fas fa-arrow-down"></i>
          </div>
          <h3 className="font-semibold text-lg mb-2">Produtos em Baixa</h3>
          <p className="text-3xl font-bold">{lowStockProducts}</p>
        </div>
        <div className="bg-[#FFEBCC] text-[#FF6F00] shadow-lg rounded-lg p-6 transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center justify-center w-full sm:w-76 h-48">
          <div className="text-5xl mb-4">
            <i className="fas fa-check-circle"></i>
          </div>
          <h3 className="font-semibold text-lg mb-2">Produtos Vendidos</h3>
          <p className="text-3xl font-bold">{soldProducts}</p>
        </div>
        <div className="bg-[#C2F0E5] text-[#4C9B8C] shadow-lg rounded-lg p-6 transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center justify-center w-full sm:w-76 h-48">
          <div className="text-5xl mb-4">
            <i className="fas fa-warehouse"></i>
          </div>
          <h3 className="font-semibold text-lg mb-2">Produtos em Estoque</h3>
          <p className="text-3xl font-bold">{inStockProducts}</p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
        <h2 className="text-2xl text-[#4C9644] font-semibold mb-6">Gráfico de Vendas - Relatório Mensal</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
