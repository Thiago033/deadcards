import { strings, useT } from "../lib/i18n";
import { STAT_KEYS, calculateOVR, useLabel } from "../lib/cards";
import type { Stats } from "../lib/types";

const ROLE_KEYS = [
  "Carry", "OffCarry", "Frontline", "Flex", "Suporte",
] as const;


const STAT_STYLES = [
  {
    icon: "◎",
    text: "text-rose-300",
    border: "border-rose-400/25",
    background: "bg-rose-400/10",
    bar: "bg-rose-400",
    glow: "hover:shadow-rose-500/10",
  },
  {
    icon: "♟",
    text: "text-sky-300",
    border: "border-sky-400/25",
    background: "bg-sky-400/10",
    bar: "bg-sky-400",
    glow: "hover:shadow-sky-500/10",
  },
  {
    icon: "✚",
    text: "text-emerald-300",
    border: "border-emerald-400/25",
    background: "bg-emerald-400/10",
    bar: "bg-emerald-400",
    glow: "hover:shadow-emerald-500/10",
  },
  {
    icon: "➤",
    text: "text-violet-300",
    border: "border-violet-400/25",
    background: "bg-violet-400/10",
    bar: "bg-violet-400",
    glow: "hover:shadow-violet-500/10",
  },
  {
    icon: "✦",
    text: "text-amber-300",
    border: "border-amber-400/25",
    background: "bg-amber-400/10",
    bar: "bg-amber-400",
    glow: "hover:shadow-amber-500/10",
  },
  {
    icon: "◆",
    text: "text-cyan-300",
    border: "border-cyan-400/25",
    background: "bg-cyan-400/10",
    bar: "bg-cyan-400",
    glow: "hover:shadow-cyan-500/10",
  },
] as const;

const ROLE_STYLES = [
  {
    number: "01",
    color: "text-rose-300",
    border: "border-rose-400/20",
    background: "from-rose-400/10",
  },
  {
    number: "02",
    color: "text-orange-300",
    border: "border-orange-400/20",
    background: "from-orange-400/10",
  },
  {
    number: "03",
    color: "text-sky-300",
    border: "border-sky-400/20",
    background: "from-sky-400/10",
  },
  {
    number: "04",
    color: "text-violet-300",
    border: "border-violet-400/20",
    background: "from-violet-400/10",
  },
  {
    number: "05",
    color: "text-emerald-300",
    border: "border-emerald-400/20",
    background: "from-emerald-400/10",
  },
] as const;

const S = strings({
  pt: {
    title: "Guia das Cartas",
    subtitle:
      "Entenda os atributos, as funções e a nota geral das cartas do CardsLock.",
    jump: "Ir para a seção",
    guideBadge: "Guia do CardsLock",

    introTitle: "Como funcionam as cartas?",
    intro:
      "Cada carta representa um jogador de Deadlock. Seus atributos mostram diferentes habilidades, a função indica seu principal estilo de jogo e o OVR resume sua avaliação geral.",
    introNote:
      "As notas são avaliações utilizadas pelo CardsLock e não representam estatísticas oficiais do Deadlock.",

    stats: "Atributos",
    statsIntro:
      "Cada carta possui seis atributos que representam diferentes habilidades do jogador. Quanto maior a nota, melhor é sua avaliação naquela habilidade.",
    example: "Exemplo",

    statNames: [
      "Mira",
      "Macro",
      "Suporte",
      "Movimentação",
      "Pool",
      "Consistência",
    ],

    statDescriptions: [
      "Avalia a precisão do jogador ao acertar tiros e ataques nos adversários.",

      "Avalia a capacidade de entender a partida e tomar decisões que beneficiam sua equipe.",

      "Avalia a capacidade de ajudar os aliados e contribuir para o desempenho da equipe.",

      "Avalia a habilidade de se movimentar e se posicionar durante os combates.",

      "Avalia a variedade de heróis que o jogador consegue utilizar bem.",

      "Avalia a capacidade de manter um bom desempenho ao longo de diferentes partidas.",
    ],

    statExamples: [
      "Um jogador com Mira alta consegue acertar tiros com frequência, mesmo contra inimigos em movimento.",

      "Saber quando defender uma rota, ajudar um aliado, coletar almas ou disputar um objetivo importante.",

      "Proteger companheiros, controlar inimigos e utilizar habilidades para facilitar as jogadas da equipe.",

      "Utilizar pulos, esquivas e deslizes para evitar ataques, alcançar inimigos ou escapar de situações perigosas.",

      "Quanto maior o Pool, mais heróis o jogador consegue utilizar com bom desempenho.",

      "Um jogador consistente mantém boas atuações regularmente, sem depender de uma única partida excepcional.",
    ],

    statsNote:
      "Os atributos representam habilidades dos jogadores, não os atributos de combate dos heróis dentro do jogo.",

    roles: "Funções",
    rolesIntro:
      "As funções representam o principal papel de um jogador na equipe. Cada uma contribui de maneira diferente para alcançar a vitória.",

    roleDescriptions: [
      "É o principal responsável por causar dano aos adversários. Geralmente precisa acumular recursos para se tornar mais forte e ter maior impacto nos combates.",

      "Também tem foco em causar dano, mas pode assumir outras responsabilidades, ajudando o Carry e contribuindo em diferentes momentos da partida.",

      "Atua na linha de frente dos combates, enfrentando os inimigos diretamente, suportando pressão e criando espaço para os aliados.",

      "Consegue desempenhar diferentes funções conforme a necessidade da equipe, adaptando seu papel à estratégia e à composição do time.",

      "Tem como principal objetivo ajudar os companheiros, oferecendo proteção, controle de inimigos e outras vantagens durante os combates.",
    ],

    roleNote:
      "As funções não são posições obrigatórias no Deadlock. O papel de um jogador pode mudar conforme o herói escolhido, os itens e a estratégia da equipe.",

    supportNote:
      "O atributo SUP avalia a capacidade de ajudar a equipe, enquanto a função Suporte indica que essa é a principal responsabilidade do jogador.",

    overall: "Overall e classificação",
    overallLead:
      "OVR (Overall) é a nota geral do jogador exibida na carta.",

    overallIntro:
      "O OVR reúne a avaliação dos seis atributos em um único valor, facilitando a comparação entre diferentes cartas.",

    overallCalc:
      "Quando uma carta não possui um OVR próprio, o CardsLock calcula a média dos seis atributos e arredonda o resultado. Caso a carta já tenha um OVR definido, esse valor é utilizado.",

    overallExampleTitle: "Como o OVR é calculado?",

    overallExample:
      "Imagine um jogador com as seguintes notas:",

    overallResult:
      "A média dos seis atributos é 80. Portanto, o OVR calculado dessa carta será 80.",

    overallNote:
      "Uma carta com OVR maior possui uma avaliação geral mais alta, mas isso não significa que o jogador seja superior em todos os atributos.",

    tierTitle: "O que são as classificações?",
    tiers:
      "As classificações agrupam as cartas de acordo com faixas de OVR definidas pelo CardsLock. Elas permitem identificar rapidamente a faixa de avaliação de cada carta.",

    tierNote:
      "A classificação não é uma nota adicional. Ela apenas representa a faixa de OVR à qual a carta pertence.",
  },

  en: {
    title: "Card Guide",
    subtitle:
      "Understand CardsLock attributes, player roles and overall ratings.",
    jump: "Jump to section",
    guideBadge: "CardsLock Guide",

    introTitle: "How do cards work?",
    intro:
      "Each card represents a Deadlock player. Attributes highlight different skills, roles describe their primary playstyle, and OVR summarizes their overall rating.",
    introNote:
      "These ratings are assessments used by CardsLock and do not represent official Deadlock statistics.",

    stats: "Attributes",
    statsIntro:
      "Each card has six attributes representing different player skills. The higher the rating, the better the player's assessment in that skill.",
    example: "Example",

    statNames: [
      "Aim",
      "Macro",
      "Support",
      "Movement",
      "Hero Pool",
      "Consistency",
    ],

    statDescriptions: [
      "Measures a player's accuracy when landing shots and attacks on enemies.",

      "Measures a player's ability to understand the match and make decisions that benefit their team.",

      "Measures a player's ability to assist teammates and contribute to the team's performance.",

      "Measures a player's ability to move and position effectively during combat.",

      "Measures the variety of heroes a player can play effectively.",

      "Measures a player's ability to maintain good performance across different matches.",
    ],

    statExamples: [
      "A player with high Aim can consistently land shots, even against moving targets.",

      "Knowing when to defend a lane, help an ally, collect souls or contest an important objective.",

      "Protecting teammates, controlling enemies and using abilities to create opportunities for the team.",

      "Using jumps, dodges and slides to avoid attacks, chase enemies or escape dangerous situations.",

      "The higher the Hero Pool, the more heroes a player can perform well with.",

      "A consistent player performs well regularly instead of relying on a single exceptional match.",
    ],

    statsNote:
      "These attributes represent player skills, not the in-game combat statistics of Deadlock heroes.",

    roles: "Player roles",
    rolesIntro:
      "Roles describe a player's primary responsibility within the team. Each role contributes differently toward winning a match.",

    roleDescriptions: [
      "The primary damage dealer. Usually focuses on gathering resources to become stronger and have a greater impact during fights.",

      "Also focuses on dealing damage but can take on other responsibilities, supporting the Carry and contributing throughout the match.",

      "Fights on the front line, directly engaging enemies, absorbing pressure and creating space for teammates.",

      "Can fulfill different responsibilities depending on the team's needs, adapting to its strategy and composition.",

      "Primarily focuses on helping teammates by providing protection, enemy control and other advantages during fights.",
    ],

    roleNote:
      "Roles are not mandatory positions in Deadlock. A player's responsibilities can change depending on their hero, items and team strategy.",

    supportNote:
      "The SUP attribute measures a player's ability to help their team, while the Support role indicates that helping teammates is their primary responsibility.",

    overall: "Overall and rankings",
    overallLead:
      "OVR (Overall) is the player's general rating displayed on the card.",

    overallIntro:
      "OVR combines the assessment of all six attributes into a single value, making it easier to compare different cards.",

    overallCalc:
      "When a card has no predefined OVR, CardsLock calculates the average of its six attributes and rounds the result. If an OVR is already defined, that value takes precedence.",

    overallExampleTitle: "How is OVR calculated?",

    overallExample:
      "Imagine a player with the following ratings:",

    overallResult:
      "The average of the six attributes is 80. Therefore, the card's calculated OVR is 80.",

    overallNote:
      "A higher OVR indicates a higher overall rating, but it does not mean the player is better in every attribute.",

    tierTitle: "What are tier rankings?",
    tiers:
      "Tier rankings group cards into OVR ranges defined by CardsLock. They help players quickly identify each card's overall rating range.",

    tierNote:
      "A tier is not an additional rating. It simply represents the OVR range to which a card belongs.",
  },

  es: {
    title: "Guía de Cartas",
    subtitle:
      "Comprende los atributos, roles y valoraciones generales de CardsLock.",
    jump: "Ir a la sección",
    guideBadge: "Guía de CardsLock",

    introTitle: "¿Cómo funcionan las cartas?",
    intro:
      "Cada carta representa a un jugador de Deadlock. Los atributos muestran diferentes habilidades, el rol indica su principal estilo de juego y el OVR resume su valoración general.",
    introNote:
      "Estas puntuaciones son evaluaciones utilizadas por CardsLock y no representan estadísticas oficiales de Deadlock.",

    stats: "Atributos",
    statsIntro:
      "Cada carta tiene seis atributos que representan diferentes habilidades del jugador. Cuanto mayor sea la puntuación, mejor será su valoración en esa habilidad.",
    example: "Ejemplo",

    statNames: [
      "Puntería",
      "Macro",
      "Apoyo",
      "Movimiento",
      "Pool de Héroes",
      "Consistencia",
    ],

    statDescriptions: [
      "Evalúa la precisión del jugador al acertar disparos y ataques a los enemigos.",

      "Evalúa la capacidad de comprender la partida y tomar decisiones que benefician a su equipo.",

      "Evalúa la capacidad de ayudar a los aliados y contribuir al rendimiento del equipo.",

      "Evalúa la habilidad de moverse y posicionarse correctamente durante los combates.",

      "Evalúa la variedad de héroes con los que el jugador puede jugar bien.",

      "Evalúa la capacidad de mantener un buen rendimiento a lo largo de diferentes partidas.",
    ],

    statExamples: [
      "Un jugador con Puntería alta puede acertar disparos frecuentemente, incluso contra enemigos en movimiento.",

      "Saber cuándo defender una línea, ayudar a un aliado, recolectar almas o disputar un objetivo importante.",

      "Proteger compañeros, controlar enemigos y utilizar habilidades para facilitar las jugadas del equipo.",

      "Utilizar saltos, esquivas y deslizamientos para evitar ataques, perseguir enemigos o escapar de situaciones peligrosas.",

      "Cuanto mayor sea el Pool, con más héroes podrá jugar bien el jugador.",

      "Un jugador consistente mantiene buenas actuaciones regularmente, sin depender de una única partida excepcional.",
    ],

    statsNote:
      "Estos atributos representan habilidades de los jugadores, no las estadísticas de combate de los héroes dentro del juego.",

    roles: "Roles",
    rolesIntro:
      "Los roles representan la principal responsabilidad de un jugador dentro del equipo. Cada uno contribuye de manera diferente para conseguir la victoria.",

    roleDescriptions: [
      "Es el principal responsable de causar daño a los enemigos. Generalmente necesita acumular recursos para fortalecerse y tener mayor impacto en los combates.",

      "También se enfoca en causar daño, pero puede asumir otras responsabilidades, apoyando al Carry y contribuyendo durante la partida.",

      "Actúa en la primera línea de combate, enfrentándose directamente a los enemigos, soportando presión y creando espacio para sus aliados.",

      "Puede desempeñar diferentes funciones según las necesidades del equipo, adaptándose a su estrategia y composición.",

      "Su principal objetivo es ayudar a sus compañeros, ofreciendo protección, control de enemigos y otras ventajas durante los combates.",
    ],

    roleNote:
      "Los roles no son posiciones obligatorias en Deadlock. Las responsabilidades de un jugador pueden cambiar según el héroe elegido, los objetos y la estrategia del equipo.",

    supportNote:
      "El atributo SUP evalúa la capacidad de ayudar al equipo, mientras que el rol de Apoyo indica que esta es la principal responsabilidad del jugador.",

    overall: "Valoración general y clasificación",
    overallLead:
      "OVR (Overall) es la valoración general del jugador que aparece en la carta.",

    overallIntro:
      "El OVR reúne la evaluación de los seis atributos en un único valor, facilitando la comparación entre diferentes cartas.",

    overallCalc:
      "Cuando una carta no tiene un OVR propio, CardsLock calcula el promedio de los seis atributos y redondea el resultado. Si ya existe un OVR definido, ese valor tiene prioridad.",

    overallExampleTitle: "¿Cómo se calcula el OVR?",

    overallExample:
      "Imagina un jugador con las siguientes puntuaciones:",

    overallResult:
      "El promedio de los seis atributos es 80. Por lo tanto, el OVR calculado de la carta será 80.",

    overallNote:
      "Una carta con un OVR mayor tiene una valoración general más alta, pero eso no significa que el jugador sea superior en todos los atributos.",

    tierTitle: "¿Qué son las clasificaciones?",
    tiers:
      "Las clasificaciones agrupan las cartas en rangos de OVR definidos por CardsLock. Permiten identificar rápidamente el rango de valoración de cada carta.",

    tierNote:
      "La clasificación no es una puntuación adicional. Solo representa el rango de OVR al que pertenece la carta.",
  },
});

const EXAMPLE_STATS: Stats = {
  MIR: 85,
  MAC: 75,
  SUP: 80,
  MOV: 90,
  POL: 70,
  CON: 80,
};

const EXAMPLE_OVR = calculateOVR(EXAMPLE_STATS);

export function CardGuide() {
  const t = useT(S);
  const label = useLabel();

  const nav = [
    { id: "attributes", title: t.stats },
    { id: "roles", title: t.roles },
    { id: "overall", title: t.overall },
  ];

  return (
    <article className="space-y-6">
      {/* HEADER */}
      <header className="noir-glass relative overflow-hidden rounded-2xl border border-amber-300/15 p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"
        />

        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-bold tracking-widest text-amber-200 uppercase">
            {t.guideBadge}
          </div>

          <div>
            <h1 className="font-display text-3xl font-black tracking-wider text-amber-100 uppercase sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm/relaxed text-zinc-300">
              {t.subtitle}
            </p>
          </div>

          <div className="max-w-3xl rounded-xl border border-white/10 bg-black/20 p-4">
            <h2 className="mb-2 text-sm font-bold text-amber-200">
              {t.introTitle}
            </h2>
            <p className="text-sm/relaxed text-zinc-300">
              {t.intro}
            </p>
            <p className="mt-2 text-xs/relaxed text-zinc-500">
              {t.introNote}
            </p>
          </div>

          <nav
            aria-label={t.jump}
            className="flex flex-wrap gap-2"
          >
            {nav.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="inline-flex min-h-11 items-center rounded-lg border border-amber-300/20 bg-amber-300/5 px-4 text-xs font-bold tracking-wider text-amber-100 uppercase transition-colors hover:border-amber-300/50 hover:bg-amber-300/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
              >
                {title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ATRIBUTOS */}
      <section
        id="attributes"
        aria-labelledby="attributes-heading"
        className="noir-glass scroll-mt-24 space-y-5 rounded-2xl p-5 sm:p-7"
      >
        <div className="space-y-2">
          <h2
            id="attributes-heading"
            className="text-xl font-black tracking-wider text-dl-text uppercase"
          >
            {t.stats}
          </h2>
          <p className="max-w-3xl text-sm/relaxed text-zinc-300">
            {t.statsIntro}
          </p>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAT_KEYS.map((key, i) => {
            const style = STAT_STYLES[i];

            return (
              <div
                key={key}
                className={`group relative overflow-hidden rounded-xl border ${style.border} bg-zinc-950/70 p-5 transition-all duration-200 motion-safe:hover:-translate-y-1 hover:shadow-xl ${style.glow}`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 ${style.bar}`}
                />

                <dt className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.background} ${style.text} text-2xl`}
                  >
                    {style.icon}
                  </span>

                  <div>
                    <span
                      className={`block text-lg font-black ${style.text}`}
                    >
                      {key}
                    </span>
                    <span className="text-sm font-semibold text-zinc-100">
                      {t.statNames[i]}
                    </span>
                  </div>
                </dt>

                <dd className="mt-4 space-y-3">
                  <p className="text-sm/relaxed text-zinc-300">
                    {t.statDescriptions[i]}
                  </p>

                  <div className="border-t border-white/10 pt-3">
                    <span
                      className={`text-xs font-bold tracking-wide uppercase ${style.text}`}
                    >
                      {t.example}
                    </span>
                    <p className="mt-1 text-sm/relaxed text-zinc-400">
                      {t.statExamples[i]}
                    </p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="text-xs/relaxed text-zinc-500">
          {t.statsNote}
        </p>
      </section>

      {/* FUNÇÕES */}
      <section
        id="roles"
        aria-labelledby="roles-heading"
        className="noir-glass scroll-mt-24 space-y-5 rounded-2xl p-5 sm:p-7"
      >
        <div className="space-y-2">
          <h2
            id="roles-heading"
            className="text-xl font-black tracking-wider text-dl-text uppercase"
          >
            {t.roles}
          </h2>
          <p className="text-sm/relaxed text-zinc-300">
            {t.rolesIntro}
          </p>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          {ROLE_KEYS.map((key, i) => {
            const style = ROLE_STYLES[i];

            return (
              <div
                key={key}
                className={`relative overflow-hidden rounded-xl border ${style.border} bg-gradient-to-br ${style.background} to-zinc-950/80 p-5 transition-colors hover:border-white/25`}
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className={`text-2xl font-black ${style.color} opacity-70`}
                  >
                    {style.number}
                  </span>

                  <div>
                    <dt
                      className={`text-base font-black tracking-wider uppercase ${style.color}`}
                    >
                      {label(key)}
                    </dt>
                    <dd className="mt-2 text-sm/relaxed text-zinc-300">
                      {t.roleDescriptions[i]}
                    </dd>
                  </div>
                </div>
              </div>
            );
          })}
        </dl>

        <div className="space-y-2 rounded-lg border border-amber-300/15 bg-amber-400/5 p-4">
          <p className="text-xs/relaxed text-zinc-300">
            {t.roleNote}
          </p>
          <p className="text-xs/relaxed text-amber-100/80">
            {t.supportNote}
          </p>
        </div>
      </section>

      {/* OVERALL */}
      <section
        id="overall"
        aria-labelledby="overall-heading"
        className="noir-glass scroll-mt-24 space-y-5 rounded-2xl p-5 sm:p-7"
      >
        <div className="space-y-2">
          <h2
            id="overall-heading"
            className="text-xl font-black tracking-wider text-dl-text uppercase"
          >
            {t.overall}
          </h2>
          <p className="text-sm font-semibold text-amber-100">
            {t.overallLead}
          </p>
          <p className="text-sm/relaxed text-zinc-300">
            {t.overallIntro}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-amber-300/25 bg-gradient-to-br from-amber-500/10 via-zinc-950/90 to-zinc-950 p-5 sm:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl"
          />

          <div className="relative space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-amber-100">
                  {t.overallExampleTitle}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {t.overallExample}
                </p>
              </div>

              <div className="rounded-xl border-2 border-amber-300/50 bg-amber-300/10 px-6 py-3 text-center shadow-lg shadow-amber-500/5">
                <div className="text-4xl font-black text-amber-200">
                  {EXAMPLE_OVR}
                </div>
                <div className="text-xs font-bold tracking-widest text-amber-300 uppercase">
                  OVR
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {STAT_KEYS.map((key, i) => {
                const style = STAT_STYLES[i];

                return (
                  <div
                    key={key}
                    className={`rounded-lg border ${style.border} bg-black/30 p-3 text-center`}
                  >
                    <p
                      className={`text-xs font-black ${style.text}`}
                    >
                      {key}
                    </p>
                    <p className="mt-1 text-xl font-black text-zinc-100">
                      {EXAMPLE_STATS[key]}
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${style.bar}`}
                        style={{ width: `${EXAMPLE_STATS[key]}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 p-4 text-center">
              <p className="text-xs text-zinc-400">
                ({STAT_KEYS.map((key) => EXAMPLE_STATS[key]).join(" + ")}) / 6
              </p>
              <p className="mt-2 text-sm font-bold text-amber-100">
                {t.overallResult}
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm/relaxed text-zinc-400">
          {t.overallCalc}
        </p>
        <p className="text-sm/relaxed text-zinc-400">
          {t.overallNote}
        </p>

        <div className="space-y-2 rounded-xl border border-amber-300/15 bg-amber-400/5 p-4">
          <h3 className="text-sm font-black text-amber-200">
            {t.tierTitle}
          </h3>
          <p className="text-sm/relaxed text-zinc-300">
            {t.tiers}
          </p>
          <p className="text-xs/relaxed text-zinc-400">
            {t.tierNote}
          </p>
        </div>
      </section>
    </article>
  );
}
