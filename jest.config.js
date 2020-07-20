module.exports = {
  roots: ['<rootDir>/src'],
  collectCorvageFrom: ['<rootDir>/src/**/*.ts'],
  corvageDirectory: 'corvage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
