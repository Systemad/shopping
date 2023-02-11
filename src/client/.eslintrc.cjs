module.exports = {
  root: true,
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    //"prettier/@typescript-eslint",
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    //"eslint-config-prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { "project": ["./tsconfig.json"] },
  
  //parserOptions: {
    //sourceType: "module",
    //parser: "@typescript-eslint/parser",
  //  project: "./tsconfig.json",
    //tsconfigRootDir: __dirname,
  //},
  plugins: ["@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".cts"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json",
      }
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": "error"
  },
};
