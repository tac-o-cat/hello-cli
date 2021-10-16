const languages = require("./LANGUAGES.js");
const chalk = require("chalk");

const parseSentence = (words) => {
  var sentence = "";
  for (var i = 1; i < words.length; i++) {
    sentence = sentence + words[i] + " ";
  }
  return sentence;
};
const usage = "\nUsage: tran <lang_name> sentence to be translated";

const showHelp = () => {
  console.log(usage);
  console.log("\nOptions:\r");
  console.log("\nOptions:\r");
  console.log(
    "\t--version\t      " + "Show version number." + "\t\t" + "[boolean]\r"
  );
  console.log(
    "    -l, --languages\t" +
      "      " +
      "List all languages." +
      "\t\t" +
      "[boolean]\r"
  );
  console.log("\t--help\t\t      " + "Show help." + "\t\t\t" + "[boolean]\n");
};

const showAll = () => {
  console.log(chalk.magenta.bold("\nLanguage Name\t\tISO-639-1 Code\n"));
  for (let [key, value] of languages) {
    console.log(key + "\t\t" + value + "\n");
  }
};

const parseLanguage = (language) => {
  if (language.length === 2) {
    return language;
  }
  if (languages.has(language)) {
    return languages.get(language);
  } else {
    console.error("not supported");
    return;
  }
};

module.exports = {
  parseSentence: parseSentence,
  parseLanguage: parseLanguage,
  showHelp: showHelp,
  showAll: showAll,
};
