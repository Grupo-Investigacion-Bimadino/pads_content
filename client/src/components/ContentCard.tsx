import React from 'react';
import { 
  Play, 
  FileText, 
  Presentation, 
  Image as ImageIcon, 
  Share2, 
  Edit3, 
  Trash2, 
  Download, 
  ExternalLink, 
  Lock, 
  MessageSquare, 
  Clock, 
  User, 
  History 
} from 'lucide-react';
import { ContentItem, UserRole } from '../types';

interface ContentCardProps {
  content: ContentItem;
  userRole: UserRole;
  commentsCount: number;
  onSelect: (content: ContentItem) => void;
  onEdit: (content: ContentItem) => void;
  onDelete: (content: ContentItem) => void;
  onShare: (content: ContentItem) => void;
  onExport: (content: ContentItem) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  content,
  userRole,
  commentsCount,
  onSelect,
  onEdit,
  onDelete,
  onShare,
  onExport,
}) => {
  const canEdit = userRole === 'admin' || userRole === 'docente';
  const canDelete = userRole === 'admin' || userRole === 'docente';
  const canExport = userRole === 'admin' || userRole === 'docente' || userRole === 'alumno';

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'presentacion':
        return <Presentation className="w-4 h-4 text-amber-500" />;
      case 'video':
        return <Play className="w-4 h-4 text-rose-500" />;
      case 'documento':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'imagen':
      default:
        return <ImageIcon className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/70 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group">
      {/* Thumbnail with overlay tags */}
      <div 
        onClick={() => onSelect(content)}
        className="relative h-44 w-full overflow-hidden bg-slate-900 cursor-pointer"
      >
        <img
          src={content.thumbnailUrl}
          alt={content.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 shadow-xs backdrop-blur-xs">
            {getTypeIcon(content.type)}
            <span>{content.type}</span>
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-900/80 text-emerald-300 backdrop-blur-xs border border-white/10">
            {content.format}
          </span>
        </div>

        {content.isPrivate && (
          <div className="absolute top-2.5 right-2.5">
            <span className="p-1 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center text-xs shadow-xs" title="Contenido privado">
              <Lock className="w-3.5 h-3.5" />
            </span>
          </div>
        )}

        {/* Hover Action Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/30 backdrop-blur-[2px]">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold shadow-md">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Visualizar (CU-5)</span>
          </span>
        </div>

        {/* Bottom stats inside thumbnail */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1 opacity-80" />
            {content.size}
          </span>
          <span className="flex items-center space-x-2">
            <span className="flex items-center">
              <MessageSquare className="w-3 h-3 mr-1 text-amber-300" />
              {commentsCount}
            </span>
            <span className="flex items-center">
              <History className="w-3 h-3 mr-1 text-emerald-300" />
              v{content.versions?.length || 1}
            </span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <User className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
            <span className="truncate">{content.authorName}</span>
          </div>

          <h3 
            onClick={() => onSelect(content)}
            className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug line-clamp-2 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors mb-2"
          >
            {content.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {content.description}
          </p>
        </div>

        {/* Action Controls Toolbar based on user permissions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-1 text-xs">
          {/* Main Visualizer trigger */}
          <button
            onClick={() => onSelect(content)}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-semibold cursor-pointer transition-colors"
            title="Abrir y explorar contenido"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver</span>
          </button>

          <div className="flex items-center space-x-1">
            {/* Share CU-4 */}
            <button
              onClick={() => onShare(content)}
              className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Compartir contenido (CU-4)"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Export CU-7 */}
            {canExport && (
              <button
                onClick={() => onExport(content)}
                className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                title="Descargar/Exportar archivo (CU-7)"
              >
                <Download className="w-4 h-4" />
              </button>
            )}

            {/* Edit CU-2 */}
            {canEdit && (
              <button
                onClick={() => onEdit(content)}
                className="p-1.5 rounded-md hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-600 dark:text-amber-400 transition-colors cursor-pointer"
                title="Editar contenido y versiones (CU-2)"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            {/* Delete CU-3 */}
            {canDelete && (
              <button
                onClick={() => onDelete(content)}
                className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                title="Eliminar contenido (CU-3)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
