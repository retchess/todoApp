import React from 'react';
import './CreateTodoButton.css'
function CreateTodoButton() {
    const abrirModal = (msg) => {
        alert(msg)
    }
    return (
        <button
            className="CreateTodoButton"
            onClick={() => abrirModal('abrir modal2')}>
            +
        </button>
    )
}

export { CreateTodoButton };