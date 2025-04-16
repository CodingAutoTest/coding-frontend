export type ProblemDetailResponseDTO = {
    id: number;
    title: string;
    description: string;
    inputConstraints: string;
    outputConstraints: string;
    difficulty: number;
    acceptanceRate: number;
    timeLimit: number;
    memoryLimit: number;
  };
  