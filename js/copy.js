/* ==========================================================
   PROMPTFORGE AI
   copy.js
   Version : 4.1.0
========================================================== */


/* ==========================================================
   COPY ENGINE
========================================================== */

function copyText(text){

    if(!text){

        showCopyMessage(

            "Tidak ada teks untuk disalin.",

            false

        );

        return false;

    }

    navigator.clipboard.writeText(text)

    .then(()=>{

        showCopyMessage(

            "Prompt berhasil disalin."

        );

    })

    .catch(()=>{

        fallbackCopy(text);

    });

    return true;

}



/* ==========================================================
   COPY FROM ELEMENT
========================================================== */

function copyFromElement(id){

    const element=

    document.getElementById(id);

    if(!element){

        showCopyMessage(

            "Elemen tidak ditemukan.",

            false

        );

        return false;

    }

    return copyText(

        element.value ||

        element.textContent ||

        ""

    );

}



/* ==========================================================
   FALLBACK COPY
========================================================== */

function fallbackCopy(text){

    const textarea=

    document.createElement("textarea");

    textarea.value=text;

    document.body.appendChild(textarea);

    textarea.select();

    try{

        document.execCommand("copy");

        showCopyMessage(

            "Prompt berhasil disalin."

        );

    }

    catch(e){

        showCopyMessage(

            "Browser tidak mendukung copy.",

            false

        );

    }

    document.body.removeChild(textarea);

}



/* ==========================================================
   COPY RESULT
========================================================== */

function copyResult(){

    copyFromElement(

        "output"

    );

}



/* ==========================================================
   COPY HISTORY
========================================================== */

function copyHistoryPrompt(id){

    if(

        typeof getHistory!=="function"

    ){

        return;

    }

    const item=

    getHistory()

    .find(

        x=>x.id===id

    );

    if(!item) return;

    copyText(

        item.prompt

    );

}



/* ==========================================================
   MESSAGE
========================================================== */

function showCopyMessage(

    message,

    success=true

){

    console.log(

        message

    );

    if(

        typeof window.Toast==="function"

    ){

        window.Toast(

            message,

            success

        );

        return;

    }

    alert(message);

}



/* ==========================================================
   BUTTON AUTO BIND
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        const btn=

        document.getElementById(

            "copy"

        );

        if(btn){

            btn.addEventListener(

                "click",

                copyResult

            );

        }

    }

);



/* ==========================================================
   PUBLIC API
========================================================== */

window.PromptClipboard={

    copy:copyText,

    copyResult,

    copyElement:copyFromElement,

    copyHistory:copyHistoryPrompt

};



/* ==========================================================
   READY
========================================================== */

console.log(

    "%cPromptForge Clipboard Engine v4.1 Loaded",

    "color:#8b5cf6;font-weight:bold;"

);



/* ==========================================================
   END OF FILE
========================================================== */
