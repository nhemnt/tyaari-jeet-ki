import React, { useReducer, useState } from 'react';

const initialState = {
  tasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'add_task':
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), title: action.title, status: 'To Do' }],
      };
    case 'update_task_status':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.id ? { ...task, status: action.status } : task
        ),
      };
    default:
      throw new Error('Unknown action type');
  }
}

function Kanban() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch({ type: 'add_task', title: taskTitle });
      setTaskTitle('');
    }
  };

  return (
    <div className="container mt-5 w-75">
      <h1 className="text-center mb-4">Kanban Board</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="row">
        <KanbanColumn
          title="To Do"
          tasks={state.tasks.filter(task => task.status === 'To Do')}
          dispatch={dispatch}
        />
        <KanbanColumn
          title="In Progress"
          tasks={state.tasks.filter(task => task.status === 'In Progress')}
          dispatch={dispatch}
        />
        <KanbanColumn
          title="Done"
          tasks={state.tasks.filter(task => task.status === 'Done')}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}

function KanbanColumn({ title, tasks, dispatch }) {
  return (
    <div className="col-md-4">
      <h2 className="text-center">{title}</h2>
      <ul className="list-group">
        {tasks.map(task => (
          <KanbanTask key={task.id} task={task} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
}

function KanbanTask({ task, dispatch }) {
  const moveTask = (newStatus) => {
    dispatch({ type: 'update_task_status', id: task.id, status: newStatus });
  };

  return (
    <li className="list-group-item">
      <p>{task.title}</p>
      {task.status !== 'To Do' && (
        <button className="btn btn-secondary btn-sm me-2" onClick={() => moveTask('To Do')}>To Do</button>
      )}
      {task.status !== 'In Progress' && (
        <button className="btn btn-secondary btn-sm me-2" onClick={() => moveTask('In Progress')}>In Progress</button>
      )}
      {task.status !== 'Done' && (
        <button className="btn btn-secondary btn-sm" onClick={() => moveTask('Done')}>Done</button>
      )}
    </li>
  );
}

export default Kanban;