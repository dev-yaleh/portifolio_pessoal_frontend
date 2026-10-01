import { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectsSection from '../components/ProjectsSection';
import TechStack from '../components/TechStack';
import ContactForm from '../components/ContactForm';
import ParticleField from '../components/ParticleField';

export default function Home() {
  return (
    <>
      <ParticleField />
      <Hero />
      <About />
      <ProjectsSection onTotalChange={() => {}} />
      <TechStack />
      <ContactForm />
    </>
  );
}
