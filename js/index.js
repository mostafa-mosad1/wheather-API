const parent = document.querySelector(".parent");
const city = document.querySelector(".city");
const btn = document.querySelector(".btn");
const loader = document.querySelector(".loader");

const model = document.querySelector(".model");
const close_pop = document.querySelector(".close-pop");
const overlay = document.querySelector(".overlay");

getWeather("tanta");
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  getWeather(city.value);
  city.value = "";
});

async function getWeather(city) {
  // 11a9711568db4078a2575329241206
  // 11a9711568db4078a2575329241206
  // 11a9711568db4078a2575329241206
  // 11a9711568db4078a2575329241206

 try {
  loader.classList.remove("d-none");
  const api = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`
  );

  if(!api.ok){
    throw new Error ("errorrrrrrrrrrr");
  }
  const response = await api.json();
  console.log(response);
  displayData(response);
 } catch (error) {
  console.log(error);
  model.classList.remove("hidden");
  overlay.classList.remove("hidden");
 }finally{
  loader.classList.add("d-none");
 }
}

// current
function displayData(data) {
  let [day, time] = data.current.last_updated.split(" ");
  let [x, y, z] = day.split("-");
  let html = `
  
     <div class="text-center text-light p-3 cur">
     <div class="d-flex justify-content-between">
     <h4> mon</h4>
     <h4> ${z}-${y}</h4>
     </div>
      <h2 class="h1">${data.location.name}</h2>
      <img class="w-25" src=" ${data.current.condition.icon}" alt="logo">
      <p>
        <span class="deg fs-1 fw-bold text-info position-relative">
        ${data.current.temp_c}
          <span class="position-absolute bottom-50">o</span>
          <span class="ms-4 start-100 fs-1">C</span>
        </span>

          
      </p>

      
 <h4 class="fs-1"> ${data.current.condition.text}</h4>
      

        </div>
        `;

  document.querySelector(".current").innerHTML = html;

  document.querySelector(".second").innerHTML = createElement(data, 1, "sec");
  document.querySelector(".three").innerHTML = createElement(data, 2, "thr");
}

function createElement(data, index, sty) {
  let current = data.forecast.forecastday[index];

  let [day, time] = current.date.split(" ");
  let [f, g, h] = day.split("-");
  return (html = `
  <div class="text-center text-light  ${sty}">
              <div class="d-flex justify-content-between align-items-start">
                <h4>mon</h4>
                <h4>${h}-${g}</h4>
              </div>
              <img src=" ${current.day.condition.icon}" alt="logo" />
              <p class="text-info">
                <span class="deg fs-1 fw-bold position-relative">
                  ${current.day.maxtemp_c}
                  <span class="position-absolute bottom-50">o</span>
                  <span class="ms-4 start-100 fs-1">C</span>
                </span>
          
              </p>
              <p class="text-danger ">
                <span class="deg fs-3 fw-bold position-relative">
                  ${current.day.mintemp_c}
                  <span class="position-absolute bottom-50">o</span>
                  <span class="ms-4 start-100 fs-1">C</span>
                </span>
          
              </p>

              <h4 class="fs-1">${current.day.condition.text}</h4>
            </div>
  `);
}


const close = function () {
  model.classList.add("hidden");
  overlay.classList.add("hidden");
};

overlay.addEventListener("click", close);
close_pop.addEventListener("click", close);
