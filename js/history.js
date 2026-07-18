/* ==========================================================
   PROMPTFORGE AI
   history.js
   Version : 4.1.0
========================================================== */


/* ==========================================================
   CONFIG
========================================================== */

const HISTORY_KEY = "promptforge_history";

const MAX_HISTORY = 100;



/* ==========================================================
   SAVE HISTORY
========================================================== */

function saveHistory(prompt){

    if(!prompt) return;

    let history = getHistory();

    history.unshift({

        id:Date.now(),

        date:new Date().toLocaleString(),

        prompt:prompt

    });

    if(history.length>MAX_HISTORY){

        history = history.slice(0,MAX_HISTORY);

    }

    localStorage.setItem(

        HISTORY_KEY,

        JSON.stringify(history)

    );

    renderHistory();

}



/* ==========================================================
   GET HISTORY
========================================================== */

function getHistory(){

    const data=

    localStorage.getItem(

        HISTORY_KEY

    );

    return data

        ? JSON.parse(data)

        : [];

}



/* ==========================================================
   DELETE HISTORY
========================================================== */

function deleteHistory(id){

    let history=

    getHistory();

    history=

    history.filter(

        item=>item.id!==id

    );

    localStorage.setItem(

        HISTORY_KEY,

        JSON.stringify(history)

    );

    renderHistory();

}



/* ==========================================================
   CLEAR HISTORY
========================================================== */

function clearHistory(){

    if(

        !confirm(

            "Hapus semua riwayat?"

        )

    ){

        return;

    }

    localStorage.removeItem(

        HISTORY_KEY

    );

    renderHistory();

}



/* ==========================================================
   COPY HISTORY
========================================================== */

function copyHistory(id){

    if(

        window.PromptClipboard

    ){

        PromptClipboard.copyHistory(id);

        return;

    }

    const item=

    getHistory().find(

        x=>x.id===id

    );

    if(!item) return;

    navigator.clipboard.writeText(

        item.prompt

    );

}



/* ==========================================================
   LOAD HISTORY
========================================================== */

function loadHistory(id){

    const item=

    getHistory().find(

        x=>x.id===id

    );

    if(!item) return;

    const result=

    document.getElementById(

        "result"

    );

    if(result){

        result.value=

        item.prompt;

    }

}



/* ==========================================================
   RENDER
========================================================== */

function renderHistory(){

    const container=

    document.getElementById(

        "historyList"

    );

    if(!container) return;

    const history=

    getHistory();

    if(history.length===0){

        container.innerHTML=

        "<p>Belum ada riwayat.</p>";

        return;

    }

    container.innerHTML=

    history.map(item=>`

        <div class="history-card">

            <div class="history-date">

                ${item.date}

            </div>

            <div class="history-preview">

                ${item.prompt.substring(0,120)}...

            </div>

            <div class="history-buttons">

                <button onclick="loadHistory(${item.id})">

                    📂

                </button>

                <button onclick="copyHistory(${item.id})">

                    📋

                </button>

                <button onclick="deleteHistory(${item.id})">

                    🗑

                </button>

            </div>

        </div>

    `).join("");

}



/* ==========================================================
   SEARCH
========================================================== */

function searchHistory(keyword){

    keyword=

    keyword.toLowerCase();

    const history=

    getHistory();

    return history.filter(item=>

        item.prompt

        .toLowerCase()

        .includes(keyword)

    );

}



/* ==========================================================
   EXPORT
========================================================== */

window.PromptHistory={

    save:saveHistory,

    get:getHistory,

    delete:deleteHistory,

    clear:clearHistory,

    search:searchHistory,

    render:renderHistory

};



/* ==========================================================
   READY
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    renderHistory

);

console.log(

    "%cPromptForge History v4.1 Loaded",

    "color:#10b981;font-weight:bold;"

);



/* ==========================================================
   END OF FILE
========================================================== */
