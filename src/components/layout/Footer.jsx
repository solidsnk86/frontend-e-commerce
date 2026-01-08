import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { 
  ShoppingCart, 
  MapPin, 
  Clock, 
  Mail,
  Instagram,
  Facebook
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

// TikTok icon (no está en lucide-react)
const TikTokIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export const Footer = () => {
  const { getCartItemsCount } = useCart();
  const { user } = useAuth();
  return (
    <footer className="bg-[#1A1A1A] text-white mt-8 z-50">
      {user?.role !== "seller" ? (
        <Link
          to="/cart"
          className="md:hidden fixed bottom-4 right-4 text-white items-center rounded-full p-4 bg-[#1A1A1A] hover:bg-[#333] transition-all duration-300 shadow-lg border border-white/20"
        >
          <ShoppingCart size={20} />
          <span
            style={{ display: getCartItemsCount() <= 0 ? "none" : "flex" }}
            className="px-1.5 absolute -top-1 right-0 text-xs font-medium bg-[#E8C4C4] text-[#1A1A1A] rounded-full"
          >
            {getCartItemsCount()}
          </span>
        </Link>
      ) : null}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contacto */}
          <div>
            <h3 className="font-sans-elegant text-xs uppercase tracking-wider mb-4 text-white">
              Contacto
            </h3>
            <ul className="text-xs space-y-3 font-sans-elegant">
              <li className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4" />
                Santiago, Chile
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4" />
                Lunes a Viernes de 9:00 a 18:00
              </li>
              <li>
                <a href="mailto:contacto@pascalecloset.com" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                  contacto@pascalecloset.com
                </a>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-sans-elegant text-xs uppercase tracking-wider mb-4 text-white">
              <Link to="/help">Ayuda</Link>
            </h3>
            <ul className="text-xs space-y-3 font-sans-elegant">
              <li>
                <Link to="/help#shipping" className="text-white/70 hover:text-white transition-colors duration-200">
                  Cambios y devoluciones
                </Link>
              </li>
              <li>
                <Link to="/help#shipping" className="text-white/70 hover:text-white transition-colors duration-200">
                  Tiempos de entrega
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white/70 hover:text-white transition-colors duration-200">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-sans-elegant text-xs uppercase tracking-wider mb-4 text-white">
              <Link to="/legal">Legal</Link>
            </h3>
            <ul className="text-xs space-y-3 font-sans-elegant">
              <li>
                <Link to="/legal#terms" className="text-white/70 hover:text-white transition-colors duration-200">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/legal#privacy" className="text-white/70 hover:text-white transition-colors duration-200">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="font-sans-elegant text-xs uppercase tracking-wider mb-4 text-white">
              Redes Sociales
            </h3>
            <div className="flex gap-4">
              <a href="https://instagram.com/pascalecloset" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/pascalecloset" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@pascalecloset" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors duration-200">
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center">
          <p className="text-xs text-white/50 font-sans-elegant">
            © 2026 Pascale Closet. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
