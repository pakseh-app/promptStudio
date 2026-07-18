/* ==========================================================
   PROMPTFORGE AI
   SMART PROMPT GENERATOR ENGINE

   Version : 5.0.0
   File    : generator.js

   PART 1
========================================================== */


/* ==========================================================
   ENGINE INFO
========================================================== */

const PromptForgeGenerator = {

    version:"5.0.0",

    build:"Smart Composer",

    author:"PromptForge AI"

};



/* ==========================================================
   MAIN GENERATE ENGINE
========================================================== */

function generateProfessionalPrompt(){

    try{


        const input = collectInput();



        /*
            DETECTOR ENGINE
            menggunakan detector.js v5
        */

        let detect = {

            category:"General Design",

            style:"Modern",

            canvas:"Auto",

            color:"Auto",

            audience:"General Audience",

            confidence:0

        };



        if(

            window.PromptDetector &&

            typeof window.PromptDetector.analyze === "function"

        ){

            detect =

            PromptDetector.analyze(

                input.idea

            );

        }



        const template =

        getSelectedTemplate();



        let prompt =

        composePrompt(

            input,

            detect,

            template

        );



        prompt =

        optimizePrompt(

            prompt

        );



        renderOutput(

            prompt

        );



        savePromptHistory(

            prompt

        );



        updatePromptQuality(

            prompt

        );



    }

    catch(error){


        console.error(

            "PromptForge Generator Error:",

            error

        );


        alert(

            "Generate Prompt gagal.\n\n"+

            error.message

        );


    }


}



/* ==========================================================
   COLLECT INPUT
========================================================== */


function collectInput(){


    return {


        idea:

        getValue("idea"),



        category:

        getValue("category"),



        style:

        getValue("style"),



        ai:

        getValue("ai"),



        size:

        getValue("size"),



        color:

        getValue("color")


    };


}



/* ==========================================================
   TEMPLATE HANDLER
========================================================== */


function getSelectedTemplate(){


    if(

        typeof getCurrentTemplate === "function"

    ){

        return getCurrentTemplate();

    }



    return null;


}



/* ==========================================================
   SMART VALUE RESOLVER

   Menentukan:
   User Input
   atau
   AI Detection

========================================================== */


function resolveValue(

    userValue,

    detectedValue

){


    if(

        !userValue ||

        userValue === "Auto Detect"

    ){

        return detectedValue;

    }



    return userValue;


}



/* ==========================================================
   COMPOSE PROMPT START

   Lanjutan PART 2

========================================================== */

/* ==========================================================
   COMPOSE PROMPT ENGINE

   PART 2
========================================================== */


function composePrompt(

   

    input,

    detect,

    template

){

    let output = [];

    output.push("TEST PAKSEH 123456");
    output.push("");

    /*
        FINAL SMART VALUES

        Prioritas:
        1. Input user
        2. Detector AI
        3. Default
    */


    const finalCategory =

    resolveValue(

        input.category,

        detect.category || "General Design"

    );



    const finalStyle =

    resolveValue(

        input.style,

        detect.style || "Modern"

    );



    const finalCanvas =

    resolveValue(

        input.size,

        detect.canvas || "Auto"

    );



    const finalColor =

    resolveValue(

        input.color,

        detect.color || "Auto"

    );



    const finalAudience =

    detect.audience ||

    "General Audience";




 




    output.push(

"# PROFESSIONAL AI DESIGN PROMPT"

    );



    output.push("");



    output.push(

"=================================================="

    );



    output.push("");



    output.push(

"PROJECT"

    );



    output.push("");



    output.push(

input.idea || "Creative Design Project"

    );



    output.push("");



    output.push(

"=================================================="

    );



    output.push("");




/* ==========================================================
   CATEGORY
========================================================== */


    output.push(

"CATEGORY"

    );



    output.push("");



    output.push(

finalCategory

    );



    output.push("");




/* ==========================================================
   STYLE
========================================================== */


    output.push(

"STYLE"

    );



    output.push("");



    output.push(

finalStyle

    );



    output.push("");




/* ==========================================================
   TARGET AI
========================================================== */


    output.push(

"TARGET AI"

    );



    output.push("");



    output.push(

input.ai || "Universal AI"

    );



    output.push("");




/* ==========================================================
   CANVAS SIZE
========================================================== */


    output.push(

"=================================================="

    );



    output.push("");



    output.push(

"CANVAS SIZE"

    );



    output.push("");



    output.push(

finalCanvas

    );



    output.push("");




/* ==========================================================
   COLOR PALETTE
========================================================== */


    output.push(

"=================================================="

    );



    output.push("");



    output.push(

"COLOR PALETTE"

    );



    output.push("");



    output.push(

finalColor

    );



    output.push("");




/* ==========================================================
   TARGET AUDIENCE
========================================================== */


    output.push(

"=================================================="

    );



    output.push("");



    output.push(

"TARGET AUDIENCE"

    );



    output.push("");



    output.push(

finalAudience

    );



    output.push("");




/* ==========================================================
   OBJECTIVE

   Lanjutan PART 3

========================================================== */

/* ==========================================================
   OBJECTIVE
========================================================== */


    output.push(

    "=================================================="

    );



    output.push("");



    output.push(

    "OBJECTIVE"

    );



    output.push("");




    if(template && template.template.objective){


        output.push(

            template.template.objective

        );


    }

    else{


        output.push(

"Create a premium quality design with excellent composition, professional layout, highly detailed elements, balanced colors, strong visual hierarchy, realistic lighting, and commercial production quality."

        );


    }



    output.push("");




/* ==========================================================
   VISUAL STYLE
========================================================== */


    output.push(

    "=================================================="

    );



    output.push("");



    output.push(

    "VISUAL STYLE"

    );



    output.push("");




    if(template && template.template.visual){


        output.push(

            template.template.visual

        );


    }

    else{


        output.push(

`${finalStyle} design style, professional composition, clean visual hierarchy, premium appearance, highly detailed rendering, attractive and modern aesthetic.`

        );


    }



    output.push("");




/* ==========================================================
   TYPOGRAPHY
========================================================== */


    output.push(

    "=================================================="

    );



    output.push("");



    output.push(

    "TYPOGRAPHY"

    );



    output.push("");




    if(template && template.template.typography){


        output.push(

            template.template.typography

        );


    }

    else{


        output.push(

"Use bold modern typography with excellent readability, balanced spacing, premium font hierarchy, clean alignment, and professional visual impact."

        );


    }



    output.push("");




/* ==========================================================
   LAYOUT
========================================================== */


    output.push(

    "=================================================="

    );



    output.push("");



    output.push(

    "LAYOUT"

    );



    output.push("");




    if(template && template.template.layout){


        output.push(

            template.template.layout

        );


    }

    else{


        output.push(

"Professional grid composition, balanced spacing, clear focal point, strong visual hierarchy, clean arrangement, and optimized design structure."

        );


    }



    output.push("");




/* ==========================================================
   LIGHTING
========================================================== */


    output.push(

    "=================================================="

    );



    output.push("");



    output.push(

    "LIGHTING"

    );



    output.push("");




    if(template && template.template.lighting){


        output.push(

            template.template.lighting

        );


    }

    else{


        output.push(

"Cinematic lighting, realistic shadows, ambient illumination, HDR quality, soft highlights, and professional rendering."

        );


    }



    output.push("");




/* ==========================================================
   CAMERA
========================================================== */


    output.push(

    "=================================================="

    );



    output.push("");



    output.push(

    "CAMERA"

    );



    output.push("");




    if(template && template.template.camera){


        output.push(

            template.template.camera

        );


    }

    else{


        output.push(

"Professional camera angle, balanced framing, realistic perspective, depth of field, high quality composition."

        );


    }



    output.push("");




/* ==========================================================
   NEGATIVE PROMPT

   Lanjutan PART 4

========================================================== */

/* ==========================================================
   NEGATIVE PROMPT
========================================================== */


    output.push(

    "=================================================="

    );



    output.push("");



    output.push(

    "NEGATIVE PROMPT"

    );



    output.push("");




    if(template && template.template.negative){


        output.push(

            template.template.negative

        );


    }

    else{


        output.push(

`Low quality

Blurry

Pixelated

Noise

Overexposed

Underexposed

Bad anatomy

Bad composition

Distorted perspective

Watermark

Logo

Signature

Text artifacts

Duplicate objects

Low resolution`

        );


    }



    output.push("");




/* ==========================================================
   OUTPUT FORMAT
========================================================== */


    output.push(

    "=================================================="

    );



    output.push("");



    output.push(

    "OUTPUT FORMAT"

    );



    output.push("");




    output.push(

`Professional Commercial Quality

Ultra HD

8K Detail

Print Ready

High Dynamic Range

Sharp Focus

Premium Design

Modern Composition`

    );



    output.push("");




/* ==========================================================
   AI OPTIMIZATION
========================================================== */


    output.push(

    "=================================================="

    );



    output.push("");



    output.push(

    "TARGET AI OPTIMIZATION"

    );



    output.push("");





    switch(input.ai){


        case "ChatGPT":


            output.push(

            "Optimized for ChatGPT Image Generation"

            );


        break;




        case "Gemini":


            output.push(

            "Optimized for Google Gemini"

            );


        break;




        case "Claude":


            output.push(

            "Optimized for Claude AI"

            );


        break;




        case "Leonardo AI":


            output.push(

            "Optimized for Leonardo AI"

            );


        break;




        case "Midjourney":


            output.push(

            "Optimized for Midjourney"

            );


        break;




        case "Ideogram":


            output.push(

            "Optimized for Ideogram"

            );


        break;




        case "Flux":


            output.push(

            "Optimized for Flux"

            );


        break;




        default:


            output.push(

            "Universal AI Prompt Optimization"

            );


    }



    output.push("");




/* ==========================================================
   DETECTION INFORMATION

   (V5 FEATURE)

========================================================== */


    output.push(

    "=================================================="

    );



    output.push("");



    output.push(

    "AI DETECTION DATA"

    );



    output.push("");



    output.push(

`Confidence : ${detect.confidence || 0}%

Detected Category : ${finalCategory}

Detected Style : ${finalStyle}

Detected Audience : ${finalAudience}`

    );



    output.push("");




/* ==========================================================
   FINAL BUILD
========================================================== */


    return output.join(

        "\n"

    );


}





/* ==========================================================
   OPTIMIZER
========================================================== */


function optimizePrompt(prompt){


    if(!prompt){


        return "";

    }



    return prompt

    .replace(/\n{3,}/g,"\n\n")

    .trim();


}



/* ==========================================================
   RENDER OUTPUT

   Lanjutan PART 5

========================================================== */

/* ==========================================================
   RENDER OUTPUT
========================================================== */


function renderOutput(prompt){


    const output =

    document.getElementById(

        "output"

    );



    if(output){


        output.value = prompt;


    }


}




/* ==========================================================
   SAVE HISTORY
========================================================== */


function savePromptHistory(prompt){


    if(

        typeof saveHistory === "function"

    ){


        saveHistory(

            prompt

        );


    }


}




/* ==========================================================
   UPDATE QUALITY
========================================================== */


function updatePromptQuality(prompt){



    if(

        typeof calculatePromptQuality === "function"

    ){


        calculatePromptQuality(

            prompt

        );


        return;


    }




    if(

        typeof analyzePrompt === "function"

    ){


        analyzePrompt(

            prompt

        );


    }


}




/* ==========================================================
   GET VALUE HELPER
========================================================== */


function getValue(id){


    const element =

    document.getElementById(

        id

    );



    if(!element){


        return "";


    }



    return element.value.trim();


}





/* ==========================================================
   COPY SUPPORT
========================================================== */


function copyGeneratedPrompt(){



    const output =

    document.getElementById(

        "output"

    );



    if(!output){

        return;

    }




    navigator.clipboard.writeText(

        output.value

    );



}




/* ==========================================================
   DOWNLOAD SUPPORT
========================================================== */


function downloadGeneratedPrompt(){



    const output =

    document.getElementById(

        "output"

    );



    if(!output){

        return;

    }




    const blob =

    new Blob(

        [

            output.value

        ],

        {

            type:"text/plain"

        }

    );



    const url =

    URL.createObjectURL(

        blob

    );



    const link =

    document.createElement(

        "a"

    );



    link.href=url;



    link.download=

    "PromptForge-AI-Prompt.txt";



    link.click();



    URL.revokeObjectURL(

        url

    );


}





/* ==========================================================
   CLEAR OUTPUT
========================================================== */


function clearOutput(){



    const output =

    document.getElementById(

        "output"

    );



    if(output){


        output.value="";


    }


}





/* ==========================================================
   APPEND OUTPUT
========================================================== */


function appendOutput(text){



    const output =

    document.getElementById(

        "output"

    );



    if(!output){

        return;

    }



    output.value += text;


}




/* ==========================================================
   PUBLIC API
========================================================== */


window.PromptForgeEngine={


    version:"5.0.0",



    generate:

    generateProfessionalPrompt,



    collect:

    collectInput,



    compose:

    composePrompt,



    optimize:

    optimizePrompt,



    render:

    renderOutput,



    history:

    savePromptHistory,



    quality:

    updatePromptQuality,



    copy:

    copyGeneratedPrompt,



    download:

    downloadGeneratedPrompt,



    clear:

    clearOutput


};






/* ==========================================================
   BUTTON EVENTS
========================================================== */


document.addEventListener(


"DOMContentLoaded",


()=>{



    const copyButton =

    document.getElementById(

        "copy"

    );



    if(copyButton){


        copyButton.addEventListener(

            "click",

            copyGeneratedPrompt

        );


    }




    const downloadButton =

    document.getElementById(

        "download"

    );



    if(downloadButton){


        downloadButton.addEventListener(

            "click",

            downloadGeneratedPrompt

        );


    }



});






/* ==========================================================
   READY
========================================================== */


console.log(


"%cPromptForge AI Generator v5.0 Loaded",


"color:#22c55e;font-size:14px;font-weight:bold;"


);




/* ==========================================================
   END OF FILE
========================================================== */
