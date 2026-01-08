export const Loader = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[#E5E5E5] border-t-[#1A1A1A] rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-[#6B6B6B] font-sans-elegant tracking-wider uppercase text-xs">Cargando...</p>
      </div>
    </div>
  );
};
