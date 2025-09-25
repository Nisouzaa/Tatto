// Menu responsivo
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("active");
}

// Formulário de cadastro
document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("msg-sucesso").style.display = "block";
    this.reset();
  });

// Logo Animado
const logoImg = document.querySelector("#logo img");

document.addEventListener("DOMContentLoaded", () => {
  let logoImg = document.querySelector("#logo img");

  setTimeout(() => {
    logoImg.classList.add("Show");
  }, 300);

  if (localStorage.getItem("mostrarElemento") === "true") {
    logoImg.classList.add("Show");
  }
});

// Script da galeria
const modal = document.getElementById("modal");
const modalImg = document.getElementById("img-ampliada");
const fechar = document.querySelector(".fechar");
const imagens = document.querySelectorAll(".galeria-item img");

document.addEventListener("DOMContentLoaded", () => {
  // abrir modal
  imagens.forEach((img) => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.style.display = "grid";
      requestAnimationFrame(() => modal.classList.add("show"));
      modal.setAttribute("aria-hidden", "false");
    });
  });
});

// fechar modal
function fecharModal() {
  modal.classList.remove("show");
  modal.addEventListener(
    "transitionend",
    () => {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      modalImg.src = "";
    },
    { once: true }
  );
}

fechar?.addEventListener("click", fecharModal);

// fechar fora da imagem
modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

// fechar com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharModal();
});

// Slideshow
document.addEventListener("DOMContentLoaded", () => {
  // Aceita #slideshow ou #slides como trilho
  const track =
    document.querySelector("#slideshow") || document.querySelector("#slides");
  if (!track) {
    console.error("Elemento #slideshow ou #slides não encontrado.");
    return;
  }

  const images = Array.from(track.querySelectorAll("img"));
  if (!images.length) {
    console.error("Nenhuma <img> encontrada dentro do slideshow.");
    return;
  }

  // Lê o gap definido no CSS (flex gap)
  const styles = getComputedStyle(track);
  const gapPx =
    parseFloat(
      styles.getPropertyValue("column-gap") ||
        styles.getPropertyValue("gap") ||
        "0"
    ) || 0;

  // Garante que as imagens carregaram (para offsetWidth correto)
  const waitForImages = (imgs) =>
    Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) =>
              img.addEventListener("load", res, { once: true })
            )
      )
    );

  waitForImages(images).then(() => {
    let index = 0;
    let direction = 1; // 1 = vai; -1 = volta
    const intervaloMs = 2000;

    // Estilos mínimos para animar suavemente
    track.style.display = "flex";
    track.style.transition = "transform 600ms ease-in-out";

    const step = () => {
      const slideWidth = images[0].offsetWidth + gapPx;
      index += direction;

      if (index >= images.length - 1) direction = -1;
      else if (index <= 0) direction = 1;

      track.style.transform = `translateX(${-index * slideWidth}px)`;
    };

    let timer = setInterval(step, intervaloMs);

    // Pausa ao passar o mouse
    track.addEventListener("mouseenter", () => clearInterval(timer));
    track.addEventListener(
      "mouseleave",
      () => (timer = setInterval(step, intervaloMs))
    );
  });
});
