import { motion } from 'motion/react';
import type { ReactNode } from 'react';

const variants = {
  up: {
    hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  left: {
    hidden: { opacity: 0, x: -70, filter: 'blur(8px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  right: {
    hidden: { opacity: 0, x: 70, filter: 'blur(8px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.86, rotate: -2 },
    show: { opacity: 1, scale: 1, rotate: 0 },
  },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  from?: 'up' | 'left' | 'right' | 'zoom';
  className?: string;
}

export function Reveal({ children, delay = 0, from = 'up', className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={variants[from]}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  highlight?: string;
}

export function SectionTitle({ eyebrow, title, highlight }: SectionTitleProps) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brandOrange">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title} {highlight ? <span className="text-gradient">{highlight}</span> : null}
      </h2>

      <motion.div
        className="mt-5 h-px w-full origin-left bg-gradient-to-r from-brandBlue via-brandOrange to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </Reveal>
  );

}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  joined = false,
}: {
  eyebrow?: string;
  title: string;
  highlight: string;
  subtitle?: string;
  joined?: boolean;
}) {
  return (
    <Reveal from="left" className="from=mb-10 max-w-2xl">
      {eyebrow ? (
        <p className="font-mono text-base uppercase tracking-[0.25em] text-ember">{eyebrow}</p>
      ) : null}
      <div className="w-117 h-[2px] mt-3 bg-gradient-to-r from-brandBlue to-brandOrange" />
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title}
        {joined ? '' : ' '}
        {highlight ? <span className="text-gradient">{highlight}</span> : null}
      </h2>
      <div className="ember-rule mt-18 w-24 rounded-full" />
      {subtitle ? <p className="mt-4 text-muted-foreground">{subtitle}</p> : null}
    </Reveal>
  );
}