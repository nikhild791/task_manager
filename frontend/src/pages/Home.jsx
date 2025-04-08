import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <Hero
        title="Prabandhan"
        subtitle="Your Ultimate Task Management Solution"
        ctaText="Get Started"
        ctaLink="/signup"
      />

      {/* Objectives Section */}
      <AnimatedSection className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Efficient Task Management",
                description: "Centralized platform for creating, assigning, and tracking tasks with full visibility."
              },
              {
                title: "Flexible Scheduling",
                description: "Adjust task deadlines with ease to adapt to changing priorities."
              },
              {
                title: "Role-Based Assignment",
                description: "Clear delegation of responsibilities through structured task assignment."
              },
              {
                title: "Real-Time Tracking",
                description: "Stay updated with real-time progress monitoring and status updates."
              },
              {
                title: "Team Collaboration",
                description: "Seamless collaboration with shared task visibility and management."
              },
              {
                title: "Accountability",
                description: "Monitor team performance and ensure project timelines are met."
              },
              {
                title: "Remote Support",
                description: "Accessible from anywhere, perfect for distributed teams."
              },
              {
                title: "User-Friendly",
                description: "Intuitive interface designed for quick adoption and ease of use."
              }
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Task Scheduling",
                description: "Flexible deadline management with postpone and prepone options.",
                icon: "📅"
              },
              {
                title: "Role-Based Access",
                description: "Admin and subordinate user roles with appropriate permissions.",
                icon: "👥"
              },
              {
                title: "Real-Time Updates",
                description: "Instant notifications and progress tracking.",
                icon: "⚡"
              },
              {
                title: "Team Collaboration",
                description: "Shared task management and transparent progress tracking.",
                icon: "🤝"
              },
              {
                title: "Admin Dashboard",
                description: "Comprehensive overview of team performance and task status.",
                icon: "📊"
              },
              {
                title: "Secure Platform",
                description: "Data security and role-based access control.",
                icon: "🔒"
              }
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Pricing Section */}
      <AnimatedSection className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "Free",
                features: [
                  "Up to 5 team members",
                  "Basic task management",
                  "Email support",
                  "1GB storage"
                ]
              },
              {
                name: "Professional",
                price: "$9.99",
                period: "/month",
                features: [
                  "Up to 20 team members",
                  "Advanced task management",
                  "Priority support",
                  "10GB storage",
                  "Analytics dashboard"
                ]
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Unlimited team members",
                  "Custom integrations",
                  "24/7 support",
                  "Unlimited storage",
                  "Advanced security",
                  "Custom reporting"
                ]
              }
            ].map((plan, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    {plan.price}
                    {plan.period && <span className="text-lg font-normal text-gray-600 dark:text-gray-300">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={plan.name === "Enterprise" ? "/contact" : "/signup"}
                    className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-center"
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;