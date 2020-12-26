const { promisify } = require("util");
const figlet = promisify(require('figlet'));
const clear = require("clear");
const chalk = require("chalk");
const clone = require("./down").clone;

/**
 * 封装打印方法
 */
const log = content => {
  console.log(
    chalk.green(content)
  );
}
/**
 * 子进程监控依赖安装，合并到主进程控制台
 */
const spawn = async (...args) => {
  const { spawn } = require('child_process');
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports = async name => {
  log('创建项目' + name);
  clear();
  const data = await figlet("welcome to use create-taro-dva-app");
  log(data);
  await clone('github:zuolung/taro-dva-app', name);
  log('安装依赖');
  await spawn('npm', ['install'], { cwd: `./${name}` });
  log(chalk.green(`
  👌 安装完成:
To get Start:
===========================
cd ${name}

npm run dev:h5
===========================
`))

}