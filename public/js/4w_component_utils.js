// 4WORK Component Utils - Universal module pattern
(function() {
  
  // Render Logo Component
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

  // Render Header Component
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
        <i class="fa fa-search absolute top-0 left-0 ml-12 mt-1"></i>
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

  // Render Search Bar Component
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
        <i class="fa fa-search absolute top-0 left-0 ml-12 mt-1"></i>
      </div>
    `;
  }

  // Render Auth Buttons Container
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

  // Render Footer Component
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

  // Render Loading Spinner
  function renderSpinner({
    size = "w-6 h-6",
    color = "text-blue-600",
    containerClass = "flex justify-center items-center"
  } = {}) {
    return `
      <div class="${containerClass}">
        <svg class="animate-spin ${size} ${color}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    `;
  }

  // Render Button Component
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
    const loadingHTML = loading ? renderSpinner({size: "w-4 h-4", color: "text-current"}) : '';
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

  // Auth handler functions
  function handleLogin() {
    window.location.href = 'https://app.4work.click/login';
  }

  function handleSignup() {
    window.location.href = 'https://app.4work.click/';
  }

  // Render Attachments Component
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

  // Render Collaborators Component
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

  // Render Contact Component
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
              class="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6">Send</button>
          </form>
        </div>
      </div>
    `;
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
      renderSpinner,
      renderButton,
      renderAttachment,
      renderCollaborator,
      renderContact
    };
  } else {
    // Client-side (Browser)
    window.renderLogo = renderLogo;
    window.renderSimpleLogo = renderSimpleLogo;
    window.renderHeader = renderHeader;
    window.renderSearchBar = renderSearchBar;
    window.renderAuthButtons = renderAuthButtons;
    window.renderFooter = renderFooter;
    window.renderSpinner = renderSpinner;
    window.renderButton = renderButton;
    window.handleLogin = handleLogin;
    window.handleSignup = handleSignup;
    window.renderAttachment = renderAttachment;
    window.renderCollaborator = renderCollaborator;
    window.renderContact = renderContact;
  }
})(); 