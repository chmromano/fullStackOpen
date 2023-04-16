module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["sort-keys-fix"],
  rules: {
    "arrow-spacing": ["error", { after: true, before: true }],
    curly: "error",
    eqeqeq: "error",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    "no-console": 0,
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "prefer-template": 2,
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "sort-imports": "error",
    "sort-keys": [
      "error",
      "asc",
      { caseSensitive: true, minKeys: 2, natural: false },
    ],
    "sort-keys-fix/sort-keys-fix": "warn",
  },
};
