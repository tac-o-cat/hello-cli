#! /usr/bin/env node
// entry point

const yargs = require("yargs");
const utils = require("./utils.js");
const translate = require("@vitalets/google-translate-api");
const chalk = require("chalk");
// const boxen = require("boxen"); // 왜 안돼
const usage = chalk.hex("#83aaff")(
  "\nUsage: tran <lang_name> sentence to be translated"
);

yargs
  .usage(usage)
  .option("l", {
    alias: "languages",
    describe: "List all supported languages",
    type: "boolean",
    demandOption: false,
  })
  .help(true).argv;

if (yargs.argv.l == true || yargs.argv.languages == true) {
  utils.showAll();
  return;
}

if (yargs.argv._[0] == null) {
  utils.showHelp();
  return;
}

if (yargs.argv._[0]) {
  var language = yargs.argv._[0].toLowerCase();
  language = utils.parseLanguage(language);
  var sentence = "";
}

sentence = utils.parseSentence(yargs.argv._);

if (sentence == "") {
  console.error("\nThe entered sentence is like John Cena, I can't see it!\n");
  console.log("Enter tran --help to get started.\n");
  return;
}

language = utils.parseLanguage(language);

if (language === null) return;

translate(sentence, { to: language })
  .then((res) => {
    console.log("\n" + chalk.green(res.text) + "\n");
    // console.log(
    //   "\n" +
    //     boxen(chalk.green("\n" + res.text + "\n"), {
    //       padding: 1,
    //       borderColor: "cyanBright",
    //       dimBorder: true,
    //     }) +
    //     "\n"
    // );
  })
  .catch((err) => {
    console.error(err);
  });
