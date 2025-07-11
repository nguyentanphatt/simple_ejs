/**
 * Support for image modal, skeleton, fallback
 * Need: div id="image-container" for 1 image, div id="images-grid" for multiple images
 * @param url: file.url,
 * @param alt: file.alt || '',
 * @param index: index,
 * @param aspect: "4/3",
 * @param modal: true,
 * @param wrapperClass: "", // class for wrapper div
 * @param imgClass: "", // class for img
 * @param skeletonId: `skeleton-${index}` for multiple images, "mainSkeleton" for 1 image
 * @param fallbackId: `fallback-${index}` for multiple images, "mainFallback" for 1 image
 * @return html string
 * @example
 * const imageHTML = window.renderImage({
 *   url: file.url,
 *   alt: file.alt || '',
 *   index: index,
 *   aspect: "4/3",
 *   modal: true, 
 *   wrapperClass: "",
 *   imgClass: "",
 *   skeletonId: `skeleton-${index}`,
 *   fallbackId: `fallback-${index}`
 * });
 * document.getElementById('images-grid').innerHTML += imageHTML;
 */
// Universal module pattern - works on both server and client
(function() {
  let _imageModalScriptInjected = false;

  // Inject modal script and HTML immediately when file loads
  function injectModalScript() {
    if (_imageModalScriptInjected) return;
    
    // Add modal HTML to body
    const modalHTML = `
      <div id="imageModal" class="fixed inset-0 bg-black/70 z-50 hidden items-center justify-center">
        <button onclick="window.closeImageModal()" class="absolute top-[30%] right-3 md:top-[15%] md:right-[10%] lg:top-[13%] lg:right-[20%] text-white text-3xl font-bold bg-[#16161f] flex items-center justify-center rounded-full w-8 h-8 lg:w-12 lg:h-12 cursor-pointer">
          <svg xmlns='http://www.w3.org/2000/svg' class='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'/></svg>
        </button>
        <div class="relative max-w-xs md:max-w-xl lg:max-w-3xl w-full">
          <img id="modalImage" src="" alt="" class="w-full rounded shadow cursor-pointer" />
        </div>
        <button id="prevBtn" onclick="window.prevImage()" class="absolute left-1 lg:left-[20%] top-1/2 transform -translate-y-1/2 text-white text-4xl bg-[#16161f] flex items-center justify-center rounded-full w-8 h-8 lg:w-12 lg:h-12 cursor-pointer">
          <svg xmlns='http://www.w3.org/2000/svg' class='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 19l-7-7 7-7'/></svg>
        </button>
        <button id="nextBtn" onclick="window.nextImage()" class="absolute right-1 lg:right-[20%] top-1/2 transform -translate-y-1/2 text-white text-4xl bg-[#16161f] flex items-center justify-center rounded-full w-8 h-8 lg:w-12 lg:h-12 cursor-pointer">
          <svg xmlns='http://www.w3.org/2000/svg' class='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7'/></svg>
        </button>
      </div>
    `;
    
    // Add modal HTML to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Define modal functions
    window._imageModalImages = window._imageModalImages || [];
    window._imageModalCurrentIndex = null;

    window.openImageModal = function({ url, alt = '', index = null }) {
      const modal = document.getElementById('imageModal');
      const img = document.getElementById('modalImage');
      img.src = url;
      img.alt = alt;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (typeof index === 'number') {
        window._imageModalCurrentIndex = index;
      } else {
        window._imageModalCurrentIndex = null;
      }
      const isFromList = typeof index === 'number' && index > 0;
      document.getElementById('prevBtn').classList.toggle('hidden', !isFromList);
      document.getElementById('nextBtn').classList.toggle('hidden', !isFromList);
    }
    window.closeImageModal = function closeImageModal() {
      const modal = document.getElementById('imageModal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      window._imageModalCurrentIndex = null;
    }
    window.nextImage = function() {
      if (window._imageModalCurrentIndex === null || !window._imageModalImages.length) return;
      let startIndex = window._imageModalCurrentIndex;
      do {
        window._imageModalCurrentIndex = (window._imageModalCurrentIndex + 1) % window._imageModalImages.length;
        // Kiểm tra DOM element
        var img = document.querySelector('[data-index="' + window._imageModalCurrentIndex + '"]');
        if (img && !img._isError) {
          var data = window._imageModalImages[window._imageModalCurrentIndex];
          window.openImageModal({ url: data.url, alt: data.alt, index: window._imageModalCurrentIndex });
          return;
        }
      } while (window._imageModalCurrentIndex !== startIndex);
    }
    window.prevImage = function() {
      if (window._imageModalCurrentIndex === null || !window._imageModalImages.length) return;
      let startIndex = window._imageModalCurrentIndex;
      do {
        window._imageModalCurrentIndex = (window._imageModalCurrentIndex - 1 + window._imageModalImages.length) % window._imageModalImages.length;
        var img = document.querySelector('[data-index="' + window._imageModalCurrentIndex + '"]');
        if (img && !img._isError) {
          var data = window._imageModalImages[window._imageModalCurrentIndex];
          window.openImageModal({ url: data.url, alt: data.alt, index: window._imageModalCurrentIndex });
          return;
        }
      } while (window._imageModalCurrentIndex !== startIndex);
    }
    document.addEventListener('click', (e) => {
      const modal = document.getElementById('imageModal');
      if (!modal.classList.contains('hidden') && e.target === modal) {
        window.closeImageModal();
      }
    });
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('imageModal');
      if (modal.classList.contains('hidden')) return;
      switch (e.key) {
        case 'Escape': window.closeImageModal(); break;
        case 'ArrowRight': window.nextImage(); break;
        case 'ArrowLeft': window.prevImage(); break;
      }
    });
    window.handleImageError = function handleImageError(img, index) {
      const wrapper = img.closest('.relative');
      if (!wrapper) return;
      img.classList.add('hidden');
      img._isError = true;
      var skeletonId = (index !== null ? 'skeleton-' + index : 'mainSkeleton');
      var fallbackId = (index !== null ? 'fallback-' + index : 'mainFallback');
      const skeleton = document.getElementById(skeletonId);
      if (skeleton) skeleton.classList.add('hidden');
      const fallback = document.getElementById(fallbackId);
      if (fallback) {
        fallback.classList.remove('hidden');
        fallback.classList.add('flex');
      }
    }
    window.reloadImage = function reloadImage(btn) {
      const wrapper = btn.closest('.relative');
      const img = wrapper.querySelector('img');
      const fallback = btn;
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
    
    _imageModalScriptInjected = true;
  }

  function renderImage({
    url,
    alt = "",
    index = null,
    aspect = "4/3",
    modal = true,
    wrapperClass = "",
    imgClass = "",
    skeletonId = null,
    fallbackId = null,
  }) {
    // Inject modal script if not already injected
    if (!_imageModalScriptInjected) {
      injectModalScript();
    }

    const safeAlt = (alt || "").replace(/'/g, "\\'");
    const finalSkeletonId =
      skeletonId || (index !== null ? `skeleton-${index}` : "mainSkeleton");
    const finalFallbackId =
      fallbackId || (index !== null ? `fallback-${index}` : "mainFallback");

    const onClick = modal
      ? `openImageModal({ url: '${url}', alt: '${safeAlt}'${
          index !== null ? `, index: ${index}` : ""
        } })`
      : "";

    let html = `
        <div class="relative group aspect-[${aspect}] bg-gray-100 rounded-md overflow-hidden ${wrapperClass}">
          <!-- Skeleton -->
          <div class="absolute inset-0 skeleton z-10" id="${finalSkeletonId}"></div>
    
          <!-- Ảnh -->
          <img
            src="${url}"
            alt="${alt}"
            ${index !== null ? `data-index="${index}"` : ""}
            class="w-full h-full object-cover cursor-pointer ${imgClass}"
            ${onClick ? `onclick="${onClick}"` : ""}
            onload="document.getElementById('${finalSkeletonId}')?.classList.add('hidden')"
            onerror="handleImageError(this${index !== null ? `, ${index}` : ", null"})"
          />
    
          <!-- Fallback -->
          <div
            class="absolute inset-0 hidden items-center justify-center bg-gray-100 cursor-pointer z-20"
            onclick="reloadImage(this)"
            id="${finalFallbackId}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-400" viewBox="0 0 512 512">
              <path fill="currentColor" d="M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/>
            </svg>
          </div>
        </div>
      `;

    // Đăng ký ảnh vào danh sách modal (cho next/prev)
    if (modal) {
      const imageIndex = index !== null ? index - 1 : 0; // Ảnh chính có index = 0
      window._imageModalImages.push({ url: url, alt: alt }); // Đăng ký ảnh trực tiếp
    }

    return html;
  }

  // Make available for both server and client
  if (typeof module !== 'undefined' && module.exports) {
    // Server-side (Node.js)
    module.exports = { renderImage };
  } else {
    // Client-side (Browser)
    window.renderImage = renderImage;
    
    // Inject modal script immediately when file loads (if DOM is ready)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectModalScript);
    } else {
      injectModalScript();
    }
  }
})(); 