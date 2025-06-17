document.getElementById("dataForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const input = e.target.elements.data.value;
    
    const response = await fetch("/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
    });

    const result = await response.text();
    alert("Server says: " + result);
});
