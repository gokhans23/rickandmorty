/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // src dizinindeki tüm dosyaları tara
    './components/**/*.{js,ts,jsx,tsx}', // İsteğe bağlı olarak components klasörü için
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};