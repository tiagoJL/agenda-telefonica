import {PhoneBook} from "./phonebook.js"
import {RegexMask} from "./mascaras-regex.js"

new RegexMask()
window.phoneBook = new PhoneBook()

const buttonAdd = document.querySelector("[name='adicionar']")

buttonAdd.addEventListener("click", () => {phoneBook.setContact(); scrollTo({top: 0, behavior: "smooth"})})
