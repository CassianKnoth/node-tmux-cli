import { styleText } from 'node:util';
import { CliArgs } from '../../../types/commands.js';

export const parseInit = (input: string | undefined): CliArgs => {
	if (!input) {
		return { command: 'init' };
	}

	const isLocal = ['-l', '--local'].includes(input);

	if (isLocal) {
		return { command: 'init', local: true };
	}

	console.log(styleText('red', `❌ Unknown argument: ${input}`));
	return { command: 'help' };
};
