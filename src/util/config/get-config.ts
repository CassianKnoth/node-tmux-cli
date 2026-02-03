import fs from 'fs';
import schema from '../../config/schema/schema.json' with { type: 'json' };

import type { Ajv as AjvClass } from 'ajv';
import { createRequire } from 'node:module';
import { NodeTmuxConfig } from '../../types/config-types.js';
import { printLineSeparator } from '../layout/line-separator.js';
import { styleText } from 'node:util';

const require = createRequire(import.meta.url);
const Ajv: typeof AjvClass = require('ajv');

export const ajv = new Ajv({ allErrors: true });

const validate = ajv.compile(schema);

export const getConfig = (configFilePath: string): NodeTmuxConfig => {
	printLineSeparator();
	console.log(`👀 Looking for config file at ${configFilePath} ...`);

	if (!fs.existsSync(configFilePath)) {
		console.log(
			styleText('red', `❌ Config file not found: ${configFilePath}`),
		);
		console.log(
			styleText(
				'cyan',
				// double space due to emoji consisting of two characters
				'➡️  Run `node-tmux init` to create one, or use -c or --config flag to specify a path',
			),
		);
		process.exit(1);
	}

	const raw = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

	if (!validate(raw)) {
		console.error('Invalid node-tmux config:');
		for (const err of validate.errors ?? []) {
			console.error(`- ${err.instancePath} ${err.message}`);
		}
		process.exit(1);
	}

	console.log(
		// double space due to emoji consisting of two characters
		styleText('green', `⚙️  Found valid config file at ${configFilePath}`),
	);

	return raw as NodeTmuxConfig;
};
