var fs = require('fs');

docs = 'ss';
fs.writeFile('ApiDocCest.php', '<?php\r\n\r\nclass ApiDocCest\r\n{\r\n'+docs+'\r\n}\r\n\r\n?>', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });