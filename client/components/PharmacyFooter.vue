<template>
  <footer class="pharmacy-footer">
    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-brand">
          <img src="/images/pepito.jpeg" class="footer-logo" alt="Farmacia" />
          <span class="footer-brand-name">Farmacia Cartón Pintado</span>
        </div>
        <p class="footer-desc">Tu farmacia de confianza, comprometida con tu salud y bienestar. Atención personalizada y los mejores precios.</p>
      </div>
      <div class="footer-col">
        <h4>Enlaces Rápidos</h4>
        <ul class="footer-links">
          <li><a href="/inicio">Catálogo</a></li>
          <li><a href="/dashboard">Carrito</a></li>
          <li><a href="/reportes">Reportes</a></li>
          <li><a href="/conocenos">Conócenos</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Horarios</h4>
        <ul class="footer-hours">
          <li><span>Lun - Vie</span><span>8:00 - 20:00</span></li>
          <li><span>Sábado</span><span>9:00 - 18:00</span></li>
          <li><span>Domingo</span><span>10:00 - 14:00</span></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contacto</h4>
        <ul class="footer-contact">
          <li><img src="/images/phone.svg" class="footer-contact-icon" alt="" /> +56 9 1234 5678</li>
          <li><img src="/images/envelope.svg" class="footer-contact-icon" alt="" /> contacto@farmaciacarton.cl</li>
          <li><img src="/images/information-circle.svg" class="footer-contact-icon" alt="" /> Cartón Pintado, Chile</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Farmacia Cartón Pintado — Todos los derechos reservados</p>
    </div>
  </footer>
</template>

<style scoped>
.pharmacy-footer {
  --primary: #0d9488;
  --primary-dark: #0f766e;
  --bg-footer: #1f2937;
  --text-footer: #e5e7eb;
  --text-footer-muted: #9ca3af;

  background-color: var(--bg-footer);
  color: var(--text-footer);
  margin-top: 3rem;
  padding: 2.5rem 2rem 0;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
}

.footer-logo {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 8px;
  object-fit: contain;
}

.footer-brand-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
}

.footer-desc {
  font-size: 0.85rem;
  color: var(--text-footer-muted);
  line-height: 1.5;
  margin: 0;
}

.footer-col h4 {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #fff;
  margin: 0 0 0.75rem 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-links a {
  color: var(--text-footer-muted);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--primary);
}

.footer-hours {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.footer-hours li {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--text-footer-muted);
  gap: 1rem;
}

.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-contact li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-footer-muted);
}

.footer-contact-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.6;
  flex-shrink: 0;
}

.footer-bottom {
  border-top: 1px solid #374151;
  margin-top: 2rem;
  padding: 1.25rem 0;
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-footer-muted);
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
