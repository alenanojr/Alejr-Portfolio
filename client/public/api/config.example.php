<?php

// Copy this file to config.php (same directory) and fill in real values.
// config.php is gitignored — upload it to the host directly via file
// manager/FTP, never commit it.

return [
    // Gmail account used to send contact-form mail (must have 2FA enabled)
    'GMAIL_USER' => 'you@gmail.com',

    // Gmail App Password — generate at https://myaccount.google.com/apppasswords
    // (NOT your regular Gmail password; requires 2-Step Verification enabled first)
    'GMAIL_APP_PASSWORD' => 'xxxx xxxx xxxx xxxx',

    // Inbox that should receive contact-form submissions
    'CONTACT_TO_EMAIL' => 'you@gmail.com',
];
