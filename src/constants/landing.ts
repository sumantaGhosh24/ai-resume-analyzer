export const guestLinks = [
  {id: 1, name: "Home", href: "/"},
  {id: 2, name: "Register", href: "/login"},
  {id: 3, name: "Login", href: "/login"},
];

export const userLinks = [
  {id: 1, name: "Dashboard", href: "/dashboard"},
  {id: 2, name: "Profile", href: "/profile"},
];

export const features = [
  {
    title: "AI Resume Scoring",
    desc: "Get a match score based on job description using AI.",
    img: "/landing/score.png",
  },
  {
    title: "Missing Skills Detection",
    desc: "Find what skills you lack compared to job requirements.",
    img: "/landing/skills.png",
  },
  {
    title: "Resume Improvement",
    desc: "Get AI suggestions to improve resume sections.",
    img: "/landing/ai.png",
  },
  {
    title: "ATS Simulation",
    desc: "Simulate how ATS scans your resume.",
    img: "/landing/score.png",
  },
  {
    title: "Cover Letter Generator",
    desc: "Generate personalized cover letters.",
    img: "/landing/skills.png",
  },
  {
    title: "Interview Questions",
    desc: "Prepare with AI-generated questions.",
    img: "/landing/ai.png",
  },
];

export const steps = [
  {title: "Upload Resume", desc: "Upload your resume in PDF."},
  {title: "Paste Job Description", desc: "Add job description."},
  {title: "AI Analysis", desc: "AI evaluates your resume."},
  {title: "Get Insights", desc: "View score & suggestions."},
];

export const testimonials = [
  {
    name: "Rahul",
    feedback: "Got interviews fast!",
    avatar: "/landing/team-1.png",
  },
  {name: "Priya", feedback: "Amazing AI tool!", avatar: "/landing/team-2.png"},
  {name: "Amit", feedback: "Helped a lot!", avatar: "/landing/team-3.png"},
];

export const pricing = [
  {
    name: "Free",
    price: "₹0",
    features: [
      "1 Mock Interview",
      "1 Interview Questions",
      "2 Cover Letter",
      "2 Resume Rewrite",
      "3 Ats Simulation",
      "3 Resume Analyze",
    ],
    duration: "Monthly",
  },
  {
    name: "Pro",
    price: "₹300/mo",
    features: [
      "10 Mock Interview",
      "10 Interview Questions",
      "20 Cover Letter",
      "20 Resume Rewrite",
      "25 Ats Simulation",
      "25 Resume Analyze",
    ],
    popular: true,
    duration: "Monthly",
  },
];

export const faq = [
  {
    question: "How does AI scoring work?",
    answer: "We compare your resume with job description using AI.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes, your data is secure and private.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel anytime.",
  },
  {
    question: "What happens if I don't use my subscription?",
    answer: "You will not be charged.",
  },
];
