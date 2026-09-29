import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, VolumeX, Smartphone, Maximize2, Search, X, ArrowLeft } from 'lucide-react';
import { sound } from '../utils/audio';

interface AndroidTopBarProps {
  isPhoneFrame: boolean;
  onToggleFrame: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
  canGoBack: boolean;
  onBack: () => void;
  currentTitle?: string;
}

export const AndroidTopBar: React.FC<AndroidTopBarProps> = ({
  isPhoneFrame,
  onToggleFrame,
  searchQuery,
  onSearchChange,
  isSoundOn,
  onToggleSound,
  canGoBack,
  onBack,
  currentTitle = 'NeuroImmune CT',
}) => {
  const [timeStr, setTimeStr] = useState<string>('10:42');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-slate-950/75 backdrop-blur-2xl border-b border-white/10">
      {/* Android System Status Bar */}
      <div className="flex items-center justify-between px-5 py-1 text-[11px] font-mono text-slate-400 select-none">
        <span className="font-semibold text-slate-200">{timeStr}</span>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-[10px] font-bold text-cyan-400">5G</span>
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center gap-1">
            <span className="text-[10px]">96%</span>
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main App Top Bar with Pebble Glass Buttons */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          {canGoBack && (
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              title="Go back (or swipe right)"
              className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-slate-300 hover:text-white transition active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
            </button>
          )}

          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-cyan-500/25">
            NI
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight leading-none truncate max-w-[170px] sm:max-w-xs">
              {currentTitle}
            </h1>
            <span className="text-[10px] text-cyan-400 font-mono">CT Prep & Lab</span>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sound.playClick();
              setShowSearch((s) => !s);
            }}
            aria-label="Search questions"
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-slate-300 hover:text-white transition active:scale-95"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            aria-label="Toggle sound"
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-slate-300 hover:text-white transition active:scale-95"
          >
            {isSoundOn ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onToggleFrame();
            }}
            title={isPhoneFrame ? 'Expand to Fullscreen' : 'Switch to Android Phone View'}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-slate-300 hover:text-white transition active:scale-95"
          >
            {isPhoneFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {showSearch && (
        <div className="px-4 pb-2.5 pt-0.5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions (e.g. action potential, NK cells, BCI, mRNA)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
              className="w-full bg-white/[0.06] border border-white/15 rounded-full py-1.5 pl-4 pr-9 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
