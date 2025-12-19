import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import {
  ShoppingCart,
  Menu,
  X,
  LogOut,
  Home,
  LayoutDashboard,
} from "lucide-react";

const Header = ({ isAuthenticated, user, userRole, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="w-full z-50 border-b border-[#E0D6CC] bg-white relative">
      {/* Top bar - Elegant */}
      <div className="bg-[#F5F0EB] text-[#5C4D3C] text-xs hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex gap-6 font-sans-elegant tracking-wide">
            <Link to="/" className="hover:text-[#8B7355] transition-colors duration-200">
              Inicio
            </Link>
            <Link to="/about" className="hover:text-[#8B7355] transition-colors duration-200">
              Nosotros
            </Link>
            <Link to="/help#bottom" className="hover:text-[#8B7355] transition-colors duration-200">
              Contacto
            </Link>
          </div>
          <div className="flex gap-4 items-center font-sans-elegant">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to="user/profile"
                  className="hover:text-[#8B7355] flex gap-2 items-center transition-colors duration-200"
                >
                  <img
                    src={user?.avatar}
                    width={20}
                    height={20}
                    alt="Avatar del usuario"
                    className="hidden md:flex rounded-full border border-[#C9B8A8]"
                  />
                  <span className="font-medium">
                    {user?.name || ""} {user?.lastname}
                  </span>
                </Link>
                {userRole === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    className="hover:text-[#8B7355] transition-colors duration-200"
                  >
                    Panel Vendedor
                  </Link>
                )}
                {userRole === "buyer" && (
                  <Link to="/buyer/orders" className="hover:text-[#8B7355] transition-colors duration-200">
                    Mis Compras
                  </Link>
                )}
                <button onClick={onLogout} className="hover:text-[#8B7355] transition-colors duration-200">
                  Salir
                </button>
              </div>
            ) : (
              <p className="flex items-center gap-2">
                ¡Bienvenida!
                <Link to="/login" className="text-[#8B7355] hover:underline">
                  Ingresar
                </Link>
                o
                <Link
                  to="/register"
                  className="text-[#8B7355] font-medium hover:underline"
                >
                  Registrarse
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Header - Elegant */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif-display font-light tracking-wide text-[#2C2420]">
            Pascale <span className="font-normal">Closet</span>
          </h1>
        </Link>

        {/* Search - Elegant */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex flex-1 gap-2 max-w-xl"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar prendas, accesorios..."
            className="flex-1 px-5 py-3 border border-[#E0D6CC] focus:border-[#8B7355] focus:ring-1 focus:ring-[#C9B8A8] outline-none font-sans-elegant text-sm bg-[#FAF8F5] transition-all duration-200"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-[#8B7355] text-white font-sans-elegant text-sm tracking-wide hover:bg-[#6B5A45] transition-all duration-200"
          >
            Buscar
          </button>
        </form>

        {/* Cart - Elegant */}
        <Link
          to="/cart"
          className="hidden md:flex items-center gap-3 px-4 py-2 hover:bg-[#F5F0EB] transition-all duration-200 border border-transparent hover:border-[#E0D6CC]"
        >
          <ShoppingCart size={22} className="text-[#5C4D3C]" />
          <div className="text-left">
            <p className="text-xs text-[#7A6B5A] font-sans-elegant">Carrito</p>
            <p className="text-sm font-sans-elegant text-[#2C2420]">{getCartItemsCount()} ítems</p>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 border border-[#E0D6CC] hover:bg-[#F5F0EB] transition-colors duration-200"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={20} className="text-[#5C4D3C]" />
        </button>
      </div>

      {/* Categories bar - Elegant */}
      <nav className="bg-white border-t border-[#E0D6CC] overflow-hidden flex">
        <div
          className="max-w-4xl mx-auto flex gap-8 px-4 py-3 text-xs font-sans-elegant tracking-[0.15em] uppercase text-[#5C4D3C]
               overflow-x-auto scrollbar-none whitespace-nowrap"
        >
          <Link
            to="/products/category/vestidos"
            className="hover:text-[#8B7355] transition-colors duration-200"
          >
            Vestidos
          </Link>
          <Link
            to="/products/category/enteritos"
            className="hover:text-[#8B7355] transition-colors duration-200"
          >
            Enteritos
          </Link>
          <Link
            to="/products/category/pantalones"
            className="hover:text-[#8B7355] transition-colors duration-200"
          >
            Pantalones
          </Link>
          <Link
            to="/products/category/accesorios"
            className="hover:text-[#8B7355] transition-colors duration-200"
          >
            Accesorios
          </Link>
          <Link
            to="/products/category/otros"
            className="hover:text-[#8B7355] transition-colors duration-200"
          >
            Más
          </Link>
        </div>
      </nav>

      {/* Overlay y menú lateral - Elegant */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <aside className="fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-50 p-6 flex flex-col gap-4 animate-slide-left">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E0D6CC]">
              <h2 className="font-serif-display text-xl text-[#2C2420]">Menú</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={22} className="text-[#7A6B5A] hover:text-[#B85450] transition-colors duration-200" />
              </button>
            </div>

            {isAuthenticated ? (
              <div className="flex flex-col gap-4 font-sans-elegant">
                <Link to="/user/profile" className="flex items-center gap-3 text-[#5C4D3C]">
                  <img
                    src={user.avatar}
                    width={24}
                    height={24}
                    alt="Avatar del usuario"
                    className="rounded-full border border-[#C9B8A8]"
                  />
                  <span className="font-medium">
                    {user.name} {user.lastname}
                  </span>
                </Link>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 text-[#5C4D3C] hover:text-[#8B7355] transition-colors duration-200"
                >
                  <Home size={18} /> Inicio
                </Link>
                {userRole === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-[#5C4D3C] hover:text-[#8B7355] transition-colors duration-200"
                  >
                    <LayoutDashboard size={18} /> Panel Vendedor
                  </Link>
                )}
                {userRole === "buyer" && (
                  <Link
                    to="/buyer/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-[#5C4D3C] hover:text-[#8B7355] transition-colors duration-200"
                  >
                    <ShoppingCart size={18} /> Mis Compras
                  </Link>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-[#B85450] hover:underline mt-4 pt-4 border-t border-[#E0D6CC]"
                >
                  <LogOut size={18} /> Salir
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 font-sans-elegant">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#8B7355] hover:underline"
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#8B7355] font-medium hover:underline"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </aside>
        </>
      )}
    </header>
  );
};

export default Header;
