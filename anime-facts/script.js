
async function fetch_api(){
    let api = await fetch("https://anime-facts-rest-api.herokuapp.com/api/v1")
    data= await api.json()
    return data.data
}
// data=fetch_api()
let data_container=document.createElement("div")
data_container.className="container"
fetch_api().then((res)=>{
    res.map((e)=>{
        data_container.innerHTML+=`
        <div class="item item${e.anime_id}">
            <img src="${e.anime_img}" alt="item_image"/>
            <hr/>
            <p><label>Name :</label>${e.anime_name}</p>
        </div>
        `
    })
})

document.body.append(data_container)