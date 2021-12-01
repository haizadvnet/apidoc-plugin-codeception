# apidoc-plugin-codeception
## apidoc plugin to export codeception API test format

Inspired by apidoc-plugin-swagger
https://github.com/sadeghmohebbi/apidoc-plugin-swagger. Thank you for showing me that we can also build own plugin for apidoc :)


Hopefully this plugin will helps developer to do API testing by referring to the apidoc schema.

## About apidoc-plugin-codeception

1. This plugin only support JSON request and response.
2. Please ensure your API can take parameter "skipToken":true if you want to disable API authorization token.

## Installation
```
npm i haizadvnet/apidoc-plugin-codeception -g
```

```ApiDocCest.php``` will be generated once you generate your apidoc.

## Configs
1. Add ```"codeception_path":[TEST API PATH]``` inside your APIdoc config file to inform plugin where to generate your codeception api testing script. Example ```"codeception_path":tests/api```

2. Add ```"check_status_200":true``` inside your APIdoc config file if you want to check all API response status code is 200.

3. Add ```"cest_file_name":"[FILE NAME].php"``` inside your APIdoc config file to rename your cest file name. Default file name is ```ApiDocCest.php```.

4. Add ```"see_response_contains":"[FIND THIS STRING]"``` inside your APIdoc config file to enable Codeception's seeResponseContains method. Leave the value as ```"see_response_contains":""``` if to disable the method.

5. Add ```"bearer_token":"[TOKEN]"``` inside your APIdoc config file to enable Codeception's pass bearer token. Leave the value as ```"bearer_token":""``` if to hide bearer token.

Refer https://github.com/haizadvnet/apidoc-plugin-codeception/blob/master/config.json

## Example
```
apidoc -i . -o doc/ -c doc/config.json
```

## Output Sample
```
<?php

class ApiDocCest
{
    public function getUser(\ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/user.php', ['Id' => '1','skipToken'=>true]);
        $I->seeResponseIsJson();
    }
}

?>
```

Todo list:
- [x] Pass parameter from apidoc into codeception api testing script
- [x] Add support for Codeception's seeResponseContains method
- [ ] Add support for Codeception's seeResponseContainsJson method

### Feel free to contribute! I really appreciate your contribution
