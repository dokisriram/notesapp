console.log('welcome to notesapp');
shownotes();
//if user adds a note, added to the local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    let myobj={
        title: addtitle.value,
        text: addtxt.value
    }

    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    addtitle.value = "";
    console.log(notesobj);
    shownotes();
});



// function to show elements from local storage
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
            </div>`;
    });
    let noteselm = document.getElementById('notes');
    if (notesobj.length != 0) {
        noteselm.innerHTML = html;
    } else {
        noteselm.innerHTML = `Nothing to show! Use Add a note section above to add notes`;
    }
}


// function to delete a note
function deletenote(index) {
    console.log('i am deleting', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
}


let search=document.getElementById('searchtxt');
search.addEventListener("input", function(){
    let inputval=search.value.toLowerCase();
    console.log('input event fired');
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardtxt=element.getElementsByTagName("p")[0].innerText;
        if(cardtxt.includes(inputval)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
        // console.log(cardtxt);
    })
});
