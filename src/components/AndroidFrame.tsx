import React, { useRef } from 'react';

interface AndroidFrameProps {
  isPhoneFrame: boolean;
  onSwipeBack?: () => void;
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  isPhoneFrame,
  onSwipeBack,
  children,
}) => {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  // Mobile edge swipe-to-back detector
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!onSwipeBack) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX.current;
    const deltaY = Math.abs(touchEndY - touchStartY.current);

    // Swipe must start from left edge (<= 45px) and move right by >= 65px with minimal vertical shift
    if (touchStartX.current <= 50 && deltaX > 65 && deltaY < 50) {
      onSwipeBack();
    }
  };

  if (!isPhoneFrame) {
    return (
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden"
      >
        {/* Ambient liquid background refraction orbs */}
        <div className="liquid-glow-1" />
        <div className="liquid-glow-2" />
        <div className="liquid-glow-3" />

        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="min-h-screen bg-slate-950 py-3 px-2 sm:px-4 flex items-center justify-center relative overflow-hidden"
    >
      {/* Ambient liquid background refraction orbs */}
      <div className="liquid-glow-1" />
      <div className="liquid-glow-2" />
      <div className="liquid-glow-3" />

      {/* Android Device Outer Pebble Shell */}
      <div className="w-full max-w-[430px] h-[93vh] max-h-[900px] bg-slate-950/80 backdrop-blur-3xl rounded-[44px] p-2 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.15)] relative flex flex-col border border-white/10 overflow-hidden z-10">
        {/* Top Camera Punch Hole & Speaker */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 pointer-events-none">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-white/20 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-900/80" />
          </div>
        </div>

        {/* Screen Area */}
        <div className="flex-1 rounded-[36px] overflow-hidden flex flex-col bg-slate-950/60 relative">
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
            {children}
          </div>

          {/* Android Bottom Gesture Pill Bar */}
          <div className="h-4 bg-slate-950/80 flex items-center justify-center pointer-events-none shrink-0 border-t border-white/5">
            <div className="w-28 h-1 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
};
