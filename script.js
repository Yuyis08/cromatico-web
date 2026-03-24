/*CARRUSEL*/
document.querySelectorAll('.carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('.carousel-img');
  let index = 0;
  let interval;

  const showImage = i => {
    images.forEach(img => img.classList.remove('active'));
    images[i].classList.add('active');
  };

  carousel.addEventListener('mouseenter', () => {
    interval = setInterval(() => {
      index = (index + 1) % images.length;
      showImage(index);
    }, 1500);
  });

  carousel.addEventListener('mouseleave', () => {
    clearInterval(interval);
  });

  // Swipe móvil
  let startX = 0;
  carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) index++;
    if (diff < -50) index--;
    index = (index + images.length) % images.length;
    showImage(index);
  });
});

/*MODALS EN CARDS */
console.log("JS cargado");

const categorias = {
  papeleria: {
    titulo: "Papelería e impresos",
    descripcion: "Recetas, notas, boletos, tarjetas de presentación y más.   |   Tabloide 12x18''",
    badge: "Papelería",
    productos: [
      {
        nombre: "Tarjetas de presentación",
        descripcion: "Impresión en cartulina, diferentes acabados.",
        imagen: "/img/tarjeta_presentacion.jpg"
      },
      {
        nombre: "Invitaciones",
        descripcion: "Digitales o impresas para todo tipo de evento. Desde $7.",
        imagen: "/img/invitacion.png"
      },
      {
        nombre: "Calendarios",
        descripcion: "Personalizados con tu marca.",
        imagen: "/img/calendario.png"
      }
    ]
  },

  textiles: {
    titulo: "Textiles personalizados",
    descripcion: "Sublimación, serigrafía, vinil textil y DTF. Para más información, da clic en Atención personalizada.",
    badge: "Textiles",
    productos: [
      {
        nombre: "Playeras",
        descripcion: "DTF, vinil textil o sublimación. Desde $150",
        imagen: "/img/playera.png"
      },
      {
        nombre: "Sudaderas",
        descripcion: "Ideales para instituciones, equipos y para ti.",
        imagen: "/img/sudadera.png"
      },
      {
        nombre: "Gorras",
        descripcion: "Personalizadas con vinil o DTF.",
        imagen: "/img/gorra.png"
      }
    ]
  },

  productos: {
    titulo: "Productos personalizados",
    descripcion: "Artículos con sublimación y DTF UV",
    badge: "Personalizado",
    productos: [
      {
        nombre: "Tazas",
        descripcion: "Servicio personalizado.",
        imagen: "/img/tazas.png"
      },
      {
        nombre: "Termos",
        descripcion: "Personalización duradera.",
        imagen: "/img/termos.png"
      },
      {
        nombre: "Pines",
        descripcion: "Ideales para eventos o marcas.",
        imagen: "/img/pines.png"
      }
    ]
  },

  gran_formato: {
    titulo: "Gran formato y publicidad",
    descripcion: "Material de larga duración.         |         Lona por metro -> $160 m²        |        Vinil por metro lineal -> $250 m l",
    
    badge: "Gran formato",
    productos: [
      {
        nombre: "Lonas",
        descripcion: "Impresas a gran formato con diseño.",
        imagen: "/img/lonas.png"
      },
      {
        nombre: "Vinil impreso",
        descripcion: "Microperforado y estático.",
        imagen: "/img/vinil.png"
      }
    ]
  },

  paquetes: {
    titulo: "Paquetes especiales",
    descripcion: "Servicios completos para eventos.",
    badge: "Especial",
    productos: [
      {
        nombre: "Paquete graduación",
        descripcion: "Carpeta, pin e invitación.",
        imagen: "/img/paquete.png"
      },
      {
        nombre: "Sellos personalizados",
        descripcion: "Ideales para papelería corporativa.",
        imagen: "/img/sellos.jpg"
      }
    ]
  }
};

function abrirModal(categoria) {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modal-title");
  const desc = document.getElementById("modal-desc");
  const contenedor = document.getElementById("modal-productos");
  

  title.textContent = categorias[categoria].titulo;
  desc.textContent = categorias[categoria].descripcion;

  contenedor.innerHTML = "";

  categorias[categoria].productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" alt="${p.nombre}">
        <div class="producto-info">
          <h4>${p.nombre}</h4>
          <p>${p.descripcion}</p>
        </div>
      </div>
    `;
  });

  modal.style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

/*Menú desplegable en celular*/
function toggleMenu() {
  const menu = document.querySelector(".menu");
  const toggle = document.querySelector(".menu-toggle");

  menu.classList.toggle("active");

  // cambiar icono
  if (menu.classList.contains("active")) {
    toggle.textContent = "✕";
  } else {
    toggle.textContent = "☰";
  }
}

//REGISTRO DE SERVICE WORKER
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registrado"))
    .catch(error => console.log("Error:", error));
}