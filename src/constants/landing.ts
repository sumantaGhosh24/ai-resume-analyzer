export const guestLinks = [
  {id: 1, name: "Home", href: "/"},
  {id: 2, name: "Register", href: "/login"},
  {id: 3, name: "Login", href: "/login"},
];

export const userLinks = [
  {id: 1, name: "Dashboard", href: "/dashboard"},
  {id: 2, name: "Profile", href: "/profile"},
  {id: 3, name: "Resumes", href: "/resumes"},
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
    price: "$0",
    features: ["3 Analyses", "Basic Scoring", "Limited Suggestions"],
    duration: "Monthly",
  },
  {
    name: "Pro",
    price: "$9/mo",
    features: [
      "Unlimited Analyses",
      "Resume Rewriting",
      "Cover Letters",
      "Interview Questions",
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
