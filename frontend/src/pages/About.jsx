import React from 'react';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <Hero
        title="About Prabandhan"
        subtitle="Transforming the way teams manage tasks and collaborate"
      />

      {/* Mission Section */}
      <AnimatedSection className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              At Prabandhan, we're dedicated to revolutionizing task management by providing a platform that combines powerful features with intuitive design. Our mission is to help teams work more efficiently, collaborate seamlessly, and achieve their goals with confidence.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "We constantly evolve our platform to meet the changing needs of modern teams.",
                icon: "💡"
              },
              {
                title: "Simplicity",
                description: "We believe in making complex task management simple and accessible to everyone.",
                icon: "✨"
              },
              {
                title: "Reliability",
                description: "Our platform is built on robust technology to ensure consistent performance.",
                icon: "🔧"
              },
              {
                title: "Collaboration",
                description: "We foster teamwork and communication through our platform's features.",
                icon: "🤝"
              },
              {
                title: "Security",
                description: "We prioritize the protection of your data and privacy.",
                icon: "🔒"
              },
              {
                title: "Customer Focus",
                description: "We listen to our users and continuously improve based on their feedback.",
                icon: "👥"
              }
            ].map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "CEO & Founder",
                description: "Visionary leader with 10+ years in task management solutions.",
                image: "👨‍💼"
              },
              {
                name: "Jane Smith",
                role: "CTO",
                description: "Technology expert specializing in scalable solutions.",
                image: "👩‍💻"
              },
              {
                name: "Mike Johnson",
                role: "Head of Product",
                description: "Product development specialist focused on user experience.",
                image: "👨‍💼"
              }
            ].map((member, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "500+", label: "Teams" },
              { number: "50+", label: "Countries" },
              { number: "99%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;