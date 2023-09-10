<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'company_name_required' => $requiredMessage('نام شرکت'),
    'company_name_min' => $minStringMessage('نام شرکت', 2),
    'company_name_max' => $maxStringMessage('نام شرکت', 50),
    'name_required' => $requiredMessage('نام'),
    'name_min' => $minStringMessage('نام', 2),
    'name_max' => $maxStringMessage('نام', 50),
    'family_required' => $requiredMessage('نام خانوادگی'),
    'family_min' => $minStringMessage('نام خانوادگی', 2),
    'family_max' => $maxStringMessage('نام خانوادگی', 50),
    'mobile_required' => $requiredMessage('شماره همراه'),
    'mobile_digits' => $digitsMessage('شماره همراه', 11),
    'mobile_gt' => $gtNumericMessage('شماره همراه', 0),
];
