
export interface QuestionChoice {
  text: string;
  isCorrect: boolean;
}

export interface EvaluationQuestion {
  question: string;
  choices: QuestionChoice[];
}

export interface Evaluation {
  title: string;
  description: string;
  questions: EvaluationQuestion[];
}

export interface Session {
  title: string;
  description: string;
  sessionDate: Date;
  files: string[];
  qrCodeData?: string;
}

// Extended member interface to include grades and attendance
export interface StudentDetail {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  attendance: number;
  averageGrade: number;
  evaluationGrades: {
    evaluationId: number;
    title: string;
    grade: number;
  }[];
  sessionAttendance: {
    sessionId: number;
    attended: boolean;
  }[];
}
