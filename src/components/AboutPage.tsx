import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Target, Zap, Eye, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { trackEvent } from "../lib/posthog";

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const teamSectionRef = useRef<HTMLDivElement>(null);

  const handleMeetTeamClick = () => {
    teamSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  const team = [
    {
      name: "Aris Vrakas",
      role: "Founder/CEO/CTO",
      bio: "Aris is a business and technology leader with experience creating large technology and product teams. Second-time founder, Aris launched RankBee after a 25+ years global leadership career in product and marketing. After heading SEO for Amazon and Orbitz Worldwide and Growth at Skyscanner and Change.org, Aris is now inventing the analytics and optimisation tools needed for the Generative AI era.",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fae5805f9955b4f0c90b3275922a7fc77%2F48b7c46e1924440f8ab1a6f77903339a",
      linkedinUrl: "https://www.linkedin.com/in/arisvrakas/"
    },
    {
      name: "Hugo Yelo",
      role: "Senior Product Manager",
      bio: "Hugo is a technical SEO expert who spent five years at Amazon as Senior SEO Product Manager, helping shape SEO strategies across the EU. He now leads the automation methodology that powers RankBee's optimisation engine.",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fae5805f9955b4f0c90b3275922a7fc77%2Ff616f22c2b814c099c0ff114144df4aa",
      linkedinUrl: "https://www.linkedin.com/in/hugo-yelo/"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              Leading Generative AI Optimisation&nbsp;&nbsp;
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              <h2>Our vision is to automate GAIO / GEO operations for SME and multinational enterprises.&nbsp;</h2>
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg max-w-2xl mx-auto mb-8 border border-purple-200">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>We specialise in delivering enterprise audits and GEO strategies that improve and scale your visibility across AI systems - ChatGPT, Gemini, Perplexity,&nbsp;Claude and more. &nbsp; We diagnose the real drivers of AI rankings and deliver clear,&nbsp; actionable optimisation to elevate your brand in an AI-first world.</p>
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


      {/* Team Section */}
      <section ref={teamSectionRef} className="py-16 sm:py-20 lg:py-24 bg-gray-50" style={{ marginTop: '-3px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900 text-center mx-auto">
              <p>
                <span style={{ fontSize: '60px', backgroundColor: 'rgb(255, 255, 255)' }}>
                  Industry's&nbsp;{" "}
                  <span style={{ color: 'rgb(144, 19, 254)' }}>
                    Top Experts
                  </span>
                </span>
              </p>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
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
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="mt-4 text-purple-600 hover:text-purple-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <p>
                        <a href={member.linkedinUrl} rel="noopener noreferrer" target="_blank">
                          LinkedIn
                        </a>
                      </p>
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
                    "Traditional keyword optimization meant nothing. AI wasn't reading your site like Google-it was learning patterns, inferring relevance, and making recommendations based on attributes Google never cared about."
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
                  Aris brought together battle-tested SEO leaders from Amazon, Skyscanner, and Tata-the folks who'd navigated massive visibility shifts before. Together, they asked a simple question:
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 sm:p-8 rounded-lg">
                  <p className="text-lg sm:text-xl font-bold text-gray-900 italic">
                    "What if we built tools that actually spoke the language AI understands?"
                  </p>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mt-6">
                  RankBee was born from that question. Our London office is where we turn that into reality every day-not through guesswork, but through scientific testing and real-world client wins.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-8">
            <a
              href="/demo"
              onClick={(e) => {
                e.preventDefault();
                trackEvent('CTA Clicked', {
                  button_text: "Let's Chat About Your AI Journey",
                  location: 'about_page_hero',
                  destination: 'demo',
                  variant: 'primary'
                });
                onPageChange('demo');
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
              Foundation, Innovation, and Vision aren't slogans-they're how we make decisions every day.
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
                  We don't experiment on your brand. Every recommendation is grounded in 25+ years of real-world optimization experience. When we suggest an attribute shift, we can show you why-backed by data, not hunches.
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
                  We build for everyone-from solo founders to global enterprises. Your budget shouldn't determine whether you win in AI. That's why our tools scale and our support is genuine, not gatekept.
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
