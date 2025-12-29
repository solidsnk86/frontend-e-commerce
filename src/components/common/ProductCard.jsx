// import React, { use } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { showDialog } from "./Dialog";

export const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  // mismo helper local para detectar stock
  const getStockFromProduct = (p) => {
    if (!p) return null;
    const keys = [
      "stock",
      "quantityAvailable",
      "inventory",
      "stockQty",
      "qty",
      "available",
    ];
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

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut || cannotAddMore) {
      showDialog({
        content: <div>No hay suficiente stock disponible</div>,
      });
      return;
    }
    const ok = addToCart(product, 1);
    if (!ok) {
      showDialog({
        content: (
          <div>No se pudo agregar, no hay stock suficiente.</div>
        ),
      });
    }
    showDialog({ content: <div>Producto agregado al carrito: <span className="text-[#8B7355] font-medium">{product.name}</span></div> })
  };

  return (
    <div className="group border border-[#E0D6CC] bg-white hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
      <Link to={`/product/${product.id}`} className="flex-1 block">
        <div className="w-full aspect-[5/6] bg-[#F5F0EB] flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="text-[#C9B8A8] text-2xl">👗</div>
          )}
        </div>
        <div className="card-info md:absolute md:inset-0 md:bg-gradient-to-t md:from-[#FAF8F5]/95 md:to-transparent md:opacity-0 md:group-hover:opacity-100 md:translate-y-8 md:group-hover:translate-y-0 md:pointer-events-none md:group-hover:pointer-events-auto md:transition-all md:duration-300 md:flex md:flex-col md:justify-end">
          <div className="p-3 md:pt-8">
            <h3 className="font-serif-display text-sm text-[#2C2420] group-hover:text-[#8B7355] mb-1.5 line-clamp-2 transition-colors duration-200 leading-tight">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-base font-serif-display text-[#2C2420]">
                ${product.price?.toLocaleString('es-AR')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#A69580] line-through font-sans-elegant">
                  ${product.originalPrice.toLocaleString('es-AR')}
                </span>
              )}
            </div>
            {product.shipping && (
              <p className="text-[10px] text-[#7A6B5A] font-sans-elegant">
                {product.price > 45000 ? (
                  <span className="text-[#6B8E6B]">
                    ✓ Envío gratis
                  </span>
                ) : (
                  <span>Envíos desde $5000</span>
                )}
              </p>
            )}
            {product.condition && (
              <p className="text-[10px] text-[#7A6B5A] font-sans-elegant mt-0.5 tracking-wide uppercase">
                {product.condition === "new" ? "Nuevo" : "Pre-loved"}
              </p>
            )}
            <div className="pt-2">
              <button
                onClick={handleAdd}
                disabled={isSoldOut || cannotAddMore}
                className={`w-full text-xs font-sans-elegant py-2.5 px-3 cursor-pointer transition-all duration-300 tracking-wide shadow-lg md:scale-95 md:group-hover:scale-100 md:shadow-xl ${
                  isSoldOut || cannotAddMore
                    ? "bg-[#E8DED0] text-[#A69580] cursor-not-allowed"
                    : "bg-[#8B7355] text-white hover:bg-[#6B5A45]"
                }`}
                aria-label={`Agregar "${product.name}" al carrito`}
                title={
                  isSoldOut
                    ? "Agotado"
                    : cannotAddMore
                    ? `Máximo ${stock} en stock`
                    : `Agregar "${product.name}" al carrito`
                }
              >
                {isSoldOut
                  ? "Agotado"
                  : cannotAddMore
                  ? `Máx (${stock})`
                  : "Agregar"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
