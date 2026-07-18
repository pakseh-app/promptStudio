/* =====================================================
   PROMPTFORGE AI v5
   APP.JS
   CORE INITIALIZATION
===================================================== */


/* =====================================================
   GLOBAL APP STATE
===================================================== */


window.PromptForgeApp = {


    version:"5.0.0",


    composer:null,


    initialized:false,


    result:null,


    settings:{


        mode:"professional",


        autoEnhance:true


    }


};



/* =====================================================
   DOM READY
===================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        bootPromptForge();


    }

);




/* =====================================================
   BOOT SYSTEM
===================================================== */


function bootPromptForge(){


    console.log(
        "%cStarting PromptForge AI v5...",
        "color:#06b6d4;font-weight:bold"
    );


    initComposerCore();


    initNavigation();


    initHeroButtons();
   

   initGenerateButton();
   

    initializeAIEngine();



    PromptForgeApp.initialized=true;



    console.log(

        "%cPromptForge AI v5 Ready",

        "color:#22c55e;font-weight:bold"

    );


}




/* =====================================================
   COMPOSER CORE INITIALIZER
===================================================== */


function initComposerCore(){



    if(

        typeof PromptComposer==="undefined"

    ){


        console.warn(

            "PromptComposer belum tersedia"

        );


        return;


    }




    PromptForgeApp.composer =

        new PromptComposer();




    console.log(

        "Composer Engine Connected",

        PromptForgeApp.composer

    );


}





/* =====================================================
   APP STATUS
===================================================== */


function getAppStatus(){



    return {


        version:

        PromptForgeApp.version,



        initialized:

        PromptForgeApp.initialized,



        composer:

        !!PromptForgeApp.composer


    };


}

/* =====================================================
   PART 2
   NAVIGATION SYSTEM v5
===================================================== */


/* =====================================================
   NAVIGATION INITIALIZER
===================================================== */


function initNavigation(){



    const links =

        document.querySelectorAll(

            ".nav-link"

        );



    if(!links.length){

        console.warn(

            "Navigation link tidak ditemukan"

        );

        return;

    }




    links.forEach(

        link=>{



            link.addEventListener(

                "click",

                event=>{



                    event.preventDefault();



                    const page =

                        link.dataset.page;



                    if(page){


                        showPage(page);


                    }



                }

            );



        }

    );



}



/* =====================================================
   SHOW PAGE
===================================================== */


function showPage(pageName){



    const pages =

        document.querySelectorAll(

            ".page"

        );



    const links =

        document.querySelectorAll(

            ".nav-link"

        );




    /* REMOVE ACTIVE MENU */

    links.forEach(

        link=>{


            link.classList.remove(

                "active"

            );



            if(

                link.dataset.page===pageName

            ){


                link.classList.add(

                    "active"

                );


            }



        }

    );




    /* HIDE ALL PAGE */

    pages.forEach(

        page=>{


            page.classList.remove(

                "active-page"

            );


        }

    );





    /* SHOW TARGET PAGE */

    const target =

        document.getElementById(

            pageName+"-page"

        );




    if(target){


        target.classList.add(

            "active-page"

        );



        PromptForgeApp.currentPage =

            pageName;


    }

    else{


        console.warn(

            "Page tidak ditemukan:",

            pageName

        );


    }





    window.scrollTo({


        top:0,


        behavior:"smooth"


    });



}





/* =====================================================
   HERO BUTTON SYSTEM
===================================================== */


function initHeroButtons(){



    const buttons =

        document.querySelectorAll(

            "[data-open]"

        );



    buttons.forEach(

        button=>{


            button.addEventListener(

                "click",

                ()=>{


                    const page =

                        button.dataset.open;



                    if(page){


                        showPage(page);


                    }



                }

            );


        }

    );



}

/* =====================================================
   PART 3
   COMPOSER CONNECTION LAYER
===================================================== */


/* =====================================================
   CREATE COMPOSER INSTANCE
===================================================== */


function createComposer(){



    if(

        PromptForgeApp.composer

    ){


        return PromptForgeApp.composer;


    }




    if(

        typeof PromptComposer==="undefined"

    ){



        console.error(

            "PromptComposer v5 tidak ditemukan"

        );



        return null;


    }




    try{



        PromptForgeApp.composer =

            new PromptComposer();




        console.log(

            "%cComposer Engine Connected",

            "color:#22c55e;font-weight:bold"

        );



        return PromptForgeApp.composer;



    }

    catch(error){



        console.error(

            "Composer gagal dibuat:",

            error

        );



        return null;


    }



}





/* =====================================================
   GET COMPOSER
===================================================== */


function getComposer(){



    if(

        !PromptForgeApp.composer

    ){



        return createComposer();


    }




    return PromptForgeApp.composer;



}





/* =====================================================
   COMPOSER HEALTH CHECK
===================================================== */


function checkComposer(){



    const composer =

        getComposer();





    if(!composer){



        return {


            ready:false,


            message:

            "Composer belum aktif"


        };



    }




    return {


        ready:true,


        version:

        window.PromptComposerVersion || "unknown",



        engine:

        composer



    };



}





/* =====================================================
   INITIALIZE ADVANCED ENGINE
===================================================== */


function initializeAIEngine(){



    const composer =

        getComposer();




    if(!composer){


        return false;


    }




    try{



        if(

            typeof composer.boot === "function"

        ){



            composer.boot();



        }





        console.log(

            "%cAI Engine Initialized",

            "color:#facc15;font-weight:bold"

        );




        return true;



    }

    catch(error){



        console.error(

            "AI Engine initialization error:",

            error

        );



        return false;


    }


}

/* =====================================================
   PART 4
   GENERATE PIPELINE ENGINE v5
===================================================== */


/* =====================================================
   GENERATE BUTTON INITIALIZER
===================================================== */


function initGenerateButton(){



    const button =

        document.getElementById(

            "generate"

        );



    if(!button){


        console.warn(

            "Generate button tidak ditemukan"

        );


        return;


    }




    button.addEventListener(

        "click",

        ()=>{


            runPromptGeneration();



        }

    );



}





/* =====================================================
   MAIN GENERATE FUNCTION
===================================================== */


async function runPromptGeneration(){



    const input =

        collectPromptInput();





    if(

        !input

    ){


        alert(

            "Silahkan isi data prompt terlebih dahulu"

        );


        return;


    }





    showGeneratingState();




    try{



        const composer =

            getComposer();




        let result;




        if(

            composer &&

            typeof composer.run==="function"

        ){



            result =

                composer.run(

                    input

                );



        }

        else{



            console.warn(

                "Composer v5 belum tersedia, menggunakan generator lama"

            );



            result =

                await runLegacyGenerator(

                    input

                );



        }






        PromptForgeApp.result = result;




        displayPromptResult(

            result

        );





        savePromptHistory(

            result

        );




    }

    catch(error){



        console.error(

            "Generate Error:",

            error

        );



        showGenerateError(

            error

        );



    }



}





/* =====================================================
   COLLECT USER INPUT
===================================================== */


function collectPromptInput(){



    const fields =

        document.querySelectorAll(

            "input, textarea, select"

        );



    const data={};




    fields.forEach(

        field=>{



            if(

                field.value &&

                field.id

            ){



                data[field.id]=

                    field.value;



            }



        }

    );





    return Object.keys(data).length

        ?

        data

        :

        null;



}





/* =====================================================
   FALLBACK GENERATOR
===================================================== */


async function runLegacyGenerator(data){



    if(

        typeof generateProfessionalPrompt==="function"

    ){



        return generateProfessionalPrompt(

            data

        );



    }



    return {


        success:false,


        message:

        "Generator belum tersedia"



    };


}





/* =====================================================
   GENERATE UI STATE
===================================================== */


function showGeneratingState(){



    const output =

        document.getElementById(

            "result"

        );



    if(output){



        output.innerHTML =

        `

        <div class="loading">

            ⚡ AI sedang menyusun prompt...

        </div>

        `;



    }



}





function showGenerateError(error){



    const output =

        document.getElementById(

            "result"

        );



    if(output){



        output.innerHTML =

        `

        <div class="error">

            ❌ ${error.message}

        </div>

        `;



    }



}


/* =====================================================
   PART 5
   AI ANALYSIS PANEL v5
===================================================== */


/* =====================================================
   ANALYSIS GENERATOR
===================================================== */


function generateAIAnalysis(result){



    if(!result){



        return {


            category:"Unknown",


            style:"Auto",


            quality:0,


            recommendation:"AI"



        };



    }





    const decision =

        result.decision || {};





    return {


        category:

        decision.category ||

        detectCategory(result),



        style:

        decision.style ||

        detectStyle(result),



        quality:

        calculateQuality(result),



        recommendation:

        recommendAI(result)



    };



}





/* =====================================================
   CATEGORY DETECTOR
===================================================== */


function detectCategory(result){



    const text =

        JSON.stringify(

            result

        )

        .toLowerCase();





    if(

        text.includes("poster")

    ){


        return "Poster";


    }





    if(

        text.includes("banner")

    ){


        return "Banner";


    }





    if(

        text.includes("logo")

    ){


        return "Logo";


    }





    if(

        text.includes("product")

    ){


        return "Product Design";


    }





    return "General Design";



}





/* =====================================================
   STYLE DETECTOR
===================================================== */


function detectStyle(result){



    const styles=[


        "Modern",


        "Minimal",


        "Premium",


        "Cinematic",


        "Luxury"



    ];




    const random =

        Math.floor(

            Math.random()

            *

            styles.length

        );




    return styles[random];



}





/* =====================================================
   QUALITY CALCULATOR
===================================================== */


function calculateQuality(result){



    let score=70;




    if(result.prompt){


        score+=10;


    }





    if(result.decision){


        score+=10;


    }





    if(result.profile){


        score+=10;


    }





    return Math.min(

        score,

        100

    );



}





/* =====================================================
   AI RECOMMENDATION
===================================================== */


function recommendAI(result){



    const category =

        JSON.stringify(

            result

        )

        .toLowerCase();





    if(

        category.includes("video")

    ){


        return "VEO AI";


    }





    if(

        category.includes("image")

    ){


        return "Leonardo AI";


    }





    return "ChatGPT";



}





/* =====================================================
   DISPLAY AI ANALYSIS
===================================================== */


function displayAIAnalysis(result){



    const panel =

        document.getElementById(

            "ai-analysis"

        );



    if(!panel){


        return;


    }





    const analysis =

        generateAIAnalysis(

            result

        );





    panel.innerHTML =



    `

    <div class="analysis-card">


        <h3>

        🤖 AI Analysis

        </h3>


        <p>

        🎯 Category:

        <b>${analysis.category}</b>

        </p>


        <p>

        🎨 Style:

        <b>${analysis.style}</b>

        </p>


        <p>

        ⭐ Quality:

        <b>${analysis.quality}%</b>

        </p>


        <p>

        🚀 Recommended:

        <b>${analysis.recommendation}</b>

        </p>


    </div>

    `;



}

/* =====================================================
   PART 6
   OUTPUT HANDLER ENGINE v5
===================================================== */


/* =====================================================
   DISPLAY RESULT
===================================================== */

function displayPromptResult(result){


    if(!result){

        return;

    }


    displayAIAnalysis(result);



    const output =

        document.getElementById(
            "output"
        );



    if(!output){

        console.warn(
            "Output textarea tidak ditemukan"
        );

        return;

    }



    const prompt =

        extractPrompt(
            result
        );



    output.value = prompt;



}
/* =====================================================
   EXTRACT PROMPT DATA
===================================================== */


function extractPrompt(result){



    if(

        typeof result==="string"

    ){



        return result;



    }





    if(

        result.prompt

    ){



        return result.prompt;



    }





    if(

        result.output

    ){



        return result.output;



    }





    return JSON.stringify(

        result,

        null,

        2

    );



}





/* =====================================================
   COPY RESULT BUTTON
===================================================== */


function initCopyResult(){



    const button =

        document.getElementById(

            "copyPrompt"

        );



    if(!button){


        return;


    }





    button.addEventListener(

        "click",

        ()=>{



            const prompt =

                document.querySelector(

                    ".prompt-box pre"

                );




            if(prompt){



                navigator.clipboard.writeText(

                    prompt.innerText

                );





                button.innerHTML =

                "✅ Copied!";





                setTimeout(()=>{


                    button.innerHTML =

                    "📋 Copy Prompt";



                },1500);



            }



        }

    );



}





/* =====================================================
   FORMAT PROMPT OUTPUT
===================================================== */


function formatPromptOutput(prompt=""){



    return prompt

        .replace(

            /\n{3,}/g,

            "\n\n"

        )

        .trim();



}





/* =====================================================
   CLEAR OUTPUT
===================================================== */


function clearOutput(){



    const output =

        document.getElementById(

            "result"

        );



    if(output){



        output.innerHTML="";



    }



}

/* =====================================================
   PART 7
   HISTORY INTEGRATION ENGINE v5
===================================================== */


/* =====================================================
   SAVE PROMPT HISTORY
===================================================== */


function savePromptHistory(result){



    if(!result){


        return;


    }





    const historyData = {


        id:

        Date.now(),



        prompt:

        extractPrompt(

            result

        ),



        created:

        new Date()

        .toISOString(),



        analysis:

        generateAIAnalysis(

            result

        )


    };





    PromptForgeApp.history =

        PromptForgeApp.history || [];





    PromptForgeApp.history.push(

        historyData

    );





    /*

       Jika history.js tersedia

    */


    if(

        typeof saveHistory==="function"

    ){



        saveHistory(

            historyData

        );



    }





    console.log(

        "History saved:",

        historyData

    );



}





/* =====================================================
   GET HISTORY DATA
===================================================== */


function getPromptHistory(){



    if(

        PromptForgeApp.history

    ){



        return PromptForgeApp.history;



    }





    if(

        typeof getHistory==="function"

    ){



        return getHistory();



    }





    return [];



}





/* =====================================================
   CLEAR HISTORY
===================================================== */


function clearPromptHistory(){



    PromptForgeApp.history=[];




    if(

        typeof clearHistory==="function"

    ){



        clearHistory();



    }





    console.log(

        "Prompt history cleared"

    );



}





/* =====================================================
   DISPLAY HISTORY
===================================================== */


function displayHistory(){



    const container =

        document.getElementById(

            "history-list"

        );



    if(!container){


        return;


    }





    const history =

        getPromptHistory();





    if(

        !history.length

    ){



        container.innerHTML =

        `

        <div class="empty-history">

            Belum ada prompt

        </div>

        `;



        return;


    }





    container.innerHTML =



    history

    .reverse()

    .map(

        item=>



        `

        <div class="history-card">


            <h4>

            ${item.analysis.category}

            </h4>



            <p>

            ${item.prompt.substring(0,150)}

            ...

            </p>



            <small>

            ${item.created}

            </small>


        </div>

        `


    )

    .join("");



}

/* =====================================================
   PART 8
   TEMPLATE INTELLIGENCE CONNECTION v5
===================================================== */


/* =====================================================
   TEMPLATE ENGINE CONNECTOR
===================================================== */


function getTemplateEngine(){



    if(

        typeof PromptTemplates!=="undefined"

    ){



        return PromptTemplates;



    }





    if(

        typeof Templates!=="undefined"

    ){



        return Templates;



    }





    console.warn(

        "Template engine belum tersedia"

    );



    return null;



}





/* =====================================================
   GET ALL TEMPLATES
===================================================== */


function getAllTemplates(){



    const engine =

        getTemplateEngine();





    if(!engine){



        return [];



    }





    if(

        typeof engine.list==="function"

    ){



        return engine.list();



    }





    if(

        Array.isArray(engine)

    ){



        return engine;



    }





    return [];



}





/* =====================================================
   TEMPLATE RECOMMENDER
===================================================== */


function recommendTemplate(data={}){



    const templates =

        getAllTemplates();





    if(

        !templates.length

    ){



        return null;



    }





    const text =

        JSON.stringify(

            data

        )

        .toLowerCase();





    let selected=null;





    templates.forEach(

        template=>{



            const name =

                JSON.stringify(

                    template

                )

                .toLowerCase();





            if(

                text.includes(

                    name

                )

            ){



                selected=template;



            }



        }

    );





    return selected ||

        templates[0];



}





/* =====================================================
   APPLY TEMPLATE
===================================================== */


function applySmartTemplate(data={}){



    const template =

        recommendTemplate(

            data

        );





    if(!template){



        return data;



    }





    return {


        ...data,



        template:



        template



    };



}





/* =====================================================
   TEMPLATE ANALYSIS
===================================================== */


function analyzeTemplate(result){



    const data={



        category:

        "General",



        template:

        "Auto"



    };





    if(

        result &&

        result.decision

    ){



        data.category =

            result.decision.category

            ||

            data.category;



    }





    const template =

        recommendTemplate(

            result

        );





    if(template){



        data.template=

            template.name

            ||

            "Recommended Template";



    }





    return data;



}





/* =====================================================
   SHOW TEMPLATE RECOMMENDATION
===================================================== */


function displayTemplateRecommendation(result){



    const box =

        document.getElementById(

            "template-analysis"

        );





    if(!box){



        return;



    }





    const info =

        analyzeTemplate(

            result

        );





    box.innerHTML =



    `

    <div class="template-card">


        <h3>

        📐 Template Recommendation

        </h3>



        <p>

        Category:

        <b>${info.category}</b>

        </p>



        <p>

        Template:

        <b>${info.template}</b>

        </p>


    </div>

    `;



}

/* =====================================================
   PART 9
   PUBLIC API CONTROLLER v5
===================================================== */


/* =====================================================
   PUBLIC GENERATE API
===================================================== */


function publicGenerate(data={}){



    if(data && Object.keys(data).length){



        return runPromptGenerationFromData(

            data

        );



    }





    return runPromptGeneration();



}





/* =====================================================
   GENERATE FROM EXTERNAL DATA
===================================================== */


async function runPromptGenerationFromData(data={}){



    try{



        const composer =

            getComposer();





        if(

            composer &&

            typeof composer.run==="function"

        ){



            const result =

                composer.run(

                    data

                );





            PromptForgeApp.result =

                result;





            displayPromptResult(

                result

            );





            savePromptHistory(

                result

            );





            return result;



        }



    }

    catch(error){



        console.error(

            error

        );



    }



    return null;



}





/* =====================================================
   OPEN PAGE API
===================================================== */


function openPromptForgePage(page){



    if(

        typeof showPage==="function"

    ){



        showPage(

            page

        );



    }



}





/* =====================================================
   STATUS API
===================================================== */


function getPromptForgeStatus(){



    return {


        app:

        getAppStatus(),



        composer:

        checkComposer(),



        result:

        !!PromptForgeApp.result



    };



}





/* =====================================================
   RESET APP DATA
===================================================== */


function resetPromptForge(){



    PromptForgeApp.result=null;



    PromptForgeApp.history=[];



    clearOutput();



    console.log(

        "PromptForge reset"

    );



}





/* =====================================================
   GLOBAL PUBLIC OBJECT
===================================================== */


window.PromptForge = {


    version:"5.0.0",



    generate:

        publicGenerate,



    openPage:

        openPromptForgePage,



    status:

        getPromptForgeStatus,



    reset:

        resetPromptForge,



    composer(){



        return getComposer();



    },



    history(){



        return getPromptHistory();



    }



};

/* =====================================================
   PART 10
   FINAL APP CONTROLLER v5
===================================================== */


/* =====================================================
   SYSTEM MODULE CHECK
===================================================== */


function checkSystemModules(){



    const modules = {



        composer:

        typeof PromptComposer !== "undefined",



        generator:

        typeof generateProfessionalPrompt === "function",



        templates:

        typeof PromptTemplates !== "undefined",



        history:

        typeof saveHistory === "function",



        quality:

        typeof QualityEngine !== "undefined"



    };




    return modules;



}





/* =====================================================
   SYSTEM REPORT
===================================================== */


function systemReport(){



    return {



        version:

        PromptForgeApp.version,



        initialized:

        PromptForgeApp.initialized,



        modules:

        checkSystemModules(),



        timestamp:

        new Date()

        .toISOString()



    };



}





/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */


window.addEventListener(

    "error",

    event=>{



        console.error(

            "PromptForge Error:",

            event.error

        );



    }

);





/* =====================================================
   FINAL STARTUP
===================================================== */


function startPromptForgeV5(){



    console.log(

        "%c===================================",

        "color:#06b6d4"

    );



    console.log(

        "%c PROMPTFORGE AI v5 STARTING ",

        "color:#22c55e;font-weight:bold"

    );





    const report =

        systemReport();





    console.table(

        report.modules

    );





    console.log(

        "%cPromptForge AI v5 Production Mode Active",

        "color:#facc15;font-weight:bold"

    );



    return report;



}





/* =====================================================
   EXTEND PUBLIC API
===================================================== */


window.PromptForge.start =

    startPromptForgeV5;



window.PromptForge.report =

    systemReport;





/* =====================================================
   AUTO START
===================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{



        setTimeout(

            ()=>{



                startPromptForgeV5();



            },

            500

        );



    }

);
