module.exports = {
  roots: ['<rootDir>/src'],
  collectCorvageFrom: ['<rootDir>/src/**/*.ts'],
  corvageDirectory: 'corvage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
