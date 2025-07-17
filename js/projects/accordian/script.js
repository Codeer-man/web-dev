const data = [
  {
    title: "What is ShadCN UI?",
    content: "ShadCN UI is a component library built using Tailwind CSS and Radix UI.",
  },
  {
    title: "Why use Radix UI?",
    content: "Radix UI provides unstyled, accessible UI primitives for building components.",
  },
  {
    title: "How do I style components?",
    content: "Components are styled using Tailwind CSS, allowing full design freedom.",
  },
  {
    title: "Can I customize everything?",
    content: "Yes! Every component is local to your project and fully editable.",
  },
];


const accordian = document.querySelector(".accordina");

function createAccordian() {
  accordian.innerHTML = data
    .map(
      (acc,index) => `
        <div class="accContainer" key={${index}} >
        <div class="accTitle"> 
        ${acc.title}
        
        </div>
        
        <div class="desc">
            ${acc.content}
        </div>
        </div>
        `
    )
    .join(" ");
}

createAccordian();

const accTitle = document.querySelectorAll(".accTitle");
const accContainer = document.querySelectorAll(".accContainer");
const btn = document.querySelectorAll(".btn");

accContainer.forEach((acc) => {
  acc.addEventListener("click", () => {
    if (acc.classList.contains("active")) {
      acc.classList.remove("active");
    } else {
      accContainer.forEach((check) => {
        check.classList.remove("active");
      });
      acc.classList.add("active");
    }
  });
});
