import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Target, Zap, Eye, ExternalLink } from "lucide-react";
import { useRef } from "react";
import yinNoeImage from 'figma:asset/49edafd48740cd6fe95aa4ed7c2168d9e77e46f0.png';
import arisVrakasImage from 'figma:asset/b7cf0bf96cdd61b5fdbcc47ebb89f402e22edbab.png';
import { trackEvent } from "../lib/posthog";

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const teamSectionRef = useRef<HTMLDivElement>(null);

  const handleMeetTeamClick = () => {
    teamSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const values = [
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: "Foundation",
      description: "Born from 25+ years at Amazon, Tata, and startups—real-world SEO that powers our GAIO tech.",
      detail: "It's not magic—it's method. Like how we helped a fintech client uncover hidden biases in AI responses and flip them into opportunities."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "Innovation",
      description: "We pioneered ways to nudge how AI 'thinks' about brands, using proprietary tricks that deliver quick wins.",
      detail: "Our breakthrough techniques have helped clients see 40% visibility improvements in just 2 weeks."
    },
    {
      icon: <Eye className="w-8 h-8 text-purple-600" />,
      title: "Vision",
      description: "Automating AI ops for everyone, from solopreneurs to globals, so you focus on growth.",
      detail: "We believe every brand deserves to be heard in the AI conversation, regardless of size or budget."
    }
  ];

  const team = [
    {
      name: "Aris Vrakas",
      role: "Founder/CEO/CTO",
      bio: "After leading global SEO at Amazon and launching tools at Skyscanner, Aris built RankBee to tackle the AI era head-on.",
      funFact: "He's obsessed with how one prompt can shift a brand's fate.",
      image: arisVrakasImage,
      linkedinUrl: "https://www.linkedin.com/in/arisvrakas/"
    },
    {
      name: "Yin Noe",
      role: "COO",
      bio: "Three-time founder in cleantech and fintech, Yin raised millions and scaled ops for giants like BYD.",
      funFact: "She joins us to keep things lean and laser-focused on your success.",
      image: yinNoeImage,
      linkedinUrl: "https://www.linkedin.com/in/yinnoe/"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              We're RankBee: Real People Powering Smarter <span className="text-purple-600">AI Wins</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Founded by folks who've scaled SEO at Amazon and beyond, we're here to make Generative AI Optimization feel straightforward—not overwhelming.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg max-w-2xl mx-auto mb-8 border border-purple-200">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                In 2024, as AI search exploded, we saw brands scrambling. So Aris (our founder) teamed up with old colleagues to build tools that actually move the needle. Today, we're backed by investors who bet on us because they see the future too.
              </p>
            </div>
            <Button
              onClick={handleMeetTeamClick}
              variant="outline"
              className="border-cta text-cta hover:bg-cta/10"
            >
              Meet the Team ↓
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section>

      {/* Our Story / Values */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900">What Drives Us</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Three pillars that keep us grounded: Foundation in expertise, Innovation without overkill, Vision for tomorrow.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-purple-200">
                <CardHeader>
                  <div className="mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed mb-4">
                    {value.description}
                  </CardDescription>
                  <p className="text-sm text-purple-600 italic">
                    {value.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamSectionRef} className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900 text-center mx-auto">Meet the Minds <span className="text-purple-600">Making It Happen</span></h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-center">
              Our crew: Battle-tested leaders who live and breathe digital growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <CardTitle className="text-lg sm:text-xl text-gray-900">{member.name}</CardTitle>
                  </div>
                  <div className="flex justify-center">
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs sm:text-sm">
                      {member.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                    {member.bio}
                  </CardDescription>
                  <p className="text-xs sm:text-sm text-purple-600 italic">
                    Fun fact: {member.funFact}
                  </p>
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="mt-4 text-purple-600 hover:text-purple-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why RankBee Exists */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-gray-900 font-bold leading-tight"><span className="text-purple-600">Why</span> RankBee Exists</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The AI search era caught the world unprepared. We built RankBee to change that.
            </p>
          </div>

          {/* The Problem */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0">
                <span className="text-lg font-bold text-purple-600">01</span>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">The Shift Nobody Was Ready For</h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
                  In 2024, ChatGPT, Claude, and Gemini became the new search engines. But most brands were still playing by old SEO rules.
                </p>
                <div className="bg-white border-l-4 border-red-500 p-4 sm:p-6 rounded-r-lg">
                  <p className="text-gray-700 italic">
                    "Traditional keyword optimization meant nothing. AI wasn't reading your site like Google—it was learning patterns, inferring relevance, and making recommendations based on attributes Google never cared about."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real Problems */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0">
                <span className="text-lg font-bold text-purple-600">02</span>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Real Brands, Real Problems</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="bg-white border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">Fintech Company</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        Ranked <span className="font-bold text-orange-600">last by Claude</span>, not because of poor quality, but because their messaging didn't align with how the AI model understood financial authority.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">E-Commerce Brand</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        ChatGPT was recommending <span className="font-bold text-orange-600">competitors instead</span> because of subtle attribute mismatches in their product descriptions.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0">
                <span className="text-lg font-bold text-purple-600">03</span>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Built by People Who've Been Here Before</h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                  Aris brought together battle-tested SEO leaders from Amazon, Skyscanner, and Tata—the folks who'd navigated massive visibility shifts before. Together, they asked a simple question:
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 sm:p-8 rounded-lg">
                  <p className="text-lg sm:text-xl font-bold text-gray-900 italic">
                    "What if we built tools that actually spoke the language AI understands?"
                  </p>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mt-6">
                  RankBee was born from that question. Our London office is where we turn that into reality every day—not through guesswork, but through scientific testing and real-world client wins.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-8">
            <a
              href="/demo"
              onClick={() => {
                trackEvent('CTA Clicked', {
                  button_text: "Let's Chat About Your AI Journey",
                  location: 'about_page_hero',
                  destination: 'demo',
                  variant: 'primary'
                });
              }}
            >
              <Button
                className="bg-cta hover:bg-cta/90 text-cta-foreground text-base sm:text-lg px-8 py-3"
              >
                Let's Chat About Your AI Journey
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Our Values in Action */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900">How We Live Our Values</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Foundation, Innovation, and Vision aren't slogans—they're how we make decisions every day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-white border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">Foundation in Practice</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We don't experiment on your brand. Every recommendation is grounded in 25+ years of real-world optimization experience. When we suggest an attribute shift, we can show you why—backed by data, not hunches.
                </p>
                <p className="text-sm text-purple-600 font-medium">
                  The result: Clients trust us to make bold moves because they know there's expertise behind them.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">Innovation Without Chaos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We test everything, but we don't overcomplicate. Some teams throw 50 variables at a problem. We identify the 2-3 that matter most and optimize ruthlessly. Speed + precision = real wins.
                </p>
                <p className="text-sm text-purple-600 font-medium">
                  The result: 40% AI visibility improvements in 2 weeks, not months of analysis paralysis.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">Vision: Democratizing AI Ops</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We build for everyone—from solo founders to global enterprises. Your budget shouldn't determine whether you win in AI. That's why our tools scale and our support is genuine, not gatekept.
                </p>
                <p className="text-sm text-purple-600 font-medium">
                  The result: Brands of all sizes can compete fairly in the AI conversation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
