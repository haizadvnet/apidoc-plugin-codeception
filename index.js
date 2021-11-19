const path = require("path");
const fs = require("fs");
// const converter = require('./converters')

let app = {};
let docs = "";
let config = {};
let paramArray = "[ 'skipToken' => true ]";
let codeceptionName = [];
let codeceptionURL = [];
let codeceptionMethod = [];
let codeceptionIsJSON = [];
let codeceptionParam = [];
let counter = 0;
let to_append_function = 0; //To make function name unique
/**
 * Hook overview: https://github.com/apidoc/apidoc-core/hooks.md
 */
module.exports = {
  init: function (_app) {
    app = _app;

    // Hooks
    app.addHook("parser-find-elements", parserFindElements);
  },
};

let pushKey = null;
let pushMethod = null;

// iterate over all elements
function parserFindElements(elements, element, block, filename) {
  counter++;
  /**
   * element object properties:
   * source, name, sourceName, content
   */
  try {
    const elementParser = require(path.join(
      __dirname,
      "node_modules/apidoc-core/lib",
      app.parsers[element.name]
    ));
    const parsedElement = elementParser.parse(element.content, element.source);

    if (element.name === "api") {
      pushKey = parsedElement.url;
      pushMethod = String(parsedElement.type).toLowerCase();

      APIname = "ApiName";

      if (parsedElement.title) {
        APIname = parsedElement.title;
      }

      codeceptionName[counter] = String(APIname).replace(/[\W_]/g, "");
      codeceptionURL[counter] = parsedElement.url;
      codeceptionMethod[counter] = pushMethod;
      codeceptionIsJSON[counter] = true; // hardcoded JSON
    }
  } catch (err) {
    console.error(
      "OOPS! errored element: " +
        JSON.stringify(element.name) +
        " in filename: " +
        filename
    );
    console.error(err);
  }
  return elements;
}

process.on("exit", (code) => {
  // triggerd from apidoc when proccess finished successfully
  // TODO: provide callback when apidoc works finished (this event called only when we use cli)
  if (
    code === 0 &&
    counter > 0 &&
    (process.argv.includes("-o") || process.argv.includes("--output"))
  ) {
    console.log(
      `[apidoc-plugin-codeception] parse and convert ${counter} element${
        counter == 1 ? "" : "s"
      } to codeception API test format`
    );

    function getTestConfig() {
      let configpath = process.argv.indexOf("-c");
      if (configpath === -1) {
        configpath = process.argv.indexOf("--config");
      }

      return process.argv[configpath + 1];
    }

    config.codeception_path = "";
    
    try {
      let configs = fs.readFileSync(getTestConfig());
      config = JSON.parse(configs);
    } catch (err) {
      //ignore
    }

    const destinationFilePath = path.join(
      process.cwd(),
      config.codeception_path,
      "ApiDocCest.php"
    );
    console.log(
      `[apidoc-plugin-codeception] going to save at path: ${destinationFilePath}`
    );

    codeceptionName.forEach(myFunction);

    function myFunction(item, index) {
      to_append_function++;

      docs +=
        "public function " +
        item +
        "_" +
        to_append_function +
        "(\\ApiTester $I)\r\n{\r\n$I->haveHttpHeader('accept', 'application/json'); ";
      docs +=
        "\r\n$I->haveHttpHeader('content-type', 'application/json');\r\n$I->sendPost('" +
        codeceptionURL[index] +
        "', ";
      docs += paramArray;
      docs += ");";

      if (config.checkStatus200) {
        docs += "\r\n$I->seeResponseCodeIs(\\Codeception\\Util\\HttpCode::OK);";
      }
      // docs += '\r\n$I->seeResponseCodeIs(\\Codeception\\Util\\HttpCode::OK);'
      docs += "\r\n$I->seeResponseIsJson();\r\n}\r\n\r\n";
    }

    fs.writeFileSync(
      destinationFilePath,
      "<?php\r\n\r\nclass ApiDocCest\r\n{\r\n" + docs + "\r\n}\r\n\r\n?>"
    );
    console.log(
      `[apidoc-plugin-codeception] ApiDocCest.php file saved successfully`
    );
  }
});
