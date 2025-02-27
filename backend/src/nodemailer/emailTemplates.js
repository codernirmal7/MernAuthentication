export const emailVerificationTemplate = (verificationCode,verificationLink)=>{
    return (
        `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f7;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .email-header {
            background-color: #4a90e2;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }

        .email-body {
            padding: 30px;
            text-align: center;
        }

        .email-body h2 {
            color: #333333;
            font-size: 22px;
            margin-bottom: 20px;
        }

        .verification-code {
            font-size: 32px;
            font-weight: bold;
            background-color: #e7f3e7;
            padding: 10px 20px;
            border-radius: 5px;
            letter-spacing: 4px;
            margin: 20px 0;
            display: inline-block;
        }

        .email-footer {
            padding: 20px;
            background-color: #f4f4f7;
            text-align: center;
            color: #777777;
            font-size: 14px;
        }

        .verify-button {
            display: inline-block;
            padding: 15px 30px;
            margin-top: 20px;
            background-color: #4a90e2;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
        }

        .verify-button:hover {
            background-color: #4a90e2;
        }

        @media screen and (max-width: 600px) {
            .email-container {
                width: 100%;
                margin: 20px 0;
            }

            .email-body h2 {
                font-size: 20px;
            }

            .verification-code {
                font-size: 28px;
                padding: 8px 15px;
            }

            .verify-button {
                padding: 12px 25px;
                font-size: 16px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            Mern Auth
        </div>
        <div class="email-body">
            <h2>Verify Your Email Address</h2>
            <p>Thank you for registering with us. Please use the code below to verify your email address:</p>
            <div class="verification-code">
                ${verificationCode}
            </div>
            <p>If you didn’t request this, please ignore this email.</p>
            <a href="${verificationLink}" class="verify-button">Verify Now</a>
        </div>
        <div class="email-footer">
            &copy; 2024 MernAuth. All rights reserved.<br>
            
        </div>
    </div>
</body>

</html>
`
    )
}

export const WELLCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Service</title>
      <style>
/* Reset some default styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(to right, #a2c2e6, #f4f9fc);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
}

.background {
    position: relative;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.7) 40%, rgba(0, 0, 0, 0.1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: #ffffff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
    text-align: center;
    animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

header h1 {
    font-size: 2.5rem;
    color: #007bff;
    margin-bottom: 15px;
    transition: color 0.3s ease;
}

header h1:hover {
    color: #0056b3;
}

header p {
    font-size: 1.2rem;
    color: #495057;
    margin-bottom: 25px;
}

main {
    margin-top: 20px;
}

.welcome-message p {
    font-size: 1.1rem;
    margin-bottom: 30px;
    line-height: 1.6;
    color: #212529;
}

.btn {
    display: inline-block;
    padding: 15px 30px;
    font-size: 1.1rem;
    color: #ffffff;
    background-color: #007bff;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
}

footer {
    margin-top: 30px;
    font-size: 0.9rem;
    color: #6c757d;
}

@media (max-width: 600px) {
    .container {
        padding: 20px;
    }

    header h1 {
        font-size: 2rem;
    }

    .welcome-message p {
        font-size: 1rem;
    }

    .btn {
        padding: 12px 24px;
        font-size: 1rem;
    }
}


      </style>

</head>
<body>
    <div class="background">
        <div class="container">
            <header>
                <h1>Welcome to MernAuth!</h1>
                <p>We’re excited to have you with us.</p>
            </header>
            <main>
                <div class="welcome-message">
                    <p>Your account has been successfully created and verified. We can’t wait for you to explore!</p>
                    <a href="#" class="btn">Go to Dashboard</a>
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Our Service. All rights reserved.</p>
            </footer>
        </div>
    </div>
</body>
</html>


`;

export const loginCodeTemplate = (name,loginCode)=>{
    return (
        `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            background: #007BFF;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            text-align: center;
        }
        .email-body h2 {
            margin: 0;
            font-size: 20px;
            color: #007BFF;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.5;
            color: #555555;
        }
        .code {
            display: inline-block;
            font-size: 24px;
            font-weight: bold;
            background: #f1f1f1;
            padding: 10px 20px;
            border-radius: 4px;
            color: #007BFF;
            margin-top: 10px;
        }
        .email-footer {
            background: #f4f4f4;
            color: #888888;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
        .email-footer a {
            color: #007BFF;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .email-header h1, .email-body h2 {
                font-size: 18px;
            }
            .email-body p {
                font-size: 14px;
            }
            .code {
                font-size: 20px;
                padding: 8px 16px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Your Login Code</h1>
        </div>
        <div class="email-body">
            <h2>Hi ${name},</h2>
            <p>We received a request to log in to your account from a new device. Please use the following code to complete your login:</p>
            <div class="code">${loginCode}</div>
            <p>If you did not request this login, you can ignore this email. If you have any questions, feel free to contact us.</p>
        </div>
        <div class="email-footer">
            <p>Best regards,<br>Your Company</p>
            <p><a href="#">Visit our website</a></p>
        </div>
    </div>
</body>
</html>

`

        
    )
}

export  const loginNotificationTemplate = (userAgent, ipAddress,name)=>{
    return (
        `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border: 1px solid #dddddd;
        }
        .email-header {
            background-color: #007BFF;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            text-align: center;
        }
        .email-body h2 {
            margin: 0;
            font-size: 20px;
            color: #007BFF;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
            margin-top: 10px;
        }
        .email-info {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
            font-size: 14px;
            color: #333333;
        }
        .email-info strong {
            display: block;
            margin-bottom: 5px;
            color: #007BFF;
        }
        .email-footer {
            background-color: #f4f4f4;
            color: #888888;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
        .email-footer a {
            color: #007BFF;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .email-header h1, .email-body h2 {
                font-size: 18px;
            }
            .email-body p {
                font-size: 14px;
            }
            .email-info {
                font-size: 13px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <h1>Successful Login Notification</h1>
        </div>

        <!-- Email Body -->
        <div class="email-body">
            <h2>Hello ${name},</h2>
            <p>We noticed a successful login to your account. Here are the details:</p>
            
            <!-- User Agent and IP Address Information -->
            <div class="email-info">
                <strong>Login Device Information:</strong>
                <p>User Agent: <em>${userAgent}</em></p>
                <p>IP Address: <em>${ipAddress}</em></p>
            </div>

            <p>If this was you, no further action is needed. If you didn't log in, please reset your password and secure your account immediately.</p>
        </div>

        <!-- Email Footer -->
        <div class="email-footer">
            <p>Stay secure, <br>Your Company</p>
            <p><a href="#">Visit our website</a> | <a href="#">Contact support</a></p>
        </div>
    </div>
</body>
</html>

        `
    )
}

export const resetPasswordTemplate = (resetPasswordLink,name)=>{
    return (
        `
           <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f7;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: none;
            width: 100% !important;
            height: 100% !important;
        }

        .email-wrapper {
            width: 100%;
            background-color: #f4f4f7;
            padding: 20px;
        }

        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .email-header {
            background-color: #4a90e2;
            padding: 20px;
            text-align: center;
        }

        .email-header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 30px;
        }

        .email-body h2 {
            font-size: 20px;
            margin: 0 0 20px;
            color: #333333;
        }

        .email-body p {
            margin: 0 0 20px;
            font-size: 16px;
            line-height: 1.5;
            color: #666666;
        }

        .email-body a.button {
            display: inline-block;
            background-color: #4a90e2;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }

        .email-footer {
            background-color: #f4f4f7;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666666;
        }

        .email-footer p {
            margin: 0;
        }

        @media only screen and (max-width: 600px) {
            .email-body {
                padding: 20px;
            }

            .email-header h1 {
                font-size: 20px;
            }

            .email-body h2 {
                font-size: 18px;
            }

            .email-body p {
                font-size: 14px;
            }

            .email-body a.button {
                padding: 10px 20px;
                font-size: 14px;
            }
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <h1>Password Reset Request</h1>
            </div>
            <div class="email-body">
                <h2>Hello ${name},</h2>
                <p>We received a request to reset your password. Click the button below to reset it.</p>
                <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                <p>This password reset is only valid for the next 1 hours.</p>
                <a href="${resetPasswordLink}" class="button">Reset Password</a>
            </div>
            <div class="email-footer">
                <p>If you’re having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
                <p><a href="${resetPasswordLink}" style="color: #4a90e2;">${resetPasswordLink}</a></p>
            </div>
        </div>
    </div>
</body>

</html>

        `
    )
}


export const resetPasswordSuccessfulTemple = (name,signInUrl)=>{
    return (
        `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f7;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: none;
            width: 100% !important;
            height: 100% !important;
        }

        .email-wrapper {
            width: 100%;
            background-color: #f4f4f7;
            padding: 20px;
        }

        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .email-header {
            background-color: #4a90e2;
            padding: 20px;
            text-align: center;
        }

        .email-header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 30px;
        }

        .email-body h2 {
            font-size: 20px;
            margin: 0 0 20px;
            color: #333333;
        }

        .email-body p {
            margin: 0 0 20px;
            font-size: 16px;
            line-height: 1.5;
            color: #666666;
        }

        .email-body a.button {
            display: inline-block;
            background-color: #4a90e2;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }

        .email-footer {
            background-color: #f4f4f7;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666666;
        }

        .email-footer p {
            margin: 0;
        }

        @media only screen and (max-width: 600px) {
            .email-body {
                padding: 20px;
            }

            .email-header h1 {
                font-size: 20px;
            }

            .email-body h2 {
                font-size: 18px;
            }

            .email-body p {
                font-size: 14px;
            }

            .email-body a.button {
                padding: 10px 20px;
                font-size: 14px;
            }
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <h1>Password Reset Successful</h1>
            </div>
            <div class="email-body">
                <h2>Hello ${name},</h2>
                <p>Your password has been successfully reset. You can now sign in using your new password.</p>
                <p>If you did not make this change, please contact our support team immediately.</p>
                <a href="${signInUrl}" class="button">Sign In Now</a>
            </div>
            <div class="email-footer">
                <p>If you’re having trouble clicking the "Log In Now" button, copy and paste the URL below into your web browser:</p>
                <p><a href="${signInUrl}" style="color: #4a90e2;">${signInUrl}</a></p>
            </div>
        </div>
    </div>
</body>

</html>

        `
    )
}