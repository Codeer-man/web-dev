let Id = document.getElementById("");
let name = document.getElementsByName("");
let Tagname = document.getElementsByTagName("");
let ClassName = document.getElementsByClassName("");
let msg = document.querySelector("");
let msgs = document.querySelectorAll("");

// Traversing Element
// {/* <div class="title">
//   <p class="text">Wlc to the world</p>
//   <p class="text">Wlc to the world</p>
//   <p class="text">Wlc to the world</p>
// </div>; */}
// parentNode
let txt = document.querySelector(".text");
console.log(txt.parentNode);
// cildNode
let parent = document.querySelector(".title")
console.log(parent.firstChild);
console.log(parent.firstElementChild);
console.log(parent.lastElementChild);
console.log(parent.childNodes);

// Manipulating
let div = document.createElement("div");
div.innerHTML = "<p>Wlc to the world</p>";
document.body.appendChild(div);
console.log(div);