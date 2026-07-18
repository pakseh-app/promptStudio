/* ==========================================================
   PROMPTFORGE AI
   quality.js
   Version : 4.1.0
========================================================== */


/* ==========================================================
   QUALITY CONFIG
========================================================== */

const QualityEngine={

    excellent:95,

    great:85,

    good:70,

    fair:50,

    poor:0

};



/* ==========================================================
   MAIN
========================================================== */

function calculatePromptQuality(prompt){

    if(!prompt){

        updateQualityUI(

            0,

            "Empty Prompt"

        );

        return;

    }

    let report =

    analyzePrompt(prompt);

    report =

    finalizeQualityReport(

        report,

        prompt

    );

    updateQualityUI(

        report.score,

        report.level

    );

    renderChecklist(

        report

    );

}



/* ==========================================================
   ANALYZE
========================================================== */

function analyzePrompt(prompt){

    const sections=[

        "PROJECT",

        "CATEGORY",

        "STYLE",

        "TARGET AI",

        "OBJECTIVE",

        "CANVAS SIZE",

        "COLOR PALETTE",

        "TARGET AUDIENCE",

        "VISUAL STYLE",

        "TYPOGRAPHY",

        "LAYOUT",

        "LIGHTING",

        "CAMERA",

        "NEGATIVE PROMPT",

        "OUTPUT FORMAT"

    ];

    let score=0;

    let checklist=[];

    sections.forEach(section=>{

        const found=

        prompt.includes(section);

        checklist.push({

            name:section,

            ok:found

        });

        if(found){

            score+=6;

        }

    });

    score=Math.min(

        score,

        100

    );

    return{

        score,

        checklist,

        level:

        getQualityLevel(score)

    };

}



/* ==========================================================
   QUALITY LEVEL
========================================================== */

function getQualityLevel(score){

    if(score>=QualityEngine.excellent){

        return "★★★★★ Excellent";

    }

    if(score>=QualityEngine.great){

        return "★★★★☆ Great";

    }

    if(score>=QualityEngine.good){

        return "★★★☆☆ Good";

    }

    if(score>=QualityEngine.fair){

        return "★★☆☆☆ Fair";

    }

    return "★☆☆☆☆ Poor";

}



/* ==========================================================
   PART 2 BELOW
========================================================== */

/* ==========================================================
   UPDATE QUALITY UI
========================================================== */

function updateQualityUI(score, level){

    animateQualityScore(score);

    const qualityText=document.getElementById("qualityText");

    if(qualityText){

        qualityText.textContent=

        `${score}/100`;

    }

    const qualityLevel=document.getElementById("qualityLevel");

    if(qualityLevel){

        qualityLevel.textContent=

        level;

    }

}



/* ==========================================================
   ANIMATE PROGRESS BAR
========================================================== */

function animateQualityScore(score){

    const bar=

    document.querySelector(".progress-bar");

    if(!bar) return;

    let current=0;

    bar.style.width="0%";

    const timer=setInterval(()=>{

        current++;

        bar.style.width=current+"%";

        if(current>=score){

            clearInterval(timer);

        }

    },8);

}



/* ==========================================================
   CHECKLIST
========================================================== */

function renderChecklist(report){

    const list=

    document.getElementById("qualityChecklist");

    if(!list) return;

    list.innerHTML="";

    report.checklist.forEach(item=>{

        const div=

        document.createElement("div");

        div.className="quality-item";

        div.innerHTML=`

            <span>

                ${item.ok ? "✅":"❌"}

            </span>

            <span>

                ${item.name}

            </span>

        `;

        list.appendChild(div);

    });

    renderRecommendation(report);

}



/* ==========================================================
   RECOMMENDATION
========================================================== */

function renderRecommendation(report){

    const box=

    document.getElementById("qualityRecommendation");

    if(!box) return;

    const missing=

    report.checklist

    .filter(item=>!item.ok)

    .map(item=>`• ${item.name}`);

    if(missing.length===0){

        box.innerHTML=

        `
        <strong>🎉 Excellent!</strong>

        <br><br>

        Prompt sudah memiliki struktur profesional.

        `;

        return;

    }

    box.innerHTML=

    `
    <strong>

    💡 Saran Perbaikan

    </strong>

    <br><br>

    ${missing.join("<br>")}

    `;

}



/* ==========================================================
   PART 3 BELOW
========================================================== */

/* ==========================================================
   PROMPT STATISTICS
========================================================== */

function getPromptStatistics(prompt){

    const text = prompt.trim();

    return{

        characters : text.length,

        words : text === ""

            ? 0

            : text.split(/\s+/).length,

        lines : text === ""

            ? 0

            : text.split("\n").length

    };

}



/* ==========================================================
   SCORE ADJUSTMENT
========================================================== */

function adjustQualityScore(report,prompt){

    const stats = getPromptStatistics(prompt);

    let score = report.score;



    /* Prompt terlalu pendek */

    if(stats.words < 80){

        score -= 15;

    }

    else if(stats.words < 150){

        score -= 8;

    }



    /* Prompt lengkap */

    if(stats.words > 250){

        score += 5;

    }



    if(stats.characters > 1800){

        score += 3;

    }



    score = Math.max(

        0,

        Math.min(score,100)

    );



    report.score = score;

    report.level = getQualityLevel(score);

    report.statistics = stats;



    return report;

}



/* ==========================================================
   STATISTICS UI
========================================================== */

function renderStatistics(report){

    const box =

    document.getElementById(

        "qualityStatistics"

    );



    if(!box) return;



    box.innerHTML = `

        <div class="quality-stat">

            <strong>${report.statistics.characters}</strong>

            <span>Characters</span>

        </div>

        <div class="quality-stat">

            <strong>${report.statistics.words}</strong>

            <span>Words</span>

        </div>

        <div class="quality-stat">

            <strong>${report.statistics.lines}</strong>

            <span>Lines</span>

        </div>

    `;

}



/* ==========================================================
   FINALIZE REPORT
========================================================== */

function finalizeQualityReport(report,prompt){

    report = adjustQualityScore(

        report,

        prompt

    );

    renderStatistics(

        report

    );

    return report;

}



/* ==========================================================
   HELPER
========================================================== */

function getQualityPercentage(score){

    return Math.max(

        0,

        Math.min(score,100)

    );

}



/* ==========================================================
   UPDATE MAIN FUNCTION
========================================================== */

/*
GANTI isi function calculatePromptQuality()
yang ada di PART 1
menjadi kode berikut.
*/

function calculatePromptQuality(prompt){

    if(!prompt){

        updateQualityUI(

            0,

            "Empty Prompt"

        );

        return;

    }

    let report =

    analyzePrompt(prompt);

    report =

    finalizeQualityReport(

        report,

        prompt

    );

    updateQualityUI(

        report.score,

        report.level

    );

    renderChecklist(

        report

    );

}



/* ==========================================================
   PART 4 BELOW
========================================================== */

/* ==========================================================
   PUBLIC API
========================================================== */

window.PromptQuality={

    calculate:calculatePromptQuality,

    analyze:analyzePrompt,

    statistics:getPromptStatistics,

    level:getQualityLevel,

    version:getQualityVersion

};



/* ==========================================================
   VERSION
========================================================== */

function getQualityVersion(){

    return{

        name:"PromptForge Quality Engine",

        version:"4.1.0",

        author:"Pakseh"

    };

}



/* ==========================================================
   AUTO REFRESH
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        const output=

        document.getElementById("result");

        if(!output) return;

        output.addEventListener(

            "input",

            ()=>{

                calculatePromptQuality(

                    output.value

                );

            }

        );

    }

);



/* ==========================================================
   SELF TEST
========================================================== */

function qualitySelfTest(){

    const sample=`

PROJECT

Poster Promosi Bakso

CATEGORY

Poster

STYLE

Modern

TARGET AI

ChatGPT

OBJECTIVE

Create professional poster

CANVAS SIZE

A4

COLOR PALETTE

Red Black

TARGET AUDIENCE

General

VISUAL STYLE

Premium

TYPOGRAPHY

Bold

LAYOUT

Modern

LIGHTING

Studio

CAMERA

Front View

NEGATIVE PROMPT

Blur

OUTPUT FORMAT

Ultra HD

`;

    console.group(

        "PromptForge Quality Test"

    );

    console.table(

        analyzePrompt(

            sample

        )

    );

    console.groupEnd();

}



/* ==========================================================
   READY
========================================================== */

console.log(

    "%cPromptForge Quality Engine v4.1 Loaded",

    "color:#3b82f6;font-size:13px;font-weight:bold;"

);



/* ==========================================================
   END OF FILE
========================================================== */
