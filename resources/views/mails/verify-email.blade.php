<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <title>Confirmação de E-mail</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0;">
    <table width="100%" bgcolor="#f6f6f6" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="100%"
                    style="max-width: 600px; background: #ffffff; margin: 40px auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                    <tr>
                        <td style="background-color: #4f46e5; color: #ffffff; padding: 20px; text-align: center;">
                            <h1 style="margin: 0; font-size: 24px;">{{ config('app.name') }}</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="color: #333333;">{{ __('Hello') . ', ' . $username }}!</h2>
                            <p style="color: #555555; font-size: 16px;">
                                {{ __('Thank you for registering. Please click the button below to verify your email address and activate your account.') }}
                            </p>

                            <table cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ $url }}"
                                            style="background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                            {{ __('Verify Email Address') }}
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #999999; font-size: 14px; margin-top: 20px;">
                                {{ __('If you did not create this account, no further action is required.') }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #999999; font-size: 12px;">
                                {{ __("If you're having trouble clicking the \"Verify Email Address\" button, copy and paste the URL below into your web browser: ") }}
                                <a href="{{ $url }}">{{ $url }}</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="background-color: #f0f0f0; text-align: center; padding: 15px; font-size: 12px; color: #888888;">
                            &copy; {{ date('Y') }} {{ config('app.name') }}. {{ __('All rights reserved.') }}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
