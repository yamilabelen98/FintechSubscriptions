# 🌸 Fintech Subscriptions Platform – Node.js + Next.js

Plataforma full stack de suscripciones estilo fintech desarrollada como práctica profesional. Implementa un backend RESTful con Node.js + Express + MongoDB y un frontend con Next.js, siguiendo una arquitectura modular escalable. El proyecto incluye autenticación con JWT, integración simulada con Stripe, notificaciones por email y una UI estilizada con Tailwind CSS.

---

## ✨ Tecnologías utilizadas

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer
- **Frontend**: React 19 con Next.js (Pages Router), Tailwind CSS 4.1
- **DevOps**: Docker (Dockerfiles para frontend y backend)
- **Simulaciones**: Integración conceptual con Stripe (checkout y lógica de suscripciones)

---

## 🎯 Funcionalidades principales

### ✅ Usuarios

- Registro de usuario con validación y almacenamiento seguro (bcrypt)
- Inicio de sesión y generación de token JWT
- Perfil con datos personales y estado de suscripción

### 📦 Planes de Suscripción

- Visualización de planes disponibles (desde backend dinámico con MongoDB)
- Suscripción a plan (simulada o integrable con Stripe Checkout)
- Cancelación de suscripción desde el perfil
- Visualización de estado actual de la suscripción

### 📩 Emails

- Envío automático de email de bienvenida tras suscripción (Nodemailer + Gmail/Mailtrap)

### 🧑‍🎨 Interfaz de usuario

- TailwindCSS personalizado en tonos rosa pastel y estilo cute/romántico
- Experiencia mobile-friendly
- Mensajes de éxito y error visuales (sin `alert`, con transiciones suaves y centrado)

---

## 🛠️ Cómo ejecutar el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/fintech-subscriptions.git
cd fintech-subscriptions
```

### 2. Instalar dependencias

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Variables de entorno

Crear los archivos `.env` y `.env.local` en `backend/` y `frontend/` respectivamente:

#### backend/.env

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/fintechsubs
JWT_SECRET=supersecreto
STRIPE_SECRET_KEY=sk_test_simulado
GMAIL_USER=tuemail@gmail.com
GMAIL_PASS=tucontraseña
```

#### frontend/.env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Ejecutar ambos servidores

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm run dev

Abrir [http://localhost:3000](http://localhost:3000)

```

## 🚢 Inicialización con Docker

Podés ejecutar todo el proyecto fácilmente usando Docker y Docker Compose, sin necesidad de instalar Node.js o MongoDB localmente.

### 1. Requisitos

- Docker
- Docker Compose

### 2. Archivos
#### backend/contenido del .env

#### frontend/
NEXT_PUBLIC_API_URL=http://localhost:3001
BACKEND_API_URL=http://backend:3001

> ⚠️ `NEXT_PUBLIC_API_URL` se usa en el navegador, `BACKEND_API_URL` se usa en SSR desde el servidor de Next.js dentro del contenedor.

### 3. Ejecutar con Docker Compose

docker-compose up --build

Esto levantará:

- `mongodb` en el puerto `27017`
- `backend` en el puerto `3001`
- `frontend` (Next.js) en el puerto `3000`

Accedé a la app desde: http://localhost:3000

---

## 🚀 Mejoras posibles (para producción)

- Reemplazar simulación de Stripe por integración real con [Stripe Checkout Sessions](https://stripe.com/docs/checkout)
- Usar cookies HttpOnly para mayor seguridad del token JWT
- Implementar panel de administración para gestión de usuarios/planes
- Agregar protección SSR a páginas privadas
- Despliegue con Docker Compose + Vercel/Render

---

## 🧪 Pruebas realizadas

- Registro/Login: flujo completo con validación y persistencia
- Simulación de suscripción: actualiza DB y visualización en perfil
- Cancelación de suscripción: actualización inmediata de estado
- Manejo de errores y mensajes de éxito visuales
- Comunicación entre frontend y backend mediante `fetch` autenticado

---

## 📂 Estructura del proyecto

```
fintech-subscriptions/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── frontend/src
│   ├── pages/
│   ├── styles/
│   ├── context/
│   └── tailwind.config.js
└── docker-compose.yml (opcional)
```

---

## 💼 Autor

Desarrollado por Yamila De Olivera, desarrolladora full stack con foco en proyectos fintech.  
[LinkedIn](https://www.linkedin.com/in/yamila-de-olivera/) • [GitHub](https://github.com/yamilabelen98) • Argentina 🇦🇷

---

## 📝 Licencia

MIT License
