import { SeoHead } from '../src/lib/SeoHead';
import { OnboardingMeetingPage } from '../src/components/OnboardingMeetingPage';

export default function OnboardingMeeting() {
  return (
    <>
      <SeoHead pageId="onboarding-meeting" />
      <OnboardingMeetingPage />
    </>
  );
}
