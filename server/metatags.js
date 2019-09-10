import bluebird from 'bluebird';
import fs from 'fs';
import mustache from 'mustache';
import path from 'path';

const indexPath = path.join(__dirname, '..', 'web', 'public', '_index.html');
const readFileAsync = bluebird.promisify(fs.readFile);

const DEFAULT = {
  TITLE: 'TODO',
  DESCRIPTION: 'TODO',
  URL: 'TODO',
  IMAGE: 'TODO',
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
