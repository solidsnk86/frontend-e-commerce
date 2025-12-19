import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const About = () => {
  const location = useLocation();
  
  // Scroll to hash on mount or hash change
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.hash]);
  
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#F5F0EB] to-[#FAF8F5] border-b border-[#E0D6CC] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#8B7355] font-sans-elegant text-sm tracking-[0.3em] uppercase mb-4">
            Nuestra Historia
          </p>
          <h1 className="text-4xl md:text-5xl font-serif-display font-light text-[#2C2420] mb-6">
            Pascale Closet
          </h1>
          <div className="w-16 h-[1px] bg-[#C9B8A8] mx-auto mb-6"></div>
          <p className="text-lg text-[#7A6B5A] font-sans-elegant font-light max-w-2xl mx-auto">
            Elegancia atemporal para mujeres que valoran el estilo y la sofisticación
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-6 text-sm font-sans-elegant">
        <Link to="/" className="text-[#8B7355] hover:underline">Inicio</Link>
        <span className="mx-3 text-[#C9B8A8]">/</span>
        <span className="text-[#7A6B5A]">Nosotros</span>
      </nav>

      {/* Quiénes Somos */}
      <section id="quienes-somos" className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white border border-[#E0D6CC] p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#8B7355] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-4">
                Sobre Nosotras
              </p>
              <h2 className="text-3xl font-serif-display font-light text-[#2C2420] mb-6">
                Quiénes Somos
              </h2>
              <p className="text-[#5C4D3C] font-sans-elegant leading-relaxed mb-4">
                <strong className="text-[#2C2420]">Pascale Closet</strong> nació de la pasión por la moda 
                y el deseo de crear un espacio donde cada mujer pueda encontrar piezas únicas que 
                reflejen su personalidad y estilo.
              </p>
              <p className="text-[#5C4D3C] font-sans-elegant leading-relaxed mb-4">
                Somos más que una tienda de ropa. Somos curadoras de estilo, buscando 
                cuidadosamente cada prenda para ofrecerte una selección que combine 
                elegancia, calidad y tendencias actuales.
              </p>
              <p className="text-[#5C4D3C] font-sans-elegant leading-relaxed">
                Creemos que la moda es una forma de expresión personal, y nuestro objetivo 
                es ayudarte a encontrar prendas que te hagan sentir segura y hermosa 
                en cada momento.
              </p>
            </div>
            <div className="bg-[#F5F0EB] border border-[#E0D6CC] p-10 text-center">
              <div className="text-4xl mb-6">✨</div>
              <h3 className="text-2xl font-serif-display text-[#2C2420] mb-4">Nuestra Misión</h3>
              <p className="text-[#5C4D3C] font-sans-elegant leading-relaxed">
                Conectar a mujeres con prendas que las hagan sentir únicas, 
                ofreciendo una experiencia de compra personalizada y 
                una selección curada de moda con estilo atemporal.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-[#E0D6CC]">
            <div className="text-center">
              <p className="text-4xl font-serif-display text-[#8B7355] mb-2">500+</p>
              <p className="text-sm text-[#7A6B5A] font-sans-elegant tracking-wide">Prendas exclusivas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-serif-display text-[#8B7355] mb-2">2K+</p>
              <p className="text-sm text-[#7A6B5A] font-sans-elegant tracking-wide">Clientas felices</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-serif-display text-[#8B7355] mb-2">50+</p>
              <p className="text-sm text-[#7A6B5A] font-sans-elegant tracking-wide">Vendedoras activas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-serif-display text-[#8B7355] mb-2">100%</p>
              <p className="text-sm text-[#7A6B5A] font-sans-elegant tracking-wide">Satisfacción</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-[#8B7355] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-3">
            Lo Que Nos Define
          </p>
          <h2 className="text-3xl font-serif-display font-light text-[#2C2420]">
            Nuestros Valores
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-[#E0D6CC] p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-6">💎</div>
            <h3 className="text-xl font-serif-display text-[#2C2420] mb-4">Calidad</h3>
            <p className="text-[#5C4D3C] font-sans-elegant leading-relaxed">
              Seleccionamos cada prenda cuidadosamente, garantizando materiales y confección de primera.
            </p>
          </div>
          <div className="bg-white border border-[#E0D6CC] p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-6">🤍</div>
            <h3 className="text-xl font-serif-display text-[#2C2420] mb-4">Confianza</h3>
            <p className="text-[#5C4D3C] font-sans-elegant leading-relaxed">
              Transparencia y honestidad en cada transacción. Tu satisfacción es nuestra prioridad.
            </p>
          </div>
          <div className="bg-white border border-[#E0D6CC] p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-6">✨</div>
            <h3 className="text-xl font-serif-display text-[#2C2420] mb-4">Elegancia</h3>
            <p className="text-[#5C4D3C] font-sans-elegant leading-relaxed">
              Creemos en la belleza atemporal y el estilo que trasciende las tendencias pasajeras.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[#8B7355] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#E8DED0] font-sans-elegant text-sm tracking-[0.3em] uppercase mb-4">
            Tu Estilo Te Espera
          </p>
          <h2 className="text-3xl md:text-4xl font-serif-display font-light text-white mb-6">
            ¿Lista para descubrir tu próxima pieza favorita?
          </h2>
          <p className="text-lg text-[#E8DED0] font-sans-elegant font-light mb-10 max-w-xl mx-auto">
            Explora nuestra colección curada y encuentra prendas que reflejen tu esencia
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products">
              <button className="px-10 py-4 bg-white text-[#8B7355] font-sans-elegant text-sm tracking-[0.2em] uppercase hover:bg-[#FAF8F5] transition-all duration-300">
                Explorar Colección
              </button>
            </Link>
            <Link to="/register">
              <button className="px-10 py-4 border border-white text-white font-sans-elegant text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-[#8B7355] transition-all duration-300">
                Crear Cuenta
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;