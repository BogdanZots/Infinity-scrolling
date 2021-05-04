const postsContainer = document.getElementById('posts-container')
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter')
let limit = 5;
let page = 1;

async function getPosts() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = response.json()
    return data
}

async function showPosts() {
    const posts = await getPosts()
    posts.forEach(post => {
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        </div>
        `
        postsContainer.append(postEl)
    });
}

showPosts()

function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show')
        setTimeout(() => {
            page++;
            showPosts()
        }, 300);
    }, 1000);
}


function filterWords() {
    console.log(filter.value)
    const posts = Array.from(document.getElementsByClassName('post-title'))
    posts.forEach(function (item) {
        item.textContent.includes(filter.value) ? item.closest('div .post').classList.remove('hidden') : item.closest('div .post').classList.add('hidden')
    })

}


filter.addEventListener('input', filterWords)

window.addEventListener('scroll', () => {

    const {
        scrollTop,
        scrollHeight,
        clientHeight
} = document.documentElement;
  scrollTop + clientHeight >= scrollHeight ? showLoading() : null
})