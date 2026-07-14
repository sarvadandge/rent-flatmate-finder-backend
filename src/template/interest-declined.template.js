export const interestDeclinedTemplate = ({
    tenantName,
    listingTitle,
}) => `
<!DOCTYPE html>
<html>
<body>

<h2>Hello ${tenantName}</h2>

<p>

Unfortunately your request for

<strong>${listingTitle}</strong>

was declined.

</p>

<p>

Don't worry!

Browse more listings inside the app.

</p>

</body>
</html>
`;