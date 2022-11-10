const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");
const btnSwitch = document.querySelector('#switch');
const typed = new Typed('.typed', {
  strings: ["Bienvenido a Climapp", "Proyecto Final JS", "Coderhouse", "Desarrollo Alexis Calivar", "Profesor Adrian Gonzales"],
  stringsElement: '#cadenas-texto',
  typeSpeed: 75,
  startDelay: 300,
  backSpeed: 75,
  smartBackspace: true,
  shuffle: false,
  backDelay: 1500,
  loop: true,
  loopCount: false,
  showCursor: true,
  cursorChar: '|',
  contentType: 'html',
});

btnSwitch.addEventListener('click', () => {
  document.body.classList.toggle('color'); 

  if(document.body.classList.contains('color')){
    localStorage.setItem('color-mode', 'true')
  } else{
    localStorage.setItem('color-mode', 'false')
}
});

if (localStorage.getItem('color-mode') === 'true'){
  document.body.classList.add('color')
} else {
  document.body.classList.remove('color')
}

form.addEventListener("submit", search);

let target="Sierra Grande"

const fetchData = async (target) => {
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=a27fff6022324102a45120456221011&q=${target}`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      const {
        current: {
          temp_c,
          condition: { text, icon },
        },
        location: { name, localtime },
      } = data;
  
      updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
      alert("Escribiste mal o no existe tu busqueda");
    }
  };

function updateDom(temperate, city, time, emoji, text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());

  temperateField.innerText = temperate;
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${exactDay}   ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);

function search(e) {
  e.preventDefault();

  target = searchField.value;

  fetchData(target);
}
var dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
function getDayFullName(num){    
    return dias.at(num) ;
};

function colorTheme(btn, classColor){
}