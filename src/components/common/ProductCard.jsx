import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { showDialog } from "./Dialog";

export const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  const getStockFromProduct = (p) => {
    if (!p) return null;
    const keys = ["stock", "quantityAvailable", "inventory", "stockQty", "qty", "available"];
    for (const k of keys) {
      if (Object.prototype.hasOwnProperty.call(p, k)) {
        const v = p[k];
        if (typeof v === "number" && Number.isFinite(v)) return v;
        if (typeof v === "string" && v !== "") {
          const n = Number(v);
          if (!Number.isNaN(n)) return n;
        }
      }
    }
    return null;
  };

  const currentCartItem = cartItems.find((it) => it.id === product.id);
  const currentQty = currentCartItem ? currentCartItem.quantity : 0;
  const stock = getStockFromProduct(product);
  const isSoldOut = typeof stock === "number" && stock <= 0;
  const cannotAddMore = typeof stock === "number" && currentQty >= stock;

  const handleAddWithSize = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut || cannotAddMore) {
      showDialog({ content: <div>No hay suficiente stock disponible</div> });
      return;
    }
    const ok = addToCart({ ...product, selectedSize: size }, 1);
    if (!ok) {
      showDialog({ content: <div>No se pudo agregar, no hay stock suficiente.</div> });
    } else {
      showDialog({ content: <div>Agregado al carrito: <span className="font-medium">{product.name}</span> - Talla {size}</div> });
    }
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : null;

  return (
    <div className="group bg-white h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="block relative">
        {/* Imagen del producto */}
        <div className="relative w-full aspect-[3/4] bg-[#F8F8F8] overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#E5E5E5] text-4xl">👗</div>
          )}
          
          {/* Badge de oferta */}
          {product.originalPrice && (
            <span className="absolute top-2 left-2 bg-[#1A1A1A] text-white text-[9px] px-2 py-1 font-sans-elegant uppercase tracking-wider">
              Oferta
            </span>
          )}

          {/* Tallas en hover - superpuestas en la imagen */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-2 px-2 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
            <div className="flex justify-center gap-1">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleAddWithSize(e, size)}
                  disabled={isSoldOut || cannotAddMore}
                  className={`px-3 py-1.5 text-[10px] font-sans-elegant uppercase tracking-wider border transition-all duration-200 ${
                    isSoldOut || cannotAddMore
                      ? "border-[#E5E5E5] text-[#CCC] cursor-not-allowed bg-white"
                      : "border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Link>
      
      {/* Info del producto */}
      <div className="pt-3 space-y-1">
        <h3 className="font-sans-elegant text-[11px] uppercase tracking-wider text-[#1A1A1A] line-clamp-1 leading-tight">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          {product.originalPrice && (
            <span className="text-[11px] text-[#999] line-through font-sans-elegant">
              ${product.originalPrice.toLocaleString('es-AR')}
            </span>
          )}
          {discount && (
            <span className="text-[10px] text-[#E74C3C] font-sans-elegant">
              -{discount}%
            </span>
          )}
          <span className="text-[12px] font-sans-elegant text-[#1A1A1A] font-medium">
            ${product.price?.toLocaleString('es-AR')} CLP
          </span>
        </div>
      </div>
    </div>
  );
};
