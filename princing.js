const tabReg = document.getElementById("tab-reguler");
const tabPre = document.getElementById("tab-premiere");

const contentReg = document.getElementById("content-reguler");
const contentPre = document.getElementById("content-premiere");

tabReg.addEventListener("click", () => {
  tabReg.classList.add("active");
  tabPre.classList.remove("active");

  contentReg.classList.remove("hidden");
  contentPre.classList.add("hidden");
});

tabPre.addEventListener("click", () => {
  tabPre.classList.add("active");
  tabReg.classList.remove("active");

  contentPre.classList.remove("hidden");
  contentReg.classList.add("hidden");
});
