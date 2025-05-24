// components/forms/ProductForm/tests.js
const ProductForm = require('./logic');

describe('ProductForm - Unit Tests', () => {
  let container;
  let productForm;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (productForm) {
      productForm.destroy();
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  test('should initialize with empty data by default', () => {
    productForm = new ProductForm(container);
    
    const data = productForm.getData();
    expect(data.name).toBe('');
    expect(data.price).toBe(0);
    expect(data.active).toBe(true);
  });

  test('should validate required fields', () => {
    productForm = new ProductForm(container);
    
    const errors = productForm.validateField('name', '');
    expect(errors).toContain('Product name is required');
  });

  test('should submit valid form', () => {
    productForm = new ProductForm(container);
    
    productForm.data = {
      name: 'Valid Product',
      price: 99.99,
      category: 'electronics',
      active: true
    };

    const result = productForm.submit();
    expect(result.success).toBe(true);
  });
});
