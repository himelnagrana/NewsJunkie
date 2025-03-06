# NewsJunkie

A news aggregator with sentiment analysis and web scraping.

## Description

NewsJunkie is a TypeScript-based project that scrapes news articles, performs sentiment analysis, and groups the news based on topics. The project uses various libraries and tools to achieve its functionality, including Puppeteer for web scraping, Sentiment for sentiment analysis, and Winston for logging.

## Installation

To install the dependencies, run:

```bash
yarn install
```

## Scripts

- `test`: Echoes an error message (no tests specified).
- `prettier`: Formats the code using Prettier.
- `lint`: Runs TSLint on the source files.
- `lint:fix`: Fixes linting issues using TSLint.
- `format`: Runs Prettier and fixes linting issues.
- `build`: Compiles the TypeScript code.
- `start`: Runs the compiled code.
- `dev`: Runs the code in development mode using `ts-node-dev`.

## Usage

To start the news aggregator, run:

```bash
yarn start
```

For development mode, use:

```bash
yarn dev
```

## Future Development

- **AI-Based Relevance Mapping**: Replace the manual relevance mapping with AI-based tooling to improve the accuracy and efficiency of news grouping.
- **Cloud Storage**: Store the news aggregates in the cloud for better accessibility and scalability.
- **Archiving**: Implement a feature to archive the aggregated news after a certain period.
- **Machine Learning Model**: Add a machine learning model to train using the aggregated news data for better sentiment analysis and relevance mapping.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Author
Himel Nag Rana \<hnrana@gmail.com\>

## License

This project is licensed under the MIT-Modern-Variant License. See the `LICENSE` file for details.
