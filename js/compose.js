/*!
 * ============================================================
 * PromptForge AI v5
 * Smart Prompt Composer Engine
 * ------------------------------------------------------------
 * File      : composer.js
 * Version   : 5.0.0
 * Part      : 1
 * ============================================================
 */

"use strict";

/* ============================================================
 * GLOBAL CONFIG
 * ============================================================
 */

const COMPOSER_VERSION = "5.0.0";

const DEFAULT_COMPOSER_CONFIG = {

    aiTarget: "chatgpt",

    language: "auto",

    quality: "high",

    creativity: 70,

    temperature: 0.7,

    maxLength: 4000,

    optimize: true,

    removeDuplicate: true,

    cleanWhitespace: true,

    includeRole: true,

    includeContext: true,

    includeInstruction: true,

    includeStyle: true,

    includeNegative: true,

    includeOutput: true,

    debug: false

};

/* ============================================================
 * DEFAULT STATE
 * ============================================================
 */

const DEFAULT_STATE = {

    project: "",

    category: "",

    objective: "",

    role: "",

    context: "",

    instruction: "",

    style: "",

    negative: "",

    output: "",

    language: "",

    quality: "",

    aiTarget: "",

    variables: {},

    metadata: {}

};

/* ============================================================
 * UTILITIES
 * ============================================================
 */

class ComposerUtils {

    static clone(obj){

        return JSON.parse(JSON.stringify(obj));

    }

    static merge(a={}, b={}){

        return {

            ...a,

            ...b

        };

    }

    static clean(text){

        if(text===undefined || text===null){

            return "";

        }

        return String(text)

            .replace(/\r/g,"")

            .replace(/\n{3,}/g,"\n\n")

            .replace(/[ \t]{2,}/g," ")

            .trim();

    }

    static isEmpty(value){

        return (

            value===undefined ||

            value===null ||

            value===""

        );

    }

    static capitalize(text=""){

        if(!text.length){

            return "";

        }

        return text.charAt(0).toUpperCase()+text.slice(1);

    }

    static unique(list=[]){

        return [...new Set(list)];

    }

}

/* ============================================================
 * STATE MANAGER
 * ============================================================
 */

class ComposerState{

    constructor(){

        this.reset();

    }

    reset(){

        this.data = ComposerUtils.clone(

            DEFAULT_STATE

        );

    }

    update(obj={}){

        this.data={

            ...this.data,

            ...obj

        };

    }

    set(key,value){

        this.data[key]=value;

    }

    get(key){

        return this.data[key];

    }

    export(){

        return ComposerUtils.clone(

            this.data

        );

    }

}

/* ============================================================
 * MAIN CLASS
 * ============================================================
 */

class PromptComposer{

    constructor(config={}){

        this.version = COMPOSER_VERSION;

        this.config = ComposerUtils.merge(

            DEFAULT_COMPOSER_CONFIG,

            config

        );

        this.state = new ComposerState();

    }

    configure(config={}){

        this.config = ComposerUtils.merge(

            this.config,

            config

        );

        return this;

    }

    reset(){

        this.state.reset();

        return this;

    }

    setData(data={}){

        this.state.update(data);

        return this;

    }

    getData(){

        return this.state.export();

    }

    compose(){

        throw new Error(

            "compose() belum tersedia. Lanjut Part 2."

        );

    }

}

/* ============================================================
 * PART 2
 * VARIABLE RESOLVER
 * ============================================================
 */

class VariableResolver{

    constructor(data={}){

        this.data = data;

    }


    resolve(text=""){

        if(!text){

            return "";

        }


        return String(text).replace(

            /\{\{(.*?)\}\}/g,

            (match,key)=>{


                key = key.trim();


                if(

                    this.data[key]===undefined

                ){

                    return match;

                }


                return this.data[key];


            }

        );


    }


}


/* ============================================================
 * PROMPT SECTION
 * ============================================================
 */

class PromptSection{


    constructor(name,value){

        this.name = name;

        this.value = value;

    }


    render(){

        if(

            ComposerUtils.isEmpty(this.value)

        ){

            return "";

        }


        return ComposerUtils.clean(

            this.value

        );


    }


}


/* ============================================================
 * PROMPT BUILDER
 * ============================================================
 */

class PromptBuilder{


    constructor(config={}){

        this.config = config;

        this.sections=[];

    }


    add(name,value){


        const section = new PromptSection(

            name,

            value

        );


        const result = section.render();


        if(result){

            this.sections.push(

                result

            );

        }


        return this;


    }


    build(){


        return this.sections

            .join("\n\n")

            .trim();


    }


    count(){

        return this.sections.length;

    }


    clear(){

        this.sections=[];

        return this;

    }


}


/* ============================================================
 * COMPOSE ENGINE
 * ============================================================
 */

PromptComposer.prototype.compose = function(){


    const data = this.state.export();


    const builder = new PromptBuilder(

        this.config

    );


    const resolver = new VariableResolver(

        data.variables

    );



    if(

        this.config.includeRole

    ){

        builder.add(

            "ROLE",

            resolver.resolve(

                data.role

            )

        );

    }



    if(

        this.config.includeContext

    ){

        builder.add(

            "CONTEXT",

            resolver.resolve(

                data.context

            )

        );

    }



    if(

        this.config.includeInstruction

    ){

        builder.add(

            "INSTRUCTION",

            resolver.resolve(

                data.instruction

            )

        );

    }



    if(

        this.config.includeStyle

    ){

        builder.add(

            "STYLE",

            resolver.resolve(

                data.style

            )

        );

    }



    if(

        this.config.includeNegative

    ){

        builder.add(

            "NEGATIVE",

            resolver.resolve(

                data.negative

            )

        );

    }



    if(

        this.config.includeOutput

    ){

        builder.add(

            "OUTPUT",

            resolver.resolve(

                data.output

            )

        );

    }



    let result = builder.build();



    if(

        this.config.cleanWhitespace

    ){

        result = ComposerUtils.clean(

            result

        );

    }



    return result;


};



/* ============================================================
 * QUICK SETTER API
 * ============================================================
 */


PromptComposer.prototype.setRole=function(text){


    this.state.set(

        "role",

        text

    );


    return this;


};



PromptComposer.prototype.setContext=function(text){


    this.state.set(

        "context",

        text

    );


    return this;


};



PromptComposer.prototype.setInstruction=function(text){


    this.state.set(

        "instruction",

        text

    );


    return this;


};



PromptComposer.prototype.setStyle=function(text){


    this.state.set(

        "style",

        text

    );


    return this;


};



PromptComposer.prototype.setNegative=function(text){


    this.state.set(

        "negative",

        text

    );


    return this;


};



PromptComposer.prototype.setOutput=function(text){


    this.state.set(

        "output",

        text

    );


    return this;


};

/* ============================================================
 * PART 3
 * PROMPT BLUEPRINT ENGINE
 * ============================================================
 */


/* ============================================================
 * CATEGORY ENGINE
 * ============================================================
 */

class CategoryEngine{


    constructor(){

        this.categories = [

            "General Design",

            "Poster",

            "Banner",

            "Logo",

            "Packaging",

            "Sticker",

            "Social Media",

            "Product Design",

            "Photography",

            "Illustration",

            "Character Design",

            "UI Design",

            "Architecture",

            "Video",

            "Animation"

        ];

    }



    exists(category=""){


        return this.categories.includes(

            category

        );


    }



    add(category){


        if(

            !this.exists(category)

        ){

            this.categories.push(

                category

            );

        }


        return this;


    }



    getAll(){


        return [

            ...this.categories

        ];


    }


}



/* ============================================================
 * OBJECTIVE BUILDER
 * ============================================================
 */

class ObjectiveBuilder{


    constructor(){

        this.objectives=[];

    }



    add(text){


        if(text){

            this.objectives.push(

                text

            );

        }


        return this;


    }



    build(){


        return this.objectives

            .join(". ")

            .trim();


    }



    clear(){


        this.objectives=[];


        return this;


    }


}



/* ============================================================
 * CONSTRAINT ENGINE
 * ============================================================
 */

class ConstraintEngine{


    constructor(){

        this.constraints=[];

    }



    add(rule){


        if(rule){

            this.constraints.push(

                rule

            );

        }


        return this;


    }



    remove(rule){


        this.constraints = this.constraints.filter(

            item=>item!==rule

        );


        return this;


    }



    build(){


        if(

            !this.constraints.length

        ){

            return "";

        }



        return this.constraints

            .map(

                item=>"- "+item

            )

            .join("\n");


    }



}



/* ============================================================
 * METADATA PROCESSOR
 * ============================================================
 */

class MetadataProcessor{


    constructor(data={}){

        this.data=data;

    }



    set(key,value){


        this.data[key]=value;


        return this;


    }



    get(key){


        return this.data[key];


    }



    all(){


        return ComposerUtils.clone(

            this.data

        );


    }



    merge(obj={}){


        this.data={

            ...this.data,

            ...obj

        };


        return this;


    }


}



/* ============================================================
 * PROJECT BLUEPRINT
 * ============================================================
 */

class ProjectBlueprint{


    constructor(){


        this.data={

            project:"",

            category:"",

            objective:"",

            constraints:[],

            metadata:{}

        };


    }



    setProject(name){


        this.data.project=name;


        return this;


    }



    setCategory(category){


        this.data.category=category;


        return this;


    }



    setObjective(objective){


        this.data.objective=objective;


        return this;


    }



    addConstraint(rule){


        this.data.constraints.push(

            rule

        );


        return this;


    }



    export(){


        return ComposerUtils.clone(

            this.data

        );


    }


}



/* ============================================================
 * ATTACH BLUEPRINT TO COMPOSER
 * ============================================================
 */


PromptComposer.prototype.setProject=function(name){


    this.state.set(

        "project",

        name

    );


    return this;


};



PromptComposer.prototype.setCategory=function(category){


    this.state.set(

        "category",

        category

    );


    return this;


};



PromptComposer.prototype.setObjective=function(objective){


    this.state.set(

        "objective",

        objective

    );


    return this;


};



PromptComposer.prototype.addConstraint=function(rule){


    let current = this.state.get(

        "constraints"

    ) || [];



    current.push(

        rule

    );



    this.state.set(

        "constraints",

        current

    );



    return this;


};

/* ============================================================
 * PART 4
 * VISUAL COMPOSITION ENGINE
 * ============================================================
 */


/* ============================================================
 * STYLE ENGINE
 * ============================================================
 */

class StyleEngine{


    constructor(){


        this.styles = [];


    }



    add(style){


        if(style){


            this.styles.push(style);


        }


        return this;


    }



    remove(style){


        this.styles = this.styles.filter(

            item => item !== style

        );


        return this;


    }



    build(){


        return ComposerUtils.unique(

            this.styles

        )

        .join(", ");


    }



    clear(){


        this.styles=[];


        return this;


    }


}



/* ============================================================
 * VISUAL DIRECTION BUILDER
 * ============================================================
 */

class VisualDirectionBuilder{


    constructor(){


        this.elements={

            subject:"",

            environment:"",

            composition:"",

            mood:"",

            details:""

        };


    }



    setSubject(value){


        this.elements.subject=value;


        return this;


    }



    setEnvironment(value){


        this.elements.environment=value;


        return this;


    }



    setComposition(value){


        this.elements.composition=value;


        return this;


    }



    setMood(value){


        this.elements.mood=value;


        return this;


    }



    setDetails(value){


        this.elements.details=value;


        return this;


    }



    build(){


        return Object.values(

            this.elements

        )

        .filter(Boolean)

        .join(", ");


    }


}



/* ============================================================
 * CAMERA ENGINE
 * ============================================================
 */

class CameraEngine{


    constructor(){


        this.camera={

            shot:"",

            angle:"",

            lens:"",

            movement:"",

            perspective:""

        };


    }



    setShot(value){


        this.camera.shot=value;


        return this;


    }



    setAngle(value){


        this.camera.angle=value;


        return this;


    }



    setLens(value){


        this.camera.lens=value;


        return this;


    }



    setMovement(value){


        this.camera.movement=value;


        return this;


    }



    setPerspective(value){


        this.camera.perspective=value;


        return this;


    }



    build(){


        return Object.values(

            this.camera

        )

        .filter(Boolean)

        .join(", ");


    }


}



/* ============================================================
 * LIGHTING ENGINE
 * ============================================================
 */

class LightingEngine{


    constructor(){


        this.lighting=[];


    }



    add(value){


        if(value){


            this.lighting.push(value);


        }


        return this;


    }



    build(){


        return ComposerUtils.unique(

            this.lighting

        )

        .join(", ");


    }


}



/* ============================================================
 * COLOR PALETTE ENGINE
 * ============================================================
 */

class ColorPaletteEngine{


    constructor(){


        this.colors=[];


    }



    add(color){


        if(color){


            this.colors.push(color);


        }


        return this;


    }



    remove(color){


        this.colors=this.colors.filter(

            item=>item!==color

        );


        return this;


    }



    build(){


        return ComposerUtils.unique(

            this.colors

        )

        .join(", ");


    }



    clear(){


        this.colors=[];


        return this;


    }


}



/* ============================================================
 * CONNECT VISUAL ENGINE TO COMPOSER
 * ============================================================
 */


PromptComposer.prototype.setVisualStyle=function(value){


    this.state.set(

        "style",

        value

    );


    return this;


};



PromptComposer.prototype.setCamera=function(value){


    this.state.set(

        "camera",

        value

    );


    return this;


};



PromptComposer.prototype.setLighting=function(value){


    this.state.set(

        "lighting",

        value

    );


    return this;


};



PromptComposer.prototype.setColors=function(value){


    this.state.set(

        "colors",

        value

    );


    return this;


};

/* ============================================================
 * PART 5
 * DESIGN STRUCTURE ENGINE
 * ============================================================
 */


/* ============================================================
 * TYPOGRAPHY ENGINE
 * ============================================================
 */

class TypographyEngine{


    constructor(){


        this.typography={

            fontFamily:"",

            fontStyle:"",

            fontWeight:"",

            textEffect:"",

            hierarchy:""


        };


    }



    setFont(value){


        this.typography.fontFamily=value;


        return this;


    }



    setStyle(value){


        this.typography.fontStyle=value;


        return this;


    }



    setWeight(value){


        this.typography.fontWeight=value;


        return this;


    }



    setEffect(value){


        this.typography.textEffect=value;


        return this;


    }



    setHierarchy(value){


        this.typography.hierarchy=value;


        return this;


    }



    build(){


        return Object.values(

            this.typography

        )

        .filter(Boolean)

        .join(", ");


    }


}



/* ============================================================
 * COMPOSITION ENGINE
 * ============================================================
 */

class CompositionEngine{


    constructor(){


        this.composition={

            layout:"",

            balance:"",

            spacing:"",

            alignment:"",

            focus:""


        };


    }



    setLayout(value){


        this.composition.layout=value;


        return this;


    }



    setBalance(value){


        this.composition.balance=value;


        return this;


    }



    setSpacing(value){


        this.composition.spacing=value;


        return this;


    }



    setAlignment(value){


        this.composition.alignment=value;


        return this;


    }



    setFocus(value){


        this.composition.focus=value;


        return this;


    }



    build(){


        return Object.values(

            this.composition

        )

        .filter(Boolean)

        .join(", ");


    }


}



/* ============================================================
 * LAYOUT BUILDER
 * ============================================================
 */

class LayoutBuilder{


    constructor(){


        this.items=[];


    }



    add(element,position=""){


        this.items.push({

            element,

            position

        });


        return this;


    }



    remove(element){


        this.items=this.items.filter(

            item=>item.element!==element

        );


        return this;


    }



    build(){


        return this.items

        .map(

            item=>{

                if(item.position){

                    return `${item.element} at ${item.position}`;

                }


                return item.element;


            }

        )

        .join(", ");


    }



}



/* ============================================================
 * DESIGN RULE ENGINE
 * ============================================================
 */

class DesignRuleEngine{


    constructor(){


        this.rules=[];


    }



    add(rule){


        if(rule){


            this.rules.push(rule);


        }


        return this;


    }



    addMultiple(list=[]){


        this.rules.push(

            ...list

        );


        return this;


    }



    clear(){


        this.rules=[];


        return this;


    }



    build(){


        if(!this.rules.length){

            return "";

        }



        return this.rules

        .map(

            rule=>"- "+rule

        )

        .join("\n");


    }



}



/* ============================================================
 * CONNECT DESIGN ENGINE TO COMPOSER
 * ============================================================
 */


PromptComposer.prototype.setTypography=function(value){


    this.state.set(

        "typography",

        value

    );


    return this;


};



PromptComposer.prototype.setComposition=function(value){


    this.state.set(

        "composition",

        value

    );


    return this;


};



PromptComposer.prototype.setLayout=function(value){


    this.state.set(

        "layout",

        value

    );


    return this;


};



PromptComposer.prototype.setDesignRules=function(value){


    this.state.set(

        "designRules",

        value

    );


    return this;


};

/* ============================================================
 * PART 6
 * ADVANCED PROMPT LAYER ENGINE
 * ============================================================
 */


/* ============================================================
 * PROMPT LAYER
 * ============================================================
 */

class PromptLayer{


    constructor(name,content="",priority=0){


        this.name=name;

        this.content=content;

        this.priority=priority;


    }



    setContent(value){


        this.content=value;


        return this;


    }



    setPriority(value){


        this.priority=value;


        return this;


    }



    build(){


        return {

            name:this.name,

            content:this.content,

            priority:this.priority


        };


    }


}



/* ============================================================
 * LAYER MANAGER
 * ============================================================
 */

class LayerManager{


    constructor(){


        this.layers=[];


    }



    add(layer){


        if(layer instanceof PromptLayer){


            this.layers.push(layer);


        }


        return this;


    }



    remove(name){


        this.layers=this.layers.filter(

            layer=>layer.name!==name

        );


        return this;


    }



    sort(){


        this.layers.sort(

            (a,b)=>b.priority-a.priority

        );


        return this;


    }



    build(){


        this.sort();


        return this.layers

        .map(

            layer=>layer.content

        )

        .filter(Boolean)

        .join("\n\n");


    }



    clear(){


        this.layers=[];


        return this;


    }


}



/* ============================================================
 * INSTRUCTION LAYER
 * ============================================================
 */

class InstructionLayer extends PromptLayer{


    constructor(content=""){


        super(

            "instruction",

            content,

            100

        );


    }


}



/* ============================================================
 * CONTEXT LAYER
 * ============================================================
 */

class ContextLayer extends PromptLayer{


    constructor(content=""){


        super(

            "context",

            content,

            90

        );


    }


}



/* ============================================================
 * DETAIL LAYER
 * ============================================================
 */

class DetailLayer extends PromptLayer{


    constructor(content=""){


        super(

            "detail",

            content,

            80

        );


    }


}



/* ============================================================
 * ENHANCEMENT LAYER
 * ============================================================
 */

class EnhancementLayer extends PromptLayer{


    constructor(content=""){


        super(

            "enhancement",

            content,

            70

        );


    }


}



/* ============================================================
 * QUALITY BOOST LAYER
 * ============================================================
 */

class QualityLayer extends PromptLayer{


    constructor(content=""){


        super(

            "quality",

            content,

            60

        );


    }


}



/* ============================================================
 * CONNECT LAYER SYSTEM
 * ============================================================
 */


PromptComposer.prototype.layers = function(){


    if(!this._layerManager){


        this._layerManager = new LayerManager();


    }


    return this._layerManager;


};



PromptComposer.prototype.addLayer=function(

    name,

    content,

    priority=50

){


    const layer = new PromptLayer(

        name,

        content,

        priority

    );


    this.layers().add(

        layer

    );


    return this;


};



PromptComposer.prototype.buildLayers=function(){


    return this.layers()

    .build();


};



/* ============================================================
 * ADVANCED SECTION SETTER
 * ============================================================
 */


PromptComposer.prototype.addInstruction=function(text){


    this.layers()

    .add(

        new InstructionLayer(text)

    );


    return this;


};



PromptComposer.prototype.addContext=function(text){


    this.layers()

    .add(

        new ContextLayer(text)

    );


    return this;


};



PromptComposer.prototype.addDetail=function(text){


    this.layers()

    .add(

        new DetailLayer(text)

    );


    return this;


};



PromptComposer.prototype.addEnhancement=function(text){


    this.layers()

    .add(

        new EnhancementLayer(text)

    );


    return this;


};



PromptComposer.prototype.addQuality=function(text){


    this.layers()

    .add(

        new QualityLayer(text)

    );


    return this;


};

/* ============================================================
 * PART 7
 * PROMPT INTELLIGENCE ENGINE
 * ============================================================
 */


/* ============================================================
 * KEYWORD EXTRACTOR
 * ============================================================
 */

class KeywordExtractor{


    constructor(){

        this.stopWords=[

            "dan",
            "atau",
            "yang",
            "untuk",
            "dengan",
            "dari",
            "ke",
            "di",
            "ini",
            "itu"

        ];

    }



    extract(text=""){


        if(!text){

            return [];

        }



        let words = text

            .toLowerCase()

            .replace(

                /[^a-zA-Z0-9\s]/g,

                ""

            )

            .split(/\s+/);



        words = words.filter(

            word =>

            word &&

            !this.stopWords.includes(word)

        );



        return ComposerUtils.unique(

            words

        );


    }


}



/* ============================================================
 * INTENT DETECTOR
 * ============================================================
 */

class IntentDetector{


    constructor(){


        this.patterns={


            design:[

                "poster",
                "banner",
                "logo",
                "sticker",
                "packaging",
                "design"

            ],


            image:[

                "gambar",
                "foto",
                "illustration",
                "image",
                "render"

            ],


            video:[

                "video",
                "animation",
                "motion",
                "cinematic"

            ],


            writing:[

                "artikel",
                "cerita",
                "script",
                "caption"

            ]

        };


    }



    detect(text=""){


        const input=text.toLowerCase();



        let result=[];



        Object.keys(this.patterns)

        .forEach(category=>{


            this.patterns[category]

            .forEach(keyword=>{


                if(

                    input.includes(keyword)

                ){

                    result.push(category);

                }


            });


        });



        return ComposerUtils.unique(

            result

        );


    }


}



/* ============================================================
 * PROMPT ANALYZER
 * ============================================================
 */

class PromptAnalyzer{


    constructor(){


        this.keywordExtractor =

            new KeywordExtractor();



        this.intentDetector =

            new IntentDetector();


    }



    analyze(text=""){


        return {


            length:text.length,


            keywords:

                this.keywordExtractor.extract(text),



            intent:

                this.intentDetector.detect(text),



            quality:

                this.score(text)


        };


    }



    score(text=""){


        let score=0;



        if(text.length>50){

            score+=20;

        }



        if(text.includes("style")){

            score+=20;

        }



        if(text.includes("quality")){

            score+=20;

        }



        if(text.includes("detail")){

            score+=20;

        }



        if(text.includes("format")){

            score+=20;

        }



        return score;


    }


}



/* ============================================================
 * MISSING INFORMATION DETECTOR
 * ============================================================
 */

class MissingInformationDetector{


    constructor(){


        this.required=[

            "project",

            "objective",

            "style",

            "output"

        ];


    }



    check(data={}){


        let missing=[];



        this.required.forEach(

            field=>{


                if(

                    ComposerUtils.isEmpty(

                        data[field]

                    )

                ){

                    missing.push(field);

                }


            }

        );



        return missing;


    }


}



/* ============================================================
 * PROMPT SUGGESTION ENGINE
 * ============================================================
 */

class PromptSuggestionEngine{


    suggest(missing=[]){


        let suggestions=[];



        missing.forEach(field=>{


            switch(field){


                case "project":

                    suggestions.push(

                        "Tambahkan nama proyek"

                    );

                break;



                case "objective":

                    suggestions.push(

                        "Jelaskan tujuan utama"

                    );

                break;



                case "style":

                    suggestions.push(

                        "Tambahkan style visual"

                    );

                break;



                case "output":

                    suggestions.push(

                        "Tentukan format output"

                    );

                break;



            }


        });



        return suggestions;


    }


}



/* ============================================================
 * CONNECT INTELLIGENCE ENGINE
 * ============================================================
 */


PromptComposer.prototype.analyze=function(){


    const prompt=this.compose();



    const analyzer=new PromptAnalyzer();



    return analyzer.analyze(

        prompt

    );


};



PromptComposer.prototype.checkMissing=function(){


    const detector =

        new MissingInformationDetector();



    return detector.check(

        this.state.export()

    );


};



PromptComposer.prototype.getSuggestions=function(){


    const missing =

        this.checkMissing();



    const engine =

        new PromptSuggestionEngine();



    return engine.suggest(

        missing

    );


};

/* ============================================================
 * PART 8
 * PROMPT OPTIMIZATION ENGINE
 * ============================================================
 */


/* ============================================================
 * DUPLICATE CLEANER
 * ============================================================
 */

class DuplicateCleaner{


    clean(text=""){


        if(!text){

            return "";

        }



        let words=text.split(/\s+/);



        let result=[];



        words.forEach(word=>{


            if(

                !result.includes(word)

            ){

                result.push(word);

            }


        });



        return result.join(" ");


    }


}



/* ============================================================
 * WORD OPTIMIZER
 * ============================================================
 */

class WordOptimizer{


    constructor(){


        this.dictionary={


            "bagus":

            "high quality",


            "keren":

            "premium professional",


            "indah":

            "visually stunning",


            "detail":

            "highly detailed",


            "realistis":

            "photorealistic",


            "modern":

            "modern contemporary"


        };


    }



    optimize(text=""){


        if(!text){

            return "";

        }



        let result=text;



        Object.keys(

            this.dictionary

        )

        .forEach(word=>{


            let replacement =

                this.dictionary[word];



            result=result.replace(

                new RegExp(

                    word,

                    "gi"

                ),

                replacement

            );


        });



        return result;


    }


}



/* ============================================================
 * SENTENCE ENHANCER
 * ============================================================
 */

class SentenceEnhancer{


    enhance(text=""){


        if(!text){

            return "";

        }



        let enhancements=[

            "professional quality",

            "high attention to detail",

            "visually appealing",

            "optimized composition",

            "premium result"

        ];



        let addition =

            enhancements.join(", ");



        return `${text}, ${addition}`;


    }


}



/* ============================================================
 * PROMPT COMPRESSOR
 * ============================================================
 */

class PromptCompressor{


    compress(text=""){


        if(!text){

            return "";

        }



        return text

        .replace(

            /\s+/g,

            " "

        )

        .trim();


    }



}



/* ============================================================
 * OPTIMIZATION PIPELINE
 * ============================================================
 */

class PromptOptimizer{


    constructor(){


        this.cleaner =

            new DuplicateCleaner();



        this.wordOptimizer =

            new WordOptimizer();



        this.enhancer =

            new SentenceEnhancer();



        this.compressor =

            new PromptCompressor();


    }



    optimize(text="",config={}){


        let result=text;



        if(

            config.removeDuplicate!==false

        ){

            result=this.cleaner.clean(

                result

            );

        }



        result=this.wordOptimizer.optimize(

            result

        );



        if(

            config.enhance

        ){

            result=this.enhancer.enhance(

                result

            );

        }



        result=this.compressor.compress(

            result

        );



        return result;


    }


}



/* ============================================================
 * CONNECT OPTIMIZER TO COMPOSER
 * ============================================================
 */


PromptComposer.prototype.optimize=function(options={}){


    const optimizer =

        new PromptOptimizer();



    return optimizer.optimize(

        this.compose(),

        {

            ...this.config,

            ...options

        }

    );


};



PromptComposer.prototype.generateOptimized=function(){


    return this.optimize({

        enhance:true

    });


};

/* ============================================================
 * PART 9
 * AI TARGET FORMATTER ENGINE
 * ============================================================
 */


/* ============================================================
 * BASE AI FORMATTER
 * ============================================================
 */

class AIFormatter{


    constructor(target="generic"){


        this.target = target;


    }



    format(prompt=""){


        return prompt;


    }


}



/* ============================================================
 * CHATGPT FORMATTER
 * ============================================================
 */

class ChatGPTFormatter extends AIFormatter{


    constructor(){

        super("chatgpt");

    }



    format(prompt=""){


        return [

            "Create the following:",

            "",

            prompt,

            "",

            "Provide a professional and detailed result."

        ]

        .join("\n");


    }


}



/* ============================================================
 * MIDJOURNEY FORMATTER
 * ============================================================
 */

class MidjourneyFormatter extends AIFormatter{


    constructor(){

        super("midjourney");

    }



    format(prompt=""){


        return `${prompt}

--v 7
--style raw
--quality 2
--detail high`;


    }


}



/* ============================================================
 * LEONARDO FORMATTER
 * ============================================================
 */

class LeonardoFormatter extends AIFormatter{


    constructor(){

        super("leonardo");

    }



    format(prompt=""){


        return [

            prompt,

            "",

            "Ultra detailed",

            "high quality rendering",

            "professional lighting",

            "cinematic composition"

        ]

        .join(", ");


    }


}



/* ============================================================
 * STABLE DIFFUSION FORMATTER
 * ============================================================
 */

class StableDiffusionFormatter extends AIFormatter{


    constructor(){

        super("stable-diffusion");

    }



    format(prompt=""){


        return {

            positive:prompt,

            negative:

            "low quality, blurry, bad anatomy, distorted, watermark"


        };


    }


}



/* ============================================================
 * FLUX FORMATTER
 * ============================================================
 */

class FluxFormatter extends AIFormatter{


    constructor(){

        super("flux");

    }



    format(prompt=""){


        return [

            prompt,

            "photorealistic",

            "high resolution",

            "natural details",

            "professional photography"

        ]

        .join(", ");


    }


}



/* ============================================================
 * DALLE FORMATTER
 * ============================================================
 */

class DalleFormatter extends AIFormatter{


    constructor(){

        super("dalle");

    }



    format(prompt=""){


        return [

            "Generate an image:",

            prompt,

            "Ensure accurate details and composition."

        ]

        .join("\n");


    }


}



/* ============================================================
 * VIDEO AI FORMATTER
 * ============================================================
 */

class VideoAIFormatter extends AIFormatter{


    constructor(){

        super("video");

    }



    format(prompt=""){


        return [

            prompt,

            "",

            "cinematic camera movement",

            "smooth motion",

            "realistic animation",

            "professional film quality"

        ]

        .join(", ");


    }


}



/* ============================================================
 * FORMATTER FACTORY
 * ============================================================
 */

class FormatterFactory{


    static create(target="generic"){



        switch(

            target.toLowerCase()

        ){


            case "chatgpt":

                return new ChatGPTFormatter();



            case "midjourney":

                return new MidjourneyFormatter();



            case "leonardo":

                return new LeonardoFormatter();



            case "stable-diffusion":

                return new StableDiffusionFormatter();



            case "flux":

                return new FluxFormatter();



            case "dalle":

            case "dall-e":

                return new DalleFormatter();



            case "veo":

            case "runway":

            case "kling":

                return new VideoAIFormatter();



            default:

                return new AIFormatter();


        }


    }


}



/* ============================================================
 * CONNECT FORMATTER TO COMPOSER
 * ============================================================
 */


PromptComposer.prototype.formatFor=function(target=""){


    const formatter =

        FormatterFactory.create(

            target || this.config.aiTarget

        );



    return formatter.format(

        this.compose()

    );


};



PromptComposer.prototype.setAITarget=function(target){


    this.config.aiTarget=target;


    this.state.set(

        "aiTarget",

        target

    );


    return this;


};

/* ============================================================
 * PART 10
 * PROMPT VALIDATION ENGINE
 * ============================================================
 */


/* ============================================================
 * VALIDATION RULE
 * ============================================================
 */

class ValidationRule{


    constructor(name,check,message){


        this.name=name;

        this.check=check;

        this.message=message;


    }



    run(value){


        return this.check(value);


    }


}



/* ============================================================
 * PROMPT VALIDATOR
 * ============================================================
 */

class PromptValidator{


    constructor(){


        this.rules=[

            new ValidationRule(

                "empty",

                text=>text.length>0,

                "Prompt masih kosong"

            ),



            new ValidationRule(

                "length",

                text=>text.length>=50,

                "Prompt terlalu pendek"

            ),



            new ValidationRule(

                "style",

                text=>

                /style|visual|design|cinematic/i

                .test(text),

                "Style belum ditentukan"

            ),



            new ValidationRule(

                "detail",

                text=>

                text.split(" ").length>10,

                "Detail prompt kurang"

            )

        ];


    }



    validate(prompt=""){


        let result={

            valid:true,

            errors:[]

        };



        this.rules.forEach(rule=>{


            if(

                !rule.run(prompt)

            ){

                result.valid=false;


                result.errors.push(

                    rule.message

                );

            }


        });



        return result;


    }


}



/* ============================================================
 * ERROR DETECTOR
 * ============================================================
 */

class PromptErrorDetector{


    detect(prompt=""){


        let errors=[];



        if(!prompt){

            errors.push(

                "Prompt kosong"

            );

        }



        if(

            prompt.length < 30

        ){

            errors.push(

                "Prompt terlalu singkat"

            );

        }



        if(

            !/[a-zA-Z]/.test(prompt)

        ){

            errors.push(

                "Tidak ditemukan deskripsi"

            );

        }



        return errors;


    }


}



/* ============================================================
 * ADVANCED QUALITY SCORER
 * ============================================================
 */

class QualityScoreEngine{


    calculate(prompt=""){


        let score=0;



        const words =

            prompt.split(/\s+/);



        if(words.length>15){

            score+=20;

        }



        if(

            /style/i.test(prompt)

        ){

            score+=15;

        }



        if(

            /detail|detailed/i.test(prompt)

        ){

            score+=15;

        }



        if(

            /lighting|camera|composition/i.test(prompt)

        ){

            score+=20;

        }



        if(

            /quality|professional|premium/i.test(prompt)

        ){

            score+=20;

        }



        if(

            score>100

        ){

            score=100;

        }



        return score;


    }


}



/* ============================================================
 * PROMPT HEALTH CHECK
 * ============================================================
 */

class PromptHealthCheck{


    constructor(){


        this.validator =

            new PromptValidator();



        this.errorDetector =

            new PromptErrorDetector();



        this.scorer =

            new QualityScoreEngine();


    }



    check(prompt=""){


        return {


            validation:

                this.validator.validate(

                    prompt

                ),



            errors:

                this.errorDetector.detect(

                    prompt

                ),



            score:

                this.scorer.calculate(

                    prompt

                )


        };


    }


}



/* ============================================================
 * AUTO FIX SUGGESTION
 * ============================================================
 */

class AutoFixSuggestion{


    generate(report={}){


        let suggestions=[];



        if(

            report.score < 50

        ){

            suggestions.push(

                "Tambahkan detail visual dan tujuan"

            );

        }



        if(

            report.errors.length

        ){

            suggestions.push(

                "Lengkapi informasi prompt"

            );

        }



        if(

            report.validation.errors.length

        ){

            suggestions.push(

                ...report.validation.errors

            );

        }



        return ComposerUtils.unique(

            suggestions

        );


    }


}



/* ============================================================
 * CONNECT VALIDATION TO COMPOSER
 * ============================================================
 */


PromptComposer.prototype.health=function(){


    const checker =

        new PromptHealthCheck();



    return checker.check(

        this.compose()

    );


};



PromptComposer.prototype.fixSuggestion=function(){


    const report=this.health();



    const fixer=

        new AutoFixSuggestion();



    return fixer.generate(

        report

    );


};

/* ============================================================
 * PART 11
 * PROMPT MEMORY & PRESET SYSTEM
 * ============================================================
 */


/* ============================================================
 * MEMORY STORAGE
 * ============================================================
 */

class PromptMemory{


    constructor(){


        this.storage=[];


    }



    save(name,data={}){


        this.storage.push({

            id:Date.now(),

            name:name,

            data:ComposerUtils.clone(data),

            created:new Date().toISOString()

        });


        return this;


    }



    get(name){


        return this.storage.find(

            item=>item.name===name

        );


    }



    getAll(){


        return ComposerUtils.clone(

            this.storage

        );


    }



    remove(name){


        this.storage = this.storage.filter(

            item=>item.name!==name

        );


        return this;


    }



    clear(){


        this.storage=[];


        return this;


    }


}



/* ============================================================
 * PRESET MANAGER
 * ============================================================
 */

class PresetManager{


    constructor(){


        this.presets={};


    }



    create(name,config={}){


        this.presets[name]={

            name:name,

            config:

                ComposerUtils.clone(config)

        };


        return this;


    }



    load(name){


        return this.presets[name] || null;


    }



    remove(name){


        delete this.presets[name];


        return this;


    }



    list(){


        return Object.keys(

            this.presets

        );


    }


}



/* ============================================================
 * SAVED CONFIGURATION
 * ============================================================
 */

class ConfigurationStorage{


    constructor(){


        this.configs=[];


    }



    save(name,config){


        this.configs.push({

            name:name,

            config:

                ComposerUtils.clone(config)

        });


        return this;


    }



    find(name){


        return this.configs.find(

            item=>item.name===name

        );


    }



    all(){


        return ComposerUtils.clone(

            this.configs

        );


    }


}



/* ============================================================
 * REUSABLE COMPONENT
 * ============================================================
 */

class PromptComponent{


    constructor(name,value){


        this.name=name;

        this.value=value;


    }



    render(){


        return this.value;


    }


}



/* ============================================================
 * COMPONENT LIBRARY
 * ============================================================
 */

class ComponentLibrary{


    constructor(){


        this.components=[];


    }



    add(component){


        if(

            component instanceof PromptComponent

        ){

            this.components.push(

                component

            );

        }


        return this;


    }



    get(name){


        return this.components.find(

            item=>item.name===name

        );


    }



    all(){


        return this.components;


    }


}



/* ============================================================
 * TEMPLATE CONNECTION FOUNDATION
 * ============================================================
 */

class TemplateConnector{


    constructor(){


        this.templates={};


    }



    register(name,data){


        this.templates[name]=data;


        return this;


    }



    use(name){


        return this.templates[name] || null;


    }



    list(){


        return Object.keys(

            this.templates

        );


    }


}



/* ============================================================
 * CONNECT MEMORY SYSTEM
 * ============================================================
 */


PromptComposer.prototype.memory=function(){


    if(!this._memory){


        this._memory=new PromptMemory();


    }


    return this._memory;


};



PromptComposer.prototype.savePrompt=function(name){


    this.memory()

    .save(

        name,

        this.state.export()

    );


    return this;


};



PromptComposer.prototype.loadPrompt=function(name){


    const saved =

        this.memory()

        .get(name);



    if(saved){


        this.state.update(

            saved.data

        );


    }



    return this;


};

/* ============================================================
 * PART 12
 * PROMPT TEMPLATE ENGINE
 * ============================================================
 */


/* ============================================================
 * PLACEHOLDER ENGINE
 * ============================================================
 */

class PlaceholderEngine{


    constructor(){


        this.pattern=/\{\{(.*?)\}\}/g;


    }



    extract(text=""){


        let matches = text.match(

            this.pattern

        );


        if(!matches){

            return [];

        }



        return matches.map(

            item=>

            item

            .replace("{{","")

            .replace("}}","")

            .trim()

        );


    }



    replace(text="",values={}){


        if(!text){

            return "";

        }



        return text.replace(

            this.pattern,

            (match,key)=>{


                key=key.trim();



                return values[key] ?? match;


            }

        );


    }



}



/* ============================================================
 * TEMPLATE OBJECT
 * ============================================================
 */

class PromptTemplate{


    constructor(name,content){


        this.name=name;

        this.content=content;

        this.created=

            new Date().toISOString();


    }



    render(values={}){


        const engine=

            new PlaceholderEngine();



        return engine.replace(

            this.content,

            values

        );


    }



    placeholders(){


        const engine=

            new PlaceholderEngine();



        return engine.extract(

            this.content

        );


    }


}



/* ============================================================
 * TEMPLATE ENGINE
 * ============================================================
 */

class TemplateEngine{


    constructor(){


        this.templates={};


    }



    add(name,content){


        this.templates[name]=

            new PromptTemplate(

                name,

                content

            );



        return this;


    }



    get(name){


        return this.templates[name] || null;


    }



    remove(name){


        delete this.templates[name];


        return this;


    }



    render(name,data={}){


        const template=

            this.get(name);



        if(!template){


            return "";


        }



        return template.render(

            data

        );


    }



    list(){


        return Object.keys(

            this.templates

        );


    }


}



/* ============================================================
 * TEMPLATE VALIDATOR
 * ============================================================
 */

class TemplateValidator{


    validate(template){


        let result={


            valid:true,


            missing:[]


        };



        if(!template){


            result.valid=false;


            return result;


        }



        const placeholders=

            template.placeholders();



        if(

            placeholders.length===0

        ){


            result.missing.push(

                "Template tidak memiliki variable"

            );


        }



        return result;


    }


}



/* ============================================================
 * DYNAMIC VARIABLE BUILDER
 * ============================================================
 */

class VariableBuilder{


    constructor(){


        this.variables={};


    }



    set(key,value){


        this.variables[key]=value;


        return this;


    }



    merge(data={}){


        this.variables={

            ...this.variables,

            ...data

        };


        return this;


    }



    build(){


        return ComposerUtils.clone(

            this.variables

        );


    }


}



/* ============================================================
 * CONNECT TEMPLATE SYSTEM
 * ============================================================
 */


PromptComposer.prototype.templates=function(){


    if(!this._templates){


        this._templates=

            new TemplateEngine();


    }



    return this._templates;


};



PromptComposer.prototype.addTemplate=function(

    name,

    content

){


    this.templates()

    .add(

        name,

        content

    );



    return this;


};



PromptComposer.prototype.useTemplate=function(

    name,

    variables={}

){


    return this.templates()

    .render(

        name,

        variables

    );


};

/* ============================================================
 * PART 13
 * MULTI LANGUAGE ENGINE
 * ============================================================
 */


/* ============================================================
 * LANGUAGE DETECTOR
 * ============================================================
 */

class LanguageDetector{


    constructor(){


        this.languages={


            id:[

                "dan",

                "dengan",

                "untuk",

                "buat",

                "gambar",

                "desain"

            ],



            en:[

                "the",

                "with",

                "for",

                "create",

                "design",

                "image"

            ],



            jp:[

                "です",

                "画像",

                "作成"

            ]

        };


    }



    detect(text=""){


        if(!text){

            return "unknown";

        }



        let scores={};



        Object.keys(

            this.languages

        )

        .forEach(lang=>{


            scores[lang]=0;



            this.languages[lang]

            .forEach(word=>{


                if(

                    text.toLowerCase()

                    .includes(word)

                ){

                    scores[lang]++;

                }


            });


        });



        let result =

            Object.keys(scores)

            .sort(

                (a,b)=>

                scores[b]-scores[a]

            )[0];



        return result || "unknown";


    }


}



/* ============================================================
 * LANGUAGE TRANSLATOR FOUNDATION
 * ============================================================
 */

class LanguageTranslator{


    constructor(){


        this.dictionary={


            id:{


                "gambar":

                "image",


                "desain":

                "design",


                "indah":

                "beautiful",


                "modern":

                "modern"


            }



        };


    }



    translate(text="",from="id",to="en"){


        if(

            from===to

        ){

            return text;

        }



        let result=text;



        if(

            this.dictionary[from]

        ){


            Object.keys(

                this.dictionary[from]

            )

            .forEach(word=>{


                result=result.replace(

                    new RegExp(

                        word,

                        "gi"

                    ),

                    this.dictionary[from][word]

                );


            });


        }



        return result;


    }


}



/* ============================================================
 * LOCALIZATION ENGINE
 * ============================================================
 */

class LocalizationEngine{


    constructor(){


        this.translator=

            new LanguageTranslator();



        this.detector=

            new LanguageDetector();


    }



    process(text="",target="en"){


        const source=

            this.detector.detect(

                text

            );



        return {


            source,

            target,


            result:

            this.translator.translate(

                text,

                source,

                target

            )


        };


    }


}



/* ============================================================
 * AI LANGUAGE ADAPTER
 * ============================================================
 */

class AILanguageAdapter{


    constructor(target="chatgpt"){


        this.target=target;


    }



    format(text,language="en"){


        switch(

            this.target

        ){


            case "midjourney":


                return text;



            case "leonardo":


                return `${text}, language optimized prompt`;



            case "chatgpt":


                return [

                    "Respond in",

                    language,

                    "",

                    text

                ]

                .join(" ");



            default:


                return text;


        }


    }


}



/* ============================================================
 * LANGUAGE PROFILE
 * ============================================================
 */

class LanguageProfile{


    constructor(){


        this.language="auto";


        this.output="";


    }



    setLanguage(lang){


        this.language=lang;


        return this;


    }



    setOutput(lang){


        this.output=lang;


        return this;


    }



    get(){


        return {


            input:this.language,


            output:this.output


        };


    }


}



/* ============================================================
 * CONNECT LANGUAGE SYSTEM
 * ============================================================
 */


PromptComposer.prototype.detectLanguage=function(){


    const detector=

        new LanguageDetector();



    return detector.detect(

        this.compose()

    );


};



PromptComposer.prototype.translate=function(target="en"){


    const engine=

        new LocalizationEngine();



    return engine.process(

        this.compose(),

        target

    );


};



PromptComposer.prototype.setLanguage=function(lang){


    this.config.language=lang;


    this.state.set(

        "language",

        lang

    );


    return this;


};

/* ============================================================
 * PART 14
 * PROMPT EXPORT SYSTEM
 * ============================================================
 */


/* ============================================================
 * EXPORT BASE
 * ============================================================
 */

class PromptExporter{


    constructor(prompt=""){


        this.prompt=prompt;


    }



    set(prompt){


        this.prompt=prompt;


        return this;


    }



    get(){


        return this.prompt;


    }


}



/* ============================================================
 * MARKDOWN EXPORTER
 * ============================================================
 */

class MarkdownExporter extends PromptExporter{


    export(){


        return [

            "# PromptForge AI Prompt",

            "",

            this.prompt,

            "",

            "---",

            "Generated by PromptForge AI v5"

        ]

        .join("\n");


    }


}



/* ============================================================
 * TEXT EXPORTER
 * ============================================================
 */

class TextExporter extends PromptExporter{


    export(){


        return this.prompt;


    }


}



/* ============================================================
 * JSON EXPORTER
 * ============================================================
 */

class JSONExporter extends PromptExporter{


    constructor(prompt,data={}){


        super(prompt);


        this.data=data;


    }



    export(){


        return {


            version:COMPOSER_VERSION,


            prompt:this.prompt,


            data:this.data,


            timestamp:

                new Date().toISOString()


        };


    }


}



/* ============================================================
 * API OUTPUT FORMATTER
 * ============================================================
 */

class APIOutputFormatter{


    create(data={}){


        return {


            success:true,


            version:COMPOSER_VERSION,


            result:data,


            generatedAt:

                new Date().toISOString()


        };


    }


}



/* ============================================================
 * COPY READY FORMAT
 * ============================================================
 */

class CopyReadyFormatter{


    format(prompt=""){


        return prompt

            .replace(/\n{3,}/g,"\n\n")

            .trim();


    }


}



/* ============================================================
 * EXPORT MANAGER
 * ============================================================
 */

class ExportManager{


    constructor(){


        this.formats={};


    }



    register(name,exporter){


        this.formats[name]=exporter;


        return this;


    }



    export(name){


        if(

            !this.formats[name]

        ){

            return null;

        }



        return this.formats[name]

        .export();


    }



}



/* ============================================================
 * CONNECT EXPORT SYSTEM
 * ============================================================
 */


PromptComposer.prototype.exportPrompt=function(){


    return this.compose();


};



PromptComposer.prototype.exportMarkdown=function(){


    const exporter=

        new MarkdownExporter(

            this.compose()

        );



    return exporter.export();


};



PromptComposer.prototype.exportText=function(){


    const exporter=

        new TextExporter(

            this.compose()

        );



    return exporter.export();


};



PromptComposer.prototype.exportJSON=function(){


    const exporter=

        new JSONExporter(

            this.compose(),

            this.state.export()

        );



    return exporter.export();


};



PromptComposer.prototype.exportAPI=function(){


    const formatter=

        new APIOutputFormatter();



    return formatter.create({

        prompt:this.compose(),


        state:this.state.export()


    });


};



PromptComposer.prototype.copyReady=function(){


    const formatter=

        new CopyReadyFormatter();



    return formatter.format(

        this.compose()

    );


};

/* ============================================================
 * PART 15
 * PROMPT HISTORY & VERSION CONTROL SYSTEM
 * ============================================================
 */


/* ============================================================
 * SNAPSHOT OBJECT
 * ============================================================
 */

class PromptSnapshot{


    constructor(name,data={}){


        this.id = Date.now();


        this.name = name;


        this.data = ComposerUtils.clone(

            data

        );


        this.time =

            new Date().toISOString();


    }



    restore(){


        return ComposerUtils.clone(

            this.data

        );


    }


}



/* ============================================================
 * HISTORY MANAGER
 * ============================================================
 */

class HistoryManager{


    constructor(){


        this.history=[];


        this.position=-1;


    }



    push(snapshot){


        // hapus redo history

        this.history = this.history.slice(

            0,

            this.position+1

        );



        this.history.push(

            snapshot

        );



        this.position =

            this.history.length-1;



        return this;


    }



    undo(){


        if(

            this.position<=0

        ){

            return null;

        }



        this.position--;



        return this.history[

            this.position

        ];

    }



    redo(){


        if(

            this.position >=

            this.history.length-1

        ){

            return null;

        }



        this.position++;



        return this.history[

            this.position

        ];

    }



    current(){


        return this.history[

            this.position

        ] || null;


    }



    all(){


        return ComposerUtils.clone(

            this.history

        );


    }



    clear(){


        this.history=[];


        this.position=-1;


        return this;


    }


}



/* ============================================================
 * VERSION MANAGER
 * ============================================================
 */

class VersionManager{


    constructor(){


        this.versions=[];


        this.version=1;


    }



    create(data={}){


        const version={


            version:

                this.version++,


            data:

                ComposerUtils.clone(data),



            created:

                new Date().toISOString()


        };



        this.versions.push(

            version

        );



        return version;


    }



    latest(){


        return this.versions[

            this.versions.length-1

        ] || null;


    }



    list(){


        return this.versions;


    }


}



/* ============================================================
 * TIMELINE ENGINE
 * ============================================================
 */

class PromptTimeline{


    constructor(){


        this.events=[];


    }



    add(action,data={}){


        this.events.push({


            action,


            data,


            time:

            new Date().toISOString()


        });



        return this;


    }



    get(){


        return this.events;


    }



    clear(){


        this.events=[];


        return this;


    }


}



/* ============================================================
 * CONNECT HISTORY SYSTEM
 * ============================================================
 */


PromptComposer.prototype.history=function(){


    if(!this._history){


        this._history =

            new HistoryManager();


    }



    return this._history;


};



PromptComposer.prototype.saveSnapshot=function(

    name="Snapshot"

){


    const snapshot =

        new PromptSnapshot(

            name,

            this.state.export()

        );



    this.history()

    .push(

        snapshot

    );



    return this;


};



PromptComposer.prototype.undo=function(){


    const snapshot =

        this.history()

        .undo();



    if(snapshot){


        this.state.update(

            snapshot.restore()

        );


    }



    return this;


};



PromptComposer.prototype.redo=function(){


    const snapshot =

        this.history()

        .redo();



    if(snapshot){


        this.state.update(

            snapshot.restore()

        );


    }



    return this;


};



PromptComposer.prototype.getHistory=function(){


    return this.history()

    .all();


};

/* ============================================================
 * PART 16
 * PLUGIN ARCHITECTURE SYSTEM
 * ============================================================
 */


/* ============================================================
 * PLUGIN BASE
 * ============================================================
 */

class ComposerPlugin{


    constructor(name,version="1.0.0"){


        this.name=name;


        this.version=version;


        this.enabled=true;


    }



    install(composer){


        return composer;


    }



    uninstall(composer){


        return composer;


    }



    enable(){


        this.enabled=true;


        return this;


    }



    disable(){


        this.enabled=false;


        return this;


    }


}



/* ============================================================
 * PLUGIN MANAGER
 * ============================================================
 */

class PluginManager{


    constructor(){


        this.plugins=[];


    }



    register(plugin){


        if(

            plugin instanceof ComposerPlugin

        ){

            this.plugins.push(

                plugin

            );

        }



        return this;


    }



    installAll(composer){


        this.plugins.forEach(

            plugin=>{


                if(

                    plugin.enabled

                ){

                    plugin.install(

                        composer

                    );

                }


            }

        );



        return composer;


    }



    remove(name){


        this.plugins=

        this.plugins.filter(

            plugin=>

            plugin.name!==name

        );



        return this;


    }



    list(){


        return this.plugins.map(

            plugin=>({


                name:plugin.name,


                version:plugin.version,


                enabled:plugin.enabled


            })

        );


    }


}



/* ============================================================
 * MODULE REGISTRY
 * ============================================================
 */

class ModuleRegistry{


    constructor(){


        this.modules={};


    }



    register(name,module){


        this.modules[name]=module;


        return this;


    }



    get(name){


        return this.modules[name] || null;


    }



    remove(name){


        delete this.modules[name];


        return this;


    }



    list(){


        return Object.keys(

            this.modules

        );


    }


}



/* ============================================================
 * EXTENSION MANAGER
 * ============================================================
 */

class ExtensionManager{


    constructor(){


        this.extensions={};


    }



    add(name,extension){


        this.extensions[name]=extension;


        return this;


    }



    run(name,...args){


        if(

            !this.extensions[name]

        ){

            return null;

        }



        return this.extensions[name](

            ...args

        );


    }



    list(){


        return Object.keys(

            this.extensions

        );


    }


}



/* ============================================================
 * CUSTOM ENGINE REGISTER
 * ============================================================
 */

class CustomEngineManager{


    constructor(){


        this.engines={};


    }



    register(name,engine){


        this.engines[name]=engine;


        return this;


    }



    execute(name,...args){


        if(

            !this.engines[name]

        ){

            return null;

        }



        return this.engines[name](

            ...args

        );


    }



    list(){


        return Object.keys(

            this.engines

        );


    }


}



/* ============================================================
 * CONNECT PLUGIN SYSTEM
 * ============================================================
 */


PromptComposer.prototype.plugins=function(){


    if(!this._plugins){


        this._plugins=

            new PluginManager();


    }



    return this._plugins;


};



PromptComposer.prototype.registerPlugin=function(plugin){


    this.plugins()

    .register(

        plugin

    );



    return this;


};



PromptComposer.prototype.installPlugins=function(){


    this.plugins()

    .installAll(

        this

    );



    return this;


};



PromptComposer.prototype.modules=function(){


    if(!this._modules){


        this._modules=

            new ModuleRegistry();


    }



    return this._modules;


};



PromptComposer.prototype.extensions=function(){


    if(!this._extensions){


        this._extensions=

            new ExtensionManager();


    }



    return this._extensions;


};



PromptComposer.prototype.engines=function(){


    if(!this._engines){


        this._engines=

            new CustomEngineManager();


    }



    return this._engines;


};

/* ============================================================
 * PART 17
 * PROMPT PIPELINE SYSTEM
 * ============================================================
 */


/* ============================================================
 * PIPELINE STEP
 * ============================================================
 */

class PipelineStep{


    constructor(name,handler,priority=0){


        this.name=name;


        this.handler=handler;


        this.priority=priority;


        this.enabled=true;


    }



    execute(data){


        if(

            !this.enabled

        ){

            return data;

        }



        if(

            typeof this.handler==="function"

        ){

            return this.handler(

                data

            );

        }



        return data;


    }


}



/* ============================================================
 * PIPELINE MANAGER
 * ============================================================
 */

class PipelineManager{


    constructor(){


        this.steps=[];


    }



    add(step){


        if(

            step instanceof PipelineStep

        ){

            this.steps.push(

                step

            );

        }



        return this;


    }



    sort(){


        this.steps.sort(

            (a,b)=>

            b.priority-a.priority

        );



        return this;


    }



    run(data){


        this.sort();



        let result=data;



        this.steps.forEach(

            step=>{


                result=

                step.execute(

                    result

                );


            }

        );



        return result;


    }



    clear(){


        this.steps=[];


        return this;


    }


}



/* ============================================================
 * MIDDLEWARE ENGINE
 * ============================================================
 */

class MiddlewareEngine{


    constructor(){


        this.middlewares=[];


    }



    use(handler){


        this.middlewares.push(

            handler

        );


        return this;


    }



    execute(data){


        let result=data;



        this.middlewares.forEach(

            middleware=>{


                if(

                    typeof middleware==="function"

                ){

                    result=

                    middleware(

                        result

                    );

                }


            }

        );



        return result;


    }


}



/* ============================================================
 * HOOK SYSTEM
 * ============================================================
 */

class HookManager{


    constructor(){


        this.hooks={};


    }



    add(event,callback){


        if(

            !this.hooks[event]

        ){

            this.hooks[event]=[];

        }



        this.hooks[event].push(

            callback

        );



        return this;


    }



    run(event,data){


        let result=data;



        if(

            this.hooks[event]

        ){


            this.hooks[event]

            .forEach(

                callback=>{


                    result=

                    callback(

                        result

                    );


                }

            );


        }



        return result;


    }


}



/* ============================================================
 * PROMPT FLOW CONTROLLER
 * ============================================================
 */

class PromptFlowController{


    constructor(){


        this.pipeline=

            new PipelineManager();



        this.middleware=

            new MiddlewareEngine();



        this.hooks=

            new HookManager();


    }



    process(prompt=""){


        let result=prompt;



        result=

        this.hooks.run(

            "before",

            result

        );



        result=

        this.middleware.execute(

            result

        );



        result=

        this.pipeline.run(

            result

        );



        result=

        this.hooks.run(

            "after",

            result

        );



        return result;


    }


}



/* ============================================================
 * DEFAULT PIPELINE STEPS
 * ============================================================
 */

class DefaultPromptPipeline{


    static create(){


        const pipeline=

            new PipelineManager();



        pipeline.add(

            new PipelineStep(

                "trim",

                text=>

                text.trim(),

                100

            )

        );



        pipeline.add(

            new PipelineStep(

                "compress",

                text=>

                text.replace(

                    /\s+/g,

                    " "

                ),

                80

            )

        );



        return pipeline;


    }


}



/* ============================================================
 * CONNECT PIPELINE SYSTEM
 * ============================================================
 */


PromptComposer.prototype.flow=function(){


    if(!this._flow){


        this._flow=

            new PromptFlowController();


    }



    return this._flow;


};



PromptComposer.prototype.process=function(){


    return this.flow()

    .process(

        this.compose()

    );


};



PromptComposer.prototype.beforeProcess=function(callback){


    this.flow()

    .hooks

    .add(

        "before",

        callback

    );



    return this;


};



PromptComposer.prototype.afterProcess=function(callback){


    this.flow()

    .hooks

    .add(

        "after",

        callback

    );



    return this;


};

/* ============================================================
 * PART 18
 * AI PROMPT KNOWLEDGE BASE SYSTEM
 * ============================================================
 */


/* ============================================================
 * KNOWLEDGE ITEM
 * ============================================================
 */

class KnowledgeItem{


    constructor(category,name,data={}){


        this.category=category;


        this.name=name;


        this.data=

            ComposerUtils.clone(data);


        this.created=

            new Date().toISOString();


    }



    get(){


        return {


            category:this.category,


            name:this.name,


            data:this.data


        };


    }


}



/* ============================================================
 * KNOWLEDGE BASE
 * ============================================================
 */

class KnowledgeBase{


    constructor(){


        this.items=[];


    }



    add(item){


        if(

            item instanceof KnowledgeItem

        ){

            this.items.push(

                item

            );

        }



        return this;


    }



    find(category){


        return this.items.filter(

            item=>

            item.category===category

        );


    }



    search(keyword=""){


        return this.items.filter(

            item=>


            item.name

            .toLowerCase()

            .includes(

                keyword.toLowerCase()

            )

        );


    }



    all(){


        return this.items;


    }


}



/* ============================================================
 * PROMPT PATTERN LIBRARY
 * ============================================================
 */

class PromptPatternLibrary{


    constructor(){


        this.patterns={};


    }



    add(name,pattern){


        this.patterns[name]=pattern;


        return this;


    }



    get(name){


        return this.patterns[name] || "";


    }



    list(){


        return Object.keys(

            this.patterns

        );


    }


}



/* ============================================================
 * INDUSTRY PRESET SYSTEM
 * ============================================================
 */

class IndustryPresetManager{


    constructor(){


        this.presets={};


    }



    add(industry,data){


        this.presets[industry]=data;


        return this;


    }



    get(industry){


        return this.presets[industry] || null;


    }



    list(){


        return Object.keys(

            this.presets

        );


    }


}



/* ============================================================
 * EXPERT RULE ENGINE
 * ============================================================
 */

class ExpertRule{


    constructor(name,condition,action){


        this.name=name;


        this.condition=condition;


        this.action=action;


    }



    apply(data){


        if(

            this.condition(data)

        ){

            return this.action(data);

        }



        return data;


    }


}



/* ============================================================
 * EXPERT RULE MANAGER
 * ============================================================
 */

class ExpertRuleManager{


    constructor(){


        this.rules=[];


    }



    add(rule){


        if(

            rule instanceof ExpertRule

        ){

            this.rules.push(

                rule

            );

        }



        return this;


    }



    execute(data){


        let result=data;



        this.rules.forEach(

            rule=>{


                result=

                rule.apply(

                    result

                );


            }

        );



        return result;


    }


}



/* ============================================================
 * SMART RECOMMENDER
 * ============================================================
 */

class SmartRecommendationEngine{


    constructor(knowledge){


        this.knowledge=knowledge;


    }



    recommend(category){


        return this.knowledge

        .find(

            category

        )

        .map(

            item=>item.get()

        );


    }


}



/* ============================================================
 * CONNECT KNOWLEDGE SYSTEM
 * ============================================================
 */


PromptComposer.prototype.knowledge=function(){


    if(!this._knowledge){


        this._knowledge=

            new KnowledgeBase();


    }



    return this._knowledge;


};



PromptComposer.prototype.addKnowledge=function(

    category,

    name,

    data={}

){


    this.knowledge()

    .add(

        new KnowledgeItem(

            category,

            name,

            data

        )

    );



    return this;


};



PromptComposer.prototype.recommend=function(category){


    const engine=

        new SmartRecommendationEngine(

            this.knowledge()

        );



    return engine.recommend(

        category

    );


};



PromptComposer.prototype.rules=function(){


    if(!this._rules){


        this._rules=

            new ExpertRuleManager();


    }



    return this._rules;


};



PromptComposer.prototype.addRule=function(rule){


    this.rules()

    .add(

        rule

    );



    return this;


};

/* ============================================================
 * PART 19
 * AUTO COMPOSER INTELLIGENCE SYSTEM
 * ============================================================
 */


/* ============================================================
 * SMART FIELD COMPLETER
 * ============================================================
 */

class SmartFieldCompleter{


    constructor(){


        this.defaults={


            style:

            "professional high quality",



            quality:

            "high resolution detailed",



            lighting:

            "cinematic lighting",



            composition:

            "balanced composition"


        };


    }



    complete(data={}){


        let result={

            ...data

        };



        Object.keys(

            this.defaults

        )

        .forEach(key=>{


            if(

                !result[key]

            ){

                result[key]=

                    this.defaults[key];

            }


        });



        return result;


    }


}



/* ============================================================
 * AUTO SECTION BUILDER
 * ============================================================
 */

class AutoSectionBuilder{


    build(data={}){


        let sections=[];



        if(data.role){


            sections.push(

                `Role: ${data.role}`

            );


        }



        if(data.objective){


            sections.push(

                `Objective: ${data.objective}`

            );


        }



        if(data.subject){


            sections.push(

                `Subject: ${data.subject}`

            );


        }



        if(data.style){


            sections.push(

                `Style: ${data.style}`

            );


        }



        if(data.quality){


            sections.push(

                `Quality: ${data.quality}`

            );


        }



        return sections.join(

            "\n\n"

        );


    }


}



/* ============================================================
 * BLUEPRINT GENERATOR
 * ============================================================
 */

class BlueprintGenerator{


    constructor(){


        this.completer=

            new SmartFieldCompleter();



        this.builder=

            new AutoSectionBuilder();


    }



    generate(input={}){


        const completed=

            this.completer.complete(

                input

            );



        return {


            data:completed,

            prompt:

            this.builder.build(

                completed

            )


        };


    }


}



/* ============================================================
 * PROMPT STRUCTURE INTELLIGENCE
 * ============================================================
 */

class PromptStructureEngine{


    constructor(){


        this.order=[


            "role",

            "context",

            "objective",

            "subject",

            "style",

            "camera",

            "lighting",

            "quality",

            "output"


        ];


    }



    arrange(data={}){


        let result=[];



        this.order.forEach(

            key=>{


                if(

                    data[key]

                ){

                    result.push({

                        key,

                        value:data[key]

                    });

                }


            }

        );



        return result;


    }


}



/* ============================================================
 * AUTO PROMPT COMPOSER
 * ============================================================
 */

class AutoPromptComposer{


    constructor(){


        this.structure=

            new PromptStructureEngine();



        this.builder=

            new AutoSectionBuilder();


    }



    compose(data={}){


        const arranged=

            this.structure.arrange(

                data

            );



        let output=[];



        arranged.forEach(

            item=>{


                output.push(

                    `${item.key}: ${item.value}`

                );


            }

        );



        return output.join(

            "\n\n"

        );


    }


}



/* ============================================================
 * CONNECT AUTO COMPOSER
 * ============================================================
 */


PromptComposer.prototype.autoCompose=function(data={}){


    const engine=

        new AutoPromptComposer();



    const result=

        engine.compose(

            data

        );



    this.state.set(

        "autoPrompt",

        result

    );



    return result;


};



PromptComposer.prototype.smartComplete=function(){


    const completer=

        new SmartFieldCompleter();



    const result=

        completer.complete(

            this.state.export()

        );



    this.state.update(

        result

    );



    return this;


};

/* ============================================================
 * PART 20
 * AI DECISION ENGINE
 * ============================================================
 */


/* ============================================================
 * CATEGORY DETECTOR
 * ============================================================
 */

class CategoryDetector{


    constructor(){


        this.rules={


            poster:[

                "poster",

                "flyer",

                "event",

                "promosi"

            ],



            banner:[

                "banner",

                "spanduk",

                "backdrop"

            ],



            product:[

                "produk",

                "kemasan",

                "botol",

                "packaging"

            ],



            logo:[

                "logo",

                "brand",

                "identity"

            ],



            video:[

                "video",

                "cinematic",

                "animation",

                "motion"

            ],



            character:[

                "character",

                "avatar",

                "tokoh"

            ]

        };


    }



    detect(text=""){


        let input=

            text.toLowerCase();



        let score={};



        Object.keys(

            this.rules

        )

        .forEach(category=>{


            score[category]=0;



            this.rules[category]

            .forEach(keyword=>{


                if(

                    input.includes(keyword)

                ){

                    score[category]++;

                }


            });


        });



        return Object.keys(score)

        .sort(

            (a,b)=>

            score[b]-score[a]

        )[0];


    }


}



/* ============================================================
 * STYLE RECOMMENDER
 * ============================================================
 */

class StyleRecommendationEngine{


    constructor(){


        this.styles={


            poster:[

                "modern",

                "bold typography",

                "visual hierarchy"

            ],



            product:[

                "premium",

                "minimal",

                "commercial photography"

            ],



            video:[

                "cinematic",

                "dramatic lighting",

                "film look"

            ],



            character:[

                "detailed character design",

                "expressive",

                "high quality render"

            ]


        };


    }



    recommend(category){


        return this.styles[category]

        ||

        [

            "professional",

            "high quality"

        ];


    }


}



/* ============================================================
 * AI MODEL RECOMMENDER
 * ============================================================
 */

class AIModelRecommendationEngine{


    recommend(category,style=""){



        if(

            category==="video"

        ){

            return [

                "VEO",

                "Runway",

                "Kling"

            ];

        }



        if(

            category==="product"

        ){

            return [

                "Leonardo AI",

                "Midjourney",

                "Flux"

            ];

        }



        if(

            category==="poster"

        ){

            return [

                "ChatGPT",

                "Midjourney",

                "Leonardo AI"

            ];

        }



        return [

            "ChatGPT",

            "DALL-E"

        ];


    }


}



/* ============================================================
 * WORKFLOW SELECTOR
 * ============================================================
 */

class WorkflowSelector{


    choose(category){


        const workflows={


            poster:

            [

                "Analyze brief",

                "Generate design prompt",

                "Optimize typography",

                "Export"

            ],



            product:

            [

                "Analyze product",

                "Generate visual direction",

                "Create commercial prompt",

                "Render"

            ],



            video:

            [

                "Create story",

                "Create scene",

                "Add camera movement",

                "Generate video prompt"

            ]

        };



        return workflows[category]

        ||

        [

            "Analyze",

            "Generate",

            "Optimize"

        ];


    }


}



/* ============================================================
 * AI DECISION MAKER
 * ============================================================
 */

class AIDecisionMaker{


    constructor(){


        this.category=

            new CategoryDetector();



        this.style=

            new StyleRecommendationEngine();



        this.model=

            new AIModelRecommendationEngine();



        this.workflow=

            new WorkflowSelector();


    }



    decide(text=""){


        const category=

            this.category.detect(

                text

            );



        return {


            category,


            recommendedStyle:

                this.style.recommend(

                    category

                ),



            recommendedAI:

                this.model.recommend(

                    category

                ),



            workflow:

                this.workflow.choose(

                    category

                )


        };


    }


}



/* ============================================================
 * CONNECT DECISION ENGINE
 * ============================================================
 */


PromptComposer.prototype.decide=function(){


    const engine=

        new AIDecisionMaker();



    return engine.decide(

        this.compose()

    );


};



PromptComposer.prototype.autoCategory=function(){


    const decision=

        this.decide();



    this.state.set(

        "category",

        decision.category

    );



    return decision.category;


};



PromptComposer.prototype.recommendAI=function(){


    return this.decide()

    .recommendedAI;


};

/* ============================================================
 * PART 21
 * PROMPT LEARNING SYSTEM
 * ============================================================
 */


/* ============================================================
 * USER PREFERENCE MEMORY
 * ============================================================
 */

class UserPreferenceMemory{


    constructor(){


        this.preferences={};


    }



    set(key,value){


        this.preferences[key]=value;


        return this;


    }



    get(key){


        return this.preferences[key];


    }



    all(){


        return ComposerUtils.clone(

            this.preferences

        );


    }



    remove(key){


        delete this.preferences[key];


        return this;


    }


}



/* ============================================================
 * PATTERN RECOGNIZER
 * ============================================================
 */

class PatternRecognizer{


    constructor(){


        this.patterns={};


    }



    analyze(prompt=""){


        let result={


            length:

                prompt.length,



            words:

                prompt.split(/\s+/).length,



            style:



                this.detectStyle(prompt),



            category:



                this.detectCategory(prompt)


        };



        return result;


    }



    detectStyle(prompt){


        const styles=[


            "modern",

            "minimal",

            "cinematic",

            "realistic",

            "3d",

            "luxury"

        ];



        return styles.filter(

            style=>

            prompt.toLowerCase()

            .includes(style)

        );


    }



    detectCategory(prompt){


        const categories=[


            "poster",

            "banner",

            "product",

            "logo",

            "video"

        ];



        return categories.filter(

            category=>

            prompt.toLowerCase()

            .includes(category)

        );


    }


}



/* ============================================================
 * USAGE ANALYTICS
 * ============================================================
 */

class UsageAnalytics{


    constructor(){


        this.logs=[];


    }



    track(action,data={}){


        this.logs.push({


            action,


            data,


            time:

            new Date().toISOString()


        });



        return this;


    }



    count(action){


        return this.logs.filter(

            item=>

            item.action===action

        ).length;


    }



    history(){


        return this.logs;


    }


}



/* ============================================================
 * ADAPTIVE IMPROVEMENT ENGINE
 * ============================================================
 */

class AdaptiveImprovementEngine{


    constructor(){


        this.learning=[];


    }



    learn(data){


        this.learning.push(

            ComposerUtils.clone(data)

        );


        return this;


    }



    suggest(){


        if(

            !this.learning.length

        ){

            return [];

        }



        let suggestions=[];



        this.learning.forEach(

            item=>{


                if(

                    item.style

                ){

                    suggestions.push(

                        `Gunakan style ${item.style}`

                    );

                }


            }

        );



        return ComposerUtils.unique(

            suggestions

        );


    }


}



/* ============================================================
 * LEARNING ENGINE CORE
 * ============================================================
 */

class PromptLearningEngine{


    constructor(){


        this.memory=

            new UserPreferenceMemory();



        this.pattern=

            new PatternRecognizer();



        this.analytics=

            new UsageAnalytics();



        this.improvement=

            new AdaptiveImprovementEngine();


    }



    learn(prompt=""){


        const pattern=

            this.pattern.analyze(

                prompt

            );



        this.improvement.learn(

            pattern

        );



        this.analytics.track(

            "prompt_used",

            pattern

        );



        return pattern;


    }



    improve(){


        return this.improvement.suggest();


    }


}



/* ============================================================
 * CONNECT LEARNING SYSTEM
 * ============================================================
 */


PromptComposer.prototype.learning=function(){


    if(!this._learning){


        this._learning=

            new PromptLearningEngine();


    }



    return this._learning;


};



PromptComposer.prototype.learnPrompt=function(){


    return this.learning()

    .learn(

        this.compose()

    );


};



PromptComposer.prototype.getLearningSuggestion=function(){


    return this.learning()

    .improve();


};

/* ============================================================
 * PART 22
 * USER PREFERENCE ENGINE
 * ============================================================
 */


/* ============================================================
 * USER PROFILE
 * ============================================================
 */

class UserProfile{


    constructor(){


        this.profile={


            name:"",


            favoriteStyles:[],


            favoriteAI:[],


            favoriteFormats:[],


            workflow:[],


            preferences:{}


        };


    }



    setName(name){


        this.profile.name=name;


        return this;


    }



    addStyle(style){


        if(

            style &&

            !this.profile.favoriteStyles.includes(style)

        ){

            this.profile.favoriteStyles.push(

                style

            );

        }


        return this;


    }



    addAI(ai){


        if(

            ai &&

            !this.profile.favoriteAI.includes(ai)

        ){

            this.profile.favoriteAI.push(

                ai

            );

        }


        return this;


    }



    addFormat(format){


        if(

            format &&

            !this.profile.favoriteFormats.includes(format)

        ){

            this.profile.favoriteFormats.push(

                format

            );

        }


        return this;


    }



    setPreference(key,value){


        this.profile.preferences[key]=value;


        return this;


    }



    get(){


        return ComposerUtils.clone(

            this.profile

        );


    }


}



/* ============================================================
 * PREFERENCE ANALYZER
 * ============================================================
 */

class PreferenceAnalyzer{


    analyze(history=[]){


        let styles={};


        let ai={};



        history.forEach(item=>{


            const data=item.data || {};



            if(

                data.style

            ){


                styles[data.style]=

                (styles[data.style]||0)+1;


            }



            if(

                data.aiTarget

            ){


                ai[data.aiTarget]=

                (ai[data.aiTarget]||0)+1;


            }


        });



        return {


            styles,


            ai


        };


    }



}



/* ============================================================
 * WORKFLOW PREFERENCE ENGINE
 * ============================================================
 */

class WorkflowPreferenceEngine{


    constructor(){


        this.workflows=[];


    }



    add(step){


        this.workflows.push(step);


        return this;


    }



    get(){


        return this.workflows;


    }



    clear(){


        this.workflows=[];


        return this;


    }


}



/* ============================================================
 * PERSONALIZATION ENGINE
 * ============================================================
 */

class PersonalizationEngine{


    constructor(){


        this.profile=

            new UserProfile();



        this.analyzer=

            new PreferenceAnalyzer();



    }



    learn(history=[]){


        const result=

            this.analyzer.analyze(

                history

            );



        Object.keys(

            result.styles

        )

        .forEach(style=>{


            this.profile.addStyle(

                style

            );


        });



        Object.keys(

            result.ai

        )

        .forEach(ai=>{


            this.profile.addAI(

                ai

            );


        });



        return this.profile.get();


    }



    apply(data={}){


        const profile=

            this.profile.get();



        return {


            ...data,



            preferredStyle:

                profile.favoriteStyles[0] || "",



            preferredAI:

                profile.favoriteAI[0] || ""

        };


    }


}



/* ============================================================
 * PREFERENCE STORAGE
 * ============================================================
 */

class PreferenceStorage{


    constructor(){


        this.data={};


    }



    save(key,value){


        this.data[key]=value;


        return this;


    }



    load(key){


        return this.data[key];


    }



    all(){


        return ComposerUtils.clone(

            this.data

        );


    }


}



/* ============================================================
 * CONNECT USER PREFERENCE SYSTEM
 * ============================================================
 */


PromptComposer.prototype.profile=function(){


    if(!this._profile){


        this._profile=

            new PersonalizationEngine();


    }



    return this._profile;


};



PromptComposer.prototype.learnPreference=function(){


    const history=

        this.getHistory();



    return this.profile()

    .learn(

        history

    );


};



PromptComposer.prototype.getProfile=function(){


    return this.profile()

    .profile

    .get();


};



PromptComposer.prototype.applyPreference=function(data={}){


    return this.profile()

    .apply(

        data

    );


};

/* ============================================================
 * PART 23
 * AI ASSISTANT MODE SYSTEM
 * ============================================================
 */


/* ============================================================
 * CONVERSATION MEMORY
 * ============================================================
 */

class ConversationMemory{


    constructor(){


        this.messages=[];


    }



    add(role,message){


        this.messages.push({


            role,


            message,


            time:

            new Date().toISOString()


        });



        return this;


    }



    get(){


        return ComposerUtils.clone(

            this.messages

        );


    }



    last(){


        return this.messages[

            this.messages.length-1

        ] || null;


    }



    clear(){


        this.messages=[];


        return this;


    }


}



/* ============================================================
 * CONTEXT ANALYZER
 * ============================================================
 */

class ContextAnalyzer{


    analyze(messages=[]){


        let context={


            topic:"",


            keywords:[],


            intent:""


        };



        if(

            !messages.length

        ){

            return context;

        }



        const text=

            messages

            .map(

                item=>item.message

            )

            .join(" ");



        context.topic=

            this.detectTopic(

                text

            );



        context.keywords=

            text

            .split(" ")

            .filter(

                word=>

                word.length>4

            );



        context.intent=

            this.detectIntent(

                text

            );



        return context;


    }



    detectTopic(text){


        const topics=[


            "poster",

            "banner",

            "product",

            "video",

            "logo",

            "character"

        ];



        return topics.find(

            item=>

            text

            .toLowerCase()

            .includes(item)

        ) || "";


    }



    detectIntent(text){


        if(

            text

            .toLowerCase()

            .includes("buat")

        ){

            return "create";

        }



        if(

            text

            .toLowerCase()

            .includes("ubah")

        ){

            return "modify";

        }



        return "unknown";


    }


}



/* ============================================================
 * ASSISTANT RESPONSE ENGINE
 * ============================================================
 */

class AssistantResponseEngine{


    respond(context={}){


        let response={


            mode:"assistant",


            suggestion:""



        };



        if(

            context.topic

        ){


            response.suggestion=

            `Membuat prompt ${context.topic} dengan optimasi AI.`;


        }

        else{


            response.suggestion=

            "Silahkan berikan detail desain yang ingin dibuat.";


        }



        return response;


    }


}



/* ============================================================
 * SMART FOLLOW UP ENGINE
 * ============================================================
 */

class SmartFollowUpEngine{


    generate(context={}){


        let questions=[];



        if(

            !context.topic

        ){

            questions.push(

                "Apa jenis desain yang ingin dibuat?"

            );

        }



        if(

            context.keywords.length<3

        ){

            questions.push(

                "Tambahkan detail objek, style, dan tujuan."

            );

        }



        return questions;


    }


}



/* ============================================================
 * ASSISTANT CORE
 * ============================================================
 */

class AIAssistantCore{


    constructor(){


        this.memory=

            new ConversationMemory();



        this.context=

            new ContextAnalyzer();



        this.response=

            new AssistantResponseEngine();



        this.followup=

            new SmartFollowUpEngine();


    }



    chat(message){


        this.memory.add(

            "user",

            message

        );



        const context=

            this.context.analyze(

                this.memory.get()

            );



        return {


            context,


            response:

            this.response.respond(

                context

            ),



            followUp:

            this.followup.generate(

                context

            )


        };


    }


}



/* ============================================================
 * CONNECT ASSISTANT SYSTEM
 * ============================================================
 */


PromptComposer.prototype.assistant=function(){


    if(!this._assistant){


        this._assistant=

            new AIAssistantCore();


    }



    return this._assistant;


};



PromptComposer.prototype.chat=function(message){


    return this.assistant()

    .chat(

        message

    );


};



PromptComposer.prototype.getConversation=function(){


    return this.assistant()

    .memory

    .get();


};

/* ============================================================
 * PART 24
 * ADVANCED PROMPT GENERATOR CORE
 * ============================================================
 */


/* ============================================================
 * PROMPT FORMAT DEFINITIONS
 * ============================================================
 */

class PromptFormatManager{


    constructor(){


        this.formats={


            image:[

                "subject",

                "style",

                "composition",

                "lighting",

                "quality"

            ],



            video:[

                "scene",

                "character",

                "action",

                "camera",

                "movement",

                "cinematic"

            ],



            design:[

                "project",

                "objective",

                "visual",

                "layout",

                "color",

                "output"

            ]


        };


    }



    get(type){


        return this.formats[type]

        ||

        this.formats.image;


    }



    list(){


        return Object.keys(

            this.formats

        );


    }


}



/* ============================================================
 * SCENE GENERATOR
 * ============================================================
 */

class SceneGenerator{


    generate(data={}){


        return {


            scene:

            data.scene || "main scene",



            subject:

            data.subject || "",



            action:

            data.action || "",



            environment:

            data.environment || "",



            mood:

            data.mood || "professional"


        };


    }


}



/* ============================================================
 * IMAGE PROMPT GENERATOR
 * ============================================================
 */

class ImagePromptGenerator{


    generate(data={}){


        let parts=[];



        if(data.subject)

            parts.push(

                `Subject: ${data.subject}`

            );



        if(data.style)

            parts.push(

                `Style: ${data.style}`

            );



        if(data.composition)

            parts.push(

                `Composition: ${data.composition}`

            );



        if(data.lighting)

            parts.push(

                `Lighting: ${data.lighting}`

            );



        if(data.quality)

            parts.push(

                `Quality: ${data.quality}`

            );



        return parts.join(

            "\n\n"

        );


    }


}



/* ============================================================
 * VIDEO PROMPT GENERATOR
 * ============================================================
 */

class VideoPromptGenerator{


    generate(data={}){


        let parts=[];



        const fields=[


            "scene",

            "character",

            "action",

            "camera",

            "movement",

            "lighting",

            "cinematic"

        ];



        fields.forEach(

            field=>{


                if(data[field]){


                    parts.push(

                        `${field}: ${data[field]}`

                    );


                }


            }

        );



        return parts.join(

            "\n\n"

        );


    }


}



/* ============================================================
 * PROFESSIONAL FORMATTER
 * ============================================================
 */

class ProfessionalPromptFormatter{


    format(prompt="",type="image"){


        return [

            "=== PROMPTFORGE AI v5 ===",

            "",

            `TYPE: ${type.toUpperCase()}`,

            "",

            prompt,

            "",

            "=== END PROMPT ==="

        ]

        .join("\n");


    }


}



/* ============================================================
 * ADVANCED GENERATOR ENGINE
 * ============================================================
 */

class AdvancedGeneratorEngine{


    constructor(){


        this.format=

            new PromptFormatManager();



        this.image=

            new ImagePromptGenerator();



        this.video=

            new VideoPromptGenerator();



        this.scene=

            new SceneGenerator();



        this.output=

            new ProfessionalPromptFormatter();


    }



    generate(type,data={}){


        let prompt="";



        if(

            type==="video"

        ){


            prompt=

            this.video.generate(

                data

            );


        }

        else{


            prompt=

            this.image.generate(

                data

            );


        }



        return this.output.format(

            prompt,

            type

        );


    }


}



/* ============================================================
 * CONNECT GENERATOR CORE
 * ============================================================
 */


PromptComposer.prototype.generatePrompt=function(

    type="image",

    data={}

){


    const engine=

        new AdvancedGeneratorEngine();



    const result=

        engine.generate(

            type,

            data

        );



    this.state.set(

        "generatedPrompt",

        result

    );



    return result;


};



PromptComposer.prototype.generateImage=function(data={}){


    return this.generatePrompt(

        "image",

        data

    );


};



PromptComposer.prototype.generateVideo=function(data={}){


    return this.generatePrompt(

        "video",

        data

    );


};

/* ============================================================
 * PART 25
 * DATABASE INTEGRATION LAYER
 * ============================================================
 */


/* ============================================================
 * DATABASE CORE
 * ============================================================
 */

class ComposerDatabase{


    constructor(name="PromptForgeDB"){


        this.name=name;


        this.tables={};


    }



    createTable(name){


        if(

            !this.tables[name]

        ){

            this.tables[name]=[];

        }



        return this;


    }



    insert(table,data={}){


        if(

            !this.tables[table]

        ){

            this.createTable(

                table

            );

        }



        this.tables[table].push(

            {

                id:Date.now(),

                ...ComposerUtils.clone(data),

                created:

                new Date().toISOString()

            }

        );



        return this;


    }



    find(table,callback){


        if(

            !this.tables[table]

        ){

            return [];

        }



        if(

            typeof callback==="function"

        ){


            return this.tables[table]

            .filter(callback);


        }



        return this.tables[table];


    }



    remove(table,id){


        if(

            !this.tables[table]

        ){

            return this;

        }



        this.tables[table]=

        this.tables[table]

        .filter(

            item=>

            item.id!==id

        );



        return this;


    }



    clear(table){


        if(

            this.tables[table]

        ){

            this.tables[table]=[];

        }



        return this;


    }



    all(){


        return ComposerUtils.clone(

            this.tables

        );


    }


}



/* ============================================================
 * PROMPT STORAGE
 * ============================================================
 */

class PromptStorage{


    constructor(database){


        this.db=database;


        this.db.createTable(

            "prompts"

        );


    }



    save(name,prompt){


        this.db.insert(

            "prompts",

            {


                name,


                prompt


            }

        );



        return this;


    }



    list(){


        return this.db.find(

            "prompts"

        );


    }



    search(keyword=""){


        return this.db.find(

            "prompts",

            item=>

            item.prompt

            .toLowerCase()

            .includes(

                keyword.toLowerCase()

            )

        );


    }


}



/* ============================================================
 * TEMPLATE STORAGE
 * ============================================================
 */

class TemplateStorage{


    constructor(database){


        this.db=database;


        this.db.createTable(

            "templates"

        );


    }



    save(name,content){


        this.db.insert(

            "templates",

            {


                name,


                content


            }

        );



        return this;


    }



    list(){


        return this.db.find(

            "templates"

        );


    }


}



/* ============================================================
 * USER DATA STORAGE
 * ============================================================
 */

class UserDataStorage{


    constructor(database){


        this.db=database;


        this.db.createTable(

            "users"

        );


    }



    save(data={}){


        this.db.insert(

            "users",

            data

        );



        return this;


    }



    get(){


        return this.db.find(

            "users"

        );


    }


}



/* ============================================================
 * DATABASE EXPORTER
 * ============================================================
 */

class DatabaseExporter{


    export(database){


        return JSON.stringify(

            database.all(),

            null,

            2

        );


    }



    import(json){


        try{


            return JSON.parse(

                json

            );


        }

        catch(error){


            return null;


        }


    }


}



/* ============================================================
 * DATABASE MANAGER
 * ============================================================
 */

class DatabaseManager{


    constructor(){


        this.database=

            new ComposerDatabase();



        this.prompt=

            new PromptStorage(

                this.database

            );



        this.template=

            new TemplateStorage(

                this.database

            );



        this.user=

            new UserDataStorage(

                this.database

            );


    }



    export(){


        return new DatabaseExporter()

        .export(

            this.database

        );


    }


}



/* ============================================================
 * CONNECT DATABASE SYSTEM
 * ============================================================
 */


PromptComposer.prototype.database=function(){


    if(!this._database){


        this._database=

            new DatabaseManager();


    }



    return this._database;


};



PromptComposer.prototype.savePromptDB=function(name){


    this.database()

    .prompt

    .save(

        name,

        this.compose()

    );



    return this;


};



PromptComposer.prototype.getPromptDB=function(){


    return this.database()

    .prompt

    .list();


};



PromptComposer.prototype.exportDatabase=function(){


    return this.database()

    .export();


};

/* ============================================================
 * PART 26
 * API BRIDGE SYSTEM
 * ============================================================
 */


/* ============================================================
 * API REQUEST CORE
 * ============================================================
 */

class APIRequestHandler{


    constructor(){


        this.headers={


            "Content-Type":

            "application/json"


        };


    }



    setHeader(key,value){


        this.headers[key]=value;


        return this;


    }



    async request(url,options={}){


        if(

            typeof fetch==="undefined"

        ){

            return {


                success:false,


                error:

                "Fetch API tidak tersedia"


            };


        }



        try{


            const response=

            await fetch(

                url,

                {


                    ...options,


                    headers:


                    {


                        ...this.headers,


                        ...(options.headers||{})


                    }


                }

            );



            return await response.json();


        }

        catch(error){


            return {


                success:false,


                error:error.message


            };


        }


    }


}



/* ============================================================
 * API RESPONSE PARSER
 * ============================================================
 */

class APIResponseParser{


    parse(response){


        if(

            !response

        ){

            return null;

        }



        return {


            success:

            response.success !== false,



            data:

            response.data ||

            response.output ||

            response.result ||

            response,



            timestamp:

            new Date().toISOString()


        };


    }


}



/* ============================================================
 * AI PROVIDER BASE
 * ============================================================
 */

class AIProvider{


    constructor(name){


        this.name=name;


        this.enabled=true;


    }



    enable(){


        this.enabled=true;


        return this;


    }



    disable(){


        this.enabled=false;


        return this;


    }



    async generate(prompt){


        return {


            provider:this.name,


            prompt,


            message:

            "Provider belum dikonfigurasi"


        };


    }


}



/* ============================================================
 * OPENAI ADAPTER
 * ============================================================
 */

class OpenAIAdapter extends AIProvider{


    constructor(){


        super(

            "OpenAI"

        );


    }



    async generate(prompt){


        return {


            provider:

            this.name,



            type:

            "text-generation",



            prompt


        };


    }


}



/* ============================================================
 * LEONARDO ADAPTER
 * ============================================================
 */

class LeonardoAdapter extends AIProvider{


    constructor(){


        super(

            "Leonardo AI"

        );


    }



    async generate(prompt){


        return {


            provider:

            this.name,



            type:

            "image-generation",



            prompt


        };


    }


}



/* ============================================================
 * VIDEO AI ADAPTER
 * ============================================================
 */

class VideoAIAdapter extends AIProvider{


    constructor(){


        super(

            "Video AI"

        );


    }



    async generate(prompt){


        return {


            provider:

            this.name,



            type:

            "video-generation",



            prompt


        };


    }


}



/* ============================================================
 * AI PROVIDER MANAGER
 * ============================================================
 */

class AIProviderManager{


    constructor(){


        this.providers={};


    }



    register(provider){


        this.providers[provider.name]=provider;


        return this;


    }



    get(name){


        return this.providers[name] || null;


    }



    list(){


        return Object.keys(

            this.providers

        );


    }



    async generate(name,prompt){


        const provider=

            this.get(name);



        if(!provider){


            return null;

        }



        return await provider.generate(

            prompt

        );


    }


}



/* ============================================================
 * API BRIDGE CORE
 * ============================================================
 */

class APIBridge{


    constructor(){


        this.request=

            new APIRequestHandler();



        this.parser=

            new APIResponseParser();



        this.providers=

            new AIProviderManager();



        this.providers

        .register(

            new OpenAIAdapter()

        )

        .register(

            new LeonardoAdapter()

        )

        .register(

            new VideoAIAdapter()

        );


    }



    async run(provider,prompt){


        const result=

            await this.providers.generate(

                provider,

                prompt

            );



        return this.parser.parse(

            result

        );


    }


}



/* ============================================================
 * CONNECT API SYSTEM
 * ============================================================
 */


PromptComposer.prototype.api=function(){


    if(!this._api){


        this._api=

            new APIBridge();


    }



    return this._api;


};



PromptComposer.prototype.generateWithAI=

async function(

    provider="OpenAI"

){


    return await this.api()

    .run(

        provider,

        this.compose()

    );


};

/* ============================================================
 * PART 27
 * SECURITY & PERMISSION LAYER
 * ============================================================
 */


/* ============================================================
 * SECURITY CONFIGURATION
 * ============================================================
 */

class SecurityConfig{


    constructor(){


        this.settings={


            maxRequest:100,


            allowExternalAPI:true,


            requirePermission:false,


            safeMode:true


        };


    }



    set(key,value){


        this.settings[key]=value;


        return this;


    }



    get(key){


        return this.settings[key];


    }



    all(){


        return ComposerUtils.clone(

            this.settings

        );


    }


}



/* ============================================================
 * API KEY MANAGER
 * ============================================================
 */

class APIKeyManager{


    constructor(){


        this.keys={};


    }



    save(provider,key){


        this.keys[provider]={


            value:key,


            created:

            new Date().toISOString()


        };



        return this;


    }



    get(provider){


        return this.keys[provider]

        ?

        this.keys[provider].value

        :

        null;


    }



    remove(provider){


        delete this.keys[provider];


        return this;


    }



    list(){


        return Object.keys(

            this.keys

        );


    }


}



/* ============================================================
 * PERMISSION SYSTEM
 * ============================================================
 */

class PermissionManager{


    constructor(){


        this.permissions={};


    }



    grant(user,permission){


        if(

            !this.permissions[user]

        ){

            this.permissions[user]=[];

        }



        if(

            !this.permissions[user]

            .includes(permission)

        ){

            this.permissions[user]

            .push(

                permission

            );

        }



        return this;


    }



    revoke(user,permission){


        if(

            this.permissions[user]

        ){

            this.permissions[user]=

            this.permissions[user]

            .filter(

                item=>

                item!==permission

            );

        }



        return this;


    }



    check(user,permission){


        return (

            this.permissions[user]

            ||

            []

        )

        .includes(

            permission

        );


    }



}



/* ============================================================
 * ACCESS CONTROL
 * ============================================================
 */

class AccessControl{


    constructor(){


        this.roles={


            admin:[

                "all"

            ],



            user:[

                "generate",

                "export"

            ],



            guest:[

                "preview"

            ]


        };


    }



    can(role,action){


        return (

            this.roles[role]

            ||

            []

        )

        .includes(

            "all"

        )

        ||

        (

            this.roles[role]

            ||

            []

        )

        .includes(

            action

        );


    }



    addRole(role,permissions=[]){


        this.roles[role]=permissions;


        return this;


    }


}



/* ============================================================
 * SECURITY VALIDATOR
 * ============================================================
 */

class SecurityValidator{


    validateInput(input){


        if(

            typeof input !== "string"

        ){

            return false;

        }



        if(

            input.length > 50000

        ){

            return false;

        }



        return true;


    }



    sanitize(input=""){


        return input

        .replace(

            /<script.*?>.*?<\/script>/gi,

            ""

        )

        .trim();


    }


}



/* ============================================================
 * SAFE EXECUTION ENGINE
 * ============================================================
 */

class SafeExecutionEngine{


    constructor(){


        this.validator=

            new SecurityValidator();


    }



    execute(callback,data){


        if(

            !this.validator

            .validateInput(

                String(data)

            )

        ){


            return {


                success:false,


                error:

                "Input tidak aman"


            };


        }



        try{


            return {


                success:true,


                result:

                callback(

                    this.validator

                    .sanitize(

                        String(data)

                    )

                )


            };


        }

        catch(error){


            return {


                success:false,


                error:error.message


            };


        }


    }


}



/* ============================================================
 * SECURITY CORE
 * ============================================================
 */

class SecurityCore{


    constructor(){


        this.config=

            new SecurityConfig();



        this.keys=

            new APIKeyManager();



        this.permission=

            new PermissionManager();



        this.access=

            new AccessControl();



        this.executor=

            new SafeExecutionEngine();


    }


}



/* ============================================================
 * CONNECT SECURITY SYSTEM
 * ============================================================
 */


PromptComposer.prototype.security=function(){


    if(!this._security){


        this._security=

            new SecurityCore();


    }



    return this._security;


};



PromptComposer.prototype.setAPIKey=function(

    provider,

    key

){


    this.security()

    .keys

    .save(

        provider,

        key

    );



    return this;


};



PromptComposer.prototype.checkAccess=function(

    role,

    action

){


    return this.security()

    .access

    .can(

        role,

        action

    );


};

/* ============================================================
 * PART 28
 * PERFORMANCE OPTIMIZATION ENGINE
 * ============================================================
 */


/* ============================================================
 * CACHE SYSTEM
 * ============================================================
 */

class CacheManager{


    constructor(){


        this.cache={};


    }



    set(key,value,expire=0){


        this.cache[key]={


            value,


            expire:

            expire

            ?

            Date.now()+expire

            :

            null


        };



        return this;


    }



    get(key){


        const item=

            this.cache[key];



        if(!item){


            return null;

        }



        if(

            item.expire &&

            Date.now()>item.expire

        ){


            delete this.cache[key];


            return null;

        }



        return item.value;


    }



    has(key){


        return this.get(key)!==null;


    }



    remove(key){


        delete this.cache[key];


        return this;


    }



    clear(){


        this.cache={};


        return this;


    }



}



/* ============================================================
 * MEMORY OPTIMIZER
 * ============================================================
 */

class MemoryOptimizer{


    constructor(){


        this.limit=1000;


    }



    clean(array=[]){


        if(

            array.length >

            this.limit

        ){


            return array.slice(

                -this.limit

            );

        }



        return array;


    }



    estimate(data){


        return JSON.stringify(

            data

        ).length;


    }


}



/* ============================================================
 * LAZY LOADER
 * ============================================================
 */

class LazyLoader{


    constructor(){


        this.modules={};


    }



    register(name,loader){


        this.modules[name]={


            loader,


            loaded:false,


            instance:null


        };



        return this;


    }



    load(name){


        const module=

            this.modules[name];



        if(!module){


            return null;

        }



        if(

            !module.loaded

        ){


            module.instance=

                module.loader();



            module.loaded=true;


        }



        return module.instance;


    }



    list(){


        return Object.keys(

            this.modules

        );


    }


}



/* ============================================================
 * SPEED CONTROLLER
 * ============================================================
 */

class SpeedController{


    constructor(){


        this.mode="normal";


    }



    setMode(mode){


        this.mode=mode;


        return this;


    }



    getSettings(){


        const modes={


            fast:{


                cache:true,


                detail:"medium"


            },



            normal:{


                cache:true,


                detail:"high"


            },



            quality:{


                cache:false,


                detail:"ultra"


            }


        };



        return modes[this.mode]

        ||

        modes.normal;


    }


}



/* ============================================================
 * RESOURCE MANAGER
 * ============================================================
 */

class ResourceManager{


    constructor(){


        this.resources={};


    }



    add(name,data){


        this.resources[name]=data;


        return this;


    }



    get(name){


        return this.resources[name];


    }



    remove(name){


        delete this.resources[name];


        return this;


    }



    clear(){


        this.resources={};


        return this;


    }


}



/* ============================================================
 * OPTIMIZATION ENGINE
 * ============================================================
 */

class PerformanceEngine{


    constructor(){


        this.cache=

            new CacheManager();



        this.memory=

            new MemoryOptimizer();



        this.loader=

            new LazyLoader();



        this.speed=

            new SpeedController();



        this.resources=

            new ResourceManager();


    }



    optimize(data){


        return this.memory.clean(

            data

        );


    }



    remember(key,value){


        this.cache.set(

            key,

            value

        );



        return this;


    }



    recall(key){


        return this.cache.get(

            key

        );


    }


}



/* ============================================================
 * CONNECT PERFORMANCE SYSTEM
 * ============================================================
 */


PromptComposer.prototype.performance=function(){


    if(!this._performance){


        this._performance=

            new PerformanceEngine();


    }



    return this._performance;


};



PromptComposer.prototype.cachePrompt=function(

    key

){


    this.performance()

    .remember(

        key,

        this.compose()

    );



    return this;


};



PromptComposer.prototype.getCachedPrompt=function(

    key

){


    return this.performance()

    .recall(

        key

    );


};



PromptComposer.prototype.optimizeMemory=function(data=[]){


    return this.performance()

    .optimize(

        data

    );


};

/* ============================================================
 * PART 29
 * FINAL COMPOSER INTEGRATION SYSTEM
 * ============================================================
 */


/* ============================================================
 * SYSTEM STATUS MONITOR
 * ============================================================
 */

class SystemStatusMonitor{


    constructor(){


        this.modules={};


    }



    register(name,status=true){


        this.modules[name]={


            active:status,


            loaded:

            new Date().toISOString()


        };



        return this;


    }



    check(name){


        return this.modules[name]

        ||

        {

            active:false

        };


    }



    all(){


        return ComposerUtils.clone(

            this.modules

        );


    }


}



/* ============================================================
 * MODULE SYNCHRONIZER
 * ============================================================
 */

class ModuleSynchronizer{


    constructor(){


        this.connections=[];


    }



    connect(name,module){


        this.connections.push({


            name,


            module


        });



        return this;


    }



    get(name){


        const found=

            this.connections.find(

                item=>

                item.name===name

            );



        return found

        ?

        found.module

        :

        null;


    }



    list(){


        return this.connections.map(

            item=>

            item.name

        );


    }


}



/* ============================================================
 * MASTER PROMPT CONTROLLER
 * ============================================================
 */

class MasterPromptController{


    constructor(composer){


        this.composer=composer;



        this.status=

            new SystemStatusMonitor();



        this.sync=

            new ModuleSynchronizer();


    }



    initialize(){


        const modules=[


            "memory",

            "template",

            "knowledge",

            "learning",

            "assistant",

            "database",

            "api",

            "security",

            "performance"


        ];



        modules.forEach(

            module=>{


                try{


                    const instance=

                    this.composer[module]();



                    this.sync.connect(

                        module,

                        instance

                    );



                    this.status.register(

                        module,

                        true

                    );


                }

                catch(error){


                    this.status.register(

                        module,

                        false

                    );


                }


            }

        );



        return this;


    }



    modules(){


        return this.sync.list();


    }



    statusReport(){


        return this.status.all();


    }


}



/* ============================================================
 * UNIFIED PROMPT FLOW
 * ============================================================
 */

class UnifiedPromptFlow{


    constructor(composer){


        this.composer=composer;


    }



    execute(data={}){


        this.composer.state.update(

            data

        );



        // Smart completion

        this.composer.smartComplete();



        // Learning

        this.composer.learnPrompt();



        // Decision

        const decision=

            this.composer.decide();



        // Generate

        const prompt=

            this.composer.generatePrompt(

                decision.category,

                this.composer.state.export()

            );



        return {


            decision,


            prompt,


            profile:

            this.composer.getProfile()


        };


    }


}



/* ============================================================
 * FINAL COMPOSER CORE
 * ============================================================
 */

class ComposerCore{


    constructor(composer){


        this.composer=composer;



        this.controller=

            new MasterPromptController(

                composer

            );



        this.flow=

            new UnifiedPromptFlow(

                composer

            );


    }



    boot(){


        this.controller.initialize();


        return this;


    }



    run(data={}){


        return this.flow.execute(

            data

        );


    }



    report(){


        return {


            modules:

            this.controller.modules(),



            status:

            this.controller.statusReport()


        };


    }


}



/* ============================================================
 * CONNECT FINAL SYSTEM
 * ============================================================
 */


PromptComposer.prototype.core=function(){


    if(!this._core){


        this._core=

            new ComposerCore(

                this

            );


    }



    return this._core;


};



PromptComposer.prototype.boot=function(){


    this.core()

    .boot();



    return this;


};



PromptComposer.prototype.run=function(data={}){


    return this.core()

    .run(

        data

    );


};



PromptComposer.prototype.systemReport=function(){


    return this.core()

    .report();


};

/* ============================================================
 * PART 30
 * PRODUCTION RELEASE ENGINE
 * ============================================================
 */


/* ============================================================
 * RELEASE CONFIGURATION
 * ============================================================
 */

class ReleaseConfig{


    constructor(){


        this.version="5.0.0";


        this.name="PromptForge AI";


        this.status="production";


        this.build=

        new Date().toISOString();


    }



    info(){


        return {


            name:this.name,


            version:this.version,


            status:this.status,


            build:this.build


        };


    }


}



/* ============================================================
 * HEALTH CHECK SYSTEM
 * ============================================================
 */

class HealthCheck{


    constructor(composer){


        this.composer=composer;


    }



    check(){


        let result={


            engine:false,


            state:false,


            modules:false,


            version:false


        };



        try{


            result.engine=

            !!this.composer;



            result.state=

            !!this.composer.state;



            result.modules=

            !!this.composer.core;



            result.version=

            !!window.PromptComposerVersion;



        }

        catch(error){



        }



        return {


            healthy:

            Object.values(result)

            .every(Boolean),



            detail:result


        };


    }


}



/* ============================================================
 * PUBLIC API GATEWAY
 * ============================================================
 */

class PublicComposerAPI{


    constructor(composer){


        this.composer=composer;


    }



    generate(data={}){


        return this.composer.run(

            data

        );


    }



    compose(){


        return this.composer.compose();


    }



    profile(){


        return this.composer.getProfile();


    }



    status(){


        return this.composer.systemReport();


    }



    health(){


        return new HealthCheck(

            this.composer

        )

        .check();


    }


}



/* ============================================================
 * PRODUCTION MANAGER
 * ============================================================
 */

class ProductionManager{


    constructor(composer){


        this.composer=composer;



        this.release=

        new ReleaseConfig();



        this.api=

        new PublicComposerAPI(

            composer

        );


    }



    start(){


        this.composer.boot();



        console.log(

            "%cPromptForge AI v5 Production Ready",

            "color:#22c55e;font-weight:bold;font-size:14px"

        );



        return this;


    }



    info(){


        return this.release.info();


    }



}



/* ============================================================
 * FINAL SYSTEM INSTANCE
 * ============================================================
 */

PromptComposer.prototype.production=function(){


    if(!this._production){


        this._production=

        new ProductionManager(

            this

        );


    }



    return this._production;


};



PromptComposer.prototype.startProduction=function(){


    return this.production()

    .start();


};



PromptComposer.prototype.releaseInfo=function(){


    return this.production()

    .info();


};



PromptComposer.prototype.publicAPI=function(){


    return this.production()

    .api;


};



/* ============================================================
 * GLOBAL RELEASE OBJECT
 * ============================================================
 */

window.PromptForgeComposer={


    version:"5.0.0",


    engine:

    PromptComposer,


    status:"production"



};



/* ============================================================
 * FINAL READY MESSAGE
 * ============================================================
 */

console.log(

    "%c====================================",

    "color:#06b6d4"

);


console.log(

    "%c PromptForge AI v5 Composer Loaded ",

    "color:#22c55e;font-weight:bold"

);


console.log(

    "%c Smart Prompt Engine Ready",

    "color:#facc15"

);


console.log(

    "%c====================================",

    "color:#06b6d4"

);
