import svgPaths from "./svg-arf0p9jlye";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePageActive } from "../lib/usePageActive";

function HeadingDisc() {
  return (
    <div className="flex flex-col gap-[24px] items-center text-center w-full relative" data-name="Heading & Disc">
      {/* Gradient badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200"
      >
        <span className="text-sm text-purple-900">Get Discovered in the AI Search</span>
      </motion.div>

      {/* Main heading with gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col font-['Inter:Semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[36px] sm:text-[42px] lg:text-[48px] tracking-[-1px] max-w-full"
      >
        <p className="leading-[44px] sm:leading-[52px] lg:leading-[60px] font-bold">
          <span className="text-purple-600 text-[36px] sm:text-[42px] lg:text-[48px]">AI Content Optimization</span>
        </p>
      </motion.div>

      {/* Description with better spacing */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-['Inter:Regular',_sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[18px] text-gray-600 max-w-3xl"
      >
        Welcome to the Future of SEO. AI search engines don't read your website - they interpret it based on criteria that we can influence. If your content isn't aligned with how AI models think, you're invisible. Our platform changes that - scientifically. By analysing competitor signals and mathematically tuning every piece, we ensure your content is the version AI is most likely to surface.
      </motion.p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-4"
      >
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl text-purple-600 font-bold">10x</div>
          <div className="text-sm text-gray-500">Visibility Boost</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl text-purple-600 font-bold">14 Days</div>
          <div className="text-sm text-gray-500">Average Time</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl sm:text-3xl text-purple-600 font-bold">64%</div>
          <div className="text-sm text-gray-500">AI Coverage</div>
        </div>
      </motion.div>
    </div>
  );
}

function CtaNewsletterSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="basis-0 bg-white rounded-2xl grow min-h-px min-w-px relative shrink-0 shadow-2xl shadow-purple-500/20 border border-purple-100/50"
      data-name="CTA & Newsletter/ section"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl" />
      
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex justify-center p-[32px] sm:p-[48px] lg:p-[80px] relative w-full">
          <HeadingDisc />
        </div>
      </div>
    </motion.div>
  );
}

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

function BubbleBackgroundLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();
  const isPageActive = usePageActive();
  const shouldAnimate = isVisible && isPageActive && !prefersReduced;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    },
    [mouseX, mouseY],
  );

  // Pause everything when off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Only attach mouse listener when actively animating
  useEffect(() => {
    if (!shouldAnimate) return;
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [shouldAnimate, handleMouseMove]);

  const makeGradient = (color: string) =>
    `radial-gradient(circle at center, rgba(${color}, 0.8) 0%, rgba(${color}, 0) 50%)`;

  const colors = {
    first: "138,43,226",
    second: "221,74,255",
    third: "100,50,255",
    fourth: "200,80,200",
    fifth: "180,100,255",
    sixth: "140,100,255",
  };

  // Reduced motion: show static gradient blobs, no animation
  if (prefersReduced) {
    return (
      <div ref={containerRef} className="absolute inset-0">
        <div className="absolute inset-0" style={{ filter: "blur(40px)" }}>
          <div
            className="absolute rounded-full mix-blend-hard-light"
            style={{ width: "80%", height: "80%", top: "10%", left: "10%", background: makeGradient(colors.first) }}
          />
          <div
            className="absolute rounded-full mix-blend-hard-light"
            style={{ width: "80%", height: "80%", top: "5%", left: "15%", background: makeGradient(colors.second) }}
          />
        </div>
      </div>
    );
  }

  // When off-screen or idle, render container (for IntersectionObserver) but skip heavy filter + animations
  if (!shouldAnimate) {
    return <div ref={containerRef} className="absolute inset-0" />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* SVG goo filter */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="bubble-goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              result="goo"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Bubbles container with goo filter */}
      <div className="absolute inset-0" style={{ filter: "url(#bubble-goo) blur(40px)" }}>
        {/* Bubble 1 - vertical float */}
        <motion.div
          className="absolute rounded-full mix-blend-hard-light"
          style={{
            width: "80%",
            height: "80%",
            top: "10%",
            left: "10%",
            background: makeGradient(colors.first),
          }}
          animate={{ y: [-50, 50, -50] }}
          transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
        />

        {/* Bubble 2 - rotating orbit */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center"
          style={{ transformOrigin: "calc(50% - 400px) center" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <div
            className="rounded-full mix-blend-hard-light"
            style={{
              width: "80%",
              height: "80%",
              background: makeGradient(colors.second),
            }}
          />
        </motion.div>

        {/* Bubble 3 - rotating orbit offset */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center"
          style={{ transformOrigin: "calc(50% + 400px) center" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          <div
            className="absolute rounded-full mix-blend-hard-light"
            style={{
              width: "80%",
              height: "80%",
              top: "calc(50% + 200px)",
              left: "calc(50% - 500px)",
              background: makeGradient(colors.third),
            }}
          />
        </motion.div>

        {/* Bubble 4 - horizontal float */}
        <motion.div
          className="absolute rounded-full mix-blend-hard-light opacity-70"
          style={{
            width: "80%",
            height: "80%",
            top: "10%",
            left: "10%",
            background: makeGradient(colors.fourth),
          }}
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 40, ease: "easeInOut", repeat: Infinity }}
        />

        {/* Bubble 5 - large rotating orbit */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center"
          style={{ transformOrigin: "calc(50% - 800px) calc(50% + 200px)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <div
            className="absolute rounded-full mix-blend-hard-light"
            style={{
              width: "160%",
              height: "160%",
              top: "calc(50% - 80%)",
              left: "calc(50% - 80%)",
              background: makeGradient(colors.fifth),
            }}
          />
        </motion.div>

        {/* Bubble 6 - interactive, follows mouse */}
        <motion.div
          className="absolute rounded-full mix-blend-hard-light opacity-70"
          style={{
            width: "100%",
            height: "100%",
            background: makeGradient(colors.sixth),
            x: springX,
            y: springY,
          }}
        />
      </div>
    </div>
  );
}

export default function CtaBlocks() {
  return (
    <div className="bg-gradient-to-br from-[#9810fa] via-[#7b1bd9] to-[#9810fa] relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden" data-name="CTA Blocks">
      {/* Bubble background effect */}
      <BubbleBackgroundLayer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 sm:p-10 mb-8 text-white text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Our AI-driven Content Optimisation Tool is at the heart of our services.</h3>
          <p className="text-lg leading-relaxed text-center">Your content might be invisible to AI. We fix that. Our optimization engine rewrites and tests your pages so ChatGPT, Gemini, and Google AI Overviews are more likely to mention your brand when customers ask.</p>
        </motion.div>

        <CtaNewsletterSection />
      </div>
    </div>
  );
}
