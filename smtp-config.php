<?php
/**
 * SMTP Configuration for Oracle Cloud
 * 
 * Para usar SMTP de Oracle, necesitas configurar PHP con estas credenciales
 * y usar una librería como PHPMailer
 */

return [
    'smtp_host' => 'smtp.tu-servidor-oracle.com',  // Cambia por tu servidor SMTP
    'smtp_port' => 587,  // o 465 para SSL
    'smtp_secure' => 'tls',  // o 'ssl'
    'smtp_username' => 'tu-usuario@sdrag.com',
    'smtp_password' => 'tu-password-smtp',
    'from_email' => 'noreply@sdrag.com',
    'from_name' => 'SDRAG Contact Form',
    'to_email' => 'hector@sdrag.com',
];
