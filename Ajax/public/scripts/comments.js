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

  try {
    const response = await fetch(`/posts/${postId}/comments`);

    if (!response.ok) {
      alert("fetch 실패!!");
      return;
    }

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
  } catch (error) {
    console.log(error);
  }
};

// post
const saveComment = async (event) => {
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;
  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  // try 서버측 오류 검사
  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ok 응답측 오류 검사
    if (response.ok) {
      fetchCommentsForPost();
    } else {
      alert("코멘트 전송에 실패했습니다!!");
    }
  } catch (error) {
    console.log(error);
    alert("request 실패!!");
  }
};

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener("submit", saveComment);
