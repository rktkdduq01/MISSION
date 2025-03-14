class Todo {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }

    addTodo(text = "") {
        const todo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date()
        };

        this.todos.push(todo);
        this.saveTodos();
        return todo;
    }

    updateTodo(id, newText) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText };
            }
            return todo;
        });
        this.saveTodos();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
    }

    toggleComplete(id) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        this.saveTodos();
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos() {
        return this.todos;
    }
}