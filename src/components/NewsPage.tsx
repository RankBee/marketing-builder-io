import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';
import { trackEvent } from '../lib/posthog';

interface NewsPageProps {
  onPageChange: (page: string) => void;
}

export function NewsPage({ onPageChange }: NewsPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookDemo = () => {
    trackEvent('News Page Demo Booked', {
      event_type: 'speaking_event',
      destination: 'demo'
    });
    onPageChange('demo');
  };

  return (
    <div className="news-page bg-white min-h-screen">
      {/* Back Button */}
      <section className="bg-gray-50 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onPageChange('home')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                Speaking Event
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Politics Meets Technology 2026
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mt-4 max-w-2xl">
                Aris Vrakas, Founder & CEO of RankBee, explores how political voices get seen—or silenced—in the age of LLMs
              </p>
            </div>

            {/* Event Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-start gap-4">
                <Calendar className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Date</p>
                  <p className="text-lg font-semibold text-gray-900">January 24, 2026</p>
                  <p className="text-sm text-gray-600">Berlin, Germany</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-start gap-4">
                <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="text-lg font-semibold text-gray-900">Berlin</p>
                  <p className="text-sm text-gray-600">Germany</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-start gap-4">
                <Users className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Speaker</p>
                  <p className="text-lg font-semibold text-gray-900">Aris Vrakas</p>
                  <p className="text-sm text-gray-600">Founder & CEO, RankBee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* About the Event */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">About the Event</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Politics Meets Technology 2026 brings together political leaders, technologists, and digital strategists to examine how artificial intelligence and large language models are reshaping political communication and public discourse. With the rise of AI-powered information systems, the question of whose voices get amplified—and whose get silenced—has never been more critical.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                In this session, Aris Vrakas will explore how political organizations can ensure their messages are visible and credible in the age of LLMs. Drawing on RankBee's research and real-world case studies, he'll reveal the emerging strategies that are already winning in AI-powered search and recommendation systems.
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What You'll Learn</h2>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">How LLMs Shape Political Discourse</h3>
                    <p className="text-gray-700">Understand how ChatGPT, Gemini, and other LLMs influence which political voices and messages reach voters</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Optimizing for AI-Powered Discovery</h3>
                    <p className="text-gray-700">Proven strategies for ensuring your political message or campaign is visible in AI search results and recommendations</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Avoiding the Silence: Visibility Gaps</h3>
                    <p className="text-gray-700">How to identify when your voice isn't being amplified by AI systems and what to do about it</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">The Future of AI in Politics</h3>
                    <p className="text-gray-700">What's next for AI-powered political communication and how to stay ahead of the curve</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Speakers */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Speakers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Alex Morrison</h3>
                  <p className="text-purple-600 font-medium mb-3">Founder & CEO, RankBee</p>
                  <p className="text-gray-700">Expert in AI search optimization and brand visibility strategies. Over 15 years in digital marketing innovation.</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Dr. Jessica Liu</h3>
                  <p className="text-purple-600 font-medium mb-3">AI Research Lead, Tech Forward</p>
                  <p className="text-gray-700">Leading researcher in AI-powered search behavior. Published 20+ papers on AI adoption and brand presence.</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 sm:p-12 text-center text-white space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">Ready to Master AI Search?</h2>
                <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                  Join us at the AI Marketing Summit 2026 and get ahead of the curve. Limited early-bird seats available.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="https://www.aimarketingsummit.com/register" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                  >
                    Register Now
                  </Button>
                </a>
                <button onClick={handleBookDemo}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
                  >
                    Book a Demo First
                  </Button>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
