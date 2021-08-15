//Get DOM Elements
const filter = document.getElementById('filter');
const newsFeed = document.getElementById('news-feed-container');
const loader = document.getElementById('loader');

//Global Variables for number of posts to fetch per api call and current page
let limit = 5;
let page = 1;

//Function to asynchronously fetch posts from API

async function fetchPosts(){
    // Fetch posts from the JSON Placeholder API
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}
 
//Function to render the posts fetched form API
async function renderPosts(){
    //Fetch the data from the API that we want to render
    const posts = await fetchPosts();
    
    
    //For each object in the posts array, render the post
    posts.forEach( post => {
        //Create a new div for the post 
        const postDiv = document.createElement('div');
        //Assign the post class to this div
        postDiv.classList.add('post');
        //Create the inner content for the main post div
        postDiv.innerHTML = `
        <!-- This is the post id -->
        <div class="post-id">${post.id}</div>
        <div class="post-content">            
            <h2 class="post-title">${post.title}</h2>
            <div class="post-body">${post.body}</div>
        </div>
        `;  
        //Render the postDiv
        newsFeed.appendChild(postDiv);
    
    });
    
}

//Function to render the CSS Loader Animation

function showLoader(){
    //Display the CSS loader animation
    loader.classList.add('show');
    // Increment the page global variable by 1
    page++;
    //Render the post from the new page
    renderPosts();
    //Reomve the CSS loader animation once post render
    loader.classList.remove('show');
    
    
    
}

//Function to filter post
function filterPost(e){
    //Save the input text as the filterKeyword
    const filterKeyword = e.target.value.toLowerCase();
    console.log(filterKeyword);
    //Get all post data from DOM
    const posts = document.querySelectorAll('.post');
    console.log(posts);
    //Process all posts in the posts node list
    posts.forEach( post => {
        //Get the title text
        const title = post.querySelector('.post-title').innerText;
        //Get the body text
        const body = post.querySelector('.post-body').innerText;
        //Check if filterKeyword exists in title or body
        if ( title.indexOf(filterKeyword) >= 0 ||   body.indexOf(filterKeyword) >= 0 ){
            //Display the post if the filterKeyword exists in title or body of post
            post.style.display = 'flex';
        }else {
            //Hide the post if the filterKeyword does not exist in the title or body of the post
            post.style.display = 'none';
        }
        
    })
    
    
    
}

//Event Listener
//Listen for scroll in the browser window
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    //Check if scrolled to bottom of page 
    if (scrollTop + clientHeight >= scrollHeight -5){
        //Display loader Animation
        showLoader();
        
    }
    
})

//Listen for input in the filter input
filter.addEventListener('input', filterPost);

renderPosts();