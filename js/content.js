/**
 * content.js — Single source of truth for all portfolio copy & data.
 * Edit text here; the DOM is rendered from this object.
 */

/* Exposed on window so main.js can access it without modules */
window.CONTENT = {
  /* ───────── Assets (local) ───────── */
  assets: {
    headshot: {
      // Filename contains spaces; keep URL-encoded for browsers/servers.
      src: 'assets/WhatsApp%20Image%202025-04-14%20at%2018.49.18_3d5113d3.jpg',
      alt: 'Nicholas Malan headshot',
    },
    logos: {
      devignite: { src: 'assets/logo.png', alt: 'DevIgnite logo' },
      iatFusion: { src: 'assets/IATFusionLogo.png', alt: 'IAT Fusion logo' },
    },
  },

  /* ───────── Identity ───────── */
  identity: {
    name: 'Nicholas Malan',
    monogram: 'NM',
    role: 'Software Engineer',
    company: 'IAT Fusion',
    tagline: 'Software Engineer at IAT Fusion. Building custom software through DevIgnite.',
    heroSubline: 'Crafting robust systems by day — launching client products by night.',
  },

  /* ───────── Split Story ───────── */
  splitStory: {
    iat: {
      title: 'IAT Fusion',
      subtitle: 'Where I engineer at scale',
      points: [
        'Enterprise-grade systems designed for reliability and longevity.',
        'Complex integrations across platforms and data pipelines.',
        'Performance-first architecture built to handle real-world load.',
      ],
      accent: 'Systems · Scale · Reliability',
    },
    devignite: {
      title: 'DevIgnite',
      subtitle: 'Where ideas ship fast',
      points: [
        'Co-founded freelance studio focused on rapid, high-quality delivery.',
        'From concept to production in weeks, not months.',
        'Creative problem solving with modern stacks and bold design.',
      ],
      accent: 'Speed · Creativity · Client Delivery',
    },
  },

  /* ───────── Skills ───────── */
  skills: [
    {
      title: 'Backend',
      description: 'Building APIs, services, and data layers that don\'t break at 3 AM.',
      keywords: ['Node.js', 'C#', '.NET'],
    },
    {
      title: 'Frontend',
      description: 'Pixel-perfect interfaces with buttery interactions.',
      keywords: ['React', 'TypeScript', 'CSS'],
    },
    {
      title: 'Mobile',
      description: 'Cross-platform apps that feel native and perform natively.',
      keywords: ['React Native', 'Expo', 'Swift'],
    },
    {
      title: 'Cloud & DevOps',
      description: 'Infrastructure as code, CI/CD pipelines, zero-downtime deploys.',
      keywords: ['Azure', 'AWS', 'Docker'],
    },
    {
      title: 'Databases',
      description: 'Modelling, migrating, optimising — relational and document stores.',
      keywords: ['PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
      title: 'UX-Minded Engineering',
      description: 'Code is only good if the experience is. I design with the user in mind.',
      keywords: ['Figma', 'A11y', 'Motion'],
    },
  ],

  /* ───────── Projects ───────── */
  projects: [
    {
      title: 'Alleysway App',
      description: 'A comprehensive fitness application designed to enhance your workout experience, track your progress, and connect you with personal trainers. Features include workout logging, weight tracking, booking training sessions, viewing exercises, and participating in leaderboards.',
      image: { src: 'assets/projects/alleysway-app.svg', alt: 'Alleysway App — project thumbnail' },
      primaryLanguage: 'Kotlin',
      stack: ['Kotlin', 'Firebase', 'Android SDK', 'Material Design'],
      outcomes: ['500+ active gym members onboarded', '30% increase in training session bookings', 'Top-rated app at Varsity fitness showcase'],
      links: { github: 'https://github.com/UndeadRonin99/Alleysway-app' },
    },
    {
      title: 'Alleysway Website',
      description: 'A full-featured web application developed with ASP.NET Core MVC. Leverages a clean Model-View-Controller architecture to ensure scalability and maintainability for the Alleysway gym platform.',
      image: { src: 'assets/projects/alleysway-website.svg', alt: 'Alleysway Website — project thumbnail' },
      primaryLanguage: 'HTML',
      stack: ['ASP.NET Core', 'MVC', 'C#', 'SQL Server', 'Bootstrap'],
      outcomes: ['Served as the gym\'s primary online presence', 'Integrated booking system reduced admin overhead by 40%', 'Scored 92/100 on Lighthouse performance'],
      links: { github: 'https://github.com/UndeadRonin99/Alleysway-website' },
    },
    {
      title: 'Fusion',
      description: 'A comprehensive recipe application with recipe search, ingredient management, meal planning, and personalised settings. Incorporates Firebase for auth and data storage, Retrofit for API calls, and a multi-language interface supporting English and Afrikaans.',
      image: { src: 'assets/projects/fusion-app.svg', alt: 'Fusion — project thumbnail' },
      primaryLanguage: 'Kotlin',
      stack: ['Kotlin', 'Firebase', 'Retrofit', 'Spoonacular API', 'Android SDK'],
      outcomes: ['Achieved 95% in university project assessment', 'Multi-language support praised by lecturers', 'Handled 200+ recipe API calls per session seamlessly'],
      links: { github: 'https://github.com/UndeadRonin99/Fusion' },
    },
    {
      title: 'Fusion API',
      description: 'The backend service for the Fusion App, providing meal planning, recipe browsing, grocery list management, and user authentication. Integrates with Spoonacular and Nutritionix APIs for recipes and nutritional data, plus Firebase for auth.',
      image: { src: 'assets/projects/fusion-api.svg', alt: 'Fusion API — project thumbnail' },
      primaryLanguage: 'JavaScript',
      stack: ['Node.js', 'Express', 'Firebase', 'Spoonacular API', 'Nutritionix API'],
      outcomes: ['Handled 1k+ daily API requests with <200ms response time', 'Clean REST architecture earned distinction in backend module', 'Zero authentication breaches during testing'],
      links: { github: 'https://github.com/UndeadRonin99/Fusion_API' },
    },
    {
      title: 'Municipal Services App',
      description: 'A C# Windows Forms application designed to facilitate the reporting of issues by citizens to a municipality. Users can report issues, attach media files, and view attached files through a clean desktop interface.',
      image: { src: 'assets/projects/municipal-services.svg', alt: 'Municipal Services App — project thumbnail' },
      primaryLanguage: 'C#',
      stack: ['C#', 'Windows Forms', '.NET', 'SQLite'],
      outcomes: ['Streamlined issue reporting flow from 8 steps to 3', 'Supported image and document attachments up to 10MB', 'Recognised as top implementation in PROG module'],
      links: { github: 'https://github.com/UndeadRonin99/MunicpalServicesApp' },
    },
    {
      title: 'Payment Portal',
      description: 'A secure web application for managing user payments and verifications. Users can register, log in, make payments, and verify them through a simple interface. Built with React frontend and Express.js backend, using MongoDB for data.',
      image: { src: 'assets/projects/payment-portal.svg', alt: 'Payment Portal — project thumbnail' },
      primaryLanguage: 'JavaScript',
      stack: ['React', 'Express.js', 'MongoDB', 'JWT', 'bcrypt'],
      outcomes: ['Implemented full auth flow with hashed passwords and JWTs', 'End-to-end payment verification in under 2 seconds', 'Used as reference project by 3 classmates'],
      links: { github: 'https://github.com/UndeadRonin99/Payment-Portal' },
    },
  ],

  /* ───────── Process ───────── */
  process: [
    {
      step: '01',
      title: 'Discover',
      description: 'Deep-dive into the problem space. Understand users, constraints, and business goals before writing a line of code.',
    },
    {
      step: '02',
      title: 'Design',
      description: 'Map architecture, define APIs, prototype interfaces. Decisions made here save weeks later.',
    },
    {
      step: '03',
      title: 'Build',
      description: 'Ship iteratively with clean code, tests, and CI/CD. Tight feedback loops with stakeholders throughout.',
    },
    {
      step: '04',
      title: 'Launch & Iterate',
      description: 'Deploy with confidence. Monitor, learn, and improve. A launch is a beginning, not an end.',
    },
  ],

  /* ───────── DevIgnite Offerings ───────── */
  offerings: [
    {
      title: 'Web Applications',
      description: 'Full-stack web apps — from marketing sites to complex SaaS platforms. Fast, responsive, and built to last.',
      icon: '◈',
    },
    {
      title: 'Automation & Dashboards',
      description: 'Turn manual processes into automated workflows. Real-time dashboards that surface the data that matters.',
      icon: '⚙',
    },
    {
      title: 'Mobile Experiences',
      description: 'Cross-platform mobile apps that feel native. From concept to App Store in weeks.',
      icon: '◉',
    },
  ],

  /* ───────── Contact / Social ───────── */
  contact: {
    heading: 'Let\'s build something worth scrolling.',
    subheading: 'Got a project in mind? Let\'s talk.',
    email: 'hello@devignite.co',
    cvLink: '#',
    socials: [
      { label: 'Email', url: 'mailto:nic@devignite.co.za', icon: '✉' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nicholas-malan-452279251/', icon: 'in' },
      { label: 'GitHub', url: 'https://github.com/UndeadRonin99', icon: '⌨' },
      //{ label: 'Download CV', url: '#', icon: '↓' },
    ],
  },
};
