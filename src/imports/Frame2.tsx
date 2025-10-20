import svgPaths from "./svg-bmi9qbsqji";

function Background() {
  return (
    <div className="absolute h-[1114px] left-[calc(50%-0.344px)] overflow-clip top-[calc(50%-19px)] translate-x-[-50%] translate-y-[-50%] w-[1567.31px]" data-name="Background">
      <div className="absolute h-[1067.11px] left-[calc(50%+0.344px)] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1500.62px]" />
    </div>
  );
}

function TextDetail() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Text Detail">
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-brand-700 text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">80% of brands are invisible in AI responses—fix that today</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Text">
      <TextDetail />
      <div className="bg-white h-0 shrink-0 w-[88px]" data-name="min-width line" />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#e6e3f9] hover:bg-[#d4d0f7] transition-colors duration-200 box-border content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[16px] py-0 relative rounded-[8px] shrink-0 cursor-pointer" data-name="Button">
      <Text />
    </div>
  );
}

function CardTitleText() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center not-italic relative shrink-0 text-center w-full" data-name="Card/Title/Text">
      <p className="font-['Inter:ExtraBold',_sans-serif] font-extrabold leading-[64px] min-w-full relative shrink-0 text-[#252c32] text-[64px] tracking-[-2px] w-[min-content]">
        10x Improvement in
        <br aria-hidden="true" />
        ChatGPT Visibility in 14 Days
      </p>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-gray-500 w-[686px]">
        <p className="leading-[28px]">We cut through the noise to show how ChatGPT, Gemini, and more rank you—then give you simple steps to climb higher. No fluff, just results that grow your business.</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g id="Group">
        <g id="Vector"></g>
        <path d={svgPaths.p32c88600} fill="var(--fill-0, white)" id="Vector_2" />
      </g>
    </svg>
  );
}

function IconSharpArrowRightLine() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="icon/sharp/arrow-right-line">
      <Group />
    </div>
  );
}

function TextDetail1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Text Detail">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Try it now for free</p>
      <IconSharpArrowRightLine />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center min-w-[88px] relative shrink-0" data-name="Text">
      <TextDetail1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-brand-700 hover:bg-brand-800 transition-colors duration-200 box-border content-stretch flex flex-col h-[56px] items-center justify-center px-[16px] py-0 relative rounded-[8px] shrink-0 cursor-pointer" data-name="Button">
      <Text1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[336px]" data-name="Button">
      <Button1 />
    </div>
  );
}

function TextHeading() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text/Heading">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-center px-[64px] py-0 relative w-full">
          <Button />
          <CardTitleText />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function HeroBlocks() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[64px] h-[1030px] items-center left-0 overflow-clip pb-0 pt-[80px] px-[64px] top-0 w-[1440px]" data-name="Hero Blocks">
      <Background />
      <TextHeading />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-gray-50 h-[54.5px] left-[220.34px] top-0 w-[132.203px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[15px] left-[66.4px] not-italic text-[#364153] text-[12px] text-center top-[12.5px] translate-x-[-50%] w-[67px]">Automation Features</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-gray-50 h-[54.5px] left-[352.55px] top-0 w-[132.203px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[15px] left-[66.54px] not-italic text-[#364153] text-[12px] text-center top-[12.5px] translate-x-[-50%] w-[66px]">{`Analytics & Reporting`}</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-gray-50 h-[54.5px] left-[484.75px] top-0 w-[132.203px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[15px] left-[66.47px] not-italic text-[#364153] text-[12px] text-center top-[12.5px] translate-x-[-50%] w-[72px]">Usage Plans Scalability</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-gray-50 h-[54.5px] left-[616.95px] top-0 w-[132.203px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[15px] left-[65.85px] not-italic text-[#364153] text-[12px] text-center text-nowrap top-[20px] translate-x-[-50%] whitespace-pre">Billing Accuracy</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute bg-gray-50 h-[54.5px] left-[749.16px] top-0 w-[132.203px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[15px] left-[66.38px] not-italic text-[#364153] text-[12px] text-center top-[12.5px] translate-x-[-50%] w-[78px]">{`Auto Billing & Invoicing`}</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute bg-gray-50 h-[54.5px] left-[881.36px] top-0 w-[132.203px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[15px] left-[66.56px] not-italic text-[#364153] text-[12px] text-center text-nowrap top-[20px] translate-x-[-50%] whitespace-pre">Payment Methods</p>
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="absolute bg-gray-50 h-[54.5px] left-[1013.56px] top-0 w-[132.203px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[15px] left-[66.4px] not-italic text-[#364153] text-[12px] text-center text-nowrap top-[20px] translate-x-[-50%] whitespace-pre">Billing Flexibility</p>
    </div>
  );
}

function HeaderCell7() {
  return (
    <div className="absolute bg-gray-50 h-[54.5px] left-[1145.77px] top-0 w-[132.234px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[15px] left-[66.97px] not-italic text-[#364153] text-[12px] text-center text-nowrap top-[20px] translate-x-[-50%] whitespace-pre">System Integration</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute h-[54.5px] left-0 top-0 w-[1278px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
      <HeaderCell6 />
      <HeaderCell7 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute h-[54.5px] left-0 top-0 w-[1278px]" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function PercentageBadge() {
  return (
    <div className="absolute bg-[#00d492] h-[32px] left-[38.35px] rounded-[10px] top-[16.5px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">84%</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[65px] left-[220.34px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[23px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[65px] left-[352.55px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[23px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[65px] left-[484.75px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[23px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[65px] left-[616.95px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text4 />
    </div>
  );
}

function PercentageBadge1() {
  return (
    <div className="absolute bg-[#00d492] h-[32px] left-[38.1px] rounded-[10px] top-[16.5px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">86%</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[65px] left-[749.16px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge1 />
    </div>
  );
}

function PercentageBadge2() {
  return (
    <div className="absolute bg-[#00d492] h-[32px] left-[38.1px] rounded-[10px] top-[16.5px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">92%</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[65px] left-[881.36px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge2 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[23px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[65px] left-[1013.56px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.6px] top-[23px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[65px] left-[1145.77px] top-0 w-[132.234px]" data-name="Table Cell">
      <Text6 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute h-[65px] left-0 top-0 w-[1278px] hover:bg-gray-50/50 transition-colors duration-200" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
    </div>
  );
}

function PercentageBadge3() {
  return (
    <div className="absolute bg-[#00d492] h-[32px] left-[38.35px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">86%</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[50.5px] left-[220.34px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge3 />
    </div>
  );
}

function PercentageBadge4() {
  return (
    <div className="absolute bg-[#00d492] h-[32px] left-[38.1px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">83%</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[50.5px] left-[352.55px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge4 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[50.5px] left-[484.75px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[50.5px] left-[616.95px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[50.5px] left-[749.16px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[50.5px] left-[881.36px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[50.5px] left-[1013.56px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text11 />
    </div>
  );
}

function PercentageBadge5() {
  return (
    <div className="absolute bg-[#00d492] h-[32px] left-[38.12px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">92%</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[50.5px] left-[1145.77px] top-0 w-[132.234px]" data-name="Table Cell">
      <PercentageBadge5 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute h-[50.5px] left-0 top-[65px] w-[1278px] hover:bg-gray-50/50 transition-colors duration-200" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.84px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute h-[50.5px] left-[220.34px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute h-[50.5px] left-[352.55px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text13 />
    </div>
  );
}

function PercentageBadge6() {
  return (
    <div className="absolute bg-[#ff6900] h-[32px] left-[38.1px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">79%</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute h-[50.5px] left-[484.75px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge6 />
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute h-[50.5px] left-[616.95px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text14 />
    </div>
  );
}

function PercentageBadge7() {
  return (
    <div className="absolute bg-[#00d492] h-[32px] left-[38.1px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">80%</p>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute h-[50.5px] left-[749.16px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge7 />
    </div>
  );
}

function PercentageBadge8() {
  return (
    <div className="absolute bg-[#ff6900] h-[32px] left-[38.1px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">79%</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute h-[50.5px] left-[881.36px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge8 />
    </div>
  );
}

function PercentageBadge9() {
  return (
    <div className="absolute bg-[#ff6900] h-[32px] left-[38.1px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">71%</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute h-[50.5px] left-[1013.56px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge9 />
    </div>
  );
}

function PercentageBadge10() {
  return (
    <div className="absolute bg-[#ff6900] h-[32px] left-[38.12px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">76%</p>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute h-[50.5px] left-[1145.77px] top-0 w-[132.234px]" data-name="Table Cell">
      <PercentageBadge10 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute h-[50.5px] left-0 top-[115.5px] w-[1278px] hover:bg-gray-50/50 transition-colors duration-200" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.84px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute h-[50.5px] left-[220.34px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text15 />
    </div>
  );
}

function PercentageBadge11() {
  return (
    <div className="absolute bg-[#00d492] h-[32px] left-[38.1px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">88%</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute h-[50.5px] left-[352.55px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge11 />
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute h-[50.5px] left-[484.75px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text16 />
    </div>
  );
}

function PercentageBadge12() {
  return (
    <div className="absolute bg-[#ff6900] h-[32px] left-[38.1px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">74%</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute h-[50.5px] left-[616.95px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge12 />
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute h-[50.5px] left-[749.16px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text17 />
    </div>
  );
}

function PercentageBadge13() {
  return (
    <div className="absolute bg-[#ffb86a] h-[32px] left-[38.1px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">65%</p>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute h-[50.5px] left-[881.36px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge13 />
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="absolute h-[50.5px] left-[1013.56px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text18 />
    </div>
  );
}

function PercentageBadge14() {
  return (
    <div className="absolute bg-[#ffb86a] h-[32px] left-[38.12px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">68%</p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="absolute h-[50.5px] left-[1145.77px] top-0 w-[132.234px]" data-name="Table Cell">
      <PercentageBadge14 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute h-[50.5px] left-0 top-[166px] w-[1278px] hover:bg-gray-50/50 transition-colors duration-200" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.84px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="absolute h-[50.5px] left-[220.34px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text19 />
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute h-[50.5px] left-[352.55px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute h-[50.5px] left-[484.75px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text21 />
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="absolute h-[50.5px] left-[616.95px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text22 />
    </div>
  );
}

function PercentageBadge15() {
  return (
    <div className="absolute bg-[#ffb86a] h-[32px] left-[38.1px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">60%</p>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="absolute h-[50.5px] left-[749.16px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge15 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="absolute h-[50.5px] left-[881.36px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="absolute h-[50.5px] left-[1013.56px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text24 />
    </div>
  );
}

function PercentageBadge16() {
  return (
    <div className="absolute bg-[#00d492] h-[32px] left-[38.12px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">88%</p>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="absolute h-[50.5px] left-[1145.77px] top-0 w-[132.234px]" data-name="Table Cell">
      <PercentageBadge16 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute h-[50.5px] left-0 top-[216.5px] w-[1278px] hover:bg-gray-50/50 transition-colors duration-200" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.84px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="absolute h-[49px] left-[220.34px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="absolute h-[49px] left-[352.55px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text26 />
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell42() {
  return (
    <div className="absolute h-[49px] left-[484.75px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell43() {
  return (
    <div className="absolute h-[49px] left-[616.95px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text28 />
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="absolute h-[49px] left-[749.16px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text29 />
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="absolute h-[49px] left-[881.36px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text30 />
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell46() {
  return (
    <div className="absolute h-[49px] left-[1013.56px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text31 />
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.6px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell47() {
  return (
    <div className="absolute h-[49px] left-[1145.77px] top-0 w-[132.234px]" data-name="Table Cell">
      <Text32 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute h-[49px] left-0 top-[267px] w-[1278px] hover:bg-gray-50/50 transition-colors duration-200" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <TableCell40 />
      <TableCell41 />
      <TableCell42 />
      <TableCell43 />
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.84px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell48() {
  return (
    <div className="absolute h-[50.5px] left-[220.34px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text33 />
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell49() {
  return (
    <div className="absolute h-[50.5px] left-[352.55px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text34 />
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell50() {
  return (
    <div className="absolute h-[50.5px] left-[484.75px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text35 />
    </div>
  );
}

function Text36() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell51() {
  return (
    <div className="absolute h-[50.5px] left-[616.95px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text36 />
    </div>
  );
}

function Text37() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell52() {
  return (
    <div className="absolute h-[50.5px] left-[749.16px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text37 />
    </div>
  );
}

function PercentageBadge17() {
  return (
    <div className="absolute bg-[#ff6467] h-[32px] left-[38.1px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">48%</p>
    </div>
  );
}

function TableCell53() {
  return (
    <div className="absolute h-[50.5px] left-[881.36px] top-0 w-[132.203px]" data-name="Table Cell">
      <PercentageBadge17 />
    </div>
  );
}

function Text38() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15.75px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell54() {
  return (
    <div className="absolute h-[50.5px] left-[1013.56px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text38 />
    </div>
  );
}

function PercentageBadge18() {
  return (
    <div className="absolute bg-[#ff6467] h-[32px] left-[38.12px] rounded-[10px] top-[9.25px] w-[65px]" data-name="PercentageBadge">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[32.5px] not-italic text-[16px] text-center text-nowrap text-white top-[6px] translate-x-[-50%] whitespace-pre">16%</p>
    </div>
  );
}

function TableCell55() {
  return (
    <div className="absolute h-[50.5px] left-[1145.77px] top-0 w-[132.234px]" data-name="Table Cell">
      <PercentageBadge18 />
    </div>
  );
}

function TableRow7() {
  return (
    <div className="absolute h-[50.5px] left-0 top-[316px] w-[1278px] hover:bg-gray-50/50 transition-colors duration-200" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <TableCell48 />
      <TableCell49 />
      <TableCell50 />
      <TableCell51 />
      <TableCell52 />
      <TableCell53 />
      <TableCell54 />
      <TableCell55 />
    </div>
  );
}

function Text39() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.84px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell56() {
  return (
    <div className="absolute h-[49px] left-[220.34px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text39 />
    </div>
  );
}

function Text40() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell57() {
  return (
    <div className="absolute h-[49px] left-[352.55px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text40 />
    </div>
  );
}

function Text41() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell58() {
  return (
    <div className="absolute h-[49px] left-[484.75px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text41 />
    </div>
  );
}

function Text42() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell59() {
  return (
    <div className="absolute h-[49px] left-[616.95px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text42 />
    </div>
  );
}

function Text43() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell60() {
  return (
    <div className="absolute h-[49px] left-[749.16px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text43 />
    </div>
  );
}

function Text44() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell61() {
  return (
    <div className="absolute h-[49px] left-[881.36px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text44 />
    </div>
  );
}

function Text45() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.59px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell62() {
  return (
    <div className="absolute h-[49px] left-[1013.56px] top-0 w-[132.203px]" data-name="Table Cell">
      <Text45 />
    </div>
  );
}

function Text46() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[61.6px] top-[15px] w-[9.023px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#d1d5dc] text-[16px] text-center tracking-[-0.3125px]">–</p>
    </div>
  );
}

function TableCell63() {
  return (
    <div className="absolute h-[49px] left-[1145.77px] top-0 w-[132.234px]" data-name="Table Cell">
      <Text46 />
    </div>
  );
}

function TableRow8() {
  return (
    <div className="absolute h-[49px] left-0 top-[366.5px] w-[1278px] hover:bg-gray-50/50 transition-colors duration-200" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <TableCell56 />
      <TableCell57 />
      <TableCell58 />
      <TableCell59 />
      <TableCell60 />
      <TableCell61 />
      <TableCell62 />
      <TableCell63 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[415.5px] left-0 top-[54.5px] w-[1278px]" data-name="Table Body">
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
      <TableRow5 />
      <TableRow6 />
      <TableRow7 />
      <TableRow8 />
    </div>
  );
}

function Table() {
  return (
    <div className="absolute h-[470.5px] left-0 top-0 w-[1278px]" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function HeaderCell8() {
  return (
    <div className="absolute bg-gray-50 h-[54.5px] left-0 top-0 w-[220.344px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] text-nowrap top-[17.5px] tracking-[-0.1504px] whitespace-pre">Total avg. coverage</p>
    </div>
  );
}

function TableCell64() {
  return (
    <div className="absolute bg-white h-[65px] left-0 top-[54.5px] w-[220.344px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#1e2939] text-[14px] top-[13px] tracking-[-0.1504px] w-[147px]">Subscription Lifecycle Management</p>
    </div>
  );
}

function TableCell65() {
  return (
    <div className="absolute bg-white h-[50.5px] left-0 top-[119.5px] w-[220.344px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#1e2939] text-[14px] text-nowrap top-[15.75px] tracking-[-0.1504px] whitespace-pre">Dunning Management</p>
    </div>
  );
}

function TableCell66() {
  return (
    <div className="absolute bg-white h-[50.5px] left-0 top-[170px] w-[220.344px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#1e2939] text-[14px] text-nowrap top-[15.75px] tracking-[-0.1504px] whitespace-pre">Usage-based Billing</p>
    </div>
  );
}

function TableCell67() {
  return (
    <div className="absolute bg-white h-[50.5px] left-0 top-[220.5px] w-[220.344px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#1e2939] text-[14px] text-nowrap top-[15.75px] tracking-[-0.1504px] whitespace-pre">Billing Management</p>
    </div>
  );
}

function TableCell68() {
  return (
    <div className="absolute bg-white h-[50.5px] left-0 top-[271px] w-[220.344px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#1e2939] text-[14px] text-nowrap top-[15.75px] tracking-[-0.1504px] whitespace-pre">Billing Compliance</p>
    </div>
  );
}

function TableCell69() {
  return (
    <div className="absolute bg-white h-[49px] left-0 top-[321.5px] w-[220.344px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#1e2939] text-[14px] text-nowrap top-[15px] tracking-[-0.1504px] whitespace-pre">Invoicing Automation</p>
    </div>
  );
}

function TableCell70() {
  return (
    <div className="absolute bg-white h-[50.5px] left-0 top-[370.5px] w-[220.344px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#1e2939] text-[14px] text-nowrap top-[15.75px] tracking-[-0.1504px] whitespace-pre">Quote To Cash</p>
    </div>
  );
}

function TableCell71() {
  return (
    <div className="absolute bg-white h-[49px] left-0 top-[421px] w-[220.344px]" data-name="Table Cell">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#1e2939] text-[14px] text-nowrap top-[15px] tracking-[-0.1504px] whitespace-pre">Financial Reporting</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[470.5px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Table />
      <HeaderCell8 />
      <TableCell64 />
      <TableCell65 />
      <TableCell66 />
      <TableCell67 />
      <TableCell68 />
      <TableCell69 />
      <TableCell70 />
      <TableCell71 />
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="absolute bg-white h-[472.5px] left-1/2 rounded-[14px] top-[539px] translate-x-[-50%] w-[1280px]" data-name="ComparisonTable">
      <div className="box-border content-stretch flex flex-col h-[472.5px] items-start overflow-clip p-px relative rounded-[inherit] w-[1280px]">
        <Container />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="relative size-full">
      <HeroBlocks />
      <ComparisonTable />
    </div>
  );
}