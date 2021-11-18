<?php

class ApiDocCest
{
public function s(\ApiTester $I)
{
$I->haveHttpHeader('accept', 'application/json'); 
$I->haveHttpHeader('content-type', 'application/json');
$I->haveHttpHeader('content-type', 'application/json');
$I->sendPost('/s', s);
$I->seeResponseCodeIs(CodeceptionUtilHttpCode::OK);
$I->seeResponseIsJson();
}

public function s(\ApiTester $I)
{
$I->haveHttpHeader('accept', 'application/json'); 
$I->haveHttpHeader('content-type', 'application/json');
$I->haveHttpHeader('content-type', 'application/json');
$I->sendPost('/s', s);
$I->seeResponseCodeIs(CodeceptionUtilHttpCode::OK);
$I->seeResponseIsJson();
}

public function s(\ApiTester $I)
{
$I->haveHttpHeader('accept', 'application/json'); 
$I->haveHttpHeader('content-type', 'application/json');
$I->haveHttpHeader('content-type', 'application/json');
$I->sendPost('/s', s);
$I->seeResponseCodeIs(CodeceptionUtilHttpCode::OK);
$I->seeResponseIsJson();
}


}

?>