import Sentiment from 'sentiment';
import logger from './logger';

const sentimentAnalyzer = new Sentiment();

export function analyzeSentiment(headlines: any[]) {
  logger.info(`Analyzing sentiment for ${headlines.length} headlines...`);

  const analyzed = headlines.map((item) => {
    const result = sentimentAnalyzer.analyze(item.headline);
    logger.debug(
      `Sentiment score for headline: "${item.headline}" is ${result.score}`,
    );

    return {
      ...item,
      sentiment: result.score,
    };
  });

  return analyzed;
}
