export default function Modal(id) {
  id = id || "modal" + Math.random().toString().slice(2, 6);

  let template = (content) => /*html*/ `
    <style>
      #${id} .fade {
        position:fixed;
        top:0; left:0;
        width: 100vw;
        height:100vh;
        background: rgba(0,0,0, 0.6);
        z-index: 9999;
        display:flex;
        justify-content: center;
        align-items: center;
      }

      #${id} .content{
        min-width: 50vw;
        min-height: 30vh;
        max-width: 90vw;
        max-height: 90vh;
        background: #eee;
        color: black;
        padding: 25px;
        display: flex;
        flex-direction: column;
        
        margin-top: 80px;
        opacity: 0;
        transition: all 0.2s linear;
      }

      #${id} .content-transition {
        margin-top:0px;
        opacity: 1;
      }
    </style>

    <div class="fade" data-modalclose>
      <div class="content">
        ${content}
      </div>
    </div>
  `;

  function hide() {
    let el = document.getElementById(id);
    if (el) {
      el.parentNode.removeChild(el);
    }
  }

  function show(content) {
    hide();
    let el = document.createElement("div");
    el.id = id;
    el.innerHTML = template(content);
    document.body.appendChild(el);
    el.addEventListener("click", (ev) => {
      console.log("modal click", ev.target.dataset);
      if (ev.target.dataset.hasOwnProperty("modalclose")) {
        hide();
      }
    });
    setTimeout(
      () => el.querySelector(".content").classList.add("content-transition"),
      0
    );
  }

  return { show, hide, id };
}
