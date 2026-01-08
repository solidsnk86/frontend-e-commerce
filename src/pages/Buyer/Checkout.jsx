import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Loader2 } from "lucide-react"

export const Checkout = () => {
  const { cartItems, getCartTotal, clearCart, handlePayment, loadingPayment } =  useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Argentina",
    // Payment Info
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "Requerido";
    if (!formData.email.trim()) newErrors.email = "Requerido";
    if (!formData.phone.trim()) newErrors.phone = "Requerido";
    if (!formData.address.trim()) newErrors.address = "Requerido";
    if (!formData.city.trim()) newErrors.city = "Requerido";
    if (!formData.state.trim()) newErrors.state = "Requerido";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Requerido";
    return newErrors;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Requerido";
    if (!formData.cardName.trim()) newErrors.cardName = "Requerido";
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Requerido";
    if (!formData.cvv.trim()) newErrors.cvv = "Requerido";
    return newErrors;
  };

  const handleNextStep = () => {
    if (step === 1) {
      const newErrors = validateShipping();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const newErrors = validatePayment();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    // Simulación de procesamiento de pedido
    clearCart();
    navigate("/order-confirmation", {
      state: {
        orderNumber: Math.floor(Math.random() * 1000000),
        total: (getCartTotal() * 1.1).toFixed(2),
      },
    });
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A] mb-8 text-center">
          Finalizar Compra
        </h1>

        {/* Progress Steps */}
        <div className="bg-white border border-[#E5E5E5] p-6 mb-8">
          <div className="flex justify-between items-center">
            <div
              className={`flex-1 text-center ${
                step >= 1 ? "text-[#1A1A1A]" : "text-[#C5C5C5]"
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full border ${
                  step >= 1
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-white"
                    : "border-[#E5E5E5] text-[#6B6B6B]"
                } flex items-center justify-center font-sans-elegant text-sm mb-2`}
              >
                1
              </div>
              <p className="text-xs font-sans-elegant uppercase tracking-wide">Envío</p>
            </div>
            <div
              className={`flex-1 h-px ${
                step >= 2 ? "bg-[#1A1A1A]" : "bg-[#E5E5E5]"
              }`}
            ></div>
            <div
              className={`flex-1 text-center ${
                step >= 2 ? "text-[#1A1A1A]" : "text-[#C5C5C5]"
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full border ${
                  step >= 2
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-white"
                    : "border-[#E5E5E5] text-[#6B6B6B]"
                } flex items-center justify-center font-sans-elegant text-sm mb-2`}
              >
                2
              </div>
              <p className="text-xs font-sans-elegant uppercase tracking-wide">Pago</p>
            </div>
            <div
              className={`flex-1 h-px ${
                step >= 3 ? "bg-[#1A1A1A]" : "bg-[#E5E5E5]"
              }`}
            ></div>
            <div
              className={`flex-1 text-center ${
                step >= 3 ? "text-[#1A1A1A]" : "text-[#C5C5C5]"
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full border ${
                  step >= 3
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-white"
                    : "border-[#E5E5E5] text-[#6B6B6B]"
                } flex items-center justify-center font-sans-elegant text-sm mb-2`}
              >
                3
              </div>
              <p className="text-xs font-sans-elegant uppercase tracking-wide">Revisar</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E5E5E5] p-8">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div>
                  <h2 className="text-sm font-sans-elegant uppercase tracking-wider text-[#1A1A1A] mb-6 pb-4 border-b border-[#E5E5E5]">
                    Información de Envío
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      label="Nombre"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      name="lastName"
                      label="Apellido"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                      required
                    />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  <Input
                    name="phone"
                    label="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                  />
                  <Input
                    name="address"
                    label="Dirección"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="city"
                      label="Ciudad"
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                      required
                    />
                    <Input
                      name="state"
                      label="Departamento"
                      value={formData.state}
                      onChange={handleChange}
                      error={errors.state}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="zipCode"
                      label="Código Postal"
                      value={formData.zipCode}
                      onChange={handleChange}
                      error={errors.zipCode}
                      required
                    />
                    <Input
                      name="country"
                      label="País"
                      value={formData.country}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="large"
                    onClick={handleNextStep}
                    className="w-full mt-4"
                  >
                    Continuar al Pago
                  </Button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-sm font-sans-elegant uppercase tracking-wider text-[#1A1A1A] mb-6 pb-4 border-b border-[#E5E5E5]">
                    Pagar con Mercado Pago
                  </h2>

                  {/* Aca se crea el brick que redirecciona a pagar evitando el uso de Wallet */}
                  <div id="wallet_container" className="my-4">
                    <button onClick={handlePayment} className="w-full py-4 bg-[#1A1A1A] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-300" disabled={loadingPayment}>
                    {loadingPayment ? 
                      <span className="flex gap-2 items-center justify-center">
                        <Loader2 className="animate-spin w-4 h-4" /> Procesando...
                      </span>
                     : <span className="flex gap-2 items-center justify-center">
                        Continuar con 
                        <img src="/assets/Mercado_Pago_Logo.svg" width={100} height={40} className="brightness-0 invert" />
                     </span>}
                    </button>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div>
                  <h2 className="text-sm font-sans-elegant uppercase tracking-wider text-[#1A1A1A] mb-6 pb-4 border-b border-[#E5E5E5]">
                    Revisar Pedido
                  </h2>
                  <div className="space-y-4">
                    <div className="border border-[#E5E5E5] p-5">
                      <h3 className="font-sans-elegant text-xs uppercase tracking-wide text-[#1A1A1A] mb-3">Dirección de Envío</h3>
                      <p className="text-sm text-[#6B6B6B] font-sans-elegant leading-relaxed">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                        <br />
                        {formData.country}
                      </p>
                    </div>
                    <div className="border border-[#E5E5E5] p-5">
                      <h3 className="font-sans-elegant text-xs uppercase tracking-wide text-[#1A1A1A] mb-3">Método de Pago</h3>
                      <p className="text-sm text-[#6B6B6B] font-sans-elegant">
                        Tarjeta terminada en {formData.cardNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
                    >
                      Volver
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 py-4 bg-[#1A1A1A] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-300"
                    >
                      Confirmar Pedido
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E5E5] p-8 sticky top-4">
              <h2 className="text-sm font-sans-elegant uppercase tracking-wider text-[#1A1A1A] mb-6 pb-4 border-b border-[#E5E5E5]">Resumen</h2>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm font-sans-elegant">
                    <span className="text-[#6B6B6B]">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-[#1A1A1A]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E5E5E5] pt-4 space-y-3">
                <div className="flex justify-between text-sm font-sans-elegant">
                  <span className="text-[#6B6B6B]">Subtotal:</span>
                  <span className="text-[#1A1A1A]">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-sans-elegant">
                  <span className="text-[#6B6B6B]">Envío:</span>
                  <span className="text-[#1A1A1A]">GRATIS</span>
                </div>
                <div className="flex justify-between text-sm font-sans-elegant">
                  <span className="text-[#6B6B6B]">Impuestos:</span>
                  <span className="text-[#1A1A1A]">
                    ${(getCartTotal() * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-[#E5E5E5] pt-4">
                  <div className="flex justify-between">
                    <span className="font-sans-elegant text-sm uppercase tracking-wide text-[#1A1A1A]">Total:</span>
                    <span className="font-sans-elegant text-xl text-[#1A1A1A]">
                      ${(getCartTotal() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
