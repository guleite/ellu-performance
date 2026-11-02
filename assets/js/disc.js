/* =========================================================
   Teste DISC — versão rápida (16 situações, escolha única)
   Cada alternativa soma 1 ponto em D, I, S ou C.
   ========================================================= */
(function () {
  const Q = [
    ["Quando surge um problema urgente no trabalho, você…", { D: "Assume o controle e decide rápido", I: "Reúne as pessoas e anima todo mundo a resolver", S: "Mantém a calma e apoia quem está envolvido", C: "Analisa as causas antes de agir" }],
    ["Em uma reunião, você costuma…", { D: "Ir direto ao ponto e cobrar definições", I: "Puxar conversa e trazer ideias novas", S: "Ouvir com atenção e buscar consenso", C: "Trazer dados e fazer perguntas precisas" }],
    ["O que mais te motiva no trabalho?", { D: "Desafios e resultados", I: "Reconhecimento e conexão com pessoas", S: "Segurança e um ambiente harmonioso", C: "Qualidade e fazer as coisas do jeito certo" }],
    ["Diante de uma mudança repentina, você…", { D: "Vê oportunidade e já parte para a ação", I: "Fica empolgado(a) com as possibilidades", S: "Precisa de um tempo para se adaptar", C: "Quer entender os detalhes e os riscos" }],
    ["Como as pessoas costumam te descrever?", { D: "Determinado(a) e direto(a)", I: "Comunicativo(a) e otimista", S: "Paciente e leal", C: "Detalhista e criterioso(a)" }],
    ["O que mais te incomoda no dia a dia?", { D: "Lentidão e indecisão", I: "Rotina e isolamento", S: "Conflitos e instabilidade", C: "Erros e desorganização" }],
    ["Ao receber uma tarefa nova, você…", { D: "Define a meta e começa na hora", I: "Conversa com outras pessoas sobre ela", S: "Segue um passo a passo com calma", C: "Planeja cada etapa antes de começar" }],
    ["Em um conflito, você tende a…", { D: "Enfrentar e resolver logo", I: "Usar o bom humor para aliviar o clima", S: "Evitar o confronto e buscar harmonia", C: "Argumentar com lógica e fatos" }],
    ["Seu ritmo de trabalho é…", { D: "Acelerado, focado em resultado", I: "Dinâmico e variado", S: "Constante e consistente", C: "Cuidadoso e preciso" }],
    ["Ao tomar uma decisão importante, você…", { D: "Confia na intuição e decide", I: "Pensa em como as pessoas vão reagir", S: "Pondera o impacto no grupo", C: "Compara opções e dados com calma" }],
    ["Sob pressão, você pode parecer…", { D: "Impaciente ou mandão(ona)", I: "Disperso(a) ou exagerado(a)", S: "Resistente ou passivo(a)", C: "Crítico(a) ou perfeccionista" }],
    ["O feedback que você mais gosta de receber é…", { D: "Objetivo e curto", I: "Entusiasmado e na frente de todos", S: "Gentil e sincero, em particular", C: "Detalhado e bem fundamentado" }],
    ["Em um projeto em equipe, você naturalmente vira…", { D: "Quem lidera e cobra prazos", I: "Quem engaja e motiva o grupo", S: "Quem dá suporte e mantém a união", C: "Quem garante a qualidade e o processo" }],
    ["Seu ambiente de trabalho ideal tem…", { D: "Autonomia e metas ousadas", I: "Gente, troca e liberdade criativa", S: "Estabilidade e boas relações", C: "Regras claras e organização" }],
    ["Quando algo dá errado, seu primeiro pensamento é…", { D: "“Como resolvo isso agora?”", I: "“Quem pode me ajudar?”", S: "“Como todo mundo está se sentindo?”", C: "“Onde foi que erramos?”" }],
    ["O que você mais valoriza em um líder?", { D: "Coragem para decidir", I: "Carisma e inspiração", S: "Empatia e consistência", C: "Competência e coerência" }],
  ];

  const P = {
    D: {
      name: "Dominância", nick: "O Executor", color: "var(--d)",
      desc: "Você é movido(a) por desafios e resultados. Decide rápido, gosta de autonomia e não tem medo de assumir a responsabilidade quando as coisas apertam.",
      strengths: ["Foco em resultado e senso de urgência", "Coragem para tomar decisões difíceis", "Facilidade em liderar mudanças", "Visão prática e objetiva"],
      attention: ["Pode atropelar pessoas na pressa de entregar", "Impaciência com ritmos diferentes do seu", "Tendência a centralizar em vez de delegar"],
      talk: "Seja direto(a), traga o objetivo e as opções. Menos rodeios, mais resultado.",
      team: "Você é quem tira o time da inércia e destrava decisões. Combine isso com escuta para levar todos junto.",
    },
    I: {
      name: "Influência", nick: "O Comunicador", color: "var(--i)",
      desc: "Você é movido(a) por pessoas e reconhecimento. Comunica bem, contagia o ambiente com entusiasmo e tem facilidade para criar conexões.",
      strengths: ["Comunicação envolvente e persuasiva", "Otimismo que engaja o time", "Criatividade e geração de ideias", "Facilidade para criar relacionamentos"],
      attention: ["Pode se dispersar e deixar detalhes de lado", "Dificuldade com tarefas rotineiras", "Tendência a prometer mais do que cabe na agenda"],
      talk: "Seja caloroso(a), abra espaço para conversa e reconheça as ideias. Feche com combinados claros por escrito.",
      team: "Você é a energia do time: aproxima pessoas e vende ideias. Parcerias com perfis mais analíticos te tornam imbatível.",
    },
    S: {
      name: "Estabilidade", nick: "O Apoiador", color: "var(--s)",
      desc: "Você é movido(a) por segurança e harmonia. É constante, confiável e tem uma enorme capacidade de escuta e de cuidar das pessoas ao redor.",
      strengths: ["Lealdade e comprometimento", "Paciência e escuta genuína", "Constância na entrega", "Habilidade para manter o time unido"],
      attention: ["Pode evitar conflitos necessários", "Resistência a mudanças bruscas", "Dificuldade em dizer “não” e se sobrecarregar"],
      talk: "Seja gentil, explique o porquê das mudanças e dê tempo para adaptação. Segurança gera o seu melhor.",
      team: "Você é o ponto de equilíbrio: dá ritmo, acolhe e sustenta o time nos momentos difíceis.",
    },
    C: {
      name: "Conformidade", nick: "O Analista", color: "var(--c)",
      desc: "Você é movido(a) por qualidade e precisão. Pensa antes de agir, valoriza dados e processos e tem um olhar apurado para o que pode dar errado.",
      strengths: ["Pensamento analítico e lógico", "Alto padrão de qualidade", "Organização e método", "Capacidade de antecipar riscos"],
      attention: ["Pode travar buscando a perfeição", "Excesso de crítica — consigo e com os outros", "Lentidão para decidir sem todos os dados"],
      talk: "Traga dados, contexto e prazos claros. Evite improvisos e dê espaço para perguntas.",
      team: "Você é a garantia de qualidade do time: transforma ideias em processos que funcionam.",
    },
  };

  const COMBO = {
    DI: "Você une ação e carisma: decide rápido e ainda consegue engajar as pessoas na sua visão. Perfil comum em quem lidera expansões e vendas.",
    DS: "Você combina firmeza com constância: entrega resultado sem perder o cuidado com a estabilidade do time.",
    DC: "Você junta senso de urgência com rigor: busca resultado, mas do jeito certo. Um perfil forte para gestão de projetos e operações.",
    ID: "Você inspira e também empurra para frente: entusiasmo com foco em conquista. Excelente para abrir portas e mobilizar times.",
    IS: "Você é pura conexão: comunica com leveza e cuida das relações. Pessoas confiam em você com facilidade.",
    IC: "Você une criatividade e critério: tem ideias e sabe estruturá-las. Combinação valiosa para áreas de marketing e produto.",
    SD: "Você é constante e determinado(a): mantém o ritmo e não desiste do resultado, mesmo em longas jornadas.",
    SI: "Você acolhe e aproxima: um perfil que cria ambientes de confiança e colaboração genuína.",
    SC: "Você é a base sólida do time: confiável, organizado(a) e cuidadoso(a) com cada detalhe e cada pessoa.",
    CD: "Você é analítico(a) e decidido(a): estuda bem o cenário e, quando decide, executa com firmeza.",
    CI: "Você combina precisão e boa comunicação: sabe explicar o complexo de um jeito simples.",
    CS: "Você valoriza método e estabilidade: entrega com qualidade e consistência, sem sobressaltos.",
  };

  const root = document.getElementById("disc");
  if (!root) return;
  const screens = root.querySelectorAll(".disc-screen");
  let name = "", idx = 0, answers = [], order = [];

  function go(s) {
    screens.forEach((el) => el.classList.toggle("is-active", el.dataset.screen === s));
    const top = root.getBoundingClientRect().top + window.scrollY - 100;
    if (window.scrollY > top + 40) window.scrollTo({ top, behavior: "smooth" });
  }

  function shuffle(a) { return a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]); }

  root.querySelector(".disc-start").addEventListener("submit", (e) => {
    e.preventDefault();
    const inp = root.querySelector("#disc-name");
    name = inp.value.trim().split(/\s+/)[0] || "";
    if (!name) { inp.closest(".qfield").classList.add("has-error"); inp.focus(); return; }
    order = Q.map(() => shuffle(["D", "I", "S", "C"]));
    idx = 0; answers = [];
    go("quiz"); renderQ();
  });
  root.querySelector("#disc-name").addEventListener("input", (e) => e.target.closest(".qfield").classList.remove("has-error"));

  function renderQ() {
    const [title, opts] = Q[idx];
    root.querySelector(".qn").textContent = idx + 1;
    root.querySelector(".disc-bar i").style.width = (idx / Q.length) * 100 + "%";
    const t = root.querySelector(".disc-q-title");
    t.textContent = title;
    const box = root.querySelector(".disc-opts");
    box.innerHTML = order[idx].map((k, j) =>
      `<button type="button" class="qopt${answers[idx] === k ? " is-selected" : ""}" data-k="${k}"><span class="k">${String.fromCharCode(65 + j)}</span><span>${opts[k]}</span></button>`
    ).join("");
    box.querySelectorAll(".qopt").forEach((b) => b.addEventListener("click", () => choose(b)));
    root.querySelector(".disc-back").style.visibility = idx === 0 ? "hidden" : "visible";
    const q = root.querySelector(".disc-q");
    q.classList.remove("is-active"); void q.offsetWidth; q.classList.add("is-active");
  }

  function choose(btn) {
    btn.parentNode.querySelectorAll(".qopt").forEach((b) => b.classList.remove("is-selected"));
    btn.classList.add("is-selected");
    answers[idx] = btn.dataset.k;
    setTimeout(() => {
      if (idx < Q.length - 1) { idx++; renderQ(); }
      else { root.querySelector(".disc-bar i").style.width = "100%"; go("loading"); setTimeout(result, 1800); }
    }, 320);
  }

  root.querySelector(".disc-back").addEventListener("click", () => { if (idx > 0) { idx--; renderQ(); } });

  // Atalho de teclado: A, B, C, D
  document.addEventListener("keydown", (e) => {
    if (!root.querySelector('[data-screen="quiz"]').classList.contains("is-active")) return;
    if (document.querySelector(".qmodal.is-open")) return;
    const i = "abcd".indexOf(e.key.toLowerCase());
    if (i >= 0) root.querySelectorAll(".disc-opts .qopt")[i]?.click();
  });

  function result() {
    const score = { D: 0, I: 0, S: 0, C: 0 };
    answers.forEach((k) => score[k]++);
    const total = answers.length;
    const pct = {};
    Object.keys(score).forEach((k) => (pct[k] = Math.round((score[k] / total) * 100)));
    const rank = Object.keys(score).sort((a, b) => score[b] - score[a] || "DISC".indexOf(a) - "DISC".indexOf(b));
    const [p1, p2] = rank;
    const main = P[p1];
    const label = `${main.name} (${p1})` + (score[p2] > 0 ? ` com traços de ${P[p2].name} (${p2})` : "");

    const el = root.querySelector('[data-screen="result"]');
    el.innerHTML = `
      <div class="disc-result-head">
        <div>
          <span class="kicker">${name}, seu perfil predominante é</span>
          <h2>${main.name} — <span style="color:${main.color}">${main.nick}</span></h2>
          <p>${main.desc}</p>
        </div>
        <div class="disc-letter" style="background:${main.color}">${p1}<small>${p1}${p2}</small></div>
      </div>

      <div class="disc-bars">
        ${["D", "I", "S", "C"].map((k) => `
          <div class="row"><b>${P[k].name}</b><span class="track"><i data-w="${pct[k]}" style="background:${P[k].color}"></i></span><span class="pct">${pct[k]}%</span></div>`).join("")}
      </div>

      <div class="disc-cols">
        <div class="disc-box"><h4><span class="dots"></span> Seus pontos fortes</h4><ul>${main.strengths.map((s) => `<li>${s}</li>`).join("")}</ul></div>
        <div class="disc-box"><h4><span class="dots"></span> Pontos de atenção</h4><ul>${main.attention.map((s) => `<li>${s}</li>`).join("")}</ul></div>
        <div class="disc-box"><h4><span class="dots"></span> Como falar com você</h4><p>${main.talk}</p></div>
        <div class="disc-box"><h4><span class="dots"></span> Você no time</h4><p>${main.team}</p></div>
      </div>

      ${score[p2] > 0 ? `<div class="disc-combo"><h4>Sua combinação ${p1}${p2}</h4><p>${COMBO[p1 + p2]}</p></div>` : ""}

      <div class="disc-cta">
        <div>
          <h3>Quer ir além do teste rápido?</h3>
          <p>Receba a análise comportamental completa com devolutiva da Cíntia — e descubra como usar o seu perfil para liderar melhor.</p>
        </div>
        <button type="button" class="btn btn--green btn--lg disc-go">Quero minha análise completa
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </div>
      <div class="disc-actions">
        <button type="button" class="disc-share">Compartilhar resultado</button>
        <button type="button" class="disc-redo">Refazer o teste</button>
      </div>
      <p class="disc-note">Este é um mapeamento rápido e indicativo, baseado no modelo DISC. A análise completa da Ellü utiliza um instrumento mais profundo e devolutiva individual.</p>`;

    go("result");
    requestAnimationFrame(() => setTimeout(() => el.querySelectorAll(".track i").forEach((i) => (i.style.width = i.dataset.w + "%")), 150));

    el.querySelector(".disc-go").addEventListener("click", () => Qualify.open({ origem: "Teste DISC", perfil: `${label} — D${pct.D}% I${pct.I}% S${pct.S}% C${pct.C}%` }));
    el.querySelector(".disc-redo").addEventListener("click", () => { go("intro"); });
    el.querySelector(".disc-share").addEventListener("click", async (ev) => {
      const text = `Fiz o teste DISC da Ellü Performance e meu perfil é ${main.name} — ${main.nick}! Descubra o seu:`;
      const url = location.href.split("#")[0];
      try {
        if (navigator.share) await navigator.share({ title: "Meu perfil DISC", text, url });
        else { await navigator.clipboard.writeText(`${text} ${url}`); ev.target.textContent = "Link copiado! ✓"; }
      } catch (e) {}
    });

    try { localStorage.setItem("ellu_disc", JSON.stringify({ name, pct, perfil: p1 + p2, em: new Date().toISOString() })); } catch (e) {}
  }
})();
