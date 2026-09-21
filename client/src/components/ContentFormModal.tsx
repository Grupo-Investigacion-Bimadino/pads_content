import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  AlertCircle, 
  FileText, 
  Presentation, 
  Play, 
  Image as ImageIcon, 
  History, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { ContentItem, ContentType, ContentFormat, User, Slide } from '../types';
import { StorageService } from '../services/storage';

interface ContentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingContent: ContentItem | null;
  currentUser: User;
  onSaveContent: (content: ContentItem) => void;
  onRevertVersion: (contentId: string, versionId: string) => void;
}

const SUPPORTED_FORMATS: Record<ContentType, ContentFormat[]> = {
  presentacion: ['pptx', 'pdf'],
  video: ['mp4'],
  documento: ['pdf'],
  imagen: ['png', 'jpg', 'webp'],
};

export const ContentFormModal: React.FC<ContentFormModalProps> = ({
  isOpen,
  onClose,
  editingContent,
  currentUser,
  onSaveContent,
  onRevertVersion,
}) => {
  if (!isOpen) return null;

  const isEditing = !!editingContent;

  // Form states
  const [activeTab, setActiveTab] = useState<'form' | 'versions' | 'slides'>('form');
  const [title, setTitle] = useState(editingContent?.title || '');
  const [description, setDescription] = useState(editingContent?.description || '');
  const [type, setType] = useState<ContentType>(editingContent?.type || 'presentacion');
  const [format, setFormat] = useState<ContentFormat>(editingContent?.format || 'pptx');
  const [size, setSize] = useState(editingContent?.size || '6.5 MB');
  const [isPrivate, setIsPrivate] = useState(editingContent?.isPrivate || false);
  const [fileUrl, setFileUrl] = useState(editingContent?.fileUrl || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(editingContent?.thumbnailUrl || '');
  const [changeNotes, setChangeNotes] = useState('');
  const [teamName, setTeamName] = useState(editingContent?.teamName || 'Diseño de Software Educativo III');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [revertConfirmVersionId, setRevertConfirmVersionId] = useState<string | null>(null);

  // Slides State if presentation
  const [slides, setSlides] = useState<Slide[]>(
    editingContent?.slides || [
      {
        id: 1,
        title: 'Introducción a la Unidad Temática',
        subtitle: 'Conceptos Clave de Aprendizaje',
        content: 'Presentación de contenidos curriculares estructurados para estudiantes de la Universidad de Córdoba.',
        bulletPoints: ['Objetivos formativos', 'Desarrollo conceptual', 'Evaluación de competencias'],
      }
    ]
  );

  const handleTypeChange = (newType: ContentType) => {
    setType(newType);
    const availableFormats = SUPPORTED_FORMATS[newType];
    if (!availableFormats.includes(format)) {
      setFormat(availableFormats[0]);
    }
  };

  const handleFormatChange = (newFormat: ContentFormat) => {
    const validFormats = SUPPORTED_FORMATS[type];
    if (!validFormats.includes(newFormat)) {
      setValidationError(
        `Formato no compatible: "${newFormat}" no es admitido para el tipo de contenido "${type}". Formatos permitidos: ${validFormats.join(', ').toUpperCase()} (CU-1 Flujo Alternativo 1).`
      );
      return;
    }
    setValidationError(null);
    setFormat(newFormat);
  };

  const handleAddSlide = () => {
    const nextId = slides.length + 1;
    setSlides([
      ...slides,
      {
        id: nextId,
        title: `Diapositiva ${nextId}`,
        subtitle: 'Punto temático',
        content: 'Contenido explicativo de la diapositiva.',
        bulletPoints: ['Punto clave 1', 'Punto clave 2'],
      }
    ]);
  };

  const handleRemoveSlide = (index: number) => {
    if (slides.length <= 1) return;
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!title.trim()) {
      setValidationError('El título del contenido es obligatorio.');
      return;
    }
    if (!description.trim()) {
      setValidationError('La descripción pedagógica es obligatoria.');
      return;
    }

    let finalThumbnail = thumbnailUrl.trim();
    if (!finalThumbnail) {
      if (type === 'presentacion') finalThumbnail = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80';
      else if (type === 'video') finalThumbnail = 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80';
      else if (type === 'documento') finalThumbnail = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80';
      else finalThumbnail = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80';
    }

    let finalFileUrl = fileUrl.trim();
    if (!finalFileUrl) {
      if (type === 'video') finalFileUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      else finalFileUrl = finalThumbnail;
    }

    if (isEditing && editingContent) {
      const updated = StorageService.updateContent(
        editingContent.id,
        {
          title: title.trim(),
          description: description.trim(),
          type,
          format,
          size: size.trim() || '8.0 MB',
          isPrivate,
          thumbnailUrl: finalThumbnail,
          fileUrl: finalFileUrl,
          teamName,
          slides: type === 'presentacion' ? slides : undefined,
        },
        currentUser.name,
        changeNotes.trim() || 'Modificación general de contenidos'
      );
      if (updated) {
        onSaveContent(updated);
        onClose();
      }
    } else {
      const created = StorageService.createContent({
        title: title.trim(),
        description: description.trim(),
        type,
        format,
        size: size.trim() || '8.0 MB',
        editionType: type,
        isPrivate,
        allowedRoles: ['admin', 'docente', 'alumno', 'invitado'],
        thumbnailUrl: finalThumbnail,
        fileUrl: finalFileUrl,
        authorId: currentUser.id,
        authorName: currentUser.name,
        teamName,
        slides: type === 'presentacion' ? slides : undefined,
      });
      onSaveContent(created);
      onClose();
    }
  };

  const handleConfirmRevert = (versionId: string) => {
    if (!editingContent) return;
    onRevertVersion(editingContent.id, versionId);
    setRevertConfirmVersionId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80 shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {isEditing ? `Editar Contenido (CU-2): ${editingContent.title}` : 'Crear Nuevo Contenido (CU-1)'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isEditing ? 'Actualiza los metadatos o revierte a versiones históricas.' : 'Sube y clasifica materiales educativos multiformato.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/50 dark:bg-slate-900/50 text-xs shrink-0">
          <button
            onClick={() => setActiveTab('form')}
            className={`py-3 px-4 font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'form'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Datos Principales
          </button>

          {type === 'presentacion' && (
            <button
              onClick={() => setActiveTab('slides')}
              className={`py-3 px-4 font-semibold border-b-2 cursor-pointer transition-colors ${
                activeTab === 'slides'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Diapositivas ({slides.length})
            </button>
          )}

          {isEditing && (
            <button
              onClick={() => setActiveTab('versions')}
              className={`py-3 px-4 font-semibold border-b-2 cursor-pointer transition-colors flex items-center space-x-1.5 ${
                activeTab === 'versions'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Historial de Versiones ({editingContent.versions?.length || 1})</span>
            </button>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
          {validationError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* TAB 1: FORM */}
          {activeTab === 'form' && (
            <form id="content-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Type Selection */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tipo de Contenido (Pág. 27):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'presentacion', label: 'Presentación', icon: <Presentation className="w-4 h-4" /> },
                    { id: 'video', label: 'Video', icon: <Play className="w-4 h-4" /> },
                    { id: 'documento', label: 'Documento', icon: <FileText className="w-4 h-4" /> },
                    { id: 'imagen', label: 'Imagen', icon: <ImageIcon className="w-4 h-4" /> },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => handleTypeChange(t.id as ContentType)}
                      className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl border font-semibold text-xs cursor-pointer transition-all ${
                        type === t.id
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {t.icon}
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Format Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Título del Contenido (ej. "El mouse"):
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ej. El mouse: Funciones y Ergonomía"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Formato Admitido:
                  </label>
                  <select
                    value={format}
                    onChange={(e) => handleFormatChange(e.target.value as ContentFormat)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 uppercase font-semibold text-xs"
                  >
                    {SUPPORTED_FORMATS[type].map((fmt) => (
                      <option key={fmt} value={fmt}>
                        .{fmt.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Descripción Pedagógica (ej. "Funciones del mouse"):
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalla los propósitos educativos, objetivos de aprendizaje y contenidos de la sesión..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Size, Privacy and Team */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Peso del Documento:
                  </label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="ej. 12 mb"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Equipo de Trabajo:
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="ej. Diseño de Software Educativo III"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Visibilidad / Privacidad:
                  </label>
                  <div className="flex items-center space-x-2 pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {isPrivate ? 'Privado (Solo inscritos)' : 'Público (Todos los roles)'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Custom URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block font-medium text-slate-600 dark:text-slate-400 text-xs mb-1">
                    Imagen de Portada (URL o dejar en blanco para automática):
                  </label>
                  <input
                    type="url"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-600 dark:text-slate-400 text-xs mb-1">
                    Archivo Fuente / Video (URL):
                  </label>
                  <input
                    type="url"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="https://commondatastorage..."
                    className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {isEditing && (
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Notas de Modificación para la nueva versión (CU-2):
                  </label>
                  <input
                    type="text"
                    value={changeNotes}
                    onChange={(e) => setChangeNotes(e.target.value)}
                    placeholder="ej. Se añadieron esquemas complementarios sobre microinterruptores"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}
            </form>
          )}

          {/* TAB 2: SLIDES */}
          {activeTab === 'slides' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Define las diapositivas interactivas para que los alumnos puedan visualizarlas en el visor.
                </p>
                <button
                  type="button"
                  onClick={handleAddSlide}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Diapositiva</span>
                </button>
              </div>

              <div className="space-y-3">
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Diapositiva #{idx + 1}
                      </span>
                      {slides.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSlide(idx)}
                          className="text-rose-500 hover:text-rose-700 p-1 rounded cursor-pointer"
                          title="Eliminar diapositiva"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                          Título de Diapositiva:
                        </label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const copy = [...slides];
                            copy[idx].title = e.target.value;
                            setSlides(copy);
                          }}
                          className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                          Subtítulo o Unidad:
                        </label>
                        <input
                          type="text"
                          value={slide.subtitle || ''}
                          onChange={(e) => {
                            const copy = [...slides];
                            copy[idx].subtitle = e.target.value;
                            setSlides(copy);
                          }}
                          className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Cuerpo Explicativo:
                      </label>
                      <textarea
                        rows={2}
                        value={slide.content}
                        onChange={(e) => {
                          const copy = [...slides];
                          copy[idx].content = e.target.value;
                          setSlides(copy);
                        }}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VERSIONS (CU-2 Historial y Revertir Versión) */}
          {activeTab === 'versions' && editingContent && (
            <div className="space-y-4">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                <strong>Requisito CU-2 (Flujo Alternativo 1):</strong> Puedes explorar todas las versiones históricas registradas de este contenido y revertir a cualquiera de ellas restaurando su título, descripción y archivos con un solo clic.
              </div>

              <div className="space-y-3">
                {editingContent.versions?.map((ver) => {
                  const isCurrent = ver.versionNumber === (editingContent.versions?.[0]?.versionNumber || 1);

                  return (
                    <div
                      key={ver.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isCurrent
                          ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs px-2 py-0.5 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono">
                            v{ver.versionNumber}.0
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {ver.title}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                              Actual
                            </span>
                          )}
                        </div>

                        {!isCurrent && (
                          <button
                            type="button"
                            onClick={() => setRevertConfirmVersionId(ver.id)}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                            title="Revertir a esta versión (CU-2 Flujo Alternativo 1)"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restaurar Esta Versión</span>
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                        {ver.description}
                      </p>

                      <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <span>Modificado por: <strong>{ver.modifiedBy}</strong></span>
                        <span>•</span>
                        <span>Fecha: {new Date(ver.modifiedAt).toLocaleString()}</span>
                        <span>•</span>
                        <span>Nota: <em>"{ver.changeNotes}"</em></span>
                      </div>

                      {/* Confirmation snippet for reversion */}
                      {revertConfirmVersionId === ver.id && (
                        <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs space-y-2">
                          <p className="text-amber-900 dark:text-amber-200 font-medium">
                            ¿Confirmas la restauración a la <strong>Versión #{ver.versionNumber}</strong>? Esto creará un nuevo punto de restauración con el contenido anterior.
                          </p>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleConfirmRevert(ver.id)}
                              className="px-3 py-1 bg-amber-600 text-white rounded-md font-bold hover:bg-amber-700 cursor-pointer"
                            >
                              Sí, Confirmar Restauración
                            </button>
                            <button
                              type="button"
                              onClick={() => setRevertConfirmVersionId(null)}
                              className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 font-semibold cursor-pointer"
          >
            Cancelar
          </button>

          {activeTab !== 'versions' && (
            <button
              type="submit"
              form="content-form"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md cursor-pointer transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Guardar Cambios (CU-2)' : 'Crear y Guardar (CU-1)'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
