const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

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

  console.log(responseData.comments);

  if (responseData.comments && responseData.comments.length > 0) {
    const commentsListElement = createCommentsList(responseData);
    commentsSectionElement.innerHTML = "";
    commentsSectionElement.appendChild(commentsListElement);
  } else {
    commentsSectionElement.firstElementChild.textContent =
      "코멘트가 없습니다! 코멘트를 등록해주세요";
  }
};

// post
const saveComment = async (event) => {
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;
  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  const response = await fetch(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
    },
  });

  fetchCommentsForPost();
};

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener("submit", saveComment);
