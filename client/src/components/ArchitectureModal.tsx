import React, { useState } from 'react';
import { 
  X, 
  Database, 
  AlertTriangle 
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'corrections' | 'diagram' | 'api' | 'nosql'>('corrections');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Auditoría Técnica y Modelo de Datos CCE
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Universidad de Córdoba • Licenciatura en Informática y Medios Audiovisuales
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/50 dark:bg-slate-900/50 text-xs shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('corrections')}
            className={`py-3 px-4 font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'corrections'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Criterios y Correcciones Aplicadas
          </button>
          <button
            onClick={() => setActiveTab('diagram')}
            className={`py-3 px-4 font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'diagram'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Modelo Relacional Normalizado
          </button>
          <button
            onClick={() => setActiveTab('nosql')}
            className={`py-3 px-4 font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'nosql'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Colecciones NoSQL (Pág. 37)
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`py-3 px-4 font-semibold border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'api'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Arquitectura Backend Nest.js (Pág. 39)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs sm:text-sm">
          {/* TAB 1: CORRECCIONES */}
          {activeTab === 'corrections' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                <p className="font-bold text-sm mb-1">
                  Evaluación y Soluciones a las Inconsistencias de la Propuesta Original
                </p>
                A partir de la revisión exhaustiva de las páginas 29 a 37 del documento de diseño, se detectaron 4 redundancias y cuellos de botella técnicos resueltos en esta implementación:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Inconsistencia 1: Redundancia de Usuarios</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">
                    El documento creaba 3 tablas distintas con los mismos campos: <code>usuarios</code>, <code>perfil_creacion</code> y <code>socios</code>.
                  </p>
                  <div className="p-2.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs">
                    <strong>Solución implementada:</strong> Se normalizó en una única entidad <code>User</code> con atributo <code>role: 'admin' | 'docente' | 'alumno' | 'invitado'</code> y control de acceso RBAC.
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Inconsistencia 2: Historial de Versiones (CU-2)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">
                    El CU-2 requería explícitamente "revertir a versiones anteriores", pero la tabla solo guardaba un string plano <code>historial varchar</code>.
                  </p>
                  <div className="p-2.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs">
                    <strong>Solución implementada:</strong> Se creó la entidad <code>content_versions</code> con número de versión, autor, fecha y capacidad de restauración en 1 clic.
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Inconsistencia 3: Almacenamiento Multimedia</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">
                    Archivos binarios pesados (como videos MP4 de 12 MB) no deben guardarse directamente en tablas SQL/NoSQL para no degradar la latencia.
                  </p>
                  <div className="p-2.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs">
                    <strong>Solución implementada:</strong> Se desacopló el archivo: en BD residen solo metadatos y URLs de CDN/almacenamiento de objetos, optimizando el tiempo de respuesta.
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Inconsistencia 4: Límite de Caracteres (CU-6)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">
                    El flujo alternativo de comentarios especificaba que el usuario no puede exceder los caracteres permitidos pero no fijaba la validación exacta.
                  </p>
                  <div className="p-2.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs">
                    <strong>Solución implementada:</strong> Contador visual reactivo en tiempo real con bloqueo y validación estricta de 250 caracteres máximos.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEMA SQL NORMALIZADO */}
          {activeTab === 'diagram' && (
            <div className="space-y-3 font-mono text-xs">
              <p className="font-sans text-xs text-slate-600 dark:text-slate-400 mb-2">
                Estructura normalizada en 3FN (Tercera Forma Normal) que reemplaza las redundancias de la página 31:
              </p>
              <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
                <pre>{`-- 1. TABLA UNIFICADA DE USUARIOS (RBAC)
CREATE TABLE usuarios (
  id VARCHAR(64) PRIMARY KEY,
  nickname VARCHAR(50) NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  contraseña_hash VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'docente', 'alumno', 'invitado') NOT NULL,
  foto_url VARCHAR(255),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA DE CONTENIDOS EDUCATIVOS (CCE)
CREATE TABLE contenido (
  id VARCHAR(64) PRIMARY KEY,
  tipo ENUM('presentacion', 'video', 'documento', 'imagen') NOT NULL,
  formato VARCHAR(10) NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  peso_mb DECIMAL(6,2) NOT NULL,
  archivo_url VARCHAR(255) NOT NULL,
  miniatura_url VARCHAR(255) NOT NULL,
  es_privado BOOLEAN DEFAULT FALSE,
  id_autor VARCHAR(64) REFERENCES usuarios(id) ON DELETE CASCADE,
  id_equipo VARCHAR(64) REFERENCES equipo(id) ON DELETE SET NULL,
  vistas_count INT DEFAULT 0,
  descargas_count INT DEFAULT 0,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. HISTORIAL DE VERSIONES (CU-2 FL. ALT. 1)
CREATE TABLE versiones_contenido (
  id VARCHAR(64) PRIMARY KEY,
  id_contenido VARCHAR(64) REFERENCES contenido(id) ON DELETE CASCADE,
  numero_version INT NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  archivo_url VARCHAR(255) NOT NULL,
  modificado_por VARCHAR(100) NOT NULL,
  notas_cambio TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. COMENTARIOS Y RETROALIMENTACIÓN (CU-6)
CREATE TABLE comentarios (
  id VARCHAR(64) PRIMARY KEY,
  id_contenido VARCHAR(64) REFERENCES contenido(id) ON DELETE CASCADE,
  id_usuario VARCHAR(64) REFERENCES usuarios(id) ON DELETE CASCADE,
  comentario VARCHAR(250) NOT NULL, -- Límite de 250 caracteres estricto
  moderado BOOLEAN DEFAULT TRUE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. EQUIPOS COLABORATIVOS Y ASOCIACIONES
CREATE TABLE equipo (
  id VARCHAR(64) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  nombre_corto VARCHAR(20) NOT NULL,
  detalle TEXT,
  id_propietario VARCHAR(64) REFERENCES usuarios(id)
);`}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: NoSQL */}
          {activeTab === 'nosql' && (
            <div className="space-y-3 font-mono text-xs">
              <p className="font-sans text-xs text-slate-600 dark:text-slate-400 mb-2">
                Definición de colecciones NoSQL (MongoDB / Document Store) basada en la pág. 37 del documento:
              </p>
              <div className="bg-slate-950 text-amber-400 p-4 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
                <pre>{`// Colección: Users
{
  "_id": ObjectId("66e8f1a..."),
  "nickname": "AlexanderTR",
  "name": "Alexander E. Toscano Ricarddo",
  "role": "docente", // "admin" | "docente" | "alumno" | "invitado"
  "email": "alexander.toscano@unicordoba.edu.co",
  "picture": "https://images.unsplash.com/..."
}

// Colección: Content (CCE con subdocumentos embebidos de versiones y diapositivas)
{
  "_id": ObjectId("66e8f2b..."),
  "type": "video", // "presentacion" | "video" | "documento" | "imagen"
  "format": "mp4",
  "title": "El mouse: Funciones y Ergonomía",
  "description": "Funciones del mouse y ergonomía en el aula de informática",
  "size": "12 mb",
  "edition_type": "video",
  "is_private": false,
  "file_url": "https://storage.unicordoba.edu.co/cce/mouse.mp4",
  "versions": [
    {
      "version_number": 1,
      "title": "El mouse",
      "modified_at": ISODate("2026-03-10T10:30:00Z"),
      "change_notes": "Carga inicial"
    }
  ]
}

// Colección: Comments (Con validación de longitud <= 250)
{
  "_id": ObjectId("66e8f3c..."),
  "content_id": ObjectId("66e8f2b..."),
  "user_id": ObjectId("66e8f1a..."),
  "comment": "Excelente explicación sobre los microinterruptores...",
  "date_creation": ISODate("2026-03-11T14:10:00Z")
}`}</pre>
              </div>
            </div>
          )}

          {/* TAB 4: API REST NEST.JS */}
          {activeTab === 'api' && (
            <div className="space-y-3 text-xs">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Endpoints RESTful que implementan el patrón Controller-Service de Nest.js según la sección 8 (pág. 39):
              </p>

              <div className="space-y-2 font-mono">
                {[
                  { method: 'GET', path: '/api/contents', desc: 'Listar contenidos con filtros por formato, tipo y búsqueda' },
                  { method: 'POST', path: '/api/contents', desc: 'CU-1: Crear nuevo contenido educativo (Docente/Admin)' },
                  { method: 'GET', path: '/api/contents/:id', desc: 'CU-5: Obtener detalle y visualización del contenido' },
                  { method: 'PUT', path: '/api/contents/:id', desc: 'CU-2: Actualizar contenido y registrar nueva versión' },
                  { method: 'POST', path: '/api/contents/:id/revert', desc: 'CU-2: Revertir a una versión anterior específica' },
                  { method: 'DELETE', path: '/api/contents/:id', desc: 'CU-3: Eliminar contenido tras confirmación' },
                  { method: 'POST', path: '/api/contents/:id/share', desc: 'CU-4: Registrar evento de compartir contenido' },
                  { method: 'GET', path: '/api/contents/:id/export', desc: 'CU-7: Exportar y descargar archivo en disco local' },
                  { method: 'GET', path: '/api/contents/:id/comments', desc: 'CU-6: Listar comentarios del contenido' },
                  { method: 'POST', path: '/api/contents/:id/comments', desc: 'CU-6: Agregar comentario validando máx. 250 caracteres' },
                  { method: 'DELETE', path: '/api/comments/:id', desc: 'CU-6: Eliminar comentario (Autor, Docente o Admin)' },
                  { method: 'GET', path: '/api/teams', desc: 'Listar equipos y grupos de investigación colaborativos' },
                ].map((ep, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ep.method === 'GET'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : ep.method === 'POST'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : ep.method === 'PUT'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="text-slate-800 dark:text-slate-200">{ep.path}</span>
                    </div>
                    <span className="font-sans text-slate-500 dark:text-slate-400 text-[11px]">
                      {ep.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-900 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            Cerrar Auditoría
          </button>
        </div>
      </div>
    </div>
  );
};
