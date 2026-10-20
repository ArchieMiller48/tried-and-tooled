import { matchStack, type CatalogTool, type FinderAnswers, type FinderCatalog, type MatchedNeed } from '../lib/stackMatch';

function el(tag: string, attrs: Record<string, string | null | undefined> = {}): HTMLElement {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null) continue;
    node.setAttribute(key, value);
  }
  return node;
}

function text(tag: string, value: string, attrs?: Record<string, string>): HTMLElement {
  const node = el(tag, attrs);
  node.textContent = value;
  return node;
}

function formatList(labels: string[]): string {
  if (labels.length <= 1) return labels[0] ?? '';
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')} and ${labels[labels.length - 1]}`;
}

function statusLabel(need: MatchedNeed): string {
  if (need.testStatus === 'pending') return 'Pending hands-on test';
  return need.lastTestedLabel ? `Tested ${need.lastTestedLabel}` : 'Tested';
}

function fitNote(need: MatchedNeed): string {
  if (need.roleFit && need.skillFit) return 'Tagged as a match for your role and coding comfort.';
  if (!need.roleFit && !need.skillFit) {
    return 'Included because you chose this goal. It is tagged for a different role, and for more coding than you selected.';
  }
  if (!need.roleFit) return 'Included because you chose this goal. It is not tagged as a usual fit for your role.';
  return 'Tagged for more coding comfort than you selected. The tools are still the ones we track for this job.';
}

function hasId(options: { id: string }[], id: string): boolean {
  return options.some((option) => option.id === id);
}

function readAnswers(catalog: FinderCatalog): FinderAnswers | null {
  const params = new URLSearchParams(window.location.search);
  const role = params.get('role');
  const skill = params.get('skill');
  const budget = params.get('budget');
  const goals = (params.get('goals') ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  if (!role || !skill || !budget || goals.length === 0) return null;
  if (!hasId(catalog.roles, role) || !hasId(catalog.skills, skill) || !hasId(catalog.budgets, budget)) return null;
  if (!goals.every((goal) => hasId(catalog.goals, goal))) return null;
  return {
    role,
    skill,
    budget,
    goals: catalog.goals.map((goal) => goal.id).filter((id) => goals.includes(id)),
  };
}

function searchFor(answers: FinderAnswers): string {
  const goals = answers.goals.map((goal) => encodeURIComponent(goal)).join(',');
  return `role=${encodeURIComponent(answers.role)}&skill=${encodeURIComponent(answers.skill)}&goals=${goals}&budget=${encodeURIComponent(answers.budget)}`;
}

function pressedIds(quiz: HTMLElement, stepName: string): string[] {
  const step = quiz.querySelector(`[data-step="${stepName}"]`);
  if (!step) return [];
  return [...step.querySelectorAll<HTMLElement>('[data-choice][aria-pressed="true"]')]
    .map((button) => button.getAttribute('data-choice') ?? '')
    .filter(Boolean);
}

function collectAnswers(catalog: FinderCatalog, quiz: HTMLElement): FinderAnswers | null {
  const role = pressedIds(quiz, 'role')[0];
  const skill = pressedIds(quiz, 'skill')[0];
  const budget = pressedIds(quiz, 'budget')[0];
  const picked = new Set(pressedIds(quiz, 'goals'));
  const goals = catalog.goals.map((goal) => goal.id).filter((id) => picked.has(id));
  if (!role || !skill || !budget || goals.length === 0) return null;
  return { role, skill, budget, goals };
}

function applyAnswers(quiz: HTMLElement, answers: FinderAnswers): void {
  for (const step of quiz.querySelectorAll<HTMLElement>('.quiz-step')) {
    const name = step.dataset.step;
    const selected = new Set(name === 'goals' ? answers.goals : [answers[name as 'role' | 'skill' | 'budget']]);
    for (const button of step.querySelectorAll<HTMLElement>('[data-choice]')) {
      button.setAttribute('aria-pressed', selected.has(button.getAttribute('data-choice') ?? '') ? 'true' : 'false');
    }
    const next = step.querySelector<HTMLButtonElement>('[data-action="next"]');
    if (next) next.disabled = !step.querySelector('[aria-pressed="true"]');
    const count = step.querySelector('[data-goal-count]');
    if (count) {
      const total = step.querySelectorAll('[aria-pressed="true"]').length;
      count.textContent = total === 1 ? '1 selected' : `${total} selected`;
    }
  }
}

function priceBlock(tool: CatalogTool): HTMLElement | null {
  if (!tool.price) return null;
  const block = el('div', { class: 'price' });
  block.append(document.createTextNode(tool.price.summary));
  block.append(document.createElement('br'));
  const source = el('a', { href: tool.price.sourceUrl, rel: 'nofollow noopener', target: '_blank' });
  source.textContent = 'source';
  block.append(source, document.createTextNode(`, pricing checked ${tool.price.checkedLabel}`));
  return block;
}

function renderTool(tool: CatalogTool, bucket: 'in' | 'out' | 'unknown', nameTag: 'h3' | 'h4'): HTMLElement {
  const card = el('article', { class: 'card stack-tool' });
  const meta = el('div', { class: 'meta', style: 'margin-top:0' });
  for (const kind of tool.kinds) meta.append(text('span', kind, { class: 'tag' }));
  if (tool.sponsored) meta.append(text('span', 'Sponsored', { class: 'tag sponsored' }));
  if (bucket === 'out') meta.append(text('span', 'Outside this budget', { class: 'tag' }));
  if (bucket === 'unknown') meta.append(text('span', 'Budget unclear from the price line', { class: 'tag' }));
  card.append(meta);
  card.append(text(nameTag, tool.name, { style: 'margin-top:10px' }));
  if (tool.blurb) card.append(text('p', tool.blurb));
  for (const note of tool.stackNotes) card.append(text('p', `In this stack: ${note}`));
  const price = priceBlock(tool);
  if (price) card.append(price);
  if (tool.guides.length > 0) {
    const guides = el('p', { class: 'stack-guides' });
    guides.append(document.createTextNode('Also on: '));
    tool.guides.forEach((guide, index) => {
      if (index > 0) guides.append(document.createTextNode(' · '));
      const link = el('a', { href: guide.href });
      link.textContent = guide.label;
      guides.append(link);
    });
    card.append(guides);
  }
  if (tool.feed.length > 0) {
    const feed = el('ul', { class: 'stack-feed' });
    for (const item of tool.feed.slice(0, 3)) {
      const li = el('li');
      const link = el('a', { href: item.href });
      link.textContent = item.title;
      li.append(document.createTextNode('From the feed: '), link, document.createTextNode(` (${item.spottedLabel})`));
      feed.append(li);
    }
    card.append(feed);
  }
  if (tool.href && tool.rel) {
    const visit = el('p', { style: 'margin-top:12px' });
    const link = el('a', { class: 'btn ghost', href: tool.href, rel: tool.rel, target: '_blank' });
    link.textContent = `Visit ${tool.name}`;
    visit.append(link);
    card.append(visit);
  }
  return card;
}

function renderBucket(title: string, tools: CatalogTool[], bucket: 'in' | 'out' | 'unknown', nameTag: 'h3' | 'h4'): HTMLElement[] {
  if (tools.length === 0) return [];
  const nodes: HTMLElement[] = [];
  if (title) nodes.push(text('h3', title, { class: 'bucket' }));
  const list = el('div', { class: 'stack-tools' });
  for (const tool of tools) list.append(renderTool(tool, bucket, nameTag));
  nodes.push(list);
  return nodes;
}

function renderNeed(need: MatchedNeed): HTMLElement {
  const section = el('section', { class: 'stack-need' });
  const head = el('div', { class: 'meta' });
  if (need.goalLabels.length > 0) head.append(text('span', need.goalLabels.join(' · '), { class: 'tag' }));
  head.append(text('span', need.category, { class: 'tag' }));
  head.append(text('span', statusLabel(need), { class: `tag ${need.testStatus}` }));
  section.append(head);

  const title = el('h2');
  const titleLink = el('a', { href: need.href });
  titleLink.textContent = need.title;
  title.append(titleLink);
  section.append(title);
  section.append(text('p', need.job, { class: 'lead stack-job' }));
  section.append(text('p', fitNote(need)));

  const buckets = [need.inBudget, need.unknownBudget, need.overBudget].filter((list) => list.length > 0);
  const nameTag = buckets.length > 1 ? 'h4' : 'h3';
  if (need.inBudget.length === 0) {
    section.append(
      text(
        'p',
        'Nothing in this stack has a stored price inside that budget. The tools are still listed below, and the use case page has the full write-up.',
      ),
    );
  }
  section.append(
    ...renderBucket(buckets.length > 1 ? 'In your budget' : '', need.inBudget, 'in', nameTag),
    ...renderBucket(buckets.length > 1 ? 'Price not read as a monthly figure' : '', need.unknownBudget, 'unknown', nameTag),
    ...renderBucket('Outside this budget', need.overBudget, 'out', nameTag),
  );

  const avoid = el('div', { class: 'card pick avoid' });
  avoid.append(text('div', 'Avoid for this job', { class: 'label' }));
  avoid.append(text('h3', need.avoid.name));
  avoid.append(text('p', need.avoid.reason));
  if (need.avoid.sourceUrl) {
    const source = el('p');
    const link = el('a', { href: need.avoid.sourceUrl, rel: 'nofollow noopener', target: '_blank' });
    link.textContent = 'source';
    source.append(link);
    avoid.append(source);
  }
  section.append(avoid);

  if (need.steps.length > 0) {
    section.append(text('h3', 'How the stack fits together'));
    const list = el('ol', { class: 'stack' });
    for (const step of need.steps) {
      const item = el('li');
      const body = el('div');
      const strong = text('strong', `${step.step}: `);
      body.append(strong, document.createTextNode(step.tool));
      body.append(document.createElement('br'));
      body.append(text('span', step.role, { style: 'color:var(--muted)' }));
      item.append(body);
      list.append(item);
    }
    section.append(list);
  }

  const more = el('p', { class: 'back' });
  const moreLink = el('a', { href: need.href });
  moreLink.textContent = 'Read the full use case';
  more.append(moreLink);
  section.append(more);
  return section;
}

function renderResults(catalog: FinderCatalog, answers: FinderAnswers, summary: HTMLElement, results: HTMLElement): void {
  const match = matchStack(catalog, answers);
  summary.replaceChildren();
  results.replaceChildren();

  const chips = el('div', { class: 'meta' });
  for (const label of [match.roleLabel, match.skillLabel, ...match.goalLabels, match.budgetLabel]) {
    chips.append(text('span', label, { class: 'tag' }));
  }
  summary.append(chips);

  const toolCount = match.needs.reduce(
    (total, need) => total + need.inBudget.length + need.unknownBudget.length + need.overBudget.length,
    0,
  );
  const jobs = match.needs.length === 1 ? '1 job' : `${match.needs.length} jobs`;
  const tools = toolCount === 1 ? '1 tool' : `${toolCount} tools`;
  summary.append(
    text(
      'p',
      match.needs.length === 0
        ? 'No tagged job matched those goals.'
        : `${tools} across ${jobs}. Grouped by the job. Inside each job the order is the editorial role: top pick, budget pick, then the other mentions. An affiliate link, if we have one, is labelled Sponsored and does not move a tool.`,
    ),
  );
  const policy = el('p');
  const policyLink = el('a', { href: catalog.links.aboutMoney });
  policyLink.textContent = 'How rankings and affiliate links work';
  policy.append(policyLink);
  summary.append(policy);

  if (match.unmatchedGoals.length > 0) {
    const notice = el('p', { class: 'notice' });
    notice.append(
      document.createTextNode(
        `We don't have a use case tagged for ${formatList(match.unmatchedGoals.map((goal) => goal.label))} yet. `,
      ),
    );
    const browse = el('a', { href: catalog.links.useCases });
    browse.textContent = 'Browse use cases';
    notice.append(browse, document.createTextNode(' for everything currently on the site.'));
    summary.append(notice);
  }

  const actions = el('div', { class: 'cta-row' });
  const copy = el('button', { type: 'button', class: 'btn', id: 'copy-stack-link' });
  copy.textContent = 'Copy results link';
  const change = el('button', { type: 'button', class: 'btn ghost', id: 'change-stack-answers' });
  change.textContent = 'Change answers';
  actions.append(copy, change);
  const share = el('p', { class: 'share-line' });
  share.append(document.createTextNode('Shareable link: '));
  const shareLink = el('a', { href: `?${searchFor(answers)}`, id: 'stack-share-link' });
  shareLink.textContent = `?${searchFor(answers)}`;
  share.append(shareLink);
  summary.append(actions, share);

  for (const need of match.needs) results.append(renderNeed(need));
}

export function mountFinder(catalog: FinderCatalog): void {
  const quiz = document.getElementById('finder-quiz');
  const resultsWrap = document.getElementById('finder-results');
  const summary = document.getElementById('stack-summary');
  const results = document.getElementById('stack-results');
  const progress = document.getElementById('finder-progress');
  if (!quiz || !resultsWrap || !summary || !results || !progress) return;

  const steps = [...quiz.querySelectorAll<HTMLElement>('.quiz-step')];
  let stepIndex = 0;
  let showingResults = false;

  const showStep = (index: number, focus: boolean): void => {
    stepIndex = index;
    steps.forEach((step, i) => {
      step.hidden = i !== index;
    });
    const value = index + 1;
    progress.setAttribute('aria-valuenow', String(value));
    progress.setAttribute('aria-valuemax', String(steps.length));
    progress.setAttribute('aria-valuetext', `Question ${value} of ${steps.length}`);
    const bar = progress.querySelector<HTMLElement>('.progress-bar');
    if (bar) bar.style.width = `${(value / steps.length) * 100}%`;
    const label = progress.querySelector('.progress-label');
    if (label) label.textContent = `Question ${value} of ${steps.length}`;
    if (focus) {
      const heading = steps[index]?.querySelector('h2');
      if (heading instanceof HTMLElement) heading.focus();
    }
  };

  const showQuiz = (index: number): void => {
    showingResults = false;
    resultsWrap.hidden = true;
    quiz.hidden = false;
    progress.hidden = false;
    showStep(index, index > 0);
  };

  const showResults = (answers: FinderAnswers, updateHistory: boolean): void => {
    applyAnswers(quiz, answers);
    renderResults(catalog, answers, summary, results);
    showingResults = true;
    quiz.hidden = true;
    progress.hidden = true;
    resultsWrap.hidden = false;
    const search = `?${searchFor(answers)}`;
    if (updateHistory && window.location.search !== search) {
      window.history.pushState({ finder: 'results' }, '', search);
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resultsWrap.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    const heading = resultsWrap.querySelector('h2');
    if (heading instanceof HTMLElement) heading.focus();
  };

  const go = (delta: number): void => {
    const next = stepIndex + delta;
    if (next < 0) return;
    if (next >= steps.length) {
      const answers = collectAnswers(catalog, quiz);
      if (answers) showResults(answers, true);
      return;
    }
    showStep(next, true);
  };

  quiz.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const choice = target.closest<HTMLButtonElement>('[data-choice]');
    if (choice) {
      const step = choice.closest('.quiz-step');
      if (!step) return;
      if (step.getAttribute('data-mode') === 'multi') {
        const on = choice.getAttribute('aria-pressed') === 'true';
        choice.setAttribute('aria-pressed', on ? 'false' : 'true');
        const any = Boolean(step.querySelector('[aria-pressed="true"]'));
        const next = step.querySelector<HTMLButtonElement>('[data-action="next"]');
        if (next) next.disabled = !any;
        const count = step.querySelector('[data-goal-count]');
        if (count) {
          const total = step.querySelectorAll('[aria-pressed="true"]').length;
          count.textContent = total === 1 ? '1 selected' : `${total} selected`;
        }
        return;
      }
      for (const peer of step.querySelectorAll<HTMLElement>('[data-choice]')) {
        peer.setAttribute('aria-pressed', peer === choice ? 'true' : 'false');
      }
      go(1);
      return;
    }
    const action = target.closest('[data-action]')?.getAttribute('data-action');
    if (action === 'back') go(-1);
    if (action === 'next') go(1);
  });

  resultsWrap.addEventListener('click', async (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (target.closest('#change-stack-answers')) {
      if (window.location.search) window.history.pushState({ finder: 'quiz' }, '', window.location.pathname);
      showQuiz(steps.length - 1);
      return;
    }
    const copy = target.closest('#copy-stack-link');
    if (!(copy instanceof HTMLButtonElement)) return;
    const link = document.getElementById('stack-share-link');
    const href = link instanceof HTMLAnchorElement ? link.href : window.location.href;
    try {
      await navigator.clipboard.writeText(href);
      copy.textContent = 'Link copied';
    } catch {
      copy.textContent = 'Copy the link below';
    }
    window.setTimeout(() => {
      copy.textContent = 'Copy results link';
    }, 2000);
  });

  window.addEventListener('popstate', () => {
    const fromUrl = readAnswers(catalog);
    if (fromUrl) showResults(fromUrl, false);
    else showQuiz(showingResults ? steps.length - 1 : stepIndex);
  });

  const fromUrl = readAnswers(catalog);
  if (fromUrl) showResults(fromUrl, false);
  else showQuiz(0);
}
