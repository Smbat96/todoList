import React from "react";
import { handleAddClick, handleDeleteThasks } from "../constans";
import "./createtodo.css"


export function Createtodo({
    boards,
    text,
    setText,
    setValue,
    value,
    createTodoRef,
    errorMessage,
    setErrorMessage,
    setChange,
    change
}
) {

    return (
        <div className="todo-sector">
            <div className="add-todo-sector">
                <h1>Todo List</h1>
                <div className="todo-input-sector">
                    <input
                        value={text}
                        ref={createTodoRef}
                        autoFocus={true}
                        onChange={(e) => setText(e.target.value)}
                        className="todo-input"
                        type="text"
                        placeholder="  Add your new Todo" />
                </div>
                <div className="button-sector">
                    <select
                        value={value}
                        onChange={(e) => setValue(e.target.value)}>
                        <option defaultValue>Choose the day of the week</option>
                        {
                            boards.map(item => {
                                return (
                                    <option
                                        key={item.id}>
                                        {item.title}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <button
                        onClick={() => handleAddClick(value, text, setErrorMessage, createTodoRef, setText, boards, setValue)}
                        className="add-button"
                    >Add
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => handleDeleteThasks(boards, change, setChange)}
                        className="delete-all"
                    >Delete all completed tasks
                    </button>
                </div>
                <div className="error-massage">
                    {errorMessage && (
                        <p className="error"> {errorMessage} </p>
                    )}
                </div>
            </div>
        </div>
    )
}