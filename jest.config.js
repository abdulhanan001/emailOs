
export default {
  testRegex: "((\\.|/*.)(test))\\.js?$",
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};


