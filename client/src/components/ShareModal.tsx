import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Mail, 
  Facebook, 
  Code2, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { ContentItem } from '../types';

interface ShareModalProps {
  content: ContentItem | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ content, onClose }) => {
  if (!content) return null;

  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const shareUrl = `${window.location.origin}?contentId=${content.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    triggerSuccessNotification('Enlace copiado al portapapeles con éxito');
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerSuccessNotification = (destination: string) => {
    setNotification(destination);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Hola, te comparto este contenido educativo de la Universidad de Córdoba: "${content.title}" - ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    triggerSuccessNotification('Contenido compartido con éxito por WhatsApp');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`Recurso Educativo: ${content.title}`);
    const body = encodeURIComponent(`Te comparto el recurso educativo "${content.title}" elaborado por ${content.authorName}.\n\nDescripción: ${content.description}\n\nPuedes acceder aquí: ${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    triggerSuccessNotification('Aplicación de correo abierta con éxito');
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    triggerSuccessNotification('Contenido compartido con éxito en Facebook');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Compartir Contenidos (CU-4)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Difusión pedagógica y colaboración interinstitucional
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

        {/* Content Preview Mini Card */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-3 text-xs">
          <img
            src={content.thumbnailUrl}
            alt={content.title}
            className="w-14 h-14 rounded-lg object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span className="uppercase text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {content.type} • {content.format}
              </span>
              {content.isPrivate && (
                <span className="inline-flex items-center text-[10px] text-amber-600">
                  <Lock className="w-3 h-3 mr-0.5" /> Solo inscritos
                </span>
              )}
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white truncate mt-1">
              {content.title}
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate">
              {content.authorName}
            </p>
          </div>
        </div>

        {/* Success Notification Banner */}
        {notification && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Direct Link Copy */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Enlace Directo para Estudiantes y Docentes:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 p-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 select-all"
            />
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Sharing Channels Options */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Canales de Distribución:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center space-x-2 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-100/70 text-emerald-800 dark:text-emerald-300 text-xs font-medium cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleShareEmail}
              className="flex items-center space-x-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 text-xs font-medium cursor-pointer transition-colors"
            >
              <Mail className="w-4 h-4 text-rose-500" />
              <span>Correo Institucional</span>
            </button>

            <button
              onClick={handleShareFacebook}
              className="flex items-center space-x-2 p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-100/70 text-blue-800 dark:text-blue-300 text-xs font-medium cursor-pointer transition-colors"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Embed code snippet */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center">
            <Code2 className="w-3 h-3 mr-1" /> Código para insertar en LMS (Moodle / Blackboard):
          </label>
          <input
            type="text"
            readOnly
            value={`<iframe src="${shareUrl}" width="100%" height="600" frameborder="0"></iframe>`}
            className="w-full p-2 text-[11px] font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 select-all"
          />
        </div>

        <div className="flex justify-end pt-2">
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
