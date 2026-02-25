import { useState } from "react";
import { toast } from "sonner";
import { ImageWithFallback as ImgWithFallback } from "../components/figma/ImageWithFallback";
import svgPaths from "./svg-sw856ngjo0";
import { SafeSignedIn as SignedIn, SafeSignedOut as SignedOut } from "../lib/clerk-safe";
import AccountCta from "../components/AccountCta";
import { trackEvent } from "../lib/posthog";
import { signUpUrl } from "../lib/clerk-env";

const imgCompetitorDashboard = "/images/competitor-dashboard.png";
const imgAttributeHeatmap = "/images/attribute-heatmap.png";
const imgAiRewrite = "/images/ai-rewrite.png";

function Heading2() {
  return (
    <div className="w-full text-center" data-name="Heading 2">
      <h1 className="font-['Inter:Bold',_sans-serif] text-[#101828] text-[48px] sm:text-[56px] lg:text-[64px] tracking-[0.3955px] font-[Inter] font-bold">How It Works</h1>
    </div>
  );
}

function Icon() {
  return (
    <div className="size-[20px] shrink-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p140c1100} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21632500} id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="flex items-center gap-2" data-name="CardTitle">
      <Icon />
      <p className="font-['Inter:Bold',_sans-serif] text-[20px] text-neutral-950 tracking-[-0.3125px] font-bold font-[Inter]">Competitor Dashboard</p>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="w-full rounded-[10px] overflow-hidden aspect-[4/3]" data-name="ImageWithFallback">
      <ImgWithFallback alt="Competitor Dashboard showing Wilgot overview with competitive metrics" className="w-full h-full object-cover rounded-[10px]" src={imgCompetitorDashboard} loading="eager" decoding="async" />
    </div>
  );
}

function GaoHomePage() {
  return (
    <div className="w-full" data-name="GAOHomePage">
      <p className="font-['Inter:Regular',_sans-serif] leading-[24px] text-[#4a5565] tracking-[-0.1504px] text-lg">Track visibility, mentions, and ranking across hundreds of real AI prompts. See how you stack up against competitors in ChatGPT, Claude, and Gemini.</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="size-[14px] shrink-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_54_125)" id="Icon">
          <path d={svgPaths.p11d16100} id="Vector" stroke="var(--stroke-0, #007A55)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p37d49080} id="Vector_2" stroke="var(--stroke-0, #007A55)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24319500} id="Vector_3" stroke="var(--stroke-0, #007A55)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p7d50f00} id="Vector_4" stroke="var(--stroke-0, #007A55)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_54_125">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function GaoHomePage1() {
  return (
    <div className="inline-flex items-center gap-2 bg-emerald-50 px-[8px] py-[5px] rounded-[8px]" data-name="GAOHomePage">
      <Icon1 />
      <p className="font-['Inter:Bold',_sans-serif] leading-[16px] text-[#007a55] text-[12px]">+58% visibility gain in 2 weeks</p>
    </div>
  );
}

function CardContent() {
  return (
    <div className="flex flex-col gap-[16px] w-full" data-name="CardContent">
      <ImageWithFallback />
      <GaoHomePage />
      <GaoHomePage1 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white rounded-[16px] border border-[rgba(0,0,0,0.1)] p-[25px] flex flex-col gap-[16px] transition-all duration-300 hover:shadow-lg hover:border-brand-700/30 hover:-translate-y-1" data-name="Card">
      <CardTitle />
      <CardContent />
    </div>
  );
}

function Icon2() {
  return (
    <div className="size-[20px] shrink-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_55_84)" id="Icon">
          <path d={svgPaths.p1902bdf0} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 4.16667H15" id="Vector_3" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M4.16667 15H2.5" id="Vector_5" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_55_84">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="flex items-center gap-2" data-name="CardTitle">
      <Icon2 />
      <p className="font-['Inter:Bold',_sans-serif] text-[20px] text-neutral-950 tracking-[-0.3125px] font-bold font-[Inter]">Attribute Heatmap</p>
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="w-full rounded-[10px] overflow-hidden aspect-[4/3]" data-name="ImageWithFallback">
      <ImgWithFallback alt="Attribute Heatmap showing billing features coverage" className="w-full h-full object-cover rounded-[10px]" src={imgAttributeHeatmap} loading="lazy" decoding="async" />
    </div>
  );
}

function GaoHomePage2() {
  return (
    <div className="w-full" data-name="GAOHomePage">
      <p className="font-['Inter:Regular',_sans-serif] leading-[24px] text-[#4a5565] tracking-[-0.1504px] text-lg">
        We're the only platform that scores content at the <span className="font-['Inter:Bold',_sans-serif]">attribute level</span> - the features and benefits AI models actually reason about. Forget keywords. Optimize for attributes.
      </p>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <div className="bg-slate-50 px-[8px] py-[4.5px] rounded-[8px]" data-name="List Item">
      <p className="font-['Inter:Regular',_sans-serif] leading-[24px] text-[#364153] tracking-[-0.1504px] text-lg">{text}</p>
    </div>
  );
}

function GaoHomePage3() {
  return (
    <div className="grid grid-cols-2 gap-[8px] w-full" data-name="GAOHomePage">
      <ListItem text="Battery life" />
      <ListItem text="Durability" />
      <ListItem text="Safety" />
      <ListItem text="Price-to-value" />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="flex flex-col gap-[16px] w-full" data-name="CardContent">
      <ImageWithFallback1 />
      <GaoHomePage2 />
      <GaoHomePage3 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white rounded-[16px] border border-[rgba(0,0,0,0.1)] p-[25px] flex flex-col gap-[16px] transition-all duration-300 hover:shadow-lg hover:border-brand-700/30 hover:-translate-y-1" data-name="Card">
      <CardTitle1 />
      <CardContent1 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="size-[20px] shrink-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p29933fc0} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b511580} id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3f3cbf40} id="Vector_3" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p30d40500} id="Vector_4" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="flex items-center gap-2" data-name="CardTitle">
      <Icon3 />
      <p className="font-['Inter:Bold',_sans-serif] text-[20px] text-neutral-950 tracking-[-0.3125px] font-bold font-[Inter]">{`AI Content Optimization`}</p>
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="w-full rounded-[10px] overflow-hidden aspect-[4/3]" data-name="ImageWithFallback">
      <ImgWithFallback alt="AI Content Optimization showing optimization metrics" className="w-full h-full object-cover rounded-[10px]" src={imgAiRewrite} loading="lazy" decoding="async" />
    </div>
  );
}

function GaoHomePage4() {
  return (
    <div className="w-full" data-name="GAOHomePage">
      <p className="font-['Inter:Regular',_sans-serif] leading-[24px] text-[#4a5565] tracking-[-0.1504px] text-lg">
        Paste any URL or raw text. We ingest the page, rewrite it, and re-test against competitors with proprietary prompt sets. Every page gets a <span className="font-bold">Pre</span> and <span className="font-bold">Post</span> Optimization Score before you publish.
      </p>
    </div>
  );
}

function GaoHomePage5() {
  const [url, setUrl] = useState("https://your-site.com/product");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic URL validation
    try {
      new URL(url);
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Analysis started!", {
          description: `We're analyzing ${url}. Results will be ready in a few moments.`,
        });
      }, 1500);
    } catch {
      toast.error("Invalid URL", {
        description: "Please enter a valid URL starting with http:// or https://",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-[8px] w-full" data-name="GAOHomePage">
      <div className="flex-1 bg-[#f3f3f5] h-[44px] rounded-[8px] px-[12px] py-[10px] flex items-center overflow-hidden" data-name="Input">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full bg-transparent font-['Inter:Regular',_sans-serif] text-[#717182] text-[16px] tracking-[-0.1504px] outline-none"
          placeholder="https://your-site.com/product"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-brand-800 hover:bg-brand-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 h-[44px] rounded-[8px] px-[16px] py-[8px] flex items-center justify-center shrink-0 cursor-pointer"
        data-name="Button"
      >
        <span className="font-['Inter:Medium',_sans-serif] leading-[20px] text-[16px] text-white tracking-[-0.1504px]">
          {isLoading ? "Analyzing..." : "Free Trial"}
        </span>
      </button>
    </form>
  );
}

function CardContent2() {
  return (
    <div className="flex flex-col gap-[16px] w-full" data-name="CardContent">
      <ImageWithFallback2 />
      <GaoHomePage4 />
      <SignedOut>
        <a
          href={`${signUpUrl}?redirect_url=${encodeURIComponent('/onboard')}`}
          className="w-full"
          onClick={() => {
            trackEvent('CTA Clicked', {
              button_text: 'Free Trial',
              location: 'how_it_works_card',
              variant: 'primary',
              destination: 'sign-up'
            });
          }}
        >
          <button
            className="relative overflow-hidden h-[44px] rounded-[8px] px-[16px] py-[8px] flex items-center justify-center w-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            style={{
              background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
            data-name="Button"
          >
            <span className="font-['Inter:Medium',_sans-serif] leading-[20px] text-[16px] text-white tracking-[-0.1504px]">
              Free Trial
            </span>
          </button>
        </a>
      </SignedOut>
      <SignedIn>
        <div className="w-full">
          <AccountCta
            location="how_it_works_card"
            className="w-full bg-brand-800 hover:bg-brand-900 transition-colors duration-200 h-[44px] rounded-[8px] px-[16px] py-[8px] flex items-center justify-center"
          />
        </div>
      </SignedIn>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white rounded-[16px] border border-[rgba(0,0,0,0.1)] p-[25px] flex flex-col gap-[16px] transition-all duration-300 hover:shadow-lg hover:border-brand-700/30 hover:-translate-y-1" data-name="Card">
      <CardTitle2 />
      <CardContent2 />
    </div>
  );
}

function Container() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full" data-name="Container">
      <Card2 />
      <Card />
      <Card1 />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="flex flex-col gap-[48px] w-full" data-name="How it works">
      <Heading2 />
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-gray-600 leading-relaxed text-center">Our platform tracks, measures and optimizes your content to win in the AI search. It doesn't guess what content will perform in AI search - it simulates AI decisions before publishing. It ingests competitor and ecosystem content, generates hundreds of content variations, and runs large-scale LLM simulations to see which versions AI cites, prefers, and recommends. Only the winning version is surfaced. The result: no trial-and-error, no wasted content, and no waiting to see what works. Just content engineered to influence AI recommendations from day one.</p>
      </div>
      <Container />
    </div>
  );
}
