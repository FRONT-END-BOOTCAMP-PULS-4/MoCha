'use client';

interface MessageProps {
  errorMessage?: string;
  successMessage?: string;
}

export default function MessageZone({ errorMessage, successMessage }: MessageProps) {
  return (
    <div className="mt-1 min-h-[16px] text-xs">
      {errorMessage ? (
        <span className="text-red-500">{errorMessage}</span>
      ) : successMessage ? (
        <span className="text-green-500">{successMessage}</span>
      ) : null}
    </div>
  );
}
