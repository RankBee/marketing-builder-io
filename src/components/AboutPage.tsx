import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { trackEvent } from "../lib/posthog";
import { getSiteUrl } from "../lib/page-seo";

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
      slug: "aris-vrakas",
      name: "Aris Vrakas",
      role: "Founder/CEO/CTO",
      bio: "Aris is a business and technology leader with experience creating large technology and product teams. Second-time founder, Aris launched RankBee after a 25+ years global leadership career in product and marketing. After heading SEO for Amazon and Orbitz Worldwide and Growth at Skyscanner and Change.org, Aris is now inventing the analytics and optimization tools needed for the Generative AI era.",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fae5805f9955b4f0c90b3275922a7fc77%2F48b7c46e1924440f8ab1a6f77903339a",
      linkedinUrl: "https://www.linkedin.com/in/arisvrakas/"
    },
    {
      slug: "riz-kahn",
      name: "Riz Kahn",
      role: "Chief Revenue Officer",
      bio: "Riz is a growth leader with deep experience in enterprise sales and business development at high-growth tech companies, including Brainware (acquired by Lexmark), Wildfire (acquired by Google), and InVision and Uizard (acquired by Miro). Formerly Chief Customer Officer at Uizard, he scaled GTM from pre-PMF to enterprise. Riz is now Chief Revenue Officer at RankBee, where he leads global growth and go-to-market strategy for a Generative Engine Optimization platform.",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fae5805f9955b4f0c90b3275922a7fc77%2F298b8b4e281e4d6587abc6219852c2fe",
      linkedinUrl: "https://www.linkedin.com/in/rizwankhan1986/"
    },
    {
      slug: "hugo-yelo",
      name: "Hugo Yelo",
      role: "Senior Product Manager",
      bio: "Hugo is a technical SEO expert who spent five years at Amazon as Senior SEO Product Manager, helping shape SEO strategies across the EU. He now leads the automation methodology that powers RankBee's optimization engine.",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fae5805f9955b4f0c90b3275922a7fc77%2Ff616f22c2b814c099c0ff114144df4aa",
      linkedinUrl: "https://www.linkedin.com/in/hugo-yelo-12298151/"
    },
    {
      slug: "yin-noe",
      name: "Yin Noe",
      role: "Chief Operations Officer",
      bio: "Yin is a three-time founder across cleantech, fintech, and automotive, having raised ~£1M through Techstars, Shell, and angel investors. She was named one of the Financial Times' Top 50 Most Inspiring Women in Tech Europe (2022). Before RankBee, Yin led operations and B2B sales at the UK and EU headquarters of China's largest automotive alliance. She holds a Computer Science degree from the University of St Andrews.",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fae5805f9955b4f0c90b3275922a7fc77%2F019907117bbc411c990025329fd79c8d",
      linkedinUrl: "https://www.linkedin.com/in/yinnoe"
    }
  ];

  const siteUrl = getSiteUrl();
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@graph': team.map((member) => ({
      '@type': 'Person',
      '@id': `${siteUrl}/about#${member.slug}`,
      name: member.name,
      url: `${siteUrl}/about#${member.slug}`,
      jobTitle: member.role,
      description: member.bio,
      image: member.image,
      sameAs: [member.linkedinUrl],
      worksFor: {
        '@type': 'Organization',
        name: 'RankBee',
        url: siteUrl,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              Leading Generative{" "}
              <span style={{ color: 'rgb(144, 19, 254)' }}>
                AI Optimization&nbsp;&nbsp;
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Founded in 2024 by former Amazon Global SEO lead Aris Vrakas, RankBee brings together elite industry experts to redefine how brands succeed in AI search.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg max-w-2xl mx-auto mb-8 border border-purple-200">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We specialise in delivering audits and GEO strategies that improve and scale your visibility across AI systems - ChatGPT, Gemini, Perplexity,&nbsp;Claude and more. &nbsp; We diagnose the real drivers of AI rankings and deliver clear,&nbsp; actionable optimization to elevate your brand in an AI-first world.
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
      <section ref={teamSectionRef} className="bg-gray-50" style={{ paddingTop: '96px', margin: '-3px 0 -1px' }}>
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
            {team.filter((_, index) => index === 0 || index === 2).map((member, index) => (
              <Card key={index} id={member.slug} className="bg-white hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      quality={75}
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
                      <span
                        style={{
                          display: "inline",
                          fontWeight: "500",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          pointerEvents: "auto",
                        }}
                      >
                        LinkedIn
                      </span>
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Duplicate */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50" style={{ marginTop: '-3px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 style={{ fontWeight: "800" }}>
              <span style={{ display: "inline", backgroundColor: "rgb(255, 255, 255)", fontSize: "60px", fontWeight: "800", lineHeight: "60px" }}>
                <div style={{ backgroundColor: "rgb(249, 250, 251)", fontWeight: "800" }}>
                  <p>
                    Client{" "}
                    <span style={{ color: "rgb(144, 19, 254)" }}>
                      Success
                    </span>
                  </p>
                </div>
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {team.filter((_, index) => index === 1 || index === 3).map((member, index) => (
              <Card key={index} id={member.slug} className="bg-white hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      quality={75}
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
                      <span
                        style={{
                          display: "inline",
                          fontWeight: "500",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          pointerEvents: "auto",
                        }}
                      >
                        LinkedIn
                      </span>
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
