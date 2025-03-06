import Sentiment from 'sentiment';
import fuzzySearch from 'fuzzy-search'; // Import fuzzy-search for grouping

const sentimentAnalyzer = new Sentiment();

const analyzeSentiment = (headlines: any[]) => {
  return headlines.map((item) => {
    const result = sentimentAnalyzer.analyze(item.headline);
    return {
      ...item,
      sentiment: result.score,
    };
  });
};

const groupSimilarHeadlines = (headlines: any[]): any[] =>{
  const headlinesSet = new Set(headlines.map(item => JSON.stringify(item)));
  const deduplicatedHeadlines = [...headlinesSet].map(item => JSON.parse(item));

  const grouped: any[] = [];
  const searcher = new fuzzySearch(headlines, ['headline']);

  deduplicatedHeadlines.forEach((item) => {
    const matches = searcher.search(item.headline);

    if (matches.length > 1) {
      console.log('found matches');
      const existingGroup = grouped.find((group) =>
        group.headlines.some((headline: string) => matches.includes(headline)),
      );

      if (existingGroup) {
        existingGroup.headlines.push(item.headline);
        existingGroup.sources.push(item.source);
        existingGroup.sentiment += item.sentiment;
      } else {
        grouped.push({
          summary: item.headline,
          headlines: [item.headline],
          sources: [item.source],
          sentiment: item.sentiment,
          topic: item.topic,
        });
      }
    } else {
      console.log('uniq!');
      grouped.push({
        summary: item.headline,
        headlines: [item.headline],
        sources: [item.source],
        sentiment: item.sentiment,
        topic: item.topic,
      });
    }
  });

  return grouped;
};

// Final function to process and save grouped news
export function processNews(headlines: any[]) {
  const sentimentResults = analyzeSentiment(headlines);
  return groupSimilarHeadlines(sentimentResults);
}
