import bluebird from 'bluebird';
import fs from 'fs';
import mustache from 'mustache';
import path from 'path';

const indexPath = path.join(__dirname, '..', 'web', 'dist', '_index.html');
const readFileAsync = bluebird.promisify(fs.readFile);

const DEFAULT = {
  TITLE: 'CMA-TODO',
  DESCRIPTION: 'CMA-TODO',
  URL: 'CMA-TODO',
  IMAGE: 'CMA-TODO',
};

const METATAG_GENERATORS = {
  DEFAULT: () => DEFAULT,
};

export default function serveIndexWithMetatags(app) {
  app.get('*', async (req, res) => {
    const data = await readFileAsync(indexPath);
    res.send(mustache.render(data.toString(), METATAG_GENERATORS.DEFAULT()));
  });
}
