import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue, 
         remove } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-d6ec7-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "items")

const input = document.getElementById("input")
const inputBtn = document.getElementById("input-btn")
const itemList = document.getElementById("items")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `<div class="itemlist">${leads[i]}</div>`
    }
    itemList.innerHTML = listItems 
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, input.value)
    input.value = ""
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    itemList.innerHTML = ""
})