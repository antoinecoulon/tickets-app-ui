type BadgeProps = {
  label: string;
  className?: string;
};

export default function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-sm whitespace-nowrap font-medium ${className}`}>
      {label}
    </span>
  );
}
