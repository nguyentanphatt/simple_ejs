/**
 * Tạo HTML ảnh có skeleton + fallback + modal onclick.
 * @param {Object} options
 * @param {string} options.url - Đường dẫn ảnh.
 * @param {string} [options.alt] - Văn bản thay thế ảnh.
 * @param {number} [options.index] - Index ảnh (dùng cho modal có prev/next).
 * @param {string} [options.aspect='4/3'] - Aspect ratio (VD: '16/9', '1/1').
 * @param {boolean} [options.modal=true] - Có bật modal khi click hay không.
 * @param {string} [options.wrapperClass=''] - Class bổ sung cho wrapper ngoài.
 * @param {string} [options.imgClass=''] - Class bổ sung cho thẻ img.
 * @param {string} [options.skeletonId] - ID của skeleton div.
 * @param {string} [options.fallbackId] - ID của fallback div.
 * @returns {string} - HTML string.
 */
function renderImageBlock({
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

  return `
      <div class="relative group aspect-[${aspect}] bg-gray-100 rounded-md overflow-hidden ${wrapperClass}">
        <!-- Skeleton -->
        <div class="absolute inset-0 skeleton z-10" id="${finalSkeletonId}"></div>
  
        <!-- Ảnh -->
        <img
          src="${url}"
          alt="${alt}"
          class="w-full h-full object-cover cursor-pointer ${imgClass}"
          ${onClick ? `onclick="${onClick}"` : ""}
          onload="document.getElementById('${finalSkeletonId}')?.classList.add('hidden')"
          onerror="handleImageError(this${index !== null ? `, ${index}` : ""})"
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
}
