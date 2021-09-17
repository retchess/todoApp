import React from 'react';

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

export { useLocalStorage }