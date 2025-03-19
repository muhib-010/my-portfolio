module.exports = {
  content: [
    "./index.html",  
    "./dist/**/*.html",  
    "./src/**/*.{js,jsx,ts,tsx}",  // This includes the components folder
    "./src/components/**/*.{js,jsx,ts,tsx}", // Explicitly include components
  ],
  safelist: [
    "bg-red-500", 
    "bg-blue-500", 
    "text-white", 
    "flex", 
    "items-center",
    "hidden", "block", "w-full", "h-screen", "p-4"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
