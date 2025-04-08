import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <Hero
        title="Pricing Plans"
        subtitle="Choose the perfect plan for your team's needs"
      />

      {/* Pricing Plans */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Basic</h3>
                  <div className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    Free
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">Perfect for small teams getting started</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Up to 5 team members
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Basic task management
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Email support
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      1GB storage
                    </li>
                  </ul>
                  <Link
                    to="/signup"
                    className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-center"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Professional Plan */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform scale-105 hover:scale-110 transition-all duration-300 relative">
                <div className="absolute top-0 left-0 right-0 bg-blue-600 dark:bg-blue-700 text-white text-center py-2">
                  Most Popular
                </div>
                <div className="p-8 pt-12">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Professional</h3>
                  <div className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    $9.99<span className="text-lg font-normal">/month</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">Ideal for growing teams</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Up to 20 team members
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Advanced task management
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Priority support
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      10GB storage
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Analytics dashboard
                    </li>
                  </ul>
                  <Link
                    to="/signup"
                    className="block w-full bg-blue-600 dark:bg-blue-700 text-white text-center py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Enterprise Plan */}
            <AnimatedSection delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Enterprise</h3>
                  <div className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    Custom
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">For large organizations</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Unlimited team members
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Custom integrations
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      24/7 support
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Unlimited storage
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Advanced security
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Custom reporting
                    </li>
                  </ul>
                  <Link
                    to="/contact"
                    className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-center"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Feature Comparison */}
      <AnimatedSection className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Feature Comparison</h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 text-left text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center py-4 text-gray-900 dark:text-white">Basic</th>
                  <th className="text-center py-4 text-gray-900 dark:text-white">Professional</th>
                  <th className="text-center py-4 text-gray-900 dark:text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Team Members", basic: "Up to 5", pro: "Up to 20", enterprise: "Unlimited" },
                  { feature: "Storage", basic: "1GB", pro: "10GB", enterprise: "Unlimited" },
                  { feature: "Task Management", basic: "✓", pro: "✓", enterprise: "✓" },
                  { feature: "Analytics", basic: "✗", pro: "✓", enterprise: "✓" },
                  { feature: "Priority Support", basic: "✗", pro: "✓", enterprise: "✓" },
                  { feature: "Custom Integrations", basic: "✗", pro: "✗", enterprise: "✓" },
                  { feature: "API Access", basic: "✗", pro: "✓", enterprise: "✓" },
                  { feature: "Custom Reporting", basic: "✗", pro: "✗", enterprise: "✓" }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 text-gray-600 dark:text-gray-300">{row.feature}</td>
                    <td className="text-center py-4 text-gray-600 dark:text-gray-300">{row.basic}</td>
                    <td className="text-center py-4 text-gray-600 dark:text-gray-300">{row.pro}</td>
                    <td className="text-center py-4 text-gray-600 dark:text-gray-300">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all paid plans come with a 14-day free trial. No credit card required."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service."
              }
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Pricing;