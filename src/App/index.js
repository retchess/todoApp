import react from 'react';
import React from 'react';
import { AppUI } from './AppUI';

function useLocalStorage(itemName, initialValue) {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [item, setItem] = React.useState(initialValue)

    React.useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(itemName)
                let parsedItem
                //Verifico si estan vacios los todos
                if (!localStorageItem) {
                    //inicializo el array de local storage si no existe
                    localStorage.setItem(itemName, JSON.stringify(initialValue))
                    parsedItem = initialValue
                } else {
                    parsedItem = JSON.parse(localStorageItem)
                }
                setItem(parsedItem)
                setLoading(false)
            } catch (error) {
                setError(error)
            }
        }, 1000);
    })

    //Comunicar el estado con el back de los todos cuando
    // elimino o completo un todo
    const saveItem = (newItems) => {
        try {
            const stringifiedItems = JSON.stringify(newItems)
            localStorage.setItem(itemName, stringifiedItems)
            setItem(newItems)
        }
        catch (error) {
            setError(error)
        }
    }
    return {
        item,
        saveItem,
        loading,
        error
    }
}

function App() {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error
    } = useLocalStorage('TODOS_V1', [])
    const [searchValue, setSearchValue] = react.useState('')
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
        <AppUI
            loading={loading}
            error={error}
            totalTodos={totalTodos}
            completedTodos={completedTodos}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchedTodos={searchedTodos}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
        />
    );
}

export default App;

