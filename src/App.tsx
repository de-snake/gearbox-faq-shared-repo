import { useMemo } from 'react';
import faqMarkdown from '../docs/faq.md?raw';
import { FaqPage } from './components';
import { parseFaqMarkdown } from './lib';
import { gearboxBrand } from './site/gearbox-brand';

export default function App() {
  const document = useMemo(() => parseFaqMarkdown(faqMarkdown), []);

  return <FaqPage brand={gearboxBrand} document={document} />;
}
