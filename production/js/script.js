import {PhoneBook} from "./phonebook.js"
import {RegexMask} from "./mascaras-regex.js"

new RegexMask()
const phoneBook = new PhoneBook()

const buttonAdd = document.querySelector("[name='adicionar']")

buttonAdd.addEventListener("click", () => {phoneBook.setContact()})
