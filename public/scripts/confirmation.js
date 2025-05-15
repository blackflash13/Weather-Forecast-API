document.addEventListener("DOMContentLoaded", async () => {
    const titleElement = document.getElementById("title");
    const messageElement = document.getElementById("message");
    const loadingElement = document.getElementById("loading");
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
        titleElement.textContent = "Error";
        titleElement.className = "error";
        messageElement.textContent =
            "Invalid confirmation link. Token is missing.";
        loadingElement.style.display = "none";

        return false;
    }

    try {
        const response = await fetch(`/api/confirm/${token}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        const data = await response.json();
        loadingElement.style.display = "none";

        if (!response.ok) {
            titleElement.textContent = "Error";
            titleElement.className = "error";
            messageElement.textContent =
                data.message ||
                "There was a problem confirming your subscription.";

            return false;
        }

        titleElement.textContent = "Subscription Confirmed";
        titleElement.className = "success";
        messageElement.textContent =
            data.message ||
            "Your subscription has been successfully confirmed. You will now receive weather updates for your city.";
    } catch (error) {
        loadingElement.style.display = "none";
        titleElement.textContent = "Error";
        titleElement.className = "error";
        messageElement.textContent =
            "Could not connect to the server. Please try again later.";
    }
});
