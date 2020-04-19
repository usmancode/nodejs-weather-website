
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
// const temp=document.querySelector('#temp')
const weather_form = document.querySelector('form')
const search = document.querySelector('input')
// const loading=document.querySelector('#loading')
weather_form.addEventListener('submit', (e) => {

  e.preventDefault()

  const location = search.value

  message1.textContent = 'Loading...'
  message2.textContent = ''


  fetch('/weather?address=' + location).then((response) => {


    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error
      } else {
        const message = `
             Location: ${data.location},
             Observation Time: ${data.observation_time},
             weather_descriptions:${data.weather_descriptions},
             Temprature: ${data.temprature},
             Feels Like: ${data.feelslike}
             `
        message1.textContent = message


      }




    })

  })

})




