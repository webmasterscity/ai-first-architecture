// ai-tools/change-validator.js
const chalk = require('chalk');
const AIHelper = require('./ai-helper');

class ChangeValidator {
  constructor() {
    this.aiHelper = new AIHelper();
  }

  async validateChanges(componentName, changes) {
    console.log(chalk.blue(`🔍 Validating changes for ${componentName}...`));

    const validation = {
      component: componentName,
      valid: true,
      errors: [],
      warnings: []
    };

    try {
      const impact = await this.aiHelper.analyzeChangeImpact(componentName, changes);
      if (impact.error) {
        validation.valid = false;
        validation.errors.push(impact.error);
        return validation;
      }

      console.log(validation.valid ? 
        chalk.green(`✅ Changes for ${componentName} are valid`) : 
        chalk.red(`❌ Changes for ${componentName} failed validation`)
      );

    } catch (error) {
      validation.valid = false;
      validation.errors.push(`Validation error: ${error.message}`);
    }

    return validation;
  }
}

if (require.main === module) {
  const validator = new ChangeValidator();
  const componentName = process.argv[2];

  if (!componentName) {
    console.error(chalk.red('Usage: node change-validator.js <componentName>'));
    process.exit(1);
  }

  const mockChanges = { logic: true };

  validator.validateChanges(componentName, mockChanges)
    .then(result => {
      console.log('\n' + chalk.bold('Validation Result:'));
      console.log(JSON.stringify(result, null, 2));
      
      if (!result.valid) {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error(chalk.red('Validation failed:', error.message));
      process.exit(1);
    });
}

module.exports = ChangeValidator;
