// scripts/generate-component.js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

async function generateComponent(componentName, category = 'forms') {
  console.log(chalk.blue(`🧩 Generating component: ${componentName}`));

  const componentPath = path.join('components', category, componentName);
  
  try {
    if (!fs.existsSync(componentPath)) {
      fs.mkdirSync(componentPath, { recursive: true });
    }

    const componentJson = {
      name: componentName,
      version: '1.0.0',
      category: category,
      purpose: `Handle ${componentName} functionality`,
      lastModified: new Date().toISOString(),
      status: 'development'
    };

    fs.writeFileSync(path.join(componentPath, 'component.json'), JSON.stringify(componentJson, null, 2));

    const interfaceJson = {
      inputs: {},
      outputs: {},
      events: { emits: [], listens: [] }
    };

    fs.writeFileSync(path.join(componentPath, 'interface.json'), JSON.stringify(interfaceJson, null, 2));

    const logicJs = `// components/${category}/${componentName}/logic.js
class ${componentName} {
  constructor() {
    // Initialize component
  }

  destroy() {
    // Cleanup
  }
}

module.exports = ${componentName};
`;

    fs.writeFileSync(path.join(componentPath, 'logic.js'), logicJs);

    const testsJs = `// components/${category}/${componentName}/tests.js
const ${componentName} = require('./logic');

describe('${componentName}', () => {
  test('should initialize correctly', () => {
    const component = new ${componentName}();
    expect(component).toBeDefined();
  });
});
`;

    fs.writeFileSync(path.join(componentPath, 'tests.js'), testsJs);

    console.log(chalk.green(`✅ Component ${componentName} created successfully!`));
    console.log(chalk.blue(`📁 Location: ${componentPath}`));

  } catch (error) {
    console.error(chalk.red('❌ Component generation failed:'), error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  const componentName = process.argv[2];
  const category = process.argv[3] || 'forms';

  if (!componentName) {
    console.error(chalk.red('Usage: node generate-component.js <ComponentName> [category]'));
    process.exit(1);
  }

  generateComponent(componentName, category);
}

module.exports = { generateComponent };
