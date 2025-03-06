import axios from 'axios';
import * as cheerio from 'cheerio';
import Fuse from 'fuse.js';
import { sources, topicKeywords } from './config';
import logger from './logger';

interface ScrapedItem {
  headline: string;
  source: string;
  topic: string; // Add a topic field to each scraped item
}

const fuseOptions = {
  threshold: 0.3,
  keys: ['headline'],
};

function isRelevantToTopic(headline: string, topic: string): boolean {
  const keywords = topicKeywords[topic.toLowerCase()] || [];
  const fuse = new Fuse(keywords, fuseOptions);
  // return keywords.some(keyword => headline.toLowerCase().includes(keyword)); // without fuse.js - manual implementation
  const result = fuse.search(headline);
  return result.length > 0;
}

export async function scrapeNews(topic: string) {
  const results: ScrapedItem[] = [];

  for (const source of sources) {
    try {
      logger.info(`Starting to scrape news from ${source.name}`);
      const { data } = await axios.get(source.url);
      const $ = cheerio.load(data);

      $(source.headlineSelector).each((_, element) => {
        const headline = $(element).text().trim();

        if (isRelevantToTopic(headline, topic)) {
          results.push({
            headline,
            source: source.name,
            topic: topic,
          });
        }
      });

      logger.info(
        `Scraped ${results.length} headlines for topic: ${topic} from ${source.name}`,
      );
    } catch (error: any) {
      logger.error(
        `Failed to fetch news from ${source.name} on topic ${topic}: : ${error.message}`,
      );
    }
  }

  return results;
}
