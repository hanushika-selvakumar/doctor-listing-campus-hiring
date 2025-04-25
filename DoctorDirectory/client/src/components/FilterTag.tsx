import { X } from "lucide-react";

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

export default function FilterTag({ label, onRemove }: FilterTagProps) {
  return (
    <span className="filter-tag bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium flex items-center shadow-sm border border-primary/10 animate-fadeIn transition-all hover:shadow-md">
      {label}
      <button 
        className="ml-2 p-0.5 rounded-full hover:bg-white/30 focus:outline-none transition-all" 
        onClick={onRemove}
      >
        <X size={14} />
      </button>
    </span>
  );
}
