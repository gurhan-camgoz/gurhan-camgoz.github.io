interface DrawnArrowProps {
  href: string;
  label: string;
  direction?: 'down' | 'left' | 'right';
}

export const DrawnArrow: React.FC<DrawnArrowProps> = ({
  href,
  label,
  direction = 'down'
}) => {
  if (direction === 'left') {
    return (
      <a
        href={href}
        className="group flex items-center gap-3 font-mono text-sm text-stone-400 hover:text-blue-200 transition"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <path
            d="M38 20 C 30 8, 15 8, 5 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: '100',
              strokeDashoffset: '100',
              animation: 'drawStroke 2s ease-in-out infinite'
            }}
          />
          <path
            d="M8 14 L5 20 L8 26"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <span className="italic">{label}</span>
      </a>
    );
  }

  if (direction === 'right') {
    return (
      <a
        href={href}
        className="group flex items-center gap-3 font-mono text-sm text-stone-400 hover:text-blue-200 transition"
      >
        <span className="italic">{label}</span>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <path
            d="M2 20 C 10 8, 25 8, 35 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: '100',
              strokeDashoffset: '100',
              animation: 'drawStroke 2s ease-in-out infinite'
            }}
          />
          <path
            d="M32 14 L35 20 L32 26"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </a>
    );
  }

  // Default down direction
  return (
    <a
      href={href}
      className="group flex items-center gap-3 font-mono text-sm text-stone-400 hover:text-blue-200 transition"
    >
      <svg
        width="140"
        height="40"
        viewBox="0 0 140 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <path
          d="M2 22 C 45 6, 90 6, 130 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: '200',
            strokeDashoffset: '200',
            animation: 'drawStroke 2s ease-in-out infinite'
          }}
        />
        <path
          d="M125 16 L130 20 L125 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <span className="italic">{label}</span>
    </a>
  );
};
