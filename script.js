//1ère étape : la forme globale
//Je vais créer mes div en javascript en commençant par le cadre du jeu et le header.
// je vais définir sa taille, son image de fond, ses bordures en CSS. 
// Je vais définir la couleur de fond de page web, etc.


// 1)Je crée mon header
var header = document.createElement('header');
document.body.appendChild(header);
//Je crée ma navbar
var nav = document.createElement('nav');
header.appendChild(nav);

//Je crée les boutons de ma navbar
// refaire boutons et les faire bouger en vague

//bouton 1
var bouton1 = document.createElement('button');
bouton1.id = 'noob';
nav.appendChild(bouton1);
var textforbutton1 = document.createTextNode(' Niveau 1 : Noob ');
bouton1.appendChild(textforbutton1);
//au clic
bouton1.addEventListener('click',function(){
    prepare(17,3,60);
});

//bouton 2

var bouton2 = document.createElement('button');
nav.appendChild(bouton2);
var textforbutton2 = document.createTextNode(' Niveau 2 : Hardcore ');
bouton2.appendChild(textforbutton2);
//au clic
bouton2.addEventListener('click',function(){
    prepare(60,20,45);
});

//bouton 3 
var bouton3 = document.createElement('button');
nav.appendChild(bouton3);
var textforbutton3 = document.createTextNode(' Niveau 3 : Ultraviolence ');
bouton3.appendChild(textforbutton3);
//au clic
bouton3.addEventListener('click',function(){
    prepare(130,70,30);
});

//score
var divscore = document.createElement('div');
header.appendChild(divscore);
divscore.id = 'divscore';
var score = "";
var texteScore = document.createTextNode(score);
divscore.appendChild(texteScore);
score.id = 'score';

//timer
var divchrono = document.createElement('div');
document.body.appendChild(divchrono);
divchrono.id = 'divchrono';
var chrono = 0;
var progression = document.createElement('div');
divchrono.appendChild(progression);
progression.id='progression';


var id = null;
function timer(time){
    var prog = document.getElementById('progression'); //barre progression
    var width = 0;
    id=setInterval(frame,1000); // se rafraichît toutes les secondes
        function frame(){
            if (width >= 100){ //si la barre arrive à 100
                clearInterval(id); // le timer stoppe
                cliqueLose(); //fonction perdu
            }else{
                chrono++; // le chrono continue
                width= (chrono*100)/time; 
                prog.style.width = width + '%';
            }
        }
}


// Je crée mon cadre 
var cadre = document.createElement('div');
cadre.id = 'cadre';
document.body.appendChild(cadre);


//Je crée mon logo



//Header Terminé. 


function prepare(chauvesouris/*divs colorées*/, papillon /*divs foncées*/, time){
    lose();
    timer(time);
    score=0;
    divscore.innerHTML = score;
    cadre.innerHTML = ""; // supprime le "perdu" lorsqu'on réappuit sur un bouton
    for(i=0; i<chauvesouris; i++){ // définit la boucle
        var formecs = ['rond','carré','ovale']; // création divs dans variable
        var formealea = Math.floor(Math.random()*formecs.length);
        var xalea = Math.floor(Math.random()*90); // horizontal
        var yalea = Math.floor(Math.random()*90); // vertical
        var couleurcs = ['rgb(137,15,167)','rgb(38,103,10)','rgb(191,45,18)', 'rgb(191,27,54)']; // tableau de couleur
        var couleuralea = Math.floor(Math.random()*couleurcs.length);
        var taillealea = Math.floor(Math.random()*(100)+20);
        
        if(i<papillon){
            var cible = document.createElement('div');
            cible.classList.add('m1'); // création de div noires
            cible.style.width = taillealea + "px";
            cible.style.height = taillealea + "px";
            cible.addEventListener("click", cliqueLose);
        }else{
            var cible = document.createElement('div'); // création des div aléatoires
            cible.classList.add(formecs[formealea]);
            cible.style.backgroundColor = couleurcs[couleuralea];
            cible.style.height = taillealea + "px";
            cible.style.width = taillealea + "px";
            cible.addEventListener("click", cliqueWin);
            cible.classList.add('cs'); // classe pour toutes les dics coloées
        }
        
        // création des divs 
        cible.classList.add('cible'); // Je donne l'ID "cible" à ma classe "cible" (je donne un nom à mon paquet de div)
        cible.style.top = yalea + "%"; // le pourcent est pour que le "90%" de taille soit pris en compte
        cible.style.left = xalea + "%";
        document.querySelector('#cadre').appendChild(cible);
    }
}


                // pour que les formes scolorée suppriment au clic et que les formes noires
                
                function suppr(){
        var cible = document.querySelectorAll('.cible');
        cible.remove();
    }

    function win(){ //fait en sorte que s'il n'y a plus de div, le jeu est gagné
        var cs  = document.getElementsByClassName('cs');
        if(cs.length == 0){
            var cible = document.querySelectorAll('.cible');
            cible.forEach(function(e){
            e.remove();
            cadre.innerHTML = "gagné !";
        });
    }
    
}
function cliqueWin() { //appelée dans la fonction prepare
    (event.target).remove(); //supprime les divs
    points();
    aleatoire();
    win();
}
//fonctions perdu
function cliqueLose(){
    var cible = document.querySelectorAll('.cible');
    cible.forEach(function(e){
        e.remove();
        lose();
    });
    cadre.innerHTML = "Perdu !";
}

// perdu timer
function lose(){
    if(id!=null){
        chrono= 0;
        clearInterval(id);
        document.getElementById('progression').style.width = '0%';
    }
}
                
//fonction compteur de points

function points(){
    score=score+1;
    document.querySelector('#divscore').textContent=score; 
}

function aleatoire(){
    var cible = document.querySelectorAll('.cible');
    cible.forEach(function(e){ // ForEach séléctionne toutes les divs concernées et leur attribut la même fonction en même temps
    var xalea = Math.floor(Math.random()*90); // horizontal
    var yalea = Math.floor(Math.random()*90); // vertical
    e.style.top = yalea + "%"; // le pourcent est pour que le "90%" de taille soit pris en compte
    e.style.left = xalea + "%";
});
}



