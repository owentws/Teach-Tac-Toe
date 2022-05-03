const form = document.querySelector('#add-todo-form');
form.addEventListener("submit", addList);

const ref = firebase.database().ref("UserList");

function addList(event) {
	event.preventDefault();
	let title = document.getElementById("title").value;
	console.log(title)

	const currentUser = firebase.auth().currentUser;
	ref.child(currentUser.uid).push({
		title: title,
	});
	console.log('Add list complete!');
	document.getElementById("title").value = "";
}

function ReadList(snapshot){
	document.getElementById("name-list").innerHTML = ``;
	snapshot.forEach((data) => {
		const id = data.key;
		const title = data.val().title;
		const newDiv = `<li class="list-group-item d-flex justify-content-between align-item-star">
						<div class="ms-2 me-auto">${title}</div>
						<span><button type="button" class="btn btn-outline-danger btn-delete" data-id="${id}">
							<i class="bi bi-trash3"></i></button></span>
						</li>
						`
		const newElement = document.createRange().createContextualFragment(newDiv);
		document.getElementById("name-list").appendChild(newElement);
	});
	document.querySelectorAll("button.btn-delete").forEach(btn => {
		btn.addEventListener("click", deleteList);
	});
};

function deleteList(event){
	const id = event.currentTarget.getAttribute('data-id');
	const currentUser = firebase.auth().currentUser;
	ref.child(currentUser.uid).child(id).remove();
	console.log(`delete on id: ${id}`);
}
function getList(user){
	if (user) {
		ref.child(user.uid).on('value', (snapshot) => {
			ReadList(snapshot);
		})
	}
}
const logoutItems = document.querySelectorAll('.logged-out');
const loginItems = document.querySelectorAll('.logged-in');

function setupUI(user){
	if (user) {
		loginItems.forEach(item => item.style.display = 'inline-block');
		logoutItems.forEach(item => item.style.display = 'none');
	} else {
		loginItems.forEach(item => item.style.display = 'none');
		logoutItems.forEach(item => item.style.display = 'inline-block');
	}
}
