export function CaseStudySection() {
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
              {/* Before Card */}
              <div className="bg-white/10 rounded-2xl p-6 space-y-2">
                <p className="text-[#cad5e2] text-sm">Before</p>
                <p className="text-white text-4xl font-bold">6%</p>
                <p className="text-[#90a1b9] text-xs">Coverage across prompts</p>
              </div>

              {/* After Card */}
              <div className="bg-white/10 rounded-2xl p-6 space-y-2">
                <p className="text-[#cad5e2] text-sm">After</p>
                <p className="text-white text-4xl font-bold">64%</p>
                <p className="text-[#90a1b9] text-xs">Coverage across prompts</p>
              </div>

              {/* Avg Rank Card */}
              <div className="bg-white/10 rounded-2xl p-6 space-y-2">
                <p className="text-[#cad5e2] text-sm">Avg. Rank</p>
                <p className="text-white text-4xl font-bold">#2.1</p>
                <p className="text-[#90a1b9] text-xs">Across top intents</p>
              </div>

              {/* Time to Impact Card */}
              <div className="bg-white/10 rounded-2xl p-6 space-y-2">
                <p className="text-[#cad5e2] text-sm">Time to Impact</p>
                <p className="text-white text-4xl font-bold">14d</p>
                <p className="text-[#90a1b9] text-xs">Median across pages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
