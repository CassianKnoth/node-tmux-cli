#!/usr/bin/env node

import { styleText } from 'node:util';
import { Context } from './types/state.js';
import { renderState } from './util/state/render-state.js';
import { exitOut } from './util/exit.js';
import { printLineSeparator } from './util/layout/line-separator.js';
import { transition } from './util/state/transition.js';
import { getConfig } from './util/config/get-config.js';
import { parseCLiArgs } from './util/commands/parser/parse-cli-args.js';
import { handleInit } from './util/commands/handler/handle-init.js';
import { DEFAULT_CONFIG_FILE_PATH } from './util/config/config-paths.js';

printLineSeparator();
console.log('🚀 tmux ACTiON!');

const parsedArgs = parseCLiArgs();

console.log(`parsedArgs: `, parsedArgs);

// handle everything else than 'run'
switch (parsedArgs.command) {
	case 'init':
		handleInit(parsedArgs.local);
		break;
	case 'help':
		console.log('HELP');
		exitOut();
		break;
}

// no argument --> START look for default config
// -c/--config --> START look for custom config
// init --> create default config if not exists
// init -l/--local --> copy config template to current path
// -h/--help --> list instructions

printLineSeparator();
console.log('⏳ Getting config file path...');
const configFilePath = parsedArgs.configPath ?? DEFAULT_CONFIG_FILE_PATH;
const config = getConfig(configFilePath);

// exit without configurations
const configuredSessionNames = Object.keys(config.sessions);
if (configuredSessionNames.length < 1) {
	console.log(styleText('red', '❌ Found no configured sessions'));
	console.log(
		styleText(
			'cyan',
			'➡️ Please provide at least 1 configuration in config.ts',
		),
	);
	exitOut();
	// EXiT
}

export const { shell: confiuredShell, sessions: configuredSessions } = config;

let context: Context = {
	sessionState: 'NO_CONFIG',
	sessionName: '',
};

while (true) {
	if (context.sessionState === 'EXIT') {
		exitOut();
	}

	// render state
	renderState(context);

	// handle state transition
	const newContext = await transition(context);

	// set new state
	context = newContext;
}
