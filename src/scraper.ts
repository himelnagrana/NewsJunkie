import axios from 'axios';
import * as cheerio from 'cheerio';
import { sources } from './config';
import logger from './logger';

export async function scrapeNews() {
	const results: Record<string, any[]> = {};

	for (const source of sources) {
		try {
			logger.info(`Starting to scrape news from ${source.name}`);
			const { data } = await axios.get(source.url);
			console.log(data);
			const $ = cheerio.load(data);

			const headlines: any[] = [];

			$(source.headlineSelector).each((_, element) => {
				headlines.push({
					headline: $(element).text().trim(),
					source: source.name,
				});
			});

			results[source.name] = headlines;
			logger.info(`Scraped ${headlines.length} headlines from ${source.name}`);
		} catch (error: any) {
			logger.error(
				`Failed to fetch news from ${source.name}: ${error.message}`,
			);
		}
	}

	return results;
}
