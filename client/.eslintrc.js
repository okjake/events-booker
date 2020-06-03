module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  // babel-eslint parser is used to support experimental features not supported in ESLint itself yet
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      impliedStrict: true //enable global strict mode (if ecmaVersion is 5 or greater)
    }
  },
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    'react/state-in-constructor': 0, // no constructor
    'arrow-body-style': ['error', 'as-needed'], // for arrow function

    //  allow .js extensions for JSX.
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true, // allows strings to use single-quotes or double-quotes so long as the string contains a quote that would have to be escaped otherwise
        allowTemplateLiterals: true // allows strings to use backticks
      }
    ],
    'react/prop-types': [
      0
    ], //no propTypes
    'no-nested-ternary': [0, {allowParensWrapped: true}], // nested ternary
    // configure the prettier plugin
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true
      }
    ],
    "camelcase": [0], //no-camelCase
    "react/prop-types": [
      0
    ], //no propTypes
    'no-nested-ternary': [0, {allowParensWrapped: true}], // nested ternary
    "react/jsx-props-no-spreading": 0, 
  },
  plugins: ['react', 'prettier'],

  "camelcase": [0], //no-camelCase
    "react/prop-types": [
      0
    ], //no propTypes
    'no-nested-ternary': [0, {allowParensWrapped: true}], // nested ternary

    "react/jsx-props-no-spreading": 0,

};
