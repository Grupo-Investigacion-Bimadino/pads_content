import React, { useState } from 'react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  FolderDown 
} from 'lucide-react';
import { ContentItem } from '../types';
import { StorageService } from '../services/storage';

interface ExportModalProps {
  content: ContentItem | null;
  onClose: () => void;
  onExportSuccess: (contentId: string) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  content,
  onClose,
  onExportSuccess,
}) => {
  if (!content) return null;

  const [selectedFormat, setSelectedFormat] = useState<string>(content.format);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const availableFormats = [
    { id: content.format, label: `Formato Original (.${content.format.toUpperCase()})`, size: content.size },
    { id: 'json', label: 'Paquete de Datos Estructurado (.JSON)', size: '25 KB' },
    { id: 'md', label: 'Guía de Estudio y Notas (.MD)', size: '18 KB' },
  ];

  const handleStartDownload = () => {
    setDownloadProgress(15);

    const timer1 = setTimeout(() => setDownloadProgress(65), 300);
    const timer2 = setTimeout(() => {
      setDownloadProgress(100);

      // Trigger actual browser download
      let fileData = '';
      let mimeType = 'text/plain';
      let extension = selectedFormat;

      if (selectedFormat === 'json') {
        fileData = JSON.stringify(content, null, 2);
        mimeType = 'application/json';
      } else if (selectedFormat === 'md') {
        fileData = `# ${content.title}\n\n**Tipo:** ${content.type}\n**Formato:** ${content.format}\n**Autor:** ${content.authorName}\n**Universidad de Córdoba** - Licenciatura en Informática y Medios Audiovisuales\n\n## Descripción\n${content.description}\n\n## Diapositivas / Estructura\n${
          content.slides?.map((s, i) => `### Diapositiva ${i + 1}: ${s.title}\n${s.content}\n${s.bulletPoints?.map(b => `- ${b}`).join('\n') || ''}`).join('\n\n') || 'Contenido audiovisual o interactivo.'
        }\n\n*Descargado desde el Componente de Contenido Educativo (CCE)*`;
        mimeType = 'text/markdown';
      } else {
        fileData = `<html><head><title>${content.title}</title><style>body{font-family:sans-serif;padding:30px;line-height:1.6;color:#1e293b;max-width:800px;margin:auto;}h1{color:#065f46;}</style></head><body><h1>${content.title}</h1><p><strong>Autor:</strong> ${content.authorName} | <strong>Formato:</strong> ${content.format.toUpperCase()} | <strong>Peso:</strong> ${content.size}</p><hr/><p>${content.description}</p><h3>Recurso Multimedia</h3><p>Acceso al recurso original: <a href="${content.fileUrl}">${content.fileUrl}</a></p></body></html>`;
        mimeType = 'text/html';
        extension = 'html';
      }

      const blob = new Blob([fileData], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${content.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      StorageService.incrementDownloads(content.id);
      onExportSuccess(content.id);
      setIsCompleted(true);
    }, 700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Exportar Contenido (CU-7)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Descarga a disco local en carpeta de descargas
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

        {/* Selected content preview */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-3 text-xs">
          <img
            src={content.thumbnailUrl}
            alt={content.title}
            className="w-12 h-12 rounded-lg object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-slate-900 dark:text-white truncate">
              {content.title}
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate">
              {content.authorName} • {content.size}
            </p>
          </div>
        </div>

        {/* Format Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Elige el formato de exportación deseado:
          </label>
          <div className="space-y-2">
            {availableFormats.map((fmt) => (
              <label
                key={fmt.id}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                  selectedFormat === fmt.id
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <input
                    type="radio"
                    name="exportFormat"
                    value={fmt.id}
                    checked={selectedFormat === fmt.id}
                    onChange={() => setSelectedFormat(fmt.id)}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-medium">{fmt.label}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{fmt.size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Download Status */}
        {downloadProgress !== null ? (
          <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center">
                <FolderDown className="w-4 h-4 mr-1.5 text-emerald-600" />
                {isCompleted ? 'Archivo guardado en carpeta de Descargas' : 'Empaquetando y transfiriendo...'}
              </span>
              <span className="font-bold text-emerald-600">{downloadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
            {isCompleted && (
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center space-x-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>¡Descarga lista! Se ha incrementado el contador de descargas del recurso.</span>
              </div>
            )}
          </div>
        ) : null}

        <div className="flex items-center justify-end space-x-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            {isCompleted ? 'Finalizar' : 'Cancelar'}
          </button>

          {!isCompleted && (
            <button
              onClick={handleStartDownload}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Descargar a Ordenador</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
