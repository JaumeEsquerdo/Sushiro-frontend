# 🥢 Sushiro — Frontend (Vite + React)
Interfaz para Sushiro: selección de mesa, menú por categorías, detalle en modal y carrito; zona admin para login y subida de imágenes.

Demo: https://sushiro-frontend.vercel.app/

API: https://sushiro-backend.vercel.app/

Repo: https://github.com/JaumeEsquerdo/Sushiro-frontend

## 📖 Descripción
El flujo de cliente no usa login. El usuario selecciona su mesa y la app genera un sesionId único. Ambos se guardan en localStorage y se usan para asociar el pedido e historial.

Pantallas cliente:

`/` → Selector de mesa

`/menu` → Menú (detalle de producto en modal, carrito, total)

Zona admin:

/login, /register → acceso admin

/formImage → subir/gestionar imágenes

## 🧱 Tech stack
React (Vite) · React Router · Framer Motion · CSS (metodología SUIT CSS)

## 🔄 Flujo de cliente (sin login)
En el selector de mesa:

```js
const handleSeleccion = (idMesa) => {
  const sesionId = crypto.randomUUID();
  localStorage.setItem('mesaId', idMesa);
  localStorage.setItem('sesionId', sesionId);
  navigate('/menu');
};

```
A partir de ahí:

El front envía mesaId + sesionId en las compras.

El back expone /compras/sesion/:sesionId para consultar el historial de esa visita.

## Variables de entorno

En el archivo .env.sample se encuentran la estructura de variables de entorno. También puedes encontrar en env.development para ponerlo en local.

## 🧰 Scripts

```js
npm install
npm run dev       // local (Vite)
```

## Autor

- Jaume Esquerdo · [LinkedIn](https://www.linkedin.com/in/jaume-esquerdo/) · [GitHub](https://github.com/JaumeEsquerdo)

## mejoras a futuro
Hacer un form directo para subir img con el producto. actualmente subo la img, y despues manualmente relleno todos los datos del producto con la img codificada con una fecha que viene del backend.

