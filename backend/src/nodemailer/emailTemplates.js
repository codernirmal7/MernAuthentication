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
            background-color: #4CAF50;
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
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
        }

        .verify-button:hover {
            background-color: #45a049;
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
                    <p>Your account has been successfully created. We can’t wait for you to explore!</p>
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
