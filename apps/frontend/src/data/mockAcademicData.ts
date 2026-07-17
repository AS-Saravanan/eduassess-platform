export interface AcademicSubject {
  id: string;
  grade: string;
  subject: string;
  books: string[];
  status: "Uploaded" | "AI Ready" | "Processing" | "Draft";
  academicYear: string;
}

export const mockAcademicSubjects: AcademicSubject[] = [
  {
    id: "1",
    grade: "10",
    subject: "Mathematics",
    books: ["Mathematics Volume 1", "Mathematics Volume 2"],
    status: "Uploaded",
    academicYear: "2025-26"
  },
  {
    id: "2",
    grade: "10",
    subject: "Science",
    books: ["Physics", "Chemistry", "Biology"],
    status: "Uploaded",
    academicYear: "2025-26"
  },
  {
    id: "3",
    grade: "12",
    subject: "Physics",
    books: ["Core Physics Volume I", "Core Physics Volume II"],
    status: "Uploaded",
    academicYear: "2025-26"
  },
  {
    id: "4",
    grade: "11",
    subject: "Chemistry",
    books: ["Organic Chemistry", "Inorganic Chemistry"],
    status: "Uploaded",
    academicYear: "2025-26"
  },
  {
    id: "5",
    grade: "9",
    subject: "English Literature",
    books: ["English Reader", "Supplementary Readings"],
    status: "Uploaded",
    academicYear: "2025-26"
  }
];
