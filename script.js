// Greeting text in hero
const greetingText = document.getElementById("greetingText");
function setGreeting() {
  const hour = new Date().getHours();
  let text = "Welcome to Recipe Finder";

  if (hour >= 5 && hour < 12) text = "Good Morning, time for something fresh.";
  else if (hour >= 12 && hour < 17) text = "Good Afternoon, what will you cook today?";
  else if (hour >= 17 && hour < 22) text = "Good Evening, perfect time for a warm meal.";
  else text = "Late night cooking? Let's find a recipe.";

  if (greetingText) greetingText.textContent = text;
}
setGreeting();

// Random recipe idea button (safe: only shows dish names)
const randomBtn = document.getElementById("randomBtn");
const searchStatus = document.getElementById("searchStatus");

const randomDishNames = [
  "Creamy Garlic Pasta",
  "Butter Paneer Curry",
  "Veg Stir-Fry Noodles",
  "Warm Chocolate Lava Cake",
];

if (randomBtn && searchStatus) {
  randomBtn.addEventListener("click", () => {
    const dish = randomDishNames[Math.floor(Math.random() * randomDishNames.length)];
    searchStatus.textContent = `Random idea: ${dish}`;
  });
}

// Search: if matches one of the 4 dishes, scroll to menu and highlight it
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const menuNote = document.getElementById("menuNote");

function normalize(s) {
  return (s || "").toLowerCase().trim();
}

function scrollToMenu() {
  const menu = document.getElementById("menu");
  if (menu) menu.scrollIntoView({ behavior: "smooth", block: "start" });
}

function highlightCard(linkEl) {
  if (!linkEl) return;
  linkEl.scrollIntoView({ behavior: "smooth", block: "center" });
  linkEl.style.outline = "2px solid rgba(249,115,22,0.9)";
  linkEl.style.borderRadius = "18px";
  setTimeout(() => {
    linkEl.style.outline = "";
  }, 1800);
}

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = normalize(searchInput?.value);

    if (!q) {
      if (searchStatus) searchStatus.textContent = "Please type a dish name to search.";
      return;
    }

    const links = Array.from(document.querySelectorAll(".recipe-link"));
    const match = links.find((a) => normalize(a.dataset.key).includes(q));

    if (!match) {
      if (searchStatus) {
        searchStatus.textContent =
          "No match found. Try: pasta, paneer, noodles, lava cake.";
      }
      return;
    }

    if (searchStatus) searchStatus.textContent = `Found: "${match.querySelector("h3")?.textContent || "Recipe"}"`;
    if (menuNote) menuNote.textContent = "Tip: Click a recipe card to open the full recipe page.";
    scrollToMenu();
    setTimeout(() => highlightCard(match), 400);
  });
}

// Dashboard recipe of the day (pick one from 4 + link)
const dayTitle = document.getElementById("dayTitle");
const dayDesc = document.getElementById("dayDesc");
const dayTags = document.getElementById("dayTags");
const dayImage = document.getElementById("dayImage");
const dayLink = document.getElementById("dayLink");

const dayOptions = [
  {
    title: "Creamy Garlic Pasta",
    desc: "Silky white sauce with garlic, herbs and parmesan.",
    tags: ["20 mins", "Italian", "Easy"],
    img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "creamy-garlic-pasta.html",
    saved: 420,
    rating: 4.8,
    time: 20,
  },
  {
    title: "Butter Paneer Curry",
    desc: "Rich tomato gravy with soft paneer cubes & warm spices.",
    tags: ["30 mins", "Indian", "Medium"],
    img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "butter-paneer-curry.html",
    saved: 310,
    rating: 4.7,
    time: 30,
  },
  {
    title: "Veg Stir-Fry Noodles",
    desc: "Colorful veggies tossed with noodles, soy sauce and garlic.",
    tags: ["20 mins", "Chinese", "Easy"],
    img: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "veg-stir-fry-noodles.html",
    saved: 255,
    rating: 4.6,
    time: 20,
  },
  {
    title: "Warm Chocolate Lava Cake",
    desc: "Soft cake with a gooey chocolate center. Quick dessert!",
    tags: ["15 mins", "American", "Easy"],
    img: "./choco_cake.jfif",
    href: "warm-chocolate-lava-cake.html",
    saved: 610,
    rating: 4.9,
    time: 15,
  },
];

function setRecipeOfDay() {
  if (!dayTitle || !dayDesc || !dayTags || !dayImage || !dayLink) return;

  // pick the most "popular" (dummy) -> lava cake
  const item = dayOptions[3];

  dayTitle.textContent = item.title;
  dayDesc.textContent = item.desc;
  dayImage.src = item.img;
  dayLink.href = item.href;

  dayTags.innerHTML = "";
  item.tags.forEach((t) => {
    const span = document.createElement("span");
    span.textContent = t;
    dayTags.appendChild(span);
  });

  const statSaved = document.getElementById("statSaved");
  const statLikes = document.getElementById("statLikes");
  const statTime = document.getElementById("statTime");
  if (statSaved) statSaved.textContent = String(item.saved);
  if (statLikes) statLikes.textContent = String(item.rating);
  if (statTime) statTime.textContent = String(item.time);
}
setRecipeOfDay();

