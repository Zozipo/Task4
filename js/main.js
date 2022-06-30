
const URL_PEOPLE = "https://swapi.dev/api/people";
const URL_PLANET = "https://swapi.dev/api/planets";
const URL_STARSHIPS = "https://swapi.dev/api/starships";

window.addEventListener("load", Init);

let pp = 1;
let pl = 1;
let sh = 1;

let pp_image = 1;
let pl_image = 1;
let sh_image = 0;

const sh_arr = [1,2,5,9,10,11,12,13,15,16,21,22,23,27,28,29,31,32,39,40,41,43,47,48,49,50,51,52,53,54,55,56,57,58,59,60];

function Init() {
    Request(URL_PEOPLE, PrintPerson);
    const people = document.querySelector(".people");
    const planets = document.querySelector(".planets");
    const starships = document.querySelector(".starships");

    people.addEventListener("click", () => {

        const main = document.getElementById("main");
        main.querySelectorAll("*").forEach((n) => n.remove());

        const btns = Array.from(document.getElementsByClassName('page-btn'));
        btns.forEach(btn => {
            btn.remove();
        });

        pp = 1;
        pl = 1;
        sh = 1;
        pp_image = 1;
        pl_image = 1;
        sh_image = 0;

        if(localStorage.getItem("people" + pp) === null){
            Request(URL_PEOPLE, PrintPerson);
        }
        else{
            PrintPerson(localStorage.getItem("people" + pp), localStorage.getItem("nextpp" + pp), localStorage.getItem("prevpp" + pp))
        }
    });

    planets.addEventListener("click", () => {
        
        const main = document.getElementById("main");
        main.querySelectorAll("*").forEach((n) => n.remove());

        const btns = Array.from(document.getElementsByClassName('page-btn'));
        btns.forEach(btn => {
            btn.remove();
        });

        pp = 1;
        pl = 1;
        sh = 1;
        pp_image = 1;
        pl_image = 1;
        sh_image = 0;

        if(localStorage.getItem("planets" + pp) === null){
            Request(URL_PLANET, PrintPlanets);
        }
        else{
            PrintPlanets(localStorage.getItem("planets" + pp), localStorage.getItem("nextpl" + pp), localStorage.getItem("prevpl" + pp))
        }

    });

    starships.addEventListener("click", () => {

        const main = document.getElementById("main");
        main.querySelectorAll("*").forEach((n) => n.remove());

        const btns = Array.from(document.getElementsByClassName('page-btn'));
        btns.forEach(btn => {
            btn.remove();
        });

        pp = 1;
        pl = 1;
        sh = 1;
        pp_image = 1;
        pl_image = 1;
        sh_image = 0;

        if(localStorage.getItem("starships" + sh) === null){
            Request(URL_STARSHIPS, PrintStarships);
        }
        else{
            PrintStarships(localStorage.getItem("starships" + sh), localStorage.getItem("nextsh" + sh), localStorage.getItem("prevsh" + sh))
        }
    });
}

function Request(URL, Callback) {
    const main = document.getElementById("main");

    const spinner = document.createElement("div");
    spinner.classList.add("lds-hourglass");
    main.appendChild(spinner);

    fetch(URL)
    .then((result) => {
        return result.json();
    })
    .then((data) => {
        Callback(data);
    })
    .catch((err) => console.log(err));
    
}

PrintPerson = ({results, next, previous}) => {

    const pageBtb = document.querySelector(".page-buttons");

    const btn1 = document.createElement('button');
    btn1.classList.add("page-btn");
    btn1.classList.add("prev");
    btn1.textContent = "Prev";
    const btn2 = document.createElement('button');
    btn2.classList.add("page-btn");
    btn2.classList.add("next");;
    btn2.textContent = "Next";
    
    pageBtb.appendChild(btn1);
    pageBtb.appendChild(btn2);

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if(previous === null || pp == 1){
        prevBtn.disabled = true;
        prevBtn.style.cursor = "default";
    }
    if(next === null  || pp == 9){
        nextBtn.disabled = true;
        nextBtn.style.cursor = "default";
    }

    nextBtn.addEventListener("click", () => {

        const main = document.getElementById("main");
        main.querySelectorAll("*").forEach((n) => n.remove());

        const btns = Array.from(document.getElementsByClassName('page-btn'));
        btns.forEach(btn => {
            btn.remove();
        });

        ++pp;
        if(localStorage.getItem("people" + pp) === null){
            console.log(next)
            if(next == undefined){
                console.log(pp)
                console.log(localStorage.getItem("nextpp" + pp))
                next = localStorage.getItem("nextpp" + (pp-1));
            }
            Request(next, PrintPerson);
        }
        else{
            console.log("NEXT ERROR", next)
            console.log(localStorage.getItem("nextpp" + pp));
            PrintPerson(localStorage.getItem("people" + pp), localStorage.getItem("nextpp" + pp), localStorage.getItem("prevpp" + pp))
        }
    });
    prevBtn.addEventListener("click", () => {

        const main = document.getElementById("main");
        main.querySelectorAll("*").forEach((n) => n.remove());

        const btns = Array.from(document.getElementsByClassName('page-btn'));
        btns.forEach(btn => {
            btn.remove();
        });

        if(pp == 9){
            pp_image = pp_image - 12;
        }
        else if(pp == 2 || pp == 3  ){
            pp_image = pp_image - 21;
        }
        else{ 
            pp_image = pp_image - 20;
        }

        pp = pp - 1;

        let arr1 = localStorage.getItem("people" + pp);

        PrintPerson(arr1, localStorage.getItem("nextpp" + pp), localStorage.getItem("prevpp" + pp))
    });

    if(localStorage.getItem("people" + pp) == null){
        localStorage.setItem("people" + pp, JSON.stringify(results));
        localStorage.setItem("nextpp" + pp, next);
        localStorage.setItem("prevpp" + pp, previous);

        CreatePerson(results);
    }
    else{
        CreatePerson(JSON.parse(localStorage.getItem("people" + pp)))
    }
};

CreatePerson = (persons) =>{
    
    const spinner = document.querySelector(".lds-hourglass");
    if(spinner != null){
        spinner.remove();
    }

    persons.forEach((person) => {
        const text = document.getElementById("main");
        
        const div = document.createElement("div");
        div.classList.add("content");

        const img = document.createElement("img");
        if(pp_image == 17){
            pp_image = 18;
        }
        img.src = `https://starwars-visualguide.com/assets/img/characters/${pp_image++}.jpg`;
        img.onerror = () => img.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"; 

        console.log(pp_image)

        const list = document.createElement("ul");
        list.classList.add("list");
    
        const li1 = document.createElement("li");
        const li2 = document.createElement("li");
        const li3 = document.createElement("li");
        const li4 = document.createElement("li");
        const li5 = document.createElement("li");
        const li6 = document.createElement("li");
        const li7 = document.createElement("li");
        const li8 = document.createElement("li");
    
        li1.textContent = (`Name : ${person.name}`);
        li2.textContent = (`Height : ${person.height}`);
        li3.textContent = (`Mass : ${person.mass}`);
        li4.textContent = (`Hair color : ${person.hair_color}`);
        li5.textContent = (`Skin color : ${person.skin_color}`);
        li6.textContent = (`Eye color : ${person.eye_color}`);
        li7.textContent = (`Birth : ${person.birth_year}`);
        li8.textContent = (`Gender : ${person.gender}`);
    
        list.appendChild(li1);
        list.appendChild(li2);
        list.appendChild(li3);
        list.appendChild(li4);
        list.appendChild(li5);
        list.appendChild(li6);
        list.appendChild(li7);
        list.appendChild(li8);
    
        div.appendChild(img);
        div.appendChild(list);

        text.appendChild(div);
    });
}

PrintPlanets = ({results, next, previous}) => {
    const pageBtb = document.querySelector(".page-buttons");
    
    const btn1 = document.createElement('button');
    btn1.classList.add("page-btn");
    btn1.classList.add("prev");
    btn1.textContent = "Prev";
    const btn2 = document.createElement('button');
    btn2.classList.add("page-btn");
    btn2.classList.add("next");;
    btn2.textContent = "Next";
    
    pageBtb.appendChild(btn1);
    pageBtb.appendChild(btn2);

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if(previous === null  || pl == 1){
        prevBtn.disabled = true;
        prevBtn.style.cursor = "default";
    }
    if(next === null || pl == 6){
        nextBtn.disabled = true;
        nextBtn.style.cursor = "default";
    }

    nextBtn.addEventListener("click", () => {

        const main = document.getElementById("main");
        main.querySelectorAll("*").forEach((n) => n.remove());

        const btns = Array.from(document.getElementsByClassName('page-btn'));
        btns.forEach(btn => {
            btn.remove();
        });

        ++pl;

        if(localStorage.getItem("planets" + pl) === null){
            console.log(next)
            if(next == undefined){
                console.log(localStorage.getItem("nextpl" + pl))
                next = localStorage.getItem("nextpl" + (pl-1));
            }
            Request(next, PrintPlanets);
        }
        else{
            console.log(localStorage.getItem("nextpl" + pl));
            PrintPlanets(localStorage.getItem("planets" + pl), localStorage.getItem("nextpl" + pl), localStorage.getItem("prevpl" + pl))
        }
    });
    prevBtn.addEventListener("click", () => {

        const main = document.getElementById("main");
        main.querySelectorAll("*").forEach((n) => n.remove());

        const btns = Array.from(document.getElementsByClassName('page-btn'));
        btns.forEach(btn => {
            btn.remove();
        });

        pl = pl - 1;
        pl_image = pl_image - 20;

        let arr2 = localStorage.getItem("planets" + pl);

        PrintPlanets(arr2, localStorage.getItem("nextpl" + pl), localStorage.getItem("prevpl" + pl))
    });

    if(localStorage.getItem("planets" + pl) == null){
        localStorage.setItem("planets" + pl, JSON.stringify(results));
        localStorage.setItem("nextpl" + pl, next);
        localStorage.setItem("prevpl" + pl, previous);

        CreatePlanet(results);
    }
    else{
        CreatePlanet(JSON.parse(localStorage.getItem("planets" + pl)))
    }

};

CreatePlanet = (planets) =>{

    const spinner = document.querySelector(".lds-hourglass");
    if(spinner != null){
        spinner.remove();
    }


    planets.forEach((planet) => {
        const text = document.getElementById("main");

        const div = document.createElement("div");
        div.classList.add("content");

        const img = document.createElement("img");
        img.src = `https://starwars-visualguide.com/assets/img/planets/${pl_image++}.jpg`;
        img.onerror = () => img.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"; 

        ++pp_image;

        const list = document.createElement("ul");
        list.classList.add("list");

        const li1 = document.createElement("li");
        const li2 = document.createElement("li");
        const li3 = document.createElement("li");
        const li4 = document.createElement("li");
        const li5 = document.createElement("li");
        const li6 = document.createElement("li");
        const li7 = document.createElement("li");
        const li8 = document.createElement("li");
        const li9 = document.createElement("li");
    
        li1.textContent = (`Name : ${planet.name}`);
        li2.textContent = (`Rotation period : ${planet.rotation_period}`);
        li3.textContent = (`Orbital period : ${planet.orbital_period}`);
        li4.textContent = (`Diameter : ${planet.diameter}`);
        li5.textContent = (`Climate : ${planet.climate}`);
        li6.textContent = (`Gravity : ${planet.gravity}`);
        li7.textContent = (`Terrain : ${planet.terrain}`);
        li8.textContent = (`Surface water : ${planet.surface_water}`);
        li9.textContent = (`Population : ${planet.population}`);
    
        list.appendChild(li1);
        list.appendChild(li2);
        list.appendChild(li3);
        list.appendChild(li4);
        list.appendChild(li5);
        list.appendChild(li6);
        list.appendChild(li7);
        list.appendChild(li8);
        list.appendChild(li9);
    
        div.appendChild(img);
        div.appendChild(list);

        text.appendChild(div);
    });
}

PrintStarships = ({results, next, previous}) => {
    const pageBtb = document.querySelector(".page-buttons");

    const btn1 = document.createElement('button');
    btn1.classList.add("page-btn");
    btn1.classList.add("prev");
    btn1.textContent = "Prev";
    const btn2 = document.createElement('button');
    btn2.classList.add("page-btn");
    btn2.classList.add("next");;
    btn2.textContent = "Next";
    
    pageBtb.appendChild(btn1);
    pageBtb.appendChild(btn2);

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if(previous === null  || sh == 1){
        prevBtn.disabled = true;
        prevBtn.style.cursor = "default";
    }
    if(next === null || sh == 4){
        nextBtn.disabled = true;
        nextBtn.style.cursor = "default";
    }

    nextBtn.addEventListener("click", () => {

        const main = document.getElementById("main");
        main.querySelectorAll("*").forEach((n) => n.remove());

        const btns = Array.from(document.getElementsByClassName('page-btn'));
        btns.forEach(btn => {
            btn.remove();
        });

        ++sh;
        if(localStorage.getItem("starships" + sh) === null){
            console.log(next)
            if(next == undefined){
                console.log(localStorage.getItem("nextsh" + sh))
                next = localStorage.getItem("nextsh" + (sh-1));
            }
            Request(next, PrintStarships);
        }
        else{
            console.log(localStorage.getItem("nextsh" + sh));
            PrintStarships(localStorage.getItem("starships" + sh), localStorage.getItem("nextsh" + sh), localStorage.getItem("prevsh" + sh))
        }
    });
    prevBtn.addEventListener("click", () => {

        const main = document.getElementById("main");
        main.querySelectorAll("*").forEach((n) => n.remove());

        const btns = Array.from(document.getElementsByClassName('page-btn'));
        btns.forEach(btn => {
            btn.remove();
        });

        if(sh == 4){
            sh_image = sh_image - 16;
        }
        else{ 
            sh_image = sh_image - 20;
        }

        sh = sh - 1;
        let arr3 = localStorage.getItem("starships" + sh);

        PrintStarships(arr3, localStorage.getItem("nextsh" + sh), localStorage.getItem("prevsh" + sh))
    });

    if(localStorage.getItem("starships" + sh) == null){
        localStorage.setItem("starships" + sh, JSON.stringify(results));
        localStorage.setItem("nextsh" + sh, next);
        localStorage.setItem("prevsh" + sh, previous);

        CreateStarShip(results);
    }
    else{
        CreateStarShip(JSON.parse(localStorage.getItem("starships" + sh)))
    }

};

CreateStarShip = (starships) =>{

    const spinner = document.querySelector(".lds-hourglass");
    if(spinner != null){
        spinner.remove();
    }


    starships.forEach((starship) => {
        const text = document.getElementById("main");

        const div = document.createElement("div");
        div.classList.add("content");

        const img = document.createElement("img");

        img.src = `https://starwars-visualguide.com/assets/img/starships/${sh_arr[sh_image++]}.jpg`;
        img.onerror = () => img.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";

        const list = document.createElement("ul");
        list.classList.add("list");

        const li1 = document.createElement("li");
        const li3 = document.createElement("li");
        const li5 = document.createElement("li");
        const li6 = document.createElement("li");
        const li7 = document.createElement("li");
        const li8 = document.createElement("li");
        const li10 = document.createElement("li");
        const li11 = document.createElement("li");
        const li13 = document.createElement("li");
    
        li1.textContent = (`Name : ${starship.name}`);
        li3.textContent = (`Manufacturer : ${starship.manufacturer}`);
        li5.textContent = (`Length : ${starship.length}`);
        li6.textContent = (`Max speed : ${starship.max_atmosphering_speed}`);
        li7.textContent = (`Crew : ${starship.crew}`);
        li8.textContent = (`Passengers : ${starship.passengers}`);
        li10.textContent = (`Consumables : ${starship.consumables}`);
        li11.textContent = (`Hyperdrive rating : ${starship.hyperdrive_rating}`);
        li13.textContent = (`Starship class : ${starship.starship_class}`);
    
        list.appendChild(li1);
        list.appendChild(li3);
        list.appendChild(li5);
        list.appendChild(li6);
        list.appendChild(li7);
        list.appendChild(li8);
        list.appendChild(li10);
        list.appendChild(li11);
        list.appendChild(li13);
    
        div.appendChild(img);
        div.appendChild(list);

        text.appendChild(div);
    });
}