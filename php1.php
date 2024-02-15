<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $rating = $_POST['rating']; 
    
    
    $to = "barathr144@gmail.com"; 
    
    
    $subject = "New message from your website";
    $body = "Name: $name\nEmail: $email\nRating: $rating\n\nMessage:\n$message"; 

    
    if (mail($to, $subject, $body)) {
        
        $user_subject = "Thank you for your message";
        $user_body = "Dear $name,\n\nThank you for contacting me. We have received your message and rating, and will get back to you as soon as possible.\n\nBest regards,\nYour Name";
        mail($email, $user_subject, $user_body);
        
        echo "Message sent successfully. Thank you!";
    } else {
        
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    
    echo "Oops! There was a problem with your submission. Please try again.";
}

