
  let ctyname = document.querySelector('h2');
  let weathericon = document.querySelector('.weathercon')
  let temp = document.querySelector('.temp');
  let minmaxTemp =document.querySelector('.tempmin_max')
  let dateinfo= document.querySelector('#date');

  let date = new Date();
  let dayIndex = date.getDay();
  let dateInNo = date.getDate();
  let monthIndex = date.getMonth();

  const monthsList=["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const  daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  let day = daysOfWeek[dayIndex];

  let month = monthsList[monthIndex+1];

  dateinfo.innerHTML =`${day} | ${month} ${dateInNo} | ${date.getHours()}:${date.getMinutes()}`

   if(date.getHours() >= 18){
    weathericon.innerHTML = `<i class="fa-solid fa-moon"></i> `;
    weathericon.style.color = "white";
   }

  let form = document.querySelector('.form');

  form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const inputVal = document.querySelector('.ipt')
     cityname = inputVal.value;
    console.log(cityname);
    ctyname.innerHTML =` <i class="fa-solid fa-street-view" style="color: white;"></i> ${cityname} `;
    const apikey = `12fc8a86118a49d8402ee1651f3593e5`;

    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}`

    fetch(baseURL).then((response) =>{
      if(!response.ok){
        throw new Error(`network error`)
      }
      let p1= response.json();
      p1.then((data)=>{
        console.log(data);
        
        const tempinKelvin = data.main.temp;
        const minTempinKelvin = data.main.temp_min;
        const maxTempinKelvin = data.main.temp_max;
      
       
        let tempInDeg = tempinKelvin - 273.15;
        let minTempinDeg = minTempinKelvin -273.15;
        let maxTempinDeg = maxTempinKelvin -273.15;

        tempInDeg = tempInDeg.toFixed(2);
        minTempInDeg = minTempinDeg.toFixed(2);
        maxTempInDeg = maxTempinDeg.toFixed(2);

        temp.innerHTML = `${tempInDeg}<sup>o</sup>C`;
        minmaxTemp.innerHTML = `Min ${minTempInDeg}<sup>o</sup>C | Max ${maxTempInDeg}<sup>o</sup>C`
        
      })
      
    })
    .catch((error)=>{
      console.log(error);
    });
    
    
    
  })

