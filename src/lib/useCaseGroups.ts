/** Index groups. The category on each use case is one of these, in this order. */
export const USE_CASE_GROUPS = [
  {
    category: 'Build & code',
    label: 'Build & code',
    intro: 'Ship a web app, or review the pull request before it merges.',
  },
  {
    category: 'Create content',
    label: 'Create content',
    intro: 'Video, audio and the words that go with a post.',
  },
  {
    category: 'Business & admin',
    label: 'Business & admin',
    intro: 'Hand repetitive admin to a workflow.',
  },
  {
    category: 'Marketing',
    label: 'Marketing',
    intro: 'Plan a campaign and get the posts on the calendar.',
  },
  {
    category: 'Study & research',
    label: 'Study & research',
    intro: 'Find sources and summarise them in a way you can check.',
  },
  {
    category: 'Design',
    label: 'Design',
    intro: 'Logos, brand graphics and the images a post needs.',
  },
  {
    category: 'Productivity',
    label: 'Productivity',
    intro: 'Decks, transcripts and the rest of the working week.',
  },
] as const;

export const USE_CASE_CATEGORIES = USE_CASE_GROUPS.map((group) => group.category) as unknown as [
  'Build & code',
  'Create content',
  'Business & admin',
  'Marketing',
  'Study & research',
  'Design',
  'Productivity',
];

export const AUDIENCES = [
  'coders',
  'creators',
  'founders',
  'marketers',
  'designers',
  'small-business',
  'students',
  'researchers',
  'everyday',
] as const;

const AUDIENCE_LABELS: Record<(typeof AUDIENCES)[number], string> = {
  coders: 'coders',
  creators: 'creators',
  founders: 'founders',
  marketers: 'marketers',
  designers: 'designers',
  'small-business': 'small business',
  students: 'students',
  researchers: 'researchers',
  everyday: 'everyday productivity',
};

export function audienceLabel(id: string): string {
  if (id in AUDIENCE_LABELS) return AUDIENCE_LABELS[id as keyof typeof AUDIENCE_LABELS];
  return id.replace('-', ' ');
}
