"use client";

import Link from "next/link";
import Image from "next/image";
import {CheckCircle} from "lucide-react";

import {features, steps, testimonials, pricing, faq} from "@/constants/landing";
import {usePrimaryColor} from "@/components/primary-provider";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
  const {primaryColor} = usePrimaryColor();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section className="container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Land 2× More Interviews <br />
            <span className={`text-${primaryColor}-500`}>
              with AI Resume Analysis
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            Get instant feedback, ATS score, and personalized suggestions to
            optimize your resume for any job role.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className={`px-8 bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`}
            >
              <Link href="/login">🚀 Analyze My Resume</Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              See How It Works
            </Button>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ✔ Trusted by 1,000+ job seekers <br />✔ Works with ATS systems
          </div>
        </div>
        <div className="relative">
          <Image
            src="/landing/hero.png"
            alt="AI Resume Analysis"
            width={550}
            height={550}
            className="rounded-2xl shadow-2xl"
            priority
          />
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 shadow-lg px-4 py-2 rounded-xl text-sm">
            ⭐ 4.9 Resume Score Boost
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-gray-200 dark:bg-gray-700">
        <div className="container mx-auto text-center space-y-6">
          <p className="text-xl uppercase tracking-wider font-bold">
            Trusted by developers & job seekers worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-10 text-center">
            <div>
              <h3 className="text-2xl font-bold">10,000+</h3>
              <p className="text-gray-500 text-sm dark:text-white">
                Resumes Analyzed
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">4.9★</h3>
              <p className="text-gray-500 text-sm dark:text-white">
                User Rating
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">95%</h3>
              <p className="text-gray-500 text-sm dark:text-white">
                Success Rate
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <span className="text-sm font-medium">Google</span>
            <span className="text-sm font-medium">Amazon</span>
            <span className="text-sm font-medium">Microsoft</span>
            <span className="text-sm font-medium">Startups</span>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Rejected to Shortlisted
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            See how AI transforms an average resume into an ATS-optimized,
            recruiter-ready profile.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Image
              src="/landing/before.png"
              alt="Before resume"
              width={500}
              height={500}
              className="rounded-2xl shadow-md hover:scale-[1.02] transition"
            />
            <ul className="mt-4 text-md text-gray-500 dark:text-white space-y-1">
              <li>• Poor keyword optimization</li>
              <li>• Low ATS score</li>
              <li>• Weak formatting</li>
            </ul>
          </div>
          <div>
            <Image
              src="/landing/after.png"
              alt="Optimized resume"
              width={500}
              height={500}
              className="rounded-2xl shadow-xl hover:scale-[1.02] transition"
            />
            <ul className="mt-4 text-md text-gray-500 dark:text-gray-300 space-y-1">
              <li>• ATS-friendly keywords</li>
              <li>• Improved readability</li>
              <li>• Higher match score</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-gray-200 dark:bg-gray-700">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            Upload your resume and get AI-powered insights in seconds
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 text-sm text-gray-500 dark:text-white">
            <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow dark:shadow-gray-400">
              📄 Upload Resume
            </span>
            <span>→</span>
            <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow dark:shadow-gray-400">
              🤖 AI Analysis
            </span>
            <span>→</span>
            <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow dark:shadow-gray-400">
              📊 Get Insights
            </span>
          </div>
          <div className="max-w-md mx-auto">
            <Card className="rounded-2xl shadow-xl border dark:border-gray-800 dark:shadow-gray-400">
              <CardContent className="p-8 space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Match Score</p>
                  <h3 className={`text-4xl font-bold text-${primaryColor}-500`}>
                    82%
                  </h3>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`bg-${primaryColor}-700 h-2 rounded-full w-[82%]`}
                  ></div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium mb-2">⚠ Missing Skills</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                      TypeScript
                    </span>
                    <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                      System Design
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-white">
                  💡 Add these skills to increase your match score by ~15%
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features to Boost Your Resume
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Everything you need to optimize your resume and stand out in today’s
            competitive job market.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="group border dark:border-gray-800 hover:shadow-xl transition duration-300 rounded-2xl dark:shadow-gray-400"
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition">
                  <Image
                    src={feature.img}
                    alt={feature.title}
                    height={40}
                    width={40}
                  />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="py-24 px-6 bg-gray-200 dark:bg-gray-700">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Users Are Saying
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Thousands of job seekers are improving their resumes and landing
              more interviews.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {testimonials.map((team, i) => (
              <Card
                key={i}
                className="group border dark:border-gray-800 rounded-2xl hover:shadow-xl transition duration-300 dark:shadow-gray-400"
              >
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <Image
                    src={team.avatar}
                    alt={team.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                    “{team.feedback}”
                  </p>
                  <div>
                    <h4 className="font-semibold">{team.name}</h4>
                    <p className="text-xs text-gray-500">Software Developer</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-12 dark:text-white">
            ⭐ Rated 4.9/5 by 10,000+ users worldwide
          </p>
        </div>
      </section>
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Get your resume optimized in just a few simple steps
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-${primaryColor}-700 text-white font-bold mb-4 mx-auto`}
              >
                {i + 1}
              </div>
              <Card className="border dark:border-gray-800 rounded-2xl hover:shadow-lg transition text-center h-full dark:shadow-gray-400">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold text-lg">{step.title}</h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-5 right-[-50%] w-full h-0.5 bg-gray-300 dark:bg-gray-700 z-[-1]" />
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Choose a plan that fits your needs. No hidden fees.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricing.map((plan, i) => (
            <Card
              key={i}
              className={`relative rounded-2xl border dark:border-gray-800 transition duration-300 hover:shadow-xl dark:shadow-gray-400 ${
                plan.popular ? "scale-105 shadow-2xl border-primary" : ""
              }`}
            >
              {plan.popular && (
                <span
                  className={`absolute top-4 right-4 bg-${primaryColor}-700 text-white text-xs px-3 py-1 rounded-full uppercase`}
                >
                  Most Popular
                </span>
              )}
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.duration && (
                    <span className="text-sm text-gray-500 ml-1">
                      /{plan.duration}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        size={16}
                        className="text-green-500 mt-0.5"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? `bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href="/login">
                    {plan.popular ? "🚀 Get Started" : "Choose Plan"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Everything you need to know about our AI resume analyzer
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faq.map((question, i) => (
            <AccordionItem
              value={`item-${i}`}
              key={i}
              className="border dark:border-gray-800 rounded-xl px-4"
            >
              <AccordionTrigger className="text-left font-medium py-4">
                {question.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 dark:text-gray-300 pb-4">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <footer className="border-t dark:border-gray-800 py-16 px-6">
        <div className="container mx-auto grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold mb-3">ResumeAI</h3>
            <p className="text-sm text-gray-500 dark:text-white">
              AI-powered resume analysis to help you land more interviews.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 dark:text-white">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-white">
              <li className="hover:text-primary cursor-pointer">Features</li>
              <li className="hover:text-primary cursor-pointer">Pricing</li>
              <li className="hover:text-primary cursor-pointer">
                How It Works
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 dark:text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-white">
              <li className="hover:text-primary cursor-pointer">About</li>
              <li className="hover:text-primary cursor-pointer">Careers</li>
              <li className="hover:text-primary cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 dark:text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-white">
              <li className="hover:text-primary cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-primary cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-6 border-t dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-white">
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-primary cursor-pointer">Twitter</span>
            <span className="hover:text-primary cursor-pointer">LinkedIn</span>
            <span className="hover:text-primary cursor-pointer">GitHub</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
