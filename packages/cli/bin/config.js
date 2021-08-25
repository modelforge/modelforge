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
      description: 'Learn Boostrap',
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
