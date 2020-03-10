let InputValue = document.getElementById("todoinput");

let todoList = JSON.parse(localStorage.getItem('todoList'));;
let isDone = false;
let status = "DONE"
let checkboxStatus = false;

let addItem = () => {
    // JSON.parse(localStorage.getItem('todoList'));
    let todoValue = {
        value: InputValue.value,
        isDone,
        status
    };
    todoList.push(todoValue);
    Render();
}

let Render = () => {
    // console.log(JSON.parse(localStorage.getItem("todoList")));
    let HTMLtodoArray = todoList.map((item, index) => {
        return `<li id=${index} > ${item.value} ${item.isDone} <button class="btn btn-danger" onclick = "remove (${index})">
                X </button><button class="btn btn-success" id="DoneButton" onclick = "Done (${index})">${item.status}</button></li > `;
    }).join("");
    document.getElementById("resultArea").innerHTML = HTMLtodoArray;
    console.log(todoList);
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
Render();

let remove = (index) => {
    todoList.splice(index, 1);
    Render();
}

let Done = (index) => {
    todoList[index].isDone = !(todoList[index].isDone);
    if (todoList[index].isDone) { todoList[index].status = "DO THIS MAN" } else { todoList[index].status = 'DONE' }
    document.getElementById("DoneButton").innerHTML = todoList[index].status;
    if (todoList[index].isDone) {
        document.getElementById(`${index}`).style.setProperty("text-decoration", "line-through");
    }
    Render();
}


function filter_done(event) {
    return event.isDone == false;
}

let ShowDone = () => {
    checkboxStatus = !(checkboxStatus);
    if (checkboxStatus) {
        var filtered = todoList.filter(filter_done);
        console.log(filtered);
        let HTMLtodoArray = filtered.map((item, index) => {
            return `<li id=${index} > ${item.value} ${item.isDone} <button onclick = "remove (${index})">
                X </button><button id="DoneButton" onclick = "Done (${index})">${item.status}</button></li > `;
        }).join("");
        document.getElementById("resultArea").innerHTML = HTMLtodoArray;
    } else { Render() }
}