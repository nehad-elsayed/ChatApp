export default function Spinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border border-muted-foreground border-t-transparent ${sizes[size]}`}
      />
    </div>
  );
}
