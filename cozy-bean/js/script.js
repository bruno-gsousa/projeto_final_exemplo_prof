// ================================
// CONTADOR ANIMADO
// ================================

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.dataset.target;
        const count = +counter.innerText;

        const increment = target / 100;

        if (count < target) {

            counter.innerText =
                Math.ceil(count + increment);

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target;

        }

    }

    updateCounter();

});

// ================================
// SCROLL ANIMATION
// ================================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('show');

        }

    });

});

document.querySelectorAll('section').forEach(section => {

    section.classList.add('fade-in');

    observer.observe(section);

});

// ================================
// NAVBAR SCROLL
// ================================

window.addEventListener('scroll', () => {

    const nav =
        document.querySelector('.custom-navbar');

    if (window.scrollY > 50) {

        nav.style.background =
            "#8d2d00";

    } else {

        nav.style.background =
            "rgba(24,13,8,.85)";

    }

});

// ================================
// CARRINHO SIMPLES (vendas.html)
// ================================

document.addEventListener('DOMContentLoaded', () => {

    const cart = [];
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const clearBtn = document.getElementById('clear-cart');

    function formatPrice(v){
        return 'R$ ' + Number(v).toFixed(2).replace('.', ',');
    }

    function updateCartUI(){
        if(!cartCountEl) return;
        cartCountEl.innerText = cart.length;
        if(!cartItemsEl) return;
        cartItemsEl.innerHTML = '';
        let total = 0;
        cart.forEach((item, idx) =>{
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `<div>${item.name}</div><div>${formatPrice(item.price)}</div>`;
            cartItemsEl.appendChild(li);
            total += Number(item.price);
        });
        if(cartTotalEl) cartTotalEl.innerText = formatPrice(total);
    }

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = btn.dataset.name;
            const price = btn.dataset.price;
            cart.push({ name, price });
            updateCartUI();
            // show offcanvas if possible
            const offcanvasEl = document.getElementById('cartOffcanvas');
            if(offcanvasEl){
                const bs = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
                bs.show();
            }
        });
    });

    if(clearBtn){
        clearBtn.addEventListener('click', ()=>{
            cart.length = 0;
            updateCartUI();
        });
    }

    updateCartUI();

});