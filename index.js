const token = 106624311757545;
const url = `https://superheroapi.com/api.php/${token}/search/`;
let form = document.querySelector('.form-access');
const msg = document.querySelector('.msg');

form.addEventListener("keyup", (e) => {
    const search = e.target.value;
    let val = form.value;

    if (search.length >= 2 && search.length < 3) {
        msg.classList.add('error')
        msg.innerHTML = "please write more than 2 charcter";
        console.log("more than 2");
        setTimeout(() => msg.remove(), 800);

    } else {
        setTimeout(getinfo(search), 1000);
    }
});

function getinfo(val) {
    let new_url = url + val;

    fetch(new_url).then((res) => {

            return res.json();
        })
        .then((data) => {
            console.log(data);
            let result = data["results"];
            //console.log(result);
            rendering(result);
        });
}

function rendering(result) {
    var results = document.getElementById('cards');
    results.remove();
    let container = document.getElementById('container');
    var results = document.createElement('div');
    results.id = 'cards';
    result.className = 'cards';
    container.appendChild(results);
    result.forEach((element) => {
        //console.log(ele.name);
        results.appendChild(getcard(element));
        //console.log(results);
    });

}

function getcard(element) {
    let cards = document.createElement('div');
    cards.classList = "h-100";
    cards.classList = "card";
    cards.style.width = "20rem";

    //console.log(ele);

    cards.innerHTML = `
        <img src=${JSON.stringify(element["image"].url)} class="card-img" alt=".." />
        <div class="card-body">
            <h5 class="card-title" >${element["name"]}</h5>
            <ul class="card-text">
                <li>Full Name: <span> ${JSON.stringify(element["biography"]["full-name"])}</span></li>
                <li>Birth Place: <span> ${JSON.stringify(element["biography"]["place-of-birth"])}</span></li>
                <li>Powerstats: <span> ${JSON.stringify(
                Math.round(
                    (JSON.parse(element["powerstats"]["intelligence"]) +
                    JSON.parse(element["powerstats"]["strength"]) +
                    JSON.parse(element["powerstats"]["speed"]) +
                    JSON.parse(element["powerstats"]["durability"]) +
                    JSON.parse(element["powerstats"]["power"]) +
                    JSON.parse(element["powerstats"]["combat"])) 
                ))}</span></li>
                <li>First Appearance: <span>${JSON.stringify(element["biography"]["first-appearance"])}</span></li>
               <button onclick={detail()}>Know more ></button>
                </ul>
           
        </div>
    `;
    return cards;
}