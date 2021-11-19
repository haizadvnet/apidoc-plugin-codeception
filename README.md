# apidoc-plugin-codeception
## apidoc plugin to export codeception API test format

Inspired by apidoc-plugin-swagger
https://github.com/sadeghmohebbi/apidoc-plugin-swagger. Thank you for showing me that we can also build own plugin for apidoc :)


Hopefully this plugin will helps developer to do API testing by referring to the apidoc schema.

## About apidoc-plugin-codeception

1. This plugin only support JSON request and response.
2. This plugin skipped any authorization token such as bearer etc.
3. Please ensure your API can take parameter "skipToken":true if you want to disable API authorization token.

## Installation
```
npm i haizadvnet/apidoc-plugin-codeception -g
```

```ApiDocCest.php``` will be generated once you generate your apidoc.

## Configs
1. Add ```"codeception_path":[TEST API PATH]``` inside your APIdoc config file to inform plugin where to generate your codeception api testing script. Example ```"codeception_path":tests/api```

2. Add ```"checkStatus200":true``` inside your APIdoc config file if you want to check all API response status code is 200.

## Example
```
apidoc -i . -o doc/ -c doc/config.json
```

Todo list:
- [ ] Pass parameter from apidoc into codeception api testing script

### Feel free to contribute! I really appreciate your contribution
