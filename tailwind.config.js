/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--accent-primary, #F97316)',
          hover: 'var(--accent-primary-hover, #EA580C)',
          active: 'var(--accent-primary-active, #C2410C)',
          soft: 'var(--accent-primary-soft, rgba(249, 115, 22, 0.12))',
          muted: 'var(--accent-primary-muted, rgba(249, 115, 22, 0.08))',
          border: 'var(--accent-primary-border, rgba(249, 115, 22, 0.28))',
          text: 'var(--accent-primary-text, #F97316)',
          focus: 'var(--accent-focus, rgba(249, 115, 22, 0.35))',
          ring: 'var(--accent-ring, rgba(249, 115, 22, 0.35))',
          glow: 'var(--accent-glow, rgba(249, 115, 22, 0.35))',
        },
        primary: {
          DEFAULT: 'var(--accent-primary, var(--primary, #F97316))',
          hover: 'var(--accent-primary-hover, var(--primary-hover, #EA580C))',
          active: 'var(--accent-primary-active, var(--primary-active, #C2410C))',
          muted: 'var(--accent-primary-soft, var(--primary-muted, rgba(249, 115, 22, 0.12)))',
          soft: 'var(--accent-primary-soft, rgba(249, 115, 22, 0.12))',
          border: 'var(--accent-primary-border, var(--primary-border, rgba(249, 115, 22, 0.28)))',
          glow: 'var(--accent-glow, var(--primary-glow, rgba(249, 115, 22, 0.35)))',
          text: 'var(--accent-primary-text, var(--primary, #F97316))',
        },
        success: {
          DEFAULT: 'var(--success, #10B981)',
          hover: 'var(--success-hover, #059669)',
          soft: 'var(--success-soft, rgba(16, 185, 129, 0.12))',
          border: 'var(--success-border, rgba(16, 185, 129, 0.3))',
        },
        warning: {
          DEFAULT: 'var(--warning, #F59E0B)',
          hover: 'var(--warning-hover, #D97706)',
          soft: 'var(--warning-soft, rgba(245, 158, 11, 0.12))',
          border: 'var(--warning-border, rgba(245, 158, 11, 0.3))',
        },
        error: {
          DEFAULT: 'var(--error, #EF4444)',
          hover: 'var(--error-hover, #DC2626)',
          soft: 'var(--error-soft, rgba(239, 68, 68, 0.12))',
          border: 'var(--error-border, rgba(239, 68, 68, 0.3))',
        },
        info: {
          DEFAULT: 'var(--info, #3B82F6)',
          hover: 'var(--info-hover, #2563EB)',
          soft: 'var(--info-soft, rgba(59, 130, 246, 0.12))',
          border: 'var(--info-border, rgba(59, 130, 246, 0.3))',
        },
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
