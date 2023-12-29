//Elementos
const notesContainer = document.querySelector("#notesContainer");

const noteInput = document.querySelector("#noteContent");

const addBtn = document.querySelector(".addNote");

const searcInput = document.querySelector("#searchInput");

const exportBtn = document.querySelector("#exportNotes");

//Funções

function showNotes(){
    cleanNotes();
    
    getNotes().forEach((note) => {
        const element = createNote(note.id, note.content, note.fixed);

        notesContainer.appendChild(element);
    });
}
function addNote(){
    const notes = getNotes();
    const noteObj= {
        id: generateId(),
        content: noteInput.value,
        fixed: false
    };

    const noteElement = createNote(noteObj.id, noteObj.content);

    notesContainer.appendChild(noteElement);

    notes.push(noteObj);

    noteInput.value = "";

    saveNotes(notes);
}


function generateId(){
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed){

    const element = document.createElement("div");

    element.classList.add("note");

    const textArea = document.createElement("textarea");

    textArea.value = content;

    textArea.placeholder = "Adicione algum texto";

    element.appendChild(textArea);

    const pinIcon = document.createElement("i");

    pinIcon.classList.add(...["bi","bi-pin"])

    element.appendChild(pinIcon);

    const deletIcon = document.createElement("i");

    deletIcon.classList.add(...["bi","bi-x-lg"])

    element.appendChild(deletIcon);

    const duplicateIcon = document.createElement("i");

    duplicateIcon.classList.add(...["bi","bi-file-earmark-plus"])

    element.appendChild(duplicateIcon);

    if(fixed){
        element.classList.add("fixed");
        
    }

    //Eventos do elemento

    element.querySelector("textarea").addEventListener("keyup",(e) =>{
        const noteContent = e.target.value;

        editNote(id, noteContent);
    })

    element.querySelector(".bi-pin").addEventListener("click", () =>{
       toggleFixNotes(id);
    })

    element.querySelector(".bi-x-lg").addEventListener("click", () =>{
        removeNote(id, element);
    })

    element.querySelector(".bi-file-earmark-plus").addEventListener("click", () =>{
        duplicateNote(id);
    })

    return element;

    function editNote(id, content){
        const notes = getNotes();

        const targetNote = notes.filter((note) => note.id == id)[0];

        targetNote.content = content;

        saveNotes(notes);
    }

    function toggleFixNotes(id){
        const notes = getNotes();

        const targetNote = notes.filter((note) => note.id == id)[0];

        targetNote.fixed = !targetNote.fixed;

        saveNotes(notes);

        showNotes();
    }

    function removeNote(id, element){
        const notes = getNotes().filter((note) => note.id !== id)

        saveNotes(notes);
        notesContainer.removeChild(element);

    }

    function duplicateNote(id){
        const notes = getNotes();

        const targetNote = notes.filter((note) => id === note.id)[0];

        const newNote = {
            id: generateId(),
            content: targetNote.content,
            fixed: false
        };

        const noteElement = createNote(newNote.id, newNote.content, newNote.fixed);

        notesContainer.appendChild(noteElement);

        notes.push(newNote);
        saveNotes(notes);

    }
}   


function cleanNotes(){
    notesContainer.replaceChildren([]);
}

function exportData(){
    const notes = getNotes();

    const csvString =[
        ["ID", "Content", "Fixed?"],
        ...notes.map((note) => [note.id, note.content, note.fixed])
    ].map((e) => e.join(";")).join("\n");

   const element = document.createElement("a");
   
   element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);

   element.target = "_blank";

   element.download = "notes.csv";

   element.click();

   document.removeChild(element);

}
//Local Storage
function getNotes(){
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const orderedNotes = notes.sort((a, b) => a.fixed > b.fixed ? -1 : 1);

    return orderedNotes;
}

function saveNotes(notes){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function searchNotes(search){
    const searchResults = getNotes().filter((note) =>  note.content.includes(search))

    if(search !== ""){
        cleanNotes();

        searchResults.forEach((note) =>{
            const searchedNote = createNote(note.id, note.content, note.fixed);

            notesContainer.appendChild(searchedNote);
        });

        return;
    }

    showNotes();
}
//Eventos

addBtn.addEventListener("click",() => addNote());

noteInput.addEventListener("keydown", (e) =>{
    if(e.key === "Enter" && !(e.target.value == "")){
        addNote();
    }
})

searcInput.addEventListener("keyup", (e) => {
 const search = e.target.value;

 searchNotes(search);
})

exportBtn.addEventListener("click", (e) =>{
    exportData();
})

//Inicialização
showNotes();