import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { ref, push } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const Addtasks = ({ setTasks, tasks, setTaskAdd }) => {
  const { currentUser } = useAuth();

  //react state hook definitions
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [dueDate, setTheDate] = useState("2022-05-12");
  const [loading, setLoading] = useState(false);

  //Processes the form used to add a task
  const handleSubmit = (e) => {
    const id = uuid().slice(0, 8);
    e.preventDefault();
    setLoading(true);

    const newTask = {
      id: id,
      title: title,
      description: description,
      dueDate: dueDate,
      tStatus: false,
    };

    setTasks([...tasks].concat(newTask));
    push(ref(db, "tasks/" + currentUser.uid), {
      id: id,
      title: title,
      description: description,
      dueDate: dueDate,
      tStatus: false,
    });
    alert("New Task Assigned!");
    setTaskAdd(false);
    setLoading(false);
  };

  return (
    <div>
      <Form className="w-100" onSubmit={handleSubmit}>
        <Card className="mb-3">
          <Card.Body>
            <h4 id="title" className="text-center">
              Create Task
            </h4>
            <div className="text-end w-100"><Button id="btn" onClick={()=>setTaskAdd(false)} >Close</Button></div>
            <Form.Group className="mb-3 mt-2" controlId="formHorizontalTitle">
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                required={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHorizontalDescription">
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                required={true}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHorizontalDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={dueDate}
                min="2018-01-01"
                max="2022-12-31"
                required={true}
                onChange={(e) => setTheDate(e.target.value)}
              />
            </Form.Group>
            <div className="w-100 text-center">
              <Button
                id="btn"
                type="submit"
                disabled={loading}
                className="w-50 mt-3"
                onClick={handleSubmit}
              >
                Create
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};

export default Addtasks;
