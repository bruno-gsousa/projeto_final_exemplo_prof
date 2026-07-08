// ================================
// CONTADOR ANIMADO
// ================================

declare const bootstrap: {
  Offcanvas: {
    getOrCreateInstance(element: Element | string): { show(): void };
  };
};

type CartItem = {
  name: string;
  price: string;
};

const counters = document.querySelectorAll<HTMLElement>('.counter');

counters.forEach((counter) => {
  const updateCounter = (): void => {
    const target = Number(counter.dataset.target ?? 0);
    const count = Number(counter.innerText || 0);
    const increment = target / 100;

    if (count < target) {
      counter.innerText = String(Math.ceil(count + increment));
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = String(target);
    }
  };

  updateCounter();
});

// ================================
// SCROLL ANIMATION
// ================================

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll<HTMLElement>('section').forEach((section) => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// ================================
// NAVBAR SCROLL
// ================================

window.addEventListener('scroll', () => {
  const nav = document.querySelector<HTMLElement>('.custom-navbar');

  if (!nav) return;

  if (window.scrollY > 50) {
    nav.style.background = '#8d2d00';
  } else {
    nav.style.background = 'rgba(24,13,8,.85)';
  }
});

// ================================
// CARRINHO SIMPLES (vendas.html)
// ================================

document.addEventListener('DOMContentLoaded', () => {
  const cart: CartItem[] = [];
  const cartCountEl = document.getElementById('cart-count');
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const clearBtn = document.getElementById('clear-cart');

  function formatPrice(value: number): string {
    return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
  }

  function updateCartUI(): void {
    if (!cartCountEl) return;
    cartCountEl.innerText = String(cart.length);

    if (!cartItemsEl) return;
    cartItemsEl.innerHTML = '';

    let total = 0;
    cart.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `<div>${item.name}</div><div>${formatPrice(Number(item.price))}</div>`;
      cartItemsEl.appendChild(li);
      total += Number(item.price);
    });

    if (cartTotalEl) {
      cartTotalEl.innerText = formatPrice(total);
    }
  }

  document.querySelectorAll<HTMLElement>('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name ?? '';
      const price = btn.dataset.price ?? '0';
      cart.push({ name, price });
      updateCartUI();

      const offcanvasEl = document.getElementById('cartOffcanvas');
      if (offcanvasEl) {
        const bs = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
        bs.show();
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      cart.length = 0;
      updateCartUI();
    });
  }

  updateCartUI();
});
