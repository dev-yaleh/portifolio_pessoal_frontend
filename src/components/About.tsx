// import { Reveal } from './Reveal';

// const highlights = [
//   {
//     number: '01',
//     label: 'Formação',
//     title: 'Base em tecnologia',
//     text: 'Bootcamp Full Stack JavaScript pela Generation Brasil e graduação em Análise e Desenvolvimento de Sistemas em andamento.',
//     accent: 'text-brandBlue',
//   },
//   {
//     number: '02',
//     label: 'Abordagem',
//     title: 'Curiosidade em prática',
//     text: 'Aprendizado contínuo, abertura para desafios e busca por soluções criativas com impacto real.',
//     accent: 'text-brandOrange',
//   },
//   {
//     number: '03',
//     label: 'Próximo passo',
//     title: 'Crescer em equipe',
//     text: 'Contribuir em projetos reais, evoluir junto com o time e construir minha carreira na tecnologia.',
//     accent: 'text-brandBlue',
//   },
// ];

// export default function About() {
//   return (
//     <section
//       id="sobre"
//       className="relative isolate scroll-mt-20 overflow-hidden border-b border-borderCol bg-darkBg px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
//     >
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
//         <div className="absolute right-[-12rem] top-0 h-[32rem] w-[32rem] rounded-full bg-brandBlue/[0.07] blur-[140px]" />
//         <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
//       </div>

//       <div className="mx-auto max-w-[1500px]">
//         <Reveal className="mb-10 flex items-center justify-between gap-4 border-b border-white/15 pb-4 sm:mb-14 lg:mb-20">
//           <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brandOrange sm:text-xs">01 / Sobre mim</p>
//           <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">Um pouco da minha trajetória</p>
//         </Reveal>

//         <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
//           <Reveal from="left" className="lg:col-span-6">
//             <h2 className="font-display text-[clamp(4rem,10vw,9.5rem)] font-bold uppercase leading-[0.76] tracking-[-0.075em] text-white">
//               Sobre<br />
//               <span className="text-brandBlue">mim</span><span className="text-brandOrange">.</span>
//             </h2>
//             <div className="mt-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.17em] text-slate-400 sm:mt-10 sm:text-[10px]">
//               <span className="h-px w-10 bg-brandOrange" />
//               Tecnologia com propósito e curiosidade
//             </div>
//           </Reveal>

//           <Reveal from="up" delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
//             <p className="font-display text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.15rem]">
//               Minha jornada na tecnologia nasceu da vontade de transformar pensamento em prática.
//             </p>
//             <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-300 sm:mt-7 sm:text-lg">
//               <p>
//                 Concluí o Bootcamp de Desenvolvimento Full Stack JavaScript da Generation Brasil e atualmente curso Análise e Desenvolvimento de Sistemas, aprofundando meus conhecimentos com estudos e projetos aplicados.
//               </p>
//               <p>
//                 Sou curiosa, proativa e movida pelo aprendizado contínuo. Gosto de enfrentar desafios, explorar novas possibilidades e encontrar soluções criativas que gerem impacto real.
//               </p>
//             </div>
//           </Reveal>
//         </div>

//         <div className="mt-16 grid border-t border-white/15 sm:mt-20 md:grid-cols-3">
//           {highlights.map((item, index) => (
//             <Reveal key={item.number} from="up" delay={index * 0.08} className="h-full">
//               <article className="group h-full border-b border-white/15 py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:py-8">
//                 <div className="flex items-center justify-between">
//                   <span className={`font-mono text-xs ${item.accent}`}>{item.number} /</span>
//                   <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">{item.label}</span>
//                 </div>
//                 <h3 className="mt-7 font-display text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-brandBlue sm:text-2xl">
//                   {item.title}
//                 </h3>
//                 <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400 sm:text-base">{item.text}</p>
//               </article>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { Reveal } from './Reveal';

const details = [
  { number: '01', label: 'Formação', value: 'Análise e Desenvolvimento de Sistemas · Estácio', note: 'Graduação em andamento' },
  { number: '02', label: 'Capacitação', value: 'Bootcamp Full Stack JavaScript', note: 'Generation Brasil' },
  { number: '03', label: 'Direção', value: 'Tecnologia com propósito', note: 'Criar soluções com impacto' },
];

export default function About() {
  return (
    <section
      id="sobre"
      className="relative isolate scroll-mt-20 overflow-hidden border-b border-borderCol bg-darkBg px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-52 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brandBlue/[0.07] blur-[150px]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" />
      </div>

      <div className="mx-auto max-w-[1500px]">
        <Reveal className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
          <span><span className="text-brandOrange">01</span> / SOBRE MIM</span>
          <span className="hidden sm:inline">Uma trajetória em construção</span>
        </Reveal>

        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <Reveal from="left" className="lg:col-span-7">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">Curiosidade que vira prática</p>
            <h2 className="font-display text-[clamp(3.8rem,9vw,8.5rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em] text-white">
              Ideias<br />
              em <span className="text-brandBlue">prática</span><span className="text-brandOrange">.</span>
            </h2>
          </Reveal>

          <Reveal from="up" delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-brandOrange">
              <span className="h-px w-8 bg-brandOrange" /> Minha história
            </div>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              Minha jornada na tecnologia nasceu da vontade de transformar pensamento em prática. Concluí o Bootcamp de Desenvolvimento Full Stack JavaScript da Generation Brasil e atualmente curso Análise e Desenvolvimento de Sistemas, aprofundando meus conhecimentos por meio de estudos e projetos aplicados.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              Sou curiosa, proativa e movida pelo aprendizado contínuo. Gosto de enfrentar desafios, explorar possibilidades e encontrar soluções criativas que gerem impacto real.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-white/15">
          {details.map((item, index) => (
            <Reveal key={item.number} from="up" delay={index * 0.07}>
              <div className="grid gap-2 border-b border-white/15 py-5 sm:grid-cols-[64px_180px_1fr] sm:items-center sm:gap-5 lg:py-6">
                <span className={`font-mono text-[10px] ${index === 1 ? 'text-brandOrange' : 'text-brandBlue'}`}>{item.number} /</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">{item.label}</span>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <p className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">{item.value}</p>
                  <p className="text-sm text-slate-400 sm:text-right">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
