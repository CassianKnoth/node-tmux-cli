import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pkg = JSON.parse(
	fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'),
);

const VERSION = pkg.version;

const SCHEMA_URL = `https://unpkg.com/node-tmux-cli@${VERSION}/dist/config/schema/schema.json`;

const baseTemplatePath = path.join(
	__dirname,
	'../src/config/template/node-tmux-config.json',
);

const outputTemplatePath = path.join(
	__dirname,
	'../dist/config/template/node-tmux-config.json',
);

const baseTemplate = fs.readFileSync(baseTemplatePath, 'utf-8');

const template = baseTemplate.replace('__SCHEMA_URL__', SCHEMA_URL);

fs.writeFileSync(outputTemplatePath, template);

console.log('✅ template.json generated with schema URL:', SCHEMA_URL);
