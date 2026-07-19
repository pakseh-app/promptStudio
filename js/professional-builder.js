/*!
 * ============================================================
 * PromptForge AI v5
 * Professional Prompt Builder
 * Version : 1.0.0
 * ============================================================
 */

"use strict";

class ProfessionalPromptBuilder {

    constructor(data = {}, decision = {}) {

        this.data = data;
        this.decision = decision;
        this.output = [];

    }

    line(text = "") {

        this.output.push(text);

    }

    section(title, content) {

        if (!content) return;

        this.line("==================================================");
        this.line("");
        this.line(title.toUpperCase());
        this.line("");
        this.line(content);
        this.line("");

    }

    header() {

        this.line("# PROFESSIONAL AI DESIGN PROMPT");
        this.line("");

    }

    footer() {

        this.line("==================================================");
        this.line("");
        this.line("END OF PROMPT");

    }

    build() {

        this.header();

        this.section(
            "PROJECT",
            this.data.idea || this.data.project || "Creative AI Project"
        );

        this.section(
            "CATEGORY",
            this.decision.category || this.data.category || "General Design"
        );

        this.section(
            "STYLE",
            this.decision.style || this.data.style || "Modern"
        );

        this.footer();

        return this.output.join("\n");

    }

}

window.ProfessionalPromptBuilder = ProfessionalPromptBuilder;

console.log(
    "%cProfessional Prompt Builder Loaded",
    "color:#22c55e;font-weight:bold"
);
