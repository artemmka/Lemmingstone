<?php

class Answer {
    static $CODES = array(
        '101' => 'Param method not setted',
        '102' => 'Method not found',
        '242' => 'Params not set fully',
        '705' => 'User is not found',
        '1001' => 'Is it unique login?',
        '1002' => 'Wrong login or password',
        '1003' => 'Error to logout user',
        '1004' => 'Error to register user',
        '1005' => 'User is no exists',
        '1006' => 'params login or password not set',
        '404' => 'not found',
        '605' => 'invalid teamId',
        '700' => 'No skins',
        '701' => 'Skin is not found',
        '706' => 'text message is empty',
        '707' => 'could not send message', // e-mail;
        '708' => 'invalid code from E-mail',
        '710' => 'action is not found',
        '711' => 'points is not found',
        '712' => 'death is not found',
        '709' => ' session did not start or you need use previous method',
        '720' => 'admin not found',
        '721' => 'item not found',
        '722' => 'key coordinates do not match',
        '723' => 'User coordinates not found',
        '800' => 'not found object',
        '801' => 'unknown state',
        '802' => 'Invalid login length. It must be between 6 and 15 characters.',
        '803' => 'Invalid password length. It must be between 8 and 20 characters.',
        '1007' => 'Other user is playing right now. If you doesn`t, please change the password',
        '1008' => 'user with this email is already registered',
        '4001' => 'an incorrect array of points was passed',
        '4002' => 'insufficient number of points to build a spline', 
        '2001' => 'error to set lemming for user',
        '9000' => 'unknown error',
    );

    static function response($data) {
        if ($data) {
            if (!is_bool($data) && array_key_exists('error', $data)) {
                $code = $data['error'];
                return [
                    'result' => 'error',
                    'error' => [
                        'code' => $code,
                        'text' => self::$CODES[$code]
                    ]
                ];
            }
            return [
                'result' => 'ok',
                'data' => $data
            ];
        }
        $code = 9000;
        return [
            'result' => 'error',
            'error' => [
                'code' => $code,
                'text' => self::$CODES[$code]
            ]
        ];
    }
}