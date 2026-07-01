// Shared inline SVG icons used across the site.

export function Spark({ className = "", ...props }) {
  return (
    <span className={`spark ${className}`} aria-hidden="true" {...props}>
      <svg viewBox="0 0 24 24">
        <path
          d="M12 0c.6 6.1 5.3 10.8 12 12-6.7 1.2-11.4 5.9-12 12-.6-6.1-5.3-10.8-12-12C6.7 10.8 11.4 6.1 12 0Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function Arrow({ className = "" }) {
  return (
    <span className={`arr ${className}`} aria-hidden="true">
      →
    </span>
  );
}

export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.6 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2.01-3.3-2.01 0-2.32 1.57-2.32 3.2V21H9V9Z" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
