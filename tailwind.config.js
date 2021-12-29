const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,

        "brand-light": "#fed3d6",
        brand: "#e04464",
        "brand-dark": "#6b2833",

        "cta-light": "#d8f9db",
        cta: "#44e072",
        "cta-dark": "#2b6a3a",

        "info-light": "#e3f0f7",
        info: "#89c3de",
        "info-dark": "#445d69",

        "warning-light": "#ffefce",
        warning: "#fbc132",
        "warning-dark": "#775c21",

        "success-light": "#e2f5d3",
        success: "#7fd34e",
        "success-dark": "#41642b",

        "danger-light": "#ffd3cf",
        danger: "#f9374b",
        "danger-dark": "#772528",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/line-clamp")],
};
