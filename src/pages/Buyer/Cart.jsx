import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, getStockFromProduct } from "../../contexts/CartContext";
import Button from "../../components/common/Button";
import { showDialog } from "../../components/common/Dialog";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-[#E0D6CC] p-16 text-center">
            <div className="text-5xl mb-6 flex justify-center items-center text-[#C9B8A8]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif-display font-light text-[#2C2420] mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-[#7A6B5A] font-sans-elegant font-light mb-8">
              Descubre nuestra colección y encuentra piezas únicas para tu guardarropa
            </p>
            <Link to="/">
              <button className="px-10 py-4 bg-[#8B7355] text-white font-sans-elegant text-sm tracking-[0.2em] uppercase hover:bg-[#6B5A45] transition-all duration-300">
                Explorar Colección
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#8B7355] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-3">
            Tu Selección
          </p>
          <h1 className="text-3xl md:text-4xl font-serif-display font-light text-[#2C2420]">
            Carrito de Compras
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E0D6CC]">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-6 ${index !== cartItems.length - 1 ? 'border-b border-[#E0D6CC]' : ''}`}
                >
                  <div className="sm:flex gap-6">
                    {/* Product Image */}
                    <div className="w-28 h-28 bg-[#F5F0EB] flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl text-[#C9B8A8]">👗</span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 mt-4 sm:mt-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-[#2C2420] hover:text-[#8B7355] font-serif-display text-lg transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-[#7A6B5A] font-sans-elegant mt-1 tracking-wide uppercase">
                        {item.condition === "new" ? "Nuevo" : "Pre-loved"}
                      </p>
                      
                      <div className="flex items-center gap-6 mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#E0D6CC]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-4 py-2 hover:bg-[#F5F0EB] text-[#5C4D3C] transition-colors duration-200"
                          >
                            −
                          </button>
                          <span className="px-5 py-2 border-x border-[#E0D6CC] font-sans-elegant text-[#2C2420]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              const stock = getStockFromProduct(item);
                              if (typeof stock === "number" && item.quantity + 1 > stock) {
                                showDialog({ content: <div>No hay suficiente stock disponible</div> })
                                return;
                              }
                              updateQuantity(item.id, item.quantity + 1);
                            }}
                            className={`px-4 py-2 hover:bg-[#F5F0EB] text-[#5C4D3C] transition-colors duration-200 ${
                              (typeof getStockFromProduct(item) === "number" && item.quantity >= getStockFromProduct(item)) 
                                ? "opacity-40 cursor-not-allowed" 
                                : ""
                            }`}
                            aria-disabled={typeof getStockFromProduct(item) === "number" && item.quantity >= getStockFromProduct(item)}
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8B7355] hover:text-[#B85450] text-xs font-sans-elegant tracking-wide uppercase transition-colors duration-200"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right mt-4 sm:mt-0">
                      <p className="text-xl font-serif-display text-[#2C2420]">
                        ${(item.price * item.quantity).toLocaleString('es-AR')}
                      </p>
                      <p className="text-xs text-[#7A6B5A] font-sans-elegant mt-1">
                        ${item.price.toLocaleString('es-AR')} c/u
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E0D6CC] p-8 sticky top-4">
              <h2 className="text-xl font-serif-display text-[#2C2420] mb-6 pb-4 border-b border-[#E0D6CC]">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-sans-elegant">
                  <span className="text-[#7A6B5A]">Subtotal</span>
                  <span className="text-[#2C2420]">
                    ${getCartTotal().toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-sans-elegant">
                  <span className="text-[#7A6B5A]">Envío</span>
                  <span className="text-[#8B7355]">Gratis</span>
                </div>
                <div className="border-t border-[#E0D6CC] pt-4">
                  <div className="flex justify-between">
                    <span className="font-serif-display text-lg text-[#2C2420]">Total</span>
                    <span className="font-serif-display text-2xl text-[#2C2420]">
                      ${getCartTotal().toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#8B7355] text-white font-sans-elegant text-sm tracking-[0.2em] uppercase hover:bg-[#6B5A45] transition-all duration-300 mb-4"
              >
                Finalizar Compra
              </button>

              <Link to="/">
                <button className="w-full py-4 border border-[#E0D6CC] text-[#5C4D3C] font-sans-elegant text-sm tracking-[0.15em] uppercase hover:border-[#8B7355] hover:text-[#8B7355] transition-all duration-300">
                  Seguir Comprando
                </button>
              </Link>

              <div className="mt-8 p-5 bg-[#F5F0EB] border border-[#E0D6CC]">
                <p className="text-xs text-[#7A6B5A] font-sans-elegant leading-relaxed">
                  <span className="block text-[#8B7355] font-medium mb-1">✨ Compra Segura</span>
                  Tus datos están protegidos. Envíos elegantemente empaquetados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
