import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Alert,
  Form,
  Collapse,
} from "react-bootstrap";
import {
  PencilSquare,
  Trash3,
  Calendar2Check,
  Calendar2X,
} from "react-bootstrap-icons";
import Addtasks from "./Addtasks";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Tasks = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { currentUser, logout } = useAuth();
  const mounted = useRef(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [taskAdd, setTaskAdd] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState();
  const [editTask, setEditTask] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  //renders ui only when state of dependencies changes
  useEffect(() => {
    onValue(ref(db, "tasks/" + currentUser.uid), (snapshot) => {
      var tArray = [];
      //var kArray = [];
      snapshot.forEach((childSnapshot) => {
        //kArray.push(childSnapshot.key.toString());
        tArray.push(childSnapshot.val());
      });
      /*Checks if the component is mounted before any changes in state*/
      if (mounted.current === null) return;
      if (!refresh) {
        setRefresh(true);
      }
      setTasks(tArray);
    });
  }, [refresh]);

  //toggles status of task
  const handleCheck = (id) => {
    const updateTasks = [...tasks].map((task) => {
      if (task.id === id) {
        task.tStatus = !task.tStatus;
      }
      return task;
    });
    setTasks(updateTasks);
  };

  //deletes tasks from ui
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //edits tasks on ui
  const handleEdit = (id) => {
    const item = tasks.find((task) => task.id === id);
    setEditTask(item);
    
  };

  //function used to handle comments
  const handleComment = (e) => {
    const id = uuid().slice(0, 8);
    e.preventDefault();
    const updateComment = {
      id: id,
      text: comment,
    };

    setComments([...comments].concat(updateComment));
    setComment("");
    setOpen2(!open2);
  };

  //function used to logout
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Logout!");
    }
  };

  return (
    <Container id="main-container2" className="d-grid h-100">
      <div className="w-100">
        <Row className="mb-5">
          <Col lg={10} md={10}>
            <h1>Task Tracker</h1>
          </Col>
          <Col lg={2} md={2}>
            <Button id="btn" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
        {taskAdd ? (
          <Addtasks setTasks={setTasks} tasks={tasks} setTaskAdd={setTaskAdd} />
        ) : (
          <div className="task-btn w-100">
            <Row className="text-center">
              <Col lg={6} md={6}>
                <Button
                  id="btn"
                  className="e-task mt-2"
                  onClick={() => setTaskAdd(true)}
                >
                  Create Task
                </Button>
              </Col>
              <Col lg={6} md={6}>
                <Button id="btn" className="mt-2">
                  Assign Task
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <div className="w-100">
        <h4 id="the-tasks" className="mb-2">
          Tasks
        </h4>
        {tasks.length ? (
          tasks.map((task) => (
            <Card key={task.id} id="sign-in" className="mb-2">
              <Card.Body>
                <Row>
                  <Col lg={9} md={9} sm={6}>
                    <h5>{task.title}</h5>
                    <div>{task.dueDate}</div>
                  </Col>
                  <Col lg={3} md={3} sm={6}>
                    <Trash3
                      className="icons me-3"
                      onClick={() => handleDelete(task.id)}
                    />
                    {task.tStatus ? (
                      <Calendar2Check
                        className="icons"
                        onClick={() => handleCheck(task.id)}
                        size={25}
                      />
                    ) : (
                      <Calendar2X
                        className="icons"
                        onClick={() => handleCheck(task.id)}
                        size={25}
                      />
                    )}
                  </Col>
                  <Col lg={12} md={12} sm={12}>
                    {task.description}
                  </Col>
                </Row>
              </Card.Body>
              <Row>
                <Col lg={6} md={6}>
                  <Button
                    id="btn"
                    onClick={() => setOpen1(!open1)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open1}
                    className='ms-2'
                  >
                    show comments
                  </Button>
                  <Collapse className="ms-2" in={open1}>
                    <div id="comment-collapse-text">
                      {comments.length ? (
                        comments.map((com) =>
                          <p key={com.id}>{com.text}</p>
                        )
                      ) : (
                        <p className="mt-1">No Comments to Show</p>
                      )}
                    </div>
                  </Collapse>
                </Col>
                <Col lg={6} md={6}>
                  <Button
                    id="btn"
                    onClick={() => setOpen2(!open2)}
                    aria-controls="comment-collapse-input"
                    aria-expanded={open2}
                    className='ms-2 mb-2'
                  >
                    add comment
                  </Button>
                  <Collapse in={open2}>
                    <Form id="comment-collapse-input" onSubmit={handleComment}>
                      <Form.Group
                        className="me-1"
                        controlId="formHorizontalcomment"
                      >
                        <Form.Control
                          type="text"
                          placeholder="comment here"
                          value={comment}
                          required={true}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <div className="w-100 text-center">
                        <Button
                          id="btn"
                          type="submit"
                          className="w-50 mt-1 mb-2"
                          onClick={handleComment}
                        >
                          Add
                        </Button>
                      </div>
                    </Form>
                  </Collapse>
                </Col>
              </Row>
            </Card>
          ))
        ) : (
          <div className="text-center">No Tasks to Show</div>
        )}
      </div>
    </Container>
  );
};

export default Tasks;
