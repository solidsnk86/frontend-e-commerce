import React from 'react';
import { useNavigation, Link } from 'react-router-dom';
//pagina para indicar que la pagina está en construccion 

export function ComingSoonPage() {
    const navigate = useNavigation()
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white border border-[#E5E5E5] p-8 md:p-16 text-center">
            {/* Icono */}
            <div className="text-8xl mb-6">🚧</div>

            {/* Título */}
            <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A] mb-4">
            Página en Construcción
            </h1>

            {/* Descripción */}
            <p className="text-sm text-[#6B6B6B] font-sans-elegant mb-8">
            Esta sección está siendo preparada. Pronto tendremos más contenido disponible.
            </p>

            {/* Botón Volver*/}
            <Link to="/">
              <button
              className="px-8 py-3 bg-[#1A1A1A] text-white font-sans-elegant text-xs uppercase tracking-wider hover:bg-[#333333] transition"
              >
              ← Volver al Inicio
              </button>
            </Link>
        </div>
        </div>
    );
}

export default ComingSoonPage;