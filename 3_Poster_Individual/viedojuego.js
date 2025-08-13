
window.addEventListener('load', () => {
  const container = document.querySelector('.contenedor-fondo');
  const penny = document.querySelector('.penny');
  const coins = Array.from(document.querySelectorAll('.coin'));
  const contadorMonedas = document.getElementById('contador-monedas');
  const corazones = [
    document.querySelector('.corazon-1'),
    document.querySelector('.corazon-2'),
    document.querySelector('.corazon-3'),
    document.querySelector('.corazon-4'),
    document.querySelector('.corazon-5')
  ];
  const pinchos = document.querySelector('.pinchos');
  const bloques = Array.from(
  document.querySelectorAll('.bloque-one, .bloque-two, .suelo1, .suelo2')
  );
  const gumball = document.querySelector('.gumball');

  
  const GRAVITY = 1.4;
  const JUMP_POWER = -18;
  const STEP = 36;             
  let velY = 0;
  let enSuelo = false;
  let juegoActivo = true;

  let contador = 0;
  let vidas = 5;

  
  container.tabIndex = 0;
  container.style.outline = 'none';
  container.addEventListener('click', () => container.focus());

  
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.left = '50%';
  overlay.style.top = '75%';
  overlay.style.transform = 'translate(-50%, -50%)';
  overlay.style.padding = '18px 28px';
  overlay.style.fontSize = '48px';
  overlay.style.fontWeight = '800';
  overlay.style.color = 'white';
  overlay.style.background = 'rgba(0,0,0,0.6)';
  overlay.style.borderRadius = '8px';
  overlay.style.zIndex = 3000;
  overlay.style.display = 'none';
  document.body.appendChild(overlay);

  function mostrarOverlay(texto) {
    overlay.textContent = texto;
    overlay.style.display = 'block';
  }

  function colocarInicio() {
  
  const m1 = document.querySelector('.moneda-1');
  const containerRect = container.getBoundingClientRect();
  const mRect = m1.getBoundingClientRect();

  
  const startX = (mRect.left - containerRect.left) - 30; 
  const startY = (mRect.top - containerRect.top) + 40;  

  penny.style.left = Math.max(0, Math.round(startX)) + 'px';
  penny.style.top = Math.round(startY) + 'px';
}

  
  function intersects(r1, r2) {
    return !(r1.left > r2.right || r1.right < r2.left || r1.top > r2.bottom || r1.bottom < r2.top);
  }

 
  function revisarMonedas(pRect) {
    coins.forEach(c => {
      if (c.style.display === 'none') return;
      const cRect = c.getBoundingClientRect();
      if (intersects(pRect, cRect)) {
        c.style.display = 'none';
        contador++;
        if (contadorMonedas) {
          contadorMonedas.textContent = contador;
          contadorMonedas.classList.add('animate');
          setTimeout(()=> contadorMonedas.classList.remove('animate'), 300);
        }
      }
    });
  }

  
  function perderVida() {
    if (!juegoActivo) return;
    vidas--;
    if (vidas >= 0 && corazones[vidas]) {
      corazones[vidas].style.display = 'none';
    }
    
    if (vidas > 0) {
      colocarInicio();
      velY = 0;
    } else {
      
      juegoActivo = false;
      mostrarOverlay('GAME OVER');
    }
  }

  
  function revisarPinchos(pRect) {
    if (!pinchos) return;
    const ph = pinchos.getBoundingClientRect();
    if (intersects(pRect, ph)) {
      perderVida();
    }
  }

  
  function revisarGanar(pRect) {
    if (!gumball) return;
    const gRect = gumball.getBoundingClientRect();
    if (intersects(pRect, gRect)) {
      juegoActivo = false;
      mostrarOverlay('WINNER ❤️');
    }
  }

  
  function detectarSoporte(pRect, velYcurrent) {
    const SAFETY_MARGIN = 8; 
    for (let bloque of bloques) {
      const bRect = bloque.getBoundingClientRect();
      const pad = Math.max(6, Math.round(bRect.width * 0.08)); 
      const supportLeft = bRect.left + pad;
      const supportRight = bRect.right - pad;
      const supportTop = bRect.top;

      
      if (velYcurrent >= 0 &&
          pRect.bottom >= supportTop - SAFETY_MARGIN &&
          pRect.bottom <= supportTop + Math.abs(velYcurrent) + SAFETY_MARGIN &&
          pRect.right > supportLeft &&
          pRect.left < supportRight) {
        
        const containerRect = container.getBoundingClientRect();
        const newPosY = supportTop - containerRect.top - penny.offsetHeight;
        penny.style.top = Math.round(newPosY) + 'px';
        
        bloque.style.transform = 'translateY(3px)';
        setTimeout(()=> bloque.style.transform = '', 100);
        return true; 
      }
    }
    return false;
  }

  
  window.addEventListener('keydown', (e) => {
    if (!juegoActivo) return;
    
    if (e.repeat) return;

    
    if (['ArrowLeft','ArrowRight','ArrowUp',' ' , 'Spacebar'].includes(e.key) || e.code === 'Space') {
      e.preventDefault();
    }

    
    const currentLeft = parseInt(getComputedStyle(penny).left, 10) || 0;
    if (e.key === 'ArrowRight') {
      
      const maxX = container.clientWidth - penny.offsetWidth;
      const target = Math.min(maxX, currentLeft + STEP);
      penny.style.left = Math.round(target) + 'px';
    } else if (e.key === 'ArrowLeft') {
      const target = Math.max(0, currentLeft - STEP);
      penny.style.left = Math.round(target) + 'px';
    } else if (e.key === 'ArrowUp' || e.code === 'Space') {
      
      
      const pRectQuick = penny.getBoundingClientRect();
      if (enSuelo || detectarSoporte(pRectQuick, 0)) {
        velY = JUMP_POWER;
        enSuelo = false;
      }
    }
  }, { passive: false });

  
  function loop() {
    if (!juegoActivo) return;

    
    velY += GRAVITY;
    
    const currentTop = parseFloat(getComputedStyle(penny).top) || 0;
    let newTop = currentTop + velY;
    penny.style.top = Math.round(newTop) + 'px';

    
    const pRect = penny.getBoundingClientRect();

    
    const tieneSoporte = detectarSoporte(pRect, velY);
    if (tieneSoporte) {
      velY = 0;
      enSuelo = true;
    } else {
      enSuelo = false;
    }

    
    revisarMonedas(pRect);
    revisarPinchos(pRect);
    revisarGanar(pRect);

    
    const containerRect = container.getBoundingClientRect();
    if (pRect.top > containerRect.bottom + 40) {
      perderVida();
    }

    requestAnimationFrame(loop);
  }

  
  requestAnimationFrame(loop);

  
  console.info('Haz click en el escenario (game area) y usa ← → ↑ (o espacio) — cada pulsación hace un paso/salto.');

});