/* ==========================================================
   PROMPTFORGE AI
   SMART DETECTOR ENGINE
   Version : 5.0.0
========================================================== */


/* ==========================================================
   CONFIG
========================================================== */

const DetectorEngine={

    version:"5.0.0",

    debug:false

};



/* ==========================================================
   CATEGORY DATABASE
========================================================== */

const CategoryDatabase=[

{

type:"Poster",

keywords:[

"poster",
"poster digital",
"poster event",
"pamflet",
"pengumuman"

]

},

{

type:"Banner",

keywords:[

"banner",
"spanduk",
"sepanduk",
"baliho",
"billboard",
"x-banner",
"x banner",
"roll banner",
"standing banner"

]

},

{

type:"Flyer",

keywords:[

"flyer",
"brosur",
"leaflet",
"selebaran"

]

},

{

type:"Logo",

keywords:[

"logo",
"branding",
"brand",
"emblem",
"maskot"

]

},

{

type:"Thumbnail",

keywords:[

"thumbnail",
"youtube",
"cover youtube",
"cover video"

]

},

{

type:"Undangan",

keywords:[

"undangan",
"invitation",
"wedding invitation",
"kartu undangan"

]

},

{

type:"Packaging",

keywords:[

"packaging",
"kemasan",
"label produk",
"box produk"

]

},

{

type:"Business Card",

keywords:[

"kartu nama",
"business card"

]

},

{

type:"Certificate",

keywords:[

"sertifikat",
"certificate",
"piagam"

]

},

{

type:"Social Media",

keywords:[

"instagram",
"facebook",
"tiktok",
"feed",
"story",
"reels",
"shorts"

]

},

{

type:"Website",

keywords:[

"website",
"landing page",
"homepage",
"web design"

]

},

{

type:"Mobile App",

keywords:[

"mobile app",
"android",
"ios",
"ui app",
"aplikasi"

]

},

{

type:"Presentation",

keywords:[

"presentasi",
"powerpoint",
"ppt",
"slide"

]

}

];



/* ==========================================================
   STYLE DATABASE
========================================================== */

const StyleDatabase=[

{

type:"Modern",

keywords:[

"modern",
"clean",
"minimalis",
"simple"

]

},

{

type:"Luxury",

keywords:[

"luxury",
"premium",
"gold",
"elegan",
"mewah"

]

},

{

type:"Corporate",

keywords:[

"corporate",
"company",
"kantor",
"office"

]

},

{

type:"Islamic",

keywords:[

"islam",
"islami",
"masjid",
"pengajian",
"maulid",
"muharram",
"ramadhan",
"santri",
"muslim"

]

},

{

type:"Futuristic",

keywords:[

"future",
"futuristic",
"technology",
"ai",
"robot"

]

},

{

type:"Vintage",

keywords:[

"retro",
"vintage",
"classic"

]

},

{

type:"3D",

keywords:[

"3d",
"pixar",
"disney",
"clay"

]

},

{

type:"Anime",

keywords:[

"anime",
"manga",
"japanese"

]

},

{

type:"Photorealistic",

keywords:[

"realistic",
"photorealistic",
"real photo"

]

}

];

/* ==========================================================
   TEXT NORMALIZER
========================================================== */

function normalizeText(text){

    if(!text){

        return "";

    }

    return text

        .toLowerCase()

        .replace(/\s+/g," ")

        .replace(/[^\w\s.,:/x-]/g,"")

        .trim();

}



/* ==========================================================
   KEYWORD MATCHER
========================================================== */

function keywordMatch(text,database){

    const source=normalizeText(text);

    for(const item of database){

        for(const keyword of item.keywords){

            if(

                source.includes(

                    keyword.toLowerCase()

                )

            ){

                return item.type;

            }

        }

    }

    return null;

}



/* ==========================================================
   CATEGORY DETECTOR
========================================================== */

function detectCategory(text){

    const result=

    keywordMatch(

        text,

        CategoryDatabase

    );

    return result ||

    "General Design";

}



/* ==========================================================
   STYLE DETECTOR
========================================================== */

function detectStyle(text){

    const result=

    keywordMatch(

        text,

        StyleDatabase

    );

    return result ||

    "Modern";

}



/* ==========================================================
   CONFIDENCE SCORE
========================================================== */

function calculateConfidence(text){

    let score=40;

    if(

        detectCategory(text)!=="General Design"

    ){

        score+=25;

    }

    if(

        detectStyle(text)!=="Modern"

    ){

        score+=20;

    }

    if(

        /\d/.test(text)

    ){

        score+=5;

    }

    if(

        text.length>40

    ){

        score+=10;

    }

    return Math.min(

        score,

        100

    );

}

/* ==========================================================
   CANVAS SIZE DETECTOR
========================================================== */

function detectCanvasSize(text){

    const source=

    normalizeText(text);



    if(

        source.includes("a5")

    ){

        return "A5";

    }



    if(

        source.includes("a4")

    ){

        return "A4";

    }



    if(

        source.includes("a3")

    ){

        return "A3";

    }



    if(

        source.includes("a2")

    ){

        return "A2";

    }



    if(

        source.includes("a1")

    ){

        return "A1";

    }



    if(

        source.includes("16:9")

    ){

        return "16:9";

    }



    if(

        source.includes("9:16")

    ){

        return "9:16";

    }



    if(

        source.includes("4:5")

    ){

        return "4:5";

    }



    if(

        source.includes("1:1")

    ){

        return "1:1";

    }



    const meter=

    source.match(

        /(\d+[.,]?\d*)\s*x\s*(\d+[.,]?\d*)\s*(meter|m)?/

    );



    if(meter){

        return `${meter[1]} x ${meter[2]} Meter`;

    }



    return "Auto";

}



/* ==========================================================
   COLOR PALETTE DETECTOR
========================================================== */

function detectColor(text){

    const source=

    normalizeText(text);



    if(

        source.includes("biru")

    ){

        return "Blue";

    }



    if(

        source.includes("merah")

    ){

        return "Red";

    }



    if(

        source.includes("hijau")

    ){

        return "Green";

    }



    if(

        source.includes("ungu")

    ){

        return "Purple";

    }



    if(

        source.includes("hitam")

    ){

        return "Black";

    }



    if(

        source.includes("putih")

    ){

        return "White";

    }



    if(

        source.includes("emas") ||

        source.includes("gold")

    ){

        return "Gold";

    }



    if(

        source.includes("orange")

    ){

        return "Orange";

    }



    return "Auto";

}



/* ==========================================================
   TARGET AUDIENCE DETECTOR
========================================================== */

function detectAudience(text){

    const source=

    normalizeText(text);



    if(

        source.includes("anak")

    ){

        return "Children";

    }



    if(

        source.includes("remaja")

    ){

        return "Teenager";

    }



    if(

        source.includes("dewasa")

    ){

        return "Adult";

    }



    if(

        source.includes("pengajian") ||

        source.includes("masjid")

    ){

        return "Muslim Community";

    }



    if(

        source.includes("perusahaan")

    ){

        return "Corporate";

    }



    if(

        source.includes("wedding") ||

        source.includes("pernikahan")

    ){

        return "Wedding Audience";

    }



    return "General Audience";

}

/* ==========================================================
   SMART DETECTOR ENGINE
========================================================== */

function detectPromptCategory(text){

    const source=

    normalizeText(text);



    const category=

    detectCategory(source);



    const style=

    detectStyle(source);



    const canvas=

    detectCanvasSize(source);



    const color=

    detectColor(source);



    const audience=

    detectAudience(source);



    const confidence=

    calculateConfidence(source);



    return{

        category,

        style,

        canvas,

        color,

        audience,

        confidence,

        source

    };

}



/* ==========================================================
   SMART SUMMARY
========================================================== */

function getDetectionSummary(result){

    return{

        category:

        result.category,



        style:

        result.style,



        canvas:

        result.canvas,



        color:

        result.color,



        audience:

        result.audience,



        confidence:

        result.confidence+"%"

    };

}



/* ==========================================================
   DEBUG MODE
========================================================== */

function debugDetection(text){

    if(

        !DetectorEngine.debug

    ){

        return;

    }



    console.group(

        "PromptForge Smart Detector"

    );



    console.table(

        getDetectionSummary(

            detectPromptCategory(text)

        )

    );



    console.groupEnd();

}

/* ==========================================================
   AI TARGET DETECTOR
========================================================== */

function detectAI(text){

    const source=

    normalizeText(text);



    if(source.includes("chatgpt")){

        return "ChatGPT";

    }



    if(source.includes("gemini")){

        return "Gemini";

    }



    if(source.includes("claude")){

        return "Claude";

    }



    if(source.includes("midjourney")){

        return "Midjourney";

    }



    if(source.includes("leonardo")){

        return "Leonardo AI";

    }



    if(source.includes("ideogram")){

        return "Ideogram";

    }



    if(source.includes("flux")){

        return "Flux";

    }



    return "Universal";

}



/* ==========================================================
   SMART ENHANCEMENT
========================================================== */

function enhanceDetection(result){

    const output={

        ...result

    };



    /* --------------------------------------
       CATEGORY IMPROVEMENT
    -------------------------------------- */

    if(

        output.category==="Banner" &&

        output.style==="Modern" &&

        output.source.includes("pengajian")

    ){

        output.style="Islamic";

    }



    if(

        output.category==="Poster" &&

        output.source.includes("anak")

    ){

        output.audience="Children";

    }



    if(

        output.category==="Thumbnail"

    ){

        output.canvas="16:9";

    }



    if(

        output.category==="Social Media"

    ){

        output.canvas="4:5";

    }



    /* --------------------------------------
       CONFIDENCE BOOST
    -------------------------------------- */

    if(

        output.category!=="General Design"

    ){

        output.confidence+=5;

    }



    if(

        output.style!=="Modern"

    ){

        output.confidence+=5;

    }



    output.confidence=

    Math.min(

        output.confidence,

        100

    );



    return output;

}



/* ==========================================================
   PUBLIC DETECTOR
========================================================== */

function analyzePrompt(text){

    let result=

    detectPromptCategory(text);



    result=

    enhanceDetection(result);



    result.ai=

    detectAI(text);



    return result;

}

/* ==========================================================
   BACKWARD COMPATIBILITY
========================================================== */

window.detectPromptCategory=function(text){

    return analyzePrompt(text);

};



window.detectCategory=function(text){

    return analyzePrompt(text).category;

};



window.detectStyle=function(text){

    return analyzePrompt(text).style;

};



window.detectCanvas=function(text){

    return analyzePrompt(text).canvas;

};



window.detectColorPalette=function(text){

    return analyzePrompt(text).color;

};



window.detectAudience=function(text){

    return analyzePrompt(text).audience;

};



/* ==========================================================
   PUBLIC API
========================================================== */

window.PromptDetector={

    version:DetectorEngine.version,



    analyze:analyzePrompt,



    detect:detectPromptCategory,



    category:detectCategory,



    style:detectStyle,



    canvas:detectCanvas,



    color:detectColorPalette,



    audience:detectAudience

};



/* ==========================================================
   READY
========================================================== */

console.log(

    "%cPromptForge Smart Detector v5.0 Loaded",

    "color:#22c55e;font-size:14px;font-weight:bold;"

);



if(

    DetectorEngine.debug

){

    console.log(

        "Debug Mode Enabled"

    );

}



/* ==========================================================
   END OF FILE
========================================================== */
