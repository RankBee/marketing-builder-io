import svgPaths from "./svg-guhwudnlqv";
import chatGptMockup from "figma:asset/10d0fa087436a591e8316d517ab16ffe4d1071fb.png";
import { motion } from "motion/react";
import { TrendingUp, Target, Zap, Globe, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { SafeSignedIn as SignedIn, SafeSignedOut as SignedOut } from "../lib/clerk-safe";
import AccountCta from "../components/AccountCta";
import { trackEvent } from "../lib/posthog";
import { signUpUrl } from "../lib/clerk-env";

function ChatGptScenario() {
  return (
    <motion.div 
      className="w-full" 
      data-name="ChatGPTScenario"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.img 
        src={chatGptMockup} 
        alt="ChatGPT conversation showing YourBrand recommendation" 
        className="w-full h-auto rounded-[10px] border border-gray-200 shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

function HeadingDisc() {
  return (
    <motion.div 
      className="flex flex-col gap-[8px] items-start w-full" 
      data-name="Heading & Disc"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] text-brand-800 text-[16px]">Introducing New Product</p>
        <div className="flex items-center gap-1 px-2 py-1 bg-brand-100 rounded-full">
          <TrendingUp className="w-3 h-3 text-brand-700" />
          <span className="text-brand-700 text-xs font-medium">10x Growth</span>
        </div>
      </div>
      <h2 className="font-['Inter'] text-[32px] sm:text-[36px] lg:text-[48px] leading-[1.1] font-bold text-[#252c32] tracking-[-1px]">
        Be the Brand AI Recommends
      </h2>
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] text-[#4a5565] text-[16px]">
        When someone asks an AI assistant for recommendations, your content should make the shortlist. We align your messaging to the attributes AI models reward - then validate with large-scale testing.
      </p>
    </motion.div>
  );
}



function ListItem() {
  return (
    <motion.div 
      className="bg-brand-50 relative rounded-[14px] h-[46px] flex items-center gap-3 pl-4 pr-4 cursor-default transition-all hover:shadow-md" 
      data-name="List Item"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <TrendingUp className="w-4 h-4 text-brand-700 shrink-0 relative z-10" />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] text-[#101828] text-[14px] tracking-[-0.1504px] relative z-10">{`Measurable mentions & rank`}</p>
    </motion.div>
  );
}

function ListItem1() {
  return (
    <motion.div 
      className="bg-brand-50 relative rounded-[14px] h-[46px] flex items-center gap-3 pl-4 pr-4 cursor-default transition-all hover:shadow-md" 
      data-name="List Item"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Target className="w-4 h-4 text-brand-700 shrink-0 relative z-10" />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] text-[#101828] text-[14px] tracking-[-0.1504px] relative z-10">Attribute-driven insights</p>
    </motion.div>
  );
}

function ListItem2() {
  return (
    <motion.div 
      className="bg-brand-50 relative rounded-[14px] h-[46px] flex items-center gap-3 pl-4 pr-4 cursor-default transition-all hover:shadow-md" 
      data-name="List Item"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Zap className="w-4 h-4 text-brand-700 shrink-0 relative z-10" />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] text-[#101828] text-[14px] tracking-[-0.1504px] relative z-10">Faster optimization cycles</p>
    </motion.div>
  );
}

function ListItem3() {
  return (
    <motion.div 
      className="bg-brand-50 relative rounded-[14px] h-[46px] flex items-center gap-3 pl-4 pr-4 cursor-default transition-all hover:shadow-md" 
      data-name="List Item"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Globe className="w-4 h-4 text-brand-700 shrink-0 relative z-10" />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] text-[#101828] text-[14px] tracking-[-0.1504px] relative z-10">Works across your site/feed</p>
    </motion.div>
  );
}

function GaoHomePage() {
  return (
    <motion.div 
      className="gap-[12px] grid grid-cols-1 sm:grid-cols-2 grid-rows-auto sm:grid-rows-[repeat(2,_minmax(0px,_1fr))] relative shrink-0 w-full max-w-[538px]" 
      data-name="GAOHomePage"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </motion.div>
  );
}

function Details() {
  return (
    <div className="flex flex-col gap-[24px] items-start justify-center w-full" data-name="Details">
      <HeadingDisc />
      <GaoHomePage />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full"
      >
        <SignedOut>
          <a
            href={typeof window !== "undefined" ? `${signUpUrl}?redirect_url=${encodeURIComponent(window.location.href)}` : signUpUrl}
            onClick={() => {
              trackEvent('CTA Clicked', {
                button_text: 'Get Your AI Visibility Report',
                location: 'gpt_panel',
                variant: 'primary',
                destination: 'sign-up'
              });
            }}
          >
            <Button
              className="bg-brand-800 hover:bg-brand-900 text-white px-6 py-3 h-auto group"
            >
              Get Your AI Visibility Report
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </SignedOut>
        <SignedIn>
          <AccountCta
            location="gpt_panel"
            className="bg-brand-800 hover:bg-brand-900 text-white px-6 py-3 h-auto group"
          />
        </SignedIn>
      </motion.div>
    </div>
  );
}

function CtaNewsletterSection() {
  return (
    <div className="bg-white rounded-[16px] w-full shadow-xl hover:shadow-2xl transition-shadow duration-300" data-name="CTA & Newsletter/ section">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center lg:items-stretch p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 w-full">
        <div className="w-full lg:w-1/2 lg:max-w-[544px]">
          <ChatGptScenario />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <Details />
        </div>
      </div>
    </div>
  );
}

export default function GptPanel() {
  return (
    <div className="bg-[#f7f7f8] relative w-full" data-name="GPT Panel">
      <div className="flex flex-row items-center w-full">
        <div className="box-border content-stretch flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative w-full">
          <div className="w-full max-w-7xl">
            <CtaNewsletterSection />
          </div>
        </div>
      </div>
    </div>
  );
}
