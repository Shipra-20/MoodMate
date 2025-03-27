function openJournal() {
    window.open('journal.html', '_blank');
}
document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;

    const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    alert(data.message || data.error);
});
