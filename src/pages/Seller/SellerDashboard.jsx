import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/ProductContext";
import { useOrder } from "../../contexts/OrderContext";
import { useUser } from "../../contexts/UserContext";
import { formatDate } from "../../utils/formatDate";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const SellerDashboard = () => {
  const { user } = useAuth();
  const { getUserById } = useUser();
  const { sellerProducts } = useProducts();
  const { orders: recentOrders } = useOrder();
  const [allStats, setAllStats] = useState([]);
  
  const stats = {
    totalSales: 5420.5,
    pendingOrders: 8,
    activeListings: 24,
    totalProducts: 32,
  };

  const getStats = useCallback(async() => {
    for (const recentOrder of recentOrders) {
      setAllStats(recentOrder.items)
    }
  }, [recentOrders])

  useEffect(() => { 
    getStats()
  }, [getStats])

  const topProducts = [
    { id: 1, name: "Vestido Elegante Negro", sales: 45, revenue: 4049.55 },
    { id: 2, name: "Blusa Seda Crema", sales: 32, revenue: 4799.68 },
    { id: 3, name: "Pantalón Palazzo Beige", sales: 18, revenue: 3599.82 },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[#8B7355] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-1">
              Dashboard
            </p>
            <h1 className="text-2xl font-serif-display font-light text-[#2C2420]">
              Panel de Vendedora
            </h1>
            <p className="text-[#7A6B5A] font-sans-elegant text-sm mt-1">
              Bienvenida, {user?.name || ""}
            </p>
          </div>
          <Link to="/seller/products/new">
            <button className="px-6 py-3 bg-[#8B7355] text-white font-sans-elegant text-sm tracking-wide hover:bg-[#6B5A45] transition-all duration-300">
              + Nueva Prenda
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#E0D6CC] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B7355] text-xl">💰</span>
              <span className="text-[10px] text-[#6B8E6B] font-sans-elegant uppercase tracking-wide">+12%</span>
            </div>
            <p className="text-xs text-[#7A6B5A] font-sans-elegant uppercase tracking-wide mb-1">Ventas Totales</p>
            <p className="text-2xl font-serif-display text-[#2C2420]">${stats.totalSales.toLocaleString('es-AR')}</p>
          </div>

          <div className="bg-white border border-[#E0D6CC] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B7355] text-xl">📦</span>
              <span className="text-[10px] text-[#C4A574] font-sans-elegant uppercase tracking-wide">Pendiente</span>
            </div>
            <p className="text-xs text-[#7A6B5A] font-sans-elegant uppercase tracking-wide mb-1">Pedidos</p>
            <p className="text-2xl font-serif-display text-[#2C2420]">{stats.pendingOrders}</p>
          </div>

          <div className="bg-white border border-[#E0D6CC] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B7355] text-xl">✓</span>
              <span className="text-[10px] text-[#6B8E6B] font-sans-elegant uppercase tracking-wide">Activos</span>
            </div>
            <p className="text-xs text-[#7A6B5A] font-sans-elegant uppercase tracking-wide mb-1">Listados</p>
            <p className="text-2xl font-serif-display text-[#2C2420]">{stats.activeListings}</p>
          </div>

          <div className="bg-white border border-[#E0D6CC] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B7355] text-xl">👗</span>
              <span className="text-[10px] text-[#7A6B5A] font-sans-elegant uppercase tracking-wide">Total</span>
            </div>
            <p className="text-xs text-[#7A6B5A] font-sans-elegant uppercase tracking-wide mb-1">Productos</p>
            <p className="text-2xl font-serif-display text-[#2C2420]">{sellerProducts.length}</p>
          </div>
        </div>

        {/* Quick Actions - Compacto */}
        <div className="bg-white border border-[#E0D6CC] p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-sm font-sans-elegant font-medium text-[#2C2420] uppercase tracking-wide">
              Acciones Rápidas
            </h2>
            <div className="flex gap-2 flex-wrap">
              <Link
                to="/seller/products/new"
                className="flex items-center gap-2 px-4 py-2 border border-[#E0D6CC] bg-[#F5F0EB] hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all duration-200 text-[#5C4D3C] font-sans-elegant text-xs tracking-wide"
              >
                <span>➕</span>
                <span>Añadir</span>
              </Link>
              <Link
                to="/seller/orders"
                className="flex items-center gap-2 px-4 py-2 border border-[#E0D6CC] bg-[#F5F0EB] hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all duration-200 text-[#5C4D3C] font-sans-elegant text-xs tracking-wide"
              >
                <span>📦</span>
                <span>Pedidos</span>
              </Link>
              <Link
                to="/seller/products"
                className="flex items-center gap-2 px-4 py-2 border border-[#E0D6CC] bg-[#F5F0EB] hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all duration-200 text-[#5C4D3C] font-sans-elegant text-xs tracking-wide"
              >
                <span>👗</span>
                <span>Productos</span>
              </Link>
              <Link
                to="/seller/analytics"
                className="flex items-center gap-2 px-4 py-2 border border-[#E0D6CC] bg-[#F5F0EB] hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all duration-200 text-[#5C4D3C] font-sans-elegant text-xs tracking-wide"
              >
                <span>📊</span>
                <span>Analíticas</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white border border-[#E0D6CC]">
            <div className="p-4 border-b border-[#E0D6CC]">
              <h2 className="text-lg font-serif-display text-[#2C2420]">Pedidos Recientes</h2>
            </div>
            <div className="p-4">
              {recentOrders.length === 0 ? (
                <p className="text-[#7A6B5A] font-sans-elegant text-sm text-center py-8">
                  No hay pedidos recientes
                </p>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border-b border-[#E0D6CC] py-3 last:border-b-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-sans-elegant font-medium text-[#8B7355] text-sm">
                          #{order.order_number}
                        </p>
                        <p className="text-xs text-[#7A6B5A] font-sans-elegant">{order.user_id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-serif-display text-[#2C2420]">
                          ${Number(order.total).toLocaleString('es-AR')}
                        </p>
                        <p className="text-[10px] text-[#A69580] font-sans-elegant">{formatDate(order.updated_at)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-[10px] px-2 py-1 font-sans-elegant uppercase tracking-wide ${
                          order.status === "pending"
                            ? "bg-[#FDF8F0] border border-[#C4A574] text-[#8B7355]"
                            : order.status === "approved"
                            ? "bg-[#F0F5F0] border border-[#6B8E6B]/30 text-[#6B8E6B]"
                            : "bg-[#F5F0EB] border border-[#E0D6CC] text-[#5C4D3C]"
                        }`}
                      >
                        {order.status}
                      </span>
                      <button className="text-xs text-[#8B7355] hover:underline font-sans-elegant">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                ))
              )}
              <div className="mt-4 text-center">
                <Link
                  to="/seller/orders"
                  className="text-[#8B7355] hover:underline font-sans-elegant text-xs tracking-wide"
                >
                  Ver todos los pedidos →
                </Link>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white border border-[#E0D6CC]">
            <div className="p-4 border-b border-[#E0D6CC]">
              <h2 className="text-lg font-serif-display text-[#2C2420]">Más Vendidos</h2>
            </div>
            <div className="p-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="border-b border-[#E0D6CC] py-3 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center font-serif-display text-sm text-[#8B7355]">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans-elegant text-sm text-[#2C2420] truncate">{product.name}</p>
                      <p className="text-[10px] text-[#7A6B5A] font-sans-elegant">
                        {product.sales} ventas
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif-display text-[#2C2420]">
                        ${product.revenue.toLocaleString('es-AR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link
                  to="/seller/products"
                  className="text-[#8B7355] hover:underline font-sans-elegant text-xs tracking-wide"
                >
                  Ver todos los productos →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
