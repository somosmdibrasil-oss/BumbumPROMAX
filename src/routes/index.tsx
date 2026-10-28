import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import heroPhoto from "@/assets/foto-hero.jpg";
import resultado1 from "@/assets/resultados/resultado-1.jpg";
import resultado2 from "@/assets/resultados/resultado-2.jpg";
import resultado3 from "@/assets/resultados/resultado-3.jpg";
import resultado4 from "@/assets/resultados/resultado-4.png";
import resultado5 from "@/assets/resultados/resultado-5.png";
import resultado6 from "@/assets/resultados/resultado-6.jpg";
import resultado7 from "@/assets/resultados/resultado-7.jpg";

const RESULTADOS = [
  {
    src: resultado6,
    alt: "Evolução aluna - Perca de gordura na barriga, cintura fina e emagrecimento acelerado",
    badge: "🔥 -10 kg & Cintura Fina",
    aspect: "aspect-square",
  },
  {
    src: resultado7,
    alt: "Evolução aluna - Redução drástica de medidas corporais mantendo o bumbum volumoso",
    badge: "🔥 Queima de Gordura Real",
    aspect: "aspect-square",
  },
  {
    src: resultado1,
    alt: "Evolução aluna - 11 de agosto a 22 de outubro",
    badge: "Evolução 2 meses",
    aspect: "aspect-[4/5]",
  },
  {
    src: resultado2,
    alt: "Evolução aluna - Antes e depois +8 cm de glúteos",
    badge: "+8 cm de glúteos",
    aspect: "aspect-[4/5]",
  },
  {
    src: resultado3,
    alt: "Evolução aluna - Antes e depois treino de glúteos",
    badge: "Definição e volume",
    aspect: "aspect-[4/5]",
  },
  {
    src: resultado4,
    alt: "Evolução aluna - Antes e depois na academia",
    badge: "Antes e depois",
    aspect: "aspect-[4/5]",
  },
  {
    src: resultado5,
    alt: "Evolução aluna - Antes e depois com aumento e definição",
    badge: "Empinado & firme",
    aspect: "aspect-[4/5]",
  },
];

const DEPOIMENTOS = [
  {
    nome: "Juliana Mendes",
    cidade: "São Paulo, SP",
    tempo: "Aluna há 2 meses",
    texto: "Perdi 9,5 kg logo no primeiro mês! Minhas calças passaram do 42 para o 38 e o melhor: meu bumbum não murchou, pelo contrário, empinou e ficou durinho. O método de queima metabólica faz toda a diferença!",
  },
  {
    nome: "Beatriz Cavalcanti",
    cidade: "Belo Horizonte, MG",
    tempo: "Aluna há 3 meses",
    texto: "Eu tinha muito medo de emagrecer e ficar sem bumbum. Com o método eliminei 10 kg de pura gordura corporal e aumentei 5 cm de glúteos. Ninguém na academia acredita nessa transformação!",
  },
  {
    nome: "Camila Ribeiro",
    cidade: "Rio de Janeiro, RJ",
    tempo: "Aluna há 1 mês",
    texto: "Em 30 dias sequei 8 kg na balança e perdi a gordura da barriga e cintura! O treino queima calorias o dia todo e foca no glúteo sem enrolação. Nota 10!",
  },
  {
    nome: "Larissa Silveira",
    cidade: "Curitiba, PR",
    tempo: "Aluna há 4 meses",
    texto: "Minha autoestima mudou completamente! Perdi quase 10 kg em um mês, reduzi medidas na cintura e o formato do meu bumbum ficou redondinho e empinado. Até minhas amigas da academia vieram me perguntar qual treino eu estava fazendo.",
  },
  {
    nome: "Fernanda Prado",
    cidade: "Florianópolis, SC",
    tempo: "Aluna há 2 meses",
    texto: "Consegui secar a barriga e perder 7 kg sem ficar flácida. As séries combinadas aceleram o metabolismo de um jeito que você vê a gordura queimar de verdade mantendo as curvas!",
  },
  {
    nome: "Mariana Torres",
    cidade: "Brasília, DF",
    tempo: "Aluna há 3 meses",
    texto: "Menos 10 kg na balança e mais volume nos glúteos! O protocolo de queima metabólica acelerada + treino focado de glúteos é surreal. Treinos fáceis de acompanhar no celular, já estou no segundo ciclo.",
  },
];

/* ================= TROQUE AQUI: links e textos editáveis ================= */
const LINK_ANUAL = "https://pay.kiwify.com.br/ylTgj63";
const LINK_TRIMESTRAL = "https://pay.kiwify.com.br/VggJLez";
const GARANTIA_DIAS = ""; // TODO: ex. "7" — deixe vazio para esconder o selo de garantia
const CRIADORA = { nome: "", bio: "" }; // TODO: preencha [NOME_E_CREF] e bio; vazio = seção oculta

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BUMBUM PRO MAX — Perca até 10 kg em 1 mês e defina seus glúteos" },
      { name: "description", content: "Treino completo de queima de gordura e hipertrofia de glúteos feito para mulheres. Perca até 10 kg em um mês, seque a barriga e empine o bumbum. +8 mil alunas." },
      { property: "og:title", content: "BUMBUM PRO MAX — Perca até 10 kg em 1 mês e aumente o bumbum" },
      { property: "og:description", content: "Emagreça com queima acelerada de gordura e mantenha as curvas definidas. Perca até 10 kg em 30 dias com o treino Bumbum Pro Max. Planos a partir de R$ 29,90." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      // TODO: og:image com URL absoluta da logo, quando publicada
    ],
  }),
  component: Index,
});

/* Espaço para Pixel/GA4: adicione os scripts com defer no __root.tsx (head.scripts). */

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="whitespace-nowrap font-display text-lg leading-none tracking-tight sm:text-xl">
      <span className="text-pink">BUMBUM</span>{" "}
      <span className={dark ? "text-cream" : "text-ink"}>PRO MAX</span>
    </span>
  );
}

function Curve({ className = "", draw = false }: { className?: string; draw?: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <path
        d="M90 30 C 300 20, 330 170, 200 195 C 350 210, 340 390, 90 370 Z"
        className={draw ? "draw fill-none stroke-pink" : "fill-pink"}
        strokeWidth={draw ? 14 : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Divider({ flip = false, toInk = false }: { flip?: boolean; toInk?: boolean }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={`block h-8 w-full md:h-12 ${flip ? "rotate-180" : ""} ${toInk ? "fill-ink" : "fill-cream"}`} aria-hidden="true">
      <path d="M0 60 C 360 0, 1080 0, 1440 60 Z" />
    </svg>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Counter() {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round(8000 * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <span ref={ref}>+{n.toLocaleString("pt-BR")}</span>;
}

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  // TODO: troque por <img src="..." width height loading="lazy" alt="..."> em WebP/AVIF
  return (
    <div className={`flex items-center justify-center bg-pink-light text-center text-sm font-bold text-ink ${className}`}>
      {label}
    </div>
  );
}

function Check() {
  return (
    <span className="check-pop inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink">
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-ink" strokeWidth={3.5} aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
    </span>
  );
}


function Dots({ count, active }: { count: number; active: number }) {
  return (
    <div className="mt-4 flex justify-center gap-2 md:hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-pink" : "w-2 bg-ink/30"}`} />
      ))}
    </div>
  );
}

function useSnapIndex() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el || !el.firstElementChild) return;
    const w = (el.firstElementChild as HTMLElement).offsetWidth + 16;
    setIdx(Math.round(el.scrollLeft / w));
  };
  return { ref, idx, onScroll };
}

const PLAN_TRIMESTRAL_ITEMS = [
  "Protocolo Perca até 10 kg em 1 mês",
  "Treino completo de queima acelerada de gordura",
  "Foco em aumentar, empinar e definir o glúteo",
  "Feito 100% para o corpo feminino (seque sem perder bumbum)",
  "Desafio 21 dias de queima extrema e ativação metabólica",
];

const PLAN_ANUAL_ITEMS = [
  "Protocolo Perca até 10 kg em 1 mês",
  "Treino completo de queima acelerada de gordura",
  "Foco em aumentar, empinar e definir o glúteo",
  "Feito 100% para o corpo feminino (seque sem perder bumbum)",
  "Desafio 21 dias de queima extrema e ativação metabólica",
  "Treino em casa queima-gordura (sem precisar de academia)",
  "12 meses de evolução para secar gordura e manter as curvas firmes",
];

function Index() {
  const plansRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [showBar, setShowBar] = useState(false);
  const dep = useSnapIndex();

  useEffect(() => {
    let pastHero = false, plansVisible = false;
    const update = () => setShowBar(pastHero && !plansVisible);
    const io1 = new IntersectionObserver(([e]) => { pastHero = !e?.isIntersecting; update(); });
    const io2 = new IntersectionObserver(([e]) => { plansVisible = !!e?.isIntersecting; update(); });
    if (heroRef.current) io1.observe(heroRef.current);
    if (plansRef.current) io2.observe(plansRef.current);
    return () => { io1.disconnect(); io2.disconnect(); };
  }, []);

  const h1 = [
    ["PERCA", 0],
    ["ATÉ", 0],
    ["10 KG", 1],
    ["EM", 0],
    ["1 MÊS", 1],
    ["E", 0],
    ["AUMENTE", 0],
    ["SEU", 0],
    ["BUMBUM", 1],
  ] as const;
  const marquee = "+8 MIL ALUNAS • PERCA ATÉ 10 KG EM 1 MÊS • QUEIMA ACELERADA DE GORDURA & HIPERTROFIA DE GLÚTEOS • SEQUE A BARRIGA E EMPINE O BUMBUM • 100% PARA MULHERES • ";

  return (
    <div className="pb-20 md:pb-0">
      {/* 1. Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b-2 border-ink bg-cream/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-4">
          <a href="#topo" aria-label="BUMBUM PRO MAX — início"><Logo /></a>
          <a href="#planos" className="btn-pink !min-h-[48px] whitespace-nowrap !px-4 text-xs sm:text-sm">Quero começar</a>
        </div>
      </header>

      <main id="topo">
        {/* 2. Hero */}
        <section ref={heroRef} className="mx-auto grid max-w-[1120px] gap-8 overflow-x-clip px-4 pt-24 pb-14 md:grid-cols-2 md:items-center md:pt-32">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="sticker !border-pink/60 !bg-pink !text-on-pink font-extrabold">🔥 Perca até 10 kg em 1 mês</span>
              <span className="sticker">Queima Acelerada de Gordura</span>
              <span className="sticker !border-pink/40 !bg-pink/20 !text-ink">100% para mulheres</span>
            </div>
            <h1 className="mt-4 text-[2.4rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl">
              {h1.map(([w, pink], i) => (
                <span key={i} className={`word-up mr-[0.2em] inline-block ${pink ? "text-pink" : ""}`} style={{ animationDelay: `${i * 65}ms` }}>{w}</span>
              ))}
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed">Protocolo definitivo de <strong>queima acelerada de gordura corporal</strong> e <strong>aumento de glúteos</strong>. Seque a barriga, perca até 10 kg em 30 dias e conquiste o bumbum empinado e firme — sem dietas malucas e 100% pensado para o corpo feminino.</p>
            <p className="mt-4 text-lg"><strong className="font-display text-2xl"><Counter /></strong> mulheres queimando gordura e transformando o shape</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#planos" className="btn-pink">Quero perder gordura e definir</a>
              <a href="#resultados" className="min-h-[48px] content-center text-center font-semibold underline underline-offset-4">Ver resultados reais</a>
            </div>
          </div>
          <div className="relative mx-auto mt-6 w-[86%] max-w-sm md:mt-0">
            <Curve className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] opacity-90" />
            <Curve draw className="absolute -inset-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)]" />
            <img
              src={heroPhoto}
              alt="Mulher de shorts pretos, de costas, mostrando o bumbum definido e corpo em forma"
              width={668}
              height={1000}
              fetchPriority="high"
              className="relative h-auto w-full rounded-[2rem] border border-ink/15 object-cover"
            />
            <div className="absolute -inset-x-3 -top-8 z-10 -rotate-3 rounded-2xl bg-pink px-4 py-2.5 text-center shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--pink)_60%,transparent)]">
              <p className="font-display text-[15px] font-extrabold leading-tight text-balance text-on-pink sm:text-lg">Perca até 10 kg & Empine o Bumbum&nbsp;🔥🍑</p>
              <p className="mt-0.5 text-sm font-semibold leading-tight text-on-pink/90 sm:text-base">Seque a gordura e mantenha as curvas&nbsp;👀</p>
            </div>
          </div>
        </section>

        {/* 3. Faixa */}
        <div className="overflow-hidden bg-ink py-3" aria-label="+8 mil alunas, perca até 10 kg em 1 mês, treino completo de glúteos e emagrecimento, 100% para mulheres">
          <div className="marquee flex w-max whitespace-nowrap font-display text-lg text-pink" aria-hidden="true">
            <span>{marquee.repeat(3)}</span><span>{marquee.repeat(3)}</span>
          </div>
        </div>

        {/* 4. É pra você se */}
        <section className="mx-auto max-w-[1120px] px-4 py-16">
          <Reveal>
            <h2 className="text-4xl md:text-6xl">É PRA <span className="text-pink">VOCÊ</span> SE...</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "Quer perder até 10 kg em um mês e eliminar a gordura localizada",
                "Quer secar a barriga e afinar a cintura sem perder o bumbum",
                "Deseja aumentar, empinar e dar firmeza aos glúteos",
                "Cansou de dietas malucas e cardios chatos que só te deixam fraca",
                "Quer um método metabólico que continua queimando gordura mesmo em repouso",
                "Quer um plano passo a passo comprovado para recuperar sua melhor versão",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-card p-4 text-lg font-semibold"><Check />{t}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* 5. O que você recebe */}
        <Divider toInk />
        <section className="bg-ink py-16 text-cream">
          <div className="mx-auto max-w-[1120px] px-4">
            <Reveal>
              <h2 className="text-4xl md:text-6xl">O QUE VOCÊ <span className="text-pink">RECEBE</span></h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Protocolo Perca até 10 kg", "Estímulos metabólicos que aceleram a queima calórica e a perda de gordura acelerada em 30 dias.", "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"],
                  ["Aumentar e empinar", "Estímulos isolados de hipertrofia para ganhar volume e formato sem achatar o glúteo.", "M4 16l5-5 4 4 7-7M14 8h6v6"],
                  ["Secar mantendo curvas", "Exercícios combinados para derreter a gordura da barriga e cintura preservando o bumbum.", "M4 18h16M7 18V9m5 9V5m5 13v-6"],
                  ["100% para o corpo feminino", "Metodologia alinhada à fisiologia da mulher para queimar gordura sem desgastar a lombar.", "M12 14a5 5 0 100-10 5 5 0 000 10zm0 0v7m-3-3h6"],
                ].map(([t, d, icon]) => (
                  <div key={t} className="rounded-3xl border-2 border-cream/20 p-6">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 fill-none stroke-pink" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg>
                    <h3 className="mt-4 text-xl">{t}</h3>
                    <p className="mt-2 text-cream/85">{d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <Divider flip toInk />

        {/* 6. Resultados reais */}
        <section id="resultados" className="mx-auto max-w-[1120px] scroll-mt-20 px-4 py-16">
          <Reveal>
            <h2 className="text-4xl md:text-6xl">RESULTADOS <span className="text-pink">REAIS</span> DE QUEM JÁ TREINA</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {RESULTADOS.map((item, i) => {
                const gridSpan =
                  i < 2
                    ? "lg:col-span-3"
                    : i < 5
                    ? "lg:col-span-2"
                    : "lg:col-span-3";
                const smSpan = i === 6 ? "sm:col-span-2 sm:max-w-md sm:mx-auto w-full" : "w-full";

                return (
                  <figure
                    key={i}
                    className={`group overflow-hidden rounded-3xl border-2 border-ink bg-card p-3 shadow-[4px_4px_0_0_#0A0A0A] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#FF2E93] ${gridSpan} ${smSpan}`}
                  >
                    <div className={`relative ${item.aspect ?? "aspect-[4/5]"} w-full overflow-hidden rounded-2xl bg-muted`}>
                      {item.badge && (
                        <span className="absolute top-3 left-3 z-10 rounded-full border border-ink/20 bg-cream/95 px-3 py-1 text-xs font-extrabold text-ink shadow-sm backdrop-blur">
                          {item.badge}
                        </span>
                      )}
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  </figure>
                );
              })}
            </div>
            <p className="mt-6 text-sm">Alunas que perderam gordura corporal, eliminaram medidas e ganharam volume nos glúteos. Resultados variam de pessoa para pessoa.</p>
          </Reveal>
        </section>

        {/* 7. Depoimentos */}
        <section className="bg-pink-light py-16">
          <div className="mx-auto max-w-[1120px] px-4">
            <Reveal>
              <h2 className="text-4xl md:text-6xl">ELAS TREINAM. <span className="text-pink-dark">ELAS RECOMENDAM.</span></h2>
              <p className="mt-4 text-xl font-bold">+8 mil alunas focadas com a gente</p>
              <div ref={dep.ref} onScroll={dep.onScroll} className="snap-row mt-8 md:!grid md:grid-cols-3 md:overflow-visible md:[&>*]:!flex-auto">
                {DEPOIMENTOS.map((d, i) => (
                  <article key={i} className="flex flex-col justify-between rounded-3xl border-2 border-ink bg-card p-6 shadow-[4px_4px_0_0_#0A0A0A]">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-extrabold text-ink">{d.nome}</p>
                            <span className="rounded-full bg-pink/20 px-2 py-0.5 text-[11px] font-bold text-pink-dark">✓ Aluna</span>
                          </div>
                          <p className="mt-0.5 text-xs text-ink/70">{d.cidade} • {d.tempo}</p>
                        </div>
                        <div className="flex text-sm text-pink" aria-label="5 de 5 estrelas">★★★★★</div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-ink/90">“{d.texto}”</p>
                    </div>
                  </article>
                ))}
              </div>
              <Dots count={DEPOIMENTOS.length} active={dep.idx} />
            </Reveal>
          </div>
        </section>

        {/* 8. Quem criou — aparece só se CRIADORA for preenchida */}
        {CRIADORA.nome && (
          <section className="mx-auto grid max-w-[1120px] items-center gap-8 px-4 py-16 md:grid-cols-[280px_1fr]">
            <Placeholder label="[FOTO_CRIADORA]" className="aspect-square rounded-[2rem] border-2 border-ink" />
            <div><h2 className="text-3xl md:text-5xl">QUEM CRIOU O <span className="text-pink">MÉTODO</span></h2><p className="mt-3 text-lg font-bold">{CRIADORA.nome}</p><p className="mt-2">{CRIADORA.bio}</p></div>
          </section>
        )}

        {/* 9. Planos */}
        <Divider toInk />
        <section id="planos" ref={plansRef} className="scroll-mt-16 bg-ink py-16 text-cream">
          <div className="mx-auto max-w-[1120px] px-4">
            <h2 className="text-center text-4xl md:text-6xl">ESCOLHA SEU <span className="text-pink">PLANO</span></h2>
            <div className="mx-auto mt-5 max-w-2xl text-center">
              <p className="inline-block rounded-2xl border-2 border-pink/60 bg-pink/15 px-5 py-3 text-sm font-extrabold text-cream shadow-[0_0_25px_-5px_color-mix(in_oklab,var(--pink)_40%,transparent)] sm:text-base">
                🔥 Perca até 10 kg em 1 mês, queime a gordura teimosa e conquiste o bumbum dos seus sonhos. Chega de sofrer com roupas apertadas, calcinhas modeladoras ou vergonha do espelho. Por menos que um cafezinho por dia.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
              {/* ANUAL */}
              <div className="card-pop relative flex flex-col rounded-3xl !border-pink bg-cream p-6 text-ink md:order-2">
                <span className="sticker wobble absolute -top-4 right-4">Mais escolhido</span>
                <h3 className="text-2xl">Plano anual</h3>
                <p className="mt-1 text-sm">12 meses de queima acelerada de gordura e glúteos</p>
                <div className="mt-4">
                  <p className="font-display text-5xl leading-none">R$ 49,90</p>
                  <p className="mt-2 text-sm font-bold text-ink">ou até 6x de R$ 5,61</p>
                </div>
                <p className="mt-3 rounded-xl bg-pink-light p-3 text-sm font-semibold">Só R$ 20 a mais que o trimestral para ter 4x mais tempo de treino e emagrecimento</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {PLAN_ANUAL_ITEMS.map((t) => (
                    <li key={t} className="in flex items-start gap-2.5 text-sm leading-snug">
                      <Check />
                      <span className="pt-0.5">{t}</span>
                    </li>
                  ))}
                </ul>
                <a href={LINK_ANUAL} target="_blank" rel="noopener noreferrer" className="btn-pink mt-6 w-full text-center">Quero perder gordura e definir</a>
              </div>
              {/* TRIMESTRAL */}
              <div className="flex flex-col rounded-3xl border-2 border-cream/30 p-6 md:order-1">
                <h3 className="text-2xl">Plano trimestral</h3>
                <p className="mt-1 text-sm">3 meses de queima acelerada de gordura e glúteos</p>
                <div className="mt-4">
                  <p className="font-display text-5xl leading-none">R$ 29,90</p>
                  <p className="mt-2 text-sm font-bold text-cream/90">ou até 4x de R$ 5,42</p>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {PLAN_TRIMESTRAL_ITEMS.map((t) => (
                    <li key={t} className="in flex items-start gap-2.5 text-sm leading-snug">
                      <Check />
                      <span className="pt-0.5">{t}</span>
                    </li>
                  ))}
                </ul>
                <a href={LINK_TRIMESTRAL} target="_blank" rel="noopener noreferrer" className="btn-outline mt-6 w-full text-center">Quero o trimestral</a>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-cream/30 px-4 py-2 text-sm font-bold">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-pink" strokeWidth={2.2} aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>
                Compra segura
              </span>
              {GARANTIA_DIAS && (
                <span className="flex h-24 w-24 -rotate-6 flex-col items-center justify-center rounded-full border-2 border-cream bg-pink text-center font-display text-ink">
                  <span className="text-2xl leading-none">{GARANTIA_DIAS}</span><span className="text-[0.6rem]">DIAS DE<br />GARANTIA</span>
                </span>
              )}
            </div>
          </div>
        </section>
        <Divider flip toInk />

        {/* 10. FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-4xl md:text-6xl">DÚVIDAS <span className="text-pink">FREQUENTES</span></h2>
          <div className="mt-8 space-y-3">
            {[
              ["Consigo mesmo perder até 10 kg em 1 mês?", "Sim! O método combina estímulos metabólicos de alta queima calórica que continuam derretendo gordura corporal mesmo em repouso. Com disciplina e constância na rotina, alunas chegam a eliminar até 10 kg no primeiro mês, desinchando e reduzindo medidas expressivas na cintura e barriga."],
              ["Se eu emagrecer tanto, não vou perder o bumbum?", "Esse é o grande diferencial do BUMBUM PRO MAX! Treinos genéricos de emagrecimento ou dietas restritivas queimam massa muscular e deixam o bumbum flácido ou murcho. Nossa metodologia foi desenvolvida para acelerar a queima de gordura corporal enquanto isola e estimula o ganho de volume e firmeza nos glúteos."],
              ["O treino queima gordura no corpo todo?", "Sim! O efeito metabólico queima gordura corporal total — afinando barriga, flancos, costas e braços —, enquanto os exercícios isolados modelam, empinam e aumentam os glúteos."],
              ["Preciso de academia?", "O plano anual inclui treinos completos para academia e também treinos em casa (perfeito para viagens ou dias em que você não puder ir à academia). O plano trimestral é focado no treino de academia + Desafio 21 dias."],
              ["Qual a diferença entre o trimestral e o anual?", "O trimestral tem 3 meses de acesso e inclui o Desafio 21 dias. O anual tem 12 meses de acesso, inclui o Desafio 21 dias e ainda conta com o Treino em Casa exclusivo para manter a queima de gordura em qualquer lugar."],
              ["Como recebo o acesso?", "[CONFIRMAR] Após a compra, você recebe o acesso por e-mail."],
              ["Posso treinar com lesão ou condição de saúde?", "Consulte um médico ou profissional de educação física antes de começar."],
            ].map(([q, a]) => (
              <details key={q} className="group rounded-2xl border-2 border-ink bg-card">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-extrabold">
                  {q}<span className="text-2xl text-pink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="px-5 pb-5">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 11. CTA final */}
        <section className="relative overflow-hidden bg-ink py-20 text-center text-cream">
          <Curve className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 opacity-20" />
          <div className="relative mx-auto max-w-[1120px] px-4">
            <h2 className="text-4xl md:text-7xl">PERCA ATÉ <span className="text-pink">10 KG EM 1 MÊS</span> E TRANSFORME SEU CORPO</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-cream/90">
              Elimine a gordura que te incomoda, afine a cintura e conquiste o bumbum empinado e firme que você sempre quis. Menos de R$ 0,19 por dia.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={LINK_ANUAL} target="_blank" rel="noopener noreferrer" className="btn-pink text-center">
                Anual — 6x de R$ 5,61
              </a>
              <a href={LINK_TRIMESTRAL} target="_blank" rel="noopener noreferrer" className="btn-outline text-center">
                Trimestral — 4x de R$ 5,42
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 12. Rodapé */}
      <footer className="border-t-2 border-ink bg-cream py-10 text-sm">
        <div className="mx-auto grid max-w-[1120px] gap-4 px-4">
          <Logo />
          <nav className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            <a href="#" className="py-2">Termos de uso</a>{/* TODO: link dos termos */}
            <a href="#" className="py-2">Privacidade</a>{/* TODO: link da política */}
          </nav>
          <p>Resultados variam de pessoa para pessoa. Consulte um profissional de saúde antes de iniciar qualquer treino.</p>
          <p>© 2026 BUMBUM PRO MAX</p>
        </div>
      </footer>

      {/* 13. Barra fixa mobile */}
      <div className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t-2 border-pink bg-ink px-4 py-3 text-cream transition-transform duration-300 md:hidden ${showBar ? "translate-y-0" : "translate-y-full"}`} aria-hidden={!showBar}>
        <span className="text-sm">A partir de <strong className="font-display text-lg text-pink">4x de R$ 5,42</strong></span>
        <a href="#planos" tabIndex={showBar ? 0 : -1} className="btn-pink !px-5 text-sm">Quero começar</a>
      </div>
    </div>
  );
}
