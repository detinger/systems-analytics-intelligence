import { useState, useEffect } from 'react';

export type UserProgress = {
  completedLessons: string[];
  completedQuizzes: string[];
  completedLabs: string[];
  quizScores: Record<string, number>;
  bookmarks: string[];
  lastLessonVisited: string | null;
  badges: string[];
};

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  completedQuizzes: [],
  completedLabs: [],
  quizScores: {},
  bookmarks: [],
  lastLessonVisited: null,
  badges: [],
};

const STORAGE_KEY = "decision_intelligence_progress";

// Available Badges defined by requirements
export const BADGE_DETAILS = [
  { id: "systems_explorer", title: "Systems Explorer", desc: "Completed Module 1 or 2", icon: "🌐" },
  { id: "bi_foundations", title: "BI Specialist", desc: "Completed Module 3", icon: "📊" },
  { id: "etl_architect", title: "ETL Architect", desc: "Completed ETL Pipeline Simulator lab", icon: "⚙️" },
  { id: "olap_analyst", title: "OLAP Cube Master", desc: "Completed OLAP Cube Explorer lab", icon: "🧊" },
  { id: "decision_modeller", title: "Decision Designer", desc: "Completed Decision Table or Tree lab", icon: "🧠" },
  { id: "di_champion", title: "DI Champion", desc: "Completed all visual learning maps and labs", icon: "🏆" }
];

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PROGRESS, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  }, [progress]);

  const markLessonComplete = (lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const completed = [...prev.completedLessons, lessonId];
      
      // Dynamic badge updates
      const updatedBadges = [...prev.badges];
      
      // Systems Explorer Badge: Modules 1 or 2
      if (!updatedBadges.includes("systems_explorer") && (lessonId.startsWith("l1-") || lessonId.startsWith("l2-"))) {
        updatedBadges.push("systems_explorer");
      }
      
      // BI Specialist: Module 3
      if (!updatedBadges.includes("bi_foundations") && lessonId.startsWith("l3-")) {
        updatedBadges.push("bi_foundations");
      }

      return {
        ...prev,
        completedLessons: completed,
        badges: updatedBadges
      };
    });
  };

  const markQuizComplete = (quizId: string, score: number) => {
    setProgress(prev => {
      const scores = { ...prev.quizScores, [quizId]: Math.max(prev.quizScores[quizId] || 0, score) };
      const completed = prev.completedQuizzes.includes(quizId)
        ? prev.completedQuizzes
        : [...prev.completedQuizzes, quizId];

      return {
        ...prev,
        completedQuizzes: completed,
        quizScores: scores
      };
    });
  };

  const markLabComplete = (labId: string) => {
    setProgress(prev => {
      if (prev.completedLabs.includes(labId)) return prev;
      const completed = [...prev.completedLabs, labId];
      const updatedBadges = [...prev.badges];

      if (labId === "etl" && !updatedBadges.includes("etl_architect")) {
        updatedBadges.push("etl_architect");
      }
      if (labId === "olap" && !updatedBadges.includes("olap_analyst")) {
        updatedBadges.push("olap_analyst");
      }
      if ((labId === "decision-table" || labId === "decision-tree") && !updatedBadges.includes("decision_modeller")) {
        updatedBadges.push("decision_modeller");
      }
      
      if (
        completed.includes("etl") && 
        completed.includes("olap") && 
        completed.includes("decision-table") &&
        completed.includes("decision-tree") &&
        !updatedBadges.includes("di_champion")
      ) {
        updatedBadges.push("di_champion");
      }

      return {
        ...prev,
        completedLabs: completed,
        badges: updatedBadges
      };
    });
  };

  const toggleBookmark = (conceptId: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarks.includes(conceptId);
      const bookmarks = isBookmarked
        ? prev.bookmarks.filter(id => id !== conceptId)
        : [...prev.bookmarks, conceptId];
      return { ...prev, bookmarks };
    });
  };

  const setLastVisited = (lessonId: string | null) => {
    setProgress(prev => ({ ...prev, lastLessonVisited: lessonId }));
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  return {
    progress,
    markLessonComplete,
    markQuizComplete,
    markLabComplete,
    toggleBookmark,
    setLastVisited,
    resetProgress,
  };
}
