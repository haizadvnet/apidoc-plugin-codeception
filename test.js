var fs = require('fs');

docs = '';
item = 's';

docs += 'public function ' + item + '(\\ApiTester $I)\r\n{\r\n$I->haveHttpHeader(\'accept\', \'application/json\'); '
docs += '\r\n$I->haveHttpHeader(\'content-type\', \'application/json\');\r\n$I->haveHttpHeader(\'content-type\', '
docs += '\'application/json\');\r\n$I->sendPost(\'/'+item+'\', '
docs += item
docs += ');'
docs += '\r\n$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK);'
docs += '\r\n$I->seeResponseIsJson();\r\n}\r\n\r\n'

docs += 'public function ' + item + '(\\ApiTester $I)\r\n{\r\n$I->haveHttpHeader(\'accept\', \'application/json\'); '
docs += '\r\n$I->haveHttpHeader(\'content-type\', \'application/json\');\r\n$I->haveHttpHeader(\'content-type\', '
docs += '\'application/json\');\r\n$I->sendPost(\'/'+item+'\', '
docs += item
docs += ');'
docs += '\r\n$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK);'
docs += '\r\n$I->seeResponseIsJson();\r\n}\r\n\r\n'

docs += 'public function ' + item + '(\\ApiTester $I)\r\n{\r\n$I->haveHttpHeader(\'accept\', \'application/json\'); '
docs += '\r\n$I->haveHttpHeader(\'content-type\', \'application/json\');\r\n$I->haveHttpHeader(\'content-type\', '
docs += '\'application/json\');\r\n$I->sendPost(\'/'+item+'\', '
docs += item
docs += ');'
docs += '\r\n$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK);'
docs += '\r\n$I->seeResponseIsJson();\r\n}\r\n\r\n'
fs.writeFile('ApiDocCest.php', '<?php\r\n\r\nclass ApiDocCest\r\n{\r\n'+docs+'\r\n}\r\n\r\n?>', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });