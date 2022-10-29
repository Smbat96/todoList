import React, { useState } from "react";
import { handleDeleteTodo, handleEditOrSave, handleIsComplited } from "../constans";
import { dragStart, allowDrop, drop, dropTodo } from "../constans";
import "./todoitem.css"

export function TodoItem({
    setEditText,
    editText,
    change,
    setChange,
    boards
}) {

    const [currentItem, setCurrentItem] = useState(null)
    const [curretnVal, setCurrentVal] = useState(null)

    return (
        <div className="daysboardsector">
            {boards.map(item => {
                return (
                    <div
                        key={item.id}
                        onDrop={(e) => dropTodo(e, item, curretnVal, currentItem, setChange, change, boards)}
                        onDragOver={(e) => allowDrop(e)}
                        className="dayboard">
                        <div className="title-and-statistics">
                            <h2>{item.title}</h2>
                            <p className="statistics-text">
                                {`${item.todos.filter(val => val.isCompleted).length}/${item.todos.length}`}
                            </p>
                        </div>
                        <div
                            className="todos"
                            id={item.id}>
                            <hr></hr>
                            {!(item.todos.length === 0)
                                ? item.todos.map(val => {
                                    return (
                                        <div
                                            id={val.id}
                                            draggable={true}
                                            onDrop={(e) => drop(e, item, val, currentItem, curretnVal, boards)}
                                            onDragOver={(e) => allowDrop(e)}
                                            onDragStart={(e) => dragStart(e, item, val, setCurrentItem, setCurrentVal)}
                                            key={val.id}
                                            className="todo">
                                            <div className="todo-section">
                                                    <input
                                                        style={{
                                                            width: "20px",
                                                            height: "20px",
                                                            marginTop: "2px"
                                                        }}
                                                        onChange={() => handleIsComplited(item.id, val.id, setChange, change, boards)}
                                                        checked={val.isCompleted}
                                                        type="checkbox" />
                                                {!val.isEdited
                                                    ? <p
                                                    onClick={() => handleIsComplited(item.id, val.id, setChange, change, boards)} 
                                                    className="todo-text">{val.title}</p>
                                                    : <input
                                                        style={{
                                                            marginLeft: "13px",
                                                            height: "26px",
                                                        }}
                                                        type="text"
                                                        onChange={(e) => setEditText(e.target.value)}
                                                        value={editText} />}
                                            </div>
                                            <div className="buttons-section">
                                                <button
                                                    className="edit-button"
                                                    onClick={() => handleEditOrSave(item.id, val.id, editText, setChange, change, setEditText, boards)}>
                                                    {!val.isEdited
                                                        ? "Edit"
                                                        : "Save"}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTodo(item.id, val.id, setChange, change, boards)}
                                                    className="delete-button">
                                                    Delete
                                                </button>
                                            </div>
                                            <hr></hr>
                                        </div>
                                    )
                                })
                                : <p className="no-todo">You didn't add ToDo</p>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}