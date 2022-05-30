const form = document.querySelector(".new-topic-border form");
form.addEventListener("submit", onSubmitTopic);
form.querySelectior(".cancel").addEventListener("click", (event) => {
  event.preventDefault();
  form.reset();
});

function onSubmitTopic(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get("topicName");
  const userName = formData.get("username");
  const postText = formData.get("postText");

  if (title == "" || userName == "" || postText == "") {
    alert("All fields must be filled!");
    throw new Error("All fields must be filled!");
  }
  onPostTopic(title, userName, postText);
}

async function onPostTopic(title, userName, postText) {
  try {
    const res = await fetch(
      "http://localhost:3030/jsonstore/collections/myboard/posts",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          userName,
          postText,
        }),
      }
    );
    if (res.ok != true) {
      const error = await res.json();
      throw new Error(error.message);
    }
    form.reset();
    const data = await res.json();
    console.log(data);
  } catch (err) {
    alert(err.message);
  }
}
{/* <div class="topic-name-wrapper">
  <div class="topic-name">
    <a href="#" class="normal">
      <h2>Angular 10</h2>
    </a>
    <div class="columns">
      <div>
        <p>
          Date: <time>2020-10-10T12:08:28.451Z</time>
        </p>
        <div class="nick-name">
          <p>
            Username: <span>David</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>; */}
