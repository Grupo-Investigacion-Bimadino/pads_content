import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  MessageSquare, 
  Download, 
  Share2, 
  Send, 
  Trash2, 
  Clock, 
  User as UserIcon, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Presentation,
  Play,
  Image as ImageIcon,
  BookOpen
} from 'lucide-react';
import { ContentItem, CommentItem, User, Slide } from '../types';

interface ContentViewerModalProps {
  content: ContentItem | null;
  comments: CommentItem[];
  currentUser: User;
  onClose: () => void;
  onAddComment: (contentId: string, commentText: string) => { success: boolean; error?: string };
  onDeleteComment: (commentId: string) => void;
  onShare: (content: ContentItem) => void;
  onExport: (content: ContentItem) => void;
}

export const ContentViewerModal: React.FC<ContentViewerModalProps> = ({
  content,
  comments,
  currentUser,
  onClose,
  onAddComment,
  onDeleteComment,
  onShare,
  onExport,
}) => {
  if (!content) return null;

  // Presentation State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Document Reading State
  const [documentPage, setDocumentPage] = useState(1);
  const totalPages = 6;

  // Comments State (CU-6)
  const [newCommentText, setNewCommentText] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [showCommentsSidebar, setShowCommentsSidebar] = useState(true);

  const MAX_CHAR_LIMIT = 250;
  const charsRemaining = MAX_CHAR_LIMIT - newCommentText.length;
  const isOverLimit = charsRemaining < 0;

  const slides: Slide[] = content.slides && content.slides.length > 0 ? content.slides : [
    {
      id: 1,
      title: content.title,
      subtitle: `Formato: ${content.format.toUpperCase()} • Docente: ${content.authorName}`,
      content: content.description,
      bulletPoints: [
        'Objetivo de aprendizaje: Dominar los conceptos fundamentales de la unidad.',
        'Material pedagógico avalado por la Universidad de Córdoba.',
        'Actividad práctica complementaria disponible para discusión en foros.',
      ],
    },
    {
      id: 2,
      title: 'Desarrollo Conceptual y Aplicación',
      subtitle: 'Contenido Educativo Multiformato (CCE)',
      content: 'La integración de recursos audiovisuales favorece la retención y comprensión de temas complejos en tecnología e informática.',
      bulletPoints: [
        'Organización jerarquizada accesible (OJA)',
        'Adaptabilidad en contenido educativo (ACE)',
        'Interacción colaborativa y retroalimentación mediante comentarios',
      ],
    }
  ];

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError(null);

    if (!newCommentText.trim()) {
      setCommentError('Por favor redacta tu comentario antes de enviar.');
      return;
    }

    if (newCommentText.length > MAX_CHAR_LIMIT) {
      setCommentError(`Límite excedido: Tu comentario tiene ${newCommentText.length} caracteres. El máximo permitido es de ${MAX_CHAR_LIMIT} caracteres (CU-6).`);
      return;
    }

    const result = onAddComment(content.id, newCommentText);
    if (!result.success) {
      setCommentError(result.error || 'Error al enviar el comentario.');
    } else {
      setNewCommentText('');
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 3000);
    }
  };

  const canComment = currentUser.role === 'docente' || currentUser.role === 'alumno' || currentUser.role === 'admin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`bg-white dark:bg-slate-900 w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'h-full max-w-none' : 'max-w-6xl max-h-[92vh] h-[850px]'
        }`}
      >
        {/* Top Visualizer Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs">
              {content.type === 'presentacion' && <Presentation className="w-4 h-4" />}
              {content.type === 'video' && <Play className="w-4 h-4" />}
              {content.type === 'documento' && <FileText className="w-4 h-4" />}
              {content.type === 'imagen' && <ImageIcon className="w-4 h-4" />}
            </span>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                {content.title}
              </h2>
              <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span>{content.authorName}</span>
                <span>•</span>
                <span className="uppercase font-semibold text-emerald-600 dark:text-emerald-400">{content.format}</span>
                <span>•</span>
                <span>{content.size}</span>
                <span>•</span>
                <span>v{content.versions?.length || 1}.0</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onShare(content)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Compartir (CU-4)"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onExport(content)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Descargar/Exportar (CU-7)"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowCommentsSidebar(!showCommentsSidebar)}
              className={`p-2 rounded-lg transition-colors cursor-pointer relative ${
                showCommentsSidebar
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
              title="Comentarios y Retroalimentación (CU-6)"
            >
              <MessageSquare className="w-4 h-4" />
              {comments.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {comments.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer hidden sm:block"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Area: Viewer Stage + Comments Drawer */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Stage */}
          <div className="flex-1 flex flex-col bg-slate-900 overflow-y-auto">
            {/* 1. PRESENTATION VIEWER */}
            {content.type === 'presentacion' && (
              <div className="flex-1 flex flex-col justify-between p-4 sm:p-8 text-white select-none">
                <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full bg-slate-800/90 rounded-2xl p-6 sm:p-10 border border-slate-700 shadow-xl relative overflow-hidden">
                  <div className="absolute top-4 right-5 text-xs text-slate-400 font-mono">
                    Diapositiva {currentSlideIndex + 1} de {slides.length}
                  </div>

                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2 block">
                    {currentSlide.subtitle || 'Software Educativo - CCE'}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white leading-tight">
                    {currentSlide.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-200 mb-6 leading-relaxed">
                    {currentSlide.content}
                  </p>

                  {currentSlide.imageUrl && (
                    <div className="mb-6 rounded-xl overflow-hidden max-h-56 border border-slate-600 shadow-md">
                      <img
                        src={currentSlide.imageUrl}
                        alt={currentSlide.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {currentSlide.bulletPoints && (
                    <div className="space-y-2 mb-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700/60">
                      {currentSlide.bulletPoints.map((point, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Presentation Controls Bar */}
                <div className="mt-4 flex items-center justify-between max-w-4xl mx-auto w-full pt-2">
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentSlideIndex === 0}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                          idx === currentSlideIndex
                            ? 'bg-emerald-500 w-6'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                        title={`Ir a diapositiva ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
                    disabled={currentSlideIndex === slides.length - 1}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. VIDEO VIEWER */}
            {content.type === 'video' && (
              <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                  <video
                    controls
                    autoPlay={false}
                    className="w-full aspect-video"
                    poster={content.thumbnailUrl}
                  >
                    <source src={content.fileUrl} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video HTML5.
                  </video>
                </div>
                <div className="mt-4 text-xs text-slate-400 text-center">
                  Video Pedagógico en resolución HD (Formato MP4 admitido, peso: {content.size})
                </div>
              </div>
            )}

            {/* 3. DOCUMENT VIEWER (PDF) */}
            {content.type === 'documento' && (
              <div className="flex-1 flex flex-col p-4 sm:p-6 text-slate-100 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Visor de Documento PDF - Guía Didáctica</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Página {documentPage} de {totalPages}</span>
                    <button
                      onClick={() => setDocumentPage((p) => Math.max(1, p - 1))}
                      disabled={documentPage === 1}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDocumentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={documentPage === totalPages}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-white text-slate-900 rounded-xl p-8 shadow-2xl overflow-y-auto font-serif">
                  <div className="text-center pb-6 mb-6 border-b border-slate-200">
                    <p className="text-xs uppercase font-sans tracking-widest text-emerald-800 font-bold mb-1">
                      Universidad de Córdoba • Licenciatura en Informática y Medios Audiovisuales
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 font-sans">
                      {content.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-1">
                      Autor: {content.authorName} | Formato: {content.format.toUpperCase()} | Versión {content.versions?.length || 1}.0
                    </p>
                  </div>

                  <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
                    <h4 className="font-sans font-bold text-base text-slate-800">
                      Capítulo {documentPage}: Directrices y Principios Metodológicos
                    </h4>
                    <p>
                      {content.description}
                    </p>
                    <p>
                      El software educativo concebido bajo el Componente de Contenido Educativo (CCE) implementa tres pilares centrales: Organización Jerarquizada Accesible (OJA), Adaptabilidad en Contenido Educativo (ACE) y Navegación Multiformato (NMF). Estos principios garantizan que el material curricular sea asimilable tanto para usuarios en conexiones fijas de escritorio como en terminales móviles de estudiantes y docentes.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg font-sans text-xs text-slate-700 border-l-4 border-emerald-600 my-4">
                      <strong>Nota de Cátedra:</strong> Todo recurso cargado en la plataforma pasa por una verificación de peso e integridad referencial en la base de datos para asegurar respuestas en tiempo real.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. IMAGE VIEWER */}
            {content.type === 'imagen' && (
              <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
                <div className="max-w-4xl max-h-[600px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black flex items-center justify-center">
                  <img
                    src={content.fileUrl}
                    alt={content.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  Gráfico vectorial / Esquema pedagógico de alta resolución ({content.format.toUpperCase()} • {content.size})
                </p>
              </div>
            )}
          </div>

          {/* Comments Sidebar (CU-6: COMENTAR CONTENIDOS) */}
          {showCommentsSidebar && (
            <div className="w-full md:w-88 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
              {/* Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Retroalimentación (CU-6)</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Diálogo pedagógico y comentarios
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {comments.length}
                </span>
              </div>

              {/* Comments List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p>Aún no hay comentarios.</p>
                    <p className="text-[11px] mt-1">Sé el primero en aportar una observación o duda.</p>
                  </div>
                ) : (
                  comments.map((comm) => {
                    const canDeleteThisComment = 
                      currentUser.role === 'admin' || 
                      currentUser.role === 'docente' || 
                      currentUser.id === comm.userId;

                    return (
                      <div
                        key={comm.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img
                              src={comm.authorAvatar}
                              alt={comm.authorName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <div>
                              <span className="font-bold text-slate-900 dark:text-slate-200 truncate">
                                {comm.authorName}
                              </span>
                              <span className="ml-1.5 text-[10px] text-slate-400 uppercase font-semibold">
                                {comm.authorRole}
                              </span>
                            </div>
                          </div>

                          {canDeleteThisComment && (
                            <button
                              onClick={() => onDeleteComment(comm.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors cursor-pointer"
                              title="Eliminar comentario"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                          {comm.comment}
                        </p>

                        <div className="text-[10px] text-slate-400 flex items-center justify-end">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(comm.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Add Comment Form with explicit character limit from Flujo Alternativo 1 */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                {canComment ? (
                  <form onSubmit={handleCommentSubmit} className="space-y-2">
                    <div className="relative">
                      <textarea
                        value={newCommentText}
                        onChange={(e) => {
                          setNewCommentText(e.target.value);
                          if (commentError) setCommentError(null);
                        }}
                        placeholder="Escribe tu comentario o pregunta pedagógica..."
                        rows={3}
                        className={`w-full p-2.5 text-xs rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all resize-none ${
                          isOverLimit
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500'
                        }`}
                      />

                      {/* Character Counter */}
                      <div className="flex items-center justify-between text-[10px] mt-1">
                        <span className={isOverLimit ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                          {charsRemaining < 0 ? `Exceso de ${Math.abs(charsRemaining)}` : `${charsRemaining} restantes`} (Máx. {MAX_CHAR_LIMIT})
                        </span>
                        <span className="text-slate-400">
                          {newCommentText.length} / {MAX_CHAR_LIMIT}
                        </span>
                      </div>
                    </div>

                    {/* Error Notice */}
                    {commentError && (
                      <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-[11px] flex items-start space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{commentError}</span>
                      </div>
                    )}

                    {commentSuccess && (
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-[11px] flex items-center space-x-1.5">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Comentario guardado exitosamente.</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-[10px] text-slate-400 flex items-center">
                        <UserIcon className="w-3 h-3 mr-1" />
                        {currentUser.nickname} ({currentUser.role})
                      </div>
                      <button
                        type="submit"
                        disabled={isOverLimit || !newCommentText.trim()}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white text-xs font-semibold cursor-pointer transition-colors"
                      >
                        <span>Comentar</span>
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-2 text-xs text-slate-500 dark:text-slate-400">
                    Los usuarios con rol de <strong>Invitado</strong> solo pueden visualizar contenido. Cambia a <strong>Docente</strong> o <strong>Alumno</strong> en la barra superior para comentar.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
