import { writeFile } from "fs/promises";

async function fetchPostsAndComments() {
  try {
    const responsePost = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = await responsePost.json();
    // const postsData = JSON.stringify(posts, null, 2);
    // writeFile("./data/posts.json", postsData);
    // console.log("Your json file created");

    const responseComments = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1/comments "
    );
    const comments = await responseComments.json();
    // const commentsData = JSON.stringify(comments, null, 2);
    // writeFile("./data/comments.json", commentsData);
    // console.log("Your comments.json file is successfuly created");

    const myPostsAndComment = posts.map((post) => {
      post.comments = comments.filter((comment) => comment.postId === post.id);
      return post;
    });
    const myAllData = JSON.stringify(myPostsAndComment, null, 2);
    await writeFile("./data/posts.json", myAllData);
    console.log("Congrats: Your data saved in posts.json");
  } catch (error) {
    console.error(error);
  }
}
fetchPostsAndComments();
