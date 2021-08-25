const chalk = require('chalk');

const packageJson = require('../package.json');

const {version} = packageJson;

const paddedVersion = ` v${version}`.padStart(20, '─');

const types = {
  ASCII_HEADER: chalk`
{gray ╭─────────────────────────────────────────────────────╮}
{gray │  }{yellow _  _ ____ ___  ____ _    }{bold ____ ____ ____ ____ ____  }{gray │}
{gray │  }{yellow |\\/| |  | |  \\ |___ |    }{bold |___ |  | |__/ | __ |___  }{gray │}
{gray │  }{yellow |  | |__| |__/ |___ |___ }{bold |    |__| |  \\ |__] |___  }{gray │}
{gray ╰───────────────────────────────${paddedVersion} ─╯}
`,
  ASCII_HEADER_WITH_ICON: chalk`
{gray ╭───────────────────────────────────────────────────────────────╮}
{gray │  }{yellow   ____                                                       }{gray │}
{gray │  }{yellow  /   /\\   }{bold _  _ ____ ___  ____ _    }{bold ____ ____ ____ ____ ____  }{gray │}
{gray │  }{yellow /___/  \\  }{bold |\\/| |  | |  \\ |___ |    }{bold |___ |  | |__/ | __ |___  }{gray │}
{gray │  }{yellow \\   \\  /  }{bold |  | |__| |__/ |___ |___ }{bold |    |__| |  \\ |__] |___  }{gray │}
{gray │  }{yellow  \\___\\/                                                      }{gray │}
{gray ╰─────────────────────────────────────────${paddedVersion} ─╯}
`,
};

module.exports = types.ASCII_HEADER_WITH_ICON;
