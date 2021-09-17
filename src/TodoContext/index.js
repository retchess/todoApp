import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext()

function TodoProvider(props) {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error
    } = useLocalStorage('TODOS_V1', [])
    const [searchValue, setSearchValue] = React.useState('')
    const completedTodos = todos.filter(todo => !!todo.completed).length
    const totalTodos = todos.length
    let searchedTodos = []

    //Filtrar busqueda
    if (searchValue.length >= 1) {
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase()
            const searchedText = searchValue.toLowerCase()
            return todoText.includes(searchedText)
        })
    }
    else {
        searchedTodos = todos
    }

    //Completar todos
    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text)
        const newTodo = [...todos]
        newTodo[todoIndex].completed = true
        saveTodos(newTodo)
    }
    //Delete todos
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text)
        const newTodo = [...todos]
        newTodo.splice(todoIndex, 1)
        saveTodos(newTodo)
    }
    return (
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
        }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export { TodoContext, TodoProvider }
