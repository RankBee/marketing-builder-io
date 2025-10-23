import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Target, Zap, Eye, ExternalLink } from "lucide-react";
import { useRef } from "react";
import yinNoeImage from 'figma:asset/49edafd48740cd6fe95aa4ed7c2168d9e77e46f0.png';
import williamGallahueImage from 'figma:asset/332f88e630a8a70ac8890fdc18ce73486a61524a.png';
import arisVrakasImage from 'figma:asset/b7cf0bf96cdd61b5fdbcc47ebb89f402e22edbab.png';

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
      description: "Born from 25+ years at Amazon, Tata, and startups��real-world SEO that powers our GAIO tech.",
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
      image: arisVrakasImage
    },
    {
      name: "Yin Noe",
      role: "COO",
      bio: "Three-time founder in cleantech and fintech, Yin raised millions and scaled ops for giants like BYD.",
      funFact: "She joins us to keep things lean and laser-focused on your success.",
      image: yinNoeImage
    },
    {
      name: "William Gallahue",
      role: "Client Success Lead",
      bio: "18 years in enterprise SEO at Tata and Hilton—Will's your go-to for turning data into doable plans that stick.",
      funFact: "Known for making complex strategies feel simple and actionable.",
      image: williamGallahueImage
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              We're RankBee: Real People Powering Smarter AI Wins
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900 text-center mx-auto">Meet the Minds Making It Happen</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-center">
              Our crew: Battle-tested leaders who live and breathe digital growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                  <Button variant="ghost" size="sm" className="mt-4 text-purple-600 hover:text-purple-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-gray-900">Behind the Scenes</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                We started this because traditional SEO felt outdated in the AI world. When ChatGPT launched, we realized brands needed a completely new playbook.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Our London office (yes, the coffee really is that good) is where we brainstorm the next breakthrough in AI optimization. From whiteboard sessions to client calls, everything we do is focused on one thing: making your brand impossible to ignore in AI conversations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => onPageChange("demo")}
                  className="bg-cta hover:bg-cta/90 text-cta-foreground text-sm sm:text-base"
                >
                  Let's Chat About Your AI Journey
                </Button>
                <Button 
                  variant="outline"
                  className="border-cta text-cta hover:bg-cta/10 text-sm sm:text-base"
                >
                  View Our Work
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:pl-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1690264421892-46e3af5c3455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwb2ZmaWNlJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTk4NDI0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="RankBee team collaborating"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
