export const getPasswordResetTemplate = (url: string) => ({
  subject: "Password Reset Request",
  text: `You requested a password reset. Click on the link to reset your password: ${url}`,
  html: `<!doctype html><html lang="en-US"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/><title>Reset Password Email Template</title><meta name="description" content="Reset Password Email Template."><style type="text/css">a:hover{text-decoration:underline!important}</style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"><!--100%body table--><table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"><tr><td><table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td style="height:80px;">&nbsp;</td></tr><tr><td style="text-align:center;"></a></td></tr><tr><td style="height:20px;">&nbsp;</td></tr><tr><td><table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"><tr><td style="height:40px;">&nbsp;</td></tr><tr><td style="padding:0 35px;"><h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have requested to reset your password</h1><span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span><p style="color:#455056; font-size:15px;line-height:24px; margin:0;">A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions.</p><a target="_blank" href="${url}" style="background:#2f89ff;text-decoration:none !important; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset Password</a></td></tr><tr><td style="height:40px;">&nbsp;</td></tr></table></td><tr><td style="height:20px;">&nbsp;</td></tr><tr><td style="text-align:center;"><p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy;</p></td></tr><tr><td style="height:80px;">&nbsp;</td></tr></table></td></tr></table><!--/100%body table--></body></html>`,
});

export const getVerifyEmailTemplate = (url: string, code: string) => ({
  subject: "Verify Email Address",
  text: `Click on the link and enter the code below to verify your email address: ${url} Code: ${code}`,
  html: `<!doctype html>
<html lang="en-US">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <title>Verify Email Address</title>
    <meta name="description" content="Verify Email Address Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important}
        .verification-code {
            font-size: 24px;
            font-weight: bold;
            color: #1e1e2d;
            letter-spacing: 2px;
            margin: 20px 0;
            padding: 10px;
            background: #f5f5f5;
            border-radius: 5px;
            display: inline-block;
        }
    </style>
</head>
<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr><td>
            <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                <tr><td style="height:80px;">&nbsp;</td></tr>
                <tr><td style="text-align:center;"></td></tr>
                <tr><td style="height:20px;">&nbsp;</td></tr>
                <tr><td>
                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px; background:#fff; border-radius:3px; text-align:center; -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06); -moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06); box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                        <tr><td style="height:40px;">&nbsp;</td></tr>
                        <tr>
                            <td style="padding:0 35px;">
                                <h1 style="color:#1e1e2d; font-weight:500; margin:0; font-size:32px; font-family:'Rubik',sans-serif;">Please verify your email address</h1>
                                <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                <p style="color:#455056; font-size:15px; line-height:24px; margin:0;">Click on the following link to verify your email address and use the verification code below when prompted.</p>
                                <div style="font-size:24px; font-weight:bold; color:#1e1e2d; letter-spacing:2px; margin:20px 0; padding:10px; background: #f5f5f5; display: inline-block;  ">${code}</div>
                                <a target="_blank" href="${url}" style="background:#1338BE; text-decoration:none !important; font-weight:500; margin-top:24px; color:#fff; text-transform:uppercase; font-size:14px; padding:10px 24px; display:inline-block; border-radius:50px;">Verify Email Address</a>
                            </td>
                        </tr>
                        <tr><td style="height:40px;">&nbsp;</td></tr>
                    </table>
                </td></tr>
                <tr><td style="height:20px;">&nbsp;</td></tr>
                <tr><td style="text-align:center;">
                    <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; ${new Date().getFullYear()} Church Management System</p>
                </td></tr>
                <tr><td style="height:80px;">&nbsp;</td></tr>
            </table>
        </td></tr>
    </table>
</body>
</html>`
});
