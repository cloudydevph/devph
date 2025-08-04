var healthC = new ldBar("#health");
var shieldC = new ldBar("#shield");
let progress;

document.querySelectorAll('.level')[0].classList.add('active')

const app = {
  updateFill: (selector, valorInicial, valorFinal, percentage) => {
    if (percentage < 0) {
      percentage = 0;
    } else if (percentage > 100) {
      percentage = 100;
    }

    const valorCalculado = valorInicial - ((valorInicial - valorFinal) * (percentage / 100));
    document.querySelector(selector).style.strokeDashoffset = valorCalculado;
  },

  // vehicleSpeed: (vehicleSpeed, fuel, nitro) => {
  //   app.updateFill('.velocimeter .fill', 98, -100, vehicleSpeed);
  //   app.updateFill('.fuel .fill', 250, 190, fuel);
  //   app.updateFill('.nitro .fill', 158, 252, nitro);
  // },


}

window.addEventListener('message', ({ data }) => {
  switch (data.name) {
    case "Passport":
      document.querySelector("#user_id").innerText = `${data.payload}`;
      break;

    case "Health":
      document.querySelector('#health-status').style.strokeDashoffset = data.payload <= 0 ? 101.1 : 100 - data.payload;
      document.querySelector('#health-status').style.stroke = data.payload <= 0 ? 'transparent' : '#FFFFFF'
    break;

    case "Armour":
      document.querySelector('#shield-status').style.strokeDashoffset = data.payload <= 0 ? 100.1 : 100 - data.payload;
      document.querySelector('#shield-status').style.stroke = data.payload <= 0 ? 'transparent' : '#FFFFFF'
      break;

    case "Frequency":

      data.payload === 'Offline' ? document.querySelector('#frequencyC').style.display = 'none' : document.querySelector('#frequencyC').style.display = 'flex'

      document.querySelector('#frequency').innerHTML = `${data.payload} MHZ`
      break;

    case "hood":
      if (data.payload) document.body.style.background = "black";
      else document.body.style.background = "transparent";
      break;

    case "Hunger":
      document.querySelector('#hunger-status').style.strokeDashoffset = data.payload <= 0 ? 100.1 : 100 - data.payload;
      document.querySelector('#hunger-status').style.stroke = data.payload <= 0 ? 'transparent' : '#FFFFFF'
      break;

    case "Voice":
      for (const i of document.querySelectorAll('.active')) {
        if (data.payload) i.classList.add('talking')
        else i.classList.remove('talking')
      }
      break;

    case "Body":
      data.payload ? document.body.style.opacity = '1' : document.body.style.opacity = '0'
      break;

    case "Thirst":
      document.querySelector('#thirst-status').style.strokeDashoffset = data.payload <= 0 ? 100.1 : 100 - data.payload;
      document.querySelector('#thirst-status').style.stroke = data.payload <= 0 ? 'transparent' : '#FFFFFF'
      break;

    case "Stress":
      document.querySelector("#stress .status").style.height = `${data.payload}%`;
      break;

    case "Rpm":
      document.querySelector('#velocimeter').style.strokeDashoffset = 100 - data.payload;
      document.querySelector('#gear').innerHTML = `<span>${data.gear}</span>`
      break;

    case "Speed":
      document.querySelector('#speed').innerHTML = `<span>${data.payload}</span>`;
      break;

    case "Nitro":
      const valorEmPorcentagem = (data.payload / 20);
      document.querySelector('#nitro').style.strokeDashoffset = valorEmPorcentagem <= 0 ? 100 : 100 - valorEmPorcentagem
      document.querySelector('#nitro').style.stroke = data.payload <= 0 ? 'transparent' : '#FFFFFF'
      break;

    case "Fuel":
      document.querySelector('#fuel').style.strokeDashoffset = data.payload <= 0 ? 100.1 : 100 - data.payload;
      break;

    // case "Locked":
    //   data.payload === 2 ? document.querySelectorAll('.warnings svg path')[0].style.fillOpacity = '1' : document.querySelectorAll('.warnings svg path')[0].style.fillOpacity = '0.25'
    //   break;
    case "Progressbar":
      document.querySelector('#progressC').style.display = 'flex'
      document.querySelector('#progress').style.animation = `progressCircle ${data.payload}ms linear infinite`
      setTimeout(() => {
        document.querySelector('#progressC').style.display = 'none'
      }, data.payload);
      break;

    case "Seatbelt":
      data.payload ? document.querySelector('#belt path').style.fillOpacity = '1' : document.querySelector('#belt path').style.fillOpacity = '0.25'
      if (!data.payload) document.querySelector('#belt path').style.fillOpacity = '0.25'
      break;

    case "Engine":
      data.payload ? document.querySelector('#engine path').style.fillOpacity = '1' : document.querySelector('#engine path').style.fillOpacity = '0.25'
      break;

    case "Clock":
      document.getElementById('clock').innerText = `${data.payload[0] < 10 ? `0${data.payload[0]}` : data.payload[0]}:${data.payload[1] < 10 ? `0${data.payload[1]}` : data.payload[1]}`
      break;

    case "Road":
      document.getElementById('streeet').innerText = `${data.payload}`
      break;

    case "Voip":
      document.querySelectorAll('.level').forEach(l => l.classList.remove('active'))
      if (data.payload === 'Baixo') {
        document.querySelectorAll('.level')[0].classList.add('active')
      }

      if (data.payload === 'Normal') {
        document.querySelectorAll('.level')[0].classList.add('active')
        document.querySelectorAll('.level')[1].classList.add('active')
      }

      if (data.payload === 'Médio') {
        document.querySelectorAll('.level')[0].classList.add('active')
        document.querySelectorAll('.level')[1].classList.add('active')
        document.querySelectorAll('.level')[2].classList.add('active')
      }

      if (data.payload === 'Alto') {
        document.querySelectorAll('.level')[0].classList.add('active')
        document.querySelectorAll('.level')[1].classList.add('active')
        document.querySelectorAll('.level')[2].classList.add('active')
        document.querySelectorAll('.level')[3].classList.add('active')
      }
      break;

    case "Weapons":
      if (!data.payload) document.querySelector('.weaponHud').style.display = 'none'
      if (data.payload[0]) {
        document.querySelector('.weaponHud').style.display = 'flex'
        document.querySelector('#weaponImg').src = `./assets/weapons/${data.payload[3]}.png`;
        document.querySelector("#ammo").innerHTML = `${data.payload[1]}`
        document.querySelector("#maxAmmo").innerHTML = `${data.payload[2]}`
      } else document.querySelector('.weaponHud').style.display = 'none'

      break;

    case "Vehicle":
      if (data.payload) {
        document.querySelector(".vehicleHud").style.bottom = "5.4rem"
        document.querySelector('.weaponHud').style.bottom = '14.62rem'
        document.querySelector('.location').style.bottom = '16.12rem'
        /* document.querySelector('.playerStatus').style.right = '20.44rem' */
      }
      else {
        document.querySelector('.location').style.bottom = '30px'
        document.querySelector(".vehicleHud").style.bottom = "-25.4rem"
        document.querySelector('.weaponHud').style.right = '2.7rem'


        document.querySelector('.weaponHud').style.bottom = '7.62rem'
        document.querySelector('.playerStatus').style.right = '2.44rem'
      }

      break;
  }
})

/* window.postMessage({
  name: 'Engine',
  payload: false,
})
 */
/* app.vehicleSpeed(30, 80, 30) */

if (!window.invokeNative) {
  document.body.style.background = '#1c1c1c'
  window.postMessage({
    name: 'Hunger',
    payload: 0
  })
}