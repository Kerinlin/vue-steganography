module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'eslint-config-prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser',
  },

  // eslint-plugin-vue
  plugins: ['vue', 'prettier'],
  rules: {
    semi: ['warn', 'always'],
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 0,
    'no-unused-vars': 1,
    'no-constant-condition': 1,
  },
};
