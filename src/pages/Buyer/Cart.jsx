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
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-[#E5E5E5] p-16 text-center">
            <div className="text-5xl mb-6 flex justify-center items-center text-[#E5E5E5]">
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
            <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A] mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-[#6B6B6B] font-sans-elegant text-sm mb-8">
              Descubre nuestra colección y encuentra piezas únicas para tu guardarropa
            </p>
            <Link to="/">
              <button className="px-8 py-3 bg-[#1A1A1A] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333] transition-all duration-300">
                Explorar Colección
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A]">
            Carrito de Compras
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E5E5E5]">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-6 ${index !== cartItems.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                >
                  <div className="sm:flex gap-6">
                    {/* Product Image */}
                    <div className="w-28 h-28 bg-[#F8F8F8] flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl text-[#E8C4C4]">👗</span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 mt-4 sm:mt-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-[#1A1A1A] hover:text-[#6B6B6B] font-sans-elegant text-sm uppercase tracking-wide transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-[#6B6B6B] font-sans-elegant mt-1 tracking-wide uppercase">
                        {item.condition === "new" ? "Nuevo" : "Pre-loved"}
                      </p>
                      
                      <div className="flex items-center gap-6 mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#E5E5E5]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-4 py-2 hover:bg-[#F8F8F8] text-[#1A1A1A] transition-colors duration-200"
                          >
                            −
                          </button>
                          <span className="px-5 py-2 border-x border-[#E5E5E5] font-sans-elegant text-[#1A1A1A]">
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
                            className={`px-4 py-2 hover:bg-[#F8F8F8] text-[#1A1A1A] transition-colors duration-200 ${
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
                          className="text-[#6B6B6B] hover:text-[#1A1A1A] text-xs font-sans-elegant tracking-wide uppercase transition-colors duration-200"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right mt-4 sm:mt-0">
                      <p className="text-lg font-sans-elegant text-[#1A1A1A]">
                        ${(item.price * item.quantity).toLocaleString('es-AR')}
                      </p>
                      <p className="text-xs text-[#6B6B6B] font-sans-elegant mt-1">
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
            <div className="bg-white border border-[#E5E5E5] p-8 sticky top-4">
              <h2 className="text-sm font-sans-elegant text-[#1A1A1A] uppercase tracking-wider mb-6 pb-4 border-b border-[#E5E5E5]">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-sans-elegant">
                  <span className="text-[#6B6B6B]">Subtotal</span>
                  <span className="text-[#1A1A1A]">
                    ${getCartTotal().toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-sans-elegant">
                  <span className="text-[#6B6B6B]">Envío</span>
                  <span className="text-[#1A1A1A]">Gratis</span>
                </div>
                <div className="border-t border-[#E5E5E5] pt-4">
                  <div className="flex justify-between">
                    <span className="font-sans-elegant text-sm uppercase tracking-wide text-[#1A1A1A]">Total</span>
                    <span className="font-sans-elegant text-xl text-[#1A1A1A]">
                      ${getCartTotal().toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#1A1A1A] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333333] transition-all duration-300 mb-4"
              >
                Finalizar Compra
              </button>

              <Link to="/">
                <button className="w-full py-4 border border-[#1A1A1A] text-[#1A1A1A] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-300">
                  Seguir Comprando
                </button>
              </Link>

              <div className="mt-8 p-5 bg-[#F8F8F8] border border-[#E5E5E5]">
                <p className="text-xs text-[#6B6B6B] font-sans-elegant leading-relaxed">
                  <span className="block text-[#1A1A1A] font-medium mb-1">✨ Compra Segura</span>
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
