const title = document.querySelector("title");
const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const postID = params.get("id");

const API_URL = `http://boatdatlife.flywheelsites.com/wp-json/wp/v2/posts/${postID}?acf_format=standard`;

const postHeading = document.querySelector(".general-heading");
const blogPost = document.querySelector(".blog-post");

async function getPostDetails() {
  try {
    const response = await fetch(API_URL);
    const responseJSON = await response.json();
    const singlePostDetails = responseJSON;
    console.log(singlePostDetails);
    postHeading.innerHTML = "";
    const postTitle = singlePostDetails.acf.hero_title;
    const postImage = singlePostDetails.acf.hero_image.url;
    const imageAlt = singlePostDetails.acf.hero_image.alt;
    const subImage = singlePostDetails.acf.pros_cons_image.url;
    const subAlt = singlePostDetails.acf.pros_cons_image.alt;
    const paragraph1 = singlePostDetails.acf.paragraph_1;
    const paragraph2 = singlePostDetails.acf.paragraph_2;
    const pros1 = singlePostDetails.acf.pros_1;
    const pros2 = singlePostDetails.acf.pros_2;
    const pros3 = singlePostDetails.acf.pros_3;
    const pros4 = singlePostDetails.acf.pros_4;
    const cons1 = singlePostDetails.acf.cons_1;
    const cons2 = singlePostDetails.acf.cons_2;
    const cons3 = singlePostDetails.acf.cons_3;
    const cons4 = singlePostDetails.acf.cons_4;
    title.innerHTML = `${postTitle}`;
    postHeading.innerHTML = `${postTitle}`;
    blogPost.innerHTML = `<div class="blog-flex-container">
      <img
        src="${postImage}"
        alt="${imageAlt}"
        class="post-main-img"
      />
      <p class="blog-text">
        ${paragraph1}
      </p>
    </div>
    <p class="blog-text-2">${paragraph2}</p>
    <img
      src="${subImage}"
      alt="${subAlt}"
      class="post-sub-img"
    />
    <div class="flex-container-sub">
      <div class="pros-cons good">
        <h4 class="pros-cons-heading">Favorite parts</h4>
        <ul class="arguments">
          <li class="text">${pros1}</li>
          <li class="text">${pros2}</li>
          <li class="text">${pros3}</li>
          <li class="text">${pros4}</li>
        </ul>
      </div>
      <div class="seperating-line"></div>
      <div class="pros-cons">
        <h4 class="pros-cons-heading">Challenges</h4>
        <ul class="arguments">
          <li class="text">${cons1}</li>
          <li class="text">${cons2}</li>
          <li class="text">${cons3}</li>
          <li class="text">${cons4}</li>
        </ul>
      </div>
    </div>
    <div class="overlay-container">
      <div class="post-overlay"></div>
      <div class="big-img">
        <img src="${postImage}" alt="${imageAlt}" class="main-overlay-img"/>
        <img src="${subImage}" alt="${subAlt}" class="sub-overlay-img"/>
      </div>
    </div>`;
    const postMainImg = document.querySelector(".post-main-img");
    const postSubImg = document.querySelector(".post-sub-img");
    const overlay = document.querySelector(".post-overlay");
    const overlayContainer = document.querySelector(".overlay-container");
    const mainOverlayImg = document.querySelector(".main-overlay-img");
    const subOverlayImg = document.querySelector(".sub-overlay-img");

    postMainImg.addEventListener("click", () => {
      overlayContainer.style.display = "flex";
      mainOverlayImg.style.display = "block";
      window.document.documentElement.style.overflow = "hidden";
    });

    postSubImg.addEventListener("click", () => {
      overlayContainer.style.display = "flex";
      subOverlayImg.style.display = "block";
      window.document.documentElement.style.overflow = "hidden";
    });

    overlay.addEventListener("click", () => {
      overlayContainer.style.display = "none";
      mainOverlayImg.style.display = "none";
      subOverlayImg.style.display = "none";
      window.document.documentElement.style.overflow = "unset";
    });
  } catch (error) {
    postHeading.innerHTML = "ERROR";
    blogPost.innerHTML = `<p class="error-message">Something went wrong :(</p>`;
  }
}
getPostDetails();
