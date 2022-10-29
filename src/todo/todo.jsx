import React, { useRef, useState } from "react";
import { Createtodo } from "./createtodo/createtodo";
import { TodoItem } from "./todoitem/todoitem";
import { dayWeekBoard } from "./constans";

export function Todo() {
    const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("todos")) || dayWeekBoard)
    const [text, setText] = useState("");
    const [value, setValue] = useState("");
    const [change, setChange] = useState(false);
    const [editText, setEditText] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const createTodoRef = useRef();

    return (
        <>
            <Createtodo
                boards={boards}
                setBoards={setBoards}
                text={text}
                setText={setText}
                setErrorMessage={setErrorMessage}
                value={value}
                setValue={setValue}
                createTodoRef={createTodoRef}
                errorMessage={errorMessage}
                change ={change}
                setChange = {setChange}
            />
            <TodoItem
                setEditText={setEditText}
                editText={editText}
                change={change}
                setChange={setChange}
                boards={boards}
            />
        </>
    )
}