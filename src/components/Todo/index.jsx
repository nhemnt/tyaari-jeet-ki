import React, { useReducer, useState } from 'react'


const initialState = {
    todos: [],
    showAdd: false,
    activeTodo: null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "add": {
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        }
        case "delete": {
            return {
                ...state,
                todos: state.todos.filter((_,index) => action.payload !== index)
            }
        }
        case "edit": {
            return {
                ...state,
                todos: state.todos.map((todo,index) => {
                    return action.payload.index === index ? action.payload.text : todo
                }),
                activeTodo: null
            }
        }
        case "toggle": {

        }
        case "updateAddModal": {
            return { ...state, showAdd: action.payload }
        }
        case "updateActiveTodo": {
            return { ...state, activeTodo: action.payload }
        }

        default: throw new Error()
    }
}

const AddTodo = ({ close, addTodo, activeTodo }) => {
    const [text, setText] = useState(activeTodo || "")
    const onSubmit = (e) => {
        e.preventDefault();
        addTodo(text);
        close();
    }
    return (<div className='modal show d-block' tabindex="-1" style={{
        backdropFilter: "blur(8px)"
    }}>
        <div className='modal-dialog modal-dialog-centered'>
            <form onSubmit={onSubmit} className='form w-100'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <div className='modal-title'>
                            ADD Todo:
                        </div>
                    </div>
                    <div className='modal-body'>
                        <input value={text} onChange={(e) => { setText(e.target.value) }} className='form-control' placeholder='type here....' required />
                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-outline-danger' type="button" onClick={close}>Close</button>
                        <button className='btn btn-primary'>{activeTodo ? "Edit" : "Add"}</button>
                    </div>
                </div>
            </form>

        </div>

    </div>)
}
const Todo = () => {
    const [{ showAdd, todos, activeTodo }, dispatch] = useReducer(reducer, initialState);

    const openAddTodo = () => {
        dispatch({ type: "updateAddModal", payload: true })
    }

    const closeAddTodo = () => {
        dispatch({ type: "updateAddModal", payload: false })
        dispatch({ type: "updateActiveTodo", payload: null })
    }

    const addTodo = (payload) => {
        if(activeTodo){
            dispatch({ type: "edit", payload: {
                text: payload,
                index: activeTodo
            } });
            return;
        }
        dispatch({ type: "add", payload })        
    }
    const deleteTodo = (payload) => {
        dispatch({ type: "delete", payload })
    }

    const editTodo = (payload) => {
        
        dispatch({ type: "updateActiveTodo", payload })
        openAddTodo();
    }
    return (
        <div className='w-25 border rounded px-3 py-2'>
            <div className='d-flex justify-content-between align-items-center'>
                <h3 className='h2 my-2'>Todo:</h3>
                <button className='btn btn-success' onClick={openAddTodo}>Add todo</button>
            </div>


            {showAdd && <AddTodo close={closeAddTodo} addTodo={addTodo} activeTodo={activeTodo !== null ? todos[activeTodo]: ""} />}
            <ul className="list-group mt-2">
                {todos.map((todo, index) => (<li className="list-group-item d-flex" key={todo}>
                    <span className='me-auto'>{todo}</span>
                    <button type="button" className="close btn btn-outline-success me-2" aria-label="Close" onClick={() => editTodo(index)}>
                        <span aria-hidden="true">i</span>
                    </button>
                    <button type="button" className="close btn btn-outline-danger" aria-label="Close" onClick={() => deleteTodo(index)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </li>))}

            </ul>
        </div>
    )
}

export default Todo