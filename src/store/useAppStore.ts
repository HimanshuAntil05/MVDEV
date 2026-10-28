import { create } from 'zustand';
import type { AppState, AnalysisStatus, AnalysisResult } from '../types';

export const useAppStore = create<AppState>((set, get) => ({
  status: 'idle',
  uploadedFile: null,
  previewUrl: null,
  result: null,
  error: null,

  setFile: (file: File) => {
    // Revoke previous object URL to prevent memory leak
    const prev = get().previewUrl;
    if (prev) URL.revokeObjectURL(prev);

    const previewUrl = URL.createObjectURL(file);
    set({ uploadedFile: file, previewUrl, status: 'idle', result: null, error: null });
  },

  setStatus: (status: AnalysisStatus) => set({ status }),

  setResult: (result: AnalysisResult) => set({ result, status: 'complete' }),

  setError: (error: string) => set({ error, status: 'error' }),

  reset: () => {
    // Revoke object URL before clearing
    const prev = get().previewUrl;
    if (prev) URL.revokeObjectURL(prev);

    set({
      status: 'idle',
      uploadedFile: null,
      previewUrl: null,
      result: null,
      error: null,
    });
  },
}));
