import { SeoHead } from '../src/lib/SeoHead';
import { ContactPage } from '../src/components/ContactPage';

export default function Contact() {
  return (
    <>
      <SeoHead pageId="contact" />
      <ContactPage />
    </>
  );
}
