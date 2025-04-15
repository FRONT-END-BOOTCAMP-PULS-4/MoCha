import { cn } from '../root-header/lib/cn';

type InputProps = {
  className?: string;
  placeholder?: string;
  error?: boolean;
  id?: string;
};

export default function Input({ className, placeholder, error, id }: InputProps) {
  return (
    <input
      className={cn(
        'placeholder-gray-6 border px-4 py-3 text-sm',
        error ? 'border-error' : 'border-gray-4',
        className
      )}
      type="text"
      placeholder={placeholder}
      id={id}
    />
  );
}
