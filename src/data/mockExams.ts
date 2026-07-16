export interface MockExam {
  id: string;
  subject: string;
  grade: string;
  board: string;
  bookName: string;
  chaptersCount: number;
  status: "available" | "coming_soon";
  description: string;
  chapters: string[];
}

export const mockExams: MockExam[] = [
  {
    id: "sci-9-cbse",
    subject: "Science",
    grade: "Class 9",
    board: "CBSE",
    bookName: "Class 9 CBSE Science (NCERT)",
    chaptersCount: 13,
    status: "available",
    description: "Covers Physics, Chemistry, and Biology fundamentals based on the official NCERT syllabus.",
    chapters: [
      "Chapter 1: Matter in Our Surroundings",
      "Chapter 2: Is Matter Around Us Pure?",
      "Chapter 3: Atoms and Molecules",
      "Chapter 4: Structure of the Atom",
      "Chapter 5: The Fundamental Unit of Life",
      "Chapter 6: Tissues",
      "Chapter 7: Motion",
      "Chapter 8: Force and Laws of Motion",
      "Chapter 9: Gravitation",
      "Chapter 10: Work and Energy",
      "Chapter 11: Sound",
      "Chapter 12: Improvement in Food Resources",
      "Chapter 13: Natural Resources"
    ]
  },
  {
    id: "math-9-cbse",
    subject: "Mathematics",
    grade: "Class 9",
    board: "CBSE",
    bookName: "Class 9 CBSE Mathematics",
    chaptersCount: 12,
    status: "coming_soon",
    description: "Includes Algebra, Geometry, Mensuration, Statistics, and Probability.",
    chapters: [
      "Chapter 1: Number Systems",
      "Chapter 2: Polynomials",
      "Chapter 3: Coordinate Geometry",
      "Chapter 4: Linear Equations in Two Variables",
      "Chapter 5: Introduction to Euclid's Geometry",
      "Chapter 6: Lines and Angles",
      "Chapter 7: Triangles",
      "Chapter 8: Quadrilaterals",
      "Chapter 9: Circles",
      "Chapter 10: Heron's Formula",
      "Chapter 11: Surface Areas and Volumes",
      "Chapter 12: Statistics"
    ]
  },
  {
    id: "ss-9-cbse",
    subject: "Social Science",
    grade: "Class 9",
    board: "CBSE",
    bookName: "Class 9 CBSE Social Science",
    chaptersCount: 15,
    status: "coming_soon",
    description: "History, Geography, Democratic Politics, and Economics modules.",
    chapters: [
      "Chapter 1: The French Revolution",
      "Chapter 2: Socialism in Europe and the Russian Revolution",
      "Chapter 3: Nazism and the Rise of Hitler",
      "Chapter 4: India - Size and Location",
      "Chapter 5: Physical Features of India",
      "Chapter 6: Drainage",
      "Chapter 7: Climate",
      "Chapter 8: Natural Vegetation and Wildlife",
      "Chapter 9: Population",
      "Chapter 10: What is Democracy? Why Democracy?",
      "Chapter 11: Constitutional Design",
      "Chapter 12: Electoral Politics",
      "Chapter 13: Working of Institutions",
      "Chapter 14: Democratic Rights",
      "Chapter 15: The Story of Village Palampur"
    ]
  }
];
