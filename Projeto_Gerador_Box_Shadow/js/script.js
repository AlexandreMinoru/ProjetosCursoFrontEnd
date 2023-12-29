//Class
class BoxShadowGenerator{

    constructor(horizontal,horizontalRef,vertical,verticalRef,blur,blurRef,spread,spreadRef,color,colorRef, boxColor,boxColorRef,opacity,opacityRef,inset,previewBox,rule,webkitRule,mozRule){
        this.horizontal = horizontal;
        this.horizontalRef =horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spread = spread;
        this.spreadRef = spreadRef;
        this.color = color;
        this.colorRef = colorRef;
        this.boxColor = boxColor;
        this.boxColorRef = boxColorRef;
        this.opacity = opacity;
        this.opacityRef = opacityRef;
        this.inset = inset.checked;
        this.previewBox = previewBox;
        this.rule = rule;
        this.webkitRule = webkitRule;
        this.mozRule = mozRule;
    };

    iniatialize(){
        this.horizontalRef.value = this.horizontal.value;
        this.verticalRef.value = this.vertical.value;
        this.blurRef.value = this.blur.value;
        this.spreadRef.value = this.spread.value;
        this.colorRef.value = this.color.value;
        this.boxColorRef.value = this.boxColor.value;
        this.opacityRef.value = this.opacity.value;

        this.applyRule();
        this.showRule();
    }

    applyRule(){

        const rgbValueColor = this.hexToRgb(this.colorRef.value);
        const rgbValueBox = this.hexToRgb(this.boxColor.value);

        const shadowRule = `${this.insetRef ? "inset": ""} ${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px rgba(${rgbValueColor}, ${this.opacityRef.value}) `;
        this.previewBox.style.background = `rgba(${rgbValueBox})`;
        this.previewBox.style.boxShadow = shadowRule
        this.currentRule = shadowRule;
    }

   showRule(){
        this.rule.innerText = this.currentRule;
        this.webkitRule.innerText = this.currentRule;
        this.mozRule.innerText = this.currentRule;
   }

   updateValue(type, value){

    switch(type){
        case "horizontal":
            this.horizontalRef.value = value;
            break;
        case "vertical":
            this.verticalRef.value = value;
            break;
        case "blur":
            this.blurRef.value = value;
            break;
        case "spread":
            this.spreadRef.value = value;
            break;
        case "color":
            this.colorRef.value = value;
            break;
        case "boxColor":
            this.boxColorRef.value = value;
            break;
        case "opacity":
            this.opacityRef.value = value;
            break;
        case "inset":
            this.insetRef = value;
            break;
    }
    this.applyRule();
    this.showRule();
   }

   hexToRgb(hex){
   return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${("0x" + hex[5] + hex[6]) | 0}`;
}
}

//Element Selection
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontalValue");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#verticalValue");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blurValue");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spreadValue");
const color = document.querySelector("#color");
const colorRef = document.querySelector("#colorValue");
const boxColor = document.querySelector("#boxColor");
const boxColorRef = document.querySelector("#boxColorValue");
const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacityValue");
const inset = document.querySelector("#inset");


const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkitRule span");
const mozRule = document.querySelector("#mozRule span");

const boxShadow = new BoxShadowGenerator(horizontal,horizontalRef,vertical,verticalRef,blur,blurRef,spread,spreadRef,color,colorRef, boxColor,boxColorRef,opacity,opacityRef,inset,previewBox,rule,webkitRule,mozRule);



//Events
horizontal.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("horizontal", value);
})

horizontalRef.addEventListener("keyup", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("horizontal", value);
})

vertical.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("vertical", value);
})

verticalRef.addEventListener("keyup", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("vertical", value);
})

blur.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("blur", value);
})

blurRef.addEventListener("keyup", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("blur", value);
})

spread.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("spread", value);
})

spreadRef.addEventListener("keyup", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("spread", value);
})

color.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("color", value);
})

colorRef.addEventListener("keyup", (e) =>{
    var value = e.target.value;
    value.toUpperCase();
    boxShadow.updateValue("color", value);
})

boxColor.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("boxColor", value);
});

boxColorRef.addEventListener("keyup", (e) =>{
    var value = e.target.value;
    value.toUpperCase();
    boxShadow.updateValue("boxColor", value);
});

opacity.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("opacity", value);
});
opacityRef.addEventListener("keyup", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("opacity", value);
})

inset.addEventListener("input", (e) =>{
    const value = e.target.checked;

    boxShadow.updateValue("inset", value);
})

//Copy rule

const rulesArea = document.querySelector("#rulesArea");
const copyInstructions = document.querySelector("#copyInstructions");

rulesArea.addEventListener("click", (e) =>{
    const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");

    navigator.clipboard.writeText(rules).then(() =>{
        copyInstructions.innerText = "Rule copied successfully";

        setTimeout(() => {
            copyInstructions.innerText = "Click on the board above to copy the rules"
        }, 1000);
    });

    
});

//Initialize

boxShadow.iniatialize();



