import {
  matchStack,
  stackHeadline,
  type CatalogTool,
  type FinderAnswers,
  type FinderCatalog,
  type MatchedNeed,
} from '../lib/stackMatch';

const FULL_MS = 2800;
const SHARED_MS = 1000;
const REDUCED_FULL_MS = 400;
const REDUCED_SHARED_MS = 200;
const LOADER_LABELS = ['Matching your role', 'Checking budgets', 'Ranking picks'];

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

function prefersReduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function loadDuration(shared: boolean): number {
  if (prefersReduced()) return shared ? REDUCED_SHARED_MS : REDUCED_FULL_MS;
  return shared ? SHARED_MS : FULL_MS;
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

function clearAnswers(quiz: HTMLElement): void {
  for (const button of quiz.querySelectorAll<HTMLElement>('[data-choice]')) {
    button.setAttribute('aria-pressed', 'false');
  }
  for (const next of quiz.querySelectorAll<HTMLButtonElement>('[data-action="next"]')) {
    next.disabled = true;
  }
  for (const count of quiz.querySelectorAll('[data-goal-count]')) {
    count.textContent = '0 selected';
  }
}

function priceLine(tool: CatalogTool): HTMLElement | null {
  if (!tool.price) return null;
  const line = el('p', { class: 'tool-price' });
  line.append(document.createTextNode(`${tool.price.summary} `));
  const source = el('a', { href: tool.price.sourceUrl, rel: 'nofollow noopener', target: '_blank' });
  source.textContent = 'source';
  line.append(source, document.createTextNode(`, pricing checked ${tool.price.checkedLabel}`));
  return line;
}

function toolCard(tool: CatalogTool, variant: 'top' | 'budget' | 'compact', bucket: 'in' | 'unknown' | 'out'): HTMLElement {
  const card = el('article', { class: `card tool-card ${variant}` });
  const meta = el('div', { class: 'meta' });
  for (const kind of tool.kinds) meta.append(text('span', kind, { class: 'tag' }));
  if (tool.sponsored) meta.append(text('span', 'Sponsored', { class: 'tag sponsored' }));
  if (bucket === 'out') meta.append(text('span', 'Outside this budget', { class: 'tag out' }));
  if (bucket === 'unknown') meta.append(text('span', 'Budget unclear from the price line', { class: 'tag' }));
  card.append(meta);
  card.append(text('h3', tool.name));
  if (tool.blurb && variant !== 'compact') card.append(text('p', tool.blurb));
  if (variant === 'top') {
    for (const note of tool.stackNotes) card.append(text('p', `In this stack: ${note}`));
  }
  const price = priceLine(tool);
  if (price) card.append(price);
  if (tool.guides.length > 0 || tool.feed.length > 0) {
    const links = el('div', { class: 'tool-links' });
    if (tool.guides.length > 0) {
      const guides = el('p');
      guides.append(document.createTextNode('Also on: '));
      tool.guides.forEach((guide, index) => {
        if (index > 0) guides.append(document.createTextNode(' · '));
        const link = el('a', { href: guide.href });
        link.textContent = guide.label;
        guides.append(link);
      });
      links.append(guides);
    }
    if (tool.feed.length > 0) {
      const feed = el('ul');
      for (const item of tool.feed.slice(0, 2)) {
        const li = el('li');
        const link = el('a', { href: item.href });
        link.textContent = item.title;
        li.append(document.createTextNode('From the feed: '), link, document.createTextNode(` (${item.spottedLabel})`));
        feed.append(li);
      }
      links.append(feed);
    }
    card.append(links);
  }
  if (tool.href && tool.rel) {
    const visit = el('p');
    const link = el('a', { class: 'btn ghost', href: tool.href, rel: tool.rel, target: '_blank' });
    link.textContent = `Visit ${tool.name}`;
    visit.append(link);
    card.append(visit);
  }
  return card;
}

function renderNeed(need: MatchedNeed): HTMLElement {
  const section = el('section', { class: 'need-section' });
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
  section.append(text('p', need.job, { class: 'need-job' }));
  section.append(text('p', fitNote(need), { class: 'need-fit' }));

  const top = need.inBudget.find((tool) => tool.kinds.includes('Top pick')) ?? null;
  const budgetPick = need.inBudget.find((tool) => tool !== top && tool.kinds.includes('Budget pick')) ?? null;
  const compactIn = need.inBudget.filter((tool) => tool !== top && tool !== budgetPick);

  if (need.inBudget.length === 0) {
    section.append(
      text(
        'p',
        'Nothing in this job has a stored price inside that budget. Those tools are folded below, and the use case page has the full write-up.',
      ),
    );
  }

  const list = el('div', { class: 'tool-list' });
  if (top) list.append(toolCard(top, 'top', 'in'));
  if (budgetPick) list.append(toolCard(budgetPick, 'budget', 'in'));
  for (const tool of compactIn) list.append(toolCard(tool, 'compact', 'in'));
  for (const tool of need.unknownBudget) list.append(toolCard(tool, 'compact', 'unknown'));
  if (list.childElementCount > 0) section.append(list);

  if (need.overBudget.length > 0) {
    const details = el('details', { class: 'budget-more' });
    if (need.inBudget.length === 0) details.setAttribute('open', '');
    const summary = el('summary');
    summary.textContent = `Outside this budget (${need.overBudget.length})`;
    details.append(summary);
    const overList = el('div', { class: 'tool-list' });
    for (const tool of need.overBudget) overList.append(toolCard(tool, 'compact', 'out'));
    details.append(overList);
    section.append(details);
  }

  const avoid = el('details', { class: 'need-extra' });
  const avoidSummary = el('summary');
  avoidSummary.textContent = 'One to avoid';
  avoid.append(avoidSummary);
  avoid.append(text('h3', need.avoid.name));
  avoid.append(text('p', need.avoid.reason));
  if (need.avoid.sourceUrl) {
    const source = el('p', { class: 'tool-price' });
    const link = el('a', { href: need.avoid.sourceUrl, rel: 'nofollow noopener', target: '_blank' });
    link.textContent = 'source';
    source.append(link);
    avoid.append(source);
  }
  section.append(avoid);

  if (need.steps.length > 0) {
    const steps = el('details', { class: 'need-extra' });
    const stepsSummary = el('summary');
    stepsSummary.textContent = 'How these tools fit together';
    steps.append(stepsSummary);
    const list = el('ol', { class: 'stack' });
    for (const step of need.steps) {
      const item = el('li');
      const body = el('div');
      body.append(text('strong', `${step.step}: `), document.createTextNode(step.tool));
      body.append(document.createElement('br'));
      body.append(text('span', step.role, { style: 'color:var(--muted)' }));
      item.append(body);
      list.append(item);
    }
    steps.append(list);
    section.append(steps);
  }

  const more = el('p', { class: 'back' });
  const moreLink = el('a', { href: need.href });
  moreLink.textContent = 'Read the full use case';
  more.append(moreLink);
  section.append(more);
  return section;
}

function renderResults(
  catalog: FinderCatalog,
  answers: FinderAnswers,
  heading: HTMLElement,
  subtitle: HTMLElement,
  notices: HTMLElement,
  results: HTMLElement,
): void {
  const match = matchStack(catalog, answers);
  heading.textContent = stackHeadline(catalog, answers);
  subtitle.textContent = `${match.skillLabel}. ${formatList(match.goalLabels)}.`;
  notices.replaceChildren();
  results.replaceChildren();

  if (match.needs.length === 0) {
    notices.append(text('p', 'No tagged job matched those goals.'));
  }
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
    notices.append(notice);
  }
  const policy = el('p', { class: 'tool-policy' });
  const policyLink = el('a', { href: catalog.links.aboutMoney });
  policyLink.textContent = 'How rankings and affiliate links work';
  policy.append(policyLink);
  notices.append(policy);

  for (const need of match.needs) results.append(renderNeed(need));
}

export function mountFinder(catalog: FinderCatalog): void {
  const panel = document.getElementById('finder-panel');
  const quiz = document.getElementById('finder-quiz');
  const resultsWrap = document.getElementById('finder-results');
  const loading = document.getElementById('finder-loading');
  const progress = document.getElementById('finder-progress');
  const heading = document.getElementById('results-heading');
  const subtitle = document.getElementById('results-subtitle');
  const notices = document.getElementById('stack-notices');
  const results = document.getElementById('stack-results');
  const loaderStatus = document.getElementById('finder-status');
  const resultsStatus = document.getElementById('results-status');
  if (!panel || !quiz || !resultsWrap || !loading || !progress) return;
  if (!heading || !subtitle || !notices || !results || !loaderStatus || !resultsStatus) return;

  const steps = [...quiz.querySelectorAll<HTMLElement>('.quiz-step')];
  const loaderSteps = [...loading.querySelectorAll<HTMLElement>('[data-loader-step]')];
  let stepIndex = 0;
  let loadToken = 0;
  let copyTimer = 0;

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
      const question = steps[index]?.querySelector('h2');
      if (question instanceof HTMLElement) question.focus();
    }
  };

  const showQuiz = (index: number, focus: boolean): void => {
    document.documentElement.classList.remove('finder-shared');
    loading.hidden = true;
    resultsWrap.hidden = true;
    panel.hidden = false;
    showStep(index, focus);
  };

  const markLoader = (index: number): void => {
    loaderSteps.forEach((step, i) => {
      step.classList.toggle('is-done', i < index);
      step.classList.toggle('is-active', i === index);
    });
    loaderStatus.textContent = `Finding your tools. ${LOADER_LABELS[index] ?? LOADER_LABELS[0]}.`;
  };

  const waitForLoader = (token: number, duration: number): Promise<void> => {
    markLoader(0);
    const slice = duration / LOADER_LABELS.length;
    return new Promise((resolve) => {
      let index = 0;
      const next = (): void => {
        if (token !== loadToken) {
          resolve();
          return;
        }
        index += 1;
        if (index >= LOADER_LABELS.length) {
          resolve();
          return;
        }
        markLoader(index);
        window.setTimeout(next, slice);
      };
      window.setTimeout(next, slice);
    });
  };

  const present = async (answers: FinderAnswers, shared: boolean, updateHistory: boolean): Promise<void> => {
    const token = ++loadToken;
    applyAnswers(quiz, answers);
    panel.hidden = true;
    resultsWrap.hidden = true;
    loading.hidden = false;
    loaderSteps.forEach((step) => {
      step.classList.remove('is-done', 'is-active');
    });
    const search = `?${searchFor(answers)}`;
    if (updateHistory && window.location.search !== search) {
      window.history.pushState({ finder: 'results' }, '', search);
    }
    const loaderHeading = loading.querySelector('h1');
    if (loaderHeading instanceof HTMLElement) loaderHeading.focus();
    await waitForLoader(token, loadDuration(shared));
    if (token !== loadToken) return;
    renderResults(catalog, answers, heading, subtitle, notices, results);
    loading.hidden = true;
    resultsWrap.hidden = false;
    resultsStatus.textContent = `${heading.textContent ?? 'Your tools'}. Your tools are ready.`;
    heading.focus();
    heading.scrollIntoView({ block: 'start', behavior: prefersReduced() ? 'auto' : 'smooth' });
  };

  const go = (delta: number): void => {
    const next = stepIndex + delta;
    if (next < 0) return;
    if (next >= steps.length) {
      const answers = collectAnswers(catalog, quiz);
      if (answers) void present(answers, false, true);
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
    if (target.closest('#retake-quiz')) {
      loadToken += 1;
      clearAnswers(quiz);
      window.history.pushState({ finder: 'quiz' }, '', window.location.pathname);
      showQuiz(0, true);
      return;
    }
    const copy = target.closest('#copy-share-link');
    if (!(copy instanceof HTMLButtonElement)) return;
    const href = window.location.href;
    try {
      await navigator.clipboard.writeText(href);
      copy.textContent = 'Link copied';
    } catch {
      copy.textContent = 'Copy the address from the bar';
    }
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => {
      copy.textContent = 'Copy share link';
    }, 2000);
  });

  window.addEventListener('popstate', () => {
    loadToken += 1;
    const fromUrl = readAnswers(catalog);
    if (fromUrl) {
      void present(fromUrl, true, false);
      return;
    }
    showQuiz(stepIndex, true);
  });

  const fromUrl = readAnswers(catalog);
  if (fromUrl) void present(fromUrl, true, false);
  else showQuiz(0, false);
}
