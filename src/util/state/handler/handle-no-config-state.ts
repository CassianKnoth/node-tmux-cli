import { styleText } from 'node:util';
import { Context } from '../../../types/state.js';
import { choices } from '../../user-input/user-choice/choices.js';
import { getUserInput } from '../../user-input/get-user-input.js';
import { hasTmuxSession } from '../../tmux/has-session.js';
import { isTmuxAttached } from '../../tmux/is-attached.js';
import { tmuxStartSession } from '../../tmux/start/start-session.js';
import { handleWithConfirmation } from '../../user-input/user-choice/handle-choice-with-confirmation.js';
import { configuredSessions } from '../../../index.js';
import { userConfirmation } from '../../user-input/user-confirmation.js';

export const handleNoConfigState = async (
	currentContext: Context,
): Promise<Context> => {
	// get user input
	const userInput = await getUserInput(
		'🔑 Session-configuration key or [e]xit: ',
	);

	// handle exit
	if (choices.exit.regex.test(userInput)) {
		const newContext = await handleWithConfirmation(
			choices.exit,
			currentContext,
		);

		return newContext;
	}

	// handle other input
	console.log(`👀 Looking for session "${userInput}"...`);
	const configuration = configuredSessions[userInput];

	// - invalid input
	if (!configuration) {
		console.log(
			styleText('red', `❌ "${userInput}" is not a valid configuration`),
		);
		console.log(
			styleText(
				'cyan',
				// double space due to emoji consisting of two characters
				`➡️  Check for typos, create it and then try again, or choose another`,
			),
		);
		return { ...currentContext, sessionState: 'NO_CONFIG' };
	}

	const sessionName = userInput;
	console.log(
		// double space due to emoji consisting of two characters
		styleText('green', `⚙️  Found configuration for "${sessionName}"`),
	);

	console.log(`🔍 Checking status of "${sessionName}"...`);
	const hasSession = hasTmuxSession(sessionName);

	// - attached / detached
	if (hasSession) {
		console.log(
			styleText('yellow', `🏃 Session "${sessionName}" is already running`),
		);

		const isAttached = isTmuxAttached(sessionName);

		if (isAttached) {
			return { sessionState: 'ATTACHED_SESSION', sessionName: sessionName };
		} else {
			return { sessionState: 'DETACHED_SESSION', sessionName: sessionName };
		}
	}

	// - start
	console.log(`Status: Session "${sessionName}" is inactive`);
	const confirmed = await userConfirmation(`Start session "${sessionName}?"`);
	if (confirmed) {
		tmuxStartSession(sessionName);
		return { sessionState: 'DETACHED_SESSION', sessionName: sessionName };
	}

	return currentContext;
};
