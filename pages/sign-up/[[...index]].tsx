import { SeoHead } from '../../src/lib/SeoHead';
import { SignUpPage } from '../../src/components/AuthPages';

export default function SignUp() {
  return (
    <>
      <SeoHead pageId="sign-up" />
      <SignUpPage />
    </>
  );
}
