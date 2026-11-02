/* =========================================================
   Big Five (OCEAN) — análise rápida
   20 afirmações, 4 por traço, escala de 1 a 5.
   Metade das afirmações é invertida (key = -1) para evitar
   que a pessoa "concorde com tudo" e distorça o resultado.
   O traço N é apresentado como Estabilidade emocional
   (o inverso do Neuroticismo), por ser mais claro para o público.
   ========================================================= */
(function () {
  // [texto, traço, chave]  chave +1 = soma direto · -1 = invertida
  const Q = [
    ["Me sinto cheio(a) de energia depois de conversar com muita gente.", "E", 1],
    ["Me importo de verdade com o que meus colegas estão sentindo.", "A", 1],
    ["Termino o que começo, mesmo quando a tarefa fica chata.", "C", 1],
    ["Fico preocupado(a) com as coisas com facilidade.", "N", -1],
    ["Adoro explorar ideias novas e diferentes.", "O", 1],
    ["Prefiro ficar nos bastidores a ser o centro das atenções.", "E", -1],
    ["Às vezes sou duro(a) demais com as pessoas.", "A", -1],
    ["Costumo deixar tarefas importantes para a última hora.", "C", -1],
    ["Mantenho a calma em situações de muita pressão.", "N", 1],
    ["Prefiro o que já conheço a experimentar coisas novas.", "O", -1],
    ["Costumo puxar assunto com pessoas que acabei de conhecer.", "E", 1],
    ["Gosto de ajudar, mesmo quando não é minha responsabilidade.", "A", 1],
    ["Gosto de planejar e organizar tudo antes de começar.", "C", 1],
    ["Meu humor muda bastante ao longo do dia.", "N", -1],
    ["Tenho facilidade para imaginar soluções criativas.", "O", 1],
    ["Em reuniões, normalmente falo pouco.", "E", -1],
    ["Desconfio das intenções dos outros com facilidade.", "A", -1],
    ["Minha agenda e meus arquivos vivem meio bagunçados.", "C", -1],
    ["Raramente me sinto ansioso(a) ou tenso(a).", "N", 1],
    ["Discussões muito abstratas ou teóricas me cansam.", "O", -1],
  ];

  const ORDER = ["O", "C", "E", "A", "N"];

  const T = {
    O: {
      name: "Abertura", full: "Abertura à experiência", nick: "O Explorador", color: "var(--b5-o)",
      low: "Prático(a) e tradicional", high: "Curioso(a) e inovador(a)",
      txt: {
        alto: "Você é movido(a) por curiosidade. Gosta de ideias novas, enxerga possibilidades onde outros veem limites e se entedia com o “sempre foi assim”.",
        medio: "Você equilibra curiosidade e pé no chão: topa o novo quando faz sentido, mas valoriza o que já foi testado e funciona.",
        baixo: "Você é prático(a) e valoriza o que é concreto e comprovado. Prefere métodos conhecidos a experimentos sem garantia.",
      },
      work: {
        alto: "Brilha em inovação, melhoria de processos e projetos novos. Cuidado para não abandonar o que funciona só porque deixou de ser novidade.",
        medio: "É uma ponte valiosa entre quem quer inovar e quem quer preservar o que já dá resultado.",
        baixo: "Traz consistência e foco em execução. Vale testar pequenas mudanças antes de descartá-las.",
      },
    },
    C: {
      name: "Conscienciosidade", full: "Conscienciosidade", nick: "O Realizador", color: "var(--b5-c)",
      low: "Flexível e espontâneo(a)", high: "Organizado(a) e disciplinado(a)",
      txt: {
        alto: "Você é organizado(a), confiável e orientado(a) a metas. Planeja, cumpre prazos e entrega o que promete.",
        medio: "Você se organiza bem quando precisa, mas sem rigidez. Sabe alternar entre planejamento e improviso.",
        baixo: "Você é flexível e espontâneo(a), lida bem com o inesperado e não se prende a planos rígidos.",
      },
      work: {
        alto: "É quem garante que as coisas saiam do papel. Atenção ao perfeccionismo e à dificuldade com imprevistos.",
        medio: "Se adapta a ambientes estruturados e aos mais dinâmicos. Rotinas simples potencializam sua entrega.",
        baixo: "Ótimo(a) em cenários que mudam rápido. Prazos combinados e checklists evitam que o importante fique para trás.",
      },
    },
    E: {
      name: "Extroversão", full: "Extroversão", nick: "O Conector", color: "var(--b5-e)",
      low: "Reservado(a) e reflexivo(a)", high: "Sociável e expansivo(a)",
      txt: {
        alto: "Você ganha energia com pessoas. É comunicativo(a), entusiasmado(a) e fica à vontade para se expor e puxar conversas.",
        medio: "Você transita bem entre o social e o silêncio: curte trocar ideias, mas também precisa de momentos a sós para recarregar.",
        baixo: "Você é mais reservado(a) e reflexivo(a). Prefere conversas profundas a grandes grupos e pensa antes de falar.",
      },
      work: {
        alto: "Rende em relacionamento, vendas e liderança de grupos. Lembre-se de abrir espaço para os mais quietos falarem.",
        medio: "Funciona bem tanto em times colaborativos quanto em trabalho individual e focado.",
        baixo: "Traz escuta, concentração e profundidade. Combine com o time formas de contribuir além das reuniões ao vivo.",
      },
    },
    A: {
      name: "Amabilidade", full: "Amabilidade", nick: "O Agregador", color: "var(--b5-a)",
      low: "Direto(a) e questionador(a)", high: "Cooperativo(a) e empático(a)",
      txt: {
        alto: "Você é empático(a), cooperativo(a) e confia nas pessoas. Valoriza a harmonia e se preocupa de verdade com o bem-estar dos outros.",
        medio: "Você equilibra cooperação e firmeza: ajuda quando pode, mas sabe defender seus pontos de vista.",
        baixo: "Você é direto(a), crítico(a) e não tem medo de discordar. Coloca a verdade e o resultado acima do agrado.",
      },
      work: {
        alto: "É a cola do time e um ótimo mediador. Cuidado para não engolir discordâncias nem dizer “sim” a tudo.",
        medio: "Consegue negociar sem desgastar relações — uma combinação rara e valiosa.",
        baixo: "Valioso(a) em negociações duras e para questionar decisões fracas. Ajustar o tom ajuda suas ideias a serem ouvidas.",
      },
    },
    N: {
      name: "Estabilidade emocional", full: "Estabilidade emocional", nick: "A Âncora", color: "var(--b5-n)",
      low: "Sensível e reativo(a)", high: "Calmo(a) e resiliente",
      txt: {
        alto: "Você mantém a calma sob pressão, se recupera rápido de frustrações e raramente se deixa abalar.",
        medio: "Você lida bem com a maior parte das pressões, mas sente o peso quando elas se acumulam.",
        baixo: "Você sente as coisas com intensidade e tende a se preocupar mais. Isso também te deixa atento(a) a riscos que outros não veem.",
      },
      work: {
        alto: "É uma âncora em momentos de crise. Só não deixe a calma parecer indiferença: mostre que se importa.",
        medio: "Pausas e prioridades claras mantêm sua energia em alta nos períodos mais intensos.",
        baixo: "Clareza e feedback frequente ajudam muito. Rotinas de autocuidado fazem diferença real na sua performance.",
      },
    },
  };

  // Frase de abertura do resultado, conforme o traço mais marcante
  const ESSENCE = {
    O: "Seu motor é a curiosidade. Você aprende rápido, conecta ideias de áreas diferentes e costuma ser quem pergunta “e se a gente fizesse diferente?”.",
    C: "Seu motor é a entrega. Você transforma intenção em plano e plano em resultado — as pessoas sabem que podem contar com você.",
    E: "Seu motor são as pessoas. Você movimenta conversas, cria conexões com facilidade e leva energia para onde chega.",
    A: "Seu motor é a colaboração. Você aproxima pessoas, cria confiança e faz o time funcionar melhor junto do que separado.",
    N: "Seu motor é o equilíbrio. Você mantém a cabeça no lugar quando a pressão aumenta e ajuda os outros a fazerem o mesmo.",
  };

  // Combinação dos dois traços mais fortes (chave na ordem O, C, E, A, N)
  const COMBO = {
    OC: "Criatividade com disciplina: você tem ideias novas e também a organização para colocá-las de pé. Perfil forte para projetos de inovação e melhoria contínua.",
    OE: "Curiosidade com energia social: você gera ideias e sabe vendê-las. Combinação valiosa para liderar mudanças e engajar pessoas no novo.",
    OA: "Mente aberta e coração aberto: você acolhe pontos de vista diferentes e ajuda o time a construir soluções juntos. Ótimo(a) para facilitar conversas difíceis.",
    ON: "Curiosidade com serenidade: você experimenta sem se abalar com erros no caminho. Perfil que lida bem com cenários incertos.",
    CE: "Organização com presença: você comunica bem e cumpre o que promete. Uma base sólida para liderança e gestão de pessoas.",
    CA: "Responsabilidade com cuidado: você entrega com qualidade e ainda olha para quem está ao lado. As pessoas confiam em você — com razão.",
    CN: "Disciplina com calma: você mantém o padrão e o ritmo mesmo sob pressão. Perfil de quem segura a operação nos momentos críticos.",
    EA: "Sociável e empático(a): você cria vínculos genuínos e faz as pessoas se sentirem parte. Excelente para relacionamento, atendimento e cultura.",
    EN: "Energia com equilíbrio: você se expõe com segurança e não se intimida diante de plateias ou conflitos. Combinação típica de líderes de linha de frente.",
    AN: "Empatia com estabilidade: você acolhe sem se desgastar e é um porto seguro para o time. Perfil muito valioso em momentos de mudança.",
  };
  const comboKey = (a, b) => [a, b].sort((x, y) => ORDER.indexOf(x) - ORDER.indexOf(y)).join("");

  const LEVEL = { alto: "Alto", medio: "Moderado", baixo: "Baixo" };
  const levelOf = (p) => (p >= 65 ? "alto" : p <= 35 ? "baixo" : "medio");

  const root = document.getElementById("bigfive");
  if (!root) return;
  const screens = root.querySelectorAll(".disc-screen");
  const likert = root.querySelectorAll(".lk");
  let name = "", idx = 0, answers = [];

  function go(s) {
    screens.forEach((el) => el.classList.toggle("is-active", el.dataset.screen === s));
    const top = root.getBoundingClientRect().top + window.scrollY - 100;
    if (window.scrollY > top + 40) window.scrollTo({ top, behavior: "smooth" });
  }

  root.querySelector(".disc-start").addEventListener("submit", (e) => {
    e.preventDefault();
    const inp = root.querySelector("#b5-name");
    name = inp.value.trim().split(/\s+/)[0] || "";
    if (!name) { inp.closest(".qfield").classList.add("has-error"); inp.focus(); return; }
    idx = 0; answers = [];
    go("quiz"); renderQ();
  });
  root.querySelector("#b5-name").addEventListener("input", (e) => e.target.closest(".qfield").classList.remove("has-error"));

  function renderQ() {
    root.querySelector(".qn").textContent = idx + 1;
    root.querySelector(".b5-bar i").style.width = (idx / Q.length) * 100 + "%";
    root.querySelector(".b5-statement").textContent = `“${Q[idx][0]}”`;
    likert.forEach((b) => {
      const on = answers[idx] === +b.dataset.v;
      b.classList.toggle("is-selected", on);
      b.setAttribute("aria-checked", on);
    });
    root.querySelector(".disc-back").style.visibility = idx === 0 ? "hidden" : "visible";
    const q = root.querySelector(".disc-q");
    q.classList.remove("is-active"); void q.offsetWidth; q.classList.add("is-active");
  }

  let busy = false;
  function choose(v) {
    if (busy) return;
    busy = true;
    answers[idx] = v;
    likert.forEach((b) => b.classList.toggle("is-selected", +b.dataset.v === v));
    setTimeout(() => {
      busy = false;
      if (idx < Q.length - 1) { idx++; renderQ(); }
      else { root.querySelector(".b5-bar i").style.width = "100%"; go("loading"); setTimeout(result, 1800); }
    }, 300);
  }
  likert.forEach((b) => b.addEventListener("click", () => choose(+b.dataset.v)));
  root.querySelector(".disc-back").addEventListener("click", () => { if (idx > 0) { idx--; renderQ(); } });

  // Atalho de teclado: 1 a 5
  document.addEventListener("keydown", (e) => {
    if (!root.querySelector('[data-screen="quiz"]').classList.contains("is-active")) return;
    if (document.querySelector(".qmodal.is-open")) return;
    const v = parseInt(e.key, 10);
    if (v >= 1 && v <= 5) choose(v);
  });

  /* ---------- Resultado ---------- */
  function scores() {
    const sum = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    Q.forEach(([, t, key], i) => { sum[t] += key === 1 ? answers[i] : 6 - answers[i]; });
    const pct = {};
    ORDER.forEach((t) => (pct[t] = Math.round(((sum[t] - 4) / 16) * 100))); // 4..20 → 0..100
    return pct;
  }

  function radar(pct) {
    const S = 340, c = S / 2, R = 118;
    const pt = (i, r) => {
      const a = (-90 + i * 72) * (Math.PI / 180);
      return [c + r * Math.cos(a), c + r * Math.sin(a)];
    };
    const ring = (f) => ORDER.map((_, i) => pt(i, R * f).map((n) => n.toFixed(1)).join(",")).join(" ");
    const shape = ORDER.map((t, i) => pt(i, R * Math.max(pct[t], 4) / 100).map((n) => n.toFixed(1)).join(",")).join(" ");
    const labels = ORDER.map((t, i) => {
      const [x, y] = pt(i, R + 34);
      const anchor = Math.abs(x - c) < 4 ? "middle" : x > c ? "start" : "end";
      const dx = anchor === "start" ? -10 : anchor === "end" ? 10 : 0;
      return `<text x="${(x + dx).toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}"><tspan class="l" fill="${T[t].color}">${t}</tspan><tspan class="v" dx="5">${pct[t]}</tspan></text>`;
    }).join("");
    const dots = ORDER.map((t, i) => {
      const [x, y] = pt(i, R * Math.max(pct[t], 4) / 100);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${T[t].color}" stroke="#fff" stroke-width="2.5"/>`;
    }).join("");
    const axes = ORDER.map((_, i) => { const [x, y] = pt(i, R); return `<line x1="${c}" y1="${c}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join("");
    return `<svg class="b5-radar" viewBox="0 0 ${S} ${S}" role="img" aria-label="Gráfico dos seus 5 traços">
      <g class="grid">${[0.25, 0.5, 0.75, 1].map((f) => `<polygon points="${ring(f)}"/>`).join("")}${axes}</g>
      <g class="shape"><polygon points="${shape}"/>${dots}</g>
      <g class="labels">${labels}</g></svg>`;
  }

  function result() {
    const pct = scores();
    const rank = ORDER.slice().sort((a, b) => pct[b] - pct[a] || ORDER.indexOf(a) - ORDER.indexOf(b));
    const top = rank[0], top2 = rank[1];
    const groups = { alto: [], medio: [], baixo: [] };
    ORDER.forEach((t) => groups[levelOf(pct[t])].push(T[t].name));
    const list = (a) => a.length <= 1 ? a.join("") : a.slice(0, -1).join(", ") + " e " + a[a.length - 1];
    const summary = [
      groups.alto.length ? `pontuação alta em <b>${list(groups.alto)}</b>` : "",
      groups.medio.length ? `moderada em ${list(groups.medio)}` : "",
      groups.baixo.length ? `mais baixa em ${list(groups.baixo)}` : "",
    ].filter(Boolean).join("; ");

    const el = root.querySelector('[data-screen="result"]');
    el.innerHTML = `
      <div class="b5-head">
        <div>
          <span class="kicker">${name}, seu traço mais marcante é</span>
          <h2>${T[top].name} — <span style="color:${T[top].color}">${T[top].nick}</span></h2>
          <p>${ESSENCE[top]}</p>
          <p class="b5-summary">No seu mapa: ${summary}.</p>
        </div>
        <div class="b5-chart">${radar(pct)}</div>
      </div>

      <div class="b5-traits">
        ${ORDER.map((t) => {
          const lv = levelOf(pct[t]);
          return `<article class="b5-trait" style="--tc:${T[t].color}">
            <header>
              <span class="b5-badge">${t}</span>
              <h4>${T[t].full}</h4>
              <span class="b5-lv">${LEVEL[lv]}</span>
              <span class="b5-pct">${pct[t]}</span>
            </header>
            <div class="b5-scale"><span class="track"><i data-w="${pct[t]}"></i></span>
              <span class="poles"><small>${T[t].low}</small><small>${T[t].high}</small></span></div>
            <p>${T[t].txt[lv]}</p>
            <p class="b5-work"><b>No trabalho:</b> ${T[t].work[lv]}</p>
          </article>`;
        }).join("")}
      </div>

      <div class="disc-combo"><h4>Sua combinação: ${T[top].name} + ${T[top2].name}</h4>
        <p>${COMBO[comboKey(top, top2)]}</p></div>

      <div class="disc-cta">
        <div>
          <h3>Quer entender o que fazer com isso?</h3>
          <p>Converse com a Ellü e receba uma devolutiva completa — com um plano para usar os seus traços a favor da sua carreira e da sua liderança.</p>
        </div>
        <button type="button" class="btn btn--green btn--lg b5-go">Quero minha devolutiva
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </div>
      <div class="disc-actions">
        <button type="button" class="b5-share">Compartilhar resultado</button>
        <button type="button" class="b5-redo">Refazer a análise</button>
        <a href="disc.html">Fazer também o teste DISC</a>
      </div>
      <p class="disc-note">Esta é uma análise rápida e indicativa, inspirada no modelo dos Cinco Grandes Fatores (Big Five). Não substitui uma avaliação psicológica completa.</p>`;

    go("result");
    requestAnimationFrame(() => setTimeout(() => {
      el.querySelector(".b5-radar").classList.add("is-on");
      el.querySelectorAll(".b5-scale i").forEach((i) => (i.style.width = i.dataset.w + "%"));
    }, 150));

    const perfil = `destaque em ${T[top].name} — ` + ORDER.map((t) => `${T[t].name} ${pct[t]}`).join(" · ");
    el.querySelector(".b5-go").addEventListener("click", () =>
      Qualify.open({ origem: "Análise Big Five", teste: "Big Five", perfil }));
    el.querySelector(".b5-redo").addEventListener("click", () => go("intro"));
    el.querySelector(".b5-share").addEventListener("click", async (ev) => {
      const text = `Fiz a análise Big Five da Ellü Performance e meu traço mais marcante é ${T[top].name} — ${T[top].nick}! Descubra o seu:`;
      const url = location.href.split("#")[0];
      try {
        if (navigator.share) await navigator.share({ title: "Meu perfil Big Five", text, url });
        else { await navigator.clipboard.writeText(`${text} ${url}`); ev.target.textContent = "Link copiado! ✓"; }
      } catch (e) {}
    });

    try { localStorage.setItem("ellu_bigfive", JSON.stringify({ name, pct, destaque: top, em: new Date().toISOString() })); } catch (e) {}
  }
})();
