
let container = document.createElement("div")
container.className="container row d-flex flex-column  align-items-center justify-content-center"
container.innerHTML=`
    <div class="header col-12  d-flex col-md-10 justify-content-between col-lg-6">
        <input type="text" class="search_feild col-2" placeholder="City Name" value="pune"/>
        <input type="button" class="search_btn " value="Search" onclick="Submit()"/>
    </div>
    <div class="display_area row col-sm-12 col-lg-10">
    
    </div>
`
document.body.append(container)

let search_value=document.querySelector(".search_feild").value;console.log(search_value);
City_info(search_value)

function City_info(city){
    if(city==null){ city ="pune"}
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f9bdd10c39f57c3955f51ce67ccb73f9`)
    .then((data) => data.json())
    .then((res) =>{
        document.querySelector(".display_area").innerHTML=`
        <div class="city_details row col-md d-lg-flex justify-content-lg-center">
            <h1>${res.name}&nbsp;<label class="date">${new Date().toLocaleString()}</label></h1>
            <h1>${(res.main.temp/10).toFixed(1)}°</h1>
            <p><label>Feels Like:</label>${(res.main.feels_like/10).toFixed(1)}°</p>
            <button  class="moredetails col-lg-6" onclick="Toogle_func()">More Details</button>
        </div>
        <div class="more_details_div row col-lg">
        </div>
        `

    })
    .catch((err) => console.log(err))
}
let initialState=false;
const Toogle_func = () =>{
    if(initialState){
        initialState=!initialState
        document.querySelector(".more_details_div").innerHTML=""
    }
    else{
        initialState=!initialState
        More_details()
    }

}

const More_details = () => {
    let city = document.querySelector(".search_feild").value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f9bdd10c39f57c3955f51ce67ccb73f9`)
    .then((data) => data.json())
    .then((res) =>{ console.log(res);
        document.querySelector(".more_details_div").innerHTML=`
            <div class=" row col-md-12 ">
                <div class="col-md-6">
                    <label>Latitude</label><span>${res.coord.lat}</span>
                </div>
                <div class="col-md-6">
                    <label>Longitude</label><span>${res.coord.lon}</span>
                </div>
            </div>
            <hr/>
            <div class="row col-md-12">
                <div class="col-md-6">
                    <label>Sunrise</label><span>${new Date(res.sys.sunrise).toLocaleTimeString()}</span>
                </div>
                <div class="col-md-6">
                    <label>Sunset</label><span>${new Date(res.sys.sunset).toLocaleTimeString()}</span>
                </div>
            </div>
            
            ${res.main.grnd_level!=null ?
            `
            <hr/>
            <div class="row col-md-12">
                <div class="col-md-6">
                <label>Ground_level</label><span>${res.main.grnd_level}</span>
                </div>
                <div class="col-md-6">
                <label>Humidity</label><span>${res.main.humidity}</span>
                </div>
            </div>`:
            `
            <hr/>
            <div class="row col-md-12">
                <div class="col-md-6">
                <label>Ground_level</label><span>NA</span>
                </div>
                <div class="col-md-6">
                <label>Humidity</label><span>${res.main.humidity}</span>
                </div>
            </div>
            `}
            <hr/>
            <div class="row col-md-12">
                <div class="col-md-6">
                <label>Pressure</label><span>${res.main.pressure}</span>
                </div>
                <div class="col-md-6">
                <label>Speed</label><span>${res.wind.speed}</span>
                </div>
            </div>
            <hr/>
            ${res.wind.gust!=null && res.main.sea_level!=null?
            `</div class="row col-md-12">
                <div class="col-md-6">
                <label>Gust</label><span>${res.wind.gust}</span>
                </div>
                <div class="col-md-6">
                <label>Sea_level</label><span>${res.main.sea_level}</span>
                </div>
            </div>`:``
        }
          `
    })
}

const Submit = ()=>{
    let search_value=document.querySelector(".search_feild").value;console.log(search_value);
    City_info(search_value)
}
