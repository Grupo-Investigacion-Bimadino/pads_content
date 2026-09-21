import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { ContentItem } from '../types';

interface DeleteConfirmModalProps {
  content: ContentItem | null;
  onClose: () => void;
  onConfirmDelete: (contentId: string) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  content,
  onClose,
  onConfirmDelete,
}) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
        <div className="flex items-center space-x-3 text-rose-600 dark:text-rose-400">
          <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Confirmar Eliminación (CU-3)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Caso de uso No. 3: Eliminar contenido
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          ¿Estás seguro de que deseas eliminar permanentemente el contenido{' '}
          <strong className="text-slate-900 dark:text-white">"{content.title}"</strong>?
          Esta acción removerá el archivo, sus versiones históricas y todos los comentarios asociados.
        </p>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between border border-slate-200 dark:border-slate-700">
          <span>Formato: <strong className="uppercase">{content.format}</strong></span>
          <span>Tamaño: <strong>{content.size}</strong></span>
          <span>Autor: <strong>{content.authorName}</strong></span>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            Cancelar (No)
          </button>
          <button
            onClick={() => onConfirmDelete(content.id)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm cursor-pointer transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Confirmar Eliminación (Sí)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
