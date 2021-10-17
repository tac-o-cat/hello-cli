const chalk = require("chalk");
const { prefixesWithDesc } = require("./CONST");
const inquirer = require("inquirer");

const selectPrefixPrompt = {
  type: "list",
  name: "prefixWithDesc",
  message: "사용할 프리픽스를 선택하세요",
  choices: [
    ...prefixesWithDesc.map(({ prefix, desc }) => `${prefix}: ${desc}`),
    new inquirer.Separator(
      chalk.yellowBright(
        "======================================================="
      )
    ),
  ],
  default: "feat",
};

const getTicketNoPrompt = {
  type: "confirm",
  name: "getTicketNo",
  message: "브랜치명으로부터 지라 티켓 넘버를 가져옵니다",
  default: true,
};

const inputCommitMsgBodyPrompt = {
  type: "input",
  name: "body",
  message: "커밋 메시지 본문을 입력하세요",
  validate: (input) => {
    if (input.length === 0) {
      console.log(chalk.red("한 글자 이상 입력하세요"));
      return false;
    }
    return true;
  },
};

module.exports = {
  selectPrefixPrompt,
  getTicketNoPrompt,
  inputCommitMsgBodyPrompt,
};
