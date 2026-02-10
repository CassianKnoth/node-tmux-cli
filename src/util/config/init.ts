import fs from 'node:fs';
import path from 'node:path';

export const init = (creationPath: string) => {
	fs.copyFileSync(path.join(__dirname, 'templates/config.json'), creationPath);
};
