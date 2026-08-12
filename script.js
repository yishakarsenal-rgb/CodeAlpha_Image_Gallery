document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const captionTitle = document.getElementById("caption-title");
  const captionDesc = document.getElementById("caption-description");
  const closeBtn = document.querySelector(".close-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let visibleImages = [];
  let currentIndex = 0;

  function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(
      (item) => item.style.display !== "none",
    );
  }

  function updateLightboxData(item) {
    const imgSrc = item.querySelector("img").src;
    const title = item.getAttribute("data-title") || "Gallery Image";
    const description = item.getAttribute("data-description") || "";

    lightboxImg.src = imgSrc;
    captionTitle.textContent = title;
    captionDesc.textContent = description;
  }

  // Open Lightbox
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      updateVisibleImages();
      currentIndex = visibleImages.indexOf(item);
      updateLightboxData(item);
      lightbox.style.display = "flex";
    });
  });

  // Navigation Logic
  function showImage(index) {
    if (index < 0) {
      currentIndex = visibleImages.length - 1;
    } else if (index >= visibleImages.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    updateLightboxData(visibleImages[currentIndex]);
  }

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  // Close Lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Category Filter
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        if (category === "all" || itemCategory === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
