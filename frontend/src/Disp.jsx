import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Disp = () => {
  const [data, setData] = useState([])
  const [f, setF] = useState(true)

  const [editId, setEditId] = useState(null);

  const [c, setC] = useState({})
  const [completedtask, setCompletedtask] = useState([])


  const [taskobj, setTaskobj] = useState({ "desc": "", "deadline": "" })

  const obj = useContext(Ct)
  const navigate = useNavigate()

  useEffect(() => {
    if (obj.store.token == "") {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/tasks", { "headers": { "Authorization": `Bearer ${obj.store.token}`, } }).then((res) => {
      setData(res.data)
    })
  }, [f])

  // Add task functionality
  let fun = (e) => {
    setTaskobj({ ...taskobj, [e.target.name]: e.target.value })
  }

  let add = async () => {
    if (!taskobj.desc || !taskobj.deadline) return;
  
    try {
      if (editId) {
        // UPDATE task
        await axios.put(`http://localhost:5000/updatetasks/${editId}`, taskobj, {
          headers: { Authorization: `Bearer ${obj.store.token}` },
        });
  
        // Clear editing state
        setEditId(null);
      } else {
        // ADD new task
        await axios.post("http://localhost:5000/addtask", taskobj, {
          headers: { Authorization: `Bearer ${obj.store.token}` },
        });
      }
  
      // Clear input
      setTaskobj({ desc: "", deadline: "" });
  
      // Refresh task list
      setF(!f);
  
    } catch (err) {
      console.error("Error adding/updating task:", err);
    }
  };
  


  // update functionality
  let edit = (task) => {
    setTaskobj({ desc: task.desc, deadline: task.deadline });
    setEditId(task._id);
  };
  

  // delete functionality for task table

  let del = async (id) => {
    await axios.delete(`http://localhost:5000/deletetask/${id}`, {
      headers: { Authorization: `Bearer ${obj.store.token}` },
    });
    setData(data.filter((task) => task._id !== id)); // remove from main table
  };


  // complete task in task table
  let complete = async (id) => {
    const completed = data.find((task) => task._id === id);
    if (completed) {
      await axios.post(`http://localhost:5000/completedtasks`, completed, {
        headers: { Authorization: `Bearer ${obj.store.token}` }
      });
      await axios.delete(`http://localhost:5000/deletetask/${id}`, {
        headers: { Authorization: `Bearer ${obj.store.token}` }
      });
      setF(!f); // refetch tasks
      fetchCompleted(); // fetch new completed tasks
    }
  };
  

  const fetchCompleted = async () => {
    const res = await axios.get(`http://localhost:5000/completedtasks`, {
      headers: { Authorization: `Bearer ${obj.store.token}` }
    });
    setCompletedtask(res.data);
  };
  
  useEffect(() => {
    fetchCompleted();
  }, []);
  


  // delete completed task from completed task list
  let compdel = async (id) => {
    await axios.delete(`http://localhost:5000/completedtasks/${id}`, {
      headers: { Authorization: `Bearer ${obj.store.token}` }
    });
    fetchCompleted();
  };
  

  return (
    <div>
      <div className="taskform">
        <input type="text" placeholder='enter task desc' name='desc' value={taskobj.desc} onChange={fun} />
        <input type="date" name='deadline' value={taskobj.deadline} onChange={fun} />
        <button onClick={add}>Add Task</button>
      </div>

      <div className="tasktable">
        {data.length > 0 && <table>
          <tr>
            <th>Sno</th>
            <th>UserId</th>
            <th>TaskId</th>
            <th>Task Description</th>
            <th>Deadline</th>
            <th>Status</th>
          </tr>
          {
            data.map((item, ind) => {
              return (
                <tr>
                  <td>{ind + 1}</td>
                  <td>{item.userId}</td>
                  <td>{item._id}</td>
                  <td>{item.desc}</td>
                  <td>{item.deadline}</td>
                  <td>Pending</td>
                  <td><button className='edit-btn' onClick={() => edit(item)}>Edit</button></td>
                  <td><button className='delete-btn' onClick={() => del(item._id)}>Delete</button></td>
                  <td><button className='complete-btn' onClick={() => complete(item._id)}>complete</button></td>
                </tr>
              )
            })
          }
        </table>}
      </div>

      <div className="completedtask">

        {completedtask.length > 0 &&


          <table>

            <tr>
              <th>Sno</th>
              <th>UserId</th>
              <th>TaskId</th>
              <th>Task Description</th>
              <th>Status</th>
            </tr>

            {
              completedtask.map((item, ind) => {
                return (
                  <tr>
                    <td>{ind + 1}</td>
                    <td>{item.userId}</td>
                    <td>{item._id}</td>
                    <td>{item.desc}</td>
                    <td>Completed</td>
                    <td><button className="delete-btn" onClick={() => compdel(item._id)}>Delete</button></td>
                  </tr>
                )
              })
            }

          </table>}
      </div>
    </div>
  )
}

export default Disp
