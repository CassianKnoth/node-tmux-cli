import { argv } from 'node:process';
import { CliArgs } from '../../../types/commands.js';
import { isInitializer } from './is-initializer.js';
import { parseInit } from './parse-init.js';
import { parseConfig } from './parse-config.js';
import { styleText } from 'node:util';

export const parseCLiArgs = (): CliArgs => {
	const rawArgs = argv.slice(2);

	const firstArg = rawArgs[0];

	// ready to run immedeately
	if (!firstArg) {
		return { command: 'run' };
	}

	// catch unknown args
	if (!isInitializer(firstArg)) {
		console.log(styleText('red', `❌ Command not found: ${firstArg}`));
		return { command: 'help' };
	}
	// or with run with (presumably) path argument
	// if (!isInitializer(firstArg)) {
	// 	return { command: 'run', configPath: firstArg };
	// }

	switch (firstArg) {
		case 'init':
			return parseInit(rawArgs[1]);
		case '-c':
		case '--config':
			return parseConfig(rawArgs[1]);
		default:
			// help is the only option left
			return { command: 'help' };
	}
};
