import svgPaths from "./svg-arf0p9jlye";
import { motion } from "motion/react";

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
        <span className="text-sm text-purple-900">The Future of Discovery</span>
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
          <span className="text-purple-600">AI Search</span> <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">Is the New SEO</span>
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
        AI assistants don't read your site like Google. They infer relevance from attributes, context, and training data. If your content isn't aligned with how AI models think, you're invisible. Our platform changes that - scientifically.
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
        <div className="box-border content-stretch flex justify-center px-[32px] sm:px-[48px] lg:px-[80px] py-[24px] sm:py-[36px] lg:py-[48px] relative w-full">
          <HeadingDisc />
        </div>
      </div>
    </motion.div>
  );
}

export default function CtaBlocks() {
  return (
    <div className="bg-gradient-to-br from-[#9810fa] via-[#7b1bd9] to-[#9810fa] relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden" data-name="CTA Blocks">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CtaNewsletterSection />
      </div>
    </div>
  );
}
