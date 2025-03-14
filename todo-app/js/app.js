document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addNewLink = document.querySelector('.add-new');
    
    const todoApp = new Todo();

    renderTodos();

    addNewLink.addEventListener('click', () => {
        const todo = todoApp.addTodo();
        const newTodoElement = renderTodoItem(todo);
        const inputField = newTodoElement.querySelector('.todo-text');
        inputField.readOnly = false;
        inputField.focus();
    });

    function renderTodos() {
        todoList.innerHTML = '';
        const todos = todoApp.getTodos();
        todos.forEach(todo => {
            renderTodoItem(todo);
        });
    }
    
    function renderTodoItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.dataset.id = todo.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');
        checkbox.checked = todo.completed;

        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('todo-text');
        input.value = todo.text;
        input.readOnly = true;
        if (todo.completed) {
            input.classList.add('completed');
        }

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('todo-actions');

        const editButton = document.createElement('button');
        editButton.classList.add('todo-edit');
        editButton.innerHTML = '<i class="fas fa-pen"></i>';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('todo-delete');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);
        
        li.appendChild(checkbox);
        li.appendChild(input);
        li.appendChild(actionsDiv);
        
        todoList.appendChild(li);
        
        checkbox.addEventListener('change', () => {
            todoApp.toggleComplete(todo.id);
            input.classList.toggle('completed');
            li.classList.toggle('completed'); 
        });

        editButton.addEventListener('click', () => {
            input.readOnly = !input.readOnly;
            input.focus();
            if (input.readOnly) {
                todoApp.updateTodo(todo.id, input.value);
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                input.readOnly = true;
                todoApp.updateTodo(todo.id, input.value);
            }
        });

        input.addEventListener('blur', () => {
            if (!input.readOnly) {
                input.readOnly = true;
                todoApp.updateTodo(todo.id, input.value);
            }
        });

        deleteButton.addEventListener('click', () => {
            todoApp.deleteTodo(todo.id);
            li.remove();
        });
        
        return li;
    }
});