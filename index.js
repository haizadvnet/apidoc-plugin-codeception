const path = require('path')
const fs = require('fs')
// const converter = require('./converters')

let app = {}
let docs = '';
let paramArray = '[]';
let codeceptionName = []
let codeceptionURL = []
let codeceptionMethod = []
let codeceptionIsJSON = []
let codeceptionParam = []
let counter = 0
/**
 * Hook overview: https://github.com/apidoc/apidoc-core/hooks.md
 */
module.exports = {
 
  init: function(_app) {
    app = _app;

    // Hooks
    app.addHook('parser-find-elements', parserFindElements)
  }
}

let pushKey = null
let pushMethod = null

// iterate over all elements
function parserFindElements(elements, element, block, filename) {
  counter++
  /**
   * element object properties:
   * source, name, sourceName, content
  */
  try {
    const elementParser = require(path.join(__dirname, 'node_modules/apidoc-core/lib', app.parsers[element.name]))
    const parsedElement = elementParser.parse(element.content, element.source)

    if (element.name === 'api') {
      pushKey = parsedElement.url
      pushMethod = String(parsedElement.type).toLowerCase()

      APIname = 'ApiName'
      if (parsedElement.name) {
        APIname = parsedElement.name
      }

      // codeceptionName[counter] = String(parsedElement.title).replace(/ +/g, "")
      codeceptionName[counter] =  String(APIname).replace(/ +/g, "")
      codeceptionURL[counter] =  parsedElement.url
      codeceptionMethod[counter] =  pushMethod
      codeceptionIsJSON[counter] = true // hardcoded JSON
      // codeceptionParam[counter] = JSON.parse(parsedElement.content)
    }

    // check for supported elements
    // if (element.name && Object.keys(converter.ConvertersMap).includes(element.name)) {
    //   codeceptionMethod[counter] = converter.resolve(element.name).init(parsedElement, codeceptionMethod[counter])
    // }
  } catch (err) {
    console.error('OOPS! errored element: '+JSON.stringify(element.name)+' in filename: '+filename)
    console.error(err)
  }
  return elements;
}

process.on('exit', (code) => {
  // triggerd from apidoc when proccess finished successfully
  // TODO: provide callback when apidoc works finished (this event called only when we use cli)
  if (code === 0 && counter > 0 && (process.argv.includes('-o') || process.argv.includes('--output'))) {
    console.log(`[apidoc-plugin-codeception] parse and convert ${counter} element${(counter == 1) ? '' : 's'} to codeception API test format`)

    function getOutputDir() {
      let outFlagIndex = process.argv.indexOf('-o')
      if (outFlagIndex === -1) {
        outFlagIndex = process.argv.indexOf('--output')
      }
      return process.argv[outFlagIndex + 1]
    }



    const destinationFilePath = path.join(process.cwd(), getOutputDir(), 'ApiDocCest.php')
    console.log(`[apidoc-plugin-codeception] going to save at path: ${destinationFilePath}`)

    codeceptionName.forEach(myFunction);

    function myFunction(item, index) {

      docs += 'public function ' + item + '(\\ApiTester $I)\r\n{\r\n$I->haveHttpHeader(\'accept\', \'application/json\'); '
      docs += '\r\n$I->haveHttpHeader(\'content-type\', \'application/json\');\r\n$I->haveHttpHeader(\'content-type\', '
      docs += '\'application/json\');\r\n$I->sendPost(\''+codeceptionURL[index]+'\', '
      docs += paramArray
      docs += ');'
      docs += '\r\n$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK);'
      docs += '\r\n$I->seeResponseIsJson();\r\n}\r\n\r\n'
    }

    fs.writeFileSync(destinationFilePath, '<?php\r\n\r\nclass ApiDocCest\r\n{\r\n'+docs+'\r\n}\r\n\r\n?>', function (err) {
      if (err) throw err;
      console.log(`[apidoc-plugin-codeception] ApiDocCest.php file saved successfully`)
    });

    // fs.writeFileSync(destinationFilePath, JSON.stringify(swaggerObj, null, 2), 'utf8')
    
    // console.log(`[apidoc-plugin-codeception] ApiDocCest.php file saved successfully`)
  }
})