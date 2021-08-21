// Mobile Navbar
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

burgerIcon.addEventListener("click", () => {
  navbarMenu.classList.toggle("is-active");
  burgerIcon.classList.toggle("is-active");
});

// Commands Menu
$(".cat-toggle").on("click", function (event) {
  const element = $(this);
  const cat = element.attr("data-cat");

  $(".cmd-category").addClass("is-hidden");
  $(`#${cat}-content`).removeClass("is-hidden");

  $(".cat-toggle").removeClass("is-active");
  element.addClass("is-active");
});
