import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Mail, MessageCircle, Phone, MapPin, Coffee, Calendar, ArrowRight, X, Copy, Check } from "lucide-react";
import { useIntercom, useTeamAvailability } from "../lib/intercom";

interface ContactPageProps {}

// Obfuscated email - stored as base64 to prevent bot scraping
// Base64 of 'help@rankbee.ai'
const getEmail = () => {
  const encoded = 'aGVscEByYW5rYmVlLmFp';
  try {
    return atob(encoded);
  } catch {
    // Fallback if base64 decode fails
    return 'help@rankbee.ai';
  }
};

export function ContactPage({}: ContactPageProps) {
  const { showMessenger } = useIntercom();
  const isTeamAvailable = useTeamAvailability();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (showEmailModal) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showEmailModal]);

  const handleCopyEmail = async () => {
    const email = getEmail();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEmailClick = () => {
    console.log('Email button clicked, opening modal...');
    setShowEmailModal(true);
    console.log('Modal state after click:', true);
  };
  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8 text-purple-600" />,
      title: "Email Us",
      description: "Prefer email? Drop us a line and we'll get back to you within 2 hours during business hours. Perfect for detailed questions or sharing documents.",
      action: getEmail(),
      subAction: "Send Us an Email",
      link: "email" // Special link to trigger email modal
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Book a Call",
      description: "Schedule a 15-30 minute chat with our team at a time that works for you.",
      action: "Book Time Slot",
      subAction: "View Calendar",
      link: "/demo"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
      title: "Live Chat",
      description: "Get instant answers during business hours (9 AM - 6 PM).",
      action: "Start Chat",
      subAction: "Chat Now",
      link: "intercom" // Special link to trigger Intercom
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6 text-gray-900 leading-tight font-bold">
              Reach Out – Let's Make <span className="text-purple-600">AI</span> Work for You
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8">
              Email, chat, or call. Response in hours, not days.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-purple-200 mb-12 max-w-2xl mx-auto">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Building RankBee taught us: Great tools need great convos. What's on your mind?
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 min-w-[200px] group"
                onClick={showMessenger}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Live Chat
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 min-w-[200px] group"
                onClick={() => window.location.href = '/demo'}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book a Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Response within 2-4 hours during business hours (9 AM - 6 PM)
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900 font-bold">Choose Your Preferred Channel</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help in whatever way works best for you. All channels guarantee the same fast, human response.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group border-2 border-purple-100 hover:border-purple-300" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHeader className="pb-4" style={{ flexShrink: 0 }}>
                  <div className="mx-auto mb-6 p-4 bg-purple-100 rounded-full w-fit group-hover:bg-purple-600 transition-colors">
                    <div className="group-hover:text-white transition-colors">
                      {method.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-gray-900 text-center">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardDescription className="text-base text-gray-600 mb-6 leading-relaxed">
                    {method.description}
                  </CardDescription>
                  <div style={{ marginTop: 'auto' }}>
                    <div className="min-h-[32px] mb-4 flex items-center justify-center">
                      {method.link === 'intercom' && isTeamAvailable && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            Team is Online
                          </span>
                        </div>
                      )}
                    </div>
                    {method.link === 'email' ? (
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        size="lg"
                        onClick={handleEmailClick}
                      >
                        {method.subAction}
                      </Button>
                    ) : method.link === 'intercom' ? (
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        size="lg"
                        onClick={showMessenger}
                      >
                        {method.action}
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        size="lg"
                        onClick={() => window.location.href = method.link}
                      >
                        {method.action}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Fun Facts & Office Info */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl mb-6 text-gray-900 font-bold">A Little About Us</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg mb-2 text-gray-900">London HQ</h3>
                    <p className="text-gray-600">
                      We're based in the heart of London's tech scene. While we work with clients globally, there's something special about face-to-face collaboration.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Coffee className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg mb-2 text-gray-900">Fun Fact</h3>
                    <p className="text-gray-600">
                      The question we ask most? "What if we just made it simpler?" Turns out, cutting features is harder than adding them.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MessageCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg mb-2 text-gray-900">Our Promise</h3>
                    <p className="text-gray-600">
                      Every message gets a real human response. No bots (ironic, I know), no templates—just genuine conversations about how AI can help your brand.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-8 border border-purple-200">
              <h3 className="text-2xl mb-6 text-gray-900">Quick Response Times</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Emergency Issues</span>
                  <span className="text-purple-600">&lt; 15 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sales Questions</span>
                  <span className="text-purple-600">&lt; 30 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Technical Support</span>
                  <span className="text-purple-600">&lt; 1 hour</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">General Inquiries</span>
                  <span className="text-purple-600">&lt; 24 hours</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600 italic">
                  "Customer notes are gold to me. They help me understand our customers needs and how we can best serve them." - Aris Vrakas., Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Modal */}
      {showEmailModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-auto"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => setShowEmailModal(false)}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Email Us</h3>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Send us an email and we'll get back to you within 2 hours during business hours.
            </p>

            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-3 font-medium">Our email address:</p>
              <div className="bg-white rounded-md p-3 border border-purple-200">
                <p className="text-2xl font-bold text-purple-600 select-all text-center">{getEmail()}</p>
              </div>
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6"
              onClick={handleCopyEmail}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Email Address
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Click to copy, then paste into your email client
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
