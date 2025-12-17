<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input
    $name = filter_var($_POST['name'] ?? '', FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $company = filter_var($_POST['company'] ?? '', FILTER_SANITIZE_STRING);
    $role = filter_var($_POST['role'] ?? '', FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'] ?? '', FILTER_SANITIZE_STRING);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit;
    }
    
    // Email configuration
    $to = 'hector@sdrag.com';
    $subject = 'New SDRAG Contact Form Submission from ' . $name;
    
    // Email body
    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #3b82f6; }
            .label { font-weight: bold; color: #1e293b; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span><br>
                    {$name}
                </div>
                <div class='field'>
                    <span class='label'>Email:</span><br>
                    {$email}
                </div>
                <div class='field'>
                    <span class='label'>Company:</span><br>
                    {$company}
                </div>
                <div class='field'>
                    <span class='label'>Role:</span><br>
                    {$role}
                </div>
                <div class='field'>
                    <span class='label'>Message:</span><br>
                    {$message}
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: SDRAG Contact Form <noreply@sdrag.com>" . "\r\n";
    $headers .= "Reply-To: {$email}" . "\r\n";
    
    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send message']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
