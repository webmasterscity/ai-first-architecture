// tests/jest.setup.js
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock EventBus for tests
jest.mock('../core/event-bus', () => ({
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
  removeAllListeners: jest.fn()
}));

// Setup JSDOM environment
require('jsdom-global')();
