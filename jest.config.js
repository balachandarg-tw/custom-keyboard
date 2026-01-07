module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation)/)"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/hooks/**/*.{js,jsx}", // Adjust this path to where your hook is located
    "!vendor/**"
  ]
};
