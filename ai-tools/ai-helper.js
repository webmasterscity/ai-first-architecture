// ai-tools/ai-helper.js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class AIHelper {
  constructor() {
    this.projectRoot = process.cwd();
    this.metadataPath = path.join(this.projectRoot, 'metadata');
  }

  async getComponentInfo(componentName) {
    try {
      const componentPath = await this.findComponent(componentName);
      if (!componentPath) {
        return { error: `Component ${componentName} not found` };
      }

      const componentJson = await this.loadFile(path.join(componentPath, 'component.json'));
      const interfaceJson = await this.loadFile(path.join(componentPath, 'interface.json'));
      
      return {
        component: componentJson,
        interface: interfaceJson,
        path: componentPath
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  async analyzeChangeImpact(componentName, proposedChanges) {
    console.log(chalk.blue(`🔍 Analyzing impact for ${componentName}...`));

    const componentInfo = await this.getComponentInfo(componentName);
    if (componentInfo.error) {
      return componentInfo;
    }

    const analysis = {
      component: componentName,
      riskLevel: 'low',
      recommendations: []
    };

    if (proposedChanges.interface) {
      analysis.riskLevel = 'high';
      analysis.recommendations.push('Interface changes require updating all dependent components');
    }

    console.log(chalk.green(`✅ Analysis complete. Risk level: ${analysis.riskLevel}`));
    return analysis;
  }

  async findComponent(componentName) {
    const componentsDir = path.join(this.projectRoot, 'components');
    const searchPaths = [
      path.join(componentsDir, 'forms', componentName),
      path.join(componentsDir, 'services', componentName),
      path.join(componentsDir, 'workflows', componentName)
    ];

    for (const searchPath of searchPaths) {
      if (fs.existsSync(searchPath)) {
        return searchPath;
      }
    }

    return null;
  }

  async loadFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        return filePath.endsWith('.json') ? JSON.parse(content) : content;
      }
      return null;
    } catch (error) {
      console.warn(chalk.yellow(`Warning: Could not load ${filePath}: ${error.message}`));
      return null;
    }
  }
}

if (require.main === module) {
  const helper = new AIHelper();
  const command = process.argv[2];
  const componentName = process.argv[3];

  switch (command) {
    case 'analyze':
      if (!componentName) {
        console.error(chalk.red('Usage: node ai-helper.js analyze <componentName>'));
        process.exit(1);
      }
      helper.analyzeChangeImpact(componentName, { logic: true })
        .then(result => console.log(JSON.stringify(result, null, 2)));
      break;
      
    case 'help':
      console.log(chalk.blue(`
AI Helper Tool - Commands:

  analyze <component>    - Analyze change impact
  help                   - Show this help

Examples:
  node ai-helper.js analyze ProductForm
      `));
      break;
      
    default:
      console.error(chalk.red(`Unknown command: ${command}`));
      console.log('Use "help" to see available commands');
      process.exit(1);
  }
}

module.exports = AIHelper;
