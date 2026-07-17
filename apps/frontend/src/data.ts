// Static mock data for the EduAssess platform - Phase 1 UI Prototype only.

export interface StudentProfile {
  fullName: string;
  email: string;
  schoolName: string;
  gradeLevel: string;
  studentId: string;
  joinedDate: string;
}

export interface Assessment {
  id: string;
  title: string;
  subject: string;
  questions: number;
  duration: string;
  status: "completed" | "pending";
  score: string | null;
  date: string;
  aiVerdict: string | null;
}

export interface Recommendation {
  topic: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  reason: string;
  action: string;
}

export interface FeedbackSnippet {
  assessment: string;
  question: string;
  studentResponse: string;
  evaluation: string;
  feedback: string;
  score: string;
}

export const studentProfile: StudentProfile = {
  fullName: "Alex Mercer",
  email: "alex.mercer@silverwood.edu",
  schoolName: "Silverwood Institute of Technology",
  gradeLevel: "Grade 11 (STEM Pathway)",
  studentId: "SW-2026-9482",
  joinedDate: "September 2025"
};

export const mockAssessments: Assessment[] = [
  {
    id: "ast-1",
    title: "Calculus Limits & Continuity",
    subject: "Advanced Mathematics",
    questions: 15,
    duration: "45 mins",
    status: "completed",
    score: "88%",
    date: "July 12, 2026",
    aiVerdict: "Strong analytical grasp. Minor notation error in trigonometric limit resolutions."
  },
  {
    id: "ast-2",
    title: "Newtonian Mechanics & Forces",
    subject: "Classical Physics",
    questions: 10,
    duration: "30 mins",
    status: "completed",
    score: "74%",
    date: "July 08, 2026",
    aiVerdict: "Good conceptual understanding of net force diagrams. Struggle identified with frictional coefficients."
  },
  {
    id: "ast-3",
    title: "Organic Chemistry: Carbon Bonds",
    subject: "Chemistry II",
    questions: 12,
    duration: "40 mins",
    status: "pending",
    score: null,
    date: "Upcoming",
    aiVerdict: null
  },
  {
    id: "ast-4",
    title: "Maxwell's Equations & Electromagnetism",
    subject: "Classical Physics",
    questions: 20,
    duration: "60 mins",
    status: "pending",
    score: null,
    date: "Upcoming",
    aiVerdict: null
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    topic: "Trigonometric Limits",
    subject: "Advanced Mathematics",
    difficulty: "Medium",
    reason: "Based on 2 missed questions in Limits assessment",
    action: "Review Study Module"
  },
  {
    topic: "Frictional Coefficients & Inclined Planes",
    subject: "Classical Physics",
    difficulty: "Hard",
    reason: "Common conceptual mistake in recent Mechanics evaluation",
    action: "Practice Subjective Questions"
  },
  {
    topic: "Covalent Nomenclature",
    subject: "Chemistry II",
    difficulty: "Easy",
    reason: "Prerequisite for Organic Chemistry exam preparation",
    action: "Start Mini Quiz"
  }
];

export const mockFeedbackSnippets: FeedbackSnippet[] = [
  {
    assessment: "Newtonian Mechanics & Forces",
    question: "Describe how static friction changes as an external force is applied up to the threshold of movement.",
    studentResponse: "The static friction stays equal to the push force until the object slips, and then it turns into kinetic friction.",
    evaluation: "Highly Accurate Concept",
    feedback: "You accurately described the dynamic matching of static friction. To achieve a perfect score, explicitly state the formula (fs ≤ μs * Fn) and mention that static friction reaches its maximum critical threshold just before motion begins.",
    score: "4.5 / 5.0"
  }
];
