/* =====================================================
   PROMPTFORGE AI v5
   THEME ENGINE
===================================================== */


/* =====================================================
   INIT THEME
===================================================== */

function initTheme(){


    const button =

        document.getElementById("themeBtn");


    if(!button){

        console.warn(
            "Theme button tidak ditemukan"
        );

        return;

    }



    const savedTheme =

        localStorage.getItem(
            "promptforge-theme"
        );



    if(savedTheme){

        document.body.classList.add(
            savedTheme
        );

    }



    button.addEventListener(

        "click",

        ()=>{


            toggleTheme();


        }

    );


}



/* =====================================================
   TOGGLE THEME
===================================================== */

function toggleTheme(){



    const body =

        document.body;



    body.classList.toggle(

        "dark-mode"

    );



    const active =

        body.classList.contains(
            "dark-mode"
        );



    localStorage.setItem(

        "promptforge-theme",

        active

        ?

        "dark-mode"

        :

        ""

    );



    updateThemeIcon(

        active

    );



}



/* =====================================================
   UPDATE ICON
===================================================== */

function updateThemeIcon(dark){



    const button =

        document.getElementById(
            "themeBtn"
        );



    if(!button){

        return;

    }



    button.innerHTML =

        dark

        ?

        "☀️"

        :

        "🌙";



}



/* =====================================================
   AUTO START
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        initTheme();


    }

);
