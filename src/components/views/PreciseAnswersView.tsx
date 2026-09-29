import React, { useState } from 'react';
import { FileText, Copy, Check, Sparkles, Brain, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { PRECISE_CT_ANSWERS, PreciseAnswer } from '../../data/ctPreciseAnswers';
import { sound } from '../../utils/audio';

export const PreciseAnswersView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'neuro_bci' | 'immunology'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>({});

  const filteredAnswers = PRECISE_CT_ANSWERS.filter((item) => {
    if (filter === 'neuro_bci') return item.category === 'neuro_bci';
    if (filter === 'immunology') return item.category === 'immunology';
    return true;
  });

  const handleCopySingle = (item: PreciseAnswer) => {
    sound.playSuccess();
    let text = `QUESTION ${item.number}: ${item.question}\n\n`;
    item.sections.forEach((sec) => {
      if (sec.title) text += `* ${sec.title}:\n`;
      sec.points.forEach((pt) => {
        text += `  • ${pt}\n`;
      });
      text += '\n';
    });
    if (item.keyTakeaway) {
      text += `[Takeaway: ${item.keyTakeaway}]\n`;
    }
    navigator.clipboard?.writeText(text);
    setCopiedId(item.number);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleCollapse = (num: string) => {
    sound.playClick();
    setCollapsedMap((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  return (
    <div className="flex-1 pb-20 space-y-4 px-4 pt-3 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="glass-pebble p-5 border border-white/15 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-cyan-300 font-semibold px-2.5 py-0.5 rounded-full glass-pill border border-cyan-400/30">
            Dedicated Precise Answers
          </span>
          <span className="text-xs font-mono text-slate-400">
            Questions 1 to 11
          </span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Class Test Model Answers
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Clean, exact, and point-by-point simplified answers tailored specifically for your Class Test preparation. Copy or memorize directly.
        </p>
      </div>

      {/* Segmented Filter Pills */}
      <div className="flex items-center gap-1.5 p-1 glass-pill border border-white/10 max-w-md mx-auto">
        <button
          onClick={() => {
            sound.playClick();
            setFilter('all');
          }}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-medium transition ${
            filter === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All (11)
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setFilter('neuro_bci');
          }}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-medium transition ${
            filter === 'neuro_bci'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Neuro & BCI (1-6)
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setFilter('immunology');
          }}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-medium transition ${
            filter === 'immunology'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Immunology (7-11)
        </button>
      </div>

      {/* List of Precise Answers */}
      <div className="space-y-3.5">
        {filteredAnswers.map((item) => {
          const isCollapsed = collapsedMap[item.number];
          const isCopied = copiedId === item.number;

          return (
            <div
              key={item.number}
              className="glass-pebble p-4 sm:p-5 border border-white/12 space-y-3 shadow-md hover:border-cyan-400/30 transition-all duration-300"
            >
              {/* Question Header & Copy Button */}
              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono mb-1">
                    <span className="font-bold text-cyan-400">QUESTION {item.number}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400 capitalize">
                      {item.category === 'neuro_bci' ? 'Neuro & BCI' : 'Immunology'}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                    {item.question}
                  </h3>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleCopySingle(item)}
                    title="Copy this precise answer"
                    className="p-2 rounded-xl glass-pill hover:bg-white/10 text-slate-300 hover:text-white transition active:scale-95 flex items-center gap-1 text-xs"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline text-[11px]">{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => toggleCollapse(item.number)}
                    className="p-2 rounded-xl glass-pill hover:bg-white/10 text-slate-400 hover:text-slate-200 transition"
                  >
                    {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Precise Answer Body */}
              {!isCollapsed && (
                <div className="space-y-3 pt-1">
                  {item.sections.map((sec, secIdx) => (
                    <div key={secIdx} className="space-y-1.5">
                      {sec.title && (
                        <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          {sec.title}
                        </h4>
                      )}
                      <ul className="space-y-1.5 text-xs text-slate-200 leading-relaxed pl-2">
                        {sec.points.map((pt, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">•</span>
                            <span className="flex-1">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* High-yield Takeaway pill */}
                  {item.keyTakeaway && (
                    <div className="mt-2 p-2.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/25 text-[11px] font-mono text-cyan-200 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item.keyTakeaway}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
