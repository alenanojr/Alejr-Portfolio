<?php

declare(strict_types=1);

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// --- Rate limit: 5 requests / 15 minutes per IP ---------------------------

$rateLimitDir = __DIR__ . '/.cache';
if (!is_dir($rateLimitDir)) {
    mkdir($rateLimitDir, 0700, true);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = $rateLimitDir . '/' . hash('sha256', $ip) . '.json';
$windowSeconds = 15 * 60;
$maxRequests = 5;
$now = time();

$handle = fopen($rateLimitFile, 'c+');
if ($handle !== false) {
    flock($handle, LOCK_EX);
    $raw = stream_get_contents($handle);
    $timestamps = $raw ? (json_decode($raw, true) ?: []) : [];
    $timestamps = array_values(array_filter(
        $timestamps,
        fn($ts) => $ts > $now - $windowSeconds
    ));

    if (count($timestamps) >= $maxRequests) {
        flock($handle, LOCK_UN);
        fclose($handle);
        respond(429, ['ok' => false, 'error' => 'Too many messages sent. Please try again later.']);
    }

    $timestamps[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($timestamps));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
}

// --- Validate body ----------------------------------------------------------

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request body.']);
}

function fieldError(string $message): never
{
    respond(400, ['ok' => false, 'error' => $message]);
}

$name = trim((string) ($body['name'] ?? ''));
$email = trim((string) ($body['email'] ?? ''));
$subject = trim((string) ($body['subject'] ?? ''));
$message = trim((string) ($body['message'] ?? ''));

if (mb_strlen($name) < 2 || mb_strlen($name) > 100) {
    fieldError('Name must be at least 2 characters.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 200) {
    fieldError('Enter a valid email address.');
}
if (mb_strlen($subject) < 3 || mb_strlen($subject) > 150) {
    fieldError('Subject must be at least 3 characters.');
}
if (mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
    fieldError('Message must be at least 10 characters.');
}

// --- Load config --------------------------------------------------------

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    respond(502, ['ok' => false, 'error' => 'Could not send message right now. The server\'s email credentials may not be configured yet.']);
}

$config = require $configPath;
$gmailUser = $config['GMAIL_USER'] ?? '';
$gmailAppPassword = $config['GMAIL_APP_PASSWORD'] ?? '';
$toEmail = $config['CONTACT_TO_EMAIL'] ?? $gmailUser;

if ($gmailUser === '' || $gmailAppPassword === '') {
    respond(502, ['ok' => false, 'error' => 'Could not send message right now. The server\'s email credentials may not be configured yet.']);
}

// --- Send mail ------------------------------------------------------------

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$mailer = new PHPMailer(true);

try {
    $mailer->isSMTP();
    $mailer->Host = 'smtp.gmail.com';
    $mailer->SMTPAuth = true;
    $mailer->Username = $gmailUser;
    $mailer->Password = $gmailAppPassword;
    $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mailer->Port = 587;
    $mailer->CharSet = PHPMailer::CHARSET_UTF8;

    $mailer->setFrom($gmailUser, 'Good News');
    $mailer->addAddress($toEmail);
    $mailer->addReplyTo($email, $name);

    $phHour = (int) (new DateTime('now', new DateTimeZone('Asia/Manila')))->format('G');
    $greeting = match (true) {
        $phHour >= 5 && $phHour < 12 => 'Good Morning',
        $phHour === 12 => 'Good Noon',
        $phHour >= 13 && $phHour < 18 => 'Good Afternoon',
        default => 'Good Evening',
    };

    $mailer->isHTML(true);
    $mailer->Subject = $subject;
    $mailer->Body = '<div style="font-family: Georgia, \'Times New Roman\', Times, serif; font-size: 15px; color: #222222; max-width: 600px;">'
        . '<p style="margin: 0 0 12px; font-weight: bold;">' . $greeting . ',</p>'
        . '<p style="margin: 0; line-height: 1.4;">Ma\'am/Sir: <strong>' . escapeHtml($name) . '</strong><br>'
        . '&lt;<a href="mailto:' . escapeHtml($email) . '" style="color: #222222;">' . escapeHtml($email) . '</a>&gt;</p>'
        . '<p style="margin: 0; padding-top: 20px; line-height: 1.8; text-align: justify;">' . nl2br(escapeHtml($message)) . '</p>'
        . '</div>';
    $mailer->AltBody = "{$greeting},\n\nMa'am/Sir: {$name} <{$email}>\nSubject: {$subject}\n\n{$message}";

    $mailer->send();
} catch (MailException $e) {
    error_log('[contact] Failed to send mail: ' . $mailer->ErrorInfo);
    respond(502, ['ok' => false, 'error' => 'Could not send message right now. The server\'s email credentials may not be configured yet.']);
}

respond(200, ['ok' => true, 'message' => 'Message sent successfully.']);
