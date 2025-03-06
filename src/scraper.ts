import axios from 'axios';
import * as cheerio from 'cheerio';
import Fuse from 'fuse.js';
import { sources, topicKeywords } from './config';
import logger from './logger';

interface ScrapedItem {
  headline: string;
  source: string;
  topic: string;
}

const fuseOptions = {
  includeScore: true,
  threshold: 0.6,
  ignoreLocation: true,
  ignoreDiacritics: true,
  findAllMatches: true,
};

// Normalize text by converting to lowercase and removing special characters
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
};

// fuse implementation --- will improve later
function isRelevantToTopic2(headline: string, topic: string): boolean {
  const keywords = topicKeywords[topic.toLowerCase()] || [];

  const fuse = new Fuse(keywords, fuseOptions);
  const result = fuse.search(headline);

  return result.length > 0 && (result[0].score ?? 0) <= fuseOptions.threshold;
}

// manual word matching implementation - not so good, need improvement
function isRelevantToTopic(headline: string, topic: string): boolean {
  const keywords = topicKeywords[topic.toLowerCase()] || [];
  const normalizedHeadline = normalizeText(headline);
  let relevanceScore = 0;

  keywords.forEach((keyword) => {
    const normalizedKeyword = normalizeText(keyword);

    // full match
    if (normalizedHeadline.includes(' ' + normalizedKeyword + ' ')) {
      relevanceScore++;
    }

    // partial word match
    const regex = new RegExp(`\\b${normalizedKeyword}\\b`, 'gi');
    if (regex.test(normalizedHeadline)) {
      relevanceScore++;
    }
  });

  return relevanceScore > 0;
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
