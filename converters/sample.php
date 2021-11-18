<?php

global $parent_tester_username;
global $canteen_tester_username;
global $bookshop_tester_username;
global $teacher_tester_username;

global $tester_password;
global $tester_card;
global $tester_personalID;
global $tester_premiseId;

$parent_tester_username = 'iAmAParentTester';
$canteen_tester_username = 'iAmACanteenTester';
$bookshop_tester_username = 'iAmABookshopTester';
$teacher_tester_username = 'iAmATeacherTester';

$tester_password = 'Abcd12345';
$tester_card = 'I AM A CARD TESTER';
$tester_personalID = 'EKUPONCARDTESTER0'.(rand(100,999));
$tester_premiseId = 4;
/**
 * Dynamic Variable
 */
$authKey = '';
$verificationCode = '';
$userId = 0;
$token = '';

class UserCest
{
    public function getAPIKey(\ApiTester $I)
    {
      global $parent_tester_username;
      global $authKey;
      $I->haveHttpHeader('accept', 'application/json');
      $I->haveHttpHeader('content-type', 'application/json');
      $I->sendPost('/getAPIKey.php', [
        'isLogin' => 0, 
      ]);
      $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
      $I->seeResponseIsJson(); 

      $response = $I->grabResponse();
      $result = json_decode($response,true);
      $userId = $result['data'];
      $authKey = $result['authKey'];

    }

    public function deleteTesterUser(\ApiTester $I)
    {
      global $parent_tester_username;
      global $canteen_tester_username;
      global $bookshop_tester_username;
      global $teacher_tester_username;

      global $authKey;

      $I->haveHttpHeader('accept', 'application/json');
      $I->haveHttpHeader('content-type', 'application/json');
      $I->sendPost('/deleteTesterUser.php', [
        'login' => $parent_tester_username, 
        'authKey' => $authKey
      ]);
      $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
      $I->seeResponseIsJson(); 

      $I->haveHttpHeader('accept', 'application/json');
      $I->haveHttpHeader('content-type', 'application/json');
      $I->sendPost('/deleteTesterUser.php', [
        'login' => $canteen_tester_username, 
        'authKey' => $authKey
      ]);
      $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
      $I->seeResponseIsJson(); 

      $I->haveHttpHeader('accept', 'application/json');
      $I->haveHttpHeader('content-type', 'application/json');
      $I->sendPost('/deleteTesterUser.php', [
        'login' => $bookshop_tester_username, 
        'authKey' => $authKey
      ]);
      $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
      $I->seeResponseIsJson(); 

      $I->haveHttpHeader('accept', 'application/json');
      $I->haveHttpHeader('content-type', 'application/json');
      $I->sendPost('/deleteTesterUser.php', [
        'login' => $teacher_tester_username, 
        'authKey' => $authKey
      ]);
      $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
      $I->seeResponseIsJson(); 

    }
    /**
     * Check username
     */ 
    public function checkUserNameViaAPI(\ApiTester $I)
    {
      global $parent_tester_username;
      global $canteen_tester_username;
      global $bookshop_tester_username;
      global $teacher_tester_username;

        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/checkUserNameSelfReg.php', [
          'login' => $parent_tester_username, 
          'mode' => 'selfRegister'
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();   
        
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/checkUserNameSelfReg.php', [
          'login' => $canteen_tester_username, 
          'mode' => 'selfRegister'
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();  

        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/checkUserNameSelfReg.php', [
          'login' => $bookshop_tester_username, 
          'mode' => 'selfRegister'
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();  

        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/checkUserNameSelfReg.php', [
          'login' => $teacher_tester_username, 
          'mode' => 'selfRegister'
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();  
    }
    /**
     * Register user
     */ 
    public function registerUserViaAPI(\ApiTester $I)
    {
        global $verificationCode;
        global $authKey;
        global $userId;
        global $parent_tester_username;
        global $tester_password;

        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/regUser.php', [
          'login' => $parent_tester_username, 
          'password' => $tester_password, 
          'name' => 'Tester', 
          'platform' => 'parent',
          'userType' => 'parent', 
          'phoneNo' => '601234567892', 
          'mode' => 'selfRegister',
          'isDemo' => true,
          'authKey' => $authKey
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();    
        
        $response = $I->grabResponse();
        $result = json_decode($response,true);
        $userId = $result['data'];
        $verificationCode = $result['verificationCode'];
    }
     /**
     * Verify user
     */ 
    public function verifyUserViaAPI(\ApiTester $I)
    {
      global $verificationCode;
      global $userId;
      global $authKey;

        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/verifyUser.php', [
          'verificationCode' => $verificationCode, 
          'Id' => $userId,
          'authKey' => $authKey
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();        
    }
     /**
     * Login user
     */ 
    public function loginUserViaAPI(\ApiTester $I)
    {
      global $parent_tester_username;
      global $tester_password;
      global $token;
      global $authKey;

        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/login.php', [
          'username' => $parent_tester_username, 
          'password' => $tester_password,
          'loginFrom' => 'mobileApp'
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();
        $response = $I->grabResponse();
        $result = json_decode($response,true);
        $token = $result['token'];
        $authKey = $result['authKey'];
        
    }
    /**
     * Change user language
     */ 
    public function changeUserLanguageViaAPI(\ApiTester $I)
    {
      global $userId;
      global $token;
      global $authKey;

      $I->haveHttpHeader('Authorization', 'Bearer '.$token);
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/updateLanguage.php', [
          'userId' => $userId, 
          'language' => 1,
          'authKey' => $authKey,
          'loginFrom' => 'mobileApp'
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();
    }
    /**
     * Update profile
     */ 
    public function updateUserViaAPI(\ApiTester $I)
    {
      global $userId;
      global $token;
      global $parent_tester_username;
      global $tester_password;
      global $authKey;

      $I->haveHttpHeader('Authorization', 'Bearer '.$token);
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/editUser.php', [
          'Id' => $userId, 
          'name' => $parent_tester_username,
          'phoneNo' => $tester_password,
          'countryId' => 2,
          'stateId' => 18,
          'districtId' => 753,
          'postcode' => 40400,
          'authKey' => $authKey
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();
    }
    /**
     * Register ewallet
     */ 
    public function registerUserEWalletViaAPI(\ApiTester $I)
    {
      global $userId;
      global $token;
      global $authKey;

      $I->haveHttpHeader('Authorization', 'Bearer '.$token);
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost('/regEWallet.php', [
          'userId' => $userId, 
          'balanceRinggit' => 200,
          'loginFrom' => 'mobileApp',
          'authKey' => $authKey
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();
    }

    /**
     * Register card
     */ 
    public function registerCardViaAPI(\ApiTester $I)
    {
      global $userId;
      global $token;
      global $tester_card;
      global $tester_personalID;
      global $tester_premiseId;
      global $authKey;

      global $class_name;
      global $class_id;

      $I->haveHttpHeader('Authorization', 'Bearer '.$token);
      $I->haveHttpHeader('accept', 'application/json');
      $I->haveHttpHeader('content-type', 'application/json');
      $I->sendPost('/regCard.php', [
        'userId' => $userId, 
        'cardHolderName' => $tester_card,
        'personalID' => $tester_personalID,
        'balanceRinggit' => 500,
        'balanceSen' => 0,
        'tag' => true,
        'premisesId' => $tester_premiseId,
        'displayName' => $tester_card,
        'className' => $class_name,
        'classId' => $class_id,
        'loginFrom' => 'mobileApp',
        'authKey' => $authKey
      ]);
      $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
      $I->seeResponseIsJson();
    }
}