/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        info: "hsl(var(--info))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        logo_scale: {
          "0%": { transform: "translateX(0rem)" },
          "67%": { transform: "translateX(0rem)" },
          "100%": { transform: "translateY(-40px) scale(2)" },
        },
        logo_scale_mobile: {
          "0%": { transform: "translateY(0rem)" },
          "67%": { transform: "translateY(0rem)" },
          "100%": { transform: "translateY(-14px) scale(2)" },
        },
        triangle_shrink: {
          "0%": { transform: "translateX(0rem)" },
          "67%": {
            transform: "translateX(-27px) translateY(42px) scale(0.28)",
          },
          "100%": { transform: "translateX(-55px) translateY(2px) scale(0.5)" },
        },
        triangle_shrink_mobile: {
          "0%": { transform: "translateX(0rem)" },
          "67%": { transform: "translateX(-27px) translateY(25px) scale(0.6)" },
          "100%": {
            transform: "translateX(-55px) translateY(12px) scale(1.1)",
          },
        },
        a_vanish: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        logo_scale: "logo_scale 3s ease-in-out",
        triangle_shrink: "triangle_shrink 3s ease-in-out",
        logo_scale_mobile: "logo_scale_mobile 3s ease-in-out",
        triangle_shrink_mobile: "triangle_shrink_mobile 3s ease-in-out",
        a_vanish: "a_vanish 2s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
