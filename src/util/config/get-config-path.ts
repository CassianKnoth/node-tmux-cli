import path from 'node:path';
import { argv } from 'node:process';
import { fileURLToPath } from 'url';
import { printLineSeparator } from '../layout/line-separator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DEFAULT_CONFIG_PATH = path.join(
	__dirname,
	'../../schema/node-tmux-config.json',
);

export const getConfigPath = (): string => {
	printLineSeparator();
	console.log('⏳ Getting config file path...');

	const args = argv.slice(2);

	for (let i = 0; i < args.length; i++) {
		if (args[i] === '-c' || args[i] === '--config') {
			const value = args[i + 1];
			if (!value) {
				throw new Error('Missing value for --config');
			}
			return path.resolve(value);
		}
	}

	return path.resolve(DEFAULT_CONFIG_PATH);
};
