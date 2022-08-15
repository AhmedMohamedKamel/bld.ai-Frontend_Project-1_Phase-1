let courses;

fetch("http://localhost:3000/courses")
  .then((result) => {
    let mydata = result.json();
    return mydata;})
  .then((mydata) => { courses = mydata; CreatingCourse(mydata);
  });

let main = document.querySelector(".first-course");
let button = document.querySelector("nav form button");

/* let the search navbar working */
let Search = function Search_process(element, txt) {
    return element.filter((e) => {
      return e.title.toLowerCase().includes(txt);
    });
  };
  button.addEventListener("click", (event) => {
    event.preventDefault();
    let input = document.querySelector("nav input");
  
    let CourseSection = document.querySelectorAll(".card");
    CourseSection.forEach((element) => {
      element.remove();
    });
    if (input.value.length > 0) {
      CreatingCourse(Search(courses, input.value.trim().toLowerCase()));
    } else {
      CreatingCourse(courses);
    }
  });


/*creating section of stars*/
let stars = function StarSection(element) {
  let rate = document.createElement("span");
  let number = document.createElement("span");
  let star = document.createElement("div");
  

  star.className = "card-rate";

  rate.className = "checked";
  rate.textContent = element.rating;
  star.appendChild(rate);

  /* looping on no. of stars */
  let all = 5;
  for (let i = 1; i <= element.rating; i++) {
    let light = document.createElement("span");
    light.className = "fa fa-star checked";
    star.append(light);
    all--;
  }
  if (!Number.isInteger(element.rating)) {
    let half = document.createElement("span");
    half.className = "fa fa-star-half-full checked";
    star.append(half);
    all--;
  }
  for (let i = 0; i < all; i++) {
    let dark = document.createElement("span");
    dark.className = "fa fa-star-o checked";
    star.append(dark);
  }

  /*adding number of students enrolled*/
  number.className = "students";
  number.textContent = "(" + element.people + ")";

  star.appendChild(number);
  return star;
};

/*creating section of price*/
let price = function PriceSection(element) {
  let price = document.createElement("div");
  let real_price = document.createElement("span");

  price.className = "card-price";
  real_price.textContent = "E£" + element.price;

  price.appendChild(real_price);

  return price;
};
/*Create course section */
function CreatingCourse(mydata) {
  mydata.forEach((element) => {
    let link = document.createElement("a");
    let mydiv = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("div");
    let author = document.createElement("div");

    mydiv.className = "card";

    /*Adding link to the course*/
    link.setAttribute("href", element.link);
    
    /*Adding image to the course*/
    img.className="card-img";
    img.setAttribute("src", element.image);
    img.setAttribute("alt", "python");
    link.appendChild(img);

    /*Adding title of the course*/
    title.className="card-title";
    title.textContent = element.title;
    link.appendChild(title);

    /*Adding author of the course*/
    author.className = "card-author";
    author.textContent = element.author;
    link.appendChild(author);

    link.appendChild(stars(element));
    link.appendChild(price(element));
    
    mydiv.appendChild(link);
    main.appendChild(mydiv);
  });

}
