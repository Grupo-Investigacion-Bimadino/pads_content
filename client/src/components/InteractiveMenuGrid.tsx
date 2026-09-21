import React, { useState } from 'react';
import { 
  Play, 
  FileText, 
  Presentation, 
  Image as ImageIcon, 
  Calendar, 
  User, 
  Download, 
  Share2, 
  Edit3, 
  Trash2, 
  Lock, 
  Globe, 
  ExternalLink, 
  Layers 
} from 'lucide-react';
import { ContentItem, UserRole } from '../types';

interface InteractiveMenuGridProps {
  contents: ContentItem[];
  userRole: UserRole;
  onSelectContent: (content: ContentItem) => void;
  onEditContent: (content: ContentItem) => void;
  onDeleteContent: (content: ContentItem) => void;
  onShareContent: (content: ContentItem) => void;
  onExportContent: (content: ContentItem) => void;
}

export const InteractiveMenuGrid: React.FC<InteractiveMenuGridProps> = ({
  contents,
  userRole,
  onSelectContent,
  onEditContent,
  onDeleteContent,
  onShareContent,
  onExportContent,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(contents[0]?.id || null);

  const selectedContent = contents.find((c) => c.id === selectedId) || contents[0];

  const canEdit = userRole === 'admin' || userRole === 'docente';
  const canDelete = userRole === 'admin' || userRole === 'docente';
  const canExport = userRole === 'admin' || userRole === 'docente' || userRole === 'alumno';

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'presentacion':
        return {
          icon: <Presentation className="w-3.5 h-3.5" />,
          color: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300',
        };
      case 'video':
        return {
          icon: <Play className="w-3.5 h-3.5" />,
          color: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300',
        };
      case 'documento':
        return {
          icon: <FileText className="w-3.5 h-3.5" />,
          color: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-300',
        };
      case 'imagen':
      default:
        return {
          icon: <ImageIcon className="w-3.5 h-3.5" />,
          color: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
        };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 sm:p-7 shadow-xs mb-8">
      {/* Header section explaining the proposal feature */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-slate-700">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Menú Visual Desplegable e Interactivo
            </h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              Requisito Pág. 5
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Selecciona o pasa el cursor sobre cualquier material visual para desplegar su cuadro de información técnica y pedagógica.
          </p>
        </div>
      </div>

      {/* Row of Interactive Images (Thumbnails Menu) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
        {contents.map((item) => {
          const isSelected = selectedId === item.id;
          const badge = getTypeBadge(item.type);

          return (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              onMouseEnter={() => setSelectedId(item.id)}
              className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 aspect-video sm:aspect-square ${
                isSelected
                  ? 'ring-3 ring-emerald-500 shadow-md scale-102'
                  : 'hover:ring-2 hover:ring-emerald-400/60 opacity-85 hover:opacity-100'
              }`}
            >
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              {/* Type pill */}
              <div className="absolute top-1.5 left-1.5">
                <span className={`p-1 rounded-md border flex items-center justify-center text-[10px] ${badge.color}`}>
                  {badge.icon}
                </span>
              </div>

              {/* Title & Format Tag */}
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-[9px] uppercase font-bold tracking-wider px-1 rounded bg-slate-900/80 text-emerald-300">
                  {item.format}
                </span>
                <p className="text-[11px] font-semibold text-white truncate mt-0.5 drop-shadow-sm">
                  {item.title}
                </p>
              </div>

              {isSelected && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-b-6 border-b-emerald-600" />
              )}
            </div>
          );
        })}
      </div>

      {/* Desplegable Information Box */}
      {selectedContent && (
        <div className="mt-4 p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-emerald-500/30 dark:border-emerald-500/20 transition-all duration-300 animate-fadeIn">
          <div className="flex flex-col lg:flex-row gap-5 items-start justify-between">
            {/* Left description column */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                  {selectedContent.type} • {selectedContent.format.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Peso: <strong className="text-slate-700 dark:text-slate-200">{selectedContent.size}</strong>
                </span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                  <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {selectedContent.authorName}
                </span>
                {selectedContent.isPrivate ? (
                  <span className="inline-flex items-center text-[10px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                    <Lock className="w-3 h-3 mr-1" /> Privado
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    <Globe className="w-3 h-3 mr-1" /> Público
                  </span>
                )}
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {selectedContent.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {selectedContent.description}
              </p>

              {/* Versioning & Meta badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                  <Layers className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                  Versión actual: <strong>v{selectedContent.versions?.length || 1}.0</strong>
                </span>
                <span className="flex items-center bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  Actualizado: {new Date(selectedContent.updatedAt).toLocaleDateString()}
                </span>
                {selectedContent.teamName && (
                  <span className="flex items-center bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                    Equipo: <strong>{selectedContent.teamName}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="flex flex-wrap lg:flex-col gap-2 w-full lg:w-48 shrink-0">
              <button
                onClick={() => onSelectContent(selectedContent)}
                className="flex-1 lg:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                title="Visualizar contenido a pantalla completa (CU-5)"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visualizar (CU-5)</span>
              </button>

              <button
                onClick={() => onShareContent(selectedContent)}
                className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-medium cursor-pointer"
                title="Compartir por enlace, redes o correo (CU-4)"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Compartir (CU-4)</span>
              </button>

              {canExport && (
                <button
                  onClick={() => onExportContent(selectedContent)}
                  className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-medium cursor-pointer"
                  title="Exportar archivo descargable a su ordenador (CU-7)"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Exportar (CU-7)</span>
                </button>
              )}

              {canEdit && (
                <button
                  onClick={() => onEditContent(selectedContent)}
                  className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium cursor-pointer"
                  title="Editar contenido y gestionar historial de versiones (CU-2)"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Editar (CU-2)</span>
                </button>
              )}

              {canDelete && (
                <button
                  onClick={() => onDeleteContent(selectedContent)}
                  className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-medium cursor-pointer"
                  title="Eliminar contenido con confirmación (CU-3)"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar (CU-3)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
