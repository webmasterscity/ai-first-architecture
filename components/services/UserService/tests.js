// components/services/UserService/tests.js
const UserService = require('./logic');

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  test('should create user with valid data', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      role: 'user'
    };

    const user = await userService.createUser(userData);
    
    expect(user.id).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
  });

  test('should validate email format', () => {
    const invalidData = {
      email: 'invalid-email',
      name: 'Test User'
    };

    expect(userService.validateUserData(invalidData)).toBe(false);
  });
});
