import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  FileText, 
  Presentation, 
  Image as ImageIcon, 
  Clock, 
  Eye, 
  Download, 
  Pause,
  ArrowUpRight
} from 'lucide-react';
import { ContentItem } from '../types';

interface HeroCarouselProps {
  items: ContentItem[];
  onSelectContent: (item: ContentItem) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ items, onSelectContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const carouselItems = items.slice(0, 5);

  useEffect(() => {
    if (isPaused || carouselItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, carouselItems.length]);

  if (carouselItems.length === 0) return null;

  const current = carouselItems[currentIndex];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'presentacion':
        return <Presentation className="w-4 h-4" />;
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'documento':
        return <FileText className="w-4 h-4" />;
      case 'imagen':
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div 
      className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 bg-slate-900 text-white my-6 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Ambient Gradient Overlay */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden">
        <img
          src={current.thumbnailUrl}
          alt={current.title}
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out brightness-75 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Content Box Over Slide */}
        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end max-w-3xl">
          <div className="flex items-center space-x-2 mb-3">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-emerald-950 shadow-sm">
              {getTypeIcon(current.type)}
              <span className="uppercase tracking-wider text-[11px] font-bold">{current.type}</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md text-white border border-white/20 uppercase">
              {current.format}
            </span>
            <span className="hidden sm:inline-flex items-center text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
              {current.size}
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white mb-2 leading-tight drop-shadow-sm">
            {current.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-2xl mb-5 opacity-90">
            {current.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectContent(current)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-emerald-500/25 cursor-pointer"
            >
              <span>Abrir y Visualizar</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-4 text-xs text-slate-300 ml-2">
              <span className="flex items-center">
                <Eye className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                {current.viewsCount} lecturas
              </span>
              <span className="flex items-center">
                <Download className="w-3.5 h-3.5 mr-1 text-teal-400" />
                {current.downloadsCount} descargas
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer"
          title="Presentación anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer"
          title="Siguiente presentación"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Slide Indicators & Auto-Play status */}
        <div className="absolute bottom-4 right-6 flex items-center space-x-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer text-xs mr-1"
            title={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          {carouselItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-emerald-400'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              title={`Ir a ${item.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
