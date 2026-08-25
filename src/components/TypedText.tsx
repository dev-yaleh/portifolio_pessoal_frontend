import { useEffect, useState } from 'react';

/**
 * Efeito de máquina de escrever, alternando entre frases de uma lista.
 * Equivalente em React puro ao comportamento do Typed.js usado no site
 * de referência (barretolopes.com): digita, pausa, apaga, passa pra próxima.
 *
 * Props:
 *  - strings: array de frases a alternar
 *  - typingSpeed: velocidade de digitação (ms por letra)
 *  - deletingSpeed: velocidade de apagar (ms por letra)
 *  - pauseTime: quanto tempo a frase fica parada, já completa, antes de apagar
 */
interface TypedTextProps {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function TypedText({
  strings,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseTime = 1800,
}: TypedTextProps) {
  const [stringIndex, setStringIndex] = useState(0); // qual frase da lista está ativa
  const [displayed, setDisplayed] = useState('');    // texto exibido no momento
  const [isDeleting, setIsDeleting] = useState(false); // está apagando ou digitando?

  useEffect(() => {
    const current = strings[stringIndex];

    // Frase completa: pausa antes de começar a apagar
    if (!isDeleting && displayed === current) {
      const pause = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(pause);
    }

    // Terminou de apagar: avança para a próxima frase da lista (looping)
    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
      return;
    }

    // Passo de digitação/apagamento, uma letra por vez
    const timeout = setTimeout(
      () => {
        setDisplayed((prev) =>
          isDeleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-brandBlue ml-1 align-middle animate-pulseSlow" />
    </span>
  );
}
