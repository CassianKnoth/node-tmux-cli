import { styleText } from 'node:util';
import { CliArgs } from '../../../types/commands.js';

export const parseConfig = (input: string | undefined): CliArgs => {
	if (!input) {
		console.log(styleText('red', `❌ Missing config file path`));
		console.log(
			styleText(
				'cyan',
				`➡️ Please provide a path to a config file or run node-tmux without any flags to use the default config file instead`,
			),
		);
		return { command: 'help' };
	}

	return { command: 'run', configPath: input };
};
