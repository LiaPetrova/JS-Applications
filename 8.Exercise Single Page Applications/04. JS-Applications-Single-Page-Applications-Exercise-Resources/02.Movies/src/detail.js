import { updateNav } from "./app.js";
import { e, showView } from "./dom.js";
import { showEdit } from "./edit.js";
import { showAddButton, showHome } from "./home.js";
const section = document.getElementById("movie-details");
section.remove();

export function showDetails(movieId) {
  getMovie(movieId);
  showView(section);
}

async function getMovie(movieId) {
  section.replaceChildren(e("p", {}, "Loading..."));
  const requests = [
    fetch("http://localhost:3030/data/movies/" + movieId),
    fetch(
      `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`
    ),
  ];
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData != null) {
    requests.push(
      fetch(
        `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userData.id}%22`
      )
    );
  }
  const [movieRes, likesRes, hasLikedRes] = await Promise.all(requests);
  const [movieData, likes, hasLiked] = await Promise.all([
    movieRes.json(),
    likesRes.json(),
    hasLikedRes && hasLikedRes.json(),
  ]);
  section.replaceChildren(createDetails(movieData, likes, hasLiked));
}

function createDetails(movieData, likes, hasLiked) {
  const controls = e(
    "div",
    { className: "col-md-4 text-center" },
    e("h3", { className: "my-3" }, "Movie Description"),
    e("p", {}, `${movieData.description}`)
  );

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData != null) {
    if (userData.id == movieData._ownerId) {
      controls.appendChild(
        e("a", { className: "btn btn-danger", href: "#" , onClick: onDelete }, "Delete")
      );
      controls.appendChild(
        e("a", {id:"editBtn", className: "btn btn-warning", href: "#",onClick:onEdit}, "Edit")
      );
    } else {
      if (hasLiked.length > 0) {
        controls.appendChild(
          e("a", { className: "btn btn-primary", href: "#", onClick: onUnlike  }, "Unlike")
        );
      } else {
        controls.appendChild(
          e(
            "a",
            { className: "btn btn-primary", onClick: onLike, href: "#" },
            "Like"
          )
        );
      }
    }
  }

  controls.appendChild(
    e("span", { className: "enrolled-span", href: "#" }, `Liked: ${likes}`)
  );

  const element = e(
    "div",
    { className: "container" },
    e(
      "div",
      { className: "row bg-light text-dark" },
      e("h1", {}, `Movie title: ${movieData.title}`),
      e(
        "div",
        { className: "col-md-8" },
        e("img", {
          className: "img-thumbnail",
          src: `${movieData.img}`,
          alt: "Movie",
        })
      ),
      controls
    )
  );
  
  return element;

  async function onLike() {
  await fetch(`http://localhost:3030/data/likes`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": userData.token,
    },
    body: JSON.stringify({ movieId: movieData._id }),
  });
  showDetails(movieData._id);
}
 
async function onUnlike() {
    const likeId = hasLiked[0]._id;
    await fetch(`http://localhost:3030/data/likes/` + likeId, {
      method: "delete",
      headers: {
        "X-Authorization": userData.token,
      }
    });
    showDetails(movieData._id);
  }

  async function onDelete() {
      await fetch (`http://localhost:3030/data/movies/${movieData._id}`, {
          method:'delete',
          headers:{
              'X-Authorization': userData.token
          }
      });
      showAddButton();
      updateNav();
      showHome();
  }

  function onEdit() {
      showEdit(movieData._id)
  }

}


/* <div class="container">
<div class="row bg-light text-dark">
    <h1>Movie title: Black Widow</h1>

    <div class="col-md-8">
        <img class="img-thumbnail" src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg" alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3">Movie Description</h3>
        <p>Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Comes on the screens 2020.</p>
        <a class="btn btn-danger" href="#">Delete</a>
        <a class="btn btn-warning" href="#">Edit</a>
        <a class="btn btn-primary" href="#">Like</a>
        <span class="enrolled-span">Liked 1</span>
    </div>
</div>
</div> */
