<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'repair_date_required' => $requiredMessage('تاریخ تعمیر'),
    'cost_required' => $requiredMessage('هزینه'),
    'cost_numeric' => $numericMessage('هزینه'),
    'cost_gt' => $gtNumericMessage('هزینه', 0),
    'description_max' => $maxStringMessage('توضیحات',300),
];
