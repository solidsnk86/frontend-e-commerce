import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useProducts } from '../../contexts/ProductContext';

const ProductManagement = () => {
  const { deleteProduct, sellerProducts: products = [], getProductByUserId } = useProducts()
  const [filter, setFilter] = useState('');

  const handleDelete = async (productId) => {
    await deleteProduct(productId)
    await getProductByUserId()
  };
  
  const filteredProducts = products?.filter(product => {
    if (filter === 'all') return true;
    if (filter === 'active') return product.status === 'Activo';
    if (filter === 'inactive') return product.status === 'Inactivo';
    if (filter === 'out-of-stock') return product.stock === 0;
    return true;
  });
  
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A]">
              Gestión de Productos
            </h1>
            <p className="text-sm text-[#6B6B6B] font-sans-elegant mt-1">
              Administra tu inventario
            </p>
          </div>
          <Link to="/seller/products/new">
            <button className="px-5 py-2.5 bg-[#1A1A1A] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-200 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Producto
            </button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#E5E5E5] p-4 mb-5">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs font-sans-elegant tracking-wide uppercase transition-all duration-200 ${
                filter === 'all' || filter === ''
                  ? 'bg-[#1A1A1A] text-white'
                  : 'border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
              }`}
            >
              Todos ({products?.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 text-xs font-sans-elegant tracking-wide uppercase transition-all duration-200 ${
                filter === 'active'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
              }`}
            >
              Activos ({products?.filter(p => p.status === 'Activo').length})
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 text-xs font-sans-elegant tracking-wide uppercase transition-all duration-200 ${
                filter === 'inactive'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
              }`}
            >
              Inactivos ({products?.filter(p => p.status === 'Inactivo').length})
            </button>
            <button
              onClick={() => setFilter('out-of-stock')}
              className={`px-4 py-2 text-xs font-sans-elegant tracking-wide uppercase transition-all duration-200 ${
                filter === 'out-of-stock'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
              }`}
            >
              Sin Stock ({products?.filter(p => p.stock === 0).length})
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-[#E5E5E5]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1A1A1A]">
                <tr>
                  <th className="text-left p-4 text-xs font-sans-elegant font-medium text-white/90 uppercase tracking-wider">Producto</th>
                  <th className="text-left p-4 text-xs font-sans-elegant font-medium text-white/90 uppercase tracking-wider">Categoría</th>
                  <th className="text-left p-4 text-xs font-sans-elegant font-medium text-white/90 uppercase tracking-wider">Precio</th>
                  <th className="text-left p-4 text-xs font-sans-elegant font-medium text-white/90 uppercase tracking-wider">Stock</th>
                  <th className="text-left p-4 text-xs font-sans-elegant font-medium text-white/90 uppercase tracking-wider">Estado</th>
                  <th className="text-left p-4 text-xs font-sans-elegant font-medium text-white/90 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts?.map((product) => (
                  <tr key={product.id} className="border-b border-[#E5E5E5] hover:bg-[#F8F8F8] transition-colors duration-150">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#F8F8F8] border border-[#E5E5E5] flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-5 h-5 text-[#E8C4C4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-sans-elegant font-medium text-sm text-[#1A1A1A]">{product.name}</p>
                          <p className="text-[10px] text-[#6B6B6B] font-sans-elegant">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-sans-elegant text-[#6B6B6B] capitalize">{product.category}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-sans-elegant font-medium text-[#1A1A1A]">${product.price}</span>
                    </td>
                    <td className="p-4">
                      <span className={`font-sans-elegant font-medium ${
                        product.stock === 0 ? 'text-[#1A1A1A]' : 
                        product.stock < 10 ? 'text-[#6B6B6B]' : 'text-[#1A1A1A]'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-[10px] font-sans-elegant font-medium tracking-wide ${
                        product.status === 'Activo' ? 'bg-[#F8F8F8] text-[#1A1A1A] border border-[#1A1A1A]' :
                        product.status === 'Sin Stock' ? 'bg-[#F8F8F8] text-[#6B6B6B] border border-[#E5E5E5]' :
                        'bg-[#F8F8F8] text-[#6B6B6B] border border-[#E5E5E5]'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link to={`/seller/products/edit/${product.id}`}>
                          <button className="px-3 py-1.5 text-[11px] font-sans-elegant tracking-wide uppercase border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200">
                            Editar
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1.5 text-[11px] font-sans-elegant tracking-wide uppercase border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts?.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                <svg className="w-8 h-8 text-[#E8C4C4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-[#6B6B6B] font-sans-elegant">No se encontraron productos con este filtro</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;

