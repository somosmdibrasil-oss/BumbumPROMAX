import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import heroPhoto from "@/assets/foto-hero.jpg";
import resultado1 from "@/assets/resultados/resultado-1.jpg";
import resultado2 from "@/assets/resultados/resultado-2.jpg";
import resultado3 from "@/assets/resultados/resultado-3.jpg";
import resultado4 from "@/assets/resultados/resultado-4.png";
import resultado5 from "@/assets/resultados/resultado-5.png";

const RESULTADOS = [
  { src: resultado1, alt: "Evolução aluna - 11 de agosto a 22 de outubro" },
  { src: resultado2, alt: "Evolução aluna - Antes e depois +8 cm de glúteos" },
  { src: resultado3, alt: "Evolução aluna - Antes e depois treino de glúteos" },
  { src: resultado4, alt: "Evolução aluna - Antes e depois na academia" },
  { src: resultado5, alt: "Evolução aluna - Antes e depois com aumento e definição" },
];

const DEPOIMENTOS = [
  {
    nome: "Juliana Mendes",
    cidade: "São Paulo, SP",
    tempo: "Aluna há 2 meses",
    texto: "Treino há 2 anos e nunca tinha sentido o glúteo trabalhar de verdade como agora. Em menos de 40 dias minhas roupas já vestem totalmente diferente. O método de ativação faz toda a diferença!",
  },
  {
    nome: "Beatriz Cavalcanti",
    cidade: "Belo Horizonte, MG",
    tempo: "Aluna há 3 meses",
    texto: "Eu achava que só cirurgia dava jeito no meu caso. Segui a planilha certinha e aumentei 5cm de glúteos sem sobrecarregar a lombar. Melhor investimento que já fiz!",
  },
  {
    nome: "Camila Ribeiro",
    cidade: "Rio de Janeiro, RJ",
    tempo: "Aluna há 1 mês",
    texto: "O que mais amei é que é direto ao ponto. Não tem enrolação na academia. Você faz as séries certas com foco total em glúteos e sai sentindo queimar de verdade. Nota 10!",
  },
  {
    nome: "Larissa Silveira",
    cidade: "Curitiba, PR",
    tempo: "Aluna há 4 meses",
    texto: "Minha autoestima mudou completamente! O formato do meu bumbum ficou muito mais empinado e firme. Até minhas amigas da academia vieram me perguntar qual treino eu estava fazendo.",
  },
  {
    nome: "Fernanda Prado",
    cidade: "Florianópolis, SC",
    tempo: "Aluna há 2 meses",
    texto: "Tinha muita dificuldade em evoluir glúteos porque minhas coxas sempre roubavam a carga toda. Com os ajustes de postura e as séries combinadas, finalmente vi a evolução acontecer!",
  },
  {
    nome: "Mariana Torres",
    cidade: "Brasília, DF",
    tempo: "Aluna há 3 meses",
    texto: "A metodologia é sensacional! Treinos intensos, organizados e super fáceis de acompanhar no celular. Já estou no segundo ciclo e não largo mais.",
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
      { title: "BUMBUM PRO MAX — Treino de glúteos e perda de gordura corporal" },
      { name: "description", content: "Treino completo de glúteos e queima de gordura corporal feito só para mulheres. Aumente e defina o seu bumbum em 1 mês. +8 mil alunas." },
      { property: "og:title", content: "BUMBUM PRO MAX — Aumente o bumbum e perca gordura corporal" },
      { property: "og:description", content: "Treino completo de glúteos e perda de gordura 100% para mulheres. Planos a partir de R$ 29,90." },
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
  "Treino completo de glúteos",
  "Foco em aumentar e definir",
  "Aceleração da queima de gordura corporal",
  "Feito 100% para mulheres",
  "Desafio 21 dias para testar seus limites e te preparar para o treino",
];

const PLAN_ANUAL_ITEMS = [
  "Treino completo de glúteos",
  "Foco em aumentar e definir",
  "Aceleração da queima de gordura corporal",
  "Feito 100% para mulheres",
  "Desafio 21 dias para testar seus limites e te preparar para o treino",
  "Treino em casa para quando estiver em viagem ou não tiver acesso à academia",
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

  const h1 = [["AUMENTE", 0], ["E", 0], ["DEFINA", 0], ["O", 0], ["SEU", 0], ["BUMBUM", 1], ["EM", 0], ["1 MÊS", 1]] as const;
  const marquee = "+8 MIL ALUNAS • TREINO DE GLÚTEOS & PERDA DE GORDURA • AUMENTE E DEFINA EM 1 MÊS • 100% PARA MULHERES • ";

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
              <span className="sticker">100% para mulheres</span>
              <span className="sticker !border-pink/40 !bg-pink/20 !text-ink">Glúteos & Queima de Gordura</span>
            </div>
            <h1 className="mt-4 text-[2.6rem] sm:text-6xl md:text-7xl">
              {h1.map(([w, pink], i) => (
                <span key={i} className={`word-up mr-[0.2em] ${pink ? "text-pink" : ""}`} style={{ animationDelay: `${i * 70}ms` }}>{w}</span>
              ))}
            </h1>
            <p className="mt-4 max-w-md text-lg">Treino completo focado em glúteos e perda de gordura corporal, pensado do zero para o corpo feminino. Você treina com foco e evolui com constância.</p>
            <p className="mt-4 text-lg"><strong className="font-display text-2xl"><Counter /></strong> alunas focadas com a gente</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#planos" className="btn-pink">Quero meu treino</a>
              <a href="#resultados" className="min-h-[48px] content-center text-center font-semibold underline underline-offset-4">Ver resultados reais</a>
            </div>
          </div>
          <div className="relative mx-auto mt-6 w-[86%] max-w-sm md:mt-0">
            <Curve className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] opacity-90" />
            <Curve draw className="absolute -inset-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)]" />
            <img
              src={heroPhoto}
              alt="Mulher de shorts pretos, de costas, mostrando o bumbum definido em um cenário tropical"
              width={668}
              height={1000}
              fetchPriority="high"
              className="relative h-auto w-full rounded-[2rem] border border-ink/15 object-cover"
            />
            <div className="absolute -inset-x-3 -top-8 z-10 -rotate-3 rounded-2xl bg-pink px-4 py-2.5 text-center shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--pink)_60%,transparent)]">
              <p className="font-display text-[15px] font-extrabold leading-tight text-balance text-on-pink sm:text-lg">Já sonhou com o bumbum da Virgínia?&nbsp;🍑</p>
              <p className="mt-0.5 text-sm font-semibold leading-tight text-on-pink/90 sm:text-base">Chegou a sua hora&nbsp;👀</p>
            </div>
          </div>
        </section>

        {/* 3. Faixa */}
        <div className="overflow-hidden bg-ink py-3" aria-label="+8 mil alunas, treino completo de glúteos, aumente e defina em 1 mês, 100% para mulheres">
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
                "Você quer aumentar e definir o bumbum",
                "Quer perder gordura corporal e secar mantendo as curvas",
                "Cansou de treino solto, sem evolução",
                "Quer um plano organizado para seguir com constância",
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
                  ["Treino completo de glúteos", "Do aquecimento à finalização, tudo pensado para glúteos.", "M4 18h16M7 18V9m5 9V5m5 13v-6"],
                  ["Aumentar e definir", "Estímulos certos para ganhar volume e forma.", "M4 16l5-5 4 4 7-7M14 8h6v6"],
                  ["Feito para mulheres", "Criado para o corpo e a rotina feminina.", "M12 14a5 5 0 100-10 5 5 0 000 10zm0 0v7m-3-3h6"],
                  ["Perda de gordura corporal", "Não é só para glúteo! Estímulos intensos que aceleram o metabolismo e queimam gordura corporal para secar e desenhar o shape.", "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"],
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
                  i < 3
                    ? "lg:col-span-2"
                    : i === 3
                    ? "lg:col-span-2 lg:col-start-2"
                    : "lg:col-span-2";
                const smSpan = i === 4 ? "sm:col-span-2 sm:max-w-md sm:mx-auto w-full" : "w-full";

                return (
                  <figure
                    key={i}
                    className={`group overflow-hidden rounded-3xl border-2 border-ink bg-card p-3 shadow-[4px_4px_0_0_#0A0A0A] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#FF2E93] ${gridSpan} ${smSpan}`}
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
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
            <p className="mt-6 text-sm">Resultados variam de pessoa para pessoa. Imagens publicadas com autorização das alunas.</p>
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
                🔥 Chega de depender de enchimento, calcinha modeladora e filtro. Treine 12 semanas com foco total e vire a mulher que não precisa esconder nada. Por menos que um cafezinho por dia.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
              {/* ANUAL */}
              <div className="card-pop relative flex flex-col rounded-3xl !border-pink bg-cream p-6 text-ink md:order-2">
                <span className="sticker wobble absolute -top-4 right-4">Mais escolhido</span>
                <h3 className="text-2xl">Plano anual</h3>
                <p className="mt-1 text-sm">12 meses de treino completo de glúteos</p>
                <div className="mt-4">
                  <p className="font-display text-5xl leading-none">R$ 49,90</p>
                  <p className="mt-2 text-sm font-bold text-ink">ou até 6x de R$ 5,61</p>
                </div>
                <p className="mt-3 rounded-xl bg-pink-light p-3 text-sm font-semibold">Só R$ 20 a mais que o trimestral para ter 4x mais tempo de treino</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {PLAN_ANUAL_ITEMS.map((t) => (
                    <li key={t} className="in flex items-start gap-2.5 text-sm leading-snug">
                      <Check />
                      <span className="pt-0.5">{t}</span>
                    </li>
                  ))}
                </ul>
                <a href={LINK_ANUAL} target="_blank" rel="noopener noreferrer" className="btn-pink mt-6 w-full text-center">Quero o anual</a>
              </div>
              {/* TRIMESTRAL */}
              <div className="flex flex-col rounded-3xl border-2 border-cream/30 p-6 md:order-1">
                <h3 className="text-2xl">Plano trimestral</h3>
                <p className="mt-1 text-sm">3 meses de treino completo de glúteos</p>
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
              ["O treino é apenas para glúteos?", "Não! Embora o foco principal seja aumentar e empinar o bumbum, o treino foi projetado com intensidade metabólica para acelerar a queima calórica e a perda de gordura corporal, ajudando a secar e definir o corpo como um todo."],
              ["Para quem é o BUMBUM PRO MAX?", "Para mulheres que querem aumentar e definir o bumbum e também queimar gordura corporal com um treino completo e organizado."],
              ["Em quanto tempo vejo resultado?", "O treino foi pensado para 1 mês de evolução, mas cada corpo responde de um jeito. Constância, alimentação e descanso fazem diferença."],
              ["Preciso de academia?", "O plano anual inclui treinos completos para academia e também treinos em casa (perfeito para viagens ou dias em que você não puder ir à academia). O plano trimestral é focado no treino de academia + Desafio 21 dias."],
              ["Qual a diferença entre o trimestral e o anual?", "O trimestral tem 3 meses de acesso e inclui o Desafio 21 dias. O anual tem 12 meses de acesso, inclui o Desafio 21 dias e ainda conta com o Treino em Casa exclusivo para quando você estiver viajando ou sem acesso à academia."],
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
            <h2 className="text-4xl md:text-7xl">SEU <span className="text-pink">BUMBUM PRO MAX</span> COMEÇA HOJE</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-cream/90">
              Menos de R$ 0,19 por dia. Chega de inventar desculpas enquanto as outras evoluem.
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
