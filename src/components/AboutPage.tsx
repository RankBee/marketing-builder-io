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
      linkedinUrl: "https://www.linkedin.com/in/hugo-yelo-12298151/"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              Leading Generative{" "}
              <span style={{ color: 'rgb(144, 19, 254)' }}>
                AI Optimisation&nbsp;&nbsp;
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our vision is to automate GAIO / GEO operations for SME and multinational enterprises.&nbsp;
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg max-w-2xl mx-auto mb-8 border border-purple-200">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We specialise in delivering enterprise audits and GEO strategies that improve and scale your visibility across AI systems - ChatGPT, Gemini, Perplexity,&nbsp;Claude and more. &nbsp; We diagnose the real drivers of AI rankings and deliver clear,&nbsp; actionable optimisation to elevate your brand in an AI-first world.
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
            <h2 style={{ fontWeight: "800" }}>
              <span style={{ display: "inline", backgroundColor: "rgb(255, 255, 255)", fontSize: "60px", fontWeight: "800", lineHeight: "60px" }}>
                <div style={{ backgroundColor: "rgb(249, 250, 251)", fontWeight: "800" }}>
                  <p>
                    Industry's{" "}
                    <span style={{ color: "rgb(144, 19, 254)" }}>
                      Top Experts
                    </span>
                  </p>
                </div>
              </span>
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
                      <div
                        href={member.linkedinUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                        style={{
                          display: "inline",
                          fontWeight: "500",
                          textWrap: "nowrap",
                          cursor: "pointer",
                          pointerEvents: "auto",
                        }}
                      >
                        LinkedIn
                      </div>
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
