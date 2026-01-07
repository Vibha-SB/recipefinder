// Greeting text in hero
const greetingText = document.getElementById("greetingText");
function setGreeting() {
  const hour = new Date().getHours();
  let text = "Welcome to Recipe Finder";

  if (hour >= 5 && hour < 12) {
    text = "Good Morning, time for something fresh.";
  } else if (hour >= 12 && hour < 17) {
    text = "Good Afternoon, what will you cook today?";
  } else if (hour >= 17 && hour < 22) {
    text = "Good Evening, perfect time for a warm meal.";
  } else {
    text = "Late night cooking? Let's find a recipe.";
  }

  if (greetingText) greetingText.textContent = text;
}
setGreeting();

// Search behaviour
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchStatus = document.getElementById("searchStatus");

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = (searchInput?.value || "").trim();

    if (!query) {
      if (searchStatus) {
        searchStatus.textContent =
          "Please type a dish or ingredient to search.";
      }
      return;
    }

    if (searchStatus) {
      searchStatus.textContent =
        `Showing results for “${query}” (in the full app this would open a results page).`;
    }
  });
}

// Random recipe idea button
const randomBtn = document.getElementById("randomBtn");

const randomIdeas = [
  "Try a one-pot mushroom pasta with garlic and cream.",
  "Make paneer bhurji using leftover paneer and veggies.",
  "Turn overripe bananas into banana oat pancakes.",
  "Use leftover rice to cook quick veg fried rice.",
  "Bake a simple eggless chocolate mug cake in the microwave.",
];

if (randomBtn && searchStatus) {
  randomBtn.addEventListener("click", () => {
    const idea = randomIdeas[Math.floor(Math.random() * randomIdeas.length)];
    searchStatus.textContent = idea;
  });
}

// Optional: randomise Recipe of the Day content slightly
const dayTitle = document.getElementById("dayTitle");
const dayDesc = document.getElementById("dayDesc");
const dayTags = document.getElementById("dayTags");
const dayImage = document.getElementById("dayImage");

const dayOptions = [
  {
    title: "One-Pot Veggie Pasta",
    desc: "A quick, comforting dinner made in one pot with veggies, garlic and herbs.",
    tags: ["30 mins", "One pot", "Beginner friendly"],
    img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Masala Grilled Sandwich",
    desc: "Toasted sandwich with spiced potato filling, cheese and chutney.",
    tags: ["15 mins", "Snack", "Indian street style"],
    img: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Veg Stir-Fry Noodles",
    desc: "Colorful veggies tossed with noodles, soy sauce and garlic.",
    tags: ["20 mins", "Weeknight", "One pan"],
    img: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

function setRecipeOfDay() {
  if (!dayTitle || !dayDesc || !dayTags || !dayImage) return;
  const item = dayOptions[Math.floor(Math.random() * dayOptions.length)];

  dayTitle.textContent = item.title;
  dayDesc.textContent = item.desc;
  dayImage.src = item.img;

  dayTags.innerHTML = "";
  item.tags.forEach((t) => {
    const span = document.createElement("span");
    span.textContent = t;
    dayTags.appendChild(span);
  });
}

setRecipeOfDay();

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
