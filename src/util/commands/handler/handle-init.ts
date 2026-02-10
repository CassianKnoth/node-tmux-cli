import path from 'node:path';
import fs from 'fs';
import { printLineSeparator } from '../../layout/line-separator.js';
import { styleText } from 'node:util';
import { exitOut } from '../../exit.js';
import {
	DEFAULT_CONFIG_FILE_NAME,
	DEFAULT_CONFIG_FILE_PATH,
	DEFAULT_CONFIG_HOME_DIR,
	TEMPLATE_FILE,
} from '../../config/config-paths.js';

export const handleInit = (local?: boolean) => {
	printLineSeparator();

	// check local
	const configFilePath = local
		? path.join(process.cwd(), DEFAULT_CONFIG_FILE_NAME)
		: DEFAULT_CONFIG_FILE_PATH;

	// check if file exists
	console.log(`👀 Looking for config file at ${configFilePath} ...`);
	if (fs.existsSync(configFilePath)) {
		console.log(
			styleText(
				'yellow',
				// double space due to emoji consisting of two characters
				`⚠️  Config file already exists at ${configFilePath}.`,
			),
		);
		exitOut();
	}

	// double space due to emoji consisting of two characters
	console.log(`ℹ️  Found no config file at ${configFilePath}`);
	console.log(`⏳ Initializing config file at ${configFilePath} ...`);

	if (!local) {
		fs.mkdirSync(DEFAULT_CONFIG_HOME_DIR, { recursive: true });
	}

	fs.copyFileSync(TEMPLATE_FILE, configFilePath);
	exitOut();
};
