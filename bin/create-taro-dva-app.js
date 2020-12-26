#!/usr/bin/env node
const program = require("commander");

program.version(require('../package')).version;

/**
 * 捕获命令行初始化名称
 */
program
  .command("init <name>")
  .description("init ank project")
  .action(require('../lib/init'))

program.parse(process.argv);