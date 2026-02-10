export type Command = 'run' | 'init' | 'help';

export type CliArgs = {
	command: Command;
	configPath?: string;
	local?: boolean;
};
