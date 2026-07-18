/* =====================================================
   PROMPTFORGE AI v4
   DATABASE.JS
===================================================== */

const PromptForgeDB = [

    {
        id:1,
        category:"Poster",
        title:"Modern Event Poster",
        style:"Modern",
        size:"A4",
        ai:"ChatGPT",
        description:"Poster acara modern dengan tipografi tegas dan visual premium.",
        template:{
            objective:"Create a premium modern event poster.",
            color:"Blue, Purple, White",
            lighting:"Soft Studio Lighting",
            camera:"Front View",
            negative:"low quality, blurry, watermark"
        }
    },

    {
        id:2,
        category:"Poster",
        title:"Luxury Product Poster",
        style:"Luxury",
        size:"1080x1350",
        ai:"ChatGPT",
        description:"Poster promosi produk premium bergaya mewah.",
        template:{
            objective:"Create a luxury advertising poster.",
            color:"Black, Gold",
            lighting:"Premium Soft Light",
            camera:"Product Shot",
            negative:"low quality, noisy"
        }
    },

    {
        id:3,
        category:"Banner",
        title:"Pengajian Banner",
        style:"Modern",
        size:"Banner",
        ai:"ChatGPT",
        description:"Banner pengajian modern untuk cetak ukuran besar.",
        template:{
            objective:"Professional Islamic event banner.",
            color:"Green, White, Gold",
            lighting:"Natural",
            camera:"Front View",
            negative:"low resolution"
        }
    },

    {
        id:4,
        category:"Thumbnail",
        title:"YouTube Thumbnail",
        style:"Modern",
        size:"1280x720",
        ai:"ChatGPT",
        description:"Thumbnail YouTube dengan CTR tinggi.",
        template:{
            objective:"High CTR YouTube Thumbnail.",
            color:"Yellow, Red, Black",
            lighting:"Dramatic",
            camera:"Close Up",
            negative:"blur, watermark"
        }
    },

    {
        id:5,
        category:"Logo",
        title:"Luxury Logo",
        style:"Luxury",
        size:"Auto Detect",
        ai:"ChatGPT",
        description:"Logo elegan untuk brand premium.",
        template:{
            objective:"Luxury logo branding.",
            color:"Black, Gold",
            lighting:"Studio",
            camera:"Centered",
            negative:"pixelated"
        }
    },

    {
        id:6,
        category:"Flyer",
        title:"Food Flyer",
        style:"Modern",
        size:"A4",
        ai:"ChatGPT",
        description:"Flyer promosi makanan cepat saji.",
        template:{
            objective:"Modern food flyer.",
            color:"Orange, Red",
            lighting:"Food Photography",
            camera:"Top View",
            negative:"dark image"
        }
    }

];


/* =====================================================
   DATABASE API
===================================================== */

const Database = {

    getAll(){

        return PromptForgeDB;

    },

    getById(id){

        return PromptForgeDB.find(item=>item.id==id);

    },

    getByCategory(category){

        if(category==="all"){

            return PromptForgeDB;

        }

        return PromptForgeDB.filter(item=>item.category===category);

    },

    search(keyword){

        keyword=keyword.toLowerCase();

        return PromptForgeDB.filter(item=>

            item.title.toLowerCase().includes(keyword)

            ||

            item.category.toLowerCase().includes(keyword)

            ||

            item.description.toLowerCase().includes(keyword)

        );

    }

};
