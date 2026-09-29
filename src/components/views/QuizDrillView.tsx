import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Wifi, 
  WifiOff, 
  RefreshCw,
  Info 
} from 'lucide-react';
import { getOrRegenerate20Questions } from '../../utils/quizManager';
import { QuizQuestion } from '../../types';
import { sound } from '../../utils/audio';

interface QuizDrillViewProps {
  initialTopicId?: string | null;
  onClearTopicFilter?: () => void;
  onViewTopic?: (topicId: string) => void;
}

export const QuizDrillView: React.FC<QuizDrillViewProps> = ({
  initialTopicId,
  onClearTopicFilter,
  onViewTopic,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Network & 30-min Auto-Regeneration states
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(1800); // 30 min in seconds

  // Load questions on mount
  useEffect(() => {
    const { questions: initial20, timeRemainingMs } = getOrRegenerate20Questions(false);
    setQuestions(initial20);
    setTimeRemainingSeconds(Math.floor(timeRemainingMs / 1000));
  }, []);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 30-minute interval countdown & auto-refresh
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          // 30 minutes expired while app is running -> regenerate!
          const { questions: fresh20 } = getOrRegenerate20Questions(true);
          setQuestions(fresh20);
          setCurrentIndex(0);
          setSelectedOption(null);
          setIsAnswered(false);
          setScore(0);
          setIsCompleted(false);
          sound.playSuccess();
          return 1800; // Reset to 30 mins
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleManualRegenerate = () => {
    sound.playClick();
    const { questions: fresh20 } = getOrRegenerate20Questions(true);
    setQuestions(fresh20);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
    setTimeRemainingSeconds(1800);
  };

  const currentQ: QuizQuestion = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      sound.playSuccess();
      setScore((s) => s + 1);
    } else {
      sound.playError();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  // Format mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="flex-1 pb-16 px-4 pt-10 text-center space-y-3">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Sampling 20 random CT questions...</p>
      </div>
    );
  }

  // Completed Results Screen
  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="flex-1 pb-20 px-4 pt-6 max-w-xl mx-auto space-y-4">
        <div className="glass-pebble p-6 text-center space-y-4 shadow-xl border border-white/15">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-3xl">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '✨' : '📚'}
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">
              {percentage >= 80 ? 'CT Exam Ready!' : percentage >= 60 ? 'Solid Understanding!' : 'Keep Practicing!'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              You scored <span className="font-bold text-cyan-400 font-mono">{score}</span> out of{' '}
              <span className="font-bold text-slate-200 font-mono">{questions.length}</span> ({percentage}%)
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 leading-relaxed text-left">
            <strong className="text-cyan-300 block mb-1">Performance Evaluation:</strong>
            {percentage >= 80 ? (
              <span>Outstanding! You have mastered the 11 Immune and Brain-Computer Interface core questions. Review the Precise Answers tab before entering the exam room.</span>
            ) : (
              <span>Good effort! Review the detailed answers and interactive simulations for the concepts you missed, then generate a fresh 20-question drill.</span>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={handleRestart}
              className="w-full py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Retake This 20-Question Set
            </button>

            <button
              onClick={handleManualRegenerate}
              className="w-full py-2.5 rounded-full glass-pill hover:bg-white/10 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 transition"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              Shuffle 20 Brand New Questions
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 pb-20 space-y-4 px-4 pt-3 max-w-xl mx-auto w-full">
      {/* Top Banner: 20 Questions Live Session Status & 30-min Timer */}
      <div className="glass-pebble p-3.5 border border-white/12 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-cyan-300 font-semibold">20-Q DYNAMIC DRILL</span>
          {isOnline ? (
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
              <Wifi className="w-3 h-3" /> Live
            </span>
          ) : (
            <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
              <WifiOff className="w-3 h-3" /> Offline
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Next in {formatTime(timeRemainingSeconds)}</span>
          </div>

          <button
            onClick={handleManualRegenerate}
            title="Generate a new set of 20 questions"
            className="p-1 rounded-lg glass-pill hover:bg-white/10 text-slate-400 hover:text-cyan-300 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress & Current Score */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-mono font-bold text-cyan-400">
          QUESTION {currentIndex + 1} OF {questions.length}
        </span>
        <span className="text-xs font-mono text-slate-300">
          Score: <strong className="text-cyan-400">{score}</strong> / {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-500 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="glass-pebble p-5 border border-white/15 space-y-4 shadow-lg">
        <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
          {currentQ.question}
        </h3>

        {/* Options list */}
        <div className="space-y-2">
          {currentQ.options.map((option, idx) => {
            const isCorrect = idx === currentQ.correctIndex;
            const isChosen = selectedOption === idx;

            let btnStyle = 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08] hover:border-white/20';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-sm shadow-emerald-500/20';
              } else if (isChosen) {
                btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
              } else {
                btnStyle = 'bg-white/[0.02] border-white/5 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-3 rounded-2xl border text-left text-xs font-medium transition flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[10px] font-mono shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isChosen && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Rationale & Takeaway */}
        {isAnswered && (
          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-cyan-300 block">Explanation:</span>
              <p className="text-[11px] leading-relaxed text-slate-400">{currentQ.explanation}</p>
            </div>

            <div className="p-2.5 rounded-full glass-pill border border-cyan-400/30 text-xs text-cyan-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
              <span className="truncate">
                <strong>Key Takeaway:</strong> {currentQ.keyTakeaway}
              </span>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition active:scale-[0.99]"
            >
              <span>{currentIndex + 1 === questions.length ? 'View Final Results' : 'Next Question ➔'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
