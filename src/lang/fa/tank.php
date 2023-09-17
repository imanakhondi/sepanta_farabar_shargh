<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'tank_no_required' => $requiredMessage('شماره تانک'),
    'tank_no_numeric' => $numericMessage('شماره تانک'),
    'tank_no_gt' => $gtNumericMessage('شماره تانک', 0),
    'psi_date_required' => $requiredMessage('تاریخ اعتبار تست PSI'),
    'test_validity_date_required' => $requiredMessage('تاریخ اعتبار تست شرکت'),
    'capotage_date_required' => $requiredMessage('تاریخ کاپوتاژ'),
];
