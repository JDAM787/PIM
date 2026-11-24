import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface Option<T extends string> {
  value: T;
  label: string;
}

interface OptionSelectProps<T extends string> {
  label: string;
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Select tipado: solo emite valores que existen en `options`. */
export function OptionSelect<T extends string>({
  label,
  options,
  value,
  onChange,
}: OptionSelectProps<T>) {
  const handleChange = (next: string) => {
    const option = options.find((candidate) => candidate.value === next);
    if (option) onChange(option.value);
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger
        aria-label={label}
        className="h-11 w-auto gap-3 rounded-lg bg-card font-medium sm:h-10"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
