document.addEventListener("DOMContentLoaded", (ev) => {
  if (document.getElementById("home")) {
    //code for home page
    let main = document.querySelector("main");
    main.addEventListener("click", handleClick);
  }

  if (document.getElementById("other")) {
    //code for the `other` page
    let params = new URL(location.href).searchParams;
    if (params.has("id")) {
      let span = document.querySelector("main>p:last-child span");
      span.textContent = params.get("id");
    } else {
      //send em back to the home page
      location.href = "index.html";
    }
  }
});

function handleClick(ev) {
  ev.preventDefault();
  //stops left-click || tap from doing anything
  let target = ev.target;
  let id = target.id;
  switch (id) {
    case "myAnchor":
      //want to do something different with the anchor
      break;
    case "myButton":
      //want to do something different with the button
      break;
    case "mySpan":
      //want to do something different with the span
      break;
  }
  if (
    target.tagName == "A" ||
    target.tagName == "BUTTON" ||
    target.tagName == "SPAN"
  ) {
    let ref = target.getAttribute("data-ref");
    if (ref) {
      //never assume the user clicked the right thing...
      location.href = `other.html?id=${ref}`;
    }
  }
}
