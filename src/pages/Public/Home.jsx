import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/common/ProductCard";
import Button from "../../components/common/Button";
import { useProducts } from "../../contexts/ProductContext";
import { Loader } from "../../components/common/Loader";

export const Home = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  const featuredProducts = products.slice(0, 8);

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

  const categories = [
    {
      slug: "vestidos",
      name: "Vestidos",
      icon: "👗",
      link: "/products/category/vestidos",
    },
    {
      slug: "enteritos",
      name: "Enteritos",
      icon: "👚",
      link: "/products/category/blusas",
    },
    {
      slug: "pantalones",
      name: "Pantalones",
      icon: "👖",
      link: "/products/category/pantalones",
    },
    {
      slug: "accesorios",
      name: "Accesorios",
      icon: "💍",
      link: "/products/category/accesorios",
    },
    {
      slug: "otros",
      name: "Más",
      icon: "✨",
      link: "/products/category/otros",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section - Elegant */}
      <section className="relative bg-gradient-to-b from-[#F5F0EB] to-[#FAF8F5] border-b border-[#E0D6CC]">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          <p className="text-[#8B7355] font-sans-elegant text-sm tracking-[0.3em] uppercase mb-4">
            Nueva Colección
          </p>
          <h2 className="text-4xl md:text-6xl font-serif-display font-light text-[#2C2420] mb-4 tracking-wide">
            Pascale Closet
          </h2>
          <div className="w-16 h-[1px] bg-[#C9B8A8] mb-6"></div>
          <p className="text-lg md:text-xl text-[#7A6B5A] font-sans-elegant font-light mb-10 max-w-2xl leading-relaxed">
            Elegancia atemporal para mujeres que valoran el estilo y la sofisticación
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={() => navigate("/products")}
              className="px-10 py-4 bg-[#8B7355] text-white font-sans-elegant text-sm tracking-[0.2em] uppercase hover:bg-[#6B5A45] transition-all duration-300"
            >
              Explorar Colección
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-4 border border-[#8B7355] text-[#8B7355] font-sans-elegant text-sm tracking-[0.2em] uppercase hover:bg-[#8B7355] hover:text-white transition-all duration-300"
            >
              Vender
            </button>
          </div>
        </div>
      </section>

      {/* Categorías - Elegant Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-[#8B7355] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-3">
            Explora
          </p>
          <h3 className="text-3xl md:text-4xl font-serif-display font-light text-[#2C2420]">
            Categorías
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="group bg-white p-8 text-center border border-[#E0D6CC] hover:border-[#C9B8A8] hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <p className="font-sans-elegant text-sm tracking-[0.15em] uppercase text-[#5C4D3C]">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados - Elegant */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[#8B7355] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-3">
              Selección Curada
            </p>
            <h3 className="text-3xl md:text-4xl font-serif-display font-light text-[#2C2420]">
              Destacados
            </h3>
          </div>
          <Link
            to="/products"
            className="text-[#8B7355] hover:text-[#6B5A45] font-sans-elegant text-sm tracking-[0.1em] uppercase border-b border-[#8B7355] pb-1 transition-colors duration-300"
          >
            Ver Todo
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {featuredProducts ? (
            featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
          ): (
            <div>No hay productos cargados aún.</div>
          )}
        </div>
      </section>

      {/* Beneficios - Elegant */}
      <section className="bg-[#F5F0EB] border-t border-[#E0D6CC]">
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8">
            <div className="text-3xl mb-4">🚚</div>
            <h4 className="font-serif-display text-xl text-[#2C2420] mb-2">
              Envío Elegante
            </h4>
            <p className="text-sm text-[#7A6B5A] font-sans-elegant font-light">
              Gratis en compras superiores a $45.000
            </p>
          </div>

          <div className="text-center p-8">
            <div className="text-3xl mb-4">✨</div>
            <h4 className="font-serif-display text-xl text-[#2C2420] mb-2">
              Calidad Premium
            </h4>
            <p className="text-sm text-[#7A6B5A] font-sans-elegant font-light">
              Prendas seleccionadas cuidadosamente
            </p>
          </div>

          <div className="text-center p-8">
            <div className="text-3xl mb-4">💝</div>
            <h4 className="font-serif-display text-xl text-[#2C2420] mb-2">
              Atención Personalizada
            </h4>
            <p className="text-sm text-[#7A6B5A] font-sans-elegant font-light">
              Asesoramiento de estilo incluido
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
