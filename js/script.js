const API_URL =
  "http://boatdatlife.flywheelsites.com/wp-json/wp/v2/posts?acf_format=standard&per_page=6";
const carouselContent = document.querySelector(".carousel-track");

async function getPosts() {
  try {
    const response = await fetch(API_URL);
    let postData = await response.json();
    return postData;
  } catch (error) {
    console.log("ERROOOOOR");
  }
}
if (window.innerWidth > 768) {
  getPosts().then((postData) => {
    for (let i = 0; i < postData.length; i += 2) {
      const postTitle = postData[i].acf.hero_title;
      const postImage = postData[i].acf.hero_image.url;
      const postImageAlt = postData[i].acf.hero_image.alt;
      const postCategory = postData[i].acf.category;
      const postDate = postData[i].date.split("T")[0];
      let counter = i + 1;
      if (counter === 6) {
        break;
      }
      const postTitle2 = postData[counter].acf.hero_title;
      const postImage2 = postData[counter].acf.hero_image.url;
      const postImageAlt2 = postData[counter].acf.hero_image.alt;
      const postDate2 = postData[counter].date.split("T")[0];
      const postCategory2 = postData[counter].acf.category;
      carouselContent.innerHTML += `<li class="carousel-slide current-slide">
    <div class="post">
      <img src="${postImage}" alt="${postImageAlt}" class="post-img" />
      <div class="info-container">
        <h2 class="post-heading post-info">${postTitle}</h2>
        <h3 class="category post-info">${postCategory}</h3>
        <p class="post-date post-info">Posted on: ${postDate}</p>
        <a href="./blog-post.html?id=${postData[i].id}" class="button post-info"
          >Read ></a
        >
      </div>
    </div>
    <div class="post">
      <img src="${postImage2}" alt="${postImageAlt2}" class="post-img" />
      <div class="info-container">
        <h2 class="post-heading post-info">${postTitle2}</h2>
        <h3 class="category post-info">${postCategory2}</h3>
        <p class="post-date post-info">Posted on: ${postDate2}</p>
        <a href="./blog-post.html?id=${postData[counter].id}" class="button post-info"
          >Read ></a
        >
      </div>
    </div>
  </li>`;
    }

    const slides = Array.from(carouselContent.children);
    const nextBtn = document.querySelector(".next-button");
    const prevBtn = document.querySelector(".prev-button");
    const dotsNav = document.querySelector(".carousel-nav");
    const dots = Array.from(dotsNav.children);

    const slideSize = slides[0].getBoundingClientRect();
    const slideWidth = slideSize.width;

    const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + "px";
    };

    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
      track.style.transform = "translateX(-" + targetSlide.style.left + ")";
      currentSlide.classList.remove("current-slide");
      targetSlide.classList.add("current-slide");
    };

    const updateDots = (currentDot, targetDot) => {
      currentDot.classList.remove("current-slide");
      targetDot.classList.add("current-slide");
    };

    prevBtn.addEventListener("click", (e) => {
      const currentSlide = carouselContent.querySelector(".current-slide");
      const prevSlide = currentSlide.previousElementSibling;
      const currentDot = dotsNav.querySelector(".current-slide");
      const prevDot = currentDot.previousElementSibling;
      const prevIndex = slides.findIndex((slide) => slide === prevSlide);
      moveToSlide(carouselContent, currentSlide, prevSlide);
      updateDots(currentDot, prevDot);
      hideShowArrows(slides, nextBtn, prevBtn, prevIndex);
    });

    nextBtn.addEventListener("click", (e) => {
      const currentSlide = carouselContent.querySelector(".current-slide");
      const nextSlide = currentSlide.nextElementSibling;
      const currentDot = dotsNav.querySelector(".current-slide");
      const nextDot = currentDot.nextElementSibling;
      const nextIndex = slides.findIndex((slide) => slide === nextSlide);
      moveToSlide(carouselContent, currentSlide, nextSlide);
      updateDots(currentDot, nextDot);
      hideShowArrows(slides, nextBtn, prevBtn, nextIndex);
    });

    const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
      if (targetIndex === 0) {
        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.add("is-hidden");
      } else if (targetIndex === slides.length - 1) {
        prevBtn.classList.add("is-hidden");
        nextBtn.classList.remove("is-hidden");
      } else {
        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.remove("is-hidden");
      }
    };

    dotsNav.addEventListener("click", (e) => {
      const targetDot = e.target.closest("button");
      if (!targetDot) return;

      const currentSlide = carouselContent.querySelector(".current-slide");
      const currentDot = dotsNav.querySelector(".current-slide");
      const targetIndex = dots.findIndex((dot) => dot === targetDot);
      const targetSlide = slides[targetIndex];

      moveToSlide(carouselContent, currentSlide, targetSlide);
      updateDots(currentDot, targetDot);
      hideShowArrows(slides, nextBtn, prevBtn, targetIndex);
    });
  });
}

if (window.innerWidth <= 768) {
  getPosts().then((postData) => {
    for (let i = 0; i < postData.length; i++) {
      const postTitle = postData[i].acf.hero_title;
      const postImage = postData[i].acf.hero_image.url;
      const postImageAlt = postData[i].acf.hero_image.alt;
      const postCategory = postData[i].acf.category;
      const postDate = postData[i].date.split("T")[0];
      let counter = i + 1;
      if (counter === 7) {
        break;
      }
      carouselContent.innerHTML += `<li class="carousel-slide current-slide">
    <div class="post">
      <img src="${postImage}" alt="${postImageAlt}" class="post-img" />
      <div class="info-container">
        <h2 class="post-heading post-info">${postTitle}</h2>
        <h3 class="category post-info">${postCategory}</h3>
        <p class="post-date post-info">Posted on: ${postDate}</p>
        <a href="./blog-post.html?id=${postData[i].id}" class="button post-info"
          >Read ></a
        >
      </div>
    </div>
  </li>`;
    }

    const slides = Array.from(carouselContent.children);
    const nextBtn = document.querySelector(".next-button");
    const prevBtn = document.querySelector(".prev-button");
    const dotsNav = document.querySelector(".carousel-nav");
    const dots = Array.from(dotsNav.children);

    const slideSize = slides[0].getBoundingClientRect();
    const slideWidth = slideSize.width;

    const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + "px";
    };

    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
      track.style.transform = "translateX(-" + targetSlide.style.left + ")";
      currentSlide.classList.remove("current-slide");
      targetSlide.classList.add("current-slide");
    };

    const updateDots = (currentDot, targetDot) => {
      currentDot.classList.remove("current-slide");
      targetDot.classList.add("current-slide");
    };

    prevBtn.addEventListener("click", (e) => {
      const currentSlide = carouselContent.querySelector(".current-slide");
      const prevSlide = currentSlide.previousElementSibling;
      const currentDot = dotsNav.querySelector(".current-slide");
      const prevDot = currentDot.previousElementSibling;
      const prevIndex = slides.findIndex((slide) => slide === prevSlide);
      moveToSlide(carouselContent, currentSlide, prevSlide);
      updateDots(currentDot, prevDot);
      hideShowArrows(slides, nextBtn, prevBtn, prevIndex);
    });

    nextBtn.addEventListener("click", (e) => {
      const currentSlide = carouselContent.querySelector(".current-slide");
      const nextSlide = currentSlide.nextElementSibling;
      const currentDot = dotsNav.querySelector(".current-slide");
      const nextDot = currentDot.nextElementSibling;
      const nextIndex = slides.findIndex((slide) => slide === nextSlide);
      moveToSlide(carouselContent, currentSlide, nextSlide);
      updateDots(currentDot, nextDot);
      hideShowArrows(slides, nextBtn, prevBtn, nextIndex);
    });

    const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
      if (targetIndex === 0) {
        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.add("is-hidden");
      } else if (targetIndex === slides.length - 1) {
        prevBtn.classList.add("is-hidden");
        nextBtn.classList.remove("is-hidden");
      } else {
        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.remove("is-hidden");
      }
    };

    dotsNav.addEventListener("click", (e) => {
      const targetDot = e.target.closest("button");
      if (!targetDot) return;

      const currentSlide = carouselContent.querySelector(".current-slide");
      const currentDot = dotsNav.querySelector(".current-slide");
      const targetIndex = dots.findIndex((dot) => dot === targetDot);
      const targetSlide = slides[targetIndex];

      moveToSlide(carouselContent, currentSlide, targetSlide);
      updateDots(currentDot, targetDot);
      hideShowArrows(slides, nextBtn, prevBtn, targetIndex);
    });
  });
}
