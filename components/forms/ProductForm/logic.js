// components/forms/ProductForm/logic.js
const _ = require('lodash');
const EventBus = require('../../../core/event-bus');

class ProductForm {
  constructor(container, productData = {}, options = {}) {
    this.container = container;
    this.data = this.initializeData(productData);
    this.options = this.mergeOptions(options);
    this.errors = {};
    this.isValid = false;
    
    this.setupEventListeners();
    this.render();
  }

  initializeData(productData) {
    return {
      id: productData.id || null,
      name: productData.name || '',
      price: productData.price || 0,
      category: productData.category || '',
      description: productData.description || '',
      active: productData.active !== undefined ? productData.active : true
    };
  }

  mergeOptions(options) {
    return {
      mode: options.mode || 'create',
      readOnly: options.readOnly || false,
      ...options
    };
  }

  setupEventListeners() {
    EventBus.on('product:reset', () => this.reset());
  }

  validateField(fieldName, value) {
    const errors = [];

    switch (fieldName) {
      case 'name':
        if (!value || value.trim().length === 0) {
          errors.push('Product name is required');
        } else if (value.length < 2) {
          errors.push('Product name must be at least 2 characters');
        }
        break;

      case 'price':
        if (value === undefined || value === null || value === '') {
          errors.push('Price is required');
        } else if (!_.isNumber(value) || value < 0) {
          errors.push('Price must be a positive number');
        }
        break;

      case 'category':
        if (!value || value.trim().length === 0) {
          errors.push('Category is required');
        }
        break;
    }

    return errors;
  }

  validateAll() {
    this.errors = {};
    let hasErrors = false;

    Object.keys(this.data).forEach(fieldName => {
      const fieldErrors = this.validateField(fieldName, this.data[fieldName]);
      if (fieldErrors.length > 0) {
        this.errors[fieldName] = fieldErrors;
        hasErrors = true;
      }
    });

    this.isValid = !hasErrors;
    
    EventBus.emit('product:validate', {
      data: this.data,
      errors: this.errors,
      isValid: this.isValid
    });

    return this.isValid;
  }

  updateField(fieldName, value) {
    this.data[fieldName] = value;
    
    const fieldErrors = this.validateField(fieldName, value);
    if (fieldErrors.length > 0) {
      this.errors[fieldName] = fieldErrors;
    } else {
      delete this.errors[fieldName];
    }

    this.isValid = Object.keys(this.errors).length === 0;

    if (this.options.onChange) {
      this.options.onChange(fieldName, value, this.isValid);
    }
  }

  submit() {
    if (this.validateAll()) {
      const submitData = { ...this.data };
      
      EventBus.emit('product:submit', {
        data: submitData,
        mode: this.options.mode
      });

      if (this.options.onSubmit) {
        this.options.onSubmit(submitData, true);
      }

      return { success: true, data: submitData };
    } else {
      EventBus.emit('product:error', {
        errors: this.errors,
        data: this.data
      });

      return { success: false, errors: this.errors };
    }
  }

  reset() {
    this.data = this.initializeData({});
    this.errors = {};
    this.isValid = false;
    this.render();
  }

  render() {
    if (!this.container) return;
    // Simple render implementation
    this.container.innerHTML = '<div data-testid="product-form">Product Form Placeholder</div>';
  }

  getData() {
    return { ...this.data };
  }

  getErrors() {
    return { ...this.errors };
  }

  destroy() {
    EventBus.off('product:reset');
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

module.exports = ProductForm;
