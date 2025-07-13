<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;
use Str;

class CustomVerifyEmail extends VerifyEmail
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }


    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(__('Confirm your email address'))
            ->view('mails.verify-email', [
                'url' => $this->verificationUrl($notifiable),
                'username' => $notifiable->username
            ]);
    }

    protected function verificationUrl($notifiable)
    {
        $temporarySignedUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
            ]
        );


        $temporarySignedUrl = request()->header("Origin") ? str_replace(Str::beforeLast(url()->current(), '/'), request()->header("Origin"), $temporarySignedUrl) : $temporarySignedUrl;

        return $temporarySignedUrl;
    }
}
