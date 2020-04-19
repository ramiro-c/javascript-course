function obtenerTweetsLocalStorage() {
  return localStorage.getItem("tweets") === null
    ? []
    : JSON.parse(localStorage.getItem("tweets"));
}

function agregarTweetLocalStorage(tweet) {
  let tweets = obtenerTweetsLocalStorage();
  tweets.push(tweet);
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function agregarTweet(e) {
  e.preventDefault();
  // obtener el texto del tweet
  const tweet = document.getElementById("tweet").value;

  // boton de borrar tweet
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerText = "X";

  // crear el li y agregarle el texto y el boton
  const li = document.createElement("li");
  li.innerText = tweet;
  li.appendChild(botonBorrar);

  // agregarlo a la lista de tweets
  listaTweets.appendChild(li);

  agregarTweetLocalStorage(tweet);
}

function borrarTweet(e) {
  e.preventDefault();
  // si hace click en el boton eliminar se elimina el tweet del dom
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    eliminarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

function eliminarTweetLocalStorage(tweet) {
  // obtener el texto del tweet para poder sacarlo del arreglo
  let tweetABorrar = tweet.substring(0, tweet.length - 1);

  let tweets = obtenerTweetsLocalStorage();
  console.log(tweets);

  tweets.forEach(function (tweet, index) {
    // eliminar un elemento a apartir de esa posicion
    if (tweetABorrar === tweet) tweets.splice(index, 1);
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function localStorageListo() {
  let tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet) {
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    // crear el li y agregarle el texto y el boton
    const li = document.createElement("li");
    li.innerText = tweet;
    li.appendChild(botonBorrar);

    // agregarlo a la lista de tweets
    listaTweets.appendChild(li);
  });
}

const listaTweets = document.getElementById("lista-tweets");

function eventListeners() {
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  listaTweets.addEventListener("click", borrarTweet);

  document.addEventListener("DOMContentLoaded", localStorageListo);
}
eventListeners();
