import transporter from "../config/mail.js";
import { interestCreatedTemplate } from "../template/interest-created.template.js";
import { interestAcceptedTemplate } from "../template/interest-accepted.template.js";
import { interestDeclinedTemplate } from "../template/interest-declined.template.js";

export const sendEmail = async ({
    to,
    subject,
    html,
}) => {

    await transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });

};

export const sendInterestCreatedEmail = async ({ ownerName, ownerMail, tenantName, listingTitle }) => {
    const html = interestCreatedTemplate({ ownerName, tenantName, listingTitle });

    await sendEmail({
        to: ownerMail,
        subject: "New Interest Request",
        html,
    });
};

export const sendInterestAcceptedEmail = async ({ tenantName, tenantMail, listingTitle }) => {
    const html = interestAcceptedTemplate({ tenantName, listingTitle });

    await sendEmail({
        to: tenantMail,
        subject: "Interest Accepted",
        html,
    });
}

export const sendInterestDeclinedEmail = async ({ tenantName, tenantMail, listingTitle }) => {
    const html = interestDeclinedTemplate({ tenantName, listingTitle });

    await sendEmail({
        to: tenantMail,
        subject: "Interest Declined",
        html,
    });

}