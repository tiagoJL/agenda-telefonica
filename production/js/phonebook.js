import {ToastNotification} from "./toast-notification.js"

export class PhoneBook {
    constructor(){
        this.nameId = "#nome"
        this.phoneId = "#telefone"
        this.relationshipCssSelector = "[name='relacionamento']:checked"
        this.register = this.loadData()
        this.table = new TablePhoneBook()
        this.table.update(this.register.contacts)
        this.addEventToRemoveRow()
    }

    loadData(){
        const register = localStorage.getItem("register")
        return register != null ? JSON.parse(register): {
            names: [], phones: [], contacts: []
        }
    }

    loadContacts() {
        this.name = document.querySelector(this.nameId)
        this.phone = document.querySelector(this.phoneId)
        this.relationship = document.querySelector(this.relationshipCssSelector)
        this.nameValue = this.name.value.trim()
        this.phoneValue = this.phone.value
        this.relationshipValue = this.relationship.value
    }

    isContatcValid(){
        const isUnicName = !this.register.names.includes(this.nameValue)
        const isUnicPhone = !this.register.phones.includes(this.phoneValue)
        const isAllUnic = isUnicName && isUnicPhone
        const isValidName = this.name.checkValidity()
        const isValidPhone = this.phone.checkValidity()
        const isAllValid = isValidName && isValidPhone

        if (!isValidName) {
            new ToastNotification("Padrão de nome inválido.", "attention").showMessage()
        }

        if (!isValidPhone) {
            new ToastNotification("Padrão de telefone inválido.", "attention").showMessage()
        }

        if (!isUnicName && isUnicPhone){
            new ToastNotification("Nome já registrado.", "error").showMessage()
        }

        if (!isUnicPhone && isUnicName){
            new ToastNotification("Telefone já registrado.", "error").showMessage()
        }

        if (!isUnicPhone && !isUnicName){
            new ToastNotification("Contato já registrado.", "error").showMessage()
        }

        return isAllUnic && isAllValid
    }

    removeContact(index){

        let names = this.register.names
        let phones = this.register.phones
        let contacts = this.register.contacts
        let length = names.length

        this.register.names = names.slice(0, index).concat(names.slice(index+1, length))
        this.register.phones = phones.slice(0, index).concat(phones.slice(index+1, length))
        this.register.contacts = contacts.slice(0, index).concat(contacts.slice(index+1, length))

        const registerJson = JSON.stringify(this.register)
        localStorage.setItem("register", registerJson)
        this.table.clearTable()
        this.table.update(this.register.contacts)
        this.addEventToRemoveRow()
    }

    addEventToRemoveRow() {
        return
        // const buttonsRemove = document.querySelectorAll("[name='remover']")
        // if (!buttonsRemove) {return}
        // buttonsRemove.forEach(button => {
        //     button.addEventListener("click", (e) => {
        //     const index = +e.currentTarget.dataset.index
        //     this.removeContact(index)})
        // })
    }

    setContact(){
        this.loadContacts()
        const isContatcValid = this.isContatcValid()
        if (isContatcValid) {
            new ToastNotification("Contato adicionado com sucesso.", "success").showMessage()
            this.register.names.push(this.nameValue)
            this.register.phones.push(this.phoneValue)
            this.register.contacts.push([
                this.nameValue, this.phoneValue, this.relationshipValue]
            )
            this.table.showNewDataOnTable(
                this.nameValue,
                this.phoneValue,
                this.relationshipValue,
                this.register.contacts.length
            )
            const registerJson = JSON.stringify(this.register)
            localStorage.setItem("register", registerJson)
            this.name.value = ""
            this.phone.value = ""
            this.addEventToRemoveRow()
        }
    }
}


class TablePhoneBook {
    constructor(){
        const tbodyCssSelector = ".main__table__body"
        this.rowCssClass = "main__table__row"
        this.tdCssClass = "main__table__content"
        const outputCssSelector = ".output"
        this.tbody = document.querySelector(tbodyCssSelector)
        this.output = document.querySelector(outputCssSelector)
    }

    showNewDataOnTable(name, phone, relationship, length){
        const html = `
        <tr class="${this.rowCssClass}">
            <td class="${this.tdCssClass}">${length}</td>
            <td class="${this.tdCssClass}">${name}</td>
            <td class="${this.tdCssClass}">${phone}</td>
            <td class="${this.tdCssClass}">${relationship}</td>
            <td class="${this.tdCssClass}"><button onclick="phoneBook.removeContact(${length-1})" class="remover" data-index="${length-1}" name="remover">Remover</button></td>
        </tr>
        `
        this.tbody.insertAdjacentHTML("beforeend", html)
        this.output.textContent = length
    }

    clearTable(){
        const allRowsAvailableCssSelector = "tbody .main__table__row:nth-child(1n+2)"
        const allRows = document.querySelectorAll(allRowsAvailableCssSelector)
        allRows.forEach(row => {row.remove()})
        return
    }

    update(phoneBookData){
        const isPhoneBookDataValid = phoneBookData.length > 0
        if (!isPhoneBookDataValid) {return}

        for (let data in phoneBookData){

            const name = phoneBookData[data][0]
            const phone = phoneBookData[data][1]
            const relationship = phoneBookData[data][2]

            const html = `
            <tr class="${this.rowCssClass}">
                <td class="${this.tdCssClass}">${+data+1}</td>
                <td class="${this.tdCssClass}">${name}</td>
                <td class="${this.tdCssClass}">${phone}</td>
                <td class="${this.tdCssClass}">${relationship}</td>
                <td class="${this.tdCssClass}"><button class="remover" data-index="${data}" name="remover" onclick="phoneBook.removeContact(${data})" >Remover</button></td>
            </tr>
            `
            this.tbody.insertAdjacentHTML("beforeend", html)
            this.output.textContent = phoneBookData.length
        }
    }
}