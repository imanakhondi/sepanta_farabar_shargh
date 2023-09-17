<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'introduction_no_required' => $requiredMessage('شماره معرفی نامه'),
    'introduction_no_numeric' => $numericMessage('شماره معرفی نامه'),
    'introduction_no_gt' => $gtNumericMessage('شماره معرفی نامه', 0),
    'introduction_date_required' => $requiredMessage('تاریخ معرفی نامه'),
    'owner_unit_usd_required' => $requiredMessage('واحد صاحب کالا (دلار)'),
    'owner_unit_usd_numeric' => $numericMessage('واحد صاحب کالا (دلار)'),
    'owner_unit_usd_gt' => $gtNumericMessage('واحد صاحب کالا (دلار)', 0),
    'owner_unit_irr_required' => $requiredMessage('واحد صاحب کالا (ریال)'),
    'owner_unit_irr_numeric' => $numericMessage('واحد صاحب کالا (ریال)'),
    'owner_unit_irr_gt' => $gtNumericMessage('واحد صاحب کالا (ریال)', 0),
];
