export default function MultiRingLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="50" cy="50" r="40"
          stroke="#e74c3c"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset="180">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="50" cy="50" r="30"
          stroke="#3498db"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="180"
          strokeDashoffset="160">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 50 50"
            to="0 50 50"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="50" cy="50" r="20"
          stroke="#f1c40f"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="160"
          strokeDashoffset="140">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
