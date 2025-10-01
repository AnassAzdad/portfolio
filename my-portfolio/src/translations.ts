export const translations = {
  nl: {
    nav: {
      home: "Home",
      about: "Over mij",
      projects: "Projecten",
      contact: "Contact",
    },
    home: {
      greeting: "Hallo, ik ben",
      tagline:
        "Ik bouw graag mooie, interactieve webapplicaties met moderne technologieën.",
      moreAboutMe: "Meer over mij",
      viewProjects: "Bekijk mijn projecten",
      projects: [
        { title: "Project 1: Kalender", subtitle: "Klik om te bekijken" },
        { title: "Project 2: Weer App", subtitle: "Klik om te bekijken" },
        { title: "Project 3: Currency Converter", subtitle: "Klik om te bekijken" },
        { title: "Project 4: Quiz App", subtitle: "Klik om te bekijken" },
      ],
      roles: ["Software Developer in opleiding", "Frontend Developer"],
    },
    about: {
      title: "Over mij",
      intro: `Hallo, ik ben <span class="highlight">Anass Azdad</span>.  
              Ik zit in mijn derde jaar Software Development op het Mediacollege Amsterdam.  
              Ik hou me vooral bezig met <strong>frontend</strong>, omdat ik het tof vind om iets te maken wat er strak uitziet én goed werkt.`,
      projects1: `Tijdens school heb ik o.a. gewerkt aan een <strong>kalender/planner</strong>, en thuis heb ik gewerkt aan een <strong>weer-app</strong> en een <strong>currency converter</strong>.  
                  Ik vind het leuk om te spelen met <span class="highlight">API’s</span> en animaties om dingen wat extra leven te geven.`,
      projects2: `Styling vind ik trouwens ook belangrijk.  
                  We zijn officieel geen designers, maar ik zorg er wel voor dat m’n projecten er netjes en modern uitzien.`,
      cta: "Bekijk mijn projecten",
      skillsTitle: "Skills",
    },
    projects: {
      title: "Projecten",
      description: "Hier zijn mijn favoriete projecten. Klik erop om ze in actie te zien.",
      list: [
        {
          title: "📅 Project 1: Kalender",
          img: "/project1.png",
          link: "/project1",
          description:
            "Een interactieve kalender waarin je afspraken kan plannen. Inclusief emailnotificaties via EmailJS en een custom UI met React en CSS."
        },
        {
          title: "🌦️ Project 2: Weer App",
          img: "/project2.png",
          link: "/project2",
          description:
            "Een weer-app die live data ophaalt via de OpenWeatherMap API. Typ een stad in en krijg direct de actuele weersvoorspelling."
        },
        {
          title: "💱 Project 3: Currency Converter",
          img: "/project3.png",
          link: "/project3",
          description:
            "Een valuta-converter met live wisselkoersen. Gemaakt met de ExchangeRate API en React hooks om bedragen om te rekenen tussen meerdere munteenheden."
        },
        {
          title: "📝 Project 4: Quiz App",
          img: "/project4.png",
          link: "/project4",
          description:
            "Een interactieve quiz-app waarmee je kennis kan testen. Gebouwd met React en dynamische vraagcomponenten."
        }
      ]
    },
    contact: {
      title: "Contact",
      description: "Neem contact met me op via het formulier.",
    },
    project4: {
      title: "Quiz",
      next: "Volgende ➡️",
      progress: "Vraag {current} van {total}",
      score: "Score",
      finished: "Klaar!",
      result: "Je score",
      retry: "Opnieuw spelen 🔄",
      questions: [
        {
          question: "Wat is React?",
          options: ["Backend framework", "Frontend library", "Database systeem", "CSS preprocessor"],
          answer: 1,
        },
        {
          question: "Welke hook gebruik je om state te maken?",
          options: ["useState", "useEffect", "useRef", "useContext"],
          answer: 0,
        },
        {
          question: "Wat doet TypeScript?",
          options: [
            "Voegt types toe aan JavaScript",
            "Is een CSS framework",
            "Database management",
            "Server hosting",
          ],
          answer: 0,
        },
      ],
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About me",
      projects: "Projects",
      contact: "Contact",
    },
    home: {
      greeting: "Hello, I'm",
      tagline:
        "I love building beautiful, interactive web applications with modern technologies.",
      moreAboutMe: "More about me",
      viewProjects: "View my projects",
      projects: [
        { title: "Project 1: Calendar", subtitle: "Click to view" },
        { title: "Project 2: Weather App", subtitle: "Click to view" },
        { title: "Project 3: Currency Converter", subtitle: "Click to view" },
        { title: "Project 4: Quiz App", subtitle: "Click to view" },
      ],
      roles: ["Software Developer in training", "Frontend Developer"],
    },
    about: {
      title: "About me",
      intro: `Hi, I'm <span class="highlight">Anass Azdad</span>.  
              I'm in my third year of Software Development at Mediacollege Amsterdam.  
              I mainly focus on <strong>frontend</strong>, because I enjoy creating things that look sleek and work well.`,
      projects1: `At school I worked on a <strong>calendar/planner</strong>, and at home I made a <strong>weather app</strong> and a <strong>currency converter</strong>.  
                  I like experimenting with <span class="highlight">APIs</span> and animations to bring projects to life.`,
      projects2: `I also care about styling.  
                  We’re not officially designers, but I make sure my projects look clean and modern.`,
      cta: "View my projects",
      skillsTitle: "Skills",
    },
    projects: {
      title: "Projects",
      description: "Here are my favorite projects. Click to see them in action.",
      list: [
        {
          title: "📅 Project 1: Calendar",
          img: "/project1.png",
          link: "/project1",
          description:
            "An interactive calendar where you can schedule appointments. Includes email notifications via EmailJS and a custom UI built with React and CSS."
        },
        {
          title: "🌦️ Project 2: Weather App",
          img: "/project2.png",
          link: "/project2",
          description:
            "A weather app that fetches live data from the OpenWeatherMap API. Type in a city and instantly get the current forecast."
        },
        {
          title: "💱 Project 3: Currency Converter",
          img: "/project3.png",
          link: "/project3",
          description:
            "A currency converter with live exchange rates. Built using the ExchangeRate API and React hooks to calculate amounts between multiple currencies."
        },
        {
          title: "📝 Project 4: Quiz App",
          img: "/project4.png",
          link: "/project4",
          description:
            "An interactive quiz app to test your knowledge. Built with React and dynamic question components."
        }
      ]
    },
    contact: {
      title: "Contact",
      description: "Get in touch with me via the form.",
    },
    project4: {
      title: "Quiz",
      next: "Next ➡️",
      progress: "Question {current} of {total}",
      score: "Score",
      finished: "Done!",
      result: "Your score",
      retry: "Play again 🔄",
      questions: [
        {
          question: "What is React?",
          options: ["Backend framework", "Frontend library", "Database system", "CSS preprocessor"],
          answer: 1,
        },
        {
          question: "Which hook is used to create state?",
          options: ["useState", "useEffect", "useRef", "useContext"],
          answer: 0,
        },
        {
          question: "What does TypeScript do?",
          options: [
            "Adds types to JavaScript",
            "Is a CSS framework",
            "Database management",
            "Server hosting",
          ],
          answer: 0,
        },
      ],
    },
  },
} as const;
