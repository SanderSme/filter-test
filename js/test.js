const API_URL = "http://boatdatlife.flywheelsites.com/wp-json/wp/v2/posts?acf_format=standard&per_page=10";

let counter = 0;
const myFilter = document.getElementById('myFilter');
const blogList = document.querySelector('.blog-list-container')

async function getapi(url) {
    const response = await fetch (url)
    var postData = await response.json()
    let totalPages = response.headers.get("X-WP-TotalPages");
    counter += 1;
    const buttonContainer = document.querySelector(".button-container");
    if (counter == totalPages) {
      buttonContainer.style.display = "none";
    }
    if (response) {
        hideloader();
    }
    show(postData, counter);
}

getapi(API_URL);

function hideloader() {
    document.querySelector('.lds-hourglass').style.display = 'none';
}

function show(postData) {
    for (let i = 0; i < postData.length; i++) {
        const postTitle = postData[i].acf.hero_title;
        const postDate = postData[i].date.split("T")[0];
        const postSummary = postData[i].acf.summary;
        const postImage = postData[i].acf.hero_image.url;
        const postImageAlt = postData[i].acf.hero_image.alt;
        const category = postData[i].acf.category;
        const loading = document.querySelector('.lds-hourglass')
        loading.style.display = 'none'
        blogList.innerHTML += `<div class="blog-post"><img src="${postImage}" alt="${postImageAlt}" class="blog-post-img" />
              <div class="blog-info-container">
                <h2 class="post-heading post-info">${postTitle}</h2>
                <h3 class="category post-info">${category}</h3>
                <p class="post-date post-info">Posted on: ${postDate}</p>
                <p class="summary">
                  <b>Summary: </b>${postSummary}
                </p>
              </div>
              <a
                href="./blog-post.html?id=${postData[i].id}"
                class="button post-info"
                id="read-more-btn"
                >Read ></a
              ></div>`;
    }
    myFilter.onkeyup = function (event) {
        blogList.innerHTML = '';
        const searchValue = event.target.value.trim().toLowerCase();
        const filteredPosts = postData.filter(function (post) {
          if (post.acf.hero_title.toLowerCase().startsWith(searchValue)) {
            return true;
          } else if(post.acf.category.toLowerCase().startsWith(searchValue)) {
            return true
          }
        });
        for (let i = 0; i < filteredPosts.length; i++) {
          const filteredTitle = filteredPosts[i].acf.hero_title;
          blogList.innerHTML += `<div class="blog-post"><img src="${filteredPosts[i].acf.hero_image.url}" alt="${filteredPosts[i].acf.hero_image.alt}" class="blog-post-img" />
          <div class="blog-info-container">
            <h2 class="post-heading post-info">${filteredTitle}</h2>
            <h3 class="category post-info">${filteredPosts[i].acf.category}</h3>
            <p class="post-date post-info">Posted on: ${filteredPosts[i].date.split("T")[0]}</p>
            <p class="summary">
              <b>Summary: </b>${filteredPosts[i].acf.summary}
            </p>
          </div>
          <a
            href="./blog-post.html?id=${postData[i].id}"
            class="button post-info"
            id="read-more-btn"
            >Read ></a
          ></div>`
        }
      }
}
const loadMore = () => {
    getapi(counter * 10);
  };