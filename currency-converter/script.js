let container = document.createElement("div");
container.className = "container";

container.innerHTML=`
        <div class="header">
            <h1>Currency Converter</h1>
        </div>
        <div class="body  row d-flex flex-md-column justify-items-md-center flex-lg-row">
            <div class="curr1 col-md-8 col-lg-5">
                <select class="dropdown dropdown1">
                </select>
                <input type="number" class="curr1_text" oninput="Curr1_input()" min="1"/>
            </div>
            <div class="swap col-md-8 text-center col-lg-2">
                <button class="swap_btn" onclick="Swap()">
                    <img src="rotate-solid.svg"/>
                </button>
            </div>
            <div class="curr2 col-md-8 col-lg-5">
                <select class="dropdown dropdown2">
                </select>
                <input type="number" class="curr2_text" oninput="Curr2_input()" min="1"/>
            </div>
        </div>
`


async function fetch_api() {
  let api = await fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json");
  let data = await api.json();
    //   console.log(data)
  return Object.keys(data);
}
fetch_api().then((data)=>{
    data.map((e)=>{
        document.querySelector(".dropdown1").innerHTML += `
            <option value="${e}">${e}</option>
        `
        document.querySelector(".dropdown2").innerHTML += `
            <option value="${e}">${e}</option>
        `
    })
})

const Swap = ()=>{
let curr1_value = document.querySelector(".curr1_text").value;
let curr2_value = document.querySelector(".curr2_text").value;
let swap_value=curr2_value;
curr2_value=curr1_value;
curr1_value=swap_value;
document.querySelector(".curr1_text").value = curr1_value
document.querySelector(".curr2_text").value = curr2_value
Curr1_input()
}

const Curr1_input = async ()=>{
    let  curr2_selected_value = document.querySelector(".dropdown2").value
    let  curr1_selected_value = document.querySelector(".dropdown1").value
    let curr1_value = document.querySelector(".curr1_text").value;
    let curr2_value = document.querySelector(".curr2_text").value;
    console.log(document.querySelector(".curr1_text").value,curr2_selected_value,curr1_selected_value)
    if(curr1_value){
        let api = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${curr1_selected_value}.json`);
        let data = await api.json();
        let valueOfcurr=data[curr1_selected_value][curr2_selected_value]
        document.querySelector(".curr2_text").value = (parseInt(curr1_value)*valueOfcurr).toFixed(2)
    }
}
const Curr2_input = async () =>{
    let  curr2_selected_value = document.querySelector(".dropdown2").value
    let  curr1_selected_value = document.querySelector(".dropdown1").value
    let curr2_value = document.querySelector(".curr2_text").value;
    let api = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${curr2_selected_value}.json`);
    let data = await api.json();
    let valueOfcurr=data[curr2_selected_value][curr1_selected_value]
        document.querySelector(".curr1_text").value = (parseInt(curr2_value)*valueOfcurr).toFixed(2)
    }
document.body.append(container);
