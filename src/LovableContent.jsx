import React, { useEffect, useState } from 'react';

const sections = [
  ['lovable-intro', 'Visão geral'],
  ['lovable-antes', 'Antes de começar'],
  ['lovable-briefing', 'Briefing essencial'],
  ['lovable-fluxo', 'Fluxo recomendado'],
  ['lovable-prompt', 'Como pedir'],
  ['lovable-apoio', 'Quando pedir ajuda'],
  ['lovable-checklist', 'Checklist final'],
];

const briefing = [
  ['Objetivo', 'O que precisa ser resolvido e qual resultado define o sucesso.'],
  ['Público', 'Quem vai usar, em qual contexto e com qual nível de familiaridade.'],
  ['Escopo', 'Páginas, funções e integrações que realmente fazem parte da primeira versão.'],
  ['Conteúdo', 'Textos, dados, imagens e estados de tela já revisados.'],
  ['Referências', 'Exemplos visuais e funcionais, sempre explicando o que deve ser aproveitado.'],
  ['Critérios', 'Regras, restrições e itens que precisam ser validados antes da entrega.'],
];

const promptParts = [
  ['Contexto', 'Estamos criando [tipo de solução] para [público].'],
  ['Objetivo', 'A pessoa deve conseguir [ação principal].'],
  ['Estrutura', 'A solução terá [páginas, seções e funcionalidades].'],
  ['Direção visual', 'Use [referências, marca, cores e estilo].'],
  ['Regras', 'Considere [restrições, integrações e comportamentos].'],
  ['Entrega', 'Crie primeiro [escopo desta etapa] para validação.'],
];

const checklist = ['Objetivo e público definidos', 'Escopo da primeira versão fechado', 'Conteúdo revisado e disponível', 'Referências explicadas', 'Funcionalidades priorizadas', 'Integrações e acessos mapeados', 'Responsável pela validação definido', 'Dúvidas críticas resolvidas'];

function LovableContent() {
  const [active, setActive] = useState('lovable-intro');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-25% 0px -65%' });
    sections.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  const goTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return <div className="lovable-layout">
    <aside className={`lovable-sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="lovable-sidebar-head"><span>Neste módulo</span><button onClick={() => setMenuOpen(false)} aria-label="Fechar menu">×</button></div>
      <nav>{sections.map(([id, label], index) => <button key={id} className={active === id ? 'active' : ''} onClick={() => goTo(id)}><span>{String(index + 1).padStart(2, '0')}</span>{label}</button>)}</nav>
    </aside>
    <button className="lovable-mobile-index" onClick={() => setMenuOpen(true)}>☰ Navegar pelo módulo</button>

    <div className="lovable-content">
      <section id="lovable-intro" className="lovable-hero">
        <div className="lovable-hero-copy">
          <span className="lovable-kicker">Boas práticas de uso</span>
          <img src="/assets/lovable-wordmark.png" alt="Lovable" />
          <h2>Comece com clareza.<br/><em>Evolua com intenção.</em></h2>
          <p>O Lovable acelera a construção quando recebe decisões claras. Um bom briefing transforma a primeira versão em uma base consistente — e cada evolução passa a ter um propósito.</p>
        </div>
        <div className="lovable-principle">
          <img src="/assets/lovable-mark.png" alt="" />
          <span>Princípio central</span>
          <strong>Planejar antes de construir é a forma mais rápida de chegar ao resultado.</strong>
        </div>
      </section>

      <section id="lovable-antes" className="lovable-section lovable-before">
        <div className="lovable-title"><span>01 — Antes de começar</span><h2>Não comece pela ferramenta.<br/>Comece pela decisão.</h2><p>O primeiro prompt não deve ser usado para descobrir o que o projeto é. Antes de abrir o Lovable, alinhe a demanda e reduza as decisões em aberto.</p></div>
        <div className="lovable-compare">
          <article><small>Sinal de alerta</small><h3>Construir enquanto o escopo ainda muda</h3><ul><li>Objetivo pouco claro</li><li>Referências sem direcionamento</li><li>Novas funções a cada revisão</li><li>Conteúdo tratado como provisório</li></ul></article>
          <article><small>Prática recomendada</small><h3>Entrar com uma primeira versão bem definida</h3><ul><li>Resultado esperado alinhado</li><li>Escopo essencial priorizado</li><li>Conteúdo e identidade disponíveis</li><li>Critérios de aprovação combinados</li></ul></article>
        </div>
        <p className="lovable-callout">Quanto mais completa for a preparação, mais consistentes serão as respostas e menor será o número de ciclos necessários para chegar à versão certa.</p>
      </section>

      <section id="lovable-briefing" className="lovable-section">
        <div className="lovable-title"><span>02 — Briefing essencial</span><h2>O que precisa estar claro</h2><p>Use estes seis blocos como ponto de partida para qualquer projeto.</p></div>
        <div className="lovable-brief-grid">{briefing.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="lovable-fluxo" className="lovable-section lovable-flow-section">
        <div className="lovable-title"><span>03 — Fluxo recomendado</span><h2>Construa em etapas validáveis</h2><p>Organize o trabalho em blocos com começo, fim e objetivo. Assim, cada nova solicitação parte de uma base aprovada.</p></div>
        <ol className="lovable-flow">
          {[
            ['Preparar', 'Consolidar briefing, conteúdo e referências.'],
            ['Estruturar', 'Criar arquitetura, páginas e jornada principal.'],
            ['Validar', 'Confirmar direção e corrigir desvios relevantes.'],
            ['Refinar', 'Ajustar visual, responsividade e estados.'],
            ['Testar', 'Revisar fluxos, integrações e conteúdo final.'],
          ].map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
        </ol>
        <div className="lovable-stop"><strong>Valide a direção antes de ampliar.</strong><span>Se estrutura, linguagem ou experiência não estão corretas, alinhe esses pontos antes de solicitar novas páginas e funcionalidades.</span></div>
      </section>

      <section id="lovable-prompt" className="lovable-section lovable-prompt-section">
        <div className="lovable-title"><span>04 — Como pedir</span><h2>Um bom prompt funciona como um mini briefing</h2><p>Seja específico sobre o que deve ser construído agora. Evite acumular pedidos desconectados ou contraditórios na mesma solicitação.</p></div>
        <div className="lovable-prompt-card"><div className="lovable-prompt-label">Estrutura sugerida</div>{promptParts.map(([label, text]) => <p key={label}><strong>{label}:</strong> {text}</p>)}</div>
        <div className="lovable-prompt-tips"><span>Faça</span><p>Explique a intenção, defina prioridade e peça uma etapa por vez.</p><span>Evite</span><p>“Deixe melhor”, “mude tudo” ou novas direções sem explicar o problema.</p></div>
      </section>

      <section id="lovable-apoio" className="lovable-section lovable-help">
        <div><span className="lovable-kicker">05 — Apoio</span><h2>Quando houver dúvida,<br/>chame quem já cria no Lovable.</h2></div>
        <div><p>Peça apoio antes de iniciar ou assim que perceber que o projeto está entrando em ciclos de tentativa. Uma conversa curta pode destravar decisões e indicar a melhor forma de conduzir a construção.</p><ul><li>Escopo ou viabilidade pouco claros</li><li>Dúvida sobre como estruturar o prompt</li><li>Integração ou comportamento mais complexo</li><li>Resultado distante da direção esperada</li><li>Mudança relevante após o início</li></ul><strong>Escalar cedo é parte do processo — não é sinal de erro.</strong></div>
      </section>

      <section id="lovable-checklist" className="lovable-section">
        <div className="lovable-title"><span>06 — Antes do primeiro prompt</span><h2>Checklist de prontidão</h2><p>Se muitos itens ainda estiverem em aberto, vale pausar e completar o briefing.</p></div>
        <div className="lovable-checklist">{checklist.map(item => <label key={item}><input type="checkbox"/><span>✓</span>{item}</label>)}</div>
      </section>

      <section className="lovable-final"><img src="/assets/lovable-mark.png" alt=""/><div><span>Regra de ouro</span><h2>Use o Lovable para transformar decisões em produto — não para adiar as decisões.</h2><p>Clareza antes. Validação durante. Evolução com intenção.</p></div></section>
    </div>
  </div>;
}

export default LovableContent;
