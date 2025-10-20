import svgPaths from "./svg-kgqrfhyvx2";

function Group() {
  return (
    <div className="h-[23.156px] relative shrink-0 w-[21.912px]" data-name="Group">
      <div className="absolute inset-[-4.66%_-14.78%_-23.31%_-14.78%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 31">
          <g filter="url(#filter0_d_20_6974)" id="Group">
            <path d={svgPaths.p1396600} fill="var(--fill-0, white)" id="Vector" />
            <path d={svgPaths.p1889b800} fill="var(--fill-0, white)" id="Vector_2" />
            <path d={svgPaths.p279b0100} fill="var(--fill-0, white)" id="Vector_3" />
            <path d={svgPaths.p12e95ee0} fill="var(--fill-0, white)" id="Vector_4" />
            <path d={svgPaths.p3843b580} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p37bf5500} fill="var(--fill-0, white)" id="Vector_6" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29.633" id="filter0_d_20_6974" width="28.3888" x="0.761922" y="0.920509">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="2.15893" />
              <feGaussianBlur stdDeviation="1.6192" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.285536 0 0 0 0 0.285536 0 0 0 0 0.285536 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_20_6974" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_20_6974" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-gradient-to-b from-[#248dfe] h-[36px] relative rounded-[11.33px] shrink-0 to-[#0a77ed] w-[35.99px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[4.504px] h-[36px] items-center justify-center px-[18.481px] py-0 relative w-[35.99px]">
          <Group />
        </div>
      </div>
    </div>
  );
}

function YourIcon() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[3.976px] h-[36px] items-center justify-center relative rounded-[15.295px] shadow-[0px_0.51px_1.02px_0px_rgba(39,21,29,0.06)] shrink-0 w-[35.99px]" data-name="Your Icon">
      <Button />
    </div>
  );
}

function BrandLogo() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Brand Logo">
      <YourIcon />
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#252c32] text-[22px] text-nowrap tracking-[-0.6395px]">
        <p className="leading-[28px] whitespace-pre">Designers System</p>
      </div>
    </div>
  );
}

function Links() {
  return (
    <div className="content-stretch flex font-['Inter:Medium',_sans-serif] font-medium gap-[24px] items-center leading-[0] not-italic overflow-clip relative shrink-0 text-[#252c32] text-[16px] text-center text-nowrap" data-name="Links">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[24px] text-nowrap whitespace-pre">About</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[24px] text-nowrap whitespace-pre">Features</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[24px] text-nowrap whitespace-pre">Pricing</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[24px] text-nowrap whitespace-pre">Careers</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[24px] text-nowrap whitespace-pre">Help</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[24px] text-nowrap whitespace-pre">Privacy Policy</p>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-center relative shrink-0 w-full" data-name="Logo">
      <BrandLogo />
      <Links />
    </div>
  );
}

function Elements() {
  return (
    <div className="absolute inset-[25.11%_35.93%_24.85%_37%]" data-name="ELEMENTS">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 15">
        <g id="ELEMENTS">
          <path d={svgPaths.p140ab80} fill="var(--fill-0, #6B7280)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Capa2() {
  return (
    <div className="absolute contents inset-[25.11%_35.93%_24.85%_37%]" data-name="Capa 2">
      <Elements />
    </div>
  );
}

function BrandPlainFacebook() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Brand / Plain / Facebook">
      <div className="absolute inset-0" data-name="Logo Container" />
      <Capa2 />
    </div>
  );
}

function Icon() {
  return (
    <div className="bg-[#f7f7f8] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[140px] shrink-0 size-[30px]" data-name="Icon">
      <BrandPlainFacebook />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[19.71%_20.27%_20.22%_19.66%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Group">
          <path d={svgPaths.p17afbe00} fill="var(--fill-0, #6B7280)" id="Vector" />
          <path d={svgPaths.pe374c00} fill="var(--fill-0, #6B7280)" id="Vector_2" />
          <path d={svgPaths.p1974af80} fill="var(--fill-0, #6B7280)" id="Vector_3" />
          <path d={svgPaths.p23ba8b80} fill="var(--fill-0, #6B7280)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function BrandPlainDribble() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Brand / Plain / Dribble">
      <div className="absolute bottom-[-0.06%] left-0 right-0 top-[0.06%]" data-name="Logo Container" />
      <Group1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="bg-[#f7f7f8] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[140px] shrink-0 size-[30px]" data-name="Icon">
      <BrandPlainDribble />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute bottom-[24.85%] left-1/4 right-[24.97%] top-[25.11%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
        <g id="Group 15">
          <path d={svgPaths.p244d9d40} fill="var(--fill-0, #6B7280)" id="Vector" />
          <g id="Vector_2"></g>
        </g>
      </svg>
    </div>
  );
}

function BrandPlainInstagram() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Brand / Plain / Instagram">
      <div className="absolute inset-0" data-name="Logo Container" />
      <Group15 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="bg-[#f7f7f8] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[140px] shrink-0 size-[30px]" data-name="Icon">
      <BrandPlainInstagram />
    </div>
  );
}

function Elements1() {
  return (
    <div className="absolute inset-[29.11%_24.95%_28.78%_24%]" data-name="ELEMENTS">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 12">
        <g id="ELEMENTS">
          <path d={svgPaths.p94ee300} fill="var(--fill-0, #6B7280)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Capa3() {
  return (
    <div className="absolute contents inset-[29.11%_24.95%_28.78%_24%]" data-name="Capa 2">
      <Elements1 />
    </div>
  );
}

function BrandPlainTwitter() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Brand / Plain / Twitter">
      <div className="absolute inset-0" data-name="Logo Container" />
      <Capa3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="bg-[#f7f7f8] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[140px] shrink-0 size-[30px]" data-name="Icon">
      <BrandPlainTwitter />
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0" data-name="Social Links">
      <Icon />
      <Icon1 />
      <Icon2 />
      <Icon3 />
    </div>
  );
}

function DetailsIteams() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="Details Iteams">
      <SocialLinks />
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">© 2023 XYZ Company. All rights reserved</p>
      </div>
    </div>
  );
}

export default function FooterBlocks() {
  return (
    <div className="bg-white relative size-full" data-name="Footer Blocks">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-center px-[64px] py-[80px] relative size-full">
          <Logo />
          <DetailsIteams />
        </div>
      </div>
    </div>
  );
}