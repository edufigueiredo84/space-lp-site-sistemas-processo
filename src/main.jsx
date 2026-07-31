import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import SitesContent from './SitesContent';

const YELLOW = '#f6d641';

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    megaphone: <><path d="m3 11 15-6v14L3 13v-2Z"/><path d="M11.5 16.4 13 21H8l-1.7-6.5"/><path d="M21 9v6"/></>,
    'user-plus': <><circle cx="9" cy="8" r="4"/><path d="M2.5 21a6.5 6.5 0 0 1 13 0M19 8v6M16 11h6"/></>,
    building: <><path d="M4 21V5l8-3v19M12 8h8v13M8 7v2M8 12v2M8 17v2M16 12v2M16 17v2M2 21h20"/></>,
    rocket: <><path d="M14 5c3.5-3.5 7-3 7-3s.5 3.5-3 7l-5 5-4-4 5-5Z"/><path d="m9 10-4 1-3 3 6 1M13 14l-1 4-3 3-1-6"/><circle cx="16.5" cy="6.5" r="1.5"/></>,
    brand: <><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7a5 5 0 1 0 5 5M12 11a1 1 0 1 0 1 1"/><path d="m15 9 6-6M17 3h4v4"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M15 9l5-5"/></>,
    alert: <><path d="M10.3 3.6 2.4 18a2 2 0 0 0 1.8 3h15.6a2 2 0 0 0 1.8-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></>,
    form: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
    message: <><path d="M20 11a8 8 0 0 1-9 8l-5 2 1.5-4A8 8 0 1 1 20 11Z"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    x: <><path d="m6 6 12 12M18 6 6 18"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    spark: <><path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Z"/><path d="m19 15 .7 2.3L22 18.5l-2.3 1.2L19 22l-.7-2.3-2.3-1.2 2.3-1.2L19 15Z"/></>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.spark}</svg>;
}

const navItems = [
  ['intro', 'O que é'],
  ['usos', 'Aplicações'],
  ['briefing', 'Briefing'],
  ['dominio', 'Publicação'],
  ['estimativa', 'Planejamento'],
  ['dependencias', 'Riscos'],
];

const requirements = [
  { id: 'conteudo', icon: 'form', eyebrow: 'Conteúdo', title: 'Textos aprovados e revisados', badge: 'Obrigatório', tone: 'required', description: 'Todos os textos precisam estar aprovados antes da implementação. Evite conteúdo temporário quando a versão final já deveria estar definida.', items: ['Título principal', 'Textos das seções', 'Chamadas e diferenciais', 'Botões', 'Informações legais', 'Perguntas frequentes'] },
  { id: 'materiais', icon: 'layers', eyebrow: 'Imagens e vídeos', title: 'Materiais visuais', badge: 'Opcional', tone: 'optional', description: 'É necessário saber se serão fornecidos pelo cliente, produzidos pela equipe ou substituídos por materiais temporários.', items: ['Logo e identidade visual', 'Fotos e renders', 'Vídeos', 'Banco de imagens autorizado', 'Manual de marca'], note: 'A ausência de imagens não impede obrigatoriamente o início, mas pode afetar o resultado visual e o prazo de aprovação.' },
  { id: 'formulario', icon: 'form', eyebrow: 'Formulário', title: 'A Landing Page terá formulário?', badge: 'Definir antes de publicar', tone: 'define', description: 'Defina estrutura, comportamento e destino dos dados antes da publicação.', items: ['Campos e obrigatoriedade', 'Texto do botão', 'Mensagens de sucesso e erro', 'Destino das informações', 'Consentimento e política de privacidade', 'Página de agradecimento'], examples: 'Exemplos: nome, telefone, e-mail, cidade, interesse, faixa de investimento, mensagem e aceite de privacidade.', note: 'Formulários muito longos podem reduzir a conversão.' },
  { id: 'whatsapp', icon: 'message', eyebrow: 'WhatsApp', title: 'Haverá direcionamento para WhatsApp?', badge: 'Definir antes de publicar', tone: 'define', description: 'O contato e a mensagem da campanha precisam ser validados antes da publicação.', items: ['Número correto com DDD', 'Código do país', 'Mensagem inicial', 'Setor ou atendente responsável', 'Horário de atendimento', 'Origem da campanha'], examples: '“Olá, vim pela Landing Page da campanha [nome da campanha] e gostaria de mais informações.”', note: 'O número deve ser validado antes da publicação.' },
  { id: 'integracoes', icon: 'link', eyebrow: 'Integração', title: 'A Landing Page terá integração?', badge: 'Definir antes do desenvolvimento final', tone: 'define', description: 'RD Station, Bitrix, Yellow Talks, CRM do cliente, webhook ou outra ferramenta definida no projeto.', items: ['Ferramenta que receberá o lead', 'Responsável pelos acessos', 'Campos que serão enviados', 'Formulário, endpoint e documentação', 'Automações necessárias', 'Responsáveis pela validação e atendimento'], note: 'Só considere a integração concluída após testar envio, recebimento e armazenamento do lead.' },
  { id: 'analytics-lp', icon: 'target', eyebrow: 'Analytics e monitoramento', title: 'Quais ferramentas serão utilizadas?', badge: 'Definir antes da publicação', tone: 'define', description: 'Defina as ferramentas de análise, os acessos necessários e quais interações da Landing Page precisam ser acompanhadas.', items: ['Google Analytics', 'Google Tag Manager', 'Meta Pixel', 'Tags de conversão', 'Eventos de formulário', 'Eventos de WhatsApp', 'Mapas de calor', 'Outras ferramentas de monitoramento'], note: 'Não use IDs ou códigos temporários em produção. Os acessos e eventos precisam ser validados antes da publicação.' },
];

const quickDecisions = ['Conteúdo aprovado', 'Identidade visual disponível', 'Uso de imagens e vídeos', 'Formulário e seus campos', 'WhatsApp e número correto', 'Integração e ferramenta', 'Analytics e eventos', 'Destino dos leads', 'Domínio ou subdomínio', 'Acessos necessários', 'Responsável pela validação'];
const impacts = {
  Conteúdo: ['Textos não aprovados', 'Alteração durante o desenvolvimento', 'Imagens ainda não entregues'],
  Cliente: ['Dependência da equipe do cliente', 'Novas funcionalidades após o início'],
  Integração: ['Falta de acesso ou documentação', 'Credenciais com erro', 'Campos indefinidos'],
  Domínio: ['Falta de acesso ao domínio', 'Propagação de DNS'],
  Aprovação: ['Retorno demorado', 'Adequações legais ou de privacidade']
};
function SectionTitle({ kicker, title, description }) {
  return <div className="section-title"><span>{kicker}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

function RequirementCard({ data }) {
  return <article className="requirement-card" id={data.id}>
    <div className="requirement-head"><span className="icon-box"><Icon name={data.icon}/></span><div><small>{data.eyebrow}</small><h3>{data.title}</h3></div><span className={`badge ${data.tone}`}>{data.badge}</span></div>
    <p>{data.description}</p>
    <ul className="compact-list">{data.items.map(item => <li key={item}><Icon name="check" size={15}/>{item}</li>)}</ul>
    {data.examples && <p className="example">{data.examples}</p>}
    {data.note && <div className="inline-note"><Icon name="alert" size={17}/><span>{data.note}</span></div>}
  </article>;
}

function App() {
  const [tab, setTab] = useState('Landing Pages');
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('intro');

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-25% 0px -65%' });
    navItems.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [tab]);

  const goTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false); };

  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#top" aria-label="Yellow Kite"><img src="/assets/logo-standart-white.svg" alt="Yellow Kite" /></a><div className="top-meta"><span className="status-dot"/>Central interna <span className="divider"/> v1.0</div></header>
    <main id="top">
      <section className="hero">
        <div className="hero-grid">
          <div><span className="eyebrow"><Icon name="spark" size={16}/> Base de conhecimento operacional</span><h1>Briefing<br/><em>e Processos</em></h1><p>Consulte os requisitos, etapas, dependências e estimativas de cada tipo de projeto antes de iniciar uma nova demanda.</p></div>
          <div className="hero-aside"><span>Objetivo</span><strong>Mais clareza.<br/>Menos retrabalho.</strong><p>Uma referência única para decisões mais rápidas e entregas previsíveis.</p><span className="hero-index">01 — 10</span></div>
        </div>
      </section>

      <nav className="tabs" aria-label="Tipos de projeto">{['Landing Pages', 'Sites', 'Sistemas'].map(item => <button key={item} onClick={() => setTab(item)} className={tab === item ? 'active' : ''}>{item}<span>{item === 'Sistemas' ? 'Em breve' : 'Disponível'}</span></button>)}</nav>

      {tab === 'Sites' ? <SitesContent /> : tab === 'Sistemas' ? <section className="coming-soon"><span className="icon-box large"><Icon name="layers" size={30}/></span><small>{tab}</small><h2>Conteúdo do processo<br/>em construção.</h2><p>A estrutura já está pronta para receber esta documentação.</p></section> : <div className="content-layout">
        <aside className={`sidebar ${menuOpen ? 'open' : ''}`}><div className="sidebar-title"><span>Nesta página</span><button onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><Icon name="x"/></button></div><nav>{navItems.map(([id,label], index) => <button key={id} className={active === id ? 'active' : ''} onClick={() => goTo(id)}><span>{String(index+1).padStart(2,'0')}</span>{label}</button>)}</nav></aside>
        <button className="mobile-index" onClick={() => setMenuOpen(true)}><Icon name="menu"/> Navegar pelas seções</button>
        <div className="content">
          <section id="intro" className="definition feature-section reveal"><div className="section-number">01</div><div><span className="pill"><Icon name="target" size={16}/> Página focada em conversão</span><h2>O que é uma<br/>Landing Page?</h2></div><div className="definition-copy"><p>Uma Landing Page é uma página criada com um objetivo específico de conversão. Normalmente, ela direciona o visitante para uma ação principal, como preencher um formulário, solicitar atendimento, entrar em contato pelo WhatsApp ou realizar um cadastro.</p><p>Diferente de um site institucional, concentra as informações em uma única jornada, reduzindo distrações e conduzindo o usuário até a ação desejada.</p></div></section>

          <section id="usos" className="section reveal"><SectionTitle kicker="02 — Aplicações" title="Como normalmente usamos" description="Na Yellow Kite, Landing Pages são utilizadas principalmente em campanhas digitais para captação de leads e fortalecimento da presença da marca."/><div className="usage-grid">{[
            ['Campanhas de mídia paga', 'megaphone'],
            ['Captação de leads', 'user-plus'],
            ['Produtos e empreendimentos', 'building'],
            ['Lançamento de campanhas', 'rocket'],
            ['Direcionamento para WhatsApp', 'message'],
            ['Presença digital da marca', 'brand'],
          ].map(([item, icon],i)=><div key={item}><span>0{i+1}</span><Icon name={icon}/><strong>{item}</strong></div>)}</div></section>

          <section className="attention reveal"><div className="attention-icon"><Icon name="alert" size={28}/></div><div><span>Orientação operacional</span><h2>Antes de iniciar uma Landing Page</h2><p>O desenvolvimento só deve começar quando as informações essenciais do briefing estiverem definidas. Conteúdo, destino dos leads ou domínio em aberto podem gerar retrabalho e atrasos.</p></div><strong className="attention-quote">Briefing incompleto<br/><em>significa prazo indefinido.</em></strong></section>

          <section id="briefing" className="section reveal"><SectionTitle kicker="03 — Checklist" title="O que o briefing precisa ter" description="Os indicadores mostram o que bloqueia o início, o que pode ser complementado e o que precisa estar definido antes da publicação."/><div className="legend"><span><i className="required"/>Obrigatório</span><span><i className="define"/>Definir antes de publicar</span><span><i className="optional"/>Opcional</span></div><div className="requirements">{requirements.map(r=><RequirementCard data={r} key={r.id}/>)}</div></section>

          <section id="dominio" className="section reveal"><SectionTitle kicker="04 — Publicação" title="Onde a Landing Page será publicada?"/><div className="domain-grid"><article><span className="icon-box"><Icon name="globe"/></span><small>Opção 01</small><h3>Subdomínio<br/>Yellow Kite</h3><code>campanha.yellowkite.digital</code><p>Utilizado quando publicação e configuração estão sob responsabilidade da nossa equipe.</p></article><article><span className="icon-box"><Icon name="globe"/></span><small>Opção 02</small><h3>Subdomínio<br/>do cliente</h3><code>campanha.cliente.com.br</code><p>Pode depender de acesso ao provedor, suporte técnico, registros DNS, SSL e aprovação do cliente.</p></article></div><div className="wide-note"><Icon name="clock"/><strong>Dependências externas alteram o prazo.</strong><span>Quando a configuração depende do cliente ou de terceiros, a data de publicação pode variar.</span></div></section>

          <section className="quick-check reveal"><div><span className="eyebrow">Checagem rápida</span><h2>Decisões que precisam<br/>estar definidas</h2><p>Use antes de mover o projeto para desenvolvimento.</p></div><div className="check-grid">{quickDecisions.map(item=><label key={item}><input type="checkbox"/><span><Icon name="check" size={14}/></span>{item}</label>)}</div></section>

          <section id="estimativa" className="section reveal"><SectionTitle kicker="05 — Planejamento" title="Estimativa inicial de execução" description="Valores de referência considerando informações, materiais e acessos disponíveis."/><div className="time-grid"><article><small>Implementação</small><h3>Landing Page básica</h3><strong><span>1—2</span> horas</strong><p>Implementação com conteúdo e identidade visual já disponíveis.</p></article><article className="featured"><small>Configuração e testes</small><h3>Integração</h3><strong><span>3+</span> horas</strong><p>CRM, formulário externo, webhook ou plataforma de atendimento.</p></article><article><small>Publicação</small><h3>Subdomínio</h3><strong><span>2+</span> horas</strong><p>Quando todos os acessos já estão disponíveis para a equipe.</p></article></div>
            <div className="composition"><div><span>Como calcular</span><h3>A estimativa é uma composição</h3><p>Não interprete cada etapa como um prazo único e fixo.</p></div><div className="formula"><div><small>Landing Page</small><strong>1—2h</strong></div><b>+</b><div><small>Integração</small><strong>3h+</strong></div><b>+</b><div><small>Subdomínio</small><strong>2h+</strong></div><b>=</b><div className="result"><small>Mínimo estimado</small><strong>6—7h</strong></div></div><p className="fine-print">Estimativa de execução técnica inicial. Alterações, dependências externas e aprovações podem ampliar o prazo. Não representa orçamento automático ou prazo definitivo.</p></div>
          </section>

          <section id="dependencias" className="section reveal"><SectionTitle kicker="06 — Riscos" title="O que pode impactar o prazo"/><div className="impact-grid">{Object.entries(impacts).map(([group,items],i)=><article key={group}><span>0{i+1}</span><h3>{group}</h3><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div></section>

          <section className="rule reveal"><span className="rule-mark">YK</span><div><span>Regra principal</span><h2>O projeto deve iniciar somente quando houver informações suficientes para executar a primeira versão sem depender de decisões básicas.</h2><div className="rule-tags">{['Objetivo','Textos aprovados','Formulário','WhatsApp','Integração','Domínio'].map(x=><span key={x}><Icon name="check" size={14}/>{x}</span>)}</div></div><strong>Quanto mais completo o briefing,<br/><em>mais rápida e previsível será a entrega.</em></strong></section>
        </div>
      </div>}
    </main>
    <footer><img src="/assets/logo-standart-white.svg" alt="Yellow Kite"/><span>Processos internos · {new Date().getFullYear()}</span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
