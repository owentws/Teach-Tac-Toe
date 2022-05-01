const form = document.querySelector('#add-todo-form');
form.addEventListener('submit', addList);

const ref = firebase.database().ref("UserList");

function addList(event){
    // prevent default submission
    event.preventDefault();
    let title = document.getElementById("title").value;
    console.log(title)
    let choice1 = document.getElementById("choice1").value;
    console.log(choice1)
    let choice2 = document.getElementById("choice2").value;
    console.log(choice2)
    let choice3 = document.getElementById("choice3").value;
    console.log(choice3)
    let choice4 = document.getElementById("choice4").value;
    console.log(choice4)

    const currentUser = firebase.auth().currentUser;
    ref.child(currentUser.uid).push({
        title: title,
        choice1: choice1,
        choice2: choice2,
        choice3: choice3,
        choice4: choice4
    });

    console.log('Add list complete!')
    document.getElementById("title").value = '';
    document.getElementById("choice1").value = '';
    document.getElementById("choice2").value = '';
    document.getElementById("choice3").value = '';
    document.getElementById("choice4").value = '';
};

function ReadList(snapshot){
    document.getElementById("name-list").innerHTML = ``;
    snapshot.forEach((data) => {
        const id = data.key;
        const title = data.val().title;
        const choice1 = data.val().choice1;
        const choice2 = data.val().choice2;
        const choice3 = data.val().choice3;
        const choice4 = data.val().choice4;
        const newDiv = 
        `<li class="list-group-item d-flex justify-content-between align-item-star">
            <div class="ms-2 me-auto">${title}</div>
                <span>
                    <button type="button" class="btn btn-outline-danger btn-delete" data-id="${id}">
                        <i class="bi bi-trash3"></i>
                    </button>
                </span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-item-star">
            <div class="ms-2 me-auto">A : ${choice1}</div>               
        </li>
        <li class="list-group-item d-flex justify-content-between align-item-star">
            <div class="ms-2 me-auto">B : ${choice2}</div>               
        </li>
        <li class="list-group-item d-flex justify-content-between align-item-star">
            <div class="ms-2 me-auto">C : ${choice3}</div>               
        </li>
        <li class="list-group-item d-flex justify-content-between align-item-star">
            <div class="ms-2 me-auto">D : ${choice4}</div>               
        </li><br>
        `;
        const newElement = document.createRange().createContextualFragment(newDiv);
        document.getElementById("name-list").appendChild(newElement)
    });
    document.querySelectorAll("button.btn-delete").forEach(btn => {
        btn.addEventListener("click", deleteList);
    });
}

function deleteList(event){
    const id = event.currentTarget.getAttribute('data-id');
    const currentUser = firebase.auth().currentUser;
    ref.child(currentUser.uid).child(id).remove();
    console.log(`delete on id: ${id}`);
}

function getList(user){
    if (user){
        ref.child(user.uid).on("value", (data) => {
            ReadList(data);
        })
    }
}

/*ref.on("value", (data) => {
     ReadList(data)
})*/

const logoutItems = document.querySelectorAll('.logged-out')
const loginItems = document.querySelectorAll('.logged-in')

function setupUI(user){
    if(user){
        loginItems.forEach(item => item.style.display = 'block')
        logoutItems.forEach(item => item.style.display = 'none')
    }
    else{
        loginItems.forEach(item => item.style.display = 'none')
        logoutItems.forEach(item => item.style.display = 'block')
    }
}