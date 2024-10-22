const contents = document.querySelector(".contents");
const pageContainer = document.querySelector(".page-container");

// console.log(response);
// const sampleRecipeData = response.recipes;

let recipeArray = [];
let page = 1;
let pages = [];
let pageSize = 3;
let totalPages = 0;
let totalDataCount = 0;
let totalPageCount = 0;


function fetchData(){  // one-time
    fetch('https://dummyjson.com/recipes')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setDetails(data);
    })
    // setDetails(sampleRecipeData);
}

function setDetails(data){ // one-time
    recipeArray = data.recipes;
    totalDataCount = recipeArray.length;
    totalPageCount = Math.ceil(totalDataCount/pageSize);
    addPagination();
    showData();
}

function showgreaterPages(){
    pages[1].classList.remove("truncated");
    pages[pages.length-2].classList.remove("truncated");
    pageContainer.append(pages[0]);
    pageContainer.append(pages[1]);
    if(page<=4){
        for(let i=2;i<5;i++){
            pageContainer.append(pages[i]);
        }
        pages[pages.length-2].classList.add("truncated");
    }
    else if(page >= pages.length-3){
        for(let i=pages.length-5;i<pages.length-2;i++){
            pageContainer.append(pages[i]);
        }
        pages[1].classList.add("truncated");
    }
    else{
        for(let i=page-2;i<=page;i++){
            pageContainer.append(pages[i]);
        }
        pages[1].classList.add("truncated");
        pages[pages.length-2].classList.add("truncated");
    }
    
    pageContainer.append(pages[pages.length-2]);
    pageContainer.append(pages[pages.length-1]);
}

function showPages(){
    pageContainer.innerHTML = "";
    if(pages.length > 7){
        showgreaterPages();
    }
    else{
        pageContainer.innerHTML = "";
        pages.forEach((btn)=>{
            pageContainer.append(btn);
        })
    }
    
}

function showData(data){
    contents.innerHTML="";
    const recipes = data ? data : recipeArray;
    console.log(recipes);
    console.log(page);
    const newData = recipes.slice((page-1)*pageSize, page*pageSize);
    pushCards(newData);
    showPages();
    updateActive();
}

function pushCards(data){
    data.forEach(item => {
        const newCard = document.createElement("div");
        newCard.classList.add("card");

        const image = document.createElement("img");
        image.src = item.image;
        const heading = document.createElement("h2");
        heading.innerText = item.name;
        // newCard.innerText = item.name;
        let para = document.createElement("p");
        item.instructions.forEach((statement)=>{
            para.innerText += statement;
        })

        newCard.append(image,heading,para);
        contents.append(newCard);
    });
}

function addPagination(){
    for(let i=1;i<=totalPageCount;i++){
        const newPage = document.createElement("div");
        newPage.classList.add("btn");
        newPage.innerText = i;
        // pageContainer.append(newPage);

        pages = [...pages, newPage];
    }
    // console.log(totalPageCount);
    console.log(pages);
    addEventListeners();
}

function addEventListeners(){
    pages.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            page = Number(btn.innerText);
            showData();
        });
    });
    prev.addEventListener("click",(e)=>{
        if(page > 1)    page--;
        showData();
    });
    next.addEventListener("click",(e)=>{
        if(page < totalPageCount)    page++;
        showData();
    });
    showPages();
    // updateActive();
}

function updateActive(){
    if(pages.length > 0){
        pages.forEach((btn) => {
            if(page === Number(btn.innerText)){
                btn.classList.add("active");
                
            }
            else{
                btn.classList.remove("active");
                console.log("done");
            }
        });
    }
}
function runApp(){
    fetchData();
    // updateActive(); 
}
runApp();   
  