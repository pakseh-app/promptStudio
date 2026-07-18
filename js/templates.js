/* =====================================================
   PROMPTFORGE AI v4
   TEMPLATES.JS
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    initTemplates();

});



/* =====================================================
   INIT
===================================================== */

function initTemplates(){

    renderTemplates(Database.getAll());

    initTemplateSearch();

    initTemplateCategory();

}



/* =====================================================
   RENDER
===================================================== */

function renderTemplates(list){

    const grid=document.getElementById("templateGrid");

    if(!grid) return;

    if(list.length===0){

        grid.innerHTML=`

        <div class="template-empty">

            <h2>Tidak ada template ditemukan</h2>

        </div>

        `;

        return;

    }

    grid.innerHTML=list.map(item=>`

        <div class="template-card">

            <div class="template-category">

                ${item.category}

            </div>

            <h3>

                ${item.title}

            </h3>

            <p>

                ${item.description}

            </p>

            <div class="template-meta">

                <span>

                    🎨 ${item.style}

                </span>

                <span>

                    📐 ${item.size}

                </span>

            </div>

            <button

                class="template-use"

                onclick="useTemplate(${item.id})">

                🚀 Gunakan Template

            </button>

        </div>

    `).join("");

}



/* =====================================================
   SEARCH
===================================================== */

function initTemplateSearch(){

    const search=document.getElementById("templateSearch");

    if(!search) return;

    search.addEventListener("input",()=>{

        renderTemplates(

            Database.search(search.value)

        );

    });

}



/* =====================================================
   CATEGORY
===================================================== */

function initTemplateCategory(){

    const select=document.getElementById("templateCategory");

    if(!select) return;

    select.addEventListener("change",()=>{

        renderTemplates(

            Database.getByCategory(select.value)

        );

    });

}



/* =====================================================
   USE TEMPLATE
===================================================== */

function useTemplate(id){

    const item=Database.getById(id);

    if(!item) return;

    if(typeof loadTemplate==="function"){

        loadTemplate(item);

    }

    if(window.PromptForge){

        PromptForge.openComposer();

    }

}
