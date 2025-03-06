import fs from 'fs-extra';
import path from 'path';
import logger from './logger';

const dataDir = path.join(__dirname, '..', 'data');

fs.ensureDirSync(dataDir);

const isDuplicate = (newGroup: any, existingData: any): boolean => {
  for (const timestamp in existingData) {
    for (const group of existingData[timestamp]) {
      if (
          group.summary.includes(newGroup.summary) &&
          Math.abs(group.sentiment - newGroup.sentiment) < 3
        ) {
        return true;
      }
    }
  }
  return false;
};

export async function saveGroupedNews(groupedNews: any[]) {
  // Loop through each topic and save its grouped news to a separate file
  for (const group of groupedNews) {
    const topicFilePath = path.join(dataDir, `${group.topic}_news.json`);

    let existingData: { [key: string]: any } = {};
    if (fs.existsSync(topicFilePath)) {
      existingData = await fs.readJson(topicFilePath);
      logger.info(`Found existing data for topic: ${group.topic}, updating...`);
    }

    const timestamp = new Date().toISOString();

    const uniqueGroupedNews = groupedNews.filter((newGroup) => {
      return !isDuplicate(newGroup, existingData);
    });

    if (uniqueGroupedNews.length > 0) {
      if (!existingData[timestamp]) {
        existingData[timestamp] = [];
      }

      for (const newGroup of uniqueGroupedNews) {
        existingData[timestamp].push(newGroup);
      }

      await fs.writeJson(topicFilePath, existingData, { spaces: 2 });
      logger.info(`Grouped news saved successfully for topic: ${group.topic}`);
    } else {
      logger.info(`No new unique news to save for topic: ${group.topic}`);
    }
  }
}
