import fs from 'fs-extra';
import path from 'path';
import logger from './logger';

const dataDir = path.join(__dirname, '..', 'data');

fs.ensureDirSync(dataDir);

export async function saveNews(topic: string, news: any) {
  const filePath = path.join(dataDir, `${topic}.json`);
  logger.info(`Saving news data for topic: ${topic} to ${filePath}`);

  let existingData: { [key: string]: any } = {};
  if (fs.existsSync(filePath)) {
    existingData = await fs.readJson(filePath);
    logger.info(`Found existing data for ${topic}, updating...`);
  }

  const timestamp = new Date().toISOString();
  existingData[timestamp] = news;

  await fs.writeJson(filePath, existingData, { spaces: 2 });

  logger.info(`✅ News saved for topic: ${topic}`);
}
