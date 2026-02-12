# 🏟️ Mi App de Deportes

<div align="center">

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Una plataforma moderna para la gestión de espacios deportivos**

[Demo] · [Reportar Bug](issues) · [Solicitar Feature](issues)

</div>

---

## 📝 Descripción

Bienvenido a **Mi App de Deportes**, una aplicación web de última generación diseñada para gestionar y visualizar lugares deportivos de manera eficiente y atractiva. Utilizando **Next.js 15** y **React 19**, esta plataforma ofrece una experiencia de usuario fluida, enriquecida con animaciones de **Framer Motion** y un diseño moderno gracias a **Tailwind CSS**.

---

## ✨ Características Principales

*   🚀 **Performance Optimizado**: Construido sobre Next.js 15 para una carga rápida y SEO amigable.
*   🎨 **Diseño Moderno y Responsivo**: Interfaz construida con Tailwind CSS v4 que se adapta a cualquier dispositivo.
*   ✨ **Animaciones Fluidas**: Experiencia interactiva mejorada con Framer Motion.
*   🖼️ **Carruseles Interactivos**: Visualización de imágenes dinámica con React Slick.
*   🗄️ **Base de Datos Robusta**: Integración completa con MongoDB para el manejo seguro de datos.
*   🔒 **Tipado Estático**: Código robusto y mantenible gracias a TypeScript.

---

## 🛠️ Stack Tecnológico

<details>
  <summary><b>Frontend</b></summary>
  <ul>
    <li><a href="https://nextjs.org/">Next.js 15</a> - Framework de React.</li>
    <li><a href="https://react.dev/">React 19</a> - Biblioteca para interfaces de usuario.</li>
    <li><a href="https://tailwindcss.com/">Tailwind CSS</a> - Framework de utilidades CSS.</li>
    <li><a href="https://www.framer.com/motion/">Framer Motion</a> - Librería de animaciones.</li>
    <li><a href="https://react-slick.neostack.com/">React Slick</a> - Carrusel de imágenes.</li>
    <li><a href="https://react-icons.github.io/react-icons/">React Icons</a> - Paquete de iconos.</li>
  </ul>
</details>

<details>
  <summary><b>Backend & Datos</b></summary>
  <ul>
    <li><a href="https://nextjs.org/docs/api-routes/introduction">Next.js API Routes</a> - Endpoints del servidor.</li>
    <li><a href="https://www.mongodb.com/">MongoDB</a> - Base de datos NoSQL (base: <code>sportbnb</code>).</li>
    <li><a href="https://www.npmjs.com/package/migrate-mongo">migrate-mongo</a> - Versionado de esquema/datos (similar a Alembic).</li>
    <li><code>users</code> collection: usuarios (roles user/admin/super_admin; campo <code>isSuperAdmin</code>).</li>
  </ul>
</details>

---

## 📂 Estructura del Proyecto

```bash
mi-app-deportes/
├── 📁 lib/                 # 📚 Lógica reutilizable y conexión a DB
│   └── mongodb.ts          # Integración con MongoDB
├── 📁 public/              # 🖼️ Archivos estáticos (imágenes, iconos)
├── 📁 src/                 # 💻 Código fuente principal
├── 📄 .env.local           # 🔐 Variables de entorno (No incluido en repo)
├── 📄 next.config.ts       # ⚙️ Configuración de Next.js
├── 📄 package.json         # 📦 Definición de dependencias y scripts
├── 📄 tsconfig.json        # 📘 Configuración de TypeScript
└── 📄 README.md            # 📖 Documentación del proyecto
```

---

## 🚀 Comenzando

Sigue estos pasos para obtener una copia local del proyecto y ponerlo en marcha.

### Prerrequisitos

*   Node.js (v18 o superior)
*   npm, yarn, pnpm o bun
*   Una instancia de MongoDB (local o Atlas)

### Instalación

1.  **Clona el repositorio**
    ```bash
    git clone https://github.com/tu-usuario/mi-app-deportes.git
    cd mi-app-deportes
    ```

2.  **Instala las dependencias**
    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

3.  **Configura las Variables de Entorno**
    Crea un archivo `.env.local` en la raíz del proyecto y añade tu URI de conexión a MongoDB (seedlist sin SRV):
    ```env
    MONGODB_URI="mongodb://<usuario>:<password>@host1:27017,host2:27017,host3:27017/sportbnb?ssl=true&replicaSet=<replicaSet>&authSource=admin&retryWrites=true&w=majority"
    ```
    - La base de datos usada es `sportbnb`.
    - Si el usuario de Atlas está en otra base, cambia `authSource` a esa base.
    - Asegura que tu IP está permitida en la Access List de Atlas.

4.  **Ejecuta el servidor de desarrollo**
    ```bash
    npm run dev
    ```

5.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

---

## 🗂️ Migraciones (migrate-mongo)
- Estado de migraciones: `npx migrate-mongo status`
- Aplicar pendientes: `npx migrate-mongo up`
- Revertir la última: `npx migrate-mongo down`
- Crear nueva: `npx migrate-mongo create nombre-descriptivo`
- Ubicación de archivos: carpeta `migrations/` (formato CommonJS). La base objetivo es `sportbnb` según `MONGODB_URI`.
- Control de historial: colecciones `changelog` y `changelog_lock` en `sportbnb` (no borrar).
- Migraciones incluidas:
  - `20260212020937-initial-seed.js`: datos de prueba de venues.
  - `20260212090000-create-users.js`: crea colección `users`, índice único en `email` y usuario inicial `admin@local.test` con `role: super_admin` e `isSuperAdmin: true`.

---

## 📸 Capturas de Pantalla

*(Espacio reservado para screenshots de la aplicación)*

| Landing Page | Detalle de Lugar |
|:---:|:---:|
| ![Landing Placeholder](https://placehold.co/600x400?text=Landing+Page) | ![Detail Placeholder](https://placehold.co/600x400?text=Detalle+Lugar) |

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas!

1.  Haz un Fork del proyecto.
2.  Crea tu rama de feature (`git checkout -b feature/AmazingFeature`).
3.  Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

---

<div align="center">
  Hecho con ❤️ por <a href="https://github.com/tu-usuario">Parzival</a>
</div>

