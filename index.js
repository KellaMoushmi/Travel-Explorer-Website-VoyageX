document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page refresh

    const fullName = form.querySelector('input[placeholder="Full Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Email"]').value.trim();
    const subject = form.querySelector('input[placeholder="Subject"]').value.trim();
    const phone = form.querySelector('input[placeholder="Phone Number"]').value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!fullName || !email || !subject || !phone || !message) {
      alert("⚠️ Please fill in all fields before submitting.");
      return;
    }

    // 📧 Your email (replace this with your own email)
    const receiverEmail = "kellamoushmi@gmail.com";

    // Create mailto link
    const mailtoLink = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    )}`;

    // Open user's email app with pre-filled message
    window.location.href = mailtoLink;
  });
});

