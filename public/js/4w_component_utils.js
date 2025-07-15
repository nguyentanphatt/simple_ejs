// 4WORK Component Utils - Universal module pattern
(function () {

  /**
   * Support render logo
   * Need: div id="logo-container"
   * @param url: "https://cdn.4wk.vn/mainfiles/logo/4WORK%20-%20LOGO%20SVG/4WORK%20LOGO%20-%20%20SVG-05.svg"
   * @param alt: "4work.click"
   * @param height: "h-10"
   * @param width: "w-auto"
   * @param bgColor: "bg-white"
   * @param skeletonId: "logoSkeleton"
   */
  function renderLogo({
    url = "https://cdn.4wk.vn/mainfiles/logo/4WORK%20-%20LOGO%20SVG/4WORK%20LOGO%20-%20%20SVG-05.svg",
    alt = "4work.click",
    height = "h-10",
    width = "w-auto",
    bgColor = "bg-white",
    skeletonId = "logoSkeleton",
    fallbackId = "logoFallback",
    showSkeleton = true,
    showFallback = true
  } = {}) {
    // Tạo unique IDs để tránh conflict
    const uniqueSkeletonId = skeletonId + '_' + Math.random().toString(36).substr(2, 9);
    const uniqueFallbackId = fallbackId + '_' + Math.random().toString(36).substr(2, 9);

    const skeletonHTML = showSkeleton ? `
      <div class="absolute inset-0 skeleton z-10" id="${uniqueSkeletonId}"></div>
    ` : '';

    const fallbackHTML = showFallback ? `
      <div
        class="absolute inset-0 hidden items-center justify-center bg-gray-100 z-20"
        onclick="reloadImage(this)"
        id="${uniqueFallbackId}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 512 512">
          <path fill="currentColor" d="M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/>
        </svg>
      </div>
    ` : '';

    return `
      <div class="relative ${height} ${width}">
        ${skeletonHTML}
        <!-- Logo -->
        <img
          src="${url}"
          alt="${alt}"
          class="${height} ${width} object-contain ${bgColor}"
          ${showSkeleton ? `onload="document.getElementById('${uniqueSkeletonId}')?.classList.add('hidden')"` : ''}
          ${showFallback ? `onerror="handleImageError(this, null)"` : ''}
        />
        ${fallbackHTML}
      </div>
    `;
  }

  // Render Simple Logo (không có skeleton/fallback)
  function renderSimpleLogo({
    url = "https://cdn.4wk.vn/mainfiles/logo/4WORK%20-%20LOGO%20SVG/4WORK%20LOGO%20-%20%20SVG-05.svg",
    alt = "4work.click",
    height = "h-10",
    width = "w-auto",
    bgColor = "bg-white",
    className = ""
  } = {}) {
    return `<img src="${url}" alt="${alt}" class="${height} ${width} object-contain ${bgColor} ${className}">`;
  }

  /**
   * Support render header with logo, search, auth buttons
   * Need: div id="header-container"
   * @param logo: {url, alt, height, width}
   * @param search: true/false
   * @param searchPlaceholder: "Search projects..."
   * @param authButtons: true/false
   * @param authButtonsConfig: {showLogin, showSignup, loginText, signupText, loginOnClick, signupOnClick}
   * @param containerClass: "left-0 w-full z-50 border-b border-gray-200 px-4 py-2"
   * @return html string
   * @example
   * const headerHTML = window.renderHeader({
      logo: {
        url: "https://cdn.4wk.vn/mainfiles/logo/4WORK%20-%20LOGO%20SVG/4WORK%20LOGO%20-%20%20SVG-05.svg",
        alt: "4work.click",
        height: "h-10",
        width: "w-auto"
      },
      search: true,
      searchPlaceholder: "Search projects...",
      authButtons: true,
      authButtonsConfig: {
        showLogin: true,
        showSignup: true,
        loginText: "Login",
        signupText: "Sign Up",
        loginOnClick: "handleLogin()",
        signupOnClick: "handleSignup()"
      }
    });
    document.getElementById('header-container').innerHTML = headerHTML;
   */
  function renderHeader({
    logo = {},
    search = true,
    searchPlaceholder = "Search",
    authButtons = true,
    authButtonsConfig = {},
    containerClass = "left-0 w-full z-50 border-b border-gray-200 px-4 py-2"
  } = {}) {
    // Sử dụng renderLogo với skeleton và fallback cho header
    const logoHTML = renderLogo({
      ...logo,
      showSkeleton: true,
      showFallback: true,
      skeletonId: "headerLogoSkeleton",
      fallbackId: "headerLogoFallback"
    });
    const searchHTML = search ? `
      <div class="relative hidden sm:block text-gray-500">
        <input
          class="search-bar max-w-xs border border-gray-400 focus:border-gray-500 rounded bg-gray-200 px-4 text-center outline-none "
          type="search" 
          placeholder="${searchPlaceholder}">
      </div>
    ` : '';

    const authHTML = authButtons ? renderAuthButtons(authButtonsConfig) : '';

    return `
      <nav class="${containerClass}">
        <div class="flex flex-wrap items-center justify-between md:justify-around">
          <!-- logo -->
          <div id="logo-container">
            ${logoHTML}
          </div>
          <!-- search -->
          ${searchHTML}
          ${authHTML}
        </div>
      </nav>
    `;
  }

  /**
   * Support render search bar
   * Need: div id="header-container"
   * @param placeholder: "Search"
   * @param maxWidth: "max-w-xs"
   * @param containerClass: "relative hidden sm:block text-gray-500"
   * @return html string    
   * @example
   * const searchHTML = window.renderSearchBar({
   *   placeholder: "Search",
   *   maxWidth: "max-w-xs",
   *   containerClass: "relative hidden sm:block text-gray-500"
   * });
   * document.getElementById('header-container').innerHTML += searchHTML;
   */
  function renderSearchBar({
    placeholder = "Search",
    maxWidth = "max-w-xs",
    containerClass = "relative hidden sm:block text-gray-500"
  } = {}) {
    return `
      <div class="${containerClass}">
        <input
          class="search-bar ${maxWidth} border focus:border-gray-500 rounded bg-gray-200 px-4 text-center outline-none"
          type="search" 
          placeholder="${placeholder}">
      </div>
    `;
  }

  /**
   * Support render auth buttons
   * Need: div id="auth-buttons"
   * @param containerId: "auth-buttons"
   * @param containerClass: "space-x-4"
   * @param showLogin: true/false
   * @param showSignup: true/false
   * @param loginText: "Login"
   */
  function renderAuthButtons({
    containerId = "auth-buttons",
    containerClass = "space-x-4",
    showLogin = true,
    showSignup = true,
    loginText = "Login",
    signupText = "Sign Up",
    loginOnClick = null,
    signupOnClick = null
  } = {}) {
    const loginButton = showLogin ? window.renderButton({
      text: loginText,
      variant: "danger",
      size: "sm",
      onClick: loginOnClick || "handleLogin()"
    }) : '';

    const signupButton = showSignup ? window.renderButton({
      text: signupText,
      variant: "outline",
      size: "sm",
      onClick: signupOnClick || "handleSignup()"
    }) : '';

    return `
      <div id="${containerId}" class="${containerClass}">
        ${loginButton}
        ${signupButton}
      </div>
    `;
  }

  /**
   * Support render footer with logo, links, copyright
   * Need: div id="footer-container"
   * @param logo: {url, alt, height, width}
   * @param links: [{url, text}]
   * @param copyright: "© Copyright 4Work. All Rights Reserved."
   * @param containerClass: "mt-10 border-t border-gray-100"
   * @return html string
   * @example
   * const footerHTML = window.renderFooter({
   *   logo: {
   *     url: "https://cdn.4wk.vn/mainfiles/logo/4WORK%20-%20LOGO%20SVG/4WORK%20LOGO%20-%20%20SVG-06.svg",
   *     alt: "4work.click"
   *   }
   * });
   * document.getElementById('footer-container').innerHTML = footerHTML;
   */
  function renderFooter({
    logo = {},
    links = [],
    copyright = "© Copyright 4Work. All Rights Reserved.",
    containerClass = "mt-10 border-t border-gray-100"
  } = {}) {
    // Sử dụng renderSimpleLogo cho footer (không có skeleton/fallback)
    const logoHTML = renderSimpleLogo({
      ...logo,
      height: "h-8",
      url: logo.url || "https://cdn.4wk.vn/mainfiles/logo/4WORK%20-%20LOGO%20SVG/4WORK%20LOGO%20-%20%20SVG-06.svg",
      alt: logo.alt || "Logo"
    });

    const linksHTML = links.length > 0 ? links.map(link => `
      <a href="${link.url}" class="text-sm text-gray-600 transition hover:text-[#D81B60]">${link.text}</a>
    `).join('') : `
      <a href="https://4work.click/licence#terms-of-service" class="text-sm text-gray-600 transition hover:text-[#D81B60]">Terms</a>
      <a href="https://4work.click/licence#data-privacy-policy" class="text-sm text-gray-600 transition hover:text-[#D81B60]">Privacy</a>
      <a href="https://4work.click/licence#community-standards-policy" class="text-sm text-gray-600 transition hover:text-[#D81B60]">Community</a>
      <a href="https://4work.click/licence#data-confidentiality-commitment" class="text-sm text-gray-600 transition hover:text-[#D81B60]">Commitment</a>
    `;

    return `
      <div class="${containerClass}">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-center justify-between md:items-center py-8">
            <!-- Phần bên trái: Logo và bản quyền -->
            <div class="flex flex-col sm:flex-row items-center mb-6 md:mb-0">
              <div class="flex items-center gap-x-2">
                <a href="https://4work.click" target="_blank">
                  ${logoHTML}
                </a>
              </div>
              <p class="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0">
                © Copyright <span id="current-year"></span> 4Work. All Rights Reserved.
              </p>
            </div>

            <!-- Phần bên phải: Liên kết Terms và Privacy -->
            <div class="flex flex-wrap items-start justify-center space-x-6 md:space-x-8">
              ${linksHTML}
            </div>
          </div>
        </div>
      </div>
    `;
  }


  /**
   * Support render button
   * Need: div id="button-container"
   * @param text: "Button"
   * @param type: "button"
   * @param variant: "primary"
   * @param size: "md"
   * @param disabled: false
   * @param loading: false
   * @param icon: null
   * @param onClick: null
   * @param className: ""
   * @return html string
   * @example
   * const buttonHTML = window.renderButton({
   *   text: "Button",
   *   type: "button",
   *   variant: "primary",
   *   size: "md",
   *   disabled: false,
   *   loading: false,
   *   icon: null,
   *   onClick: null,
   *   className: ""
   * });
   * document.getElementById('button-container').innerHTML = buttonHTML;
   */
  function renderButton({
    text = "Button",
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    icon = null,
    onClick = null,
    className = ""
  } = {}) {
    const baseClasses = "inline-flex items-center justify-center font-bold rounded-lg transition-colors cursor-pointer";

    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      danger: "bg-[#D81B60] text-white hover:bg-red-700"
    };

    const sizeClasses = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

    const iconHTML = icon ? `<span class="mr-2">${icon}</span>` : '';
    const loadingHTML = loading ? '<div class="w-4 h-4 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>' : '';
    const content = loading ? loadingHTML : `${iconHTML}${text}`;

    return `
      <button 
        type="${type}" 
        class="${classes}"
        ${disabled ? 'disabled' : ''}
        ${onClick ? `onclick="${onClick}"` : ''}
      >
        ${content}
      </button>
    `;
  }

  /**
   * Support handle login and signup
   * Add more logic here
   */
  function handleLogin() {
    window.location.href = 'https://app.4work.click/login';
  }

  function handleSignup() {
    window.location.href = 'https://app.4work.click/';
  }

  /**
   * Load required libraries for email encryption
   */
  function loadEmailLibraries() {
    // Load thư viện từ CDN ngay đầu file
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jsdelivr.net/npm/tweetnacl-util@0.15.1/nacl-util.min.js';
    script1.onload = () => {
        const script2 = document.createElement('script');
        script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/tweetnacl/1.0.3/nacl.min.js';
        script2.onload = () => {
            console.log('Email encryption libraries loaded successfully');
        };
        document.head.appendChild(script2);
    };
    document.head.appendChild(script1);
  }

  /**
   * Validate email format
   */
  function ValidateEmail(inputText) {
    var mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return mailformat.test(inputText);
  }

  /**
   * Show alert message
   */
  function showAlert(message, type) {
    let alert = document.createElement('div');
    alert.classList.add(
        'fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2',
        'px-5', 'py-3', 'max-w-md', 'w-full', 'rounded-lg', 'text-center', 'font-semibold',
        'z-50', 'transition-transform', 'duration-500', 'ease-in-out', 'shadow-lg'
    );

    // Add icon for better visual feedback
    let icon = '';
    if (type === 'success') {
        icon = '<i class="fas fa-check-circle"></i>';
        alert.classList.add('bg-green-100', 'text-green-600');
    } else if (type === 'error') {
        icon = '<i class="fas fa-exclamation-circle"></i>';
        alert.classList.add('bg-red-100', 'text-red-600');
    }

    alert.innerHTML = `
        <div class="flex items-center justify-center space-x-3">
            <div class="text-lg">
                ${icon}
            </div>
            <div class="text-sm">
                ${message}
            </div>
        </div>
    `;

    // Style customizations
    alert.style.position = 'fixed';
    alert.style.top = '50%';
    alert.style.left = '50%';
    alert.style.transform = 'translate(-50%, -50%)';
    alert.style.padding = '16px';
    alert.style.borderRadius = '8px';
    alert.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    alert.style.zIndex = '9999';
    alert.style.opacity = '0';
    alert.style.transition = 'opacity 0.5s ease-in-out';

    // Append the alert to the body
    document.body.appendChild(alert);

    // Fade in alert
    setTimeout(() => {
        alert.style.opacity = '1';
    }, 10);

    // Hide after 3 seconds
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 500); // Remove from DOM after fade-out
    }, 3000);
  }

  /**
   * Encrypt data with public key
   */
  function encryptWithPublicKey(data, serverPublicKeyBase64) {
    const serverPublicKey = nacl.util.decodeBase64(serverPublicKeyBase64); // Decode server public key

    // Tạo nonce (24 bytes ngẫu nhiên)
    const nonce = nacl.randomBytes(24);

    // Tạo khóa ephemeral cho client
    const ephemeralKeyPair = nacl.box.keyPair();

    // Chuyển đổi dữ liệu JSON thành Uint8Array
    const dataUint8Array = nacl.util.decodeUTF8(JSON.stringify(data));

    // Mã hóa dữ liệu
    const encrypted = nacl.box(
        dataUint8Array,
        nonce,
        serverPublicKey,
        ephemeralKeyPair.secretKey
    );

    return {
        encryptedData: nacl.util.encodeBase64(encrypted),
        nonce: nacl.util.encodeBase64(nonce),
        ephemeralPublicKey: nacl.util.encodeBase64(ephemeralKeyPair.publicKey)
    };
  }

  /**
   * Collect and send email
   */
  async function collectemail() {
    let __email = document.getElementById("__email");
    let __subject = document.getElementById("__subject");
    let __name = document.getElementById("__name");
    let __message = document.getElementById("__message");
    var element_uuiduser = document.getElementById("__uuiduser");
    let __publicKey = element_uuiduser.getAttribute("value-publicKey");
    let __idUser = element_uuiduser.getAttribute("value");
    let __csrf = element_uuiduser.getAttribute("value-csrf");
    let emailValue = __email.value;
    let subjectValue = __subject.value;
    let nameValue = __name.value;
    let messageValue = __message.value;
    let maxMessageLength = 6000;
    let maxOtherFieldsLength = 200;
    
    if (!ValidateEmail(emailValue)) {
        showAlert("Please enter a valid email address", 'error');
        return;
    }

    if (!__idUser || !__publicKey) {
        showAlert("Your session has expired", 'error');
        return;
    }

    if (!emailValue || !messageValue || !subjectValue || !nameValue) {
        showAlert("Please fill in all required fields", 'error');
        return;
    }
    
    if (messageValue.length > maxMessageLength) {
        showAlert("Message cannot exceed 6000 characters", 'error');
        return;
    }
    
    if (emailValue.length > maxOtherFieldsLength || 
        subjectValue.length > maxOtherFieldsLength || 
        nameValue.length > maxOtherFieldsLength) {
        showAlert("Each field (except message) cannot exceed 200 characters", 'error');
        return;
    }
    
    try {
        // Encrypt the data with public key
        const encryptedData = encryptWithPublicKey({
            email: emailValue,
            subject: subjectValue,
            name: nameValue,
            idUser: __idUser,
            message: messageValue
        }, __publicKey);

        // Send encrypted data to the server
        let response = await fetch("https://4work.click/api/mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUser: __idUser,
                nonce: encryptedData.nonce,
                data: encryptedData.encryptedData,
                ephemeralPublicKey: encryptedData.ephemeralPublicKey,
                token: '__token',
                csrfToken : __csrf
            })
        });

        if (response.status === 200) {
            let data = await response.json();
            if (data.success) {
                showAlert("Your message has been sent successfully", 'success');
                __email.value = '';
                __subject.value = '';
                __name.value = '';
                __message.value = '';
            } else {
                showAlert(data.message || "Your message failed to send. Please try again", 'error');
            }
        } else {
            showAlert("Your message failed to send. Please try again", 'error');
        }
    } catch (error) {
        showAlert("There was an error sending your message. Please try again later", 'error');
    }
  }

  /**
   * Support render attachments
   * Need: div id="attachments-container"
   * @param project: {files: [{name, url, size}]}
   * @return html string
   * @example
   * const attachmentsHTML = window.renderAttachment({ project: projectData });
   * document.getElementById('attachments-container').innerHTML = attachmentsHTML;
   */
  function renderAttachment({ project = {} } = {}) {
    let html = '';
    if (project.files && project.files.length > 0) {
      html += `
        <ul class="flex flex-col gap-3">
          ${project.files.map(file => {
        // Check if file is not an image
        if (!isImage(file.name)) {
          return `
                <li class="p-2 bg-gray-50 rounded-md border border-gray-200">
                  <a href="${file.url}" target="_blank"
                    class="text-blue-600 hover:text-blue-800 font-medium break-words">
                    ${file.name} (${(file.size / 1024).toFixed(2)} KB)
                  </a>
                </li>
              `;
        }
        return '';
      }).join('')}
        </ul>
      `;
    }
    if (project.link && project.link.length > 0) {
      html += `
        <ul class="flex flex-col gap-3">
          ${project.link.map(linkItem => `
            <li class="p-2 bg-gray-50 rounded-lg border border-gray-200">
              <a href="${linkItem}" target="_blank"
                class="text-blue-600 hover:text-blue-800 font-medium break-words">
                ${linkItem}
              </a>
            </li>
          `).join('')}
        </ul>
      `;
    }
    return html;
  }

  /**
   * Support render collaborators
   * Need: div id="collaborators-container"
   * @param project: {collaborators: [{_id, googleName}]}
   * @return html string
   * @example
   * const collaboratorsHTML = window.renderCollaborator({ project: projectData }); 
   * document.getElementById('collaborators-container').innerHTML = collaboratorsHTML;
   */
  function renderCollaborator({ project = {} } = {}) {
    if (!project.collaborators || project.collaborators.length === 0) return '';
    return `
      <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1 p-4 mt-16">
        <h2 class="flex gap-3 items-center justify-center text-lg font-bold">
          <svg height="24px" width="24px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"
            fill="#000000">
            <g><g><g>
              <path class="st0"
                d="M435.95,287.525c32.51,0,58.87-26.343,58.87-58.853c0-32.51-26.361-58.871-58.87-58.871 c-32.502,0-58.863,26.361-58.863,58.871C377.088,261.182,403.448,287.525,435.95,287.525z"></path>
              <path class="st0"
                d="M511.327,344.251c-2.623-15.762-15.652-37.822-25.514-47.677c-1.299-1.306-7.105-1.608-8.673-0.636 c-11.99,7.374-26.074,11.714-41.19,11.714c-15.099,0-29.184-4.34-41.175-11.714c-1.575-0.972-7.373-0.67-8.672,0.636 c-2.757,2.757-5.765,6.427-8.698,10.683c7.935,14.94,14.228,30.81,16.499,44.476c2.27,13.7,1.533,26.67-2.138,38.494 c13.038,4.717,28.673,6.787,44.183,6.787C476.404,397.014,517.804,382.987,511.327,344.251z"></path>
              <path class="st0"
                d="M254.487,262.691c52.687,0,95.403-42.716,95.403-95.402c0-52.67-42.716-95.386-95.403-95.386 c-52.678,0-95.378,42.716-95.378,95.386C159.109,219.975,201.808,262.691,254.487,262.691z"></path>
              <path class="st0"
                d="M335.269,277.303c-2.07-2.061-11.471-2.588-14.027-1.006c-19.448,11.966-42.271,18.971-66.755,18.971 c-24.466,0-47.3-7.005-66.738-18.971c-2.555-1.583-11.956-1.055-14.026,1.006c-16.021,16.004-37.136,51.782-41.384,77.288 c-10.474,62.826,56.634,85.508,122.148,85.508c65.532,0,132.639-22.682,122.165-85.508 C372.404,329.085,351.289,293.307,335.269,277.303z"></path>
              <path class="st0"
                d="M76.049,287.525c32.502,0,58.862-26.343,58.862-58.853c0-32.51-26.36-58.871-58.862-58.871 c-32.511,0-58.871,26.361-58.871,58.871C17.178,261.182,43.538,287.525,76.049,287.525z"></path>
              <path class="st0"
                d="M115.094,351.733c2.414-14.353,9.225-31.253,17.764-46.88c-2.38-3.251-4.759-6.083-6.955-8.279 c-1.299-1.306-7.097-1.608-8.672-0.636c-11.991,7.374-26.076,11.714-41.182,11.714c-15.108,0-29.202-4.34-41.183-11.714 c-1.568-0.972-7.382-0.67-8.681,0.636c-9.887,9.854-22.882,31.915-25.514,47.677c-6.468,38.736,34.924,52.762,75.378,52.762 c14.437,0,29.016-1.777,41.459-5.84C113.587,379.108,112.757,365.835,115.094,351.733z"></path>
            </g></g></g>
          </svg>
          Meet the team
        </h2>
        <div class="mx-auto w-full max-w-2xl">
          <div class="flex flex-wrap justify-center gap-4 overflow-y-auto max-h-48">
            ${project.collaborators.map(collaborator => {
      const id = collaborator._id && collaborator._id.$oid ? collaborator._id.$oid : collaborator._id;
      return `
                <a href="https://4work.click/verifybadge/${id}" target="_blank" rel="noopener noreferrer">
                  <div class="flex-shrink-0 relative group">
                    <img class="skeleton w-11 h-11 rounded-full hover-trigger"
                      onerror="this.src='https://cdn.4wk.vn/mainfiles/avatar-default.png';"
                      src="https://cdn.4wk.vn/${id}/favicon/48x48.png"
                      alt="${collaborator.googleName} avatar"
                      data-user-id="${id}">
                  </div>
                </a>
              `;
    }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Support render contact form
   * Need: div id="contact-container"
   * @param project: {settings: {quickContact: true}}
   * @param info: {idUser: {_id, key: {public: ''}}}
   * @param csrfToken: ''
   * @return html string
   * @example
   * const contactHTML = window.renderContact({ project: projectData, info: infoData, csrfToken: csrfToken });
   * document.getElementById('contact-container').innerHTML = contactHTML;
   */
  function renderContact({ project = {}, info = {}, csrfToken = '' } = {}) {
    if (!project.settings || !project.settings.quickContact) return '';
    return `
      <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1 p-4 mt-16">
        <h2 class="flex gap-3 items-center justify-center text-lg font-bold">
          <svg height="24px" width="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Contact me
        </h2>
        <div class="mx-auto w-full max-w-sm">
          <form id='__uuiduser' value="${info.idUser && info.idUser._id ? info.idUser._id : ''}" value-publicKey="${info.idUser && info.idUser.key ? info.idUser.key.public : ''}" value-csrf="${csrfToken}" method="post" class="ml-auto space-y-4">
            <input type='text' id="__name" name="name" placeholder='Your Name'
              class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            <input type='email' id="__email" name="email" placeholder='Your Email'
              class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            <input type='text' id="__subject" name="subject" placeholder='Subject' value="Interest in Your Project : ${project.projectName || ''}"
              class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            <textarea id="__message" name="message" placeholder='Message' rows="8" class="w-full rounded-md px-4 bg-gray-100 text-gray-800 text-sm pt-3 outline-blue-500 focus:bg-transparent">Hi ${info.fullName || ''}, I recently came across your project and I was really impressed by your work. I'm very interested in learning more and would love to discuss potential opportunities to collaborate or get more information on your project. Please feel free to reach out to me at your convenience, I look forward to hearing from you soon!
            </textarea>
            <button type='button' onclick="collectemail()"
              class="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6 cursor-pointer">Send</button>
          </form>
        </div>
      </div>
    `;
  }

  /**
   * Support render related projects
   * Need: div id="related-projects-container"
   * @param relatedProject: [{_id, projectName, file, files, time, op_description,...}]
   * @return html string
   * @example
   * const relatedHTML = window.renderRelated({ relatedProject: relatedProjectData });
   * document.getElementById('related-projects-container').innerHTML = relatedHTML;
   */
  function renderRelated({ relatedProject = [] } = {}) {
    if (!relatedProject || relatedProject.length === 0) return '';
    return `
      <div class="flex flex-col gap-4 p-6 mt-12 max-w-4xl mx-auto">
        <h2 class="flex gap-3 items-center justify-center text-lg font-bold">
          Related Projects
        </h2>
        <ul class="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start">
          ${relatedProject.map(project => {
      const id = project._id && project._id.$oid ? project._id.$oid : project._id;
      const img = project.file || project.files[0].url
      return `
              <li class="relative flex flex-col sm:flex-row xl:flex-col items-start">
                <div class="order-1 sm:ml-6 xl:ml-0">
                  <h3 class="mb-1 text-slate-900 font-semibold">
                    <span class="mb-1 block text-sm leading-6 text-indigo-500">${project.time || ''}</span>
                    ${project.projectName && project.projectName.length > 50 ? project.projectName.substring(0, 50) + '...' : project.projectName || ''}
                  </h3>
                  <div class="prose prose-slate prose-sm text-slate-600">
                    <p>${project.op_description && project.op_description.length > 150 ? project.op_description.substring(0, 150) + '...' : project.op_description || ''}</p>
                  </div>
                  
                  <a class="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6" href="https://4work.click/projects/project-detail?id=${id}">
                    Learn more
                    <svg class="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M0 0L3 3L0 6"></path>
                    </svg>
                  </a>
                </div>
                <img loading="lazy" onerror="handleImageError(this)" style="height: 25vh;" src="${img}" alt="${project.projectName || ''}" class="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[300px] sm:h-auto xl:w-full xl:h-auto object-cover">
              </li>
            `;
    }).join('')}
        </ul>
      </div>
    `;
  }

  /**
   * Support render user info
   * Need: div id="user-container"
   * @param project: {_id, createdAt, updatedAt, clicks}
   * @return html string
   * @example
   * const userInfoHTML = window.renderUser({ project: projectData });  
   * document.getElementById('user-container').innerHTML = userInfoHTML;
   */
  function renderUser({ project = {} } = {}) {
    const projectId = project._id && project._id.$oid ? project._id.$oid : project._id;
    const containerId = '__user_info_container';

    fetch('/api/projects/get-identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId })
      })
      .then(res => res.json())
      .then(data => {
        const info = data.info || {};
        const userId = info.idUser && info.idUser._id ? info.idUser._id : '';
        const userUrl = info.idUser && info.idUser.url ? info.idUser.url : '';
        const userFullName = info.fullName || '';
        const userAvatar = `https://cdn.4wk.vn/${userId}/favicon/57x57.png`;
        const projectClicks = project.clicks || 0;
        function formatViews(views) {
            if (views === 1) return '1 View';
            if (views >= 1e9) return (views / 1e9).toFixed(1) + 'B Views';
            if (views >= 1e6) return (views / 1e6).toFixed(1) + 'M Views';
            if (views >= 1e3) return (views / 1e3).toFixed(1) + 'K Views';
            return views + ' Views';
        }
        function formatDate(date) {
            if (!date) return '';
            try {
                return new Date(date.$date || date).toLocaleString();
            } catch {
                return '';
            }
        }
        document.getElementById(containerId).innerHTML = `
          <div class="w-full mx-auto space-y-4 text-center">
            <p class="text-sm dark:text-gray-600">Created by
              <a data-user-id="${userId}" rel="noopener noreferrer" href="https://${info.idUser && info.idUser.systemDomain ? info.idUser.systemDomain : '4work.click'}/${userUrl}" class="hover-trigger underline dark:text-violet-600">
                <span itemprop="name" class="pr-1">
                  ${userFullName}
                </span>
              </a>on
              <time>
                ${formatDate(project.createdAt)}
              </time>
            </p>
            ${project.updatedAt ? `
            <p class="text-sm dark:text-gray-600">Last updated on 
              <time>
                ${formatDate(project.updatedAt)}
              </time>
            </p>
            ` : ''}
            <a href="https://4work.click/projects/rss/${userId}" target="_blank" rel="noopener noreferrer" class="text-orange-500 dark:text-orange-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[16px] h-[16px] fill-current">
                <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM96 136c0-13.3 10.7-24 24-24c137 0 248 111 248 248c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-110.5-89.5-200-200-200c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24c83.9 0 152 68.1 152 152c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4-46.6-104-104-104c-13.3 0-24-10.7-24-24zm0 120a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>
              </svg>
            </a>
          </div>
          <div class="flex items-center">
            <a data-user-id="${userId}" class="hover-trigger" href="https://4work.click/verifybadge/${userId}" rel="noopener noreferrer">
              <img class="skeleton w-12 h-12 object-cover rounded-full" onerror="this.src='https://cdn.4wk.vn/mainfiles/avatar-default.png';" src="${userAvatar}" alt="${userFullName}" />
            </a>
            <div class="ml-4">
              <div class="flex items-center font-semibold">
                <h4 class="capitalize">
                  <a data-user-id="${userId}" id="__user_fullName" href="https://4work.click/verifybadge/${userId}" class="hover-trigger text-inherit hover:underline" rel="noopener noreferrer" title="${userFullName}">
                    ${userFullName.length > 30 ? userFullName.substring(0, 30) + '...' : userFullName}
                  </a>
                </h4>
                <a id="__user_verified_badge" href="https://4work.click/docs/verified-badge.html" target="_blank" style="cursor: pointer;"></a>
              </div>
              <div class="flex items-center text-sm text-gray-400">
                <p id="__user_url">@${userUrl}</p>
                <span class="text-xs mx-2">•</span>
                <span id="__project_clicks" class="text-xs">
                  ${projectClicks ? (projectClicks > 1 ? formatViews(projectClicks) : projectClicks + ' View') : '0 View'}
                </span>
              </div>
            </div>
          </div>
        `;
        // Badge
        const badgeElement = document.getElementById('__user_verified_badge');
        if (badgeElement) {
            if (info.idUser && info.idUser.verifyBadge > 0) {
                badgeElement.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" style="vertical-align:middle;margin-left:5px">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%">
                    <stop offset="0%" style="stop-color:gold;stop-opacity:1"></stop>
                    <stop offset="50%" style="stop-color:#ffc107;stop-opacity:1"></stop>
                    <stop offset="100%" style="stop-color:orange;stop-opacity:1"></stop>
                  </linearGradient>
                  <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%">
                    <stop offset="0%" style="stop-color:silver;stop-opacity:1"></stop>
                    <stop offset="50%" style="stop-color:#d3d3d3;stop-opacity:1"></stop>
                    <stop offset="100%" style="stop-color:#a9a9a9;stop-opacity:1"></stop>
                  </linearGradient>
                </defs>
                <g id="SVGRepo_iconCarrier">
                  <path d="M21.5609 10.7386L20.2009 9.15859C19.9409 8.85859 19.7309 8.29859 19.7309 7.89859V6.19859C19.7309 5.13859 18.8609 4.26859 17.8009 4.26859H16.1009C15.7109 4.26859 15.1409 4.05859 14.8409 3.79859L13.2609 2.43859C12.5709 1.84859 11.4409 1.84859 10.7409 2.43859L9.17086 3.80859C8.87086 4.05859 8.30086 4.26859 7.91086 4.26859H6.18086C5.12086 4.26859 4.25086 5.13859 4.25086 6.19859V7.90859C4.25086 8.29859 4.04086 8.85859 3.79086 9.15859L2.44086 10.7486C1.86086 11.4386 1.86086 12.5586 2.44086 13.2486L3.79086 14.8386C4.04086 15.1386 4.25086 15.6986 4.25086 16.0886V17.7986C4.25086 18.8586 5.12086 19.7286 6.18086 19.7286H7.91086C8.30086 19.7286 8.87086 19.9386 9.17086 20.1986L10.7509 21.5586C11.4409 22.1486 12.5709 22.1486 13.2709 21.5586L14.8509 20.1986C15.1509 19.9386 15.7109 19.7286 16.1109 19.7286H17.8109C18.8709 19.7286 19.7409 18.8586 19.7409 17.7986V16.0986C19.7409 15.7086 19.9509 15.1386 20.2109 14.8386L21.5709 13.2586C22.1509 12.5686 22.1509 11.4286 21.5609 10.7386ZM16.1609 10.1086L11.3309 14.9386C11.1909 15.0786 11.0009 15.1586 10.8009 15.1586C10.6009 15.1586 10.4109 15.0786 10.2709 14.9386L7.85086 12.5186C7.56086 12.2286 7.56086 11.7486 7.85086 11.4586C8.14086 11.1686 8.62086 11.1686 8.91086 11.4586L10.8009 13.3486L15.1009 9.04859C15.3909 8.75859 15.8709 8.75859 16.1609 9.04859C16.4509 9.33859 16.4509 9.81859 16.1609 10.1086Z"
            fill="${info.idUser.verifyBadge === 1 ? '#1DA1F2' : info.idUser.verifyBadge === 2 ? 'url(#goldGradient)' : 'url(#silverGradient)'}">
                  </path>
                </g>
              </svg>
            `;
          } else {
            badgeElement.innerHTML = "";
          }
        }
    })
    .catch(() => {
        document.getElementById(containerId).innerHTML = '<div class="text-red-500">Failed to load user info.</div>';
    });
 
    return `<div id="${containerId}" class="max-w-2xl px-6 py-6 mx-auto space-y-12"><div>Loading user info...</div></div>`;
  }

  /**
   * Support render hover card for user profile
   * Need: div id="user-info-container"
   * @param project: {_id, createdAt, updatedAt, clicks}
   * @return html string
   * @example
   * const userInfoHTML = window.renderUser({ project: projectData });
   * document.getElementById('user-info-container').innerHTML = userInfoHTML;
   */
  const _embed_profile_hover = () => {

    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      return { init: () => { } };
    }

    const hoverCard = document.createElement('div');
    hoverCard.className = 'hover-card';
    hoverCard.style.display = 'none';
    hoverCard.style.position = 'absolute';
    hoverCard.style.zIndex = '1000';
    document.body.appendChild(hoverCard);

    const style = document.createElement('style');
    style.textContent = `
      .hover-card {
        background: white;
        border: 1px solid #ccc;
        border-radius: 12px;
        box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        padding: 15px;
        max-width: 400px;
        overflow: hidden;
        transition: opacity 0.2s;
        font-size: 14px;
      }
      .hover-trigger {
        position: relative;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
    
    const fetchProfile = async (userId) => {
      try {
        const response = await fetch(`/embed/profile?id=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        // Build HTML từ data
        return `
          <div class="w-full h-auto bg-white p-2">
            <!-- Cover Image -->
            <div class="relative w-full max-w-4xl mx-auto h-24 sm:h-32 md:h-40">
              <img src="https://cdn.4wk.vn/${data.idUser}/cover/300x120.jpg" alt="Cover Image"
                class="w-full h-full object-cover rounded-md"
                loading="lazy" onerror="handleHoverImageError(this)">
              <div class="absolute bottom-0 left-4 transform translate-y-1/2">
                <img class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-4 border-white shadow-md"
                  src="https://cdn.4wk.vn/${data.idUser}/favicon/120x120.png" alt="Profile" 
                  loading="lazy" onerror="handleHoverImageError(this)">
              </div>
            </div>
            <!-- Profile Info -->
            <div class="w-full max-w-4xl mx-auto p-4 pt-10 relative">
              <div class="absolute top-2 right-4">
                <a href="https://4work.tips/${data.username}" target="_blank"
                  class="mr-1 px-3 py-1 text-xs sm:text-sm font-medium text-gray-600 bg-white border rounded-full hover:bg-gray-100">
                  <i class="me-2 fa-regular fa-lightbulb"></i>My Tips
                </a>
                <a href="https://${data.systemDomain}/${data.username}" target="_blank"
                  class="px-3 py-1 text-xs sm:text-sm font-medium text-gray-600 bg-white border rounded-full hover:bg-gray-100">
                  <i class="me-2 fa-solid fa-briefcase"></i>My Portfolio
                </a>
              </div>
              <div>
                <div class="flex items-center">
                  <h1 class="text-lg sm:text-xl font-semibold truncate-text">${data.googleName}</h1>
                  ${[1, 2, 3].includes(data.verifyBadge) ? `
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" style="vertical-align:middle;margin-left:5px">
                      <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%">
                          <stop offset="0%" style="stop-color:gold;stop-opacity:1"></stop>
                          <stop offset="50%" style="stop-color:#ffc107;stop-opacity:1"></stop>
                          <stop offset="100%" style="stop-color:orange;stop-opacity:1"></stop>
                        </linearGradient>
                        <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%">
                          <stop offset="0%" style="stop-color:silver;stop-opacity:1"></stop>
                          <stop offset="50%" style="stop-color:#d3d3d3;stop-opacity:1"></stop>
                          <stop offset="100%" style="stop-color:#a9a9a9;stop-opacity:1"></stop>
                        </linearGradient>
                      </defs>
                      <g id="SVGRepo_iconCarrier">
                        <path 
                          d="M21.5609 10.7386L20.2009 9.15859C19.9409 8.85859 19.7309 8.29859 19.7309 7.89859V6.19859C19.7309 5.13859 18.8609 4.26859 17.8009 4.26859H16.1009C15.7109 4.26859 15.1409 4.05859 14.8409 3.79859L13.2609 2.43859C12.5709 1.84859 11.4409 1.84859 10.7409 2.43859L9.17086 3.80859C8.87086 4.05859 8.30086 4.26859 7.91086 4.26859H6.18086C5.12086 4.26859 4.25086 5.13859 4.25086 6.19859V7.90859C4.25086 8.29859 4.04086 8.85859 3.79086 9.15859L2.44086 10.7486C1.86086 11.4386 1.86086 12.5586 2.44086 13.2486L3.79086 14.8386C4.04086 15.1386 4.25086 15.6986 4.25086 16.0886V17.7986C4.25086 18.8586 5.12086 19.7286 6.18086 19.7286H7.91086C8.30086 19.7286 8.87086 19.9386 9.17086 20.1986L10.7509 21.5586C11.4409 22.1486 12.5709 22.1486 13.2709 21.5586L14.8509 20.1986C15.1509 19.9386 15.7109 19.7286 16.1109 19.7286H17.8109C18.8709 19.7286 19.7409 18.8586 19.7409 17.7986V16.0986C19.7409 15.7086 19.9509 15.1386 20.2109 14.8386L21.5709 13.2586C22.1509 12.5686 22.1509 11.4286 21.5609 10.7386ZM16.1609 10.1086L11.3309 14.9386C11.1909 15.0786 11.0009 15.1586 10.8009 15.1586C10.6009 15.1586 10.4109 15.0786 10.2709 14.9386L7.85086 12.5186C7.56086 12.2286 7.56086 11.7486 7.85086 11.4586C8.14086 11.1686 8.62086 11.1686 8.91086 11.4586L10.8009 13.3486L15.1009 9.04859C15.3909 8.75859 15.8709 8.75859 16.1609 9.04859C16.4509 9.33859 16.4509 9.81859 16.1609 10.1086Z"
                        fill="${data.verifyBadge === 1 ? '#1DA1F2' : data.verifyBadge === 2 ? 'url(#goldGradient)' : 'url(#silverGradient)'}">
                      </path>
                    </g>
                  </svg>
                  ` : ''
                  }
              </div>
              <h2 class="text-sm text-gray-500 truncate-text">@${data.username}</h2>
              <p class="text-gray-600 text-sm mt-2 break-words">${data.slogan || ''}</p>
              <!-- Info -->
              <div class="flex flex-wrap items-center gap-x-3 text-xs text-gray-500 mt-2">
                <span class="whitespace-nowrap"><i class="fa-regular fa-flag mr-1"></i>Joined <a
                  href="https://4work.click" target="_blank" class="text-blue-600 hover:underline">4Work </a>in ${new Date(data.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' })}</span>
                <span class="whitespace-nowrap"><i class="fa-solid fa-link mr-1"></i><a
                  href="https://${data.systemDomain}/in/${data.username}" target="_blank"
                  class="text-blue-600 hover:underline">${data.systemDomain}/in/${data.username}</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
      } catch (error) {
        console.error('Error fetching profile:', error);
        return '<p>Error loading profile</p>';
      }
    };
      
    // Xử lý sự kiện hover
    const handleHover = async (event, userId) => {
      const rect = event.target.getBoundingClientRect();
      hoverCard.style.top = `${rect.bottom + window.scrollY + 5}px`;
      hoverCard.style.left = `${rect.left + window.scrollX}px`;
      hoverCard.innerHTML = '<p>Loading...</p>';
      hoverCard.style.display = 'block';
      const profileHtml = await fetchProfile(userId);
      hoverCard.innerHTML = profileHtml;
    };
    // Gắn sự kiện cho các phần tử có class hover-trigger
    const init = () => {
      let isHoveringCard = false;
      let timeout;
      document.querySelectorAll('.hover-trigger').forEach(element => {
        const userId = element.dataset.userId;
        if (!userId) return;
        element.addEventListener('mouseenter', (e) => {
          console.log("mouseenter", userId);

          clearTimeout(timeout);
          timeout = setTimeout(() => {
            if (!isHoveringCard) handleHover(e, userId);
          }, 300);
        });
        element.addEventListener('mouseleave', () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            if (!isHoveringCard) {
              hoverCard.style.display = 'none';
              hoverCard.innerHTML = '';
            }
          }, 200);
        });
        hoverCard.addEventListener('mouseenter', () => {
          clearTimeout(timeout);
          isHoveringCard = true;
        });
        hoverCard.addEventListener('mouseleave', () => {
          isHoveringCard = false;
          timeout = setTimeout(() => {
            hoverCard.style.display = 'none';
            hoverCard.innerHTML = '';
          }, 200);
        });
      });
    };
    return { init };
  };
  // Tự động khởi tạo hover card khi DOMContentLoaded
  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      if (window._embed_profile_hover) {
        window._embed_profile_hover().init();
      }
    });
    window._embed_profile_hover = _embed_profile_hover;
  }

  function handleHoverImageError(imgElement, retryCallback) {
    // Tạo container thay thế ảnh lỗi
    const container = document.createElement('div');
    container.className = (imgElement.className || '') + ' bg-gray-200 flex flex-col items-center justify-center cursor-pointer';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.background = '#f3f4f6'; 

    // Copy kích thước nếu có
    if (imgElement.width) container.style.width = imgElement.width + 'px';
    if (imgElement.height) container.style.height = imgElement.height + 'px';
    if (imgElement.style.width) container.style.width = imgElement.style.width;
    if (imgElement.style.height) container.style.height = imgElement.style.height;

    // Nếu có aspect ratio
    const aspect = getComputedStyle(imgElement).aspectRatio;
    if (aspect) container.style.aspectRatio = aspect;

    // Nếu vẫn chưa có kích thước, set mặc định
    if (!container.style.width) container.style.width = '100%';
    if (!container.style.height) container.style.height = '200px';

    // SVG reload icon
    const reloadIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    reloadIcon.setAttribute('width', '32');
    reloadIcon.setAttribute('height', '32');
    reloadIcon.setAttribute('viewBox', '0 0 24 24');
    reloadIcon.setAttribute('fill', 'none');
    reloadIcon.innerHTML = `
        <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4
            c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8
            c3.73 0 6.84-2.55 7.73-6h-2.08
            A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6
            s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            fill="#4B5563"/>
    `;

    container.appendChild(reloadIcon);

    // Khi click thì tạo ảnh mới và retry
    container.addEventListener('click', () => {
        const newImg = document.createElement('img');
        newImg.src = imgElement.src;
        newImg.alt = imgElement.alt;
        newImg.className = imgElement.className;
        newImg.style.cssText = imgElement.style.cssText;
        newImg.onerror = () => handleHoverImageError(newImg, retryCallback);
        if (imgElement.onclick) newImg.onclick = imgElement.onclick;
        container.replaceWith(newImg);
        if (retryCallback) retryCallback();
    });

    // Thay ảnh lỗi bằng container fallback
    imgElement.replaceWith(container);
}

  function reloadHoverImage(img) {
    const wrapper = img.closest('.relative') || img.parentElement;
    if (!wrapper) return;
    const fallback = wrapper.querySelector('.absolute.inset-0.z-20');
    const skeleton = wrapper.querySelector('.skeleton');
    if (!img || !fallback || !skeleton) return;
    fallback.classList.add('hidden');
    fallback.classList.remove('flex');
    img.classList.remove('hidden');
    img._isError = false;
    skeleton.classList.remove('hidden');
    const originalSrc = img.src.split('?')[0];
    img.src = originalSrc + '?t=' + Date.now();
  }

  // Đảm bảo export ra window
  if (typeof window !== 'undefined') {
    window.handleHoverImageError = handleHoverImageError;
    window.reloadHoverImage = reloadHoverImage;
  }

  // Make available for both server and client
  if (typeof module !== 'undefined' && module.exports) {
    // Server-side (Node.js)
    module.exports = {
      renderLogo,
      renderSimpleLogo,
      renderHeader,
      renderSearchBar,
      renderAuthButtons,
      renderFooter,
      renderButton,
      renderAttachment,
      renderCollaborator,
      renderContact,
      renderRelated,
      renderUser,
      loadEmailLibraries,
      ValidateEmail,
      showAlert,
      encryptWithPublicKey,
      collectemail
    };
  } else {
    // Client-side (Browser)
    window.renderLogo = renderLogo;
    window.renderSimpleLogo = renderSimpleLogo;
    window.renderHeader = renderHeader;
    window.renderSearchBar = renderSearchBar;
    window.renderAuthButtons = renderAuthButtons;
    window.renderFooter = renderFooter;
    window.renderButton = renderButton;
    window.handleLogin = handleLogin;
    window.handleSignup = handleSignup;
    window.renderAttachment = renderAttachment;
    window.renderCollaborator = renderCollaborator;
    window.renderContact = renderContact;
    window.renderRelated = renderRelated;
    window.renderUser = renderUser;
    window.loadEmailLibraries = loadEmailLibraries;
    window.ValidateEmail = ValidateEmail;
    window.showAlert = showAlert;
    window.encryptWithPublicKey = encryptWithPublicKey;
    window.collectemail = collectemail;
  }
})(); 