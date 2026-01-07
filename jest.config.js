module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation)/)"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/hooks/**/*.{js,jsx}",
    "src/screens/**/*.{js,jsx}",
    "src/components/**/*.{js,jsx}",
    "src/helper/**/*.{js,jsx}",
    "!vendor/**"
  ]
};
