#! /usr/bin/env node
const yargs = require("yargs");
const inquirer = require("inquirer");

const { printPrefixList, isInputPrefixValid, addCommit } = require("./utils");
const {
  getTicketNoPrompt,
  inputCommitMsgBodyPrompt,
  selectPrefixPrompt,
} = require("./prompt");
const chalk = require("chalk");

yargs
  .usage(`셀프서비스팀 커밋메시지 헬퍼입니다.`)
  .option({
    p: {
      alias: "prefix",
      describe:
        "프리픽스를 직접 입력합니다. 셀프서비스 팀에서 약속된 프리픽스만 입력할 수 있습니다. -p <프리픽스명>",
      type: "string",
      requiresArg: true,
    },
    l: {
      alias: "list",
      describe:
        "현재 셀프서비스 팀에서 사용 중인 커밋 프리픽스 목록을 확인합니다.",
      type: "boolean",
      demandOption: false,
    },
  })
  .help(true).argv;

if (yargs.argv.l || yargs.argv.list) {
  printPrefixList();
  return;
}

if (yargs.argv.p || yargs.argv.prefix) {
  const inputPrefix = yargs.argv.p;
  const isValid = isInputPrefixValid(inputPrefix);
  if (!isValid) {
    console.log(chalk.red("잘못된 프리픽스입니다."));
    return;
  }
  inquirer
    .prompt([inputCommitMsgBodyPrompt, getTicketNoPrompt])
    .then((answers) => {
      const { getTicketNo, body } = answers;

      addCommit(inputPrefix, body, getTicketNo);
    });
  return;
}

if (yargs.argv._.length === 0) {
  inquirer
    .prompt([selectPrefixPrompt, inputCommitMsgBodyPrompt, getTicketNoPrompt])
    .then((answers) => {
      const { prefixWithDesc, getTicketNo, body } = answers;
      const prefix = prefixWithDesc.split(":")[0];

      addCommit(prefix, body, getTicketNo);
    });
  return;
}
