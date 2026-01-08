import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/common/ProductCard";
import { useProducts } from "../../contexts/ProductContext";
import { Loader } from "../../components/common/Loader";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import 'swiper/css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { InstagramButton } from "../../components/common/InstagramButton";
import { Truck, Package, Shirt } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [swiperRef, setSwiperRef] = useState(null);


  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-[#B85450] text-lg font-sans-elegant">
          Error: Contactese con el soporte técnico. {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1A1A1A] text-white text-center py-2 text-xs tracking-wider font-sans-elegant flex items-center justify-center gap-2">
        <span>ENVÍO GRATIS A PARTIR DE $50.000</span>
        <Truck className="inline w-4 h-4 mb-[2px]" />
        <span>CUOTAS SIN INTERÉS</span>
      </div>

      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600&q=80" 
            alt="Mujer con vestido - Pascale Closet Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/90 font-sans-elegant text-xs tracking-[0.4em] uppercase mb-4">
            Colección 2026
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif-display text-white mb-6 tracking-wide">
            NUEVA TEMPORADA
          </h1>
          <p className="text-white/80 font-sans-elegant text-sm md:text-base mb-8 max-w-md">
            Descubrí las últimas tendencias en moda femenina
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-white text-[#1A1A1A] font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#F5E6E0] transition-all duration-300"
          >
            Ver Colección
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif-display text-[#1A1A1A]">
            CATEGORÍAS
          </h2>
          <Link
            to="/products"
            className="text-[#1A1A1A] font-sans-elegant text-xs tracking-[0.15em] uppercase border border-[#1A1A1A] px-4 py-2 hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
          >
            Ver Todas
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/products/category/vestidos" className="group relative aspect-[3/4] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80" 
              alt="Vestidos"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-sans-elegant text-sm tracking-[0.2em] uppercase">Vestidos</p>
            </div>
          </Link>
          <Link to="/products/category/tops" className="group relative aspect-[3/4] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80" 
              alt="Tops & Blusas"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-sans-elegant text-sm tracking-[0.2em] uppercase">Tops & Blusas</p>
            </div>
          </Link>
          <Link to="/products/category/faldas" className="group relative aspect-[3/4] overflow-hidden hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80" 
              alt="Faldas & Shorts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-sans-elegant text-sm tracking-[0.2em] uppercase">Faldas & Shorts</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif-display text-[#1A1A1A]">
            RECIÉN LLEGADOS
          </h2>
          <Link
            to="/products"
            className="text-[#1A1A1A] hover:text-[#6B6B6B] font-sans-elegant text-xs tracking-[0.15em] uppercase border-b border-[#1A1A1A] pb-1 transition-colors duration-300"
          >
            Ver Más
          </Link>
        </div>

        <div className="relative">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="!pb-4"
          >
            {products && products.length > 0 ? (
              products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div>No hay productos cargados aún.</div>
              </SwiperSlide>
            )}
          </Swiper>
          
          {/* Flechas de navegación abajo a la derecha */}
          <div className="flex justify-end gap-2 mt-6">
            <button 
              onClick={() => swiperRef?.slidePrev()}
              className="w-10 h-10 border border-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => swiperRef?.slideNext()}
              className="w-10 h-10 border border-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Beneficios - Minimalist */}
      <section className="bg-[#F8F8F8] border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <Truck className="w-8 h-8 mx-auto mb-3 text-[#1A1A1A]" />
            <h4 className="font-sans-elegant text-sm uppercase tracking-wider text-[#1A1A1A] mb-2">
              Envíos y Retiros Flash
            </h4>
            <p className="text-xs text-[#6B6B6B] font-sans-elegant">
              Gratis en compras superiores a $50.000
            </p>
          </div>

          <div className="text-center p-6">
            <Package className="w-8 h-8 mx-auto mb-3 text-[#1A1A1A]" />
            <h4 className="font-sans-elegant text-sm uppercase tracking-wider text-[#1A1A1A] mb-2">
              Confección Nacional
            </h4>
            <p className="text-xs text-[#6B6B6B] font-sans-elegant">
              Prendas de calidad premium
            </p>
          </div>

          <div className="text-center p-6">
            <Shirt className="w-8 h-8 mx-auto mb-3 text-[#1A1A1A]" />
            <h4 className="font-sans-elegant text-sm uppercase tracking-wider text-[#1A1A1A] mb-2">
              Talles para Todas
            </h4>
            <p className="text-xs text-[#6B6B6B] font-sans-elegant">
              XS a XL disponibles
            </p>
          </div>
        </div>
      </section>
      <InstagramButton url={"https://www.instagram.com/pascalecloset/"} />
    </div>
  );
};
