import { Reveal, SectionHeading} from '.././components/Reveal';

export default function About() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-25">
      <SectionHeading eyebrow="[ 01 ] SOBRE" title="UM POUCO" highlight="SOBRE MIM" />
        <Reveal from="up" delay={0.30} className="text-justify space-y-2">
          <p className="text-slate-300 leading-relaxed font-light text-xl">
            Minha jornada na tecnologia nasceu da vontade de transformar pensamento em prática. Concluí o Bootcamp de Desenvolvimento Full Stack JavaScript da Generation Brasil e atualmente curso Análise e Desenvolvimento de Sistemas, aprofundando meus conhecimentos por meio de estudos e projetos aplicados.
          </p>
          <p className="text-slate-300 leading-relaxed font-light text-xl">
            Sou curiosa, proativa e movida pelo desejo de aprender continuamente. Gosto de enfrentar desafios, explorar novas possibilidades e encontrar soluções criativas que gerem impacto real.
          </p>
          <p className="text-slate-300 leading-relaxed font-light text-xl">
            Hoje, busco contribuir em projetos reais, evoluir junto com a equipe e construir minha carreira por meio da tecnologia.
          </p>
        </Reveal>
        
    </section>
  );
}
      