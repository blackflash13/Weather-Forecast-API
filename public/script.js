document.addEventListener("DOMContentLoaded", function () {
    const subscriptionForm = document.getElementById("subscriptionForm");

    if (subscriptionForm) {
        subscriptionForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const city = document.getElementById("city").value;
            const frequency = document.getElementById("frequency").value;
            const messageDiv = document.getElementById("message");
            const submitButton = document.querySelector(
                'button[type="submit"]',
            );

            submitButton.disabled = true;
            submitButton.innerHTML = "Subscribing...";

            try {
                const response = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, city, frequency }),
                });

                const data = await response.json();

                if (response.ok) {
                    messageDiv.innerHTML = `
                        <div class="alert alert-success">
                            ${data.message || "Subscription created! Please check your email to confirm."}
                        </div>
                    `;
                    subscriptionForm.reset();
                } else {
                    throw new Error(data.message || "Something went wrong");
                }
            } catch (error) {
                messageDiv.innerHTML = `
                    <div class="alert alert-danger">
                        ${error.message}
                    </div>
                `;
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = "Subscribe";
            }
        });
    }
});
