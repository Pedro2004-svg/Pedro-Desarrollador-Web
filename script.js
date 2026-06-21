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
const header = document.getElementById("header");

const opciones = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15,
};

let activa = null;
let formyano = 0;
let tecno = 0;
let scrollYGuardado = 0;

// Bloqueo de scroll robusto para el fondo cuando hay un modal abierto.
//
// 1) Tocamos "html" Y "body" a la vez: si solo bloqueas "body", en cuanto
//    "html" tiene un overflow-x propio (como aquí, para evitar el scroll
//    horizontal fantasma), Chrome/Safari dejan de "delegar" el scroll de
//    la página en el body y pasan a usar "html" como el verdadero
//    elemento que scrollea — por eso bloquear solo body dejaba de servir.
// 2) Tocamos solo "overflow-y" (no el shorthand "overflow"), para no
//    pisar el "overflow-x: hidden" fijo que ya tienen por CSS.
// 3) Además fijamos con position:fixed, porque en iOS Safari
//    "overflow: hidden" por sí solo no basta para bloquear el scroll
//    táctil (efecto "rebote") por debajo del modal.
function bloquearScroll() {
  scrollYGuardado = window.scrollY;
  document.documentElement.style.overflowY = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollYGuardado}px`;
  document.body.style.left = "0";
  document.body.style.width = "100%";
  document.body.style.overflowY = "hidden";
}

function desbloquearScroll() {
  document.documentElement.style.overflowY = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.width = "";
  document.body.style.overflowY = "";

  // Restaurar la posición de scroll de golpe, sin que se vea la animación
  // de "scroll-behavior: smooth" del resto de la página
  const htmlEl = document.documentElement;
  const comportamientoPrevio = htmlEl.style.scrollBehavior;
  htmlEl.style.scrollBehavior = "auto";
  window.scrollTo(0, scrollYGuardado);
  htmlEl.style.scrollBehavior = comportamientoPrevio;
}

document.body.classList.add("dark");

document.addEventListener("click", (e) => {
  if (activa && e.target === activa) {
    cerrarModal(activa);
    return;
  }

  if (activa && activa.contains(e.target)) return;

  if (document.getElementById("GNS3").contains(e.target)) {
    if (activa) activa.classList.remove("activa");
    overlay_gns3.classList.add("activa");
    activa = overlay_gns3;
    main.classList.add("modal-activa");
    bloquearScroll();
    header.style.animation = "slideIn 0.3s ease forwards";

    header.addEventListener(
      "animationend",
      () => {
        header.style.display = "none";
        header.style.animation = "";
      },
      { once: true },
    );
    return;
  }

  if (document.getElementById("KeyStore").contains(e.target)) {
    if (activa) activa.classList.remove("activa");
    overlay_keystore.classList.add("activa");
    activa = overlay_keystore;
    main.classList.add("modal-activa");
    bloquearScroll();
    header.style.animation = "slideIn 0.3s ease forwards";

    header.addEventListener(
      "animationend",
      () => {
        header.style.display = "none";
        header.style.animation = "";
      },
      { once: true },
    );
    return;
  }

  if (document.getElementById("Seguridad").contains(e.target)) {
    if (activa) activa.classList.remove("activa");
    overlay_seguridad.classList.add("activa");
    activa = overlay_seguridad;
    main.classList.add("modal-activa");
    header.style.animation = "slideIn 0.3s ease forwards";
    bloquearScroll();

    header.addEventListener(
      "animationend",
      () => {
        header.style.display = "none";
        header.style.animation = "";
      },
      { once: true },
    );
    return;
  }

  if (activa) {
    cerrarModal(activa);
  }
});

document.querySelectorAll(".modal-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (activa) {
      cerrarModal(activa);
    }
  });
});

toggle.addEventListener("click", (e) => {
  toggle.classList.toggle("dark");

  document.body.classList.toggle("dark");
  icon.classList.toggle("ti-sun");
  icon.classList.toggle("ti-moon");
});

function cerrarModal(overlay) {
  overlay.style.animation = "slideIn 0.3s ease forwards";

  // Esperar a que termine la animación para ocultarlo
  overlay.addEventListener(
    "animationend",
    () => {
      overlay.classList.remove("activa");
      overlay.style.animation = ""; // resetear para la próxima vez
      activa = null;
      main.classList.remove("modal-activa");
      document.body.classList.remove("modal-abierta"); // por si quedó de una versión anterior
      desbloquearScroll();
      document.getElementById("input").value = "";
      document.getElementById("md5").textContent = "-";
      document.getElementById("sha256").textContent = "-";
      header.style.removeProperty("display");
    },
    { once: true },
  ); // "once: true" para que el listener se elimine solo
}

const observadorProyectos = new IntersectionObserver((entradas, observador) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("mostrar");
      observadorProyectos.unobserve(entrada.target);
    }
  });
}, opciones);

const observar = document.querySelectorAll(".oculto");

observar.forEach((observar) => {
  observadorProyectos.observe(observar);
});

setTimeout(() => {
  const intervaltecno = setInterval(() => {
    if (tecno < 10) {
      tecno++;
      document.getElementById("tecno").innerHTML = tecno + " +";
    } else {
      clearInterval(intervaltecno);
    }
  }, 100);

  const intervalformyano = setInterval(() => {
    if (formyano < 3) {
      formyano++;
      document.getElementById("ano").innerHTML = formyano + " +";
      document.getElementById("form").innerHTML = formyano;
    } else {
      clearInterval(intervalformyano);
    }
  }, 150);
}, 800);

const hamburger = document.getElementById("hamburger");
const navBar = document.querySelector(".nav-bar");

hamburger.addEventListener("click", () => {
  navBar.classList.toggle("active");

  // Opcional: Cambiar las barras a forma de "X"
  hamburger.classList.toggle("is-active");
});

// Cerrar al hacer clic en cualquier enlace del menú
document.querySelectorAll(".nav-bar a").forEach((n) =>
  n.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamburger.classList.remove("is-active");
  }),
);