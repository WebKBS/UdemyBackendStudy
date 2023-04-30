const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");

const createCommentsList = (comments) => {
  const commentListElement = document.createElement("ol");

  console.log(comments.comments);

  for (const comment of comments.comments) {
    console.log(comment);

    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
    <article class="comment-item">
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>
    `;

    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
};

const fetchCommentsForPost = async (event) => {
  const postId = loadCommentsBtnElement.dataset.postid;

  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();

  //console.log(responseData.comments);

  const commentsListElement = createCommentsList(responseData);
  commentsSectionElement.innerHTML = "";
  commentsSectionElement.appendChild(commentsListElement);
};

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
