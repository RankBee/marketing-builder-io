import { useState } from "react";
import { toast } from "sonner@2.0.3";
import svgPaths from "./svg-sw856ngjo0";
import imgCompetitorDashboard from "figma:asset/d4a12367347ed2aa1674106dece510531cd8cb06.png";
import imgAttributeHeatmap from "figma:asset/4f12a8f353f78fec8dedb2120afa3e6d2bf347e0.png";
import imgAiRewrite from "figma:asset/ff7c2f79b38849b108899f24c4791f28ab53f527.png";

function Heading2() {
  return (
    <div className="w-full text-center" data-name="Heading 2">
      <p className="font-['Inter:Bold',_sans-serif] text-[#101828] text-[48px] tracking-[0.3955px] font-[Inter] font-bold">How It Works</p>
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
      <img alt="Competitor Dashboard showing Wilgot overview with competitive metrics" className="w-full h-full object-cover rounded-[10px]" src={imgCompetitorDashboard} />
    </div>
  );
}

function GaoHomePage() {
  return (
    <div className="w-full" data-name="GAOHomePage">
      <p className="font-['Inter:Regular',_sans-serif] leading-[20px] text-[#4a5565] text-[14px] tracking-[-0.1504px]">Track visibility, mentions, and ranking across hundreds of real AI prompts. See how you stack up against competitors in ChatGPT, Claude, and Gemini.</p>
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
      <img alt="Attribute Heatmap showing billing features coverage" className="w-full h-full object-cover rounded-[10px]" src={imgAttributeHeatmap} />
    </div>
  );
}

function GaoHomePage2() {
  return (
    <div className="w-full" data-name="GAOHomePage">
      <p className="font-['Inter:Regular',_sans-serif] leading-[20px] text-[#4a5565] text-[14px] tracking-[-0.1504px]">
        We're the only platform that scores content at the <span className="font-['Inter:Bold',_sans-serif]">attribute level</span> — the features and benefits AI models actually reason about. Forget keywords. Optimize for attributes.
      </p>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <div className="bg-slate-50 px-[8px] py-[4.5px] rounded-[8px]" data-name="List Item">
      <p className="font-['Inter:Regular',_sans-serif] leading-[20px] text-[#364153] text-[14px] tracking-[-0.1504px]">{text}</p>
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
      <p className="font-['Inter:Bold',_sans-serif] text-[20px] text-neutral-950 tracking-[-0.3125px] font-bold font-[Inter]">{`AI Rewrite & Retest Engine`}</p>
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="w-full rounded-[10px] overflow-hidden aspect-[4/3]" data-name="ImageWithFallback">
      <img alt="AI Rewrite & Retest Engine showing optimization metrics" className="w-full h-full object-cover rounded-[10px]" src={imgAiRewrite} />
    </div>
  );
}

function GaoHomePage4() {
  return (
    <div className="w-full" data-name="GAOHomePage">
      <p className="font-['Inter:Regular',_sans-serif] leading-[20px] text-[#4a5565] text-[14px] tracking-[-0.1504px]">
        Once you start your Free Trial, paste any URL. We ingest the page, rewrite it, and re-test against competitors with proprietary prompt sets. Every page gets a <span className="font-bold">Pre</span> and <span className="font-bold">Post</span> Optimization Score to prove ROI before you publish.
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
          className="w-full bg-transparent font-['Inter:Regular',_sans-serif] text-[#717182] text-[14px] tracking-[-0.1504px] outline-none"
          placeholder="https://your-site.com/product"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-brand-800 hover:bg-brand-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 h-[44px] rounded-[8px] px-[16px] py-[8px] flex items-center justify-center shrink-0 cursor-pointer"
        data-name="Button"
      >
        <p className="font-['Inter:Medium',_sans-serif] leading-[20px] text-[14px] text-white tracking-[-0.1504px]">
          {isLoading ? "Analyzing..." : "Free Trial"}
        </p>
      </button>
    </form>
  );
}

function CardContent2() {
  return (
    <div className="flex flex-col gap-[16px] w-full" data-name="CardContent">
      <ImageWithFallback2 />
      <GaoHomePage4 />
      <a href="/sign-up" className="w-full">
        <button
          className="bg-brand-800 hover:bg-brand-900 transition-colors duration-200 h-[44px] rounded-[8px] px-[16px] py-[8px] flex items-center justify-center w-full cursor-pointer"
          data-name="Button"
        >
          <p className="font-['Inter:Medium',_sans-serif] leading-[20px] text-[14px] text-white tracking-[-0.1504px]">
            Free Trial
          </p>
        </button>
      </a>
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
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="flex flex-col gap-[48px] w-full" data-name="How it works">
      <Heading2 />
      <Container />
    </div>
  );
}
