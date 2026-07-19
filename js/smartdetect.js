/*!
============================================================
PromptStudio v5
Smart Detect Engine
============================================================
*/

"use strict";

function updateSmartDetect(detect = {}) {

    const category =
        document.getElementById("detect-category");

    const style =
        document.getElementById("detect-style");

    const color =
        document.getElementById("detect-color");

    const target =
        document.getElementById("detect-target");


    if(category){

        category.textContent =
            detect.category || "-";

    }


    if(style){

        style.textContent =
            detect.style || "-";

    }


    if(color){

        color.textContent =
            detect.color || "Auto";

    }


    if(target){

        target.textContent =
            detect.audience ||
            "General";

    }

}
