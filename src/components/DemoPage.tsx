import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

interface DemoPageProps {
  onPageChange: (page: string) => void;
}

export function DemoPage({ onPageChange }: DemoPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    timeSlot: "",
    goals: ""
  });

  const timeSlots = [
    "Today, 2:00 PM EST",
    "Today, 4:00 PM EST", 
    "Tomorrow, 10:00 AM EST",
    "Tomorrow, 2:00 PM EST",
    "Tomorrow, 4:00 PM EST",
    "Thursday, 10:00 AM EST",
    "Thursday, 2:00 PM EST",
    "Thursday, 4:00 PM EST"
  ];

  const expectations = [
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
      title: "Quick audit of your visibility",
      description: "We'll run your brand through our AI models live and show you exactly where you stand"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
      title: "Tailored recommendations",
      description: "Get specific, actionable steps you can implement immediately to improve your rankings"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
      title: "Q&A on GAIO basics",
      description: "All your questions about Generative AI Optimization answered by our experts"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Demo booking submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              Book a Demo: See RankBee in Action
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We'll walk through your brand's AI snapshot and brainstorm quick fixes. Your time, your agenda.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg max-w-2xl mx-auto mb-8 border border-purple-200">
              <p className="text-gray-700 leading-relaxed">
                Remember that time AI totally missed your best feature? In 20 minutes, we'll show why and how to change it.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section>

      {/* Demo Booking Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* What to Expect */}
            <div>
              <h2 className="text-4xl mb-8 text-gray-900">Here's the Plan</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our 20-minute demo is designed to give you immediate value, whether you decide to work with us or not. We believe in showing, not telling.
              </p>
              
              <div className="space-y-6 mb-8">
                {expectations.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="text-lg mb-3 text-gray-900">Come Prepared (Optional)</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Think of 2-3 key phrases customers might ask AI about your industry</li>
                  <li>• Have your main competitors in mind</li>
                  <li>• Bring any specific AI optimization questions you have</li>
                </ul>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    Pick a Slot
                  </CardTitle>
                  <CardDescription>
                    No pressure, no hard sell—just 20 minutes of actionable insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
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

                    <div className="grid md:grid-cols-2 gap-4">
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
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          placeholder="yourwebsite.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="timeSlot">Preferred Time *</Label>
                      <Select onValueChange={(value) => setFormData({...formData, timeSlot: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot, index) => (
                            <SelectItem key={index} value={slot}>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {slot}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="goals">What are your main AI optimization goals? (Optional)</Label>
                      <Textarea
                        id="goals"
                        value={formData.goals}
                        onChange={(e) => setFormData({...formData, goals: e.target.value})}
                        placeholder="e.g., Increase brand mentions in AI responses, understand competitor advantages, improve visibility for specific queries..."
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-cta hover:bg-cta/90 text-cta-foreground"
                      size="lg"
                    >
                      Book My Demo
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      You'll receive a calendar invite with a video call link within 5 minutes.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl mb-6 text-gray-900">Prefer a Different Approach?</h3>
          <p className="text-gray-600 mb-8">
            We get it—sometimes scheduling doesn't work. Here are other ways to connect:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <h4 className="text-lg mb-2 text-gray-900">Quick Questions</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Have a specific question? Just shoot us an email.
                </p>
                <Button 
                  variant="outline"
                  className="border-cta text-cta hover:bg-cta/10"
                  onClick={() => onPageChange("contact")}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <h4 className="text-lg mb-2 text-gray-900">Self-Service</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Explore our plans and start your free trial.
                </p>
                <Button 
                  variant="outline"
                  className="border-cta text-cta hover:bg-cta/10"
                  onClick={() => onPageChange("pricing")}
                >
                  View Pricing
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <h4 className="text-lg mb-2 text-gray-900">Learn More</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Read our latest insights and case studies.
                </p>
                <Button 
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                  onClick={() => onPageChange("blog")}
                >
                  Read Blog
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}