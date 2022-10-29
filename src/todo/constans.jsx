import { v4 } from "uuid";


export const dayWeekBoard = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(item => {
    return {
        title: item,
        id: v4(),
        todos: [],
    }
});

export function dragStart(e, item, val, setCurrentItem, setCurrentVal) {
    setCurrentItem(item);
    setCurrentVal(val);
};

export function allowDrop(e) {
    e.preventDefault();
};

export function drop(e, item, val, currentItem, curretnVal, boards) {
    e.preventDefault()
    const currentIndex = currentItem.todos.indexOf(curretnVal)
    currentItem.todos.splice(currentIndex, 1)
    const dropIndex = item.todos.indexOf(val)
    item.todos.splice(dropIndex + 1, 0, curretnVal)
    item.todos = item.todos.map(value => {
        if (value.id === item.id) {
            return item
        }
        if (value.id === currentItem.id) {
            return currentItem
        }
        return value
    })
    localStorage.setItem("todos", JSON.stringify(boards))
};

export function dropTodo(e, item, curretnVal, currentItem, setChange, change, boards) {
    item.todos.push(curretnVal)
    const currentIndex = currentItem.todos.indexOf(curretnVal)
    currentItem.todos.splice(currentIndex, 1)
    setChange(!change)
    localStorage.setItem("todos", JSON.stringify(boards))
};

export function handleAddClick(value, text, setErrorMessage, createTodoRef, setText, boards) {
    boards.forEach(item => {
        if (!text) {
            setErrorMessage("You didn't type the text")
            setTimeout(() => {
                setErrorMessage("")
            }, 3000)
            createTodoRef.current.focus()
            return
        }
        if (item.title === value) {
            item.todos = item.todos.concat((
                {
                    title: text,
                    id: v4(),
                    isCompleted: false,
                    isEdited: false,
                }))
            createTodoRef.current.focus()
            setText("")

            localStorage.setItem('todos', JSON.stringify((JSON.parse(localStorage.getItem('todos')) || []).concat(item)))
            localStorage.setItem("todos", JSON.stringify(boards))
        }
    })
};

export function handleDeleteTodo(itemId, valId, setChange, change, boards) {
    boards.forEach(item => {
        if (item.id === itemId) {
            item.todos = item.todos.filter(val => val.id !== valId)
            setChange(!change)
            localStorage.setItem("todos", JSON.stringify(boards))
        }
    })
};

export function handleEditOrSave(itemId, valId, editText, setChange, change, setEditText, boards) {
    boards.forEach(item => {
        if (item.id === itemId) {
            item.todos.forEach(val => {
                if (val.id === valId) {
                    val.title = editText
                    val.isEdited = !val.isEdited
                    setChange(!change)
                    setEditText(editText)
                    localStorage.setItem("todos", JSON.stringify(boards))
                }
            })
        }
    })
};

export function handleIsComplited(itemId, valId, setChange, change, boards) {
    boards.forEach(item => {
        if (item.id === itemId) {
            item.todos.forEach(val => {
                if (val.id === valId) {
                    val.isCompleted = !val.isCompleted
                    setChange(!change)
                    localStorage.setItem("todos", JSON.stringify(boards))
                }
            })
        }
    })
};

export function handleDeleteThasks(boards, change, setChange) {
    boards.forEach(item => {
        item.todos = item.todos.filter(val => !val.isCompleted)
        setChange(!change)
        localStorage.setItem("todos", JSON.stringify(boards))
    })
}
