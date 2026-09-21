import React from 'react';
import { 
  BookOpen, 
  Moon, 
  Sun, 
  Plus, 
  Search, 
  Shield, 
  GraduationCap, 
  UserCheck, 
  Eye, 
  Layers, 
  Database,
  Users
} from 'lucide-react';
import { User, UserRole } from '../types';
import { CURRENT_USERS } from '../data/seedData';

interface NavbarProps {
  activeUser: User;
  onSelectUser: (user: User) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCreateModal: () => void;
  onOpenArchitectureModal: () => void;
  onOpenTeamsModal: () => void;
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeUser,
  onSelectUser,
  darkMode,
  onToggleDarkMode,
  searchQuery,
  onSearchChange,
  onOpenCreateModal,
  onOpenArchitectureModal,
  onOpenTeamsModal,
  activeFilter,
  onSelectFilter,
}) => {
  const canCreate = activeUser.role === 'docente' || activeUser.role === 'admin';

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return {
          label: 'Administrador',
          color: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
          icon: <Shield className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />,
        };
      case 'docente':
        return {
          label: 'Docente',
          color: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800',
          icon: <GraduationCap className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />,
        };
      case 'alumno':
        return {
          label: 'Alumno',
          color: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800',
          icon: <UserCheck className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />,
        };
      case 'invitado':
      default:
        return {
          label: 'Invitado',
          color: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
          icon: <Eye className="w-3.5 h-3.5 mr-1 text-slate-500" />,
        };
    }
  };

  const badge = getRoleBadge(activeUser.role);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top Banner with University Identity */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white text-xs py-1 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2 font-medium">
            <span className="bg-amber-400 text-emerald-950 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              UNICÓRDOBA
            </span>
            <span className="hidden sm:inline">Licenciatura en Informática y Medios Audiovisuales</span>
            <span className="sm:hidden">LIMA - CCE</span>
            <span className="text-emerald-300">|</span>
            <span className="text-emerald-100 opacity-90">Diseño y Desarrollo de Software Educativo</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <button
              onClick={onOpenArchitectureModal}
              className="hover:text-amber-300 transition-colors flex items-center space-x-1 cursor-pointer underline decoration-dotted"
              title="Ver especificación de arquitectura y modelo E/R de la propuesta"
            >
              <Database className="w-3 h-3" />
              <span>Modelo E/R y Arquitectura</span>
            </button>
            <span className="text-emerald-400">|</span>
            <button
              onClick={onOpenTeamsModal}
              className="hover:text-amber-300 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <Users className="w-3 h-3" />
              <span>Equipos de Cátedra</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                  Creación de Contenidos
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  CCE
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Componente de Contenido Educativo Multiformato
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar presentaciones, videos, guías o infografías..."
                className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Create Content Button (Conditional on Role) */}
            {canCreate && (
              <button
                onClick={onOpenCreateModal}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors cursor-pointer"
                title="Crear nuevo contenido educativo (CU-1)"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Crear Contenido</span>
              </button>
            )}

            {/* Dark / Night Mode Toggle (CU-5) */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={darkMode ? 'Cambiar a modo diurno' : 'Cambiar a modo nocturno (CU-5)'}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Role Switcher Menu */}
            <div className="relative group">
              <button
                className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors cursor-pointer"
                title="Cambiar rol activo para probar permisos y casos de uso"
              >
                <img
                  src={activeUser.picture}
                  alt={activeUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500/40"
                />
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                    {activeUser.nickname}
                  </div>
                  <div className="flex items-center text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="capitalize">{activeUser.role}</span>
                  </div>
                </div>
                <div className={`hidden sm:inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
                  {badge.icon}
                  <span>{badge.label}</span>
                </div>
              </button>

              {/* Dropdown for role selection */}
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 hidden group-hover:block z-50">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 mb-1">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Conmutador de Perfiles (RBAC)
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Selecciona un perfil para probar los permisos de la propuesta:
                  </p>
                </div>
                <div className="space-y-1">
                  {CURRENT_USERS.map((user) => {
                    const isSelected = user.id === activeUser.id;
                    const uBadge = getRoleBadge(user.role);
                    return (
                      <button
                        key={user.id}
                        onClick={() => onSelectUser(user)}
                        className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <img
                          src={user.picture}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold truncate">{user.name}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {user.email}
                          </div>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${uBadge.color}`}>
                          {uBadge.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar en el catálogo educativo..."
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-transparent focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Categories Filter Bar */}
        <div className="flex items-center space-x-2 py-2.5 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider shrink-0 mr-1 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1" />
            Formato:
          </span>
          {[
            { id: 'all', label: 'Todos los Contenidos' },
            { id: 'presentacion', label: 'Presentaciones (PPTX/Slides)' },
            { id: 'video', label: 'Videos Educativos (MP4)' },
            { id: 'documento', label: 'Documentos y Guías (PDF)' },
            { id: 'imagen', label: 'Infografías y Esquemas (PNG)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectFilter(cat.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-emerald-700 text-white font-medium shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
