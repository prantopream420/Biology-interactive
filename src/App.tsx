import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CT_TOPICS } from './data/ctTopics';
import { CTTopic } from './types';
import { sound } from './utils/audio';

import { AndroidFrame } from './components/AndroidFrame';
import { AndroidTopBar } from './components/AndroidTopBar';
import { BottomNavBar, NavTab } from './components/BottomNavBar';

import { HomeDashboardView } from './components/views/HomeDashboardView';
import { TopicsListView } from './components/views/TopicsListView';
import { TopicDetailView } from './components/views/TopicDetailView';
import { PreciseAnswersView } from './components/views/PreciseAnswersView';
import { SimulationsHubView } from './components/views/SimulationsHubView';
import { QuizDrillView } from './components/views/QuizDrillView';
import { QuickCheatSheetView } from './components/views/QuickCheatSheetView';

interface NavState {
  tab: NavTab;
  selectedTopicId: string | null;
}

export default function App() {
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedTopic, setSelectedTopic] = useState<CTTopic | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quizTopicFilter, setQuizTopicFilter] = useState<string | null>(null);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  // Sequential navigation stack
  const navStackRef = useRef<NavState[]>([{ tab: 'home', selectedTopicId: null }]);
  const isNavigatingBackRef = useRef<boolean>(false);

  // Bookmarks state (persistent in localStorage if available)
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('neuroimmune_bookmarks');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set(['motor-neuron-ap', 'nk-cells', 'mrna-vaccine-advantages']);
  });

  // Push new state to navigation stack and browser history
  const pushNavigation = useCallback((tab: NavTab, topicId: string | null = null) => {
    const currentState = navStackRef.current[navStackRef.current.length - 1];
    if (currentState && currentState.tab === tab && currentState.selectedTopicId === topicId) {
      return; // Avoid duplicate consecutive states
    }

    const nextState: NavState = { tab, selectedTopicId: topicId };
    navStackRef.current.push(nextState);

    // Sync with browser history for mobile hardware back button
    try {
      window.history.pushState(nextState, '');
    } catch {}
  }, []);

  // Back navigation function (moves sequentially backwards until Home)
  const handleGoBack = useCallback(() => {
    // If inside a topic detail view, exit topic detail first
    if (selectedTopic) {
      sound.playClick();
      setSelectedTopic(null);
      // Remove current top from stack
      if (navStackRef.current.length > 1) {
        navStackRef.current.pop();
        const prev = navStackRef.current[navStackRef.current.length - 1];
        if (prev) {
          setActiveTab(prev.tab);
        }
      }
      return;
    }

    // If on a sub-menu or another tab, pop to previous tab
    if (navStackRef.current.length > 1) {
      sound.playClick();
      navStackRef.current.pop(); // Pop current
      const targetState = navStackRef.current[navStackRef.current.length - 1];
      if (targetState) {
        setActiveTab(targetState.tab);
        if (targetState.selectedTopicId) {
          const t = CT_TOPICS.find((item) => item.id === targetState.selectedTopicId);
          setSelectedTopic(t || null);
        } else {
          setSelectedTopic(null);
        }
      }
    } else if (activeTab !== 'home') {
      // Direct jump to Home if stack was shallow
      sound.playClick();
      setActiveTab('home');
      setSelectedTopic(null);
      navStackRef.current = [{ tab: 'home', selectedTopicId: null }];
    }
  }, [selectedTopic, activeTab]);

  // Listen to browser / Android hardware back button (popstate event)
  useEffect(() => {
    // Initialize base history state
    try {
      window.history.replaceState({ tab: 'home', selectedTopicId: null }, '');
    } catch {}

    const handlePopState = (e: PopStateEvent) => {
      isNavigatingBackRef.current = true;
      if (selectedTopic) {
        setSelectedTopic(null);
        if (navStackRef.current.length > 1) {
          navStackRef.current.pop();
          const prev = navStackRef.current[navStackRef.current.length - 1];
          if (prev) setActiveTab(prev.tab);
        }
      } else if (navStackRef.current.length > 1) {
        navStackRef.current.pop();
        const target = navStackRef.current[navStackRef.current.length - 1];
        if (target) {
          setActiveTab(target.tab);
          if (target.selectedTopicId) {
            const t = CT_TOPICS.find((item) => item.id === target.selectedTopicId);
            setSelectedTopic(t || null);
          } else {
            setSelectedTopic(null);
          }
        }
      } else {
        setActiveTab('home');
        setSelectedTopic(null);
      }
      setTimeout(() => {
        isNavigatingBackRef.current = false;
      }, 50);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedTopic]);

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('neuroimmune_bookmarks', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const handleToggleSound = () => {
    const next = !isSoundOn;
    setIsSoundOn(next);
    sound.enabled = next;
  };

  // User tab selection
  const handleTabChange = (tab: NavTab) => {
    setSelectedTopic(null);
    setActiveTab(tab);
    pushNavigation(tab, null);
  };

  // User topic selection
  const handleSelectTopic = (topic: CTTopic) => {
    setSelectedTopic(topic);
    pushNavigation(activeTab, topic.id);
  };

  // Jump from Topic Detail to Quiz Drill
  const handleJumpToQuiz = (topicId: string) => {
    setQuizTopicFilter(topicId);
    setSelectedTopic(null);
    setActiveTab('quiz');
    pushNavigation('quiz', null);
  };

  const canGoBack = Boolean(selectedTopic || activeTab !== 'home' || navStackRef.current.length > 1);

  // Dynamic header title
  const getHeaderTitle = () => {
    if (selectedTopic) return `Q ${selectedTopic.questionNumber}: ${selectedTopic.title}`;
    if (activeTab === 'home') return 'NeuroImmune CT Lab';
    if (activeTab === 'precise') return 'Precise CT Answers';
    if (activeTab === 'topics') return 'Syllabus Questions';
    if (activeTab === 'simulations') return 'Interactive Labs';
    if (activeTab === 'quiz') return 'Random 20 CT Drill';
    if (activeTab === 'cheatsheet') return 'Rapid Cheat Sheet';
    return 'NeuroImmune CT';
  };

  return (
    <AndroidFrame isPhoneFrame={isPhoneFrame} onSwipeBack={canGoBack ? handleGoBack : undefined}>
      {/* Top Bar with Android status, back button & quick toggles */}
      <AndroidTopBar
        isPhoneFrame={isPhoneFrame}
        onToggleFrame={() => setIsPhoneFrame((v) => !v)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSoundOn={isSoundOn}
        onToggleSound={handleToggleSound}
        canGoBack={canGoBack}
        onBack={handleGoBack}
        currentTitle={getHeaderTitle()}
      />

      {/* Main View Area with Transparent Liquid Styling */}
      <main className="flex-1 flex flex-col overflow-y-auto relative">
        {selectedTopic ? (
          <TopicDetailView
            topic={selectedTopic}
            onBack={handleGoBack}
            isBookmarked={bookmarkedIds.has(selectedTopic.id)}
            onToggleBookmark={handleToggleBookmark}
            onJumpToQuiz={handleJumpToQuiz}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeDashboardView
                onNavigateToTab={handleTabChange}
                onSelectTopic={handleSelectTopic}
                savedCount={bookmarkedIds.size}
              />
            )}

            {activeTab === 'topics' && (
              <TopicsListView
                topics={CT_TOPICS}
                searchQuery={searchQuery}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
                onSelectTopic={handleSelectTopic}
                onOpenSimulations={() => handleTabChange('simulations')}
              />
            )}

            {activeTab === 'precise' && <PreciseAnswersView />}

            {activeTab === 'simulations' && <SimulationsHubView />}

            {activeTab === 'quiz' && (
              <QuizDrillView
                initialTopicId={quizTopicFilter}
                onClearTopicFilter={() => setQuizTopicFilter(null)}
                onViewTopic={(id) => {
                  const t = CT_TOPICS.find((item) => item.id === id);
                  if (t) handleSelectTopic(t);
                }}
              />
            )}

            {activeTab === 'cheatsheet' && <QuickCheatSheetView />}
          </>
        )}
      </main>

      {/* Android Bottom Pebble Navigation Bar */}
      <BottomNavBar
        activeTab={selectedTopic ? 'topics' : activeTab}
        onTabChange={handleTabChange}
        savedCount={bookmarkedIds.size}
      />
    </AndroidFrame>
  );
}
