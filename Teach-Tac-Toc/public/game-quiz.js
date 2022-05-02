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
    // answer
    let answer1 = document.getElementById("answer1").value;
    console.log(answer1)
    let answer2 = document.getElementById("answer2").value;
    console.log(answer2)
    let answer3 = document.getElementById("answer3").value;
    console.log(answer3)
    let answer4 = document.getElementById("answer4").value;
    console.log(answer4)

    const currentUser = firebase.auth().currentUser;
    ref.child(currentUser.uid).push({
        title: title,
        choice1: choice1,
        choice2: choice2,
        choice3: choice3,
        choice4: choice4,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
    });

    console.log('Add list complete!')
    document.getElementById("title").value = '';
    document.getElementById("choice1").value = '';
    document.getElementById("choice2").value = '';
    document.getElementById("choice3").value = '';
    document.getElementById("choice4").value = '';
    document.getElementById("answer1").value = '';
    document.getElementById("answer2").value = '';
    document.getElementById("answer3").value = '';
    document.getElementById("answer4").value = '';
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
        const answer1 = data.val().answer1;
        const answer2 = data.val().answer2;
        const answer3 = data.val().answer3;
        const answer4 = data.val().answer4;


        const newDiv = 
        `<li class="list-group-item d-flex justify-content-between align-item-star">
            <div class="ms-2 me-auto"><!--input type="text" value="${title}" id="lock-question" style="width:500px" disabled-->
            <textarea rows="2" id="lock-question" style="width:500px" disabled>${title}</textarea></div>
                <span>
                    <button type="button" class="btn btn-outline-warning btn-edit" data-id="${id}" onclick="editQuestion()">
                        <i class="bi bi-pen"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-delete" data-id="${id}">
                        <i class="bi bi-trash3"></i>
                    </button>
                </span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-item-star">
            <div class="ms-2 me-auto">A : <input type="text" value="${choice1}" id="lock-question" style="width:500px" disabled>
            Answer : <select style="width:80px" disabled>
                            <option value="None" selected hidden>${answer1}</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                     </select>
            </div>
            <span>
                    
            </span>               
        </li>
        <li class="list-group-item d-flex justify-content-between align-item-star">
            <div class="ms-2 me-auto">B : <input type="text" value="${choice2}" id="lock-question" style="width:500px" disabled>
            Answer : <select style="width:80px" disabled>
            <option value="None" selected hidden>${answer2}</option>
            <option value="Yes" >Yes</option>
            <option value="No">No</option>
                    </select>
            </div>
            <span>
                    
            </span>               
        </li>
        <li class="list-group-item d-flex justify-content-between align-item-star">
            <div class="ms-2 me-auto">C : <input type="text" value="${choice3}" id="lock-question" style="width:500px" disabled>
            Answer : <select id="answer3" style="width:80px" disabled>
            <option value="None" selected hidden>${answer3}</option>
            <option value="Yes" >Yes</option>
            <option value="No">No</option>
                    </select>
            </div>
            <span>
                    
            </span>               
        </li>
        <li class="list-group-item d-flex justify-content-between align-item-star">
            <div class="ms-2 me-auto">D : <input type="text" value="${choice4}" id="lock-question" style="width:500px" disabled>
            Answer : <select id="answer4" style="width:80px" disabled>
                <option value="None" selected hidden>${answer4}</option>
                <option value="Yes" >Yes</option>
                <option value="No">No</option>
                    </select>
            </div>
            <span>
                    
            </span>              
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

/* New Function */
function editQuestion(){
    if(document.getElementById("lock-question").disabled = true){
        document.getElementById("lock-question").disabled = false;
    }
    else if(document.getElementById("lock-question").disabled = false){
        document.getElementById("lock-question").disabled = true;
    }
}
/*function editChoice(){
    if(document.getElementById("lock-choice").disabled = true){
        document.getElementById("lock-choice").disabled = false;
    }
    else{
        document.getElementById("lock-choice").disabled = true;
    }
}*/
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

