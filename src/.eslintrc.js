module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": [0],
    "no-empty": ["error", { allowEmptyCatch: true }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
};
