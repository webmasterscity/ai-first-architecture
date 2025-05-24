// components/services/UserService/logic.js
const EventBus = require('../../../core/event-bus');

class UserService {
  constructor() {
    this.users = new Map();
  }

  async createUser(userData) {
    try {
      if (!this.validateUserData(userData)) {
        throw new Error('Invalid user data');
      }

      const id = Date.now().toString();
      const user = { id, ...userData, createdAt: new Date().toISOString() };
      
      this.users.set(id, user);
      
      EventBus.emit('user:created', user);
      return user;
    } catch (error) {
      EventBus.emit('user:error', { operation: 'create', error: error.message });
      throw error;
    }
  }

  async getUser(id) {
    return this.users.get(id) || null;
  }

  validateUserData(userData) {
    if (!userData.email || !userData.email.includes('@')) {
      return false;
    }
    if (!userData.name || userData.name.trim().length < 2) {
      return false;
    }
    return true;
  }
}

module.exports = UserService;
