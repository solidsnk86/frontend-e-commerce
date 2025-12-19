import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Button from '../../components/common/Button';
import { useProducts } from '../../contexts/ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductById, loading } = useProducts();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl font-sans-elegant text-[#7A6B5A]">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif-display text-[#2C2420] mb-6">Producto no encontrado</h2>
          <Link to="/">
            <Button variant="primary">Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    );
  }

  const stockValue = Number(product.stock) || 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8 font-sans-elegant">
          <Link to="/" className="text-[#8B7355] hover:underline">Inicio</Link>
          <span className="mx-3 text-[#C9B8A8]">/</span>
          <Link to="/products" className="text-[#8B7355] hover:underline">Colección</Link>
          <span className="mx-3 text-[#C9B8A8]">/</span>
          <span className="text-[#7A6B5A]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="w-full max-w-md mx-auto lg:mx-0 aspect-[4/5] bg-[#F5F0EB] border border-[#E0D6CC] flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-[#C9B8A8] text-7xl">👗</div>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-sans-elegant tracking-[0.2em] uppercase text-[#8B7355] mb-2">
                {product.category || 'Colección'}
              </p>
              <h1 className="text-3xl md:text-4xl font-serif-display font-light text-[#2C2420] mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#7A6B5A] font-sans-elegant">Vendedor:</span>
                <span className="text-sm font-sans-elegant text-[#8B7355]">{product.seller}</span>
              </div>
            </div>

            {/* Precio */}
            <div className="bg-white border border-[#E0D6CC] p-8">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-4xl font-serif-display text-[#2C2420]">
                  ${product.price?.toLocaleString('es-AR')}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-[#A69580] line-through font-sans-elegant">
                    ${Number(product.originalPrice).toLocaleString('es-AR')}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#7A6B5A] font-sans-elegant">
                {product.price > 45000 ? (
                  <span className="text-[#6B8E6B]">✓ Envío gratis</span>
                ) : (
                  <span>Envíos desde $5.000</span>
                )}
              </p>
            </div>

            {/* Selector de cantidad */}
            <div className="bg-white border border-[#E0D6CC] p-8">
              <label className="block text-sm font-sans-elegant tracking-wide uppercase text-[#5C4D3C] mb-4">
                Cantidad
              </label>
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-[#E0D6CC]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 hover:bg-[#F5F0EB] text-[#5C4D3C] text-xl transition-colors duration-200"
                  >
                    −
                  </button>
                  <span className="px-8 py-3 border-x border-[#E0D6CC] font-sans-elegant min-w-[80px] text-center text-[#2C2420]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(stockValue || quantity + 1, quantity + 1))}
                    className="px-5 py-3 hover:bg-[#F5F0EB] text-[#5C4D3C] text-xl transition-colors duration-200"
                    disabled={stockValue > 0 && quantity >= stockValue}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-[#7A6B5A] font-sans-elegant">
                  ({stockValue} disponibles)
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#8B7355] text-white font-sans-elegant text-sm tracking-[0.2em] uppercase hover:bg-[#6B5A45] transition-all duration-300"
              >
                Agregar al Carrito
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-4 border border-[#8B7355] text-[#8B7355] font-sans-elegant text-sm tracking-[0.2em] uppercase hover:bg-[#8B7355] hover:text-white transition-all duration-300"
              >
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>

        {/* Descripción y Especificaciones */}
        <div className="bg-white border border-[#E0D6CC] p-8 md:p-12">
          <div className="mb-10">
            <h3 className="text-2xl font-serif-display text-[#2C2420] mb-6">Descripción</h3>
            <p className="text-[#5C4D3C] font-sans-elegant leading-relaxed">{product.description}</p>
          </div>

          {/* Especificaciones */}
          <div className="mb-10">
            <h3 className="text-2xl font-serif-display text-[#2C2420] mb-6">Detalles</h3>
            {product.brand || product.year || product.size || product.color ? (
              <table className="w-full text-left">
                <tbody className="font-sans-elegant">
                  {product.brand && (
                    <tr className="border-b border-[#E0D6CC]">
                      <th className="px-0 py-4 font-medium text-[#5C4D3C] w-1/3">Marca</th>
                      <td className="px-0 py-4 text-[#7A6B5A]">{product.brand}</td>
                    </tr>
                  )}
                  {product.year && (
                    <tr className="border-b border-[#E0D6CC]">
                      <th className="px-0 py-4 font-medium text-[#5C4D3C] w-1/3">Año</th>
                      <td className="px-0 py-4 text-[#7A6B5A]">{product.year}</td>
                    </tr>
                  )}
                  {product.size && (
                    <tr className="border-b border-[#E0D6CC]">
                      <th className="px-0 py-4 font-medium text-[#5C4D3C] w-1/3">Talle</th>
                      <td className="px-0 py-4 text-[#7A6B5A]">{product.size}</td>
                    </tr>
                  )}
                  {product.color && (
                    <tr>
                      <th className="px-0 py-4 font-medium text-[#5C4D3C] w-1/3">Color</th>
                      <td className="px-0 py-4 text-[#7A6B5A]">{product.color}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <p className="text-[#7A6B5A] font-sans-elegant">Este producto no tiene especificaciones registradas.</p>
            )}
          </div>

          {/* Categoría */}
          <div>
            <h3 className="text-2xl font-serif-display text-[#2C2420] mb-4">Categoría</h3>
            <p className="text-[#8B7355] font-sans-elegant tracking-wide uppercase text-sm">{product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;