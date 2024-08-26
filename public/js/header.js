async function loadHeader() {
    await fetch('../header.html')
        .then((response) => response.text())
        .then((data) => {
            document.getElementById('header').innerHTML = data;
        });
}

globalThis.onload = loadHeader;
