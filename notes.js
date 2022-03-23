let btn = document.getElementById('btn');
btn.addEventListener('click', fun1);
let noteContainer = document.querySelector('.containNotes');
let st = new Set();
let NoteArr = JSON.parse(localStorage.getItem('Note'));
let timeArr = JSON.parse(localStorage.getItem('time'));
let dateArr = JSON.parse(localStorage.getItem('date'));
let titleArr = JSON.parse(localStorage.getItem('title'));
let color = ["orange", "gray", "rgb(226, 26, 26)", "yellow", "rgb(211, 51, 19)", "violet", "blue", "rgb(212, 68, 68)"]
let rotate = [5, -5];

function Empty() {
    if (noteContainer.value == undefined) {
        noteContainer.innerHTML = `<span id="empty">-- Empty --</span>`;
        let empty = document.getElementById('empty');
        empty.style.fontSize = "50px";
        empty.style.textShadow = "1px 2px blue";
    }
}
if (NoteArr == null) {
    NoteArr = [];
    timeArr = [];
    dateArr = [];
    titleArr = [];
    Empty();

} else {
    showNotes(NoteArr);
}
let title = document.querySelector('.title');
console.log(title);
title.addEventListener('click', setTitle);

function setTitle() {
    let newTitle = document.createElement('textarea');
    newTitle.setAttribute('class', 'title');
    // newTitle.setAttribute('contenteditable', 'true');
    let input = document.getElementById('input');
    console.log(input);
    input.replaceChild(newTitle, title);

}




function fun1() {

    let note = document.getElementById('areatxt');
    let title = document.querySelector('.title');
    console.log(title.value);
    NoteArr.push(note.value);
    if (title.value == undefined) {
        titleArr.push("Title");
    } else {
        titleArr.push(title.value);
    }
    note.value = "";
    title.value = "Title";
    title.addEventListener('click', function() {
        let newTitle = document.createElement('textarea');
        newTitle.setAttribute('class', 'title');
        // newTitle.setAttribute('contenteditable', 'true');
        let input = document.getElementById('input');
        input.replaceChild(newTitle, title);
    });
    let wholeDate = getDate();
    let Time = getTime();
    dateArr.push(wholeDate);
    timeArr.push(Time);
    localStorage.setItem('Note', JSON.stringify(NoteArr));
    localStorage.setItem('date', JSON.stringify(dateArr));
    localStorage.setItem('time', JSON.stringify(timeArr));
    localStorage.setItem('title', JSON.stringify(titleArr));;

    showNotes(NoteArr);

}

function getDate() {
    let wholeDate = "";
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    wholeDate += String(day) + '/' + String(month) + '/' + String(year);
    return wholeDate;

}

function getTime() {
    let Time = ""
    let date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    Time += String(hr) + ':' + String(min) + ':' + String(sec);
    return Time;
}

function showNotes(stickArr) {

    let html = ""
    let ridx = 0;
    let cidx = 0;
    let index = 0;


    let timeArr = JSON.parse(localStorage.getItem('time'));
    let dateArr = JSON.parse(localStorage.getItem('date'));

    let id = [];
    for (let i = 0; i < NoteArr.length; ++i) {
        if (st.has(i) == 0) {
            id.push(i);
        }
    }
    console.log(stickArr);
    console.log(titleArr);
    stickArr.forEach(function(ele) {
        let dateee = dateArr[id[index]];
        let timeee = timeArr[id[index]];
        let title = titleArr[id[index]];
        console.log(dateee, timeee);
        html += `<div class="sticky">
                <h3>${title}
                <br>
                <span class="datetime">${dateee}</span>
                <span class="datetime">${timeee}</span>
                </h3>
              
                <section>${ele}</section>
                <button class="delete" onclick=Delete(${id[index]})>Delete Note</button>
            </div>`;
        index += 1;
    })

    noteContainer.innerHTML = html;
    let sticky = document.getElementsByClassName('sticky');
    Array.from(sticky).forEach(function(ele) {
        ele.style.transform = `rotate(${rotate[ridx]}deg)`;
        ele.style.backgroundColor = color[cidx];
        ridx = (ridx + 1) % 2;
        cidx = (cidx + 1) % 8;
    })
}

function Delete(index) {
    NoteArr = JSON.parse(localStorage.getItem('Note'));
    NoteArr.splice(index, 1);
    timeArr.splice(index, 1);
    dateArr.splice(index, 1);
    titleArr.splice(index, 1);
    localStorage.setItem('Note', JSON.stringify(NoteArr));
    localStorage.setItem('date', JSON.stringify(dateArr));
    localStorage.setItem('time', JSON.stringify(timeArr));
    localStorage.setItem('title', JSON.stringify(titleArr));
    NoteArr = JSON.parse(localStorage.getItem('Note'));
    showNotes(NoteArr);
    if (NoteArr.length == 0) {
        Empty();
    }

}


//searching for a note 

let search = document.getElementById('enter');
search.addEventListener('click', searchNote);

function searchNote() {
    let searchnode = document.getElementById('search');
    NoteArr = JSON.parse(localStorage.getItem('Note'));
    let newNote = [];
    let id = [];
    let idx = 0;
    NoteArr.forEach(function(element) {
        let lower = element.toLowerCase();
        if (element.includes(searchnode.vale) || lower.includes(searchnode.value)) {
            newNote.push(element);

        } else {
            st.add(idx);
        }

        idx += 1;
    })
    showNotes(newNote);
    st.clear();

}

// for deleting the whole notes

function deleteAll() {
    localStorage.clear();
    NoteArr = [];
    timeArr = [];
    dateArr = [];
    titleArr = []
    showNotes(NoteArr);
    Empty();

}