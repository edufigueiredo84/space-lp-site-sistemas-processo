import React, { useEffect, useState } from 'react';

const nav = [
  ['site-intro', 'O que é'],
  ['site-usos', 'Aplicações'],
  ['site-comparacao', 'Comparativo'],
  ['site-briefing', 'Briefing'],
  ['site-dominio', 'Publicação'],
  ['site-estimativa', 'Planejamento'],
  ['site-dependencias', 'Riscos'],
  ['site-responsabilidades', 'Responsabilidades'],
  ['site-processo', 'Processo'],
  ['site-validacao', 'Validação'],
];

const uses = ['Presença digital da empresa', 'Apresentação institucional', 'Divulgação de serviços', 'Fortalecimento da marca', 'Construção de autoridade', 'Apresentação de portfólio', 'Captação de contatos', 'Direcionamento para WhatsApp', 'Suporte a campanhas de Google e Meta', 'Geração de tráfego orgânico', 'Centralização de informações oficiais'];

const briefing = [
  { id:'objetivo', group:'Objetivo do site', title:'Qual é o objetivo principal?', status:'Obrigatório', text:'Informe o resultado esperado, público principal, região de atuação, tipo de cliente, ação esperada, diferenciais e referências.', items:['Apresentação institucional','Divulgação de produtos ou serviços','Portfólio e autoridade','Geração de contatos','Apoio a campanhas de mídia'] },
  { id:'site-arquitetura', group:'Arquitetura e páginas', title:'Quais páginas o site terá?', status:'Obrigatório', text:'Defina menu, rodapé, páginas, subpáginas, links externos, downloads e áreas de destaque antes do desenvolvimento.', items:['Home e Sobre','Serviços e páginas individuais','Portfólio ou Projetos','Equipe, Blog e FAQ','Contato e páginas legais'], note:'Mudanças na arquitetura podem exigir alterações no menu, rodapé, navegação e em várias páginas.' },
  { id:'site-conteudo', group:'Conteúdo', title:'Textos aprovados e revisados', status:'Obrigatório', text:'Os textos devem estar organizados por página e seção, com títulos, chamadas, botões, dados institucionais, contato e informações legais.', items:['Título e subtítulo','Textos das seções','Diferenciais e serviços','Chamadas e botões','FAQ, contato e rodapé'], note:'A implementação não deve começar com conteúdo indefinido em todas as páginas.' },
  { id:'identidade', group:'Identidade visual', title:'A empresa possui identidade definida?', status:'Obrigatório', text:'Confirme logo, variações, cores, tipografia, manual de marca, grafismos, ícones e aplicações anteriores.', note:'Criação ou revisão de identidade visual não faz parte automaticamente do desenvolvimento do site.' },
  { id:'materiais', group:'Imagens e vídeos', title:'Materiais visuais', status:'Definir antes do desenvolvimento', text:'Mapeie fotos, vídeos, renders, depoimentos, banco de imagens, ilustrações, gráficos, mockups e documentos.', items:['Responsável pelo fornecimento','Qualidade dos arquivos','Autorização de uso','Produção necessária','Material temporário ou definitivo'] },
  { id:'site-design', group:'Participação do Design', title:'Peças e composições visuais', status:'A definir com o Design', text:'O Design pode produzir hero, banners, tratamentos, montagens, grafismos, ilustrações, ícones, mockups e adequações da identidade.', note:'Prazo a definir separadamente pelo Design, conforme quantidade e complexidade das peças.' },
  { id:'site-formularios', group:'Formulários', title:'O site terá formulário?', status:'Definir antes do desenvolvimento', text:'Defina páginas, campos, obrigatoriedade, mensagens, destino dos dados, privacidade, notificações e integrações.', items:['Contato ou orçamento','Trabalhe conosco','Agendamento ou inscrição','Suporte ou cadastro','Newsletter'], note:'Formulários diferentes podem exigir integrações e tratamentos diferentes.' },
  { id:'site-whatsapp', group:'WhatsApp', title:'Haverá direcionamento?', status:'Definir antes da publicação', text:'Valide número, DDD, país, mensagem inicial, setor, atendente, horário e páginas em que o botão aparecerá.', note:'Todos os números e mensagens precisam ser validados antes da publicação.' },
  { id:'site-integracoes', group:'Integração', title:'O site terá integração?', status:'Definir antes do desenvolvimento final', text:'Mapeie RD Station, Bitrix, Yellow Talks, CRM, webhook ou automações, com acessos, documentação, campos e responsáveis.', note:'Só conclua após testar envio, recebimento e armazenamento dos dados.' },
  { id:'cms', group:'Gerenciamento de conteúdo', title:'O cliente precisará editar o site?', status:'Definir antes do desenvolvimento', text:'Defina se o site será estático ou terá CMS para textos, serviços, projetos, equipe, blog, unidades, banners ou documentos.', note:'CMS, painel administrativo e conteúdo dinâmico possuem escopo e prazo próprios.' },
  { id:'site-seo', group:'SEO', title:'Informações para mecanismos de busca', status:'Definir antes da publicação', text:'Reúna empresa, segmento, localização, serviços, palavras-chave, títulos, descrições, contato, redes sociais e imagem de compartilhamento.', items:['Titles e meta descriptions','Headings e URLs legíveis','Alt text em imagens','Sitemap e robots.txt','Open Graph e favicon'], note:'Estratégia avançada e produção recorrente de conteúdo pertencem a outro escopo.' },
  { id:'analytics', group:'Analytics e monitoramento', title:'Quais ferramentas serão utilizadas?', status:'Definir antes da publicação', text:'Confirme Analytics, Tag Manager, Meta Pixel, conversões, eventos de formulário e WhatsApp, mapas de calor, acessos e validação.', note:'Não use IDs ou códigos temporários em produção.' },
  { id:'dominio-briefing', group:'Domínio e publicação', title:'Onde o site será publicado?', status:'Obrigatório antes da publicação', text:'Defina provedor, hospedagem, DNS, SSL, migração, redirecionamentos e responsáveis pelos acessos.' },
  { id:'legal', group:'Páginas legais', title:'O site precisa de informações legais?', status:'Definir antes da publicação', text:'Verifique privacidade, termos, cookies, consentimento, dados regulatórios, CNPJ, razão social e endereço.', note:'A Yellow Kite não cria nem valida juridicamente textos legais sem responsabilidade específica.' },
];

const decisions = ['Objetivo e público principal','Arquitetura, páginas e menu','Textos aprovados','Identidade visual disponível','Imagens e vídeos','Necessidades do Design','Formulários e campos','WhatsApp validado','Integração e CRM','CMS ou site estático','Analytics e eventos','Domínio e publicação','Acessos necessários','Responsável pela aprovação','Validação dos formulários'];
const estimates = [
  ['Implementação front-end','3 a 5 dias','Arquitetura aprovada, textos finalizados, identidade e materiais disponíveis. Não inclui rodadas de ajustes após a apresentação.'],
  ['Design e produção','Prazo a definir','Estimado separadamente pelo departamento responsável conforme quantidade e complexidade das peças.'],
  ['Integração','Mínimo de 3 horas','Configuração, campos, tratamento de erros, testes de envio, recebimento e validação.'],
  ['Domínio ou subdomínio','Mínimo de 2 horas','Quando todos os acessos estão disponíveis e a configuração depende da Yellow Kite.'],
  ['Ajustes','Fora da estimativa inicial','Avaliados por quantidade, impacto, conteúdo, estrutura, materiais e novas funcionalidades.'],
];
const delays = {
  Conteúdo:['Textos não aprovados','Conteúdo desorganizado','Novas páginas após o início'],
  Design:['Identidade incompleta','Atraso nas peças','Imagens sem qualidade'],
  Estrutura:['Menu indefinido','Arquitetura não aprovada','CMS solicitado depois'],
  Integração:['Falta de acesso','Documentação incompleta','Campos indefinidos'],
  Publicação:['Falta de acesso ao domínio','Migração e terceiros','DNS ou SSL'],
  Aprovação:['Retorno demorado','Solicitações conflitantes','Sem responsável final'],
};
const departments = {
  'Atendimento / Projeto':['Coletar briefing','Validar objetivo','Organizar conteúdo','Reunir acessos','Acompanhar aprovação'],
  Conteúdo:['Produzir e organizar textos','Revisar informações','Garantir aprovação','Identificar destinos'],
  Design:['Validar identidade','Produzir peças','Preparar imagens','Entregar materiais finais'],
  Desenvolvimento:['Implementar interface','Garantir responsividade','Integrar e testar','Preparar publicação'],
  Cliente:['Fornecer informações e acessos','Validar textos e estrutura','Testar formulários','Aprovar o projeto'],
};
const process = ['Receber a demanda','Entender o objetivo','Definir arquitetura','Coletar conteúdos','Validar identidade','Mapear Design','Produzir peças','Definir formulários e WhatsApp','Definir integrações','Definir publicação','Implementar front-end','Aplicar conteúdo','Testar responsividade','Testar integrações','Revisar internamente','Apresentar','Avaliar ajustes','Publicar','Testar em produção'];
const validation = ['Links e menu funcionando','Páginas acessíveis','Responsividade verificada','Textos e imagens corretos','Vídeos funcionando','Formulários validados','WhatsApp validado','Integrações testadas','Estados de erro e sucesso','Favicon e Open Graph','Titles e meta descriptions','Footer e contatos revisados','Páginas legais adicionadas','Performance básica','Console sem erros','Navegação por teclado','Contraste e legibilidade'];

function Title({ kicker, title, description }) {
  return <header className="site-section-title"><span>{kicker}</span><h2>{title}</h2>{description && <p>{description}</p>}</header>;
}

function SitesContent() {
  const [active, setActive] = useState('site-intro');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)), { rootMargin:'-25% 0px -65%' });
    nav.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  const goTo = id => { document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' }); setMenuOpen(false); };

  return <div className="content-layout sites-layout">
    <aside className={`sidebar sites-sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="sidebar-title"><span>Nesta página</span><button onClick={() => setMenuOpen(false)} aria-label="Fechar menu">×</button></div>
      <nav>{nav.map(([id,label],i)=><button key={id} className={active===id?'active':''} onClick={()=>goTo(id)}><span>{String(i+1).padStart(2,'0')}</span>{label}</button>)}</nav>
    </aside>
    <button className="mobile-index" onClick={()=>setMenuOpen(true)}>☰ Navegar pelas seções</button>
    <div className="content sites-content">
      <section id="site-intro" className="site-definition">
        <div className="site-number">01</div><div><span className="site-pill">Presença digital institucional</span><h2>O que é<br/>um site?</h2></div>
        <div className="site-definition-copy"><p>Um site é a presença digital da empresa na internet. No caso institucional, apresenta a empresa, comunica seus serviços, fortalece sua autoridade, transmite confiança e facilita o contato.</p><p>Diferente de uma Landing Page, reúne um conjunto amplo de páginas, conteúdos e caminhos de navegação.</p><div className="site-chip-list">{['Empresa','Serviços','Portfólio','Equipe','Unidades','FAQ','Atendimento','Conteúdo legal'].map(x=><span key={x}>{x}</span>)}</div></div>
      </section>

      <section id="site-usos" className="site-section"><Title kicker="02 — Aplicações" title="Como normalmente usamos" description="Um canal oficial para conhecer a marca, entender seus serviços, encontrar informações e iniciar um contato."/><div className="site-use-grid">{uses.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong></div>)}</div></section>

      <section id="site-comparacao" className="site-section"><Title kicker="03 — Comparativo" title="Site x Landing Page"/><div className="site-comparison"><article><small>Landing Page</small><h3>Uma jornada.<br/>Uma ação principal.</h3><ul>{['Página única','Foco em conversão','Uso frequente em campanhas','Conteúdo direcionado','Menor tempo de implementação'].map(x=><li key={x}>{x}</li>)}</ul></article><article><small>Site institucional</small><h3>Uma estrutura.<br/>Vários caminhos.</h3><ul>{['Múltiplas páginas','Apresentação ampla da empresa','Menu e navegação','Mais conteúdo e departamentos','SEO, performance e arquitetura'].map(x=><li key={x}>{x}</li>)}</ul></article></div><p className="site-conclusion">Landing Page é uma experiência focada em uma ação. <strong>Site é uma estrutura digital completa para representar a empresa.</strong></p></section>

      <section className="site-alert"><span>!</span><div><small>Orientação operacional</small><h2>Antes de iniciar um site</h2><p>Mais páginas significam mais conteúdo, decisões e materiais. Iniciar sem arquitetura, identidade ou responsáveis pode gerar retrabalho em toda a estrutura.</p></div><strong>Briefing incompleto<br/><em>significa prazo indefinido.</em></strong></section>

      <section id="site-briefing" className="site-section"><Title kicker="04 — Checklist" title="O que o briefing precisa ter" description="Abra cada categoria para consultar requisitos, bloqueios e definições necessárias."/><div className="site-briefing-list">{briefing.map((item,i)=><details id={item.id} key={item.group} className="site-requirement"><summary><span>{String(i+1).padStart(2,'0')}</span><div><small>{item.group}</small><h3>{item.title}</h3></div><b>{item.status}</b><i>+</i></summary><div className="site-requirement-body"><p>{item.text}</p>{item.items&&<ul>{item.items.map(x=><li key={x}>{x}</li>)}</ul>}{item.note&&<aside>{item.note}</aside>}</div></details>)}</div></section>

      <section className="site-decisions"><div><span>Checagem rápida</span><h2>Decisões que precisam estar definidas</h2><p>Use antes de mover o projeto para desenvolvimento.</p></div><div>{decisions.map(x=><label key={x}><input type="checkbox"/><span>✓</span>{x}</label>)}</div></section>

      <section id="site-dominio" className="site-section"><Title kicker="05 — Publicação" title="Onde o site será publicado?"/><div className="site-domain-grid"><article className="featured"><small>Opção mais comum</small><h3>Domínio principal<br/>do cliente</h3><code>empresa.com.br</code><p>Pode envolver provedor, DNS, hospedagem, SSL, migração do site anterior e redirecionamentos.</p></article><article><small>Estrutura separada</small><h3>Subdomínio<br/>do cliente</h3><code>institucional.empresa.com.br</code><p>Usado quando o projeto precisa permanecer separado de outra estrutura já existente.</p></article><article><small>Homologação</small><h3>Endereço<br/>Yellow Kite</h3><code>empresa.yellowkite.digital</code><p>Ambiente temporário, demonstração, homologação ou publicação administrada pela Yellow Kite.</p></article></div><p className="site-inline-note">Quando a configuração depende do cliente ou de terceiros, o prazo de publicação pode variar.</p></section>

      <section id="site-estimativa" className="site-section"><Title kicker="06 — Planejamento" title="Estimativa inicial de execução" description="Os prazos representam etapas diferentes e dependem de materiais, acessos e aprovações."/><div className="site-estimate-grid">{estimates.map(([name,time,text],i)=><article key={name} className={i===0?'featured':''}><small>{name}</small><strong>{time}</strong><p>{text}</p></article>)}</div><div className="site-formula"><span>Briefing aprovado</span><b>+</b><span>Design a definir</span><b>+</b><span>3–5 dias</span><b>+</b><span>Integração 3h+</span><b>+</b><span>Domínio 2h+</span></div><p className="site-estimate-note">O cronograma final depende do conteúdo, Design, acessos, integrações, aprovação e quantidade de páginas.</p></section>

      <section id="site-dependencias" className="site-section"><Title kicker="07 — Riscos" title="O que pode impactar o prazo"/><div className="site-delay-grid">{Object.entries(delays).map(([group,items],i)=><article key={group}><span>0{i+1}</span><h3>{group}</h3><ul>{items.map(x=><li key={x}>{x}</li>)}</ul></article>)}</div></section>

      <section id="site-responsabilidades" className="site-section"><Title kicker="08 — Equipe" title="Responsabilidades por departamento"/><div className="site-department-grid">{Object.entries(departments).map(([group,items])=><article key={group}><h3>{group}</h3><ul>{items.map(x=><li key={x}>{x}</li>)}</ul></article>)}</div><p className="site-inline-note">Cada projeto pode ter responsáveis diferentes, mas as responsabilidades precisam estar definidas antes do início.</p></section>

      <section id="site-processo" className="site-section"><Title kicker="09 — Fluxo" title="Processo resumido" description="Estrutura informativa preparada para receber status de acompanhamento no futuro."/><ol className="site-timeline">{process.map((x,i)=><li key={x}><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong></li>)}</ol></section>

      <section id="site-validacao" className="site-section"><Title kicker="10 — Qualidade" title="Checklist técnico antes da apresentação"/><div className="site-validation">{validation.map(x=><label key={x}><input type="checkbox"/><span>✓</span>{x}</label>)}</div></section>

      <section className="site-rule"><span>YK</span><div><small>Regra principal</small><h2>O desenvolvimento deve começar quando houver informações suficientes para construir a estrutura aprovada sem depender de decisões básicas.</h2><p>Um site possui várias páginas conectadas. Uma decisão incompleta pode gerar retrabalho em toda a estrutura.</p><strong>Quanto mais completo o briefing, mais previsível será o prazo de implementação.</strong></div></section>
    </div>
  </div>;
}

export default SitesContent;
