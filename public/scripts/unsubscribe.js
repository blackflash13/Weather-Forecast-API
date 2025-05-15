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
            "Invalid unsubscribe link. Token is missing.";
        loadingElement.style.display = "none";

        return false;
    }

    try {
        const response = await fetch(`/api/unsubscribe/${token}`, {
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
                "There was a problem processing your unsubscribe request.";

            return false;
        }

        titleElement.textContent = data.message || "Unsubscribed Successfully";
        titleElement.className = "success";
        messageElement.textContent = "You can close the page";
    } catch (error) {
        loadingElement.style.display = "none";
        titleElement.textContent = "Error";
        titleElement.className = "error";
        messageElement.textContent =
            "Could not connect to the server. Please try again later.";
    }
});
