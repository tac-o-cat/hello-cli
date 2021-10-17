const { prefixesWithDesc } = require("./CONST");
const chalk = require("chalk");
const { exec } = require("shelljs");

const printPrefixList = () => {
  console.log(chalk.bold.magenta("프리픽스 \t\t 설명"));
  prefixesWithDesc.forEach(({ prefix, desc }) => {
    console.log(`${chalk.green(prefix)} \t\t\t ${chalk.gray(desc)}`);
  });
};

const getCurrentTicketNo = () => {
  const [_, ticketNo] = exec("git branch --show-current", {
    silent: true,
  })
    .stdout.replace(/\n/, "")
    .split("/");
  return ticketNo;
};

const commitMsgGenerator = (prefix, msgBody, ticketNo = "") => {
  if (ticketNo.length === 0) {
    return `${prefix}: ${msgBody}`;
  }
  return `${prefix}: [${ticketNo}] ${msgBody}`;
};

const executeCommitCommand = (commitMsg) => {
  console.log(commitMsg);
  exec(`git commit -m "${commitMsg}"`);
};

const isInputPrefixValid = (inputPrefix) =>
  prefixesWithDesc.some(({ prefix }) => prefix === inputPrefix);

const addCommit = (prefix, body, getTicketNo) => {
  const ticketNo = getTicketNo ? getCurrentTicketNo() : undefined;
  const commitMsg = commitMsgGenerator(prefix, body, ticketNo);
  executeCommitCommand(commitMsg);
};

module.exports = {
  printPrefixList,
  commitMsgGenerator,
  getCurrentTicketNo,
  isInputPrefixValid,
  executeCommitCommand,
  addCommit,
};
