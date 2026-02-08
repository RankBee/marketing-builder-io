import { SeoHead } from '../../src/lib/SeoHead';
import { SignInPage } from '../../src/components/AuthPages';

export default function SignIn() {
  return (
    <>
      <SeoHead pageId="sign-in" />
      <SignInPage />
    </>
  );
}
