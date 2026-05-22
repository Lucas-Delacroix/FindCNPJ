export const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-2.5">
          <BrandMark />
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            FindCNPJ
          </span>
        </div>
      </div>
    </header>
  );
};

const BrandMark = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect width="32" height="32" rx="9" fill="#6F5CFF" />
    <circle
      cx="14"
      cy="14"
      r="5"
      stroke="white"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M18 18l4 4"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);
