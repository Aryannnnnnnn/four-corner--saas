import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PropertyData, SavedAnalysis } from "@/app/lib/types/index";

interface AnalysisStore {
  currentAnalysis: PropertyData | null;
  savedAnalyses: SavedAnalysis[];
  isAnalyzing: boolean;
  hasHydrated: boolean;
  setCurrentAnalysis: (analysis: PropertyData | null) => void;
  addSavedAnalysis: (analysis: SavedAnalysis) => void;
  removeSavedAnalysis: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setIsAnalyzing: (status: boolean) => void;
  clearCurrentAnalysis: () => void;
  clearAllAnalyses: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAnalysisStore = create<AnalysisStore>()(
  persist(
    (set) => ({
      currentAnalysis: null,
      savedAnalyses: [],
      isAnalyzing: false,
      hasHydrated: false,

      setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),

      addSavedAnalysis: (analysis) =>
        set((state) => {
          // Prevent duplicates
          const exists = state.savedAnalyses.some((a) => a.id === analysis.id);
          if (exists) {
            return {
              savedAnalyses: state.savedAnalyses.map((a) =>
                a.id === analysis.id ? analysis : a,
              ),
            };
          }
          return {
            savedAnalyses: [analysis, ...state.savedAnalyses],
          };
        }),

      removeSavedAnalysis: (id) =>
        set((state) => ({
          savedAnalyses: state.savedAnalyses.filter((a) => a.id !== id),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          savedAnalyses: state.savedAnalyses.map((a) =>
            a.id === id ? { ...a, is_favorite: !a.is_favorite } : a,
          ),
        })),

      setIsAnalyzing: (status) => set({ isAnalyzing: status }),

      clearCurrentAnalysis: () => set({ currentAnalysis: null }),

      clearAllAnalyses: () => set({ savedAnalyses: [], currentAnalysis: null }),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "analysis-storage",
      storage: createJSONStorage(() => {
        // Check if we're on the client side
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // Return a dummy storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        savedAnalyses: state.savedAnalyses,
        currentAnalysis: state.currentAnalysis,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

// Hook to safely use the store on the client side
export const useAnalysisStoreHydrated = () => {
  const store = useAnalysisStore();

  if (typeof window === "undefined") {
    return {
      ...store,
      hasHydrated: false,
    };
  }

  return store;
};

// Selectors for optimized re-renders
export const useCurrentAnalysis = () =>
  useAnalysisStore((state) => state.currentAnalysis);

export const useSavedAnalyses = () =>
  useAnalysisStore((state) => state.savedAnalyses);

export const useIsAnalyzing = () =>
  useAnalysisStore((state) => state.isAnalyzing);

export const useFavoriteAnalyses = () =>
  useAnalysisStore((state) => state.savedAnalyses.filter((a) => a.is_favorite));

export const useAnalysisById = (id: string | undefined) =>
  useAnalysisStore((state) =>
    id ? state.savedAnalyses.find((a) => a.id === id) : undefined,
  );
