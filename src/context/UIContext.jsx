import { createContext, useContext, useState, useEffect } from "react";

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [compras, setCompras] = useState([]);

  const API_COMPRAS = import.meta.env.VITE_COMPRAS;
  const API_SESION = import.meta.env.VITE_SESION;
  const API_URL = import.meta.env.VITE_API_URL;
  const API_ROUTER = import.meta.env.VITE_API_ROUTER;
  const API_PRODUCTOS = import.meta.env.VITE_PRODUCTOS;

  const backendURL = "https://sushiro-backend.vercel.app"; // o http://localhost:3000

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const fetchHistorial = async () => {
    try {
      const sesionId = localStorage.getItem("sesionId");
      const res = await fetch(
        `${API_URL}${API_ROUTER}${API_COMPRAS}${API_SESION}/${sesionId}`
      );
      const data = await res.json();
      if (data.status === "ok") setCompras(data.data);
    } catch (err) {
      console.error("Error al obtener historial:", err);
    }
  };

  /* obtener todos los productos */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}${API_ROUTER}${API_PRODUCTOS}`);
        const responseAPI = await response.json();

        const productos = responseAPI.data;

        //preload de imágenes para q carguen al terminar el spinner cuando llegue el fetch de productos
        await Promise.all(
          productos.map((prod) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = `${backendURL}/uploads/${prod.img}`;
              img.onload = () => resolve(img);
              img.onerror = () => resolve(null);
            });
          })
        );

        setProducts(responseAPI.data);

        // console.log("productos", responseAPI.data);
      } catch (e) {
        console.error("error al obtener productos", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const selectProduct = (product) => setProductoSeleccionado(product);
  const clearSelectedProduct = () => setProductoSeleccionado(null);
  return (
    <UIContext.Provider
      value={{
        fetchHistorial,
        compras,
        setCompras,
        products,
        setProducts,
        loading,
        setLoading,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        selectProduct,
        clearSelectedProduct,
        productoSeleccionado,
        setProductoSeleccionado,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
