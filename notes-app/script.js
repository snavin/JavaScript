const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes=document.querySelectorAll(".input-box");

function showNotes()
{
    notesContainer.innerHTML = localStorage.getItem("data");
}

function updateStorage()
{
    localStorage.setItem("data",notesContainer.innerHTML);
    //localStorage.clear();
}

showNotes();

createBtn.addEventListener("click",()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className="input-box";
    inputBox. setAttribute("contenteditable","true");
    img.src="images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

notesContainer.addEventListener("click",(e)=>{
        if(e.target.tagName === "IMG"){
            e.target.parentElement.remove();
            updateStorage();
        }
        else if(e.target.tagName==="P")
        {
            let notes=document.querySelectorAll(".input-box");
            notes.forEach((nt)=>
            {
                nt.onkeyup = function()
                {
                    updateStorage();
                }
            })
        }
})

document.addEventListener("keydown",event=>{
    if(event.key === "Enter")
    {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }

})

