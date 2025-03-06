import { scrapeNews } from './scraper';
import { analyzeSentiment } from './sentiment';
import { saveNews } from './storage';
import { topics } from './config';
import logger from './logger';

async function runAggregator() {
	try {
		logger.info('📰 Starting news aggregation...');

		for (const topic of topics) {
			logger.info(`🔍 Fetching news for: ${topic}`);

			const scrapedNews = await scrapeNews();
			logger.info(`Scraping completed for topic: ${topic}`);

			const analyzedNews = analyzeSentiment(scrapedNews.BBC || []);
			logger.info(`Sentiment analysis completed for topic: ${topic}`);

			await saveNews(topic, analyzedNews);
		}

		logger.info('✅ News aggregation completed!');
	} catch (error: any) {
		logger.error(`Error during aggregation: ${error.message}`);
	}
}

runAggregator();
