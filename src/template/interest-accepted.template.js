export const interestAcceptedTemplate = ({
    tenantName,
    listingTitle,
}) => `
<!DOCTYPE html>
<html>
<body>

<h2>Congratulations ${tenantName}! 🎉</h2>

<p>

Your request for

<strong>${listingTitle}</strong>

has been accepted.

</p>

<p>

You can now start chatting with the owner.

</p>

</body>
</html>
`;