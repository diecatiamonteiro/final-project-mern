export default function BtnHamburgerMobile({ setIsMenuOpen, isMenuOpen }) {
  return (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="text-accent p-2"
      aria-label="Toggle menu"
    >
      <svg
        className="w-6 h-6 transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isMenuOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
            className="text-offwhite transition-all duration-300"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8h16M4 16h16"
            className="text-offwhite transition-all duration-300"
          />
        )}
      </svg>
    </button>
  );
}
