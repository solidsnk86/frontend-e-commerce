import React, { createContext, useState, useContext, useEffect } from "react";
import { showDialog } from "../components/common/Dialog";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductProvider");
  }
  const {
    products,
    sellerProducts,
    loading,
    error,
    fetchProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    getProductByUserId,
    deleteProduct,
  } = context;
  return {
    products,
    sellerProducts,
    loading,
    error,
    fetchProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    getProductByUserId,
    deleteProduct,
  };
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth()

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/list-products`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }

      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const getProductByUserId = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/products`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      // Si el backend retorna un array, se usa directamente
      setSellerProducts(Array.isArray(result) ? result : result.products || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (user) getProductByUserId()
  }, [user]);

  const getProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  const createNewProduct = async (newProduct) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      formData.append("condition", newProduct.condition);
      formData.append("description", newProduct.description);
      formData.append("brand", newProduct.brand);
      formData.append("temp", newProduct.temp);
      formData.append("size", newProduct.size);
      formData.append("color", newProduct.color);
      formData.append("category", newProduct.category);
      formData.append("user_id", newProduct.user_id);
      formData.append("image", newProduct.image);

      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/product`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      // Agregar el nuevo producto al array existente
      setProducts((prevProducts) => [
        ...prevProducts,
        result.product || result,
      ]);

      showDialog({ content: <div>Producto {formData.name} creado exitosamente!</div> });
    } catch (error) {
      setError(error.message);
      showDialog({ content: <div>Error: {error.message}</div> });
      console.error("Error al crear producto:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId, updatedProduct) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/product/${productId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedProduct),
        }
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      // Actualizar el producto en el array
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, ...updatedProduct } : product
        )
      );

      showDialog({ content: <div>{result.message}</div> });
    } catch (error) {
      setError(error.message);
      showDialog({ content: <div>Error: {error.message}</div> });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/product/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      // Eliminar el producto del array
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );

      showDialog({ content: <div>{result.message}</div> });
    } catch (error) {
      setError(error.message);
      showDialog({ content: <div>Error: {error.message}</div> });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    sellerProducts,
    loading,
    error,
    fetchProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProductByUserId,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
