import { ProductCard } from "../../components/common/ProductCard";
import { useProducts } from "../../contexts/ProductContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/common/Loader";

const normalize = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

const prettyTitle = (slug) =>
  slug ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Toda la colección";

export const AllProducts = () => {
  const { products, loading, error } = useProducts();
  const { categorySlug } = useParams();
  const navigate = useNavigate()
  const activeSlug = categorySlug || null;

  if (loading) return <Loader />

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
        <div className="bg-white border border-[#E0D6CC] p-12 text-center max-w-md">
          <div className="text-5xl mb-6">✕</div>
          <h2 className="text-2xl font-serif-display text-[#2C2420] mb-4">Error</h2>
          <p className="text-[#7A6B5A] font-sans-elegant mb-6">{error}</p>
          <Link to="/" className="inline-block px-8 py-3 bg-[#8B7355] text-white font-sans-elegant text-sm tracking-wide hover:bg-[#6B5A45] transition-all duration-300">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!products) navigate("/")

  // Filtrado usando la columna `category` del productos
  const filtered = activeSlug
    ? products?.filter((p) => {
        if (!p || p.category == null) return false;
        return normalize(p.category) === normalize(activeSlug);
      })
    : products;

  const categories = [
    { slug: "vestidos", name: "Vestidos", icon: "👗" },
    { slug: "enteritos", name: "Enteritos", icon: "👚" },
    { slug: "pantalones", name: "Pantalones", icon: "👖" },
    { slug: "accesorios", name: "Accesorios", icon: "💍" },
    { slug: "otros", name: "Más", icon: "✨" },
  ];
  
  const activeCategory = categories.find(
    (cat) => normalize(cat.slug) === normalize(categorySlug)
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8 font-sans-elegant">
          <Link to="/" className="text-[#8B7355] hover:underline">Inicio</Link>
          <span className="mx-3 text-[#C9B8A8]">/</span>
          <Link to="/products" className="text-[#8B7355] hover:underline">Colección</Link>
          {activeSlug && (
            <>
              <span className="mx-3 text-[#C9B8A8]">/</span>
              <span className="text-[#7A6B5A]">{prettyTitle(activeSlug)}</span>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categorías */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-[#E0D6CC] p-6 sticky top-4">
              <h2 className="text-xl font-serif-display text-[#2C2420] mb-6 pb-4 border-b border-[#E0D6CC]">Categorías</h2>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/products"
                    className={`flex items-center gap-3 p-3 hover:bg-[#F5F0EB] transition-all duration-200 font-sans-elegant text-sm ${
                      !activeSlug ? "bg-[#F5F0EB] border-l-2 border-[#8B7355] text-[#8B7355]" : "text-[#5C4D3C]"
                    }`}
                  >
                    <span className="text-lg">🏠</span>
                    <span>Toda la colección</span>
                    <span className="ml-auto text-xs text-[#A69580]">({products.length})</span>
                  </Link>
                </li>
                {categories.map((cat) => {
                  const count = (products ?? []).filter((p) => p?.category && normalize(p.category) === cat.slug).length;
                  return (
                    <li key={cat.slug}>
                      <Link
                        to={`/products/category/${cat.slug}`}
                        className={`flex items-center gap-3 p-3 hover:bg-[#F5F0EB] transition-all duration-200 font-sans-elegant text-sm ${
                          normalize(activeSlug) === cat.slug
                            ? "bg-[#F5F0EB] border-l-2 border-[#8B7355] text-[#8B7355]"
                            : "text-[#5C4D3C]"
                        }`}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span>{cat.name}</span>
                        <span className="ml-auto text-xs text-[#A69580]">({count})</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main Content - Productos */}
          <main className="lg:col-span-3">
            <div className="mb-10">
              <p className="text-xs font-sans-elegant tracking-[0.3em] uppercase text-[#8B7355] mb-2">
                Explora
              </p>
              <h1 className="text-3xl md:text-4xl font-serif-display font-light text-[#2C2420] mb-3">
                {activeCategory
                  ? `${activeCategory.name}`
                  : "Toda la Colección"}
              </h1>
              <p className="text-[#7A6B5A] font-sans-elegant">
                {filtered.length} {filtered.length === 1 ? "pieza encontrada" : "piezas encontradas"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white border border-[#E0D6CC] p-16 text-center">
                <div className="text-5xl mb-6 text-[#C9B8A8]">👗</div>
                <h2 className="text-2xl font-serif-display text-[#2C2420] mb-4">
                  No hay piezas en esta categoría
                </h2>
                <p className="text-[#7A6B5A] font-sans-elegant mb-8">
                  Explora otras categorías o descubre toda nuestra colección
                </p>
                <Link to="/products">
                  <button className="px-10 py-4 bg-[#8B7355] text-white font-sans-elegant text-sm tracking-[0.2em] uppercase hover:bg-[#6B5A45] transition-all duration-300">
                    Ver toda la colección
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
