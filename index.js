const path = require("path");
const fs = require("fs");
// const converter = require('./converters')

let app = {};
let schema = "";
let config = {};
let codeceptionName = [];
let codeceptionURL = [];
let codeceptionMethod = [];
let codeceptionIsJSON = [];
let codeceptionParam = [];
let counter = 0;
let hasContent = false;
let isString = true;
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
  // counter++;
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

    for (const [key, value] of Object.entries(parsedElement)) {

      if(key == 'name'){
        counter++;
        codeceptionName[counter] = String(value).replace(/[\W_]/g, "");
      }

      if(key == 'url'){
        codeceptionURL[counter] = value;
      }

      if(key == 'title' && value == 'Request-Example:'){
        hasContent = true;
      }
      if(key == 'content' && hasContent == true){
        var paramObj = JSON.parse(value);
        var size = Object.keys(paramObj).length;

        let params = '['
        let i = 0
        for (const [key, value] of Object.entries(paramObj)) {
        
        i ++
        params += '\'' + key + '\' => ' 
        
        isString ? params += '\''+value+'\'' : params += value
        
        i < size ? params += ',' : params += ',\'skipToken\'=>true]'
        }
        codeceptionParam[counter] = String(params);

        hasContent = false;
      }
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

      schema +=
        "public function " +
        item +
        "(\\ApiTester $I)\r\n{\r\n$I->haveHttpHeader('accept', 'application/json'); ";
      schema +=
        "\r\n$I->haveHttpHeader('content-type', 'application/json');\r\n$I->sendPost('" +
        codeceptionURL[index] +
        "', ";
      schema += codeceptionParam[index] !== undefined ? codeceptionParam[index] : '[\'skipToken\'=>true]';
      schema += ");";

      if (config.check_status_200) {
        schema += "\r\n$I->seeResponseCodeIs(\\Codeception\\Util\\HttpCode::OK);";
      }
      // schema += '\r\n$I->seeResponseCodeIs(\\Codeception\\Util\\HttpCode::OK);'
      schema += "\r\n$I->seeResponseIsJson();\r\n}\r\n\r\n";
    }

    fs.writeFileSync(
      destinationFilePath,
      "<?php\r\n\r\nclass ApiDocCest\r\n{\r\n" + schema + "\r\n}\r\n\r\n?>"
    );
    console.log(
      `[apidoc-plugin-codeception] ApiDocCest.php file saved successfully`
    );
  }
});
