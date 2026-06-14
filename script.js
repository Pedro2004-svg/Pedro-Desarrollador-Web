const gns3 = document.getElementById("GNS3");
const keystore = document.getElementById("KeyStore");
const seguridad = document.getElementById("Seguridad");
const modal = document.getElementById("modal");
const cerrarKeystore = document.getElementById("close-keystore");
const cerrargns3 = document.getElementById("close-gns3");
const cerrarseguridad = document.getElementById("close-seguridad");
const toggle = document.getElementById("theme-toggle");
const icon = document.getElementById("toggle-icon");
const main = document.getElementById("carga-pagina");
const overlay_gns3 = document.getElementById("overlay-gns3");
const overlay_keystore = document.getElementById("overlay-keystore");
const overlay_seguridad = document.getElementById("overlay-seguridad");
const header = document.getElementById("header")

let activa = null;
document.body.classList.add("dark")
document.addEventListener("click", (e) => {
  if (activa && e.target === activa) {
    cerrarModal(activa)
    return;
  }

  if (activa && activa.contains(e.target)) return;

  if (document.getElementById("GNS3").contains(e.target)) {
    if (activa) activa.classList.remove("activa");
    overlay_gns3.classList.add("activa");
    activa = overlay_gns3;
    main.classList.add("modal-activa");
    header.style.animation = "slideIn 0.3s ease forwards";

    header.addEventListener('animationend', ()=>{
      header.style.display = "none";
      header.style.animation = '';
    },{ once: true })
    return;
  }

  if (document.getElementById("KeyStore").contains(e.target)) {
    if (activa) activa.classList.remove("activa");
    overlay_keystore.classList.add("activa");
    activa = overlay_keystore;
    main.classList.add("modal-activa");
    header.style.animation = "slideIn 0.3s ease forwards";

    header.addEventListener('animationend', ()=>{
      header.style.display = "none";
      header.style.animation = '';
    },{ once: true })
    return;
  }

  if (document.getElementById("Seguridad").contains(e.target)) {
    if (activa) activa.classList.remove("activa");
    overlay_seguridad.classList.add("activa");
    activa = overlay_seguridad;
    main.classList.add("modal-activa");
    header.style.animation = "slideIn 0.3s ease forwards";

    header.addEventListener('animationend', ()=>{
      header.style.display = "none";
      header.style.animation = '';
    },{ once: true })
    return;
  }

  if (activa) {
    cerrarModal(activa)
  }
});

document.querySelectorAll(".modal-close").forEach(btn => {
  btn.addEventListener("click", () => {
    if (activa) {
      cerrarModal(activa)
    }
  });
});

toggle.addEventListener("click", (e) => {
  toggle.classList.toggle("dark");

  document.body.classList.toggle("dark");
  icon.classList.toggle("ti-sun");
  icon.classList.toggle("ti-moon");
});

function cerrarModal(overlay){
    overlay.style.animation = "slideIn 0.3s ease forwards";

    // Esperar a que termine la animación para ocultarlo
    overlay.addEventListener('animationend', () => {
        overlay.classList.remove('activa');
        overlay.style.animation = ''; // resetear para la próxima vez
        activa = null;
        main.classList.remove("modal-activa");
        header.style.removeProperty("display")
    }, { once: true }); // "once: true" para que el listener se elimine solo
}