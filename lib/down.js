const { promisify } = require('util');

module.exports.clone = async function (repo, desc) {
  const down = promisify(require('download-git-repo'));
  const ora = require('ora');
  const progress = ora(`下载中...${repo}`);
  progress.start();
  await down(repo, desc).then(() => {
    progress.succeed("项目创建成功");
  }).catch(() => {
    progress.failed();
  });
}