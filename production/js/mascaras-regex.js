export class RegexMask {
    constructor(){
        this.setPhoneMask()
        this.setNameContactMask()
    }

    addMask(fieldElementCss, functionName, attributes) {
        document.querySelectorAll(fieldElementCss).forEach(

            field => {
                Object.assign(field, attributes)
                if (attributes.maxlength) {
                    field.setAttribute("maxlength", attributes.maxlength)
                }
                field.addEventListener("keyup", () => {functionName(field)})
            }
        )
    }

    nameContactMask(field){
        const firstFilter = field.value.replace(/(\d|\s)*(\D*\d*)/gi, "$2")
        const secondFilter = firstFilter.replace(/(\s{2,})/, "")
        field.value = secondFilter
    }

    setNameContactMask(){
        const attributes = {
            pattern: "[a-zA-Z]{4,}[0-9a-zA-Z]*\\s*([a-zA-Z]+[0-9a-zA-Z]*)?",
            placeholder: "James",
            required: true,
            autocomplete: 'off',
            type: "text",
            maxlength: 15
            
        }
        const cssSelector = ".regx-mask-nameContact"
        this.addMask(cssSelector, this.nameContactMask, attributes)
    }

    phoneMask(field){
        const firstFilter = field.value.replace(/\D/g, "")
        const secondFilter = firstFilter.replace(/([0-9]{2})([0-9])/, "($1) $2")
        const thirdFilter = secondFilter.replace(/(\s[0-9])([0-9])/, "$1.$2")
        const fourthFilter = thirdFilter.replace(/([0-9]{4})([0-9])/, "$1-$2")
        const finalFilter = fourthFilter.replace(/(-[0-9]{4})(.*)/, "$1")
        field.value = finalFilter
    }

    setPhoneMask(){
        const attributes = {
            pattern: "\\([0-9]{2}\\)\\s[0-9]\.[0-9]{4}-[0-9]{4}",
            placeholder: "(00) 0.0000-0000",
            required: true,
            autocomplete: 'off',
            type: "tel",
            maxlength: 16
        }
        const cssSelector = ".regx-mask-phone"
        this.addMask(cssSelector, this.phoneMask, attributes)
    }
}
