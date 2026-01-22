export function BeeWithSpeaker() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Speaker cone background */}
      <path
        d="M16 2C16.5523 2 17 2.44772 17 3V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V3C15 2.44772 15.4477 2 16 2Z"
        fill="white"
        opacity="0.8"
      />
      <path
        d="M19 6C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18C18.4477 18 18 17.5523 18 17V7C18 6.44772 18.4477 6 19 6Z"
        fill="white"
        opacity="0.6"
      />

      {/* Bee body */}
      <ellipse cx="8" cy="12" rx="4.5" ry="5.5" fill="#FBBF24" />

      {/* Bee head */}
      <circle cx="8" cy="7" r="2.5" fill="#FCD34D" />

      {/* Bee antennae */}
      <line x1="6.5" y1="5" x2="5" y2="2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="9.5" y1="5" x2="11" y2="2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />

      {/* Bee stripes */}
      <ellipse cx="8" cy="10" rx="4" ry="0.8" fill="#1F2937" opacity="0.4" />
      <ellipse cx="8" cy="13" rx="4" ry="0.8" fill="#1F2937" opacity="0.4" />
      <ellipse cx="8" cy="16" rx="4" ry="0.8" fill="#1F2937" opacity="0.4" />

      {/* Bee wings */}
      <ellipse cx="5" cy="10" rx="1.5" ry="3" fill="white" opacity="0.7" />
      <ellipse cx="11" cy="10" rx="1.5" ry="3" fill="white" opacity="0.7" />

      {/* Bee eyes */}
      <circle cx="7" cy="6.5" r="0.4" fill="#1F2937" />
      <circle cx="9" cy="6.5" r="0.4" fill="#1F2937" />
    </svg>
  );
}
