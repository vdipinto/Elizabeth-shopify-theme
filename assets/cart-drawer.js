console.log('[cart-drawer.js] loaded');

// Cart Drawer Alpine.js Component
// Define the function globally first
window.cartDrawer = function({ locale, currency }) {
  console.log('[cartDrawer] Function called with:', { locale, currency });
  return {
    // State
    opened: false,
    cart: { item_count: 0, items: [], total_price: 0 },
    locale: locale || 'en',
    currency: currency || 'EUR',

    // Money formatting
    money(amount) {
      try {
        return new Intl.NumberFormat(this.locale, {
          style: 'currency',
          currency: this.currency,
        }).format((amount || 0) / 100);
      } catch { 
        return (amount || 0) / 100; 
      }
    },

    // Lifecycle
    async init() { 
      console.log('[cartDrawer] Initializing...');
      await this.refresh(); 
    },

    // Actions
    open() { 
      console.log('[cartDrawer] Opening drawer...');
      this.opened = true; 
    },
    
    close() { 
      console.log('[cartDrawer] Closing drawer...');
      this.opened = false; 
    },

    // Cart operations
    async refresh() {
      try {
        console.log('[cartDrawer] Refreshing cart...');
        const res = await fetch('/cart.js', { 
          headers: { Accept: 'application/json' } 
        });
        this.cart = await res.json();
        console.log('[cartDrawer] Cart data:', this.cart);
        this.$dispatch('cart:count', this.cart.item_count);
      } catch (e) {
        console.error('[cartDrawer] refresh failed', e);
      }
    },

    async add() { 
      await this.refresh(); 
      this.open(); 
    },

    // Image helper
    image(item, size = 200) {
      if (!item.image) return '';
      return item.image.replace(
        /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?.*)?$/i, 
        `_${size}x.${RegExp.$1}${RegExp.$2 || ''}`
      );
    },

    // Remove item
    async remove(item) {
      try {
        const res = await fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: item.key, quantity: 0 })
        });
        if (res.ok) {
          await this.refresh();
        }
      } catch (e) {
        console.error('[cartDrawer] remove failed', e);
      }
    },

    // Update quantity
    async update(item, quantity) {
      const qty = parseInt(quantity) || 0;
      try {
        const res = await fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: item.key, quantity: qty })
        });
        if (res.ok) {
          await this.refresh();
        }
      } catch (e) {
        console.error('[cartDrawer] update failed', e);
      }
    }
  };
};

// Also register with Alpine when it's ready
document.addEventListener('alpine:init', () => {
  console.log('[cartDrawer] Alpine initialized, registering component');
  Alpine.data('cartDrawer', window.cartDrawer);
});

// Fallback for immediate use
if (window.Alpine) {
  console.log('[cartDrawer] Alpine already available, registering immediately');
  Alpine.data('cartDrawer', window.cartDrawer);
}
