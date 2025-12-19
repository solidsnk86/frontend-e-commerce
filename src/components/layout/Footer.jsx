import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export const Footer = () => {
  const { getCartItemsCount } = useCart();
  const { user } = useAuth();
  return (
    <footer className="bg-[#F5F0EB] border-t border-[#E0D6CC] mt-8 z-50">
      {user?.role !== "seller" ? (
        <Link
          to="/cart"
          className="md:hidden fixed bottom-4 right-4 text-white items-center rounded-full p-4 bg-[#8B7355] hover:bg-[#6B5A45] transition-all duration-300 shadow-lg"
        >
          <ShoppingCart size={20} />
          <span
            style={{ display: getCartItemsCount() <= 0 ? "none" : "flex" }}
            className="px-1.5 absolute -top-1 right-0 text-xs font-medium bg-[#C4A574] text-white rounded-full"
          >
            {getCartItemsCount()}
          </span>
        </Link>
      ) : null}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Acerca */}
          <div>
            <h3 className="font-serif-display text-lg mb-4 text-[#2C2420]">
              <Link to="/about">Pascale Closet</Link>
            </h3>
            <ul className="text-sm space-y-3 font-sans-elegant">
              <li>
                <Link
                  to="/about#quienes-somos"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Nuestra historia
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-serif-display text-lg mb-4 text-[#2C2420]">
              <Link to="/help">Ayuda</Link>
            </h3>
            <ul className="text-sm space-y-3 font-sans-elegant">
              <li>
                <Link to="/help" className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link
                  to="/help#shipping"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Información de envío
                </Link>
              </li>
              <li>
                <Link
                  to="/help#returns"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  to="/help#contact"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Vendedor */}
          <div>
            <h3 className="font-serif-display text-lg mb-4 text-[#2C2420]">
              <Link to="/sellerInfo">Vendedoras</Link>
            </h3>
            <ul className="text-sm space-y-3 font-sans-elegant">
              <li>
                <Link
                  to="/sellerInfo#start"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Empieza a vender
                </Link>
              </li>
              <li>
                <Link
                  to="/sellerInfo#fees"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Tarifas
                </Link>
              </li>
              <li>
                <Link
                  to="/sellerInfo#resources"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Recursos
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif-display text-lg mb-4 text-[#2C2420]">
              <Link to="/legal">Legal</Link>
            </h3>
            <ul className="text-sm space-y-3 font-sans-elegant">
              <li>
                <Link
                  to="/legal#privacy"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/legal#terms"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link
                  to="/legal#cookies"
                  className="text-[#7A6B5A] hover:text-[#8B7355] transition-colors duration-200"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E0D6CC] mt-10 pt-8 text-center">
          <p className="text-sm text-[#7A6B5A] font-sans-elegant">
            © 2025 Pascale Closet. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#A69580] mt-2 font-sans-elegant">
            Elegancia en cada detalle ✨
          </p>
        </div>
      </div>
    </footer>
  );
};
