import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../../contexts/OrderContext';
import { formatDate } from '../../utils/formatDate';
import { ArrowLeft, Package, CreditCard, Calendar, Hash, Clock, CheckCircle, AlertCircle, Truck } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const { orders } = useOrder();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const foundOrder = orders.find((o) => o.id === id);
      setOrder(foundOrder);
      setLoading(false);
    }
  }, [orders, id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-[#F0FFF0] border-[#1A1A1A] text-[#1A1A1A]';
      case 'pending':
        return 'bg-[#FFF9E6] border-[#1A1A1A] text-[#1A1A1A]';
      case 'cancelled':
      case 'Cancelado':
        return 'bg-[#FFF0F0] border-[#1A1A1A] text-[#1A1A1A]';
      case 'En Tránsito':
        return 'bg-[#F8F8F8] border-[#1A1A1A] text-[#1A1A1A]';
      default:
        return 'bg-[#F8F8F8] border-[#E5E5E5] text-[#6B6B6B]';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="mr-2" />;
      case 'pending':
        return <Clock size={16} className="mr-2" />;
      case 'cancelled':
      case 'Cancelado':
        return <AlertCircle size={16} className="mr-2" />;
      case 'En Tránsito':
        return <Truck size={16} className="mr-2" />;
      default:
        return <Package size={16} className="mr-2" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'Pago Aprobado';
      case 'pending':
        return 'Pendiente de Pago';
      case 'cancelled':
      case 'Cancelado':
        return 'Cancelado';
      case 'En Tránsito':
        return 'En Tránsito';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B6B6B] font-sans-elegant text-sm">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-[#E5E5E5] p-16 text-center">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A] mb-4">
              Orden no encontrada
            </h2>
            <p className="text-sm text-[#6B6B6B] font-sans-elegant mb-8">
              No pudimos encontrar la orden que buscas.
            </p>
            <Link to="/buyer/orders">
              <button className="px-8 py-4 bg-[#1A1A1A] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333333] transition-all duration-300">
                Volver a mis pedidos
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          to="/buyer/orders" 
          className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] font-sans-elegant text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Volver a mis pedidos</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A] mb-2">
            Detalle del Pedido
          </h1>
          <p className="text-[#6B6B6B] font-sans-elegant text-sm">
            Orden #{order.order_number}
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-white border border-[#E5E5E5] mb-6">
          <div className="bg-[#F8F8F8] border-b border-[#E5E5E5] p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h2 className="font-sans-elegant text-sm uppercase tracking-wider text-[#1A1A1A]">
                Información del Pedido
              </h2>
              <div className={`px-4 py-2 border text-xs font-sans-elegant uppercase tracking-wide flex items-center ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {getStatusLabel(order.status)}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Order Number */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F8F8F8] border border-[#E5E5E5] flex items-center justify-center">
                  <Hash size={18} className="text-[#1A1A1A]" />
                </div>
                <div>
                  <p className="text-[#6B6B6B] font-sans-elegant text-xs uppercase tracking-wide">Número de Orden</p>
                  <p className="text-[#1A1A1A] font-sans-elegant mt-1">{order.order_number}</p>
                </div>
              </div>

              {/* Payment ID */}
              {order.payment_id && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F8F8F8] border border-[#E5E5E5] flex items-center justify-center">
                    <CreditCard size={18} className="text-[#1A1A1A]" />
                  </div>
                  <div>
                    <p className="text-[#6B6B6B] font-sans-elegant text-xs uppercase tracking-wide">ID de Pago</p>
                    <p className="text-[#1A1A1A] font-sans-elegant mt-1 break-all">{order.payment_id}</p>
                  </div>
                </div>
              )}

              {/* Created Date */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F8F8F8] border border-[#E5E5E5] flex items-center justify-center">
                  <Calendar size={18} className="text-[#1A1A1A]" />
                </div>
                <div>
                  <p className="text-[#6B6B6B] font-sans-elegant text-xs uppercase tracking-wide">Fecha de Creación</p>
                  <p className="text-[#1A1A1A] font-sans-elegant mt-1">{formatDate(order.created_at)}</p>
                </div>
              </div>

              {/* Updated Date */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F8F8F8] border border-[#E5E5E5] flex items-center justify-center">
                  <Clock size={18} className="text-[#1A1A1A]" />
                </div>
                <div>
                  <p className="text-[#6B6B6B] font-sans-elegant text-xs uppercase tracking-wide">Última Actualización</p>
                  <p className="text-[#1A1A1A] font-sans-elegant mt-1">{formatDate(order.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        {order.items && order.items.length > 0 && (
          <div className="bg-white border border-[#E5E5E5] mb-6">
            <div className="bg-[#F8F8F8] border-b border-[#E5E5E5] p-6">
              <h2 className="font-sans-elegant text-sm uppercase tracking-wider text-[#1A1A1A]">
                Productos del Pedido
              </h2>
            </div>

            <div className="p-6">
              {order.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center py-4 border-b border-[#E5E5E5] last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#F8F8F8] border border-[#E5E5E5] flex items-center justify-center">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt={item.product_name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package size={24} className="text-[#6B6B6B]" />
                      )}
                    </div>
                    <div>
                      <p className="font-sans-elegant text-sm text-[#1A1A1A] uppercase tracking-wide">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-[#6B6B6B] font-sans-elegant mt-1">
                        Cantidad: {item.quantity}
                      </p>
                      {item.size && (
                        <p className="text-xs text-[#6B6B6B] font-sans-elegant">
                          Talle: {item.size}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="font-sans-elegant text-[#1A1A1A]">
                    ${Number(item.price).toLocaleString('es-CL')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Total */}
        <div className="bg-white border border-[#E5E5E5]">
          <div className="bg-[#F8F8F8] border-b border-[#E5E5E5] p-6">
            <h2 className="font-sans-elegant text-sm uppercase tracking-wider text-[#1A1A1A]">
              Resumen del Pedido
            </h2>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center py-3 border-b border-[#E5E5E5]">
              <span className="text-[#6B6B6B] font-sans-elegant text-sm">Subtotal</span>
              <span className="text-[#1A1A1A] font-sans-elegant">${Number(order.total).toLocaleString('es-CL')}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#E5E5E5]">
              <span className="text-[#6B6B6B] font-sans-elegant text-sm">Envío</span>
              <span className="text-[#1A1A1A] font-sans-elegant">Gratis</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-[#1A1A1A] font-sans-elegant text-sm uppercase tracking-wider font-medium">Total</span>
              <span className="text-[#1A1A1A] font-sans-elegant text-xl">${Number(order.total).toLocaleString('es-CL')}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/buyer/orders">
            <button className="px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-300">
              Volver a Mis Pedidos
            </button>
          </Link>
          <Link to="/">
            <button className="px-6 py-3 bg-[#1A1A1A] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-300">
              Seguir Comprando
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
