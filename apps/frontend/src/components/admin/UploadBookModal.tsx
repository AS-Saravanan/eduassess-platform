import React, { useState } from "react";
import { X, UploadCloud, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface UploadBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (bookData: {
    grade: string;
    subject: string;
    academicYear: string;
    bookName: string;
  }) => void;
}

export const UploadBookModal: React.FC<UploadBookModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [formData, setFormData] = useState({
    grade: "",
    subject: "",
    academicYear: "2025-26",
    bookName: "",
  });
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.grade) newErrors.grade = "Grade is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.academicYear.trim()) newErrors.academicYear = "Academic Year is required";
    if (!formData.bookName.trim()) newErrors.bookName = "Book Name is required";
    if (!fileSelected) newErrors.file = "PDF Textbook file is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API round-trip loading
    setTimeout(() => {
      setIsLoading(false);
      onUploadSuccess({
        grade: formData.grade,
        subject: formData.subject,
        academicYear: formData.academicYear,
        bookName: formData.bookName,
      });
      // Reset form
      setFormData({
        grade: "",
        subject: "",
        academicYear: "2025-26",
        bookName: "",
      });
      setFileSelected(null);
      onClose();
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setErrors((prev) => ({ ...prev, file: "Only PDF files are supported" }));
        setFileSelected(null);
      } else {
        setFileSelected(file);
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.file;
          return copy;
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="fixed inset-0" 
        onClick={() => !isLoading && onClose()} 
      />
      
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 sm:p-8 overflow-hidden animate-[slide-in_0.2s_ease-out]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-display font-extrabold text-slate-950 text-xl">
              Upload Academic Book
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Add textbooks to train the AI assessment engine
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="space-y-5 pt-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Grade Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Grade <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                disabled={isLoading}
                value={formData.grade}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, grade: e.target.value }));
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.grade;
                    return copy;
                  });
                }}
                className={`h-11 px-3 text-sm rounded-lg border bg-white transition-all outline-none cursor-pointer ${
                  errors.grade ? "border-red-350 focus:border-red-500" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
              >
                <option value="">Select Grade</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
              {errors.grade && (
                <p className="text-xs text-red-655 font-semibold mt-0.5">{errors.grade}</p>
              )}
            </div>

            {/* Subject Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Subject <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                disabled={isLoading}
                value={formData.subject}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, subject: e.target.value }));
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.subject;
                    return copy;
                  });
                }}
                className={`h-11 px-3 text-sm rounded-lg border bg-white transition-all outline-none cursor-pointer ${
                  errors.subject ? "border-red-350 focus:border-red-500" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
              >
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="English Literature">English Literature</option>
              </select>
              {errors.subject && (
                <p className="text-xs text-red-655 font-semibold mt-0.5">{errors.subject}</p>
              )}
            </div>
          </div>

          {/* Academic Year */}
          <Input
            label="Academic Year"
            required
            disabled={isLoading}
            value={formData.academicYear}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, academicYear: e.target.value }));
              setErrors((prev) => {
                const copy = { ...prev };
                delete copy.academicYear;
                return copy;
              });
            }}
            error={errors.academicYear}
            placeholder="e.g., 2025-26"
          />

          {/* Book Name */}
          <Input
            label="Book Name"
            required
            disabled={isLoading}
            value={formData.bookName}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, bookName: e.target.value }));
              setErrors((prev) => {
                const copy = { ...prev };
                delete copy.bookName;
                return copy;
              });
            }}
            error={errors.bookName}
            placeholder="e.g., Mathematics Volume 1"
          />

          {/* PDF File Upload UI only */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              PDF Textbook File <span className="text-red-500 font-bold">*</span>
            </label>
            <div className={`relative border-2 border-dashed rounded-xl p-6 transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
              errors.file ? "border-red-300 bg-red-50/20" : "border-slate-200 hover:border-slate-350 bg-slate-50/20"
            }`}>
              <input
                type="file"
                accept=".pdf"
                disabled={isLoading}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className={`h-8 w-8 ${errors.file ? "text-red-400" : "text-slate-400"} mb-2`} />
              
              {fileSelected ? (
                <div>
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[240px]">{fileSelected.name}</p>
                  <p className="text-[10px] text-slate-450 font-semibold uppercase mt-0.5">{(fileSelected.size / 1024 / 1024).toFixed(2)} MB • Click or drag to replace</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold text-slate-700">Click to upload or drag & drop</p>
                  <p className="text-[10px] text-slate-450 font-semibold uppercase mt-0.5">PDF Format only (Max 50MB)</p>
                </div>
              )}
            </div>
            {errors.file && (
              <p className="text-xs text-red-655 font-semibold mt-0.5">{errors.file}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={onClose}
              className="text-xs font-bold h-10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="text-xs font-bold h-10 shadow-md shadow-blue-500/10"
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBookModal;
