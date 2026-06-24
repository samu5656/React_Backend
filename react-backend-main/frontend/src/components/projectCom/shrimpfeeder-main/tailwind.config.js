/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0E1417", 2: "#11191D" },
        steel: { DEFAULT: "#16222B", soft: "#1C2B35" },
        paper: { DEFAULT: "#F6F5F2", 2: "#EFEDE7" },
        silver: { 1: "#C7CDD2", 2: "#8A949B" },
        accent: {
          DEFAULT: "#D2A24C",
          br: "#E7C67E",
          ink: "#936A1E",
        },
        on: {
          dark: "#EAEDEF",
          "dark-mut": "#9BA6AD",
          light: "#14201F",
          "light-mut": "#5C6A6C",
        },
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: "1240px",
      },
      borderColor: {
        "hair-dark": "rgba(199,205,210,0.14)",
        "hair-light": "rgba(14,20,23,0.12)",
      },
      boxShadow: {
        soft: "0 24px 60px -28px rgba(0,0,0,0.55)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      keyframes: {
        cue: {
          "0%": { transform: "translateY(0)" },
          "60%,100%": { transform: "translateY(80px)" },
        },
        spin: { to: { transform: "rotate(360deg)" } },
        floatBob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        glowPulse: {
          "0%,100%": { opacity: ".55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
      },
      animation: {
        cue: "cue 2.4s cubic-bezier(0.22,0.61,0.36,1) infinite",
        "spin-slow": "spin 22s linear infinite",
        float: "floatBob 8s ease-in-out infinite",
        glow: "glowPulse 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
