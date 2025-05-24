// scripts/dev-server.js
const express = require('express');
const chalk = require('chalk');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/test/components/:componentName', (req, res) => {
  const { componentName } = req.params;
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${componentName} Test</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .test-container { max-width: 800px; margin: 0 auto; }
    .component-wrapper { border: 1px solid #ddd; padding: 20px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="test-container">
    <h1>${componentName} Test Page</h1>
    <div class="component-wrapper" id="component-container">
      <div data-testid="${componentName.toLowerCase()}">
        <h2>Test Component: ${componentName}</h2>
        <p>This is a placeholder for the ${componentName} component.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
  
  res.send(html);
});

app.listen(port, () => {
  console.log(chalk.green(`🚀 Development server running at http://localhost:${port}`));
  console.log(chalk.blue(`📋 Test components at: http://localhost:${port}/test/components/ComponentName`));
});
