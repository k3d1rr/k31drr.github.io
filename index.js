const introSection = document.getElementById('intro-section');
      const mainWebsiteContentWrapper = document.getElementById('main-website-content-wrapper');
      const shopButton = document.getElementById('shopButton');
      const transitionOverlay = document.getElementById('transitionOverlay');

      const loadingIndicator = document.getElementById('loading-indicator');
      const noStockMessage = document.getElementById('no-stock-message');
      const statusMessageElement = document.getElementById('status-message');
      const itemsGrid = document.getElementById('items-grid');

      const emptyCartMessage = document.getElementById('empty-cart-message');
      const cartItemsList = document.getElementById('cart-items-list');
      const cartTotalElement = document.getElementById('cart-total');
      const totalAmountElement = document.getElementById('total-amount');
      const checkoutButton = document.getElementById('checkout-btn');

      const checkoutModalOverlay = document.getElementById('checkout-modal-overlay');
      const modalCloseBtn = document.getElementById('modal-close-btn');
      const modalTotalAmount = document.getElementById('modal-total-amount');
      const placeOrderBtn = document.getElementById('place-order-btn');
      const orderConfirmationMessage = document.getElementById('order-confirmation-message');

      const itemDetailPage = document.getElementById('item-detail-page');
      const detailItemImage = document.getElementById('detail-item-image');
      const detailItemName = document.getElementById('detail-item-name');
      const detailItemPrice = document.getElementById('detail-item-price');
      const detailItemDescription = document.getElementById('detail-item-description');
      const detailAddToCartBtn = document.getElementById('detail-add-to-cart-btn');
      const backToShopBtn = document.getElementById('back-to-shop-btn');
      const itemSizeSelect = document.getElementById('item-size');

      const navIndicator = document.getElementById('nav-indicator');
      const navLinks = document.querySelectorAll('nav ul li');
      const mainNavItems = document.querySelectorAll('nav ul li.main-nav-item');
      const supportNavItem = document.getElementById('support-nav-item');

      const messageBox = document.getElementById('message-box');
      const messageText = document.getElementById('message-text');

      const signInPage = document.getElementById('sign-in-main');
      const signUpPage = document.getElementById('sign-up-main');
      const signInEmailInput = document.getElementById('signin-email');
      const signInPasswordInput = document.getElementById('signin-password');
      const signInBtn = document.getElementById('signin-btn');
      const signInErrorMessage = document.getElementById('signin-error-message');
      const signUpEmailInput = document.getElementById('signup-email');
      const signUpPasswordInput = document.getElementById('signup-password');
      const signUpConfirmPasswordInput = document.getElementById('signup-confirm-password');
      const signUpBtn = document.getElementById('signup-btn');
      const signUpErrorMessage = document.getElementById('signup-error-message');

      const onboardingPage = document.getElementById('onboarding-main');
      const onboardingTitle = document.getElementById('onboarding-title');
      const onboardingFirstNameInput = document.getElementById('onboarding-first-name');
      const onboardingLastNameInput = document.getElementById('onboarding-last-name');
      const onboardingSaveBtn = document.getElementById('onboarding-save-btn');
      const onboardingErrorMessage = document.getElementById('onboarding-error-message');

      const supportMain = document.getElementById('support-main');
      const supportQuestion = document.getElementById('supportQuestion');
      const quickEasyBtn = document.getElementById('quickEasyBtn');
      const advancedSupportBtn = document.getElementById('advancedSupportBtn');
      const backToMainSiteBtn = document.getElementById('backToMainSiteBtn');

      const chatInterface = document.getElementById('chat-interface');
      const chatMessages = document.getElementById('chat-messages');
      const chatInput = document.getElementById('chat-input');
      const sendChatBtn = document.getElementById('send-chat-btn');
      let isBotTyping = false;
      let chatHistory = [{ role: "system", content: "You are UltreBot, a helpful assistant for the Ultre clothing brand. You answer questions about products, orders, and general inquiries. Keep responses concise and friendly." }];

      const settingsMain = document.getElementById('settings-main');
      const settingsContentContainer = document.getElementById('settings-content-container');
      const settingsContentTitle = document.getElementById('settings-content-title');
      const settingsContentArea = document.getElementById('settings-content-area');
      const settingsNavLinks = document.querySelectorAll('.settings-nav-link');

      const hamburgerIcon = document.getElementById('hamburgerIcon');
      const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
      const mobileNavCloseBtn = document.getElementById('mobileNavCloseBtn');
      const mobileNavItems = document.querySelectorAll('#mobile-nav-overlay .mobile-nav-item');


      let cart = {};
      let currentActiveNavLinkLi = null;
      let isNavigating = false;
      let supportMode = false;
      let settingsInitialized = false;

      const localClothingItems = [
        { id: 'tee', name: "Minimalist Tee", price: 35.00, imageUrl: "https://placehold.co/300x300/333333/FFFFFF?text=Tee", description: "Our classic minimalist tee, designed for comfort and style. Made from 100% organic cotton, it's perfect for everyday wear. Available in various sizes." },
        { id: 'hoodie', name: "Essential Hoodie", price: 65.00, imageUrl: "https://placehold.co/300x300/555555/FFFFFF?text=Hoodie", description: "Stay warm and stylish with our essential hoodie. Crafted from a soft fleece blend, featuring a subtle Ultre logo. Ideal for cooler days." },
        { id: 'joggers', name: "Core Joggers", price: 50.00, imageUrl: "https://placehold.co/300x300/777777/FFFFFF?text=Joggers", description: "Comfortable and versatile core joggers, perfect for lounging or light activity. Designed with a modern tapered fit and elastic waistband." },
        { id: 'cap', name: "Urban Cap", price: 25.00, imageUrl: "https://placehold.co/300x300/999999/FFFFFF?text=Cap", description: "Complete your look with our urban cap. A classic design with an adjustable strap for the perfect fit. Features a discreet embroidered detail." },
        { id: 'socks', name: "Signature Socks", price: 15.00, imageUrl: "https://placehold.co/300x300/AAAAAA/FFFFFF?text=Socks", description: "Step up your sock game with our signature socks. Soft, breathable, and designed for all-day comfort. Comes in a pack of three." },
      ];

      function splitAndAnimateLetters(elementId, baseDelay = 0) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const text = element.textContent;
        element.textContent = '';

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const span = document.createElement('span');
          span.textContent = char;
          span.classList.add('animated-letter');
          if (char === ' ') {
            span.classList.add('space');
          }
          span.style.animationDelay = `${baseDelay + (i * 0.02)}s`;
          fragment.appendChild(span);
        }
        element.appendChild(fragment);
      }

      function animateBlock(elementId, delay) {
        const element = typeof elementId === 'string' ? document.getElementById(elementId) : elementId;
        if (element) {
          element.style.animationDelay = `${delay}s`;
        }
      }

      function typeMessage(element, message, callback, delay = 70) {
        let i = 0;
        element.textContent = '';
        element.classList.remove('animate-slide-in-up');
        const interval = setInterval(() => {
          if (i < message.length) {
            element.textContent += message.charAt(i);
            i++;
          } else {
            clearInterval(interval);
            element.classList.add('animate-slide-in-up');
            if (callback) setTimeout(callback, 500);
          }
        }, delay);
      }

      function showMessageBox(message, duration = 3000, isError = false) {
          messageText.textContent = message;
          messageBox.classList.remove('bg-red-600', 'bg-green-600');
          messageBox.classList.add(isError ? 'bg-red-600' : 'bg-green-600');
          messageBox.querySelector('i').className = isError ? 'fas fa-times-circle' : 'fas fa-check-circle';

          messageBox.classList.add('show');

          setTimeout(() => {
              messageBox.classList.remove('show');
          }, duration);
      }

      async function fetchPrintifyShops() {
          try {
              const response = await fetch(`${PRINTIFY_API_BASE_URL}/shops.json`, {
                  headers: {
                      'Authorization': `Bearer ${PRINTIFY_API_KEY}`
                  }
              });
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              if (data.length > 0) {
                  return data[0].id;
              }
              return null;
          } catch (error) {
              console.error("Error fetching Printify shops:", error);
              throw error;
          }
      }

      async function renderShopItems() {
        loadingIndicator.classList.remove('hidden');
        loadingIndicator.classList.add('animate-slide-in-up');
        itemsGrid.innerHTML = '';
        noStockMessage.classList.add('hidden');
        statusMessageElement.classList.add('hidden');

        let productsToRender = [];

        try {
            const shopId = await fetchPrintifyShops();
            if (shopId) {
                const response = await fetch(`${PRINTIFY_API_BASE_URL}/shops/${shopId}/products.json`, {
                    headers: {
                        'Authorization': `Bearer ${PRINTIFY_API_KEY}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                productsToRender = data.data;
            } else {
                throw new Error("No Printify shop found.");
            }
        } catch (error) {
            console.error("Failed to fetch from Printify, falling back to local data:", error);
            loadingIndicator.classList.remove('animate-slide-in-up');
            loadingIndicator.classList.add('hidden');
            statusMessageElement.classList.remove('hidden');
            await new Promise(resolve => {
                typeMessage(statusMessageElement, "Couldn't connect, fetching local data...", () => {
                    statusMessageElement.textContent = '';
                    statusMessageElement.classList.add('hidden');
                    statusMessageElement.classList.remove('animate-slide-in-up');
                    resolve();
                });
            });
            productsToRender = localClothingItems;
        } finally {
            loadingIndicator.classList.add('hidden');
            loadingIndicator.classList.remove('animate-slide-in-up');

            if (!productsToRender || productsToRender.length === 0) {
              noStockMessage.classList.remove('hidden');
              noStockMessage.classList.add('animate-slide-in-up');
            } else {
              productsToRender.forEach((item, index) => {
                const imageUrl = item.images && item.images.length > 0 ? item.images[0].src : item.imageUrl || 'https://placehold.co/300x300/CCCCCC/000000?text=No+Image';
                const price = item.variants && item.variants.length > 0 ? (item.variants[0].price / 100).toFixed(2) : (item.price || 0).toFixed(2);
                const description = item.description || "A high-quality item from Ultre. Designed for comfort and durability.";

                const itemCard = document.createElement('div');
                itemCard.className = 'bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer product-card';
                itemCard.style.animationDelay = `${0.1 * index}s`;
                itemCard.dataset.itemId = item.id;
                itemCard.dataset.itemName = item.title || item.name;
                itemCard.dataset.itemPrice = item.variants && item.variants.length > 0 ? item.variants[0].price : (item.price * 100);
                itemCard.dataset.itemImage = imageUrl;
                itemCard.dataset.itemDescription = description;

                itemCard.innerHTML = `
                  <img src="${imageUrl}" alt="${item.title || item.name}" class="w-full h-48 object-cover">
                  <div class="p-4 flex flex-col justify-between flex-grow">
                    <h3 class="text-xl font-semibold text-white mb-2">${item.title || item.name}</h3>
                    <p class="text-gray-300 text-lg mb-4">$${price}</p>
                    <button class="add-to-cart-btn mt-auto bg-white text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors" data-item-id="${item.id}" data-item-name="${item.title || item.name}" data-item-price="${item.variants && item.variants.length > 0 ? item.variants[0].price : (item.price * 100)}" data-item-image="${imageUrl}">Add to Cart</button>
                  </div>
                `;
                itemsGrid.appendChild(itemCard);
              });

              document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                  event.stopPropagation();
                  const itemId = event.target.dataset.itemId;
                  const itemName = event.target.dataset.itemName;
                  const itemPrice = parseFloat(event.target.dataset.itemPrice);
                  const itemImage = event.target.dataset.itemImage;
                  addToCart({ id: itemId, name: itemName, price: itemPrice, imageUrl: itemImage, size: 'M' });
                  showMessageBox(`${itemName} (Size: M) has successfully been added to cart!`);
                });
              });

              document.querySelectorAll('.product-card').forEach(card => {
                  card.addEventListener('click', (event) => {
                      const itemId = card.dataset.itemId;
                      const itemName = card.dataset.itemName;
                      const itemPrice = parseFloat(card.dataset.itemPrice);
                      const itemImage = card.dataset.itemImage;
                      const itemDescription = card.dataset.itemDescription;
                      showItemDetail({ id: itemId, name: itemName, price: itemPrice, imageUrl: itemImage, description: itemDescription });
                  });
              });
            }
        }
      }

      function addToCart(item) {
        const cartKey = `${item.id}-${item.size}`;
        if (cart[cartKey]) {
          cart[cartKey].quantity++;
        } else {
          cart[cartKey] = { ...item, quantity: 1 };
        }
        renderCart();
      }

      function updateCartQuantity(cartKey, change) {
        if (cart[cartKey]) {
          cart[cartKey].quantity += change;
          if (cart[cartKey].quantity <= 0) {
            delete cart[cartKey];
          }
        }
        renderCart();
      }

      function renderCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        const itemKeysInCart = Object.keys(cart);

        if (itemKeysInCart.length === 0) {
          emptyCartMessage.classList.add('hidden'); // Keep hidden for now, will show if no items
          cartTotalElement.classList.add('hidden');
          checkoutButton.classList.add('hidden');
        } else {
          emptyCartMessage.classList.add('hidden');
          cartTotalElement.classList.remove('hidden');
          checkoutButton.classList.remove('hidden');

          itemKeysInCart.forEach(cartKey => {
            const item = cart[cartKey];
            const itemPriceDisplay = (item.price / 100).toFixed(2);
            const itemTotal = ((item.price / 100) * item.quantity).toFixed(2);

            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md';
            itemElement.innerHTML = `
              <div class="flex items-center space-x-4">
                <img src="${item.imageUrl}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
                <div>
                  <h4 class="text-lg font-semibold text-white">${item.name}</h4>
                  <p class="text-gray-400">$${itemPriceDisplay} x ${item.quantity} ${item.size ? `(Size: ${item.size})` : ''} = $${itemTotal}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button class="quantity-btn bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-600" data-cart-key="${cartKey}" data-change="-1">-</button>
                <span class="text-white">${item.quantity}</span>
                <button class="quantity-btn bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-600" data-cart-key="${cartKey}" data-change="1">+</button>
                <button class="remove-from-cart-btn bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700" data-cart-key="${cartKey}">Remove</button>
              </div>
            `;
            cartItemsList.appendChild(itemElement);
            total += (item.price / 100) * item.quantity;
          });

          document.querySelectorAll('#cart-items-list .quantity-btn').forEach(button => {
            button.addEventListener('click', (event) => {
              const cartKey = event.target.dataset.cartKey;
              const change = parseInt(event.target.dataset.change);
              updateCartQuantity(cartKey, change);
            });
          });

          document.querySelectorAll('#cart-items-list .remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
              const cartKey = event.target.dataset.cartKey;
              delete cart[cartKey];
              renderCart();
            });
          });
        }
        totalAmountElement.textContent = total.toFixed(2);
        modalTotalAmount.textContent = total.toFixed(2);

        // After rendering, check if cart is truly empty to show message
        if (Object.keys(cart).length === 0) {
            emptyCartMessage.classList.remove('hidden');
        }
      }

      function updateNavIndicator(activePageId) {
          const newActiveNavLinkLi = document.querySelector(`nav ul li[data-page-id="${activePageId}"]`);

          if (newActiveNavLinkLi === currentActiveNavLinkLi || !newActiveNavLinkLi || isNavigating) {
              if (!currentActiveNavLinkLi && newActiveNavLinkLi) {
              } else {
                  return;
              }
          }

          isNavigating = true;

          document.querySelectorAll('nav ul li a').forEach(link => {
              link.classList.remove('active-nav-link');
          });

          const navRect = newActiveNavLinkLi.closest('nav').getBoundingClientRect();
          const liRect = newActiveNavLinkLi.getBoundingClientRect();
          const activeAnchor = newActiveNavLinkLi.querySelector('a');

          if (activeAnchor) {
              activeAnchor.classList.add('active-nav-link');
          }

          const paddingX = 8;
          const paddingY = 4;
          const targetWidth = liRect.width + paddingX * 2;
          const targetHeight = liRect.height + paddingY * 2;
          const targetLeft = liRect.left - navRect.left - paddingX;
          const targetTop = liRect.top - navRect.top - paddingY;

          const currentLeft = navIndicator.offsetLeft;
          const currentWidth = navIndicator.offsetWidth;
          const currentTop = navIndicator.offsetTop;
          const currentHeight = navIndicator.offsetHeight;

          if (currentActiveNavLinkLi) {
              navIndicator.style.left = `${currentLeft}px`;
              navIndicator.style.top = `${currentTop}px`;
              navIndicator.style.width = `${currentWidth}px`;
              navIndicator.style.height = `${currentHeight}px`;
              navIndicator.style.opacity = '1';

              void navIndicator.offsetWidth;

              const currentRight = currentLeft + currentWidth;
              const targetRight = targetLeft + targetWidth;

              const minLeft = Math.min(currentLeft, targetLeft);
              const maxRight = Math.max(currentRight, targetRight);
              const stretchedWidth = maxRight - minLeft;

              navIndicator.style.left = `${minLeft}px`;
              navIndicator.style.width = `${stretchedWidth}px`;
              navIndicator.style.top = `${targetTop}px`;
              navIndicator.style.height = `${targetHeight}px`;

              navIndicator.ontransitionend = () => {
                  navIndicator.ontransitionend = null;

                  navIndicator.style.left = `${targetLeft}px`;
                  navIndicator.style.width = `${targetWidth}px`;
                  navIndicator.style.height = `${targetHeight}px`;

                  isNavigating = false;
              };

          } else {
              navIndicator.style.left = `${targetLeft}px`;
              navIndicator.style.top = `${targetTop}px`;
              navIndicator.style.width = `${targetWidth}px`;
              navIndicator.style.height = `${targetHeight}px`;
              navIndicator.style.opacity = '1';
              isNavigating = false;
          }
          currentActiveNavLinkLi = newActiveNavLinkLi;
      }

      function updateNavBarVisibility(inSupportMode) {
          mainNavItems.forEach(item => {
              item.classList.add('hidden');
          });

          supportNavItem.classList.add('hidden'); // Hide desktop support item by default

          mobileNavItems.forEach(item => {
              if (inSupportMode) {
                  if (item.id === 'mobile-support-nav-item') {
                      item.classList.remove('hidden');
                  } else {
                      item.classList.add('hidden');
                  }
              } else {
                  item.classList.remove('hidden');
              }
          });
      }


      function showPage(pageId, callback = null) {
        const allMainSections = document.querySelectorAll('#main-website-content-wrapper > section');
        allMainSections.forEach(section => {
          section.classList.remove('active-page');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
          targetPage.classList.add('active-page');
          window.scrollTo(0, 0);

          const newSupportMode = (pageId === 'support-main' || pageId === 'chat-interface');
          if (newSupportMode !== supportMode) {
              supportMode = newSupportMode;
              if (window.innerWidth < 768) {
                  updateNavBarVisibility(supportMode);
              }
          }

          if (pageId === 'shop-page') {
            renderShopItems();
          } else if (pageId === 'cart-main') {
            renderCart();
          } else if (pageId === 'onboarding-main') {
              typeMessage(onboardingTitle, "What should we call you?", callback);
          } else if (pageId === 'support-main') {
              typeMessage(supportQuestion, "What type of support do you need?", callback);
          } else if (pageId === 'chat-interface') {
              displayChatMessage("Hey, I’m UltreBot — what do you need help with today?", 'bot');
              chatInput.focus();
          } else if (pageId === 'settings-main') {
              if (!settingsInitialized) {
                  initializeSettingsPage();
                  settingsInitialized = true;
              }
          }

          if (window.innerWidth >= 768) {
              updateNavIndicator(pageId);
          }
          mobileNavOverlay.classList.remove('open');
        }
      }

      function showItemDetail(item) {
          detailItemImage.src = item.imageUrl;
          detailItemName.textContent = item.name;
          detailItemPrice.textContent = `$${(item.price / 100).toFixed(2)}`;
          detailItemDescription.textContent = item.description;

          detailAddToCartBtn.dataset.itemId = item.id;
          detailAddToCartBtn.dataset.itemName = item.name;
          detailAddToCartBtn.dataset.itemPrice = item.price;
          detailAddToCartBtn.dataset.itemImage = item.imageUrl;

          itemSizeSelect.value = 'M';

          showPage('item-detail-page');
      }

      function displayChatMessage(message, sender, isTypingIndicator = false) {
          const messageElement = document.createElement('div');
          messageElement.classList.add('chat-message-bubble');

          if (sender === 'user') {
              messageElement.classList.add('user-message');
              messageElement.textContent = message;
          } else {
              messageElement.classList.add('bot-message');
              const avatar = document.createElement('div');
              avatar.classList.add('bot-avatar');
              avatar.innerHTML = '<i class="fas fa-robot"></i>';
              messageElement.appendChild(avatar);

              const textContent = document.createElement('span');
              textContent.textContent = message;
              messageElement.appendChild(textContent);

              if (isTypingIndicator) {
                  messageElement.id = 'typing-indicator';
                  textContent.textContent = '';
                  textContent.classList.add('dot-pulse-container');
                  textContent.innerHTML = '<div class="dot-pulse"></div><div class="dot-pulse"></div><div class="dot-pulse"></div>';
              }
          }
          chatMessages.appendChild(messageElement);
          chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      async function sendChatToBot(userMessage) {
          if (isBotTyping) return;

          displayChatMessage(userMessage, 'user');
          chatHistory.push({ role: "user", content: userMessage });
          chatInput.value = '';

          isBotTyping = true;
          displayChatMessage('', 'bot', true);

          try {
              const response = await fetch(DEEPSEEK_API_URL, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
                  },
                  body: JSON.stringify({
                      model: 'deepseek-chat',
                      messages: chatHistory,
                      stream: false
                  })
              });

              if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(`API error: ${response.status} - ${errorData.message || response.statusText}`);
              }

              const data = await response.json();
              const botResponse = data.choices[0].message.content;
              chatHistory.push({ role: "assistant", content: botResponse });

              const typingIndicatorElement = document.getElementById('typing-indicator');
              if (typingIndicatorElement) {
                  typingIndicatorElement.remove();
              }

              let i = 0;
              const botMessageElement = document.createElement('div');
              botMessageElement.classList.add('chat-message-bubble', 'bot-message');
              const avatar = document.createElement('div');
              avatar.classList.add('bot-avatar');
              avatar.innerHTML = '<i class="fas fa-robot"></i>';
              botMessageElement.appendChild(avatar);
              const textContent = document.createElement('span');
              botMessageElement.appendChild(textContent);
              chatMessages.appendChild(botMessageElement);
              chatMessages.scrollTop = chatMessages.scrollHeight;

              const typingInterval = setInterval(() => {
                  if (i < botResponse.length) {
                      textContent.textContent += botResponse.charAt(i);
                      i++;
                      chatMessages.scrollTop = chatMessages.scrollHeight;
                  } else {
                      clearInterval(typingInterval);
                      isBotTyping = false;
                  }
              }, 30);
          } catch (error) {
              console.error("Error communicating with UltreBot:", error);
              const typingIndicatorElement = document.getElementById('typing-indicator');
              if (typingIndicatorElement) {
                  typingIndicatorElement.remove();
              }
              displayChatMessage("Oops! I'm having trouble connecting right now. Please try again later.", 'bot');
              isBotTyping = false;
          }
      }

      function getSettingsCategoryHtml(category) {
          let html = '';
          const userFirstName = localStorage.getItem('userFirstName') || '';
          const userLastName = localStorage.getItem('userLastName') || '';

          switch (category) {
              case 'general'

    function addSettingsEventListeners() {
          document.getElementById('save-general-settings')?.addEventListener('click', () => {
              const newFirstName = document.getElementById('general-first-name').value.trim();
              const newLastName = document.getElementById('general-last-name').value.trim();
              localStorage.setItem('userFirstName', newFirstName);
              localStorage.setItem('userLastName', newLastName);
              showMessageBox('General settings saved!');
          });
          document.getElementById('save-accessibility-settings')?.addEventListener('click', () => {
              showMessageBox('Accessibility settings saved!');
          });
          document.getElementById('download-data-btn')?.addEventListener('click', () => {
              showMessageBox('Downloading your data (simulated)!', 3000, false);
          });
          document.getElementById('save-visual-settings')?.addEventListener('click', () => {
              showMessageBox('Visual settings saved!');
          });
          document.getElementById('save-payment-method')?.addEventListener('click', () => {
              const cardNumber = document.getElementById('card-number').value.trim();
              const expiryDate = document.getElementById('expiry-date').value.trim();
              const cvv = document.getElementById('cvv').value.trim();
              if (cardNumber && expiryDate && cvv) {
                  showMessageBox('Payment method saved (simulated)!');
              } else {
                  showMessageBox('Please fill in all card details!', 3000, true);
              }
          });
          document.getElementById('save-notification-settings')?.addEventListener('click', () => {
              showMessageBox('Notification settings saved!');
          });
          document.getElementById('change-password-btn')?.addEventListener('click', () => {
              showMessageBox('Redirecting to password change (simulated)!');
          });
          document.getElementById('two-factor-auth-btn')?.addEventListener('click', () => {
              showMessageBox('Two-factor authentication setup initiated (simulated)!');
          });
          document.getElementById('view-all-activity-btn')?.addEventListener('click', () => {
              showMessageBox('Viewing all login activity (simulated)!');
          });
      }

      function renderAllSettingsSections() {
          settingsContentArea.innerHTML = '';
          const categories = ['general', 'accessibility', 'privacy', 'visuals', 'payment-method', 'notifications', 'security', 'integrations'];
          
          categories.forEach(category => {
              const title = `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} Settings`;
              const html = getSettingsCategoryHtml(category);
              const sectionWrapper = document.createElement('div');
              sectionWrapper.id = `settings-section-${category}`;
              sectionWrapper.className = 'mb-12';
              sectionWrapper.innerHTML = `
                  <h3 class="text-2xl font-bold text-white mb-4 text-left border-b border-gray-700 pb-2">${title}</h3>
                  ${html}
              `;
              settingsContentArea.appendChild(sectionWrapper);
          });

          addSettingsEventListeners();
      }

      function setupSettingsNavigation() {
          settingsNavLinks.forEach(link => {
              link.addEventListener('click', (e) => {
                  e.preventDefault();
                  const category = e.target.dataset.settingCategory;
                  const section = document.getElementById(`settings-section-${category}`);
                  if (section) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
              });
          });

          const observer = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                  const id = entry.target.id;
                  const category = id.replace('settings-section-', '');
                  const navLink = document.querySelector(`.settings-nav-link[data-setting-category="${category}"]`);
                  if (entry.isIntersecting) {
                      settingsNavLinks.forEach(l => l.classList.remove('bg-gray-700', 'text-white'));
                      if (navLink) navLink.classList.add('bg-gray-700', 'text-white');
                  }
              });
          }, { root: settingsContentContainer, threshold: 0.3, rootMargin: '0px 0px -50% 0px' });

          document.querySelectorAll('[id^="settings-section-"]').forEach(section => {
              observer.observe(section);
          });
      }
      
      function initializeSettingsPage() {
          renderAllSettingsSections();
          setupSettingsNavigation();
      }


      checkoutButton.addEventListener('click', () => {
        checkoutModalOverlay.classList.add('show');
        orderConfirmationMessage.classList.add('hidden');
        placeOrderBtn.style.display = 'block';
      });

      modalCloseBtn.addEventListener('click', () => {
        checkoutModalOverlay.classList.remove('show');
      });

      placeOrderBtn.addEventListener('click', () => {
        cart = {};
        renderCart();
        placeOrderBtn.style.display = 'none';
        orderConfirmationMessage.classList.remove('hidden');

        setTimeout(() => {
          checkoutModalOverlay.classList.remove('show');
          showPage('home-main');
        }, 2000);
      });

      detailAddToCartBtn.addEventListener('click', (event) => {
          const itemId = event.target.dataset.itemId;
          const itemName = event.target.dataset.itemName;
          const itemPrice = parseFloat(event.target.dataset.itemPrice);
          const itemImage = event.target.dataset.itemImage;
          const selectedSize = itemSizeSelect.value;
          addToCart({ id: itemId, name: itemName, price: itemPrice, imageUrl: itemImage, size: selectedSize });
          showMessageBox(`${itemName} (Size: ${selectedSize}) has successfully been added to cart!`);
      });

      backToShopBtn.addEventListener('click', () => {
          showPage('shop-page');
      });

      signInBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const email = signInEmailInput.value.trim();
          const password = signInPasswordInput.value.trim();

          signInErrorMessage.classList.add('hidden');

          if (!email || !password) {
              signInErrorMessage.textContent = 'Please enter both email and password.';
              signInErrorMessage.classList.remove('hidden');
              showMessageBox('Please fill in all fields!', 3000, true);
              return;
          }

          showMessageBox('Signed in successfully! Welcome back!', 3000);
          setTimeout(() => {
              showPage('home-main');
              signInEmailInput.value = '';
              signInPasswordInput.value = '';
          }, 1000);
      });

      signUpBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const email = signUpEmailInput.value.trim();
          const password = signUpPasswordInput.value.trim();
          const confirmPassword = signUpConfirmPasswordInput.value.trim();

          signUpErrorMessage.classList.add('hidden');

          if (!email || !password || !confirmPassword) {
              signUpErrorMessage.textContent = 'Please fill in all fields.';
              signUpErrorMessage.classList.remove('hidden');
              showMessageBox('Please fill in all fields!', 3000, true);
              return;
          }

          if (password !== confirmPassword) {
              signUpErrorMessage.textContent = 'Passwords do not match.';
              signUpErrorMessage.classList.remove('hidden');
              showMessageBox('Passwords do not match!', 3000, true);
              return;
          }

          showMessageBox('Account created successfully! Please tell us your name!', 3000);
          setTimeout(() => {
              showPage('onboarding-main');
              signUpEmailInput.value = '';
              signUpPasswordInput.value = '';
              signUpConfirmPasswordInput.value = '';
          }, 1000);
      });

      onboardingSaveBtn.addEventListener('click', () => {
          const firstName = onboardingFirstNameInput.value.trim();
          const lastName = onboardingLastNameInput.value.trim();

          onboardingErrorMessage.classList.add('hidden');

          if (!firstName || !lastName) {
              onboardingErrorMessage.textContent = 'Please enter both your first and last name.';
              onboardingErrorMessage.classList.remove('hidden');
              showMessageBox('Please fill in all fields!', 3000, true);
              return;
          }

          localStorage.setItem('userFirstName', firstName);
          localStorage.setItem('userLastName', lastName);

          showMessageBox(`Welcome, ${firstName}! Enjoy shopping!`, 3000);
          setTimeout(() => {
              showPage('home-main');
              onboardingFirstNameInput.value = '';
              onboardingLastNameInput.value = '';
          }, 1000);
      });

      document.querySelectorAll('.auth-form-container .form-link').forEach(link => {
          link.addEventListener('click', function(e) {
              e.preventDefault();
              const targetId = this.getAttribute('href').substring(1);
              showPage(targetId);
          });
      });

      quickEasyBtn.addEventListener('click', () => {
          showPage('chat-interface');
      });

      advancedSupportBtn.addEventListener('click', () => {
          window.location.href = 'mailto:support@ultre.com?subject=Support%20Request&body=Hello%20Ultre%20Support%2C%0A%0AI%20need%20help%20with%3A%0A%0A[Please%20describe%20your%20issue%20here]';
      });

      backToMainSiteBtn.addEventListener('click', () => {
          showPage('home-main');
      });

      sendChatBtn.addEventListener('click', () => {
          const message = chatInput.value.trim();
          if (message) {
              sendChatToBot(message);
          }
      });

      chatInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              sendChatBtn.click();
          }
      });

      hamburgerIcon.addEventListener('click', () => {
          mobileNavOverlay.classList.add('open');
      });

      mobileNavCloseBtn.addEventListener('click', () => {
          mobileNavOverlay.classList.remove('open');
      });

      mobileNavItems.forEach(item => {
          item.addEventListener('click', function (e) {
              e.preventDefault();
              const targetId = this.getAttribute('data-page-id');
              showPage(targetId);
              mobileNavOverlay.classList.remove('open');
          });
      });


      window.onload = function() {
        splitAndAnimateLetters('mainTagline', 1.5);

        shopButton.addEventListener('click', () => {
          transitionOverlay.classList.add('active');

          transitionOverlay.addEventListener('transitionend', function handler() {
            transitionOverlay.removeEventListener('transitionend', handler);

            introSection.classList.add('hidden-content');
            mainWebsiteContentWrapper.classList.add('active-content');

            supportMode = false;
            showPage('home-main');

            transitionOverlay.classList.remove('active');
          });
        });

        document.querySelectorAll('nav ul li a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                showPage(targetId);
            });
        });

        document.querySelectorAll('.profile-dropdown .dropdown-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                showPage(targetId);
            });
        });

        window.addEventListener('resize', () => {
            const currentPage = document.querySelector('#main-website-content-wrapper > section.active-page');
            if (currentPage) {
                if (window.innerWidth >= 768) {
                    updateNavIndicator(currentPage.id);
                }
            }
        });
    }
