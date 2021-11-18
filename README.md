# apidoc-plugin-codeception
## apidoc plugin to export codeception API test format

Inspired by apidoc-plugin-swagger
https://github.com/sadeghmohebbi/apidoc-plugin-swagger. Thank you for showing me that we can also build own plugin for apidoc :)


Hopefully this plugin will solve issue on https://github.com/apidoc/apidoc/issues/661

## About apidoc-plugin-codeception

1. This plugin only support JSON request and response.
2. This plugin skipped any authorization token such as bearer etc.
3. Please ensure your API can take parameter "skipToken":true if you want to disable API authorization token.

## Installation
```
npm i haizadvnet/apidoc-plugin-codeception -g
```

```ApiDocCest.php``` will be generated once you generate your apidoc.

Todo list:
- [ ] Pass parameter from apidoc into codeception api testing script

### Feel free to contribute! I really appreciate your contribution
