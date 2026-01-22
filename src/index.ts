#!/usr/bin/env node

import { styleText } from 'node:util';
import { configuredSessions } from './config.js';
import { listConfigurations } from './util/list-configuration.js';
// import { getUserChoice } from './util/user-input/get-user-choice.js';
import { handleUserChoice } from './util/user-input/handle-user-input.js';

console.log('🚀 tmux action');

// exit without configurations
const configuredSessionNames = Object.keys(configuredSessions);
if (configuredSessionNames.length < 1) {
	console.log(styleText('red', '❌ found no configured sessions'));
	console.log('➡️ please provide at least 1 configuration in config.ts');
	console.log('👋 exiting...');
	process.exit(0);
	// EXiT
}

const sessionName = process.argv[2];

if (!sessionName) {
	console.log(styleText('yellow', '⚠️  please provide a session name'));
	listConfigurations(configuredSessionNames);

	handleUserChoice({ other: true });

	// const userInput = await getUserChoice();

	// // TODO: replace exit with further handling
	// if (!userInput) {
	// 	process.exit(0);
	// }
	// // TODO: replace exit with further handling
	// console.log(`User input: ${userInput}`);
	process.exit(0);
}

console.log(`🔍 looking for session "${sessionName}"`);

if (!configuredSessions[sessionName]) {
	console.log(styleText('yellow', '⚠️  please provide a valid session name'));
	listConfigurations(configuredSessionNames);

	// TODO: replace exit with user dialog
	process.exit(0);
}

// import { execSync } from 'node:child_process';

// const hasSession = (sessionName: string): boolean => {
// 	try {
// 		execSync(`tmux has-session -t ${sessionName}`, { stdio: 'ignore' });
// 		return true;
// 	} catch {
// 		return false;
// 	}
// };

// const checkForSession = (sessionName: string) => {
// 	console.log(`looking for session "${sessionName}"`);

// 	if (hasSession(sessionName)) {
// 		console.log(`session "${sessionName}" exists`);
// 	} else {
// 		console.log(`no session "${sessionName}" exists`);
// 	}
// };

// checkForSession('mysession');

// TODO

// 1. check user input > argument given?
//      - no argument
//          > ✅ inform user about configured session names which can be used as argument
//          > *CHOiCE-LOOP* [other, exit]
//              - other
//                  > ask for session name
//                  > *CONTiNUE* >>> 1.
//              - exit
//                  > ***EXiT NODE***
//      - invalid argument
//          > inform user about configured session names which can be used as argument
//          > *CHOiCE-LOOP* [other, exit]
//              - other
//                  > ask for session name
//                  > *CONTiNUE* >>> 1.
//              - exit
//                  > ***EXiT NODE***
//      - valid argument
//          > *CONTiNUE* >>> 2.
// 2. check if given session already exists
//      - exists
//          > check if it is attached or detached
//              - is detached
//                  > inform user that session exist in detached state
//                  > *CHOiCE-LOOP* [attach, destroy, restart, other, exit]
//                      - attach
//                          > *ATTACH* session
//                          > ***EXiT NODE***
//                      - destroy
//                          > *DESTROY* session
//                          > *CHOiCE-LOOP* [other, exit]
//                      - restart
//                          > *DESTROY session*
//                          > *CONTiNUE* >>> start 3.
//                      - other
//                          > ask for session name
//                          > *CONTiNUE* >>> 1.
//                      - exit
//                          > ***EXiT NODE***
//              - is attached
//                  > inform user that session is already attached somewhere
//                  > *CHOiCE-LOOP* [destroy, restart, other, exit]
//                      - destroy
//                          > *DESTROY* session*
//                          > *CHOiCE-LOOP* [other, exit]
//                              - other
//                                  > ask for session name
//                                  > *CONTiNUE* >>> 1.
//                              - exit
//                                  > ***EXiT NODE***
//                      - restart
//                          > *DESTROY* session
//                          > *CONTiNUE* >>> start 3.
//                      - other
//                          > ask for session name
//                          > *CONTiNUE* >>> 1.
//                      - exit
//                          > ***EXiT NODE***
//      - does not exist
//          > *CONTiNUE* >>> start 3.
// 3. create session
//      - find session configuration
//      - create session with session name
//      - iterate over windows
//          > create window with session-name + window-name at given path
//              - if ERROR
//                  > CATCH
//                  > notify user to check config for session name
//                  > pass ERROR
//                  > ***EXiT NODE***
//              - are panes configured?
//                  > not configured
//                  > configured
// 4. inform user that session 'session name' has been successfully created
//      - *CHOiCE-LOOP* [attach, destroy, restart, other, exit]
//          - attach
//              > *ATTACH* session
//              > ***EXiT NODE***
//          - destroy
//              > *DESTROY* session
//              > *CHOiCE-LOOP* [other, exit]
//                  - other
//                      > ask for session name
//                      > *CONTiNUE* >>> 1.
//                  - exit
//                      > ***EXiT NODE***
//          - restart
//              > *DESTROY session*
//              > *CONTiNUE* >>> start 3.
//          - other
//              > ask for session name
//              > *CONTiNUE* >>> 1.
//          - exit
//              > ***EXiT NODE***

// choices/actions: attach, destroy, restart, other, exit
// start sessions always detached --> then ask to attach

// bonus: when listing configurations also list the status (with color if possible?)
// - mySession
// - myOtherSession (detached)
// - myDifferentSession (attached)
