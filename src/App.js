import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (title.trim() !== '') {
      const newTask = { title, description, status, priority };
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setStatus('All');
      setPriority('All');
    } else {
      alert('Title cannot be empty!');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setStatus(taskToEdit.status);
    setPriority(taskToEdit.priority);
    setEditingIndex(index);
  };

  const updateTask = () => {
    if (title.trim() !== '') {
      const updatedTasks = tasks.map((task, index) => {
        if (index === editingIndex) {
          return { title, description, status, priority };
        }
        return task;
      });
      setTasks(updatedTasks);
      setTitle('');
      setDescription('');
      setStatus('All');
      setPriority('All');
      setEditingIndex(-1); // Reset editing state
    } else {
      alert('Title cannot be empty!');
    }
  };

  const searchTasks = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByStatusAndPriority = filteredTasks.filter(
    (task) =>
      (status === 'All' || task.status === status) &&
      (priority === 'All' || task.priority === priority)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4"><img src="icon.png"/>To-Do List</h1>
      <div className="todo-app mb-4">
        {/* Add Task Input Section */}
        <div className="row">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your Task"
            className="input-field"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="input-field"
          ></textarea>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select-field"
          >
            <option value="All">All Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="select-field"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {editingIndex !== -1 ? (
            <button onClick={updateTask} className="btn-primary">
              Save
            </button>
          ) : (
            <button onClick={addTask} className="btn-primary">
              Add Task
            </button>
          )}
        </div><br /> <hr/>
        {/* Search Input Section */}
        <div className="row">
          <input
            type="text"
            value={searchTerm}
            onChange={searchTasks}
            placeholder="Search by title or description"
            className="input-field"
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      {/* Filter Section */}
      <div className="filter-section">
  <div className="select-field-with-icon">
    <FontAwesomeIcon icon={faFilter} className="filter-icon" />
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="select-field"
    >
      <option value="All">All Status</option>
      <option value="Not Started">Not Started</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  </div>

  <div className="select-field-with-icon">
    <FontAwesomeIcon icon={faFilter} className="filter-icon" />
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="select-field"
    >
      <option value="All">All Priority</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  </div>
</div>
      {/* Task List */}
      <ul className="task-list">
        {filteredByStatusAndPriority.map((task, index) => (
          <li key={index} className="task-item">
            <strong>Title:</strong>{' '}
            {editingIndex === index ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="input-field"
              />
            ) : (
              <span>{task.title}</span>
            )}<br />
            <em>Description:</em>{' '}
            {editingIndex === index ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="input-field"
              ></textarea>
            ) : (
              <span>{task.description}</span>
            )}<br/>
            <button onClick={() => deleteTask(index)} className="btn-delete">
              <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </button>

            <button
              onClick={() => {
                editingIndex === index ? updateTask() : editTask(index);
              }}
              className="btn-edit"
            >
              <FontAwesomeIcon icon={faPencilAlt} /> {editingIndex === index ? 'Save' : 'Edit'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
