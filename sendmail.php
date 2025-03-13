<?php
// Configuración de reCAPTCHA v3 - ¡Obtener claves de https://www.google.com/recaptcha/admin/!
$secretKey = '6Lf_gfMqAAAAABJpf-L1mEeorZ71dOgGM1d2AwQA';
$siteKey = '6Lf_gfMqAAAAAK0-l1cn-aCkQZFvimhgD2-eg7b3';

// Verificar token de reCAPTCHA
$recaptchaResponse = $_POST['g-recaptcha-response'];
$verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$recaptchaResponse}");
$responseData = json_decode($verifyResponse);

if (!$responseData->success) {
    http_response_code(400);
    die('Error de verificación reCAPTCHA');
}

// Validar y sanitizar datos del formulario
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Configurar cabeceras del correo
$to = 'contacto@agencialeondigital.com';
$headers = "From: {$email}\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Construir cuerpo del mensaje
$emailBody = "Nombre: {$name}\n";
$emailBody .= "Email: {$email}\n";
$emailBody .= "Teléfono: {$phone}\n\n";
$emailBody .= "Mensaje:\n{$message}";

// Enviar correo usando la función mail() de PHP
if (mail($to, $subject, $emailBody, $headers)) {
    echo 'Mensaje enviado correctamente';
} else {
    http_response_code(500);
    echo 'Error al enviar el mensaje';
}
?>