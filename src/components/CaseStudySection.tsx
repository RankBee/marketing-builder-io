import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1.5; // Animation duration in seconds
          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);

            if (typeof target === "number") {
              const current = startValue + (target - startValue) * progress;
              // Round to 1 decimal place for decimals, otherwise round to nearest integer
              const rounded = target === Math.floor(target)
                ? Math.round(current)
                : Math.round(current * 10) / 10;
              setDisplayValue(rounded);
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [target, hasAnimated]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
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
                From 6% to 64% <span className="text-purple-400">ChatGPT Coverage</span> - in 14 Days
              </h2>

              <div className="text-[#cad5e2] space-y-4">
                <p>
                  DJ Studio, a B2C DJ software company identified underperforming attributes, rewrote key pages and published articles using the RankBee Content writer. After optimization, ChatGPT mentioned their brand in{' '}
                  <span className="font-bold">64%</span> of relevant prompts - up from{' '}
                  <span className="font-bold">6%</span>.
                </p>
              </div>

              <blockquote className="text-slate-200 italic border-l-4 border-white/20 pl-4">
                "It's like SEO for ChatGPT - but faster, smarter, and measurable." 
              </blockquote>
            </div>

            {/* Right Column - Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
