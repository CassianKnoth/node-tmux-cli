import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export const getUserChoice = async (): Promise<string> => {
	const rl = readline.createInterface({ input, output });

	const answer = await rl.question('👉 The choice is yours: [o]ther: ');

	rl.close();

	return answer;
};
