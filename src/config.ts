export const topics = ['ai', 'politics', 'technology', 'sports', 'finance'];

export const topicKeywords: Record<string, string[]> = {
  politics: [
    'election',
    'government',
    'political',
    'policy',
    'president',
    'congress',
    'usa',
    'russia',
    'china',
    'ukraine',
    'india',
    'war',
    'trump',
    'biden',
    'putin',
  ],
  technology: [
    'AI',
    'artificial intelligence',
    'tech',
    'gadgets',
    'innovation',
    'software',
  ],
  sports: [
    'football',
    'soccer',
    'basketball',
    'athletes',
    'tournament',
    'championship',
  ],
  finance: ['stock', 'market', 'finance', 'economy', 'banking', 'investment'],
};

export const sources = [
  {
    name: 'BBC',
    url: 'https://www.bbc.com/news',
    headlineSelector: 'h2[data-testid="card-headline"]',
    subheadlineSelector: 'p[data-testid="card-description"]',
  },
  {
    name: 'CNN',
    url: 'https://edition.cnn.com',
    headlineSelector: '.container__title_url-text',
    subheadlineSelector: '.container__title_url-sub-text',
  },
  {
    name: 'Al Jazeera',
    url: 'https://www.aljazeera.com',
    headlineSelector: 'h3.article-card__title',
    subheadlineSelector: 'h3.gc__title',
  },
];
