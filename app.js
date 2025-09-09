// Estado 
let carrito = [];
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Catálogo 
const productos = {
  juegos: [
    { id:"catan",
      nombre: "Catan",
      precio: 29990,
      imagen: "img/catan.png",
      rating: 4.7,
      fabricante: "Catan Studio",
      categoria: "juegos",
      descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos."
    }, 
    { id:"carcassonne",
      nombre: "Carcassonne",
      precio: 24990,
      imagen: "img/carca.webp",
      rating: 4.5,
      fabricante: "Hans im Glück",
      categoria: "juegos",
      descripcion: "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender."
    } 
  ],
  accesorios: [
    { id:"xboxpad",
      nombre: "Controlador Inalámbrico Xbox Series X",
      precio: 59990,
      imagen: "img/mando.webp",
      rating: 4.6,
      fabricante: "Microsoft",
      categoria: "accesorios",
      descripcion: "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC."
    },
    { id:"hyperx",
      nombre: "Auriculares Gamer HyperX Cloud II",
      precio: 79990,
      imagen: "img/audif.jpg",
      rating: 4.8,
      fabricante: "HyperX",
      categoria: "accesorios",
      descripcion: "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego."
    }
  ],
  consolas: [
    {id:"ps5",
      nombre: "PlayStation 5",
      precio: 549990,
      imagen: "img/play5.jpg",
      rating: 4.9,
      fabricante: "Sony",
      categoria: "consolas",
      descripcion: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva."
    }
  ],
  computadores: [
    {id:"rog",
      nombre: "PC Gamer ASUS ROG Strix",
      precio: 1299990,
      imagen: "img/asus.jpg",
      rating: 4.7,
      fabricante: "ASUS",
      categoria: "computadores",
      descripcion: "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego."
    }
  ],
  sillas: [
    {id:"secretlab",
      nombre: "Silla Gamer Secretlab Titan",
      precio: 349990,
      imagen: "img/silla.webp",
      rating: 4.6,
      fabricante: "Secretlab",
      categoria: "sillas",
      descripcion: "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas."
    }
  ],
  mouse: [
    { id:"g502",
      nombre: "Mouse Gamer Logitech G502 HERO",
      precio: 49990,
      imagen: "img/mouse.webp",
      rating: 4.7,
      fabricante: "Logitech",
      categoria: "mouse",
      descripcion: "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización."
    }
  ],
  mousepad: [
    { id:"goliathus",
      nombre: "Mousepad Razer Goliathus Extended Chroma",
      precio: 29990,
      imagen: "img/mousepad.jpg",
      rating: 4.6,
      fabricante: "Razer",
      categoria: "mousepad",
       descripcion: "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse."
    }
  ],
  poleras: [
    {id:"polera",
      nombre: "Polera Gamer Personalizada 'Level-Up'",
      precio: 14990,
      imagen: "img/polera.jpg",
      rating: 4.4,
      fabricante: "Level-Up Apparel",
      categoria: "poleras",
       descripcion: "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito."
    }
  ],

 polerones: [
    { id:"PL001", 
      nombre:"Polerón Gamer Personalizado", 
      precio:29990, imagen:"img/poleron.webp", 
      rating:4.5,
      fabricante:"Polerones Personalizados",
      categoria: "polerones",
       descripcion:"Polerón cómodo y estilizado, ideal para gamers, con opción de personalización."   }
  ]

};

// Utilidades 
function toCLP(n){return n.toLocaleString('es-CL');}
function getUsuarios(){return JSON.parse(localStorage.getItem('usuarios'))||[]}
function setUsuarios(list){localStorage.setItem('usuarios', JSON.stringify(list))}
function getActivo(){return JSON.parse(localStorage.getItem('usuarioActivo'))}
function setActivo(u){localStorage.setItem('usuarioActivo', JSON.stringify(u))}

//  Render de productos 
const contenedor = document.getElementById('contenedor-productos');
const listaCategorias = document.getElementById('lista-categorias');
const btnCategorias = document.getElementById('btn-categorias');

btnCategorias?.addEventListener('click', ()=>{
  listaCategorias.classList.toggle('oculto');
  btnCategorias.textContent = listaCategorias.classList.contains('oculto') ? '📂 Ver Categorías' : '📂 Ocultar Categorías';
});

function plantillaProducto(p){
  return `
  <div class="producto" data-id="${p.id}">
    <h3>${p.nombre}</h3>
    <p><strong>Fabricante:</strong> ${p.fabricante}</p>
    <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" />
    <p>${p.descripcion}</p>
    <div class="precios">
      <span class="precio">$${toCLP(p.precio)} CLP</span>
    </div>
    <div class="wrap">
      <button onclick="agregarAlCarrito('${p.id}')">Agregar al carrito</button>
      <button onclick="compartirProducto('${p.nombre}')">Compartir</button>
    </div>

    <!-- 📌 Reseñas -->
    <div class="reviews">
      <div class="stars" data-for="${p.id}">
        ${[5,4,3,2,1].map(v=>`
          <input type="radio" id="s-${p.id}-${v}" name="s-${p.id}" value="${v}">
          <label for="s-${p.id}-${v}">★</label>
        `).join('')}
      </div>
      <textarea id="rev-${p.id}" placeholder="Escribe tu reseña..." rows="2"></textarea>
      <div class="wrap">
        <button onclick="guardarResenia('${p.id}')">⭐ Enviar</button>
        <span class="pill" id="avg-${p.id}">Promedio: ${getPromedio(p.id)} ⭐</span>
      </div>
      <div id="lista-${p.id}" class="review-list"></div>
    </div>
  </div>`;
}
function mostrarCategoria(cat){
  contenedor.innerHTML = '';
  (productos[cat]||[]).forEach(p=>{
    contenedor.insertAdjacentHTML('beforeend', plantillaProducto(p));
    mostrarResenias(p.id);
  });
}

// Cargar reseñas guardadas
function getResenias(){return JSON.parse(localStorage.getItem('resenias'))||{}}
function setResenias(obj){localStorage.setItem('resenias', JSON.stringify(obj))}
function guardarResenia(id){
  const ta = document.getElementById(`rev-${id}`);
  const texto = (ta?.value||'').trim();
  const stars = document.querySelector(`.stars[data-for="${id}"] input:checked`);
  const calif = stars ? Number(stars.value) : 0;
  if(!texto && !calif){return}
  const store = getResenias();
  store[id] = store[id]||[];
  store[id].push({texto, calif, ts: Date.now()});
  setResenias(store);
  ta.value = '';
  if(stars) stars.checked = false;
  mostrarResenias(id);
  actualizarPromedio(id);
}
function mostrarResenias(id){
  const div = document.getElementById(`lista-${id}`);
  if(!div) return;
  const store = getResenias();
  div.innerHTML = '';
  (store[id]||[]).slice().reverse().forEach(r=>{
    const line = document.createElement('p');
    const starTxt = r.calif? ` (${r.calif}⭐)`:'';
    line.textContent = `⭐ ${r.texto}${starTxt}`;
    div.appendChild(line);
  });
}
function getPromedio(id){
  const list = (getResenias()[id]||[]).filter(r=>r.calif);
  if(!list.length) return '—';
  const avg = list.reduce((a,b)=>a+b.calif,0)/list.length;
  return avg.toFixed(1);
}
function actualizarPromedio(id){
  const span = document.getElementById(`avg-${id}`);
  if(span) span.textContent = `Promedio: ${getPromedio(id)} ⭐`;
}

//  Carrito 
function actualizarCarrito(){
  const lista = document.getElementById('lista-carrito');
  const totalElement = document.getElementById('total');
  const ahorro = document.getElementById('ahorro');
  lista.innerHTML = '';

  let totalGeneral = carrito.reduce((acc,i)=> acc + i.precio*i.cantidad, 0);

  const activo = getActivo();
  let desc = (activo && activo.descuento) ? Number(activo.descuento) : 0;
  let totalConDesc = Math.round(totalGeneral * (1 - desc/100));

  carrito.forEach((item, idx)=>{
    const row = document.createElement('div');
    row.className = 'linea';
    row.innerHTML = `
      <span>${item.nombre}</span>
      <span>$${toCLP(item.precio)} CLP</span>
      <input type="number" min="1" value="${item.cantidad}" onchange="cambiarCantidad(${idx}, this.value)" />
      <button onclick="eliminarDelCarrito(${idx})">❌</button>
    `;
    lista.appendChild(row);
  });

  totalElement.textContent = desc
    ? `Total: $${toCLP(totalGeneral)} CLP (con ${desc}% → $${toCLP(totalConDesc)} CLP)`
    : `Total: $${toCLP(totalGeneral)} CLP`;
  ahorro.textContent = desc && totalGeneral ? `Ahorro: $${toCLP(totalGeneral-totalConDesc)} CLP` : '';
}

function agregarAlCarrito(id){
  const p = Object.values(productos).flat().find(x=>x.id===id);
  if(!p) return;
  let existente = carrito.find(i=>i.id===id);
  if(existente){ existente.cantidad++; }
  else { carrito.push({ id:p.id, nombre:p.nombre, precio:p.precio, cantidad:1 }); }
  otorgarPuntos(5); 
  actualizarCarrito();
}
function cambiarCantidad(index, val){ carrito[index].cantidad = Math.max(1, parseInt(val||1)); actualizarCarrito(); }
function eliminarDelCarrito(index){ carrito.splice(index,1); actualizarCarrito(); }
function limpiarCarrito(){ carrito = []; actualizarCarrito(); }
function pagar(){
  if(!carrito.length){ alert('Tu carrito está vacío'); return; }
  otorgarPuntos(25); 
  alert('✅ ¡Gracias por tu compra! (simulado)');
  limpiarCarrito();
}

//  Compartir 
function compartirProducto(nombre){
  const data = { title:'Level-Up Gamer', text:`Mira este producto: ${nombre}`, url: location.href };
  if(navigator.share){ navigator.share(data).catch(()=>{}); }
  else { prompt('Copia el enlace y compártelo:', data.url); }
}

// Formularios mostrar/ocultar 
function mostrarFormulario(id){ ['registro','ingresar','perfil'].forEach(x=>document.getElementById(x).classList.add('oculto')); document.getElementById(id).classList.remove('oculto'); }
function cerrarForm(id){ document.getElementById(id).classList.add('oculto'); }

// Registro 
document.getElementById('formRegistro')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const fechaValor = document.getElementById('fechaNacimiento').value;
  const password = document.getElementById('password').value.trim();
  const referido = document.getElementById('referido').value.trim();
  const msg = document.getElementById('msgRegistro');

  const fn = new Date(fechaValor);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fn.getFullYear();
  const m = hoy.getMonth() - fn.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fn.getDate())) edad--;
  if(edad < 18){ msg.textContent = '❌ Debes ser mayor de 18 años.'; msg.style.color='red'; return; }

  const descuento = correo.endsWith('@duocuc.cl') ? 20 : 0; 
  let usuarios = getUsuarios();
  if(usuarios.some(u=>u.correo===correo)){ msg.textContent='❌ Este correo ya está registrado.'; msg.style.color='red'; return; }

  // puntos de bienvenida
  let puntos = 100; 
  const nuevo = { nombre, correo, password, descuento, puntos, nivel:1, prefCategoria:'' };

  // Referidos recibe +50 puntos 
  if(referido){
    const idx = usuarios.findIndex(u=>u.correo===referido);
    if(idx>=0){ usuarios[idx].puntos = (usuarios[idx].puntos||0)+50; }
  }

  usuarios.push(nuevo); setUsuarios(usuarios);
  msg.textContent = `✅ Registro exitoso. Descuento asignado: ${descuento}%`;
  msg.style.color='green';
});

//  Login 
document.getElementById('formLogin')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const correo = document.getElementById('loginCorreo').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const msg = document.getElementById('msgLogin');
  const usuarios = getUsuarios();
  const usuario = usuarios.find(u=>u.correo===correo && u.password===password);
  if(usuario){
    setActivo(usuario);
    msg.textContent = `✅ Bienvenido, ${usuario.nombre}`; msg.style.color='green';
    mostrarFormulario('perfil'); cargarPerfil(); actualizarCarrito();
  } else {
    msg.textContent = '❌ Credenciales incorrectas'; msg.style.color='red';
  }
});

//  Perfil 
function cargarPerfil(){
  const u = getActivo(); if(!u) return;
  document.getElementById('perfilNombre').value = u.nombre;
  document.getElementById('perfilCorreo').value = u.correo;
  document.getElementById('perfilPassword').value = '';
  document.getElementById('prefCategoria').value = u.prefCategoria||'';
  actualizarHUDNivel();
}

document.getElementById('formPerfil')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  let activo = getActivo(); if(!activo) return;
  let usuarios = getUsuarios();

  activo.nombre = document.getElementById('perfilNombre').value.trim();
  const nuevaPass = document.getElementById('perfilPassword').value.trim();
  if(nuevaPass) activo.password = nuevaPass;
  activo.prefCategoria = document.getElementById('prefCategoria').value;

  usuarios = usuarios.map(u=>u.correo===activo.correo? activo : u);
  setUsuarios(usuarios); setActivo(activo);

  const msg = document.getElementById('msgPerfil');
  msg.textContent = '✅ Perfil actualizado correctamente.'; msg.style.color='green';
});



//  Gamificacion puntos y niveles 
function otorgarPuntos(n){
  let activo = getActivo(); if(!activo) return;
  activo.puntos = (activo.puntos||0) + n;

  // niveles simples por umbral
  const nivelAntes = activo.nivel||1;
  if(activo.puntos >= 500) activo.nivel = 5;
  else if(activo.puntos >= 300) activo.nivel = 4;
  else if(activo.puntos >= 200) activo.nivel = 3;
  else if(activo.puntos >= 100) activo.nivel = 2;
  else activo.nivel = 1;

  // canje simple cada 100 puntos 
  const extra = Math.min(10, Math.floor((activo.puntos||0)/100));
  activo.descuentoExtra = extra; 

  // persistir
  let usuarios = getUsuarios().map(u=>u.correo===activo.correo? activo : u);
  setUsuarios(usuarios); setActivo(activo);
  actualizarHUDNivel();
  if(activo.nivel>nivelAntes){ alert(`🎉 ¡Felicitaciones! Subiste a nivel ${activo.nivel}`); }
}
function actualizarHUDNivel(){
  const activo = getActivo();
  if(!activo) return;
  const puntosBox = document.getElementById('puntosBox');
  const nivelBox = document.getElementById('nivelBox');
  if(puntosBox) puntosBox.textContent = `Puntos LevelUp: ${activo.puntos||0}`;
  if(nivelBox) nivelBox.textContent = `Nivel: ${activo.nivel||1}`;
}

// Buscador simple (en los productos visibles) 
document.getElementById('buscador')?.addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase();
  $$('#contenedor-productos .producto').forEach(div=>{
    const nombre = div.querySelector('h3').textContent.toLowerCase();
    div.style.display = nombre.includes(q) ? 'block' : 'none';
  });
});

//  Blog/Noticias (contenido educativo) 
const posts = [
  { t: 'Cómo elegir tu primer PC Gamer', d: 'CPU, GPU, RAM y presupuesto: guía rápida para no perderte.', k: ['hardware','tips'] },
  { t: 'Headsets: 5 claves de audio 3D', d: 'Qué mirar en drivers, respuesta de frecuencia y comodidad.', k: ['audio','perifericos'] },
  { t: 'Mejora tu aim en 7 días', d: 'Rutinas simples y gratuitas que realmente funcionan.', k: ['fps','entrenamiento'] },
];
function renderBlog(){
  const box = document.getElementById('blogPosts');
  posts.forEach(p=>{
    const el = document.createElement('div');
    el.className='post';
    el.innerHTML = `<h4>${p.t}</h4><p>${p.d}</p><div class="wrap">${p.k.map(x=>`<span class='pill'>#${x}</span>`).join('')}</div>`;
    box.appendChild(el);
  });
}

// Eventos (mapa) 
function initMapa(){
  if(!window.L) return;
  const map = L.map('mapa').setView([-33.45,-70.66], 5); 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' }).addTo(map);
  const eventos = [
    {nombre:'Santiago Game Fest', coord:[-33.45,-70.66]},
    {nombre:'Valpo eSports Meet', coord:[-33.047,-71.612]},
    {nombre:'Concepción LAN Party', coord:[-36.826,-73.049]}
  ];
  eventos.forEach(e=>{
    L.marker(e.coord).addTo(map).bindPopup(`<b>${e.nombre}</b><br/>Gana 20 pts LevelUp assitiendo.`);
  });
}

// WhatsApp Soporte 
function irAServicioTecnico(){
  const numero = '+56990590665';
  const mensaje = 'Hola, necesito servicio técnico con Level-Up Gamer :)';
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
}

//  Inicio 
(function init(){
  renderBlog();
  mostrarCategoria('consolas');
  initMapa();
  actualizarCarrito();
})();







function ingresarUsuario(correo, nombre) {
// Simulación: guardamos los datos del usuario en localStorage
  const usuario = { correo, nombre, puntos: 0, nivel: 1 };
  setActivo(usuario); 
  cargarPerfil();
  alert("Ingreso exitoso, bienvenido " + nombre + "!");
}

function cargarPerfil() {
  const perfilDiv = document.getElementById("perfil");
  const usuario = getActivo(); 

  if (!usuario) {
    perfilDiv.innerHTML = "<p>No has iniciado sesión.</p>";
    return;
  }

  perfilDiv.innerHTML = `
    <h3>👤 ${usuario.nombre}</h3>
    <p>Correo: ${usuario.correo}</p>
    <p>Puntos: ${usuario.puntos || 0}</p>
    <p>Nivel: ${usuario.nivel || 1}</p>
    <button onclick="cerrarSesion()">🚪 Cerrar sesión</button>
  `;
}

function cerrarSesion() {
  // Limpiamos usuarioActivo en vez de usuarioActual
  localStorage.removeItem("usuarioActivo");
  localStorage.removeItem("carrito");
  localStorage.removeItem("puntos");

  //Limpia el DOM
  const perfilDiv = document.getElementById("perfil");
  if (perfilDiv) perfilDiv.innerHTML = "<p>No has iniciado sesión.</p>";

  const carritoDiv = document.getElementById("carrito");
  if (carritoDiv) carritoDiv.innerHTML = "<p>Carrito vacío</p>";

  alert("Sesión cerrada correctamente.");
}


//buscar
document.getElementById("buscador").addEventListener("input", (e)=>{
  const texto = e.target.value.toLowerCase();
  renderizarProductos(texto, document.getElementById("cat").value, document.getElementById("orden").value);
});

//  FILTRO POR CATEGORÍA 
document.getElementById("cat").addEventListener("change", (e)=>{
  renderizarProductos(document.getElementById("buscador").value.toLowerCase(), e.target.value, document.getElementById("orden").value);
});

//  ORDENAR 
document.getElementById("orden").addEventListener("change", (e)=>{
  renderizarProductos(document.getElementById("buscador").value.toLowerCase(), document.getElementById("cat").value, e.target.value);
});

// FUNCIÓN REUTILIZABLE PARA MOSTRAR 
function renderizarProductos(texto="", categoria="", orden="pop"){
  let lista = Object.values(productos).flat();

  // filtro por texto
  if(texto){
    lista = lista.filter(p=> 
      p.nombre.toLowerCase().includes(texto) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(texto))
    );
  }

  // filtro por categoría
  if(categoria){
    lista = lista.filter(p => p.categoria === categoria);
  }

  // ordenar
  if(orden === "precioAsc") lista.sort((a,b)=> a.precio - b.precio);
  if(orden === "precioDesc") lista.sort((a,b)=> b.precio - a.precio);
  if(orden === "ratingDesc") lista.sort((a,b)=> b.rating - a.rating);
 

  // renderizar en HTML
  const cont = document.getElementById("contenedor-productos");
  cont.innerHTML = "";
  lista.forEach(p => cont.innerHTML += plantillaProducto(p));

  if(lista.length === 0){
    cont.innerHTML = "<p>No se encontraron productos</p>";
  }
}


//perfil 

function cargarPerfil(){
  const u = getActivo(); 
  if(!u) return;
  document.getElementById('perfilNombre').value = u.nombre;
  document.getElementById('perfilCorreo').value = u.correo;
  document.getElementById('perfilPassword').value = '';
  document.getElementById('prefCategoria').value = u.prefCategoria || '';
  actualizarHUDNivel();
}

// Guardar cambios en perfil
document.getElementById('formPerfil')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  let activo = getActivo(); 
  if(!activo) return;
  let usuarios = getUsuarios();

  // actualizar datos
  activo.nombre = document.getElementById('perfilNombre').value.trim();
  const nuevaPass = document.getElementById('perfilPassword').value.trim();
  if(nuevaPass) activo.password = nuevaPass; 
  activo.prefCategoria = document.getElementById('prefCategoria').value;

  // actualizar en lista de usuarios y en sesión activa
  usuarios = usuarios.map(u => u.correo === activo.correo ? activo : u);
  setUsuarios(usuarios); 
  setActivo(activo);

  // feedback
  const msg = document.getElementById('msgPerfil');
  msg.textContent = '✅ Perfil actualizado correctamente.';
  msg.style.color = 'green';
});