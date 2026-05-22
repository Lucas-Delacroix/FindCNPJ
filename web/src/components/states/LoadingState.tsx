export const LoadingState = () => {
  return (
    <div className="space-y-4">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-28 animate-pulse rounded-xl border border-slate-200 bg-white"
        />
      ))}
    </div>
  );
};
