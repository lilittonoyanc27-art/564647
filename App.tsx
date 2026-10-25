import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  HelpCircle,
  Users,
  Eye,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Languages,
  Sparkles,
  ChevronRight,
  Award,
  BookOpen,
  Volume1,
  X,
  Menu,
} from 'lucide-react';
import { QUESTIONS, MONEY_LADDER, QuestionItem } from './questions.ts';
import { soundManager } from './audio.ts';

type GameState = 'INTRO' | 'PLAYING' | 'RESULTS';

interface UserAnswerRecord {
  questionId: number;
  chosenKey: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('INTRO');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord[]>([]);

  // Selected answer in current question
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // Translation states: separate toggles for question & individual options
  const [showQuestionArm, setShowQuestionArm] = useState<boolean>(false);
  const [showOptionArm, setShowOptionArm] = useState<{ [key: string]: boolean }>({
    A: false,
    B: false,
    C: false,
    D: false,
  });

  // Global toggle to reveal all Armenian at once
  const [allTranslationsActive, setAllTranslationsActive] = useState<boolean>(false);

  // Lifelines
  const [usedFiftyFifty, setUsedFiftyFifty] = useState<boolean>(false);
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);

  const [usedAudience, setUsedAudience] = useState<boolean>(false);
  const [audienceModalOpen, setAudienceModalOpen] = useState<boolean>(false);
  const [audienceVotes, setAudienceVotes] = useState<{ [key: string]: number }>({});

  const [usedTranslationLifeline, setUsedTranslationLifeline] = useState<boolean>(false);

  // Mobile Ladder Sidebar
  const [mobileLadderOpen, setMobileLadderOpen] = useState<boolean>(false);

  // Sound muted state
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());

  // Currency unit preference: '$' | '€' | '֏'
  const [currencySymbol, setCurrencySymbol] = useState<string>('€');

  const currentQ: QuestionItem = QUESTIONS[currentIdx];

  // Reset translations and lifelines state for each question
  useEffect(() => {
    if (gameState === 'PLAYING') {
      setSelectedKey(null);
      setIsAnswerLocked(false);
      setIsRevealed(false);
      setHiddenOptions([]);
      // If global bilingual mode is not forced, reset individual translations
      if (!allTranslationsActive) {
        setShowQuestionArm(false);
        setShowOptionArm({ A: false, B: false, C: false, D: false });
      } else {
        setShowQuestionArm(true);
        setShowOptionArm({ A: true, B: true, C: true, D: true });
      }
    }
  }, [currentIdx, gameState, allTranslationsActive]);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleStartGame = () => {
    setCurrentIdx(0);
    setUserAnswers([]);
    setSelectedKey(null);
    setIsAnswerLocked(false);
    setIsRevealed(false);
    setUsedFiftyFifty(false);
    setUsedAudience(false);
    setUsedTranslationLifeline(false);
    setHiddenOptions([]);
    setGameState('PLAYING');
    soundManager.playLifeline();
  };

  // Text-To-Speech for Spanish practice
  const speakSpanish = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Lifeline 1: 50:50
  const applyFiftyFifty = () => {
    if (usedFiftyFifty || isAnswerLocked || isRevealed) return;
    soundManager.playLifeline();
    const wrongKeys = currentQ.options
      .filter((opt) => opt.key !== currentQ.correctKey)
      .map((opt) => opt.key);

    // Shuffle and pick 2 wrong keys to hide
    const shuffled = [...wrongKeys].sort(() => 0.5 - Math.random());
    const toHide = shuffled.slice(0, 2);
    setHiddenOptions(toHide);
    setUsedFiftyFifty(true);
  };

  // Lifeline 2: Audience Poll
  const applyAudience = () => {
    if (usedAudience || isAnswerLocked || isRevealed) return;
    soundManager.playLifeline();
    const correct = currentQ.correctKey;
    const votes: { [key: string]: number } = { A: 0, B: 0, C: 0, D: 0 };

    // Audience favors correct sensible answer with 60-78%
    const correctPct = Math.floor(Math.random() * 19) + 60;
    votes[correct] = correctPct;

    const remaining = 100 - correctPct;
    const otherKeys = (['A', 'B', 'C', 'D'] as const).filter((k) => k !== correct);
    const r1 = Math.floor(Math.random() * (remaining - 10)) + 3;
    const r2 = Math.floor(Math.random() * (remaining - r1 - 5)) + 2;
    const r3 = remaining - r1 - r2;

    votes[otherKeys[0]] = r1;
    votes[otherKeys[1]] = r2;
    votes[otherKeys[2]] = r3;

    setAudienceVotes(votes);
    setUsedAudience(true);
    setAudienceModalOpen(true);
  };

  // Lifeline 3: Translation Lifeline (reveals Armenian for everything on this question)
  const applyTranslationLifeline = () => {
    if (usedTranslationLifeline || isAnswerLocked || isRevealed) return;
    soundManager.playLifeline();
    setShowQuestionArm(true);
    setShowOptionArm({ A: true, B: true, C: true, D: true });
    setUsedTranslationLifeline(true);
  };

  // Toggle individual question translation
  const toggleQuestionTranslation = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowQuestionArm((prev) => !prev);
  };

  // Toggle individual option translation
  const toggleOptionTranslation = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptionArm((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Global toggle for all translations
  const toggleAllTranslations = () => {
    const nextVal = !allTranslationsActive;
    setAllTranslationsActive(nextVal);
    setShowQuestionArm(nextVal);
    setShowOptionArm({ A: nextVal, B: nextVal, C: nextVal, D: nextVal });
  };

  // User chooses an option
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerLocked || isRevealed) return;
    setSelectedKey(key);
    setIsAnswerLocked(true);
    soundManager.playSelect();
    soundManager.playSuspense();

    // After 1.3 seconds of suspense, reveal the result!
    setTimeout(() => {
      setIsRevealed(true);
      const isCorrect = key === currentQ.correctKey;
      if (isCorrect) {
        soundManager.playCorrect();
      } else {
        soundManager.playWrong();
      }

      setUserAnswers((prev) => [
        ...prev,
        {
          questionId: currentQ.id,
          chosenKey: key,
          isCorrect,
        },
      ]);
    }, 1300);
  };

  // Move to the next question (or results if last)
  const handleNextQuestion = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      soundManager.playGrandWin();
      setGameState('RESULTS');
    }
  };

  // Calculate current score & prize
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const currentPrize =
    currentIdx > 0
      ? userAnswers[currentIdx - 1]?.isCorrect
        ? MONEY_LADDER[currentIdx - 1]?.prize
        : calculateSafeHaven(userAnswers)
      : '0';

  function calculateSafeHaven(records: UserAnswerRecord[]) {
    let safe = '0';
    records.forEach((rec, idx) => {
      if (rec.isCorrect) {
        const ladderItem = MONEY_LADDER[idx];
        if (ladderItem && ladderItem.isSafe) {
          safe = ladderItem.prize;
        }
      }
    });
    return safe;
  }

  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 flex flex-col font-sans select-none relative overflow-x-hidden">
      {/* Dynamic Background Studio Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/20 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-indigo-500/15 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-amber-500/10 blur-[160px] rounded-full" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-20 flex items-center justify-between gap-4 px-4 sm:px-8 py-3 bg-[#070f26]/90 border-b border-blue-900/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 shadow-md flex items-center justify-center">
            <span className="text-sm font-black text-slate-950">1M</span>
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-wide bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 bg-clip-text text-transparent">
              ¿Quién quiere ser millonario?
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-blue-300/80 font-medium">
              Condicional Simple · Հայերեն / Español
            </span>
          </div>
        </div>

        {/* Currency & Audio & Ladder toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center bg-blue-950/60 border border-blue-800/60 rounded-lg p-0.5 text-xs font-semibold">
            {(['€', '$', '֏'] as const).map((sym) => (
              <button
                key={sym}
                onClick={() => setCurrencySymbol(sym)}
                className={`px-2 py-1 rounded transition-colors ${
                  currencySymbol === sym
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-blue-200 hover:text-white'
                }`}
                title={`Փոխել արժույթը (${sym})`}
              >
                {sym}
              </button>
            ))}
          </div>

          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-blue-950/70 border border-blue-800/60 hover:bg-blue-900 text-amber-300 transition-colors"
            title={isMuted ? 'Միացնել ձայնը' : 'Անջատել ձայնը'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {gameState === 'PLAYING' && (
            <button
              onClick={() => setMobileLadderOpen(!mobileLadderOpen)}
              className="lg:hidden p-2 rounded-lg bg-blue-950/70 border border-blue-800/60 text-amber-300 hover:bg-blue-900"
              title="Միավորների սանդուղք"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8">
        {gameState === 'INTRO' && (
          <div className="max-w-3xl mx-auto w-full text-center space-y-6 sm:space-y-8 py-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-200 text-xs sm:text-sm font-medium tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Nivel A2–B1 · 15 նոր հարց · Իսպաներեն և Հայերեն</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                🎯 ¿Qué harías en esta situación?
              </h1>
              <p className="text-lg sm:text-2xl text-amber-300 font-medium">
                Ի՞նչ կանեիր այս իրավիճակում։
              </p>
            </div>

            {/* Instruction Card */}
            <div className="bg-gradient-to-b from-[#0b1636] to-[#071026] border border-blue-700/50 rounded-2xl p-5 sm:p-8 shadow-2xl text-left space-y-5">
              <h2 className="text-base sm:text-lg font-bold text-amber-200 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                Խաղի կանոնները և առանձնահատկությունները
              </h2>

              <ul className="space-y-3.5 text-sm sm:text-base text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-xs mt-0.5">
                    1
                  </span>
                  <span>
                    <strong>15 իրավիճակային հարց</strong> Condicional Simple (-ía, -ías, -íamos)
                    քերականությամբ։ Յուրաքանչյուր հարց ունի 4 տարբերակ, որոնցից միայն մեկն է
                    ամենախելամիտը, իսկ մյուսները՝ զվարճալի կամ անսպասելի։
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-xs mt-0.5">
                    2
                  </span>
                  <span>
                    <strong>Հայերեն թարգմանություն՝ ըստ ցանկության.</strong> Հարցի և պատասխանի
                    տարբերակների վրա սեղմելով կարող ես առանձին-առանձին բացել դրանց հայերեն
                    թարգմանությունը (կամ սովորել նախ իսպաներենով)։
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold text-xs mt-0.5">
                    3
                  </span>
                  <span>
                    <strong>Անընդհատ խաղ.</strong> Եթե ընտրես ոչ ճիշտ տարբերակը, խաղը ՉԻ ընդհատվում:
                    Դու կտեսնես բացատրությունը և կշարունակես առաջ գնալ մինչև 15-րդ հարցը:
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center justify-center font-bold text-xs mt-0.5">
                    4
                  </span>
                  <span>
                    <strong>Հուշումներ (Lifelines).</strong> 50:50 (հեռացնում է 2 տարբերակ),
                    Լսարանի օգնություն և Բոլոր թարգմանությունների ակնթարթային բացում:
                  </span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleStartGame}
              className="px-8 sm:px-12 py-4 rounded-xl font-black text-lg sm:text-xl text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all transform active:scale-95 inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Սկսել խաղը · Comenzar juego</span>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
            {/* Left Area: Question, Options, Lifelines & Controls (8 cols) */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              {/* Top Sub-Bar: Lifelines & Quick Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#08122c] border border-blue-800/40 rounded-xl p-3">
                {/* Lifeline Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-300/80 mr-1 hidden sm:inline">Հուշումներ:</span>

                  {/* 50:50 */}
                  <button
                    onClick={applyFiftyFifty}
                    disabled={usedFiftyFifty || isAnswerLocked || isRevealed}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      usedFiftyFifty
                        ? 'opacity-30 border-slate-700 bg-slate-900 text-slate-500 cursor-not-allowed line-through'
                        : 'border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 active:scale-95'
                    }`}
                    title="50:50 · Հեռացնել 2 զվարճալի սխալ տարբերակ"
                  >
                    <span>50 : 50</span>
                  </button>

                  {/* Audience Poll */}
                  <button
                    onClick={applyAudience}
                    disabled={usedAudience || isAnswerLocked || isRevealed}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      usedAudience
                        ? 'opacity-30 border-slate-700 bg-slate-900 text-slate-500 cursor-not-allowed line-through'
                        : 'border-blue-500/60 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 active:scale-95'
                    }`}
                    title="Լսարանի օգնություն"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Լսարան</span>
                  </button>

                  {/* Translation Lifeline */}
                  <button
                    onClick={applyTranslationLifeline}
                    disabled={usedTranslationLifeline || isAnswerLocked || isRevealed}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      usedTranslationLifeline
                        ? 'opacity-30 border-slate-700 bg-slate-900 text-slate-500 cursor-not-allowed line-through'
                        : 'border-emerald-500/60 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 active:scale-95'
                    }`}
                    title="Բացել բոլոր թարգմանությունները"
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Հուշում-թարգմանություն</span>
                  </button>
                </div>

                {/* Right side of sub-bar: Global Bilingual Mode Toggle & Question progress */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleAllTranslations}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      allTranslationsActive
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                        : 'bg-blue-950/60 text-blue-200 border-blue-800/60 hover:bg-blue-900'
                    }`}
                    title="Բացել կամ փակել բոլոր հայերեն թարգմանությունները"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{allTranslationsActive ? '🇦🇲 Թարգմանված է' : '🇦🇲 Թարգմանել բոլորը'}</span>
                  </button>

                  <div className="text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1.5 rounded-md">
                    Հարց {currentIdx + 1} / 15
                  </div>
                </div>
              </div>

              {/* Question Card */}
              <div className="relative rounded-2xl p-5 sm:p-7 bg-gradient-to-b from-[#0a1638] via-[#091432] to-[#070e24] border-2 border-amber-400/60 shadow-[0_0_30px_rgba(59,130,246,0.18)]">
                {/* Header within question card: Title & Speech */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-blue-900/60 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-700/60 text-blue-300 font-bold">
                      {currentQ.id}. {currentQ.titleEs}
                    </span>
                    <span className="text-slate-400 hidden sm:inline">·</span>
                    <span className="text-slate-300 hidden sm:inline">{currentQ.titleArm}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Listen to Question in Spanish */}
                    <button
                      onClick={(e) => speakSpanish(currentQ.questionEs, e)}
                      className="p-1.5 rounded-md bg-blue-900/40 hover:bg-blue-800 text-amber-300 border border-blue-700/50 flex items-center gap-1 transition-colors"
                      title="Լսել իսպաներենով"
                    >
                      <Volume1 className="w-4 h-4" />
                      <span className="text-[11px] hidden sm:inline">Լսել</span>
                    </button>

                    {/* Toggle Armenian Translation for Question */}
                    <button
                      onClick={toggleQuestionTranslation}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                        showQuestionArm
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/60'
                          : 'bg-blue-900/30 text-blue-200 border-blue-700/50 hover:bg-blue-900/60'
                      }`}
                      title="Սեղմեք հայերեն թարգմանությունը տեսնելու համար"
                    >
                      <span>🇦🇲</span>
                      <span>{showQuestionArm ? 'Փակել թարգմանությունը' : 'Թարգմանել'}</span>
                    </button>
                  </div>
                </div>

                {/* Question Spanish Content */}
                <div
                  onClick={() => setShowQuestionArm((prev) => !prev)}
                  className="py-4 cursor-pointer group"
                  title="Սեղմիր այստեղ հայերեն թարգմանությունը բացելու համար"
                >
                  <p className="text-base sm:text-xl font-semibold text-white leading-relaxed tracking-wide group-hover:text-amber-100 transition-colors">
                    {currentQ.questionEs}
                  </p>
                  {!showQuestionArm && (
                    <div className="mt-2 text-xs text-blue-400/80 flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Սեղմեք այստեղ կամ «Թարգմանել» կոճակը հայերեն տարբերակը տեսնելու համար</span>
                    </div>
                  )}
                </div>

                {/* Armenian Translation Box for Question (Smooth expandable) */}
                {showQuestionArm && (
                  <div className="mt-2 p-3.5 bg-blue-950/70 border border-amber-500/30 rounded-xl text-amber-100 text-sm sm:text-base leading-relaxed animate-in fade-in duration-200">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span>🇦🇲 Հայերեն թարգմանություն</span>
                    </div>
                    {currentQ.questionArm}
                  </div>
                )}
              </div>

              {/* Answer Options Grid (4 options) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentQ.options.map((opt) => {
                  const isHidden = hiddenOptions.includes(opt.key);
                  const isSelected = selectedKey === opt.key;
                  const isCorrect = opt.key === currentQ.correctKey;
                  const isArmenianShown = showOptionArm[opt.key] || allTranslationsActive;

                  if (isHidden) {
                    return (
                      <div
                        key={opt.key}
                        className="h-28 rounded-xl border border-dashed border-blue-900/30 bg-[#060c1d]/30 opacity-20 flex items-center justify-center text-slate-600 font-bold"
                      >
                        {opt.key} (50:50)
                      </div>
                    );
                  }

                  // Styling logic based on game state
                  let cardStyles =
                    'border-blue-700/60 bg-[#08122c] hover:bg-[#0c1a40] hover:border-amber-400/80 text-white cursor-pointer';

                  if (isAnswerLocked && isSelected && !isRevealed) {
                    cardStyles =
                      'border-amber-400 bg-amber-500/20 text-amber-100 animate-pulse-glow cursor-wait';
                  } else if (isRevealed) {
                    if (isCorrect) {
                      cardStyles =
                        'border-emerald-400 bg-emerald-950/80 text-emerald-100 animate-pulse-correct shadow-[0_0_20px_rgba(34,197,94,0.4)]';
                    } else if (isSelected && !isCorrect) {
                      cardStyles =
                        'border-rose-500 bg-rose-950/80 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.4)]';
                    } else {
                      cardStyles = 'border-blue-900/40 bg-[#060d21]/60 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`relative flex flex-col justify-between p-4 rounded-xl border-2 transition-all transform active:scale-[0.99] min-h-[115px] ${cardStyles}`}
                    >
                      {/* Top row of Option: Key & Action Buttons */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm border ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-500 border-emerald-300 text-slate-950'
                                : isRevealed && isSelected && !isCorrect
                                  ? 'bg-rose-500 border-rose-300 text-white'
                                  : isSelected
                                    ? 'bg-amber-400 border-amber-200 text-slate-950'
                                    : 'bg-blue-950 border-blue-700/80 text-amber-300'
                            }`}
                          >
                            {opt.key}
                          </span>

                          {/* Sound button for option */}
                          <button
                            onClick={(e) => speakSpanish(opt.es, e)}
                            className="p-1 rounded text-blue-300/70 hover:text-amber-300 transition-colors"
                            title="Լսել տարբերակը իսպաներենով"
                          >
                            <Volume1 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Dedicated Translation button for this specific option */}
                        <button
                          onClick={(e) => toggleOptionTranslation(opt.key, e)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border flex items-center gap-1 transition-colors ${
                            isArmenianShown
                              ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                              : 'bg-blue-950/80 text-blue-300 border-blue-800 hover:border-amber-400/60 hover:text-white'
                          }`}
                          title="Սեղմեք այս տարբերակի հայերեն թարգմանությունը տեսնելու համար"
                        >
                          <span>🇦🇲</span>
                          <span>{isArmenianShown ? 'Հայ.' : 'Թարգմ.'}</span>
                        </button>
                      </div>

                      {/* Spanish Option Text */}
                      <div className="my-2 text-sm sm:text-base font-medium leading-snug">
                        {opt.es}
                      </div>

                      {/* Armenian Option Translation (Individual Toggle) */}
                      {isArmenianShown && (
                        <div className="mt-1 pt-2 border-t border-blue-900/50 text-xs sm:text-sm text-amber-200/90 leading-relaxed bg-blue-950/40 p-2 rounded-lg">
                          <div className="text-[10px] uppercase font-bold text-amber-400/80 tracking-wider">
                            Հայերեն:
                          </div>
                          {opt.arm}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Feedback & Continue Banner (Shown after reveal!) */}
              {isRevealed && (
                <div
                  className={`p-5 rounded-2xl border-2 transition-all space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    selectedKey === currentQ.correctKey
                      ? 'bg-emerald-950/60 border-emerald-500/70 text-emerald-100 shadow-[0_0_25px_rgba(34,197,94,0.25)]'
                      : 'bg-blue-950/80 border-amber-500/70 text-slate-100 shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        {selectedKey === currentQ.correctKey ? (
                          <>
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            <h3 className="text-lg sm:text-xl font-black text-emerald-300">
                              🎉 ¡Correcto! Ճիշտ պատասխան է:
                            </h3>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-6 h-6 text-amber-400" />
                            <h3 className="text-lg sm:text-xl font-black text-amber-300">
                              ⚠️ Սխալ է, բայց խաղը շարունակվում է:
                            </h3>
                          </>
                        )}
                      </div>

                      {/* Grammar Note and Explanation */}
                      <div className="text-sm space-y-1.5 pt-1">
                        <div className="font-semibold text-amber-200">
                          {selectedKey !== currentQ.correctKey && (
                            <span className="block text-slate-200 mb-1">
                              Ճիշտ և ամենախելամիտ տարբերակն է՝{' '}
                              <strong className="text-emerald-300">
                                {currentQ.correctKey}){' '}
                                {currentQ.options.find((o) => o.key === currentQ.correctKey)?.es}
                              </strong>
                            </span>
                          )}
                          <span>💡 {currentQ.explanationArm}</span>
                        </div>
                        <div className="text-xs text-blue-200/80">
                          <span>🇪🇸 {currentQ.explanationEs}</span> ·{' '}
                          <span className="text-amber-300 font-medium">
                            Քերականություն՝ {currentQ.grammarFocus}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      className="flex-shrink-0 px-6 py-3 rounded-xl font-extrabold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>
                        {currentIdx === QUESTIONS.length - 1
                          ? 'Տեսնել արդյունքները'
                          : 'Հաջորդ հարցը'}
                      </span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Area: Money Ladder (4 cols on desktop) */}
            <div className="hidden lg:block lg:col-span-4 bg-[#070e24] border-2 border-blue-900/60 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-blue-900/40">
                <span className="font-extrabold text-xs tracking-wider text-amber-400 uppercase">
                  Մրցանակային սանդուղք
                </span>
                <span className="text-xs font-semibold text-blue-300">
                  Բանկ՝ {currentPrize} {currencySymbol}
                </span>
              </div>

              {/* Ladder list */}
              <div className="space-y-1">
                {MONEY_LADDER.slice()
                  .reverse()
                  .map((item) => {
                    const stepIdx = item.level - 1;
                    const isCurrent = stepIdx === currentIdx;
                    const isPast = stepIdx < currentIdx;
                    const record = userAnswers[stepIdx];
                    const wasCorrect = record?.isCorrect;

                    let bgClass = 'text-blue-300/60 bg-transparent';
                    if (isCurrent) {
                      bgClass =
                        'bg-gradient-to-r from-amber-500/30 to-amber-400/10 border border-amber-400/80 text-amber-200 font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]';
                    } else if (isPast) {
                      if (wasCorrect) {
                        bgClass = 'text-emerald-400 font-medium bg-emerald-950/20';
                      } else {
                        bgClass = 'text-slate-400 font-normal bg-blue-950/20';
                      }
                    }

                    return (
                      <div
                        key={item.level}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all ${bgClass}`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 text-right font-mono ${
                              item.isSafe ? 'text-amber-400 font-bold' : 'text-slate-400'
                            }`}
                          >
                            {item.level}
                          </span>
                          {isPast ? (
                            wasCorrect ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-rose-400" />
                            )
                          ) : (
                            <span className="w-3.5 h-3.5 inline-block text-center text-slate-600">
                              ◆
                            </span>
                          )}
                        </div>

                        <span
                          className={`font-mono font-bold tracking-wider ${
                            item.isSafe ? 'text-amber-300' : 'text-slate-200'
                          }`}
                        >
                          {item.prize} {currencySymbol}
                        </span>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-4 pt-3 border-t border-blue-900/40 text-[11px] text-blue-300/70 text-center">
                <span>Ապահով շեմեր՝ $1.000 (Հարց 5) · $32.000 (Հարց 10)</span>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS SCREEN */}
        {gameState === 'RESULTS' && (
          <div className="max-w-4xl mx-auto w-full space-y-8 py-4">
            {/* Header score card */}
            <div className="text-center space-y-4 bg-gradient-to-b from-[#0a1840] to-[#070f28] border-2 border-amber-400/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-yellow-200 flex items-center justify-center shadow-lg text-slate-950">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-4xl font-black text-white">
                  Խաղն ավարտվեց! ¡Juego terminado!
                </h2>
                <p className="text-sm sm:text-base text-blue-200">
                  Դուք պատասխանեցիք բոլոր 15 հարցերին Condicional Simple քերականությամբ:
                </p>
              </div>

              {/* Score and Prize badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                <div className="bg-blue-950/80 border border-blue-700/60 rounded-2xl px-6 py-3.5 text-center">
                  <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider">
                    Ճիշտ պատասխաններ
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                    {correctCount} / 15
                  </div>
                </div>

                <div className="bg-blue-950/80 border border-amber-500/60 rounded-2xl px-6 py-3.5 text-center">
                  <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                    Շահած գումար
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">
                    {correctCount === 15 ? '1.000.000' : currentPrize} {currencySymbol}
                  </div>
                </div>
              </div>

              {/* Action: Play Again */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleStartGame}
                  className="px-8 py-3.5 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Խաղալ նորից · Jugar de nuevo</span>
                </button>
              </div>
            </div>

            {/* Detailed Question Review List */}
            <div className="bg-[#070e24] border border-blue-900/60 rounded-2xl p-5 sm:p-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
                <h3 className="font-extrabold text-base sm:text-lg text-amber-300 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>Բոլոր 15 հարցերի և բայերի վերլուծություն</span>
                </h3>
                <span className="text-xs text-blue-300 font-semibold">
                  Condicional Simple սովորելու ամփոփագիր
                </span>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {QUESTIONS.map((q) => {
                  const userAns = userAnswers.find((a) => a.questionId === q.id);
                  const isUserCorrect = userAns?.isCorrect;
                  const correctOpt = q.options.find((o) => o.key === q.correctKey);

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-sm space-y-2 transition-colors ${
                        isUserCorrect
                          ? 'bg-emerald-950/20 border-emerald-600/40'
                          : 'bg-blue-950/30 border-blue-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span className="text-amber-400">#{q.id}</span>
                          <span>{q.titleEs}</span>
                          <span className="text-xs text-slate-400">({q.titleArm})</span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {isUserCorrect ? (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Ճիշտ
                            </span>
                          ) : (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Ընտրել էիք՝ {userAns?.chosenKey}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-slate-300 text-xs sm:text-sm">
                        <div className="text-white font-medium">🇪🇸 {q.questionEs}</div>
                        <div className="text-amber-200/80">🇦🇲 {q.questionArm}</div>
                      </div>

                      <div className="pt-1 text-xs border-t border-blue-900/30 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <strong className="text-emerald-300">
                            Ճիշտ պատասխան: {q.correctKey})
                          </strong>{' '}
                          <span className="text-slate-200">{correctOpt?.es}</span>
                          <span className="text-slate-400 block sm:inline sm:ml-2">
                            ({correctOpt?.arm})
                          </span>
                        </div>
                        <div className="text-amber-300 font-mono text-[11px] bg-amber-400/10 px-2 py-0.5 rounded">
                          {q.grammarFocus}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Money Ladder Modal/Drawer */}
      {mobileLadderOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-sm h-full bg-[#070e24] border-l border-blue-800 p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-800">
                <span className="font-extrabold text-sm text-amber-400 uppercase">
                  Մրցանակային սանդուղք
                </span>
                <button
                  onClick={() => setMobileLadderOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {MONEY_LADDER.slice()
                  .reverse()
                  .map((item) => {
                    const stepIdx = item.level - 1;
                    const isCurrent = stepIdx === currentIdx;
                    const isPast = stepIdx < currentIdx;
                    const wasCorrect = userAnswers[stepIdx]?.isCorrect;

                    return (
                      <div
                        key={item.level}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-mono ${
                          isCurrent
                            ? 'bg-amber-400/20 border border-amber-400 text-amber-200 font-bold'
                            : isPast
                              ? wasCorrect
                                ? 'text-emerald-400 bg-emerald-950/20'
                                : 'text-slate-400'
                              : 'text-slate-400'
                        }`}
                      >
                        <span>
                          {item.level}. {item.prize} {currencySymbol}
                        </span>
                        {item.isSafe && (
                          <span className="text-[10px] text-amber-400 font-bold">Ապահով</span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            <button
              onClick={() => setMobileLadderOpen(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-900 text-white font-bold text-sm"
            >
              Փակել
            </button>
          </div>
        </div>
      )}

      {/* Audience Poll Modal */}
      {audienceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0a1435] border-2 border-blue-500 rounded-2xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-blue-800 pb-3">
              <div className="flex items-center gap-2 text-blue-300 font-bold">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Լսարանի օգնություն · Resultados del público</span>
              </div>
              <button
                onClick={() => setAudienceModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Իսպանախոս լսարանի քվեարկության արդյունքները տվյալ հարցի համար.
            </p>

            {/* Poll bar chart */}
            <div className="space-y-3 pt-2">
              {(['A', 'B', 'C', 'D'] as const).map((key) => {
                const pct = audienceVotes[key] || 0;
                const isCorrect = key === currentQ.correctKey;
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className={isCorrect ? 'text-emerald-400' : 'text-slate-200'}>
                        {key}: {pct}%
                      </span>
                      <span className="text-slate-400 text-[11px] truncate max-w-[240px]">
                        {currentQ.options.find((o) => o.key === key)?.es}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-blue-950 rounded-full overflow-hidden border border-blue-800">
                      <div
                        className={`h-full transition-all duration-700 ${
                          isCorrect
                            ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                            : 'bg-gradient-to-r from-blue-600 to-blue-400'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setAudienceModalOpen(false)}
              className="w-full py-2.5 rounded-xl font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors"
            >
              Հասկացա · Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
