# Componente de Contenido Educativo (CCE) — PADS

Plataforma web modular para la gestión, estructuración, visualización interactiva y distribución de recursos educativos multiformato (presentaciones, videos, guías didácticas e infografías), desarrollada para las asignaturas de Diseño y Desarrollo de Software I, II y III en la **Universidad de Córdoba**.

---

## Contexto Académico y Equipo

El **Componente de Contenido Educativo (CCE)** forma parte del proyecto de investigación y desarrollo de software educativo del programa de **Licenciatura en Informática y Medios Audiovisuales (LIMA)** de la Universidad de Córdoba.

- **Docente Titular y Coordinador:** Alexander Enrique Toscano Ricarddo
- **Equipo de Desarrollo e Implementación (Contribuidores):**
  - **Oscar Madera Bolaño** ([@oscarbol09](https://github.com/oscarbol09))
  - **Dayana Cogollo Barba** ([@DayanaCB](https://github.com/DayanaCB))
  - **Katherine López Sierra** ([@KatherineLopez20](https://github.com/KatherineLopez20))
  - **Eliana Romero Cuitiva** ([@Romero2002](https://github.com/Romero2002))
- **Grupo de Investigación:** Bimadino (Universidad de Córdoba)
- **Antecedentes Conceptuales:** J. Almanza, F. Galeano, J. Manjarrez, D. Luna, J. Valdelamar (Propuesta inicial de diseño).

---

## Principios Pedagógicos y de Diseño

El sistema está concebido bajo tres principios rectores:

1. **Organización Jerarquizada Accesible (OJA):** Clasificación sistemática de contenidos por áreas temáticas, tipos de medio y niveles curriculares, permitiendo una navegación intuitiva y accesible.
2. **Adaptabilidad en Contenido Educativo (ACE):** Flexibilidad para adaptarse a los ritmos de aprendizaje del alumno y a las necesidades didácticas del docente.
3. **Navegación Multiformato (NMF):** Soporte nativo para presentaciones diapositiva a diapositiva, reproducción de video HD, lectura de documentos PDF y esquemas visuales de alta resolución.

---

## Casos de Uso Implementados (CU-1 al CU-7)

El sistema satisface integralmente los 7 casos de uso y requerimientos de interfaz detallados en la propuesta de diseño:

- **CU-1 — Crear y Subir Contenido:** Carga de materiales con validación estricta de formatos permitidos (`.pptx`, `.mp4`, `.pdf`, `.png`, `.jpg`, `.webp`), asignación de metadatos pedagógicos, peso estimado y visibilidad.
- **CU-2 — Modificar Contenido y Control de Versiones:** Edición de metadatos con registro automático de versión histórica y capacidad de **restauración/reversión en 1 clic** a cualquier versión previa (Flujo Alternativo 1).
- **CU-3 — Eliminar Contenido:** Flujo con diálogo modal de confirmación antes de la eliminación permanente del recurso y sus comentarios asociados.
- **CU-4 — Compartir Contenido:** Generación de enlaces directos, difusión vía WhatsApp, correo institucional, Facebook y generación de código `<iframe>` para incrustar en LMS (Moodle, Blackboard).
- **CU-5 — Visualizar Contenido y Modo Nocturno:** Visor especializado multiformato con soporte para cambio de tema claro/oscuro para estudio prolongado.
- **CU-6 — Comentar y Retroalimentación:** Sistema de diálogo pedagógico con contador reactivo y validación estricta de **250 caracteres máximos** por comentario (Flujo Alternativo 1).
- **CU-7 — Exportar Contenido:** Descarga del material educativo al almacenamiento local del usuario en múltiples formatos (`.original`, `.json`, `.md`), con actualización del contador de descargas.
- **Requisitos de Interfaz (Pág. 5):** 
  - Carrusel interactivo para recursos destacados con auto-reproducción pausible al pasar el cursor.
  - Menú visual desplegable con imágenes interactivas que expanden una ficha técnica detallada.

---

## Arquitectura del Sistema

```
pads_content/
├── client/                     # Frontend SPA (React 19 + TypeScript + Tailwind CSS v4 + Vite)
│   ├── src/
│   │   ├── components/         # Componentes UI (Navbar, HeroCarousel, Visores, Modales)
│   │   ├── data/               # Semilla de datos de cátedra (seedData.ts)
│   │   ├── services/           # Persistencia local estructurada y lógica de negocio (storage.ts)
│   │   ├── types.ts            # Definiciones de tipos e interfaces TypeScript
│   │   └── App.tsx             # Orquestador del dashboard educativo
│   ├── package.json
│   └── vite.config.ts
├── src/                        # Backend REST API (NestJS 10 + TypeScript + MongoDB/Mongoose)
│   ├── content/                # Módulo de contenidos educativos (CRUD, versiones, búsqueda)
│   ├── coment/                 # Módulo de comentarios y moderación
│   ├── format/                 # Módulo de formatos admitidos
│   ├── team/                   # Módulo de equipos de trabajo y semilleros
│   ├── partners/               # Módulo de socios y colaboradores
│   ├── profile_creation/       # Módulo de perfiles de usuario
│   ├── app.module.ts           # Módulo principal y configuración de ServeStatic
│   └── main.ts                 # Bootstrap de la aplicación NestJS
├── documents/                  # Especificación formal y propuesta de diseño de software (PDF/DOCX)
├── package.json                # Scripts raíz para orquestación de backend y cliente
└── README.md
```

### Correcciones Técnicas al Modelo de Datos Original

Durante la auditoría técnica de la propuesta original (páginas 29-37) se solventaron 4 inconsistencias arquitectónicas:

1. **Unificación de Entidades de Usuario:** Se eliminó la triplicidad de tablas (`usuarios`, `perfil_creacion`, `socios`) unificándolas en una única entidad `User` con control de acceso basado en roles (RBAC: `admin`, `docente`, `alumno`, `invitado`).
2. **Historial de Versiones Real:** Se sustituyó el campo de texto plano `historial varchar` por una entidad estructurada `ContentVersion`, permitiendo auditar cambios y revertir versiones.
3. **Desacoplamiento de Binarios Multimedia:** Los archivos pesados se referencian mediante URLs de almacenamiento en lugar de almacenarse directamente en colecciones NoSQL/tablas relacionales, evitando cuellos de botella de E/S.
4. **Validación de Longitud en Comentarios:** Se integró la restricción estricta de 250 caracteres en el servicio de comentarios y en la interfaz de usuario.

---

## Requisitos Previos

- **Node.js:** Versión 18 o superior (recomendado Node 20 LTS o 22 LTS).
- **Gestor de paquetes:** `npm`, `yarn` o `pnpm`.
- **MongoDB:** Instancia local o remota (MongoDB Atlas) para el backend NestJS (opcional para el modo cliente interactivo).

---

## Instalación y Puesta en Marcha

### 1. Clonar el repositorio
```bash
git clone https://github.com/Grupo-Investigacion-Bimadino/pads_content.git
cd pads_content
```

### 2. Ejecución del Frontend (Cliente Web)
```bash
# Instalar dependencias del cliente
npm run client:install

# Iniciar en modo desarrollo (Vite)
npm run client:dev
```
La aplicación estará accesible en `http://localhost:3000`.

### 3. Ejecución del Backend (NestJS)
```bash
# Instalar dependencias del backend
npm install

# Configurar variables de entorno (.env)
# DB_URI=mongodb://localhost:27017/pads_content

# Iniciar backend en modo desarrollo
npm run start:dev
```

### 4. Compilación para Producción
```bash
# Compilar frontend y backend simultáneamente
npm run build:all
```

---

## Roles de Usuario y Pruebas (RBAC)

Para validar los flujos de autorización y casos de uso, el conmutador de perfiles en la barra superior permite alternar entre:

| Rol | Usuario de Prueba | Permisos Principales |
| :--- | :--- | :--- |
| **Docente** | Alexander E. Toscano Ricarddo | Crear (CU-1), editar con versiones (CU-2), eliminar (CU-3), compartir (CU-4), visualizar (CU-5), comentar (CU-6), exportar (CU-7). |
| **Administrador** | Administrador CCE | Control total del sistema, moderación y administración de semilleros. |
| **Alumno** | José Daniel Almanza Ávila | Visualizar (CU-5), comentar recursos (CU-6), compartir (CU-4), exportar (CU-7). |
| **Invitado** | Visitante Externo | Solo lectura de contenidos públicos. |

---

## Limitaciones Conocidas y Decisiones de Diseño

- **Almacenamiento Offline/Fallback:** Cuando no hay una base de datos MongoDB conectada, el cliente opera de forma autónoma utilizando `LocalStorage` con la semilla oficial de datos pedagógicos de la cátedra.
- **Transferencia Multimedia:** La reproducción de video y audio utiliza streaming progresivo HTML5 compatible con codecs H.264/AAC.

---

## Licencia

Este proyecto se distribuye bajo la licencia **MIT** para fines académicos y de investigación en la Universidad de Córdoba.
