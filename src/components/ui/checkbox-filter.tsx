import { Checkbox } from "~/components/ui/checkbox";

interface CheckboxFilterProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: React.ReactNode;
  className?: string;
}

export function CheckboxFilter({
  id,
  checked,
  onCheckedChange,
  label,
  className = "",
}: CheckboxFilterProps) {
  return (
    <div
      className={`flex items-center space-x-2 p-2 hover:bg-gray-50 rounded ${className}`}
    >
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <label htmlFor={id} className="text-sm cursor-pointer flex-1">
        {label}
      </label>
    </div>
  );
}
