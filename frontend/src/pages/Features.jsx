import React from 'react';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <Hero
        title="Features"
        subtitle="Discover how Prabandhan can transform your task management experience"
      />

      {/* Main Features Section */}
      <AnimatedSection className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Task Management */}
            <AnimatedSection delay={0.1}>
              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-6">📋</div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Task Management</h2>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Create and organize tasks with ease
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Set priorities and deadlines
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Categorize tasks by project or team
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Flexible deadline adjustments
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            {/* Team Collaboration */}
            <AnimatedSection delay={0.2}>
              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-6">👥</div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Team Collaboration</h2>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Real-time task updates
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Shared task visibility
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Team communication tools
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Progress tracking for all members
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            {/* Admin Controls */}
            <AnimatedSection delay={0.3}>
              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-6">👨‍💼</div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Admin Controls</h2>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Role-based access control
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Team performance analytics
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Task assignment and delegation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Custom reporting tools
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            {/* Security & Privacy */}
            <AnimatedSection delay={0.4}>
              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-6">🔒</div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Security & Privacy</h2>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    End-to-end encryption
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Regular security audits
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Data backup and recovery
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    GDPR compliance
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Additional Features */}
      <AnimatedSection className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Additional Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mobile Access",
                description: "Access your tasks from anywhere with our mobile-friendly platform",
                icon: "📱"
              },
              {
                title: "Custom Notifications",
                description: "Set up personalized alerts for deadlines and updates",
                icon: "🔔"
              },
              {
                title: "Integration Ready",
                description: "Connect with your favorite tools and services",
                icon: "🔄"
              },
              {
                title: "File Sharing",
                description: "Share documents and files directly within tasks",
                icon: "📎"
              },
              {
                title: "Time Tracking",
                description: "Monitor time spent on tasks and projects",
                icon: "⏱️"
              },
              {
                title: "Custom Workflows",
                description: "Create and automate your own task workflows",
                icon: "⚙️"
              }
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Features;