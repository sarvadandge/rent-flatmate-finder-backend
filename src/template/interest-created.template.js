export const interestCreatedTemplate = ({
    ownerName,
    tenantName,
    listingTitle,
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
</head>
<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:30px;">
    <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:8px;">

        <h2 style="color:#2563eb;">
            New Interest Request
        </h2>

        <p>Hello <strong>${ownerName}</strong>,</p>

        <p>
            <strong>${tenantName}</strong>
            is interested in your listing:
        </p>

        <h3>${listingTitle}</h3>

        <p>
            Login to Rent & Flatmate Finder to review
            the request.
        </p>

        <hr>

        <p style="color:#888;">
            Rent & Flatmate Finder
        </p>

    </div>
</body>
</html>
`;