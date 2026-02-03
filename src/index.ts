#!/usr/bin/env node

import { styleText } from 'node:util';
import { Context } from './types/state.js';
import { renderState } from './util/state/render-state.js';
import { exitOut } from './util/exit.js';
import { printLineSeparator } from './util/layout/line-separator.js';
import { transition } from './util/state/transition.js';
import { getConfigPath } from './util/config/get-config-path.js';
import { getConfig } from './util/config/get-config.js';

printLineSeparator();
console.log('🚀 tmux ACTiON!');

const configFilePath = getConfigPath();
const config = getConfig(configFilePath);

// exit without configurations
const configuredSessionNames = Object.keys(config.sessions);
if (configuredSessionNames.length < 1) {
	console.log(styleText('red', '❌ Found no configured sessions'));
	console.log('➡️ Please provide at least 1 configuration in config.ts');
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
