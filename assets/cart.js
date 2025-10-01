/* Live cart updates with progressive enhancement.
   - With JS: clicking +/- or editing the input updates DOM (qty, line total, subtotal) and header count.
   - Without JS: the <a href="/cart/change?..."> links navigate and still work. */

console.log('[cart.js] Script loading...');

document.addEventListener('DOMContentLoaded', () => {
  console.log('[cart.js] DOM ready, initializing...');
  
  (() => {
    const cartRoot = document.querySelector('[data-cart-root]');
    if (!cartRoot) return;
  
    const locale   = cartRoot.dataset.locale || document.documentElement.lang || 'en';
    const currency = cartRoot.dataset.currency || 'USD';
  
    const fmt = (cents) =>
      new Intl.NumberFormat(locale, { style: 'currency', currency }).format((cents || 0) / 100);
  
    async function fetchCart() {
      const res = await fetch('/cart.js', { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('cart.js failed');
      return res.json();
    }
  
    async function changeCartQuantity(key, quantity) {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ id: key, quantity: Math.max(0, parseInt(quantity || 0, 10)) })
      });
      if (!res.ok) throw new Error('change.js failed');
      return fetchCart();
    }
  
    function updateHeaderCount(count) {
      window.dispatchEvent(new CustomEvent('cart:count', { detail: count }));
    }
  
    function updateRowLinks(row, quantity) {
      const line = row.getAttribute('data-line-index');
      const dec  = row.querySelector('[data-role="dec"]');
      const inc  = row.querySelector('[data-role="inc"]');
      if (dec) {
        const q = Math.max(0, quantity - 1);
        dec.dataset.qty = q;
        dec.href = `/cart/change?line=${line}&quantity=${q}`;
      }
      if (inc) {
        const q = quantity + 1;
        inc.dataset.qty = q;
        inc.href = `/cart/change?line=${line}&quantity=${q}`;
      }
    }
  
    function updateCartDOM(cart, changedKey) {
      // Subtotal
      const subtotalEl = document.querySelector('[data-subtotal]');
      if (subtotalEl) subtotalEl.textContent = fmt(cart.total_price);
  
      // Changed line (could be removed)
      const row = document.querySelector(`[data-line-key="${changedKey}"]`);
      const item = cart.items.find(i => i.key === changedKey);
  
      if (!row) return;
  
      if (!item) {
        row.remove();
        if (cart.item_count === 0) {
          // Reload to render your empty-state block
          window.location.reload();
        }
        return;
      }
  
      const qtyInput = row.querySelector('input[name="updates[]"]');
      if (qtyInput) qtyInput.value = item.quantity;
  
      const lineTotal = document.querySelector(`[data-line-total="${changedKey}"]`);
      if (lineTotal) lineTotal.textContent = fmt(item.final_line_price);
  
      updateRowLinks(row, item.quantity);
    }
  
    // Intercept +/- clicks
    document.addEventListener('click', async (e) => {
      console.log('[cart.js] Click detected on:', e.target);
      const el = e.target.closest('[data-ajax="cart-change"]');
      if (!el) {
        console.log('[cart.js] Not a cart-change element, ignoring');
        return;
      }
    
      console.log('[cart.js] intercept +/−', { key: el.dataset.key, qty: el.dataset.qty });
      e.preventDefault(); // JS path
      const key = el.getAttribute('data-key');
      const qty = parseInt(el.getAttribute('data-qty'), 10);
      const href = el.getAttribute('href');
  
      try {
        const cart = await changeCartQuantity(key, qty);
        updateCartDOM(cart, key);
        updateHeaderCount(cart.item_count);
      } catch (err) {
        console.error('[cart] ajax change failed; fallback to nav', err);
        window.location.href = href;
      }
    });
  
    // Intercept manual input changes
    document.addEventListener('change', async (e) => {
      const input = e.target.closest('input[name="updates[]"]');
      if (!input) return;
  
      const row = input.closest('[data-line-key]');
      if (!row) return;
  
      const key = row.getAttribute('data-line-key');
      const qty = Math.max(0, parseInt(input.value, 10) || 0);
  
      try {
        const cart = await changeCartQuantity(key, qty);
        updateCartDOM(cart, key);
        updateHeaderCount(cart.item_count);
      } catch (err) {
        console.error('[cart] qty input ajax failed', err);
      }
    });
  })();
  
  console.log('[cart.js] Initialization complete');
});