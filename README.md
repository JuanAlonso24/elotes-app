# 🌽 ElotesApp

Sistema de gestión de ventas, inventario, gastos y reportes para negocio de Elotes y Snacks.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat&logo=node.js)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express)
![Railway](https://img.shields.io/badge/Backend-Railway-0B0D0E?style=flat&logo=railway)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat&logo=vercel)

---

## 📋 Características

- 📦 **Inventario de productos** — CRUD completo con control de stock automático
- 💰 **Registro de ventas** — descuento de stock al registrar cada venta
- 💸 **Control de gastos** — categorización de egresos
- 📊 **Dashboard con reportes** — ganancias netas, ventas por día y gráficas
- 📅 **Filtros por fecha** — reportes personalizados con accesos rápidos
- ⚠️ **Alertas de stock bajo** — notificaciones automáticas en el dashboard
- 🔐 **Autenticación JWT** — login seguro con tokens
- 📱 **Diseño responsive** — funciona en móvil y desktop

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + Vite + React Router + Recharts |
| Backend | Node.js + Express |
| Base de datos | MongoDB Atlas (Mongoose) |
| Autenticación | JWT + bcryptjs |
| Deploy Backend | Railway |
| Deploy Frontend | Vercel |

---

## 📁 Estructura del proyecto

```
elotes-app/
├── backend/
│   ├── server.js
│   ├── .env
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── models/
│       │   ├── Producto.js
│       │   ├── Ventas.js
│       │   ├── Gastos.js
│       │   └── Usuario.js
│       ├── controllers/
│       │   ├── productosController.js
│       │   ├── ventasController.js
│       │   ├── gastosController.js
│       │   ├── reportesController.js
│       │   └── authController.js
│       ├── routes/
│       │   ├── productos.js
│       │   ├── ventas.js
│       │   ├── gastos.js
│       │   ├── reportes.js
│       │   └── auth.js
│       └── middleware/
│           └── auth.js
└── frontend/
    ├── vercel.json
    └── src/
        ├── api/
        │   └── axios.js
        ├── context/
        │   ├── ctx.jsx
        │   ├── provider.jsx
        │   └── hook.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Dashboard.jsx
        │   ├── Productos.jsx
        │   ├── Ventas.jsx
        │   └── Gastos.jsx
        └── components/
            └── Navbar.jsx
```

---

## 🚀 Instalación local

### Requisitos previos

- Node.js 18+
- Cuenta en [MongoDB Atlas](https://mongodb.com/cloud/atlas)

### 1. Clona el repositorio

```bash
git clone https://github.com/JuanAlonso24/elotes-app.git
cd elotes-app
```

### 2. Configura el backend

```bash
cd backend
npm install
```

Crea el archivo `.env` en la carpeta `backend/`:

```env
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/elotesdb
PORT=3000
JWT_SECRET=tu_secreto_aqui
```

Inicia el servidor:

```bash
npx nodemon server.js
```

### 3. Configura el frontend

```bash
cd ../frontend
npm install
```

Crea el archivo `.env` en la carpeta `frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
```

Inicia el frontend:

```bash
npm run dev
```

Abre el navegador en `http://localhost:5173`

---

## 🔌 API Endpoints

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/registro` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/perfil` | Obtener perfil (protegida) |

### Productos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Listar productos |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |

### Ventas
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/ventas` | Listar ventas |
| POST | `/api/ventas` | Registrar venta |
| DELETE | `/api/ventas/:id` | Eliminar venta |

### Gastos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/gastos` | Listar gastos |
| POST | `/api/gastos` | Registrar gasto |
| DELETE | `/api/gastos/:id` | Eliminar gasto |

### Reportes
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/reportes/resumen` | Resumen de ganancias |
| GET | `/api/reportes/ventas-por-dia` | Ventas agrupadas por día |
| GET | `/api/reportes/stock-bajo` | Productos con stock bajo |

> Todas las rutas excepto `/api/auth/registro` y `/api/auth/login` requieren token JWT en el header `Authorization: Bearer TOKEN`

---

## 🌐 Deploy

### Backend — Railway

1. Conecta tu repositorio en [Railway](https://railway.app)
2. Configura **Root Directory**: `backend`
3. Configura **Start Command**: `node server.js`
4. Agrega las variables de entorno:
   ```
   MONGO_URI=tu_connection_string
   JWT_SECRET=tu_secreto
   PORT=3000
   ```

### Frontend — Vercel

1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Configura **Root Directory**: `frontend`
3. Configura **Framework**: Vite
4. Agrega la variable de entorno:
   ```
   VITE_API_URL=https://tu-backend.up.railway.app/api
   ```

---

## 📸 Módulos del sistema

- **Dashboard** — Tarjetas de resumen, gráfica de ventas por día, alertas de stock bajo y filtros por fecha
- **Productos** — Formulario de alta, tabla de inventario con colores de alerta en stock bajo
- **Ventas** — Selector de producto con stock disponible, historial de ventas
- **Gastos** — Registro por categoría (insumos, transporte, servicios), total acumulado

---

## 👤 Autor

Desarrollado por Juan Alonso
juanalonso966@gmail.com

---

## 📄 Licencia

MIT
