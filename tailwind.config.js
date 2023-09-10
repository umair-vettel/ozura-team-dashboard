/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "sidebar-purple": "#1C132E",
        "profile-bar": "#201236"
      },
      css: {
        '.syntax-highlighter': {
          'pre, code': {
            'background-color': 'transparent',
          },
        },
      },
      colors: {
        "widgetBG": "#f4f4fb",
        "aurora-green": '#3ee7f2',
        "aurora-red": "#b233b3",
        "aurora-blue": "#3D8DF8",
        "aurora-orange": "#ff5628",
        "aurora-white": "#ffffff",
        "aurora-pink": "#ea1e82",
        "aurora-indigo": "#5a6cff",
        "aurora-light-blue": "#a0b9e9",
        "aurora-light-pink": "#e5577b",
        "form-blue": "#456cb0",
        "ozura-blue": "#1794fc",
        "color-1": "#9e325f",
        "color-2": "#8e5f43",
        "color-3": "#252031",
        "color-4": "#573e91",
        "color-5": "#436ba2",
        "background-1": "#1D162B",
        "background-overview": "#180e2a",
        "widgetcolor": "#261641",
        "textoverlay": "#624481",
        "thumb": "#3E246A",
        "track": "#22143B",
        "mainbg": "#191427",
        "mainwidget": "#251c3d",
        "sidebarbutton": "#2d1e4d",
        "sidebartext": "#bba8e2",
        "textpurple": "#503c85",
        "moredetails": "#1d182e",
        "box": "#2d2644",
      },
      animation: {
        'flip': 'animate 8s ease-in-out infinite alternate',
        'backflip': 'animate 8s ease-in-out infinite alternate-reverse',
      },
      keyframes: {
        animate: {
          '0%': {
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 60%',
            transform: 'scale(0) rotate(0deg) translate(10%, 10%)',
          },
          '100%': {
            borderRadius: '88% 10% 22% 58% / 73% 56% 34% 77%',
            transform: 'scale(0.7) rotate(180deg) translate(10%, 10%)',
          },
        },
      },
      backdropBlur: {
        '200': '100px'
  
      
      },
       borderGrad: {
        '1': {
            borderWidth: '2px',
            borderStyle: 'solid',
            borderImage: 'linear-gradient(to right,#436ba2,#573e91,#9e325f) 1',
        }
      },
      lineHeight: {
        "extra-space": "1.30",
      },
      fontFamily: {
        body: ["Montserrat"],
        'britanica': ['britanica', 'sans-serif'],
        'organetto-bold': ['organetto-bold', 'sans-serif'],
        'organetto': ['organetto', 'sans-serif'],
        'tangerine': ['tangerine', 'sans-serif'],
        'sfPro': ['sfPro', 'sans-serif'],
        'helveticaNeue': ['helveticaNeue', 'sans-serif'],
        'publicSansSemi': ['publicSansSemi', 'sans-serif'],
        'publicSansMed': ['publicSansMed', 'sans-serif']
      },
      scrollbar: {
        width: '2px',
        borderRadius: 'full',
        trackBorderRadius: 'full',
        colors: {
          thumb: '#3E246A',
          track: '#D1D5DB',
    },
  },
},
  },
  
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
