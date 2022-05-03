const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render question
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <th>Question</th>
      <td>${doc.data().question}</td>
    </tr>
    <tr data-id='${doc.id}'>
      <th>A</th>
      <td>${doc.data().choice1}</td>
    </tr>
    <tr data-id='${doc.id}'>
      <th>B</th>
      <td>${doc.data().choice2}</td>
    </tr>
    <tr data-id='${doc.id}'>
      <th>C</th>
      <td>${doc.data().choice3}</td>
    </tr>
    <tr data-id='${doc.id}'>
      <th>D</th>
      <td>${doc.data().choice4}</td>
    </tr>
    <tr data-id='${doc.id}'>
      <th>Answer</th>
      <td>${doc.data().answer}</td>
    </tr>
    <tr data-id='${doc.id}'>
      <th>Edit Question</th>
      <td>
        <button class="btn btn-edit btn-warning" data-bs-toggle="modal" data-bs-target="#modal-edit">Edit</button>
        <button class="btn btn-delete btn-danger">Delete</button>
      </td><tr></tr>
    </tr>
    
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);

  // Click edit question
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.question.value = doc.data().question;
    editModalForm.choice1.value = doc.data().choice1;
    editModalForm.choice2.value = doc.data().choice2;
    editModalForm.choice3.value = doc.data().choice3;
    editModalForm.choice4.value = doc.data().choice4;
    editModalForm.answer.value = doc.data().answer;
  });

  // Click delete question
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('users').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}

// Click add user button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

  addModalForm.question.value = '';
  addModalForm.choice1.value = '';
  addModalForm.choice2.value = '';
  addModalForm.choice3.value = '';
  addModalForm.choice4.value = '';
  addModalForm.answer.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});

// Get all users
// db.collection('users').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderUser(doc);
//   })
// });

// Real time listener
db.collection('users').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').add({
    question: addModalForm.question.value,
    choice1: addModalForm.choice1.value,
    choice2: addModalForm.choice2.value,
    choice3: addModalForm.choice3.value,
    choice4: addModalForm.choice4.value,
    answer: addModalForm.answer.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').doc(id).update({
    question: editModalForm.question.value,
    choice1: editModalForm.choice1.value,
    choice2: editModalForm.choice2.value,
    choice3: editModalForm.choice3.value,
    choice4: editModalForm.choice4.value,
    answer: editModalForm.answer.value,
  });
  editModal.classList.remove('modal-show');
  
});

const logoutItems = document.querySelectorAll('.logged-out');
const loginItems = document.querySelectorAll('.logged-in');

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