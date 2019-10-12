import dotenv from "dotenv";
import mailer from "@sendgrid/mail";
import * as template from "./templates";

dotenv.config();

export default async (to, action, data) => {
  const { SENDGRID_API_KEY, EMAIL_SENDER, NODE_ENV } = process.env;

  mailer.setApiKey(SENDGRID_API_KEY);

  const notifier = template[action](data);
  const mottos = [
    "Put your kids on the head of their peers",
    "Connecting student with teacher"
  ];
  const motto = mottos[Math.floor(Math.random() * mottos.length)];
  const message = {
    to,
    from: EMAIL_SENDER,
    subject: notifier.subject,
    fromname: "Nivelo Lab",
    text: "Nivelo",
    html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">

    <!--HEADER -->

    <tbody>
        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td align="center" valign="top" background="https://images.pexels.com/photos/1936299/pexels-photo-1936299.jpeg?cs=srgb&dl=artificial-intelligence-codes-developing-1936299.jpg&fm=jpg" bgcolor="#66809b" style="background-size:cover; background-position:top;height=" 400 ""="">
                                <table class="col-600" width="600" height="400" border="0" align="center" cellpadding="0" cellspacing="0">

                                    <tbody>
                                        <tr>
                                            <td height="4"></td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 5px;">
                                                <span style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:39px; font-weight: 300; letter-spacing: 5px;">WELCOME TO</span>
                                                <br>
                                                <br /> NIVELO LAB
                                                <br/>
                                                <br/>
                                                <br/>
                                                <div style="font-family: 'Lato', sans-serif; font-size:15px; color:#ffffff; font-weight: 300;">
                                                    ${motto}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="1"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>

        <!-- END HEADERR -->

        <!-- START TITLE -->

        <tr>
            <td align="center">
                <table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td align="center" bgcolor="#333">
                                <table class="col-600" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td height="33"></td>
                                        </tr>
                                        <tr>
                                            <td>

                                                <table class="col1" width="183" border="0" align="left" cellpadding="0" cellspacing="0">

                                                    <tbody>
                                                        <tr>
                                                            <td height="18"></td>
                                                        </tr>

                                                        <tr>
                                                            <td align="center">
                                                                <img style="display:block; line-height:0px; font-size:0px; border:0px;" class="images_style" src="https://webdevtrick.com/wp-content/uploads/email-template.png" alt="img" width="156" height="160">
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table class="col3_one" width="380" border="0" align="right" cellpadding="0" cellspacing="0">

                                                    <tbody>

                                                        <tr>
                                                            <td height="5"></td>
                                                        </tr>

                                                        <tr align="left" valign="top">
                                                            <td style="font-family: 'Lato', sans-serif; font-size:14px; color:#fff; line-height:24px; font-weight: 300;">
                                                                ${notifier.html}
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td height="10"></td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="33"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>

        <!-- END TITLE -->

        <!-- START SHOWCASE -->

        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                    <tbody>
                        <tr>
                            <td height="35"></td>
                        </tr>

                        <tr>
                            <td align="center" style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#333;">Know more...</td>
                        </tr>

                        <tr>
                            <td height="10"></td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>

        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9; ">
                    <tbody>
                        <tr>
                            <td height="10"></td>
                        </tr>
                        <tr>
                            <td>

                                <table class="col3" width="183" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td height="30"></td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <table class="insider" width="133" border="0" align="center" cellpadding="0" cellspacing="0">

                                                    <tbody>
                                                        <tr align="center" style="line-height:0px;">
                                                            <td>
                                                                <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://webdevtrick.com/wp-content/uploads/email.png" width="78" height="78" alt="icon">
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td height="15"></td>
                                                        </tr>

                                                        <tr align="center">
                                                            <td style="font-family: 'Raleway', Arial, sans-serif; font-size:20px; color:#333; line-height:24px; font-weight: bold;">Contact</td>
                                                        </tr>

                                                        <tr>
                                                            <td height="10"></td>
                                                        </tr>

                                                        <tr align="center">
                                                            <td style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">Lorem ipsum dolor sit amet.</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="30"></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table width="1" height="20" border="0" cellpadding="0" cellspacing="0" align="left">
                                    <tbody>
                                        <tr>
                                            <td height="20" style="font-size: 0;line-height: 0;border-collapse: collapse;">
                                                <p style="padding-left: 24px;">&nbsp;</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table class="col3" width="183" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td height="30"></td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <table class="insider" width="133" border="0" align="center" cellpadding="0" cellspacing="0">

                                                    <tbody>
                                                        <tr align="center" style="line-height:0px;">
                                                            <td>
                                                                <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://webdevtrick.com/wp-content/uploads/work.png" width="78" height="78" alt="icon">
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td height="15"></td>
                                                        </tr>

                                                        <tr align="center">
                                                            <td style="font-family: 'Raleway', sans-serif; font-size:20px; color:#333; line-height:24px; font-weight: bold;">About</td>
                                                        </tr>

                                                        <tr>
                                                            <td height="10"></td>
                                                        </tr>

                                                        <tr align="center">
                                                            <td style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">Lorem ipsum dolor sit amet.</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="30"></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table width="1" height="20" border="0" cellpadding="0" cellspacing="0" align="left">
                                    <tbody>
                                        <tr>
                                            <td height="20" style="font-size: 0;line-height: 0;border-collapse: collapse;">
                                                <p style="padding-left: 24px;">&nbsp;</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table class="col3" width="183" border="0" align="right" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td height="30"></td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <table class="insider" width="133" border="0" align="center" cellpadding="0" cellspacing="0">

                                                    <tbody>
                                                        <tr align="center" style="line-height:0px;">
                                                            <td>
                                                                <img style="display:block; line-height:0px; font-size:0px; border:0px;" src="https://webdevtrick.com/wp-content/uploads/computer.png" width="78" height="78" alt="icon">
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td height="15"></td>
                                                        </tr>

                                                        <tr align="center">
                                                            <td style="font-family: 'Raleway',  sans-serif; font-size:20px; color:#333; line-height:24px; font-weight: bold;">Services</td>
                                                        </tr>

                                                        <tr>
                                                            <td height="10"></td>
                                                        </tr>

                                                        <tr align="center">
                                                            <td style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">Lorem ipsum dolor sit amet.</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="30"></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>

        <tr>
            <td height="5"></td>
        </tr>

        <!-- END SHOWCASE -->
        <!--ABOUT -->

        <tr>
            <td align="center">
                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px;">

                    <tbody>
                        <tr>
                            <td align="center">
                                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                    <tbody>
                                        <tr>
                                            <td height="50"></td>
                                        </tr>
                                        <tr>
                                            <td align="right">

                                                <table class="col2" width="287" border="0" align="right" cellpadding="0" cellspacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" style="line-height:0px;">
                                                                <img style="display:block; line-height:0px; font-size:0px; border:0px;" class="images_style" src="https://webdevtrick.com/wp-content/uploads/email-template-1.png" width="169" height="138">
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table width="287" border="0" align="left" cellpadding="0" cellspacing="0" class="col2" style="">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center">
                                                                <table class="insider" width="237" border="0" align="center" cellpadding="0" cellspacing="0">

                                                                    <tbody>
                                                                        <tr align="left">
                                                                            <td style="font-family: 'Raleway', sans-serif; font-size:23px; color:#333; line-height:30px; font-weight: bold;">Our Services</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td height="5"></td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td style="font-family: 'Lato', sans-serif; font-size:14px; color:#7f8c8d; line-height:24px; font-weight: 300;">
                                                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis maximus mollis. Aenean purus magna, dignissim in aliquam quis, ullamcorper a dui.
                                                                            </td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        <!-- END ABOUT -->

                        <!-- CHECKOUT BELOW -->

                        <tr>
                            <td align="center">
                                <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                    <tbody>
                                        <tr>
                                            <td height="50"></td>
                                        </tr>
                                        <tr>

                                            <td align="center" bgcolor="#333">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        <!-- END CHECKOUT BELOW -->

                        <!-- START FOOTER -->

                        <tr>
                            <td align="center">
                                <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                    <tbody>
                                        <tr>
                                            <td height="50"></td>
                                        </tr>
                                        <tr>
                                            <td align="center" bgcolor="#333" height="185">
                                                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td height="25"></td>
                                                        </tr>

                                                        <tr>
                                                            <td align="center" style="font-family: 'Raleway',  sans-serif; font-size:26px; font-weight: 500; color:#fbb016; background-color: #333;">Follow Us On Social Media</td>
                                                        </tr>

                                                        <tr>
                                                            <td height="25"></td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                                <table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" width="30%" style="vertical-align: top;">
                                                                <a href="https://www.facebook.com/designmodo" target="_blank"> <img src="https://webdevtrick.com/wp-content/uploads/icon-twitter.png"> </a>
                                                            </td>

                                                            <td align="center" class="margin" width="30%" style="vertical-align: top;">
                                                                <a href="https://twitter.com/designmodo" target="_blank"> <img src="https://webdevtrick.com/wp-content/uploads/icon-fb.png"> </a>
                                                            </td>

                                                            <td align="center" width="30%" style="vertical-align: top;">
                                                                <a href="https://plus.google.com/+Designmodo/posts" target="_blank"> <img src="https://webdevtrick.com/wp-content/uploads/icon-googleplus.png"> </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">

                                                    <tr>
                                                        <td>
                                                            <div style="padding:20px;text-align:center;color:#efefef;">
                                                                <b>"${motto}"</b>
                                                            </div>
                                                            <div style="padding:35px 20px;text-align:center;color:#efefef;">
                                                                Copyright, 2019
                                                                <br> Nivelo Lab
                                                                <br>
                                                                <br>
                                                                <div style="text-align:center;color:#989898;">
                                                                    ${notifier.notice ||
                                                                      ""}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                </table>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>

        <!-- END FOOTER -->

    </tbody>
</table>`
  };
  return NODE_ENV === "test" ? true : mailer.send(message);
};
