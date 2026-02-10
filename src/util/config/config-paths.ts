import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DEFAULT_CONFIG_HOME_DIR = path.join(os.homedir(), '.node-tmux');
export const DEFAULT_CONFIG_FILE_NAME = 'node-tmux-config.json';
export const DEFAULT_CONFIG_FILE_PATH = path.join(
	DEFAULT_CONFIG_HOME_DIR,
	DEFAULT_CONFIG_FILE_NAME,
);
export const TEMPLATE_FILE = path.join(
	__dirname,
	'../../config/template/',
	DEFAULT_CONFIG_FILE_NAME,
);
