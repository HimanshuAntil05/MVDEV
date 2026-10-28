export type MediaType = 'image' | 'video';
export type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';

export interface FrameResult {
  frameIndex: number;
  timestamp: number;
  spatialScore: number;
  frequencyScore: number;
  fusedScore: number;
  label: 'REAL' | 'FAKE';
  heatmapUrl?: string;
}

export interface BranchScores {
  spatial: number;
  frequency: number;
  fused: number;
}

export interface AnalysisResult {
  id: string;
  mediaType: MediaType;
  label: 'REAL' | 'FAKE';
  confidence: number;
  branchScores: BranchScores;
  frameResults?: FrameResult[];
  heatmapUrl?: string;
  processingTime: number;
  warnings: string[];
  metadata: {
    filename: string;
    fileSize: number;
    dimensions?: { width: number; height: number };
    duration?: number;
    framesAnalyzed?: number;
  };
}

export interface AppState {
  status: AnalysisStatus;
  uploadedFile: File | null;
  previewUrl: string | null;
  result: AnalysisResult | null;
  error: string | null;
  setFile: (file: File) => void;
  setStatus: (status: AnalysisStatus) => void;
  setResult: (result: AnalysisResult) => void;
  setError: (error: string) => void;
  reset: () => void;
}
