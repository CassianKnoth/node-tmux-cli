export const initializers = ['init', '-c', '--config', '-h', '--help'] as const;
export type Initializer = (typeof initializers)[number];

export const isInitializer = (value: string): value is Initializer => {
	return (initializers as readonly string[]).includes(value);
};
