export default function About() {
  return (
    <section id="sobre" className="py-20 border-b border-borderCol">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <p className="text-brandOrange text-xs font-normal uppercase tracking-widest">Sobre</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Um pouco <span className= "text-brandOrange">sobre mim</span></h2>
        </div>
        <div className="text-justify glass-card rounded-2xl p-8 sm:p-10 border border-borderCol flex flex-col space-y-4">
          <p className="text-slate-300 leading-relaxed font-light text-lg">
          Minha jornada na tecnologia nasceu da vontade de transformar pensamento em prática. Concluí o Bootcamp de Desenvolvimento Full Stack JavaScript da Generation Brasil e atualmente curso Análise e Desenvolvimento de Sistemas, aprofundando meus conhecimentos por meio de estudos e projetos aplicados.
          </p>
          <p className="text-slate-300 leading-relaxed font-light text-lg">
          Sou curiosa, proativa e movida pelo desejo de aprender continuamente. Gosto de enfrentar desafios, explorar novas possibilidades e encontrar soluções criativas que gerem impacto real.
          </p>
          <p className="text-slate-300 leading-relaxed font-light text-lg">
          Hoje, busco contribuir em projetos reais, evoluir junto com a equipe e construir minha carreira por meio da tecnologia.   
          </p>
        </div>
      </div>
    </section>
  );
}
