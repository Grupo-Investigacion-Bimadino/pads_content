import { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Sparkles, 
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { ContentItem, CommentItem, User } from './types';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { InteractiveMenuGrid } from './components/InteractiveMenuGrid';
import { ContentCard } from './components/ContentCard';
import { ContentViewerModal } from './components/ContentViewerModal';
import { ContentFormModal } from './components/ContentFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ShareModal } from './components/ShareModal';
import { ExportModal } from './components/ExportModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { TeamsModal } from './components/TeamsModal';

export default function App() {
  // Persistence & Global State
  const [contents, setContents] = useState<ContentItem[]>(() => StorageService.getContents());
  const [comments, setComments] = useState<CommentItem[]>(() => StorageService.getComments());
  const [teams] = useState(() => StorageService.getTeams());
  const [activeUser, setActiveUser] = useState<User>(() => StorageService.getActiveUser());
  const [darkMode, setDarkMode] = useState<boolean>(() => StorageService.getDarkMode());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Modals & Action States
  const [viewingContent, setViewingContent] = useState<ContentItem | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [deletingContent, setDeletingContent] = useState<ContentItem | null>(null);
  const [sharingContent, setSharingContent] = useState<ContentItem | null>(null);
  const [exportingContent, setExportingContent] = useState<ContentItem | null>(null);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false);

  // Quick Action Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync Dark Mode with DOM (CU-5 requirement)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    StorageService.setDarkMode(darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSelectUser = (user: User) => {
    setActiveUser(user);
    StorageService.setActiveUser(user);
    showToast(`Perfil cambiado a: ${user.name} (${user.role.toUpperCase()})`);
  };

  // Filtered & Searched Contents
  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      // 1. Role / Privacy filter
      if (item.isPrivate && activeUser.role === 'invitado') {
        return false;
      }

      // 2. Format / Category filter
      if (activeFilter !== 'all' && item.type !== activeFilter) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchAuthor = item.authorName.toLowerCase().includes(q);
        const matchFormat = item.format.toLowerCase().includes(q);
        return matchTitle || matchDesc || matchAuthor || matchFormat;
      }

      return true;
    });
  }, [contents, activeFilter, searchQuery, activeUser.role]);

  // Total stats
  const totalViews = useMemo(() => contents.reduce((acc, c) => acc + (c.viewsCount || 0), 0), [contents]);
  const totalDownloads = useMemo(() => contents.reduce((acc, c) => acc + (c.downloadsCount || 0), 0), [contents]);

  // Handler: Select Content for Viewing (CU-5)
  const handleSelectForView = (content: ContentItem) => {
    StorageService.incrementViews(content.id);
    setContents(StorageService.getContents());
    setViewingContent(content);
  };

  // Handler: Add Comment (CU-6)
  const handleAddComment = (contentId: string, commentText: string) => {
    const res = StorageService.addComment(contentId, activeUser, commentText);
    if (res.success && res.comment) {
      setComments(StorageService.getComments());
      showToast('Comentario añadido exitosamente (CU-6)');
    }
    return res;
  };

  // Handler: Delete Comment (CU-6)
  const handleDeleteComment = (commentId: string) => {
    const success = StorageService.deleteComment(commentId, activeUser);
    if (success) {
      setComments(StorageService.getComments());
      showToast('Comentario eliminado');
    }
  };

  // Handler: Save New or Edited Content (CU-1 & CU-2)
  const handleSaveContent = (_saved: ContentItem) => {
    setContents(StorageService.getContents());
    showToast(editingContent ? 'Contenido y nueva versión guardados (CU-2)' : 'Nuevo contenido publicado con éxito (CU-1)');
    setEditingContent(null);
    setIsFormModalOpen(false);
  };

  // Handler: Revert Version (CU-2 Flujo Alternativo 1)
  const handleRevertVersion = (contentId: string, versionId: string) => {
    const reverted = StorageService.revertContentVersion(contentId, versionId, activeUser.name);
    if (reverted) {
      setContents(StorageService.getContents());
      showToast('Versión restaurada con éxito (CU-2)');
    }
  };

  // Handler: Delete Content (CU-3)
  const handleConfirmDelete = (contentId: string) => {
    const deleted = StorageService.deleteContent(contentId);
    if (deleted) {
      setContents(StorageService.getContents());
      showToast('Contenido eliminado permanentemente (CU-3)');
      setDeletingContent(null);
      if (viewingContent?.id === contentId) {
        setViewingContent(null);
      }
    }
  };

  // Handler: Export Success (CU-7)
  const handleExportSuccess = (_contentId: string) => {
    setContents(StorageService.getContents());
    showToast('Contenido exportado a la carpeta de descargas (CU-7)');
  };

  // Handler: Reset to factory default data
  const handleResetData = () => {
    if (window.confirm('¿Deseas restaurar todos los contenidos y comentarios a sus valores originales de cátedra?')) {
      StorageService.resetToFactoryDefaults();
      setContents(StorageService.getContents());
      setComments(StorageService.getComments());
      showToast('Datos restaurados a valores de cátedra');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 p-3.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl flex items-center space-x-2 text-xs font-semibold animate-fadeIn border border-slate-700/50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        activeUser={activeUser}
        onSelectUser={handleSelectUser}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCreateModal={() => {
          setEditingContent(null);
          setIsFormModalOpen(true);
        }}
        onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
        onOpenTeamsModal={() => setIsTeamsModalOpen(true)}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* Main Educational Application Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        {/* Institutional Academic Brief Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plataforma Oficial de Presentaciones y Recursos</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Componente de Contenido Educativo (CCE)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Diseño y Desarrollo de Software I, II y III — Organización Jerarquizada Accesible (OJA), 
              Adaptabilidad en Contenido Educativo (ACE) y Navegación Multiformato (NMF).
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0 pt-2 md:pt-0 text-xs">
            <div className="text-center px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="block font-black text-emerald-700 dark:text-emerald-400 text-sm sm:text-base">
                {contents.length}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-medium">Contenidos</span>
            </div>
            <div className="text-center px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="block font-black text-teal-700 dark:text-teal-400 text-sm sm:text-base">
                {totalViews}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-medium">Vistas</span>
            </div>
            <div className="text-center px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="block font-black text-blue-700 dark:text-blue-400 text-sm sm:text-base">
                {totalDownloads}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-medium">Descargas</span>
            </div>
          </div>
        </div>

        {/* 1. CARRUSEL DE IMÁGENES / PRESENTACIONES (Requisito Pág. 5) */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                Presentaciones y Recursos Destacados
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Carrusel Interactivo
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              Pasa el cursor o interactúa con los controles
            </span>
          </div>
          <HeroCarousel
            items={contents}
            onSelectContent={handleSelectForView}
          />
        </section>

        {/* 2. MENÚ DESPLEGABLE CONFORMADO POR IMÁGENES (Requisito Pág. 5) */}
        <section>
          <InteractiveMenuGrid
            contents={contents}
            userRole={activeUser.role}
            onSelectContent={handleSelectForView}
            onEditContent={(c) => {
              setEditingContent(c);
              setIsFormModalOpen(true);
            }}
            onDeleteContent={(c) => setDeletingContent(c)}
            onShareContent={(c) => setSharingContent(c)}
            onExportContent={(c) => setExportingContent(c)}
          />
        </section>

        {/* 3. CATÁLOGO COMPLETO DE CONTENIDOS Y RECURSOS EDUCATIVOS */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center space-x-2">
                <span>Catálogo General de Materiales</span>
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  ({filteredContents.length} {filteredContents.length === 1 ? 'recurso' : 'recursos'})
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Materiales organizados jerárquicamente para estudio independiente o aula magistral.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {(activeUser.role === 'docente' || activeUser.role === 'admin') && (
                <button
                  onClick={() => {
                    setEditingContent(null);
                    setIsFormModalOpen(true);
                  }}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Subir Contenido (CU-1)</span>
                </button>
              )}
            </div>
          </div>

          {/* Grid of Cards */}
          {filteredContents.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <Search className="w-10 h-10 mx-auto text-slate-400" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                No se encontraron contenidos
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                No hay recursos que coincidan con la búsqueda "{searchQuery}" o con el filtro seleccionado.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 cursor-pointer"
              >
                Limpiar Búsqueda y Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredContents.map((item) => {
                const itemComments = comments.filter((comm) => comm.contentId === item.id);
                return (
                  <ContentCard
                    key={item.id}
                    content={item}
                    userRole={activeUser.role}
                    commentsCount={itemComments.length}
                    onSelect={handleSelectForView}
                    onEdit={(c) => {
                      setEditingContent(c);
                      setIsFormModalOpen(true);
                    }}
                    onDelete={(c) => setDeletingContent(c)}
                    onShare={(c) => setSharingContent(c)}
                    onExport={(c) => setExportingContent(c)}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-200">
              Universidad de Córdoba — Licenciatura en Informática y Medios Audiovisuales
            </p>
            <p className="text-[11px] mt-0.5">
              Propuesta de Diseño de Software I, II y III • Módulo de Creación de Contenidos (CCE)
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Docente Titular: Alexander E. Toscano Ricarddo • Contribuidores: O. Madera, D. Cogollo, K. López, Romero • Grupo Bimadino
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Auditoría y Modelo E/R
            </button>
            <span>•</span>
            <button
              onClick={() => setIsTeamsModalOpen(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Equipos de Cátedra
            </button>
            <span>•</span>
            <button
              onClick={handleResetData}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer flex items-center space-x-1"
              title="Restaurar contenidos iniciales de prueba"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer Datos</span>
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* CU-5 & CU-6: Content Viewer Modal */}
      {viewingContent && (
        <ContentViewerModal
          content={viewingContent}
          comments={comments.filter((c) => c.contentId === viewingContent.id)}
          currentUser={activeUser}
          onClose={() => setViewingContent(null)}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
          onShare={(c) => setSharingContent(c)}
          onExport={(c) => setExportingContent(c)}
        />
      )}

      {/* CU-1 & CU-2: Content Form Modal */}
      <ContentFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingContent(null);
        }}
        editingContent={editingContent}
        currentUser={activeUser}
        onSaveContent={handleSaveContent}
        onRevertVersion={handleRevertVersion}
      />

      {/* CU-3: Delete Confirmation Modal */}
      <DeleteConfirmModal
        content={deletingContent}
        onClose={() => setDeletingContent(null)}
        onConfirmDelete={handleConfirmDelete}
      />

      {/* CU-4: Share Modal */}
      <ShareModal
        content={sharingContent}
        onClose={() => setSharingContent(null)}
      />

      {/* CU-7: Export Modal */}
      <ExportModal
        content={exportingContent}
        onClose={() => setExportingContent(null)}
        onExportSuccess={handleExportSuccess}
      />

      {/* Technical Architecture & E/R Modal */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      {/* Teams Modal */}
      <TeamsModal
        isOpen={isTeamsModalOpen}
        onClose={() => setIsTeamsModalOpen(false)}
        teams={teams}
      />
    </div>
  );
}
