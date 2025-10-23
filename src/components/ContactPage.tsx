import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Mail, MessageCircle, Phone, MapPin, Coffee } from "lucide-react";
import { useState } from "react";

interface ContactPageProps {
  onPageChange: (page: string) => void;
}

export function ContactPage({ onPageChange }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-purple-600" />,
      title: "Email Us",
      description: "Drop us a line anytime. We typically respond within 2 hours during business hours.",
      action: "hello@rankbee.ai",
      link: "mailto:hello@rankbee.ai"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-purple-600" />,
      title: "Live Chat",
      description: "Need immediate help? Our team is online during business hours (9 AM - 6 PM GMT).",
      action: "Start Chat",
      link: "https://rankbee.ai/meet"
    },
    {
      icon: <Phone className="w-6 h-6 text-purple-600" />,
      title: "Schedule a Call",
      description: "Prefer talking? Book a quick 15-minute chat with our team.",
      action: "Book Call",
      link: "https://rankbee.ai/meet"
    }
  ];

  const subjects = [
    "General Inquiry",
    "Technical Support", 
    "Sales Questions",
    "Partnership Opportunities",
    "Media/Press",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero + Form Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Hero Content */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl mb-6 text-gray-900 leading-tight">
                Reach Out—Let's Make <span className="text-purple-600">AI</span> Work for You
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Email, chat, or call. Response in hours, not days.
              </p>
              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-purple-200">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Building RankBee taught us: Great tools need great convos. What's on your mind?
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-2xl mb-6 text-gray-900 font-semibold">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Select onValueChange={(value) => setFormData({...formData, subject: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="What's this about?" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject, index) => (
                              <SelectItem key={index} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us what's on your mind."
                        rows={4}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      size="lg"
                    >
                      Send Message
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Response within 4 hours during business hours.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 text-gray-900">Ways to Connect</h2>
            <p className="text-sm sm:text-base text-gray-600">Choose the method that works best for you.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit group-hover:bg-purple-200 transition-colors">
                    {method.icon}
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-gray-900">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                    {method.description}
                  </CardDescription>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base"
                    onClick={() => window.location.href = method.link}
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Fun Facts & Office Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6 text-gray-900">A Little About Us</h2>
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
                      Our team's favorite AI query? "Best coffee in London" (spoiler: It's the little café around the corner from our office). We may be AI experts, but we're also human ☕
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MessageCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg mb-2 text-gray-900">Our Promise</h3>
                    <p className="text-gray-600">
                      Every message gets a real human response. No bots (ironic, we know), no templates—just genuine conversations about how AI can help your brand.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-8 border border-purple-200">
              <h3 className="text-2xl mb-6 text-gray-900">Quick Response Times</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">General Inquiries</span>
                  <span className="text-purple-600">&lt; 2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Technical Support</span>
                  <span className="text-purple-600">&lt; 1 hour</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sales Questions</span>
                  <span className="text-purple-600">&lt; 30 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Emergency Issues</span>
                  <span className="text-purple-600">&lt; 15 minutes</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600 italic">
                  "The RankBee team doesn't just respond fast—they actually understand what I'm asking. Refreshing in the tech world." - Sarah M., Marketing Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
