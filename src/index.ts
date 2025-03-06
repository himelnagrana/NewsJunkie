import { scrapeNews } from './scraper';
import { processNews } from './sentiment';
import { saveGroupedNews } from './storage';
import { topics } from './config';
import logger from './logger';

async function runAggregator() {
  try {
    logger.info('📰 Starting news aggregation...');

    for (const topic of topics) {
      logger.info(`🔍 Fetching news for: ${topic}`);

      const scrapedNews = await scrapeNews(topic);
      logger.info(`Scraping completed for topic: ${topic}`);

      const processedNews = processNews(scrapedNews);
      logger.info(`Sentiment analysis completed for topic: ${topic}`);

      await saveGroupedNews(processedNews);
    }

    logger.info('✅ News aggregation completed!');
  } catch (error: any) {
    logger.error(`Error during aggregation: ${error.message}`);
  }
}

runAggregator();
