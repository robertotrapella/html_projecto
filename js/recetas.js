const apiKey = "1b0c3e984f564cc8acd0c49cae833f13";
const url = "https://api.spoonacular.com/recipes/complexSearch";

const inputRecipe = document.getElementById("input_recipe");
const btnRecipe = document.getElementById("btn_recetas");
const grifRecipe = document.getElementById("grid_recetas");
const tituloReceta = document.getElementById("title_receta");
var recetas = [];

btnRecipe.onclick = function () {
    const receta = inputRecipe.value;
    const urlFinal = `${url}?query=${receta}&number=8&apiKey=${apiKey}`;
    fetch(urlFinal)
        .then(response => response.json())
        .then(data => {
            console.log("!Recetas encontradas!", data.results);
            for (let i = 0; i < data.results.length; i++) {
                grifRecipe.innerHTML += data.results[i].title + "<br>";
                grifRecipe.innerHTML += "<img src=" + data.results[i].image + ">" + "<br>";
            }
        })
        .catch(error => console.log("!Hubo un error¡"));
};