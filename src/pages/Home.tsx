import { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectsSection from '../components/ProjectsSection';
import TechStack from '../components/TechStack';
import ContactForm from '../components/ContactForm';

export default function Home() {
  const [total, setTotal] = useState<number | null>(null);

  return (
    <>
      <Hero totalProjetos={total} />
      <About />
      <ProjectsSection onTotalChange={setTotal} />
      <TechStack />
      <ContactForm />
    </>
  );
}
