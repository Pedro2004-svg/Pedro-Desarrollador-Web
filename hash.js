import init, { Hash_md5, Hash_sha256 } from "./pkg/Hash_generator.js";
await init();
document.getElementById("input").addEventListener("input", (e) => {
    const texto = e.target.value;
    if (texto === "") {
    document.getElementById("md5").textContent = "-";
    document.getElementById("sha256").textContent = "-";
    } else {
    document.getElementById("md5").textContent = Hash_md5(texto);
    document.getElementById("sha256").textContent = Hash_sha256(texto);
    }
});
