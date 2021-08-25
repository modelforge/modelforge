module.exports = {
  defaultAppName: 'my-app',
  frameworkName: 'ModelForge',
  templates: [
    {
      name: 'default',
      description: 'Default Template',
    },
    {
      name: 'dashboard',
      description: 'Dashboard Starter Kit',
    },
    {
      name: 'mapbox',
      description: 'MapBox Starter Kit',
    },
    {
      name: 'bare',
      description: 'Minimal, Bare Template',
    },
  ],
  contribCommands: [
    {
      name: 'bootstrap',
      description: 'Run lerna bootstrap',
    },
    {
      name: 'commit',
      description: 'Commit changes to repository',
    },
    {
      name: 'lint',
      description: 'Lint codebase with ESLint',
    },
    {
      name: 'format',
      description: 'Format codebase with Prettier',
    },
  ],
};
