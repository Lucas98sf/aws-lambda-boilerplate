module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		// "plugin:@typescript-eslint/recommended-requiring-type-checking",
		'prettier',
	],
	plugins: ['@typescript-eslint', 'simple-import-sort'],
	parserOptions: {
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	rules: {
		'no-unused-vars': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'no-non-null-assertion': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
				ignoreRestSiblings: true,
			},
		],
	},
	ignorePatterns: ['**/*.js', '__tests__'],
};
