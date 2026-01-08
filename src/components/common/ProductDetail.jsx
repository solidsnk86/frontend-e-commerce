import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useProducts } from '../../contexts/ProductContext';
import { ProductCard } from './ProductCard';
import { showDialog, closeDialog } from './Dialog';
import { 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Heart,
  Share2,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Copy
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductById, products, loading, isFavorite, toggleFavorite } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState('descripcion');
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const product = getProductById(id);

  // Guardar productos vistos recientemente
  useEffect(() => {
    if (product) {
      const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const filtered = viewed.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 6);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      setRecentlyViewed(filtered.slice(0, 4));
    }
  }, [product]);

  // Productos relacionados (misma categoría)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  // Tallas disponibles (simulado)
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  
  // Colores disponibles (simulado basado en el producto)
  const colors = [
    { name: 'Negro', value: '#1A1A1A' },
    { name: 'Blanco', value: '#FFFFFF' },
    { name: 'Rosa', value: '#E8C4C4' },
  ];

  // Actualizar estado de favorito cuando cambie el producto
  useEffect(() => {
    if (product) {
      setIsFav(isFavorite(product.id));
    }
  }, [product, isFavorite]);

  // Función para abrir imagen en dialog
  const openImageDialog = () => {
    showDialog({
      title: '',
      content: (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={closeDialog}>
          <button 
            onClick={closeDialog}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )
    });
  };

  // Función para manejar favoritos
  const handleToggleFavorite = () => {
    const result = toggleFavorite(product);
    setIsFav(result);
    showDialog({
      content: (
        <div className="flex items-center gap-2 text-sm font-sans-elegant">
          <Heart className={`w-4 h-4 ${result ? 'fill-[#E8C4C4] text-[#E8C4C4]' : 'text-[#1A1A1A]'}`} />
          {result ? 'Agregado a favoritos' : 'Eliminado de favoritos'}
        </div>
      )
    });
  };

  // Función para compartir
  const handleShare = async () => {
    const url = window.location.href;
    const text = `Mira este producto: ${product.name}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url });
      } catch (err) {
        // Usuario canceló el share
      }
    } else {
      // Fallback: copiar al portapapeles
      try {
        await navigator.clipboard.writeText(url);
        showDialog({
          content: (
            <div className="flex items-center gap-2 text-sm font-sans-elegant">
              <Check className="w-4 h-4 text-green-600" />
              Enlace copiado al portapapeles
            </div>
          )
        });
      } catch (err) {
        showDialog({
          content: (
            <div className="text-sm font-sans-elegant">
              <p className="mb-2">Copia este enlace:</p>
              <div className="flex items-center gap-2 bg-[#F8F8F8] p-2 border border-[#E5E5E5]">
                <input 
                  type="text" 
                  value={url} 
                  readOnly 
                  className="flex-1 bg-transparent text-xs outline-none"
                />
                <Copy className="w-4 h-4 text-[#6B6B6B]" />
              </div>
            </div>
          )
        });
      }
    }
  };

  // Rating simulado
  const averageRating = 4.8;
  const reviewCount = 12;

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-6 bg-[#F8F8F8] rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-[#F8F8F8] rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A] mb-6">
            Producto no encontrado
          </h2>
          <Link 
            to="/products"
            className="inline-block bg-[#1A1A1A] text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#333333] transition-colors"
          >
            Volver a la tienda
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

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const renderStars = (rating, size = 'sm') => {
    const sizeClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= rating ? 'fill-[#1A1A1A] text-[#1A1A1A]' : 'text-[#E5E5E5]'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-xs font-sans-elegant uppercase tracking-wider">
            <Link to="/" className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Inicio</Link>
            <span className="mx-2 text-[#E5E5E5]">/</span>
            <Link to="/products" className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">{product.category || 'Productos'}</Link>
            <span className="mx-2 text-[#E5E5E5]">/</span>
            <span className="text-[#1A1A1A]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div 
              className="relative aspect-square bg-[#F8F8F8] overflow-hidden group cursor-zoom-in max-w-md mx-auto lg:mx-0"
              onClick={openImageDialog}
            >
              {product.originalPrice && (
                <span className="absolute top-4 left-4 z-10 bg-[#1A1A1A] text-white text-[10px] px-3 py-1.5 font-sans-elegant uppercase tracking-wider">
                  Oferta
                </span>
              )}
              {product.image ? (
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#E5E5E5] text-8xl">
                  👗
                </div>
              )}
              {/* Icono de zoom */}
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5 text-[#1A1A1A]" />
              </div>
              {/* Thumbnails */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button className="w-12 h-12 bg-white border-2 border-[#1A1A1A] overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#F8F8F8]"></div>
                  )}
                </button>
                <button className="w-12 h-12 bg-white border border-[#E5E5E5] overflow-hidden opacity-50">
                  <div className="w-full h-full bg-[#F8F8F8]"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="lg:pl-4">
            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              {renderStars(averageRating)}
              <span className="text-xs text-[#6B6B6B] font-sans-elegant">({reviewCount})</span>
            </div>

            {/* Nombre */}
            <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wide text-[#1A1A1A] mb-4">
              {product.name}
            </h1>

            {/* Precio */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-sans-elegant text-[#1A1A1A]">
                ${product.price?.toLocaleString('es-AR')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#6B6B6B] line-through font-sans-elegant">
                    ${Number(product.originalPrice).toLocaleString('es-AR')}
                  </span>
                  <span className="text-xs bg-[#E8C4C4] text-[#1A1A1A] px-2 py-1 font-sans-elegant uppercase">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-xs font-sans-elegant uppercase tracking-wider text-[#6B6B6B] mb-3">
                Color: <span className="text-[#1A1A1A]">{selectedColor || 'Negro'}</span>
              </p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name ? 'border-[#1A1A1A] scale-110' : 'border-[#E5E5E5]'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Talla */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-sans-elegant uppercase tracking-wider text-[#6B6B6B]">
                  Talla: <span className="text-[#1A1A1A]">{selectedSize || 'Seleccionar'}</span>
                </p>
                <button className="text-xs text-[#1A1A1A] underline font-sans-elegant hover:no-underline">
                  Guía de tallas
                </button>
              </div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-xs font-sans-elegant uppercase tracking-wider transition-all ${
                      selectedSize === size 
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                        : 'border-[#E5E5E5] text-[#1A1A1A] hover:border-[#1A1A1A]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="mb-6">
              <p className="text-xs font-sans-elegant uppercase tracking-wider text-[#6B6B6B] mb-3">
                Cantidad
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E5E5E5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-[#F8F8F8] text-[#1A1A1A] transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 border-x border-[#E5E5E5] font-sans-elegant min-w-[60px] text-center text-[#1A1A1A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(stockValue || quantity + 1, quantity + 1))}
                    className="px-4 py-3 hover:bg-[#F8F8F8] text-[#1A1A1A] transition-colors"
                    disabled={stockValue > 0 && quantity >= stockValue}
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-[#6B6B6B] font-sans-elegant">
                  {stockValue} disponibles
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#1A1A1A] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-300"
              >
                Añadir al carrito
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-4 border border-[#1A1A1A] text-[#1A1A1A] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
              >
                Comprar ahora
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={handleToggleFavorite}
                  className={`flex-1 py-3 border font-sans-elegant text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    isFav 
                      ? 'border-[#E8C4C4] bg-[#FDF8F8] text-[#1A1A1A]' 
                      : 'border-[#E5E5E5] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-[#E8C4C4] text-[#E8C4C4]' : ''}`} />
                  {isFav ? 'En Favoritos' : 'Favoritos'}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 py-3 border border-[#E5E5E5] text-[#6B6B6B] font-sans-elegant text-xs tracking-wider uppercase hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir
                </button>
              </div>
            </div>

            {/* Info de envío */}
            <div className="border-t border-[#E5E5E5] pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#1A1A1A] mt-0.5" />
                <div>
                  <p className="text-sm font-sans-elegant text-[#1A1A1A]">
                    {product.price > 45000 ? 'Envío gratis' : 'Envío desde $5.000'}
                  </p>
                  <p className="text-xs text-[#6B6B6B] font-sans-elegant">
                    Entrega estimada: 3-5 días hábiles
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-[#1A1A1A] mt-0.5" />
                <div>
                  <p className="text-sm font-sans-elegant text-[#1A1A1A]">Devolución gratuita</p>
                  <p className="text-xs text-[#6B6B6B] font-sans-elegant">30 días para cambios y devoluciones</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#1A1A1A] mt-0.5" />
                <div>
                  <p className="text-sm font-sans-elegant text-[#1A1A1A]">Compra segura</p>
                  <p className="text-xs text-[#6B6B6B] font-sans-elegant">Pago protegido con encriptación SSL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de información */}
      <div className="border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tab headers */}
          <div className="flex border-b border-[#E5E5E5]">
            <button
              onClick={() => toggleAccordion('descripcion')}
              className={`px-6 py-4 text-xs font-sans-elegant uppercase tracking-wider transition-colors border-b-2 -mb-[2px] ${
                activeAccordion === 'descripcion' 
                  ? 'border-[#1A1A1A] text-[#1A1A1A]' 
                  : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
              }`}
            >
              Descripción
            </button>
            <button
              onClick={() => toggleAccordion('detalles')}
              className={`px-6 py-4 text-xs font-sans-elegant uppercase tracking-wider transition-colors border-b-2 -mb-[2px] ${
                activeAccordion === 'detalles' 
                  ? 'border-[#1A1A1A] text-[#1A1A1A]' 
                  : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
              }`}
            >
              Detalles
            </button>
            <button
              onClick={() => toggleAccordion('envio')}
              className={`px-6 py-4 text-xs font-sans-elegant uppercase tracking-wider transition-colors border-b-2 -mb-[2px] ${
                activeAccordion === 'envio' 
                  ? 'border-[#1A1A1A] text-[#1A1A1A]' 
                  : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
              }`}
            >
              Envío
            </button>
          </div>

          {/* Tab content */}
          <div className="py-8">
            {activeAccordion === 'descripcion' && (
              <div className="max-w-3xl">
                <p className="text-[#6B6B6B] font-sans-elegant leading-relaxed">
                  {product.description || 'Luce fabulosa con esta prenda de nuestra colección. Ideal para destacar en cualquier ocasión. Con un diseño cómodo y elegante, es la mezcla perfecta entre estilo y comodidad.'}
                </p>
                <p className="text-[#6B6B6B] font-sans-elegant leading-relaxed mt-4">
                  Modelo usa talla M.
                </p>
              </div>
            )}
            {activeAccordion === 'detalles' && (
              <div className="max-w-3xl">
                <table className="w-full">
                  <tbody className="font-sans-elegant text-sm">
                    {product.brand && (
                      <tr className="border-b border-[#E5E5E5]">
                        <td className="py-3 text-[#6B6B6B] w-1/3">Marca</td>
                        <td className="py-3 text-[#1A1A1A]">{product.brand}</td>
                      </tr>
                    )}
                    <tr className="border-b border-[#E5E5E5]">
                      <td className="py-3 text-[#6B6B6B] w-1/3">Categoría</td>
                      <td className="py-3 text-[#1A1A1A]">{product.category || 'Ropa'}</td>
                    </tr>
                    {product.size && (
                      <tr className="border-b border-[#E5E5E5]">
                        <td className="py-3 text-[#6B6B6B] w-1/3">Tallas disponibles</td>
                        <td className="py-3 text-[#1A1A1A]">XS, S, M, L, XL</td>
                      </tr>
                    )}
                    {product.color && (
                      <tr className="border-b border-[#E5E5E5]">
                        <td className="py-3 text-[#6B6B6B] w-1/3">Color</td>
                        <td className="py-3 text-[#1A1A1A]">{product.color}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-3 text-[#6B6B6B] w-1/3">Cuidados</td>
                      <td className="py-3 text-[#1A1A1A]">Lavar a mano o en ciclo delicado</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeAccordion === 'envio' && (
              <div className="max-w-3xl space-y-4">
                <div>
                  <h4 className="text-sm font-sans-elegant text-[#1A1A1A] mb-2">Tiempos de entrega</h4>
                  <p className="text-sm text-[#6B6B6B] font-sans-elegant">
                    • CABA y GBA: 2-3 días hábiles<br />
                    • Interior del país: 4-7 días hábiles
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-sans-elegant text-[#1A1A1A] mb-2">Costos de envío</h4>
                  <p className="text-sm text-[#6B6B6B] font-sans-elegant">
                    • Envío gratis en compras mayores a $45.000<br />
                    • Envío estándar desde $5.000
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* También te podría gustar */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A] text-center mb-8">
              También te podría gustar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vistos recientemente */}
      {recentlyViewed.length > 0 && (
        <div className="border-t border-[#E5E5E5] bg-[#F8F8F8]">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A] text-center mb-8">
              Vistos recientemente
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentlyViewed.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;