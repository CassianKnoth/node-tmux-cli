import { styleText } from 'node:util';
import { Context } from '../../types/state.js';
import { listConfigurations } from '../config/list-configuration.js';
import { printLineSeparator } from '../layout/line-separator.js';

export const renderState = async ({ sessionState, sessionName }: Context) => {
	printLineSeparator();

	switch (sessionState) {
		case 'NO_CONFIG':
			console.log(
				styleText(
					'yellow',
					// double space due to emoji consisting of two characters
					'⚠️  Please provide a valid session-configuration key to start or interact with a session',
				),
			);
			break;
		case 'DETACHED_SESSION':
			console.log(
				// double space due to emoji consisting of two characters
				styleText('yellow', `⚠️  Session "${sessionName}" is running detached`),
			);
			break;
		case 'ATTACHED_SESSION':
			console.log(
				// double space due to emoji consisting of two characters
				styleText('yellow', `⚠️  Session "${sessionName}" is running attached`),
			);
			break;
	}
	listConfigurations();
};
