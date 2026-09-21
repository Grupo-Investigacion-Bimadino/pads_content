import React from 'react';
import { X, Users, BookOpen, Mail } from 'lucide-react';
import { TeamItem } from '../types';

interface TeamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: TeamItem[];
}

export const TeamsModal: React.FC<TeamsModalProps> = ({ isOpen, onClose, teams }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Equipos Colaborativos (Entidad "Team" / "Equipo")
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Grupos de trabajo académico y semilleros de investigación
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative notice */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
          En el modelado relacional (pág. 31 del documento), la tabla <code className="text-emerald-600 font-mono">equipo</code> y su tabla asociativa <code className="text-emerald-600 font-mono">equipo_contenido</code> organizan colecciones de recursos compartidos entre docentes y estudiantes.
        </div>

        {/* Teams List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {teams.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-500/50 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                    {t.shortName}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {t.membersCount} integrantes
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                    {t.contentsCount} recursos
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t.detail}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Coordinador: <strong>{t.owner}</strong></span>
                <span className="flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  {t.ownerEmail}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
