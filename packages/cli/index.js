#!/usr/bin/env node

const ver = process.versions.node;
const semver = ver.split('.');
const major = semver[0];

if (major < 14) {
  console.error(
    `You are running Node ${ver}.\n` +
      'ModelForge requires Node 14 or higher. \n' +
      'Please update your version of Node to continue.',
  );
  process.exit(1);
}

// Const { init } = require('./modelforge');
//
// init();

console.log('packages/cli/index.js');
