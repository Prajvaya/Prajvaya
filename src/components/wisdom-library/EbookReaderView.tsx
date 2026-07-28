"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  X, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  FastForward, 
  Sparkles, 
  Bookmark, 
  Highlighter, 
  Settings, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle2, 
  Music, 
  Share2, 
  List
} from "lucide-react";
import { Book, Chapter, ReaderSettings, ReaderTheme, ReaderFontFamily, HighlightItem } from "@/lib/wisdom-library/types";
import { userLibraryStore } from "@/lib/wisdom-library/user-library-store";
import { wisdomAudio, SoundscapeType } from "@/lib/wisdom-library/speech-synthesizer";

interface EbookReaderViewProps {
  book: Book;
  onClose: () => void;
}

export const EbookReaderView: React.FC<EbookReaderViewProps> = ({ book, onClose }) => {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [settings, setSettings] = useState<ReaderSettings>(userLibraryStore.getSettings());
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showChapterDrawer, setShowChapterDrawer] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  // Audio Playback States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [soundscape, setSoundscape] = useState<SoundscapeType>("none");

  // Selection & Annotation States
  const [selectedText, setSelectedText] = useState("");
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);

  // AI Reading Companion States
  const [aiMessages, setAiMessages] = useState<Array<{ sender: "user" | "ai"; content: string }>>([]);
  const [aiLoading, setAiLoading] = useState(false);

  // Quiz States
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentChapter: Chapter = book.chapters[currentChapterIdx] || book.chapters[0];
  const readerContentRef = useRef<HTMLDivElement | null>(null);

  // Load user progress
  useEffect(() => {
    const prog = userLibraryStore.getProgress(book.id);
    if (prog) {
      const idx = book.chapters.findIndex((c) => c.id === prog.lastChapterId);
      if (idx >= 0) setCurrentChapterIdx(idx);
    }
  }, [book]);

  // Save Progress
  useEffect(() => {
    userLibraryStore.saveProgress({
      bookId: book.id,
      lastChapterId: currentChapter.id,
      lastParagraphIndex: 0,
      percentageComplete: Math.round(((currentChapterIdx + 1) / book.chapters.length) * 100),
      lastReadAt: new Date().toISOString()
    });
  }, [book.id, currentChapterIdx, currentChapter.id, book.chapters.length]);

  // Handle Text Selection Popover
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 3) {
      const text = selection.toString().trim();
      setSelectedText(text);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setPopoverPos({
        x: rect.left + rect.width / 2,
        y: rect.top - 45
      });
    } else {
      setPopoverPos(null);
    }
  };

  // Audio Playback Controls
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      wisdomAudio.pause();
      setIsPlayingAudio(false);
    } else {
      wisdomAudio.speakText(
        currentChapter.content,
        (idx) => {
          setActiveSentenceIdx(idx);
        },
        () => {
          setIsPlayingAudio(false);
          setActiveSentenceIdx(null);
        },
        playbackSpeed
      );
      setIsPlayingAudio(true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (isPlayingAudio) {
      wisdomAudio.speakText(
        currentChapter.content,
        (idx) => setActiveSentenceIdx(idx),
        () => { setIsPlayingAudio(false); setActiveSentenceIdx(null); },
        speed
      );
    }
  };

  const handleSoundscapeChange = (st: SoundscapeType) => {
    setSoundscape(st);
    wisdomAudio.setSoundscape(st);
  };

  // Save Highlight
  const handleSaveHighlight = () => {
    if (!selectedText) return;
    userLibraryStore.addHighlight({
      bookId: book.id,
      chapterId: currentChapter.id,
      text: selectedText,
      color: "gold"
    });
    setPopoverPos(null);
    alert("Passage saved to your Personal Journal Highlights!");
  };

  // Save Bookmark
  const handleSaveBookmark = () => {
    userLibraryStore.addBookmark({
      bookId: book.id,
      chapterId: currentChapter.id,
      paragraphIndex: 0,
      title: `${book.title} - ${currentChapter.title}`
    });
    alert("Bookmark saved!");
  };

  // AI Companion Query Handler
  const handleAskAI = (promptType: string, customPrompt?: string) => {
    setShowAiAssistant(true);
    const textContext = selectedText || currentChapter.content.slice(0, 300);

    let queryText = customPrompt || "";
    if (promptType === "simple") queryText = `Explain this passage in simple English:\n"${textContext}"`;
    if (promptType === "examples") queryText = `Give 2 real-life modern examples of this teaching:\n"${textContext}"`;
    if (promptType === "apply") queryText = `How can I apply this teaching in my daily routine today?\n"${textContext}"`;
    if (promptType === "science") queryText = `Compare this teaching with modern scientific and psychological understanding:\n"${textContext}"`;

    setAiMessages((prev) => [...prev, { sender: "user", content: queryText }]);
    setAiLoading(true);
    setPopoverPos(null);

    // Call Prajvaya AI Route
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ sender: "user", content: queryText }],
        companionId: "parampara"
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setAiMessages((prev) => [...prev, { sender: "ai", content: data.reply || "No response generated." }]);
      })
      .catch(() => {
        setAiMessages((prev) => [...prev, { sender: "ai", content: "Apologies, unable to query AI companion right now." }]);
      })
      .finally(() => setAiLoading(false));
  };

  // Theme Styles Dictionary
  const THEME_CLASSES: Record<ReaderTheme, string> = {
    dark: "bg-charcoal text-cream border-gold/20",
    light: "bg-[#fbf9f4] text-[#1c1c1c] border-amber-900/20",
    sepia: "bg-[#f4ecd8] text-[#433422] border-amber-800/20",
    "high-contrast": "bg-black text-yellow-300 border-yellow-400"
  };

  const FONT_CLASSES: Record<ReaderFontFamily, string> = {
    serif: "font-serif",
    sans: "font-sans",
    dyslexic: "font-mono"
  };

  return (
    <div className={`fixed inset-0 z-[10000] flex flex-col ${THEME_CLASSES[settings.theme]} ${FONT_CLASSES[settings.fontFamily]} overflow-hidden`}>
      {/* Reader Top Navbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gold/15 bg-charcoal-dark/40 backdrop-blur-md shrink-0 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowChapterDrawer(!showChapterDrawer)}
            className="p-2 rounded-lg border border-gold/20 hover:bg-gold/10 text-gold smooth-transition cursor-pointer flex items-center gap-1 text-xs font-bold font-outfit"
          >
            <List size={16} />
            <span className="hidden sm:inline">Chapters ({currentChapterIdx + 1}/{book.chapters.length})</span>
          </button>

          <div className="flex flex-col">
            <h2 className="font-cinzel text-sm font-bold truncate max-w-[200px] sm:max-w-[350px]">
              {book.title}
            </h2>
            <span className="font-outfit text-[10px] text-gold uppercase tracking-wider">
              {currentChapter.title}
            </span>
          </div>
        </div>

        {/* Reader Action Controls */}
        <div className="flex items-center gap-2">
          {/* AI Assistant Button */}
          <button
            onClick={() => setShowAiAssistant(!showAiAssistant)}
            className="px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-charcoal-dark smooth-transition cursor-pointer flex items-center gap-1.5 text-xs font-bold font-outfit"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">AI Reader Companion</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleSaveBookmark}
            className="p-2 rounded-lg border border-gold/20 text-gold hover:bg-gold/10 smooth-transition cursor-pointer"
            title="Add Bookmark"
          >
            <Bookmark size={16} />
          </button>

          {/* Typography Settings Button */}
          <button
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            className="p-2 rounded-lg border border-gold/20 text-gold hover:bg-gold/10 smooth-transition cursor-pointer"
            title="Reader Display Settings"
          >
            <Settings size={16} />
          </button>

          {/* Close Reader */}
          <button
            onClick={() => {
              wisdomAudio.stop();
              wisdomAudio.setSoundscape("none");
              onClose();
            }}
            className="p-2 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-charcoal-dark smooth-transition cursor-pointer ml-2"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Reading Canvas & Side Panel Split */}
      <div className="flex-grow flex overflow-hidden relative" onMouseUp={handleTextSelection}>
        {/* Main Reading Scroll Area */}
        <div 
          ref={readerContentRef}
          className="flex-grow overflow-y-auto p-6 sm:p-12 md:p-16 flex flex-col items-center"
        >
          <div 
            className="w-full max-w-3xl space-y-6"
            style={{ 
              fontSize: `${settings.fontSizePx}px`, 
              lineHeight: settings.lineHeight, 
              paddingLeft: `${settings.marginWidthPx}px`, 
              paddingRight: `${settings.marginWidthPx}px` 
            }}
          >
            {/* Chapter Heading Banner */}
            <div className="text-center pb-8 border-b border-gold/15 mb-8">
              <span className="font-outfit text-xs font-bold text-gold uppercase tracking-[0.25em] block mb-2">
                Chapter {currentChapter.chapterNumber}
              </span>
              <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide">
                {currentChapter.title}
              </h1>
              {currentChapter.sanskritTitle && (
                <span className="font-yatra text-lg text-gold/80 block mt-2">
                  {currentChapter.sanskritTitle}
                </span>
              )}
            </div>

            {/* Chapter Content Paragraphs */}
            {currentChapter.content.split("\n\n").map((para, pIdx) => (
              <p key={pIdx} className="font-serif leading-relaxed text-justify relative">
                {para}
              </p>
            ))}

            {/* Chapter End Reflection & Interactive Quiz Section */}
            <div className="mt-16 pt-12 border-t border-gold/20 space-y-8 bg-charcoal-dark/40 p-6 sm:p-8 rounded-3xl">
              <div className="text-center">
                <span className="font-outfit text-xs font-bold text-gold uppercase tracking-[0.25em]">
                  Chapter Completion Reflection
                </span>
                <h3 className="font-cinzel text-xl font-bold text-cream mt-1">
                  Key Takeaways & Practice
                </h3>
              </div>

              {/* Key Lessons */}
              <div className="space-y-3">
                <h4 className="font-cinzel text-xs font-bold text-gold uppercase tracking-wider">
                  💡 Key Lessons
                </h4>
                <ul className="space-y-2 font-outfit text-xs text-cream/90 font-light list-disc pl-5">
                  {currentChapter.keyLessons.map((k, idx) => (
                    <li key={idx}>{k}</li>
                  ))}
                </ul>
              </div>

              {/* Reflection Prompts */}
              <div className="space-y-3">
                <h4 className="font-cinzel text-xs font-bold text-gold uppercase tracking-wider">
                  🤔 Reflection Questions
                </h4>
                <ul className="space-y-2 font-outfit text-xs text-cream/90 font-light list-disc pl-5">
                  {currentChapter.reflectionQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>

              {/* Optional Interactive Quiz */}
              {currentChapter.quiz && currentChapter.quiz.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-gold/15">
                  <h4 className="font-cinzel text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle size={14} />
                    <span>Quick Chapter Quiz</span>
                  </h4>

                  {currentChapter.quiz.map((qItem, qIdx) => (
                    <div key={qIdx} className="p-4 rounded-2xl bg-charcoal/60 border border-gold/15 space-y-3">
                      <p className="font-outfit text-xs font-bold text-cream">{qItem.question}</p>
                      <div className="space-y-2">
                        {qItem.options.map((opt, oIdx) => {
                          const isSelected = userQuizAnswers[qIdx] === oIdx;
                          const isCorrect = qItem.correctIndex === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => {
                                setUserQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                              }}
                              className={`w-full p-2.5 rounded-xl border text-xs font-outfit text-left smooth-transition cursor-pointer ${
                                isSelected
                                  ? isCorrect
                                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold"
                                    : "bg-rose-950/80 border-rose-500 text-rose-300"
                                  : "bg-charcoal-dark/40 border-gold/15 text-cream/80 hover:border-gold/40"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {userQuizAnswers[qIdx] !== undefined && (
                        <p className="text-[11px] font-outfit text-gold/90 bg-gold/10 p-2.5 rounded-lg border border-gold/20 mt-2">
                          {qItem.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation to Next Chapter */}
              <div className="flex items-center justify-between pt-6 border-t border-gold/15">
                <button
                  onClick={() => setCurrentChapterIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentChapterIdx === 0}
                  className="px-4 py-2 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-charcoal-dark text-xs font-bold font-outfit uppercase tracking-wider flex items-center gap-1 disabled:opacity-30 cursor-pointer"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setCurrentChapterIdx((prev) => Math.min(book.chapters.length - 1, prev + 1))}
                  disabled={currentChapterIdx === book.chapters.length - 1}
                  className="px-5 py-2 bg-gold hover:bg-gold-light text-charcoal-dark rounded-full text-xs font-bold font-outfit uppercase tracking-wider flex items-center gap-1 disabled:opacity-30 cursor-pointer shadow-md"
                >
                  <span>Next Chapter</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Text Selection Floating Popover Menu */}
        {popoverPos && (
          <div
            className="fixed z-[10002] bg-charcoal border border-gold/30 rounded-xl shadow-2xl p-1.5 flex items-center gap-1 select-none transform -translate-x-1/2"
            style={{ left: popoverPos.x, top: popoverPos.y }}
          >
            <button
              onClick={handleSaveHighlight}
              className="px-2.5 py-1 rounded bg-gold/10 hover:bg-gold text-gold hover:text-charcoal-dark text-xs font-bold font-outfit uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <Highlighter size={12} />
              <span>Highlight</span>
            </button>
            <button
              onClick={() => handleAskAI("simple")}
              className="px-2.5 py-1 rounded bg-gold/10 hover:bg-gold text-gold hover:text-charcoal-dark text-xs font-bold font-outfit uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <Sparkles size={12} />
              <span>Explain</span>
            </button>
            <button
              onClick={() => handleAskAI("apply")}
              className="px-2.5 py-1 rounded bg-gold/10 hover:bg-gold text-gold hover:text-charcoal-dark text-xs font-bold font-outfit uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 size={12} />
              <span>Apply</span>
            </button>
          </div>
        )}

        {/* AI Reading Companion Side Panel */}
        <AnimatePresence>
          {showAiAssistant && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-full sm:w-80 md:w-96 border-l border-gold/15 bg-charcoal-dark/95 flex flex-col shrink-0 text-cream z-10"
            >
              <div className="p-4 border-b border-gold/15 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gold">
                  <Sparkles size={18} />
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider">
                    AI Reading Mentor
                  </span>
                </div>
                <button
                  onClick={() => setShowAiAssistant(false)}
                  className="p-1 rounded-md text-cream/60 hover:text-cream bg-transparent border-none cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* AI Messages Stream */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 text-xs font-outfit bg-charcoal/40">
                {aiMessages.length === 0 ? (
                  <div className="space-y-3 py-6 text-center text-cream/60">
                    <HelpCircle size={24} className="mx-auto text-gold opacity-50" />
                    <p>Select any text or click a quick prompt below to ask the AI mentor about this chapter!</p>
                  </div>
                ) : (
                  aiMessages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl whitespace-pre-line leading-relaxed ${
                        m.sender === "user"
                          ? "bg-gold/15 border border-gold/30 text-cream text-right ml-6"
                          : "bg-charcoal border border-gold/15 text-cream/90 mr-6"
                      }`}
                    >
                      {m.content}
                    </div>
                  ))
                )}
                {aiLoading && (
                  <p className="text-[10px] text-gold italic animate-pulse">
                    Prajvaya mentor is analyzing context...
                  </p>
                )}
              </div>

              {/* Quick AI Prompts */}
              <div className="p-3 border-t border-gold/10 space-y-1.5 bg-charcoal-dark">
                {[
                  { label: "💡 Explain simply", type: "simple" },
                  { label: "🌟 Real-life examples", type: "examples" },
                  { label: "✅ How to apply today", type: "apply" },
                  { label: "🔬 Modern science link", type: "science" }
                ].map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskAI(qp.type)}
                    className="w-full text-left p-2 rounded-lg bg-charcoal border border-gold/15 text-[11px] font-outfit text-cream/80 hover:text-gold hover:border-gold/40 smooth-transition cursor-pointer"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audio Narrator & Soundscape Bottom Bar */}
      <div className="px-6 py-3 border-t border-gold/15 bg-charcoal-dark/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleAudio}
            className="h-10 w-10 rounded-full bg-gold hover:bg-gold-light text-charcoal-dark flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
          >
            {isPlayingAudio ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>

          <div className="flex flex-col">
            <span className="font-cinzel text-xs font-bold text-cream">
              Audiobook Narration
            </span>
            <span className="font-outfit text-[10px] text-gold uppercase tracking-wider">
              {isPlayingAudio ? "Playing • Sentence Synced" : "Paused"}
            </span>
          </div>
        </div>

        {/* Playback Speed Controls */}
        <div className="flex items-center gap-1.5 bg-charcoal/60 px-3 py-1.5 rounded-full border border-gold/15">
          <span className="font-outfit text-[10px] text-cream/60 uppercase font-bold mr-1">Speed:</span>
          {[0.75, 1.0, 1.25, 1.5].map((spd) => (
            <button
              key={spd}
              onClick={() => handleSpeedChange(spd)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold font-outfit smooth-transition cursor-pointer ${
                playbackSpeed === spd ? "bg-gold text-charcoal-dark" : "text-cream/60 hover:text-cream"
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>

        {/* Ambient Nature Soundscapes Selector */}
        <div className="flex items-center gap-2 bg-charcoal/60 px-3 py-1.5 rounded-full border border-gold/15">
          <Music size={14} className="text-gold" />
          <span className="font-outfit text-[10px] text-cream/60 uppercase font-bold">Ambient Sound:</span>
          {[
            { id: "none", label: "Off" },
            { id: "sitar", label: "Sitar Drone" },
            { id: "rain", label: "Forest Rain" },
            { id: "ocean", label: "Ocean Waves" }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => handleSoundscapeChange(st.id as any)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold font-outfit smooth-transition cursor-pointer ${
                soundscape === st.id ? "bg-gold text-charcoal-dark" : "text-cream/60 hover:text-cream"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Display Settings Drawer */}
      <AnimatePresence>
        {showSettingsDrawer && (
          <div className="fixed inset-0 z-[10003] flex items-center justify-center p-4 bg-charcoal-dark/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-charcoal border border-gold/30 rounded-3xl p-6 shadow-2xl relative text-cream space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gold/15">
                <div className="flex items-center gap-2 text-gold">
                  <Settings size={18} />
                  <h3 className="font-cinzel text-base font-bold uppercase tracking-wider">Display Typography</h3>
                </div>
                <button
                  onClick={() => setShowSettingsDrawer(false)}
                  className="p-1 rounded-md text-cream/60 hover:text-cream bg-transparent border-none cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Theme Picker */}
              <div className="space-y-2">
                <label className="font-outfit text-xs font-bold text-gold uppercase tracking-wider">Color Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "dark", label: "Dark Forest" },
                    { id: "light", label: "Cream Light" },
                    { id: "sepia", label: "Ancient Sepia" },
                    { id: "high-contrast", label: "High Contrast" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        const next = { ...settings, theme: t.id as ReaderTheme };
                        setSettings(next);
                        userLibraryStore.saveSettings(next);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-outfit cursor-pointer ${
                        settings.theme === t.id ? "border-gold bg-gold/15 text-gold font-bold" : "border-gold/15 text-cream/70"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family Picker */}
              <div className="space-y-2">
                <label className="font-outfit text-xs font-bold text-gold uppercase tracking-wider">Font Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "serif", label: "Classic Serif" },
                    { id: "sans", label: "Modern Sans" },
                    { id: "dyslexic", label: "Dyslexia Friendly" }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        const next = { ...settings, fontFamily: f.id as ReaderFontFamily };
                        setSettings(next);
                        userLibraryStore.saveSettings(next);
                      }}
                      className={`p-2 rounded-xl border text-xs font-outfit cursor-pointer ${
                        settings.fontFamily === f.id ? "border-gold bg-gold/15 text-gold font-bold" : "border-gold/15 text-cream/70"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-outfit">
                  <span className="font-bold text-gold uppercase tracking-wider">Font Size</span>
                  <span>{settings.fontSizePx}px</span>
                </div>
                <input
                  type="range"
                  min={14}
                  max={28}
                  value={settings.fontSizePx}
                  onChange={(e) => {
                    const next = { ...settings, fontSizePx: parseInt(e.target.value) };
                    setSettings(next);
                    userLibraryStore.saveSettings(next);
                  }}
                  className="w-full accent-gold cursor-pointer"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
