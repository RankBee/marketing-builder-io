import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "", prefix = "" }) {
  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (latest) => {
    const rounded = Math.round(latest);
    return `${prefix}${rounded}${suffix}`;
  });
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          motionValue.set(target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [isVisible, target, motionValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export function CaseStudySection() {
  const metrics = [
    { label: "Before", value: 6, suffix: "%", description: "Coverage across prompts" },
    { label: "After", value: 64, suffix: "%", description: "Coverage across prompts" },
    { label: "Avg. Rank", value: 2.1, prefix: "#", description: "Across top intents" },
    { label: "Time to Impact", value: 14, suffix: "d", description: "Median across pages" }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-800 rounded-3xl p-6 sm:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Story */}
            <div className="space-y-6">
              <h2 className="text-white text-2xl sm:text-3xl">
                From 6% to 64% <span className="text-purple-400">ChatGPT Coverage</span> — in 14 Days
              </h2>

              <div className="text-[#cad5e2] space-y-4">
                <p>
                  A pilot customer in consumer electronics identified underperforming attributes and rewrote key pages. After optimization, ChatGPT mentioned their brand in{' '}
                  <span className="font-bold">64%</span> of relevant prompts — up from{' '}
                  <span className="font-bold">6%</span>.
                </p>
              </div>

              <blockquote className="text-slate-200 italic border-l-4 border-white/20 pl-4">
                "It's like SEO for ChatGPT — but faster, smarter, and measurable." — VP Marketing, Pilot Customer
              </blockquote>
            </div>

            {/* Right Column - Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/10 rounded-2xl p-6 space-y-2"
                >
                  <p className="text-[#cad5e2] text-sm">{metric.label}</p>
                  <p className="text-white text-4xl font-bold">
                    <AnimatedNumber
                      target={metric.value}
                      suffix={metric.suffix || ""}
                      prefix={metric.prefix || ""}
                    />
                  </p>
                  <p className="text-[#90a1b9] text-xs">{metric.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
