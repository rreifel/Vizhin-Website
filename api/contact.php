<?php
/**
 * Vizhin LLC - Contact Form Submission Endpoint
 * Receives lead data and emails rreifel@vizhin.co via native host mailer.
 */

// Set JSON response headers
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Allow same-origin POST requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// Read and decode incoming JSON payload or form data
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

// Extract and sanitize input fields
$firstName = isset($data['firstName']) ? trim((string)$data['firstName']) : '';
$lastName  = isset($data['lastName']) ? trim((string)$data['lastName']) : '';
$email     = isset($data['email']) ? trim((string)$data['email']) : '';
$company   = isset($data['company']) ? trim((string)$data['company']) : '';
$cellPhone = isset($data['cellPhone']) ? trim((string)$data['cellPhone']) : '';
$notes     = isset($data['notes']) ? trim((string)$data['notes']) : '';
$timestamp = isset($data['timestamp']) ? trim((string)$data['timestamp']) : date('c');

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($company) || empty($notes)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required fields. First name, last name, email, company, and message notes are required.'
    ]);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email address provided.'
    ]);
    exit;
}

// Prevent header injection attacks
$sanitizedEmail = str_replace(["\r", "\n", "%0a", "%0d"], '', $email);
$sanitizedFirst = str_replace(["\r", "\n", "%0a", "%0d"], '', $firstName);
$sanitizedLast  = str_replace(["\r", "\n", "%0a", "%0d"], '', $lastName);
$sanitizedComp  = str_replace(["\r", "\n", "%0a", "%0d"], '', $company);

// Destination recipient
$to = 'rreifel@vizhin.co';
$subject = "New Contact Inquiry: {$sanitizedFirst} {$sanitizedLast} from {$sanitizedComp}";

// Format human-readable submission date
$formattedDate = date('F j, Y, g:i a T');

// Compose HTML email body
$bodyHtml = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Vizhin Contact Submission</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0c0e; color: #f3f4f6; margin: 0; padding: 30px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #121418; border: 1px solid #262930; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
    <div style="background-color: #07080a; padding: 24px 30px; border-bottom: 2px solid #10b981;">
      <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">Vizhin LLC &bull; Contact Inquiry</h2>
      <p style="margin: 4px 0 0 0; color: #10b981; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">Go-to-Market Advisory &amp; Strategy</p>
    </div>
    
    <div style="padding: 30px;">
      <p style="font-size: 14px; color: #9ca3af; margin-top: 0; margin-bottom: 20px;">
        A new contact submission was received on <strong style="color: #ffffff;">{$formattedDate}</strong> via <a href="https://www.vizhin.co/contact" style="color: #10b981; text-decoration: none;">vizhin.co/contact</a>.
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #262930; color: #9ca3af; width: 140px; font-weight: 600;">Full Name:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #262930; color: #ffffff; font-weight: 600;">{$sanitizedFirst} {$sanitizedLast}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #262930; color: #9ca3af; font-weight: 600;">Email:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #262930; color: #10b981;"><a href="mailto:{$sanitizedEmail}" style="color: #10b981; text-decoration: none;">{$sanitizedEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #262930; color: #9ca3af; font-weight: 600;">Company:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #262930; color: #ffffff;">{$sanitizedComp}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #262930; color: #9ca3af; font-weight: 600;">Cell Phone:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #262930; color: #ffffff;">{$cellPhone}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #262930; color: #9ca3af; font-weight: 600;">Timestamp:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #262930; color: #9ca3af; font-family: monospace; font-size: 12px;">{$timestamp}</td>
        </tr>
      </table>

      <div style="background-color: #0c0d10; border: 1px solid #262930; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 10px 0; color: #10b981; font-size: 13px; text-transform: uppercase; font-family: monospace; letter-spacing: 0.5px;">Tell Me How I Can Help:</h4>
        <p style="margin: 0; color: #e5e7eb; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">{$notes}</p>
      </div>

      <div style="text-align: center; margin-top: 25px;">
        <a href="mailto:{$sanitizedEmail}?subject=Re:%20Vizhin%20Inquiry%20-%20{$sanitizedComp}" style="display: inline-block; background-color: #10b981; color: #04100c; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px;">Reply to {$sanitizedFirst}</a>
      </div>
    </div>
    
    <div style="background-color: #07080a; padding: 16px 30px; border-top: 1px solid #262930; text-align: center; font-size: 11px; color: #6b7280; font-family: monospace;">
      Vizhin LLC &bull; 951 20th St #652, Denver, CO 80201 &bull; Nationwide GTM Solutions
    </div>
  </div>
</body>
</html>
HTML;

// Headers
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Vizhin Website <no-reply@vizhin.co>',
    "Reply-To: {$sanitizedFirst} {$sanitizedLast} <{$sanitizedEmail}>",
    'X-Mailer: PHP/' . phpversion()
];

// Send the email
$sent = @mail($to, $subject, $bodyHtml, implode("\r\n", $headers));

if ($sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully.'
    ]);
} else {
    // If mail function fails on the server
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Unable to send message via the mail server. Please try again or email rreifel@vizhin.co directly.'
    ]);
}
