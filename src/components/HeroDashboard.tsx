import svgPaths from "../imports/svg-d2wbzq4ilg";
import imgChatGptLogoSvg1 from "../assets/9340dc6d4f7e1823f26d71086af558cabd844e38.png";

export function HeroDashboard() {
  return (
    <div className="w-full max-w-[1248px] mx-auto bg-gray-50 rounded-xl shadow-2xl overflow-hidden">
      {/* Top Bar */}
      <div className="bg-white h-[75px] border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Date Range Picker */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 16 16">
              <path d="M5.33301 1.33398V4.00065" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d="M10.667 1.33398V4.00065" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p2e667900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d="M2 6.66602H14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
            <span className="text-sm text-gray-700">Jul 18, 2025 to Aug 29, 2025</span>
          </div>

          {/* Brand Selector */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">C</span>
            </div>
            <span className="text-sm text-gray-700">Chargebee</span>
          </div>

          {/* Model Selector */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2">
            <img src={imgChatGptLogoSvg1} alt="ChatGPT" className="w-5 h-5" />
            <span className="text-sm text-gray-700">ChatGPT 4o</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* Page Title */}
        <h3 className="text-base font-normal text-neutral-950">Chargebee overview</h3>

        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-4">
          {/* Coverage Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
            <p className="text-sm text-gray-600">Coverage</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">61.18%</p>
              <svg className="w-20 h-8" fill="none" viewBox="0 0 80 32">
                <path d={svgPaths.p1a4e2180} fill="url(#paint0_linear_coverage)" />
                <path d={svgPaths.p3253a840} stroke="#6366F1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <defs>
                  <linearGradient id="paint0_linear_coverage" x1="2" x2="2" y1="2" y2="2802" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#6366F1" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                <path d="M8 8.5H11V5.5" stroke="#E7000B" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p10ae5c80} stroke="#E7000B" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-red-600">-0.5bps</span>
            </div>
          </div>

          {/* Average Rank Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
            <p className="text-sm text-gray-600">Average Rank</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">1.8</p>
              <svg className="w-20 h-8" fill="none" viewBox="0 0 80 32">
                <path d={svgPaths.p2015ae50} fill="url(#paint0_linear_rank)" />
                <path d={svgPaths.p36d57c0} stroke="#8B5CF6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <defs>
                  <linearGradient id="paint0_linear_rank" x1="2" x2="2" y1="2" y2="2802" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                <path d="M8 3.5H11V6.5" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p3a7e7417} stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-green-600">-0.04</span>
            </div>
          </div>

          {/* Citation Count Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
            <p className="text-sm text-gray-600">Citation Count</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">471</p>
              <svg className="w-20 h-8" fill="none" viewBox="0 0 80 32">
                <path d={svgPaths.pbfea970} fill="url(#paint0_linear_citation)" />
                <path d={svgPaths.p1046600} stroke="#8B5CF6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <defs>
                  <linearGradient id="paint0_linear_citation" x1="2" x2="2" y1="2" y2="2802" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                <path d="M8 3.5H11V6.5" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p3a7e7417} stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-green-600">+21</span>
            </div>
          </div>

          {/* Prompts Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
            <p className="text-sm text-gray-600">Prompts</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">1018/1664</p>
              <svg className="w-20 h-8" fill="none" viewBox="0 0 80 32">
                <path d={svgPaths.p14cecd80} fill="url(#paint0_linear_prompts)" />
                <path d={svgPaths.p14c56b9c} stroke="#8B5CF6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <defs>
                  <linearGradient id="paint0_linear_prompts" x1="2" x2="2" y1="2" y2="2802" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                <path d="M8 3.5H11V6.5" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p3a7e7417} stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-green-600">+5 prompts</span>
            </div>
          </div>
        </div>

        {/* Competitive Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-base font-normal text-neutral-950 mb-6">Competitive Summary</h3>
          
          <div className="grid grid-cols-2 gap-8">
            {/* Radar Chart */}
            <div className="flex items-center justify-center">
              <div className="relative w-[350px] h-[310px]">
                <svg className="absolute inset-0" viewBox="0 0 350 310" fill="none">
                  {/* Grid lines */}
                  <g opacity="0.3">
                    <path d={svgPaths.p216486c0} stroke="black" />
                    <path d={svgPaths.p27697500} stroke="black" />
                    <path d={svgPaths.p26b75500} stroke="black" />
                    <path d={svgPaths.p1a0cc00} stroke="#0A0A0A" />
                    <path d={svgPaths.p58adc00} stroke="#0A0A0A" />
                    <path d={svgPaths.p2a64d800} stroke="#0A0A0A" />
                    <path d="M136.609 157.589V1.00062" stroke="black" />
                    <path d={svgPaths.p18f86580} stroke="black" />
                  </g>
                  {/* Data polygons */}
                  <path d={svgPaths.p1761b100} fill="#640EFF" fillOpacity="0.2" stroke="#5F3BBD" strokeWidth="2.5" />
                  <path d={svgPaths.pa914900} fill="#4B9AF6" fillOpacity="0.27" stroke="#4F9A99" strokeWidth="2.5" />
                </svg>
                <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600">Rank</p>
                <p className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600">Coverage</p>
                <p className="absolute bottom-0 right-0 text-xs font-bold text-gray-600">Citations</p>
              </div>
            </div>

            {/* Competitor Table */}
            <div className="space-y-0">
              {/* Table Header */}
              <div className="border-b border-gray-100 pb-3 flex items-center gap-4 text-xs text-gray-500">
                <span className="w-40">Brand</span>
                <span className="w-24">Coverage</span>
                <span className="w-20">Avg Rank</span>
                <span className="w-20">Citations</span>
              </div>

              {/* Table Rows */}
              <div className="space-y-0">
                {/* Chargebee */}
                <div className="border-b border-gray-100 py-3 flex items-center gap-4">
                  <div className="w-40 flex items-center gap-2">
                    <span className="text-sm text-gray-400">1.</span>
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">C</span>
                    </div>
                    <span className="text-sm text-purple-600 font-medium">Chargebee</span>
                  </div>
                  <div className="w-24 flex items-center gap-2">
                    <div className="w-1 h-1.5 bg-purple-600 rounded-full"></div>
                    <span className="text-sm text-gray-900">61.2%</span>
                  </div>
                  <span className="w-20 text-sm text-gray-900">1.82</span>
                  <span className="w-20 text-sm text-gray-900">471</span>
                </div>

                {/* Recurly */}
                <div className="border-b border-gray-100 py-3 flex items-center gap-4">
                  <div className="w-40 flex items-center gap-2">
                    <span className="text-sm text-gray-400">2.</span>
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">R</span>
                    </div>
                    <span className="text-sm text-gray-900">Recurly</span>
                  </div>
                  <div className="w-24 flex items-center gap-2">
                    <div className="w-1 h-1.5 bg-teal-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">54.4%</span>
                  </div>
                  <span className="w-20 text-sm text-gray-900">2.73</span>
                  <span className="w-20 text-sm text-gray-900">459</span>
                </div>

                {/* Zuora */}
                <div className="border-b border-gray-100 py-3 flex items-center gap-4">
                  <div className="w-40 flex items-center gap-2">
                    <span className="text-sm text-gray-400">3.</span>
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">Z</span>
                    </div>
                    <span className="text-sm text-gray-900">Zuora</span>
                  </div>
                  <div className="w-24 flex items-center gap-2">
                    <div className="w-1 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">50%</span>
                  </div>
                  <span className="w-20 text-sm text-gray-900">2.61</span>
                  <span className="w-20 text-sm text-gray-900">313</span>
                </div>

                {/* Stripe - Highlighted */}
                <div className="bg-purple-50 border-2 border-purple-200 py-3 flex items-center gap-4">
                  <div className="w-40 flex items-center gap-2 pl-3">
                    <span className="text-sm text-gray-400">4.</span>
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">S</span>
                    </div>
                    <span className="text-sm text-gray-900">Stripe</span>
                  </div>
                  <div className="w-24 flex items-center gap-2">
                    <div className="w-1 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">43.6%</span>
                  </div>
                  <span className="w-20 text-sm text-gray-900">2.64</span>
                  <span className="w-20 text-sm text-gray-900">116</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}