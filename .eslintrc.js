 module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": ["airbnb-base", "prettier"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "no-unused-vars": "off",
    "arrow-body-style": ["error", "as-needed"],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true
      }
    ]
  },
  "plugins": ["prettier"]
}
