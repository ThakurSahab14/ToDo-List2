// "use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import "../globals.css";
import {
  doc,
  addDoc,
  collection,
  query,
  where,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

function MyVerticallyCenteredModal(props) {
  const {
    editTask,
    editDesc,
    seteditDesc,
    seteditTask,
    updateData,
    modalShow,
    setModalShow,
    onHide,
  } = props;
  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Task
            </label>
            <input
              type="text"
              value={editTask}
              onChange={(e) => {
                seteditTask(e.target.value);
              }}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Description
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              value={editDesc}
              onChange={(e) => {
                seteditDesc(e.target.value);
              }}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="submit"
          className="btn  btn-primary text-black"
          onClick={() => {
            updateData();
          }}
        >
          Submit
        </button>
        <Button className="btn btn-danger text-black" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Home = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editTask, seteditTask] = useState("");
  const [editDesc, seteditDesc] = useState("");
  const [Objectid, setObjectid] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  
  const router = useRouter();

  useEffect(() => {
    // console.log("auth- ", auth.currentUser);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirstName(user._tokenResponse);
        // console.log("a- ", firstName);
    // console.log("auth- ", user);
        getData();

      } else {
        router.push("/");
      }
    });

  }, []);

  const signOutFromGoogle = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        alert("Signout failed");
      });
  };

  const addData = async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, "todo", "userData");
    const data = await addDoc(collection(db, "todo", "userData", `${uid}`), {
      uid: uid,
      task: task,
      description: desc,
      date: `${Date.now()}`,
    }).then((response) => {
      toast("Task Added Successfully !", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
    getData();
  };

  const getData = async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, "todo", "userData");
    const q = query(collection(db, "todo", "userData", `${uid}`));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    setTaskList(data);
    setisLoading(false);
  };

  const deleteData = async (ObjectId) => {
    const uid = auth.currentUser.uid;

    await deleteDoc(doc(db, "todo", "userData", `${uid}`, ObjectId)).then(
      (response) => {
        toast.success("Task Deleted  !", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
    getData();
  };

  const updateData = async () => {
    const uid = auth.currentUser.uid;
    let obj;
    taskList.forEach((data) => {
      if (data.id === Objectid) {
        obj = { ...data };
      }
    });

    if (editTask !== "") {
      obj.task = editTask;
    }
    if (editDesc !== "") {
      obj.description = editDesc;
    }
    obj.date = Date.now();
    const cityRef = doc(db, "todo", "userData", `${uid}`, Objectid);
    setDoc(cityRef, obj, { merge: true });

    setObjectid("");
    seteditDesc("");
    seteditTask("");
    setModalShow(false);
    toast("Task Updated!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getData();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addData();
    setTaskList([...taskList, { task, desc }]);
    setTask("");
    setDesc("");
  };

  const deleteHandler = (id) => {
    deleteData(id);
  };

  const exportToMail = () => {
   
  // console.log("auth- ", _tokenResponse);
  

    const email = auth.currentUser.email;
    const message3 = `
    <head>
    <style>
    #customers {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    #customers td, #customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    
    #customers tr:nth-child(even){background-color: #f2f2f2;}
    
    #customers tr:hover {background-color: #ddd;}
    
    #customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #04AA6D;
      color: white;
    }
    </style>
    </head>
    <body>
    <h2>Dear  ${auth.currentUser && auth.currentUser.displayName },</h2>
    <h3>Turn Dreams into Reality, One Task at a Time ✨</h3>

    <p>We believe in the power of your potential and the difference you can make. 
    Your to-do list is your personal roadmap to success, and we're here to support you every step of the way.</p>

    <h3>Here is your Todo List</h3>
    <br/>
    <table id="customers">
    <thead>
    <tr>
    <th>S.No</th>
      <th>Task</th>
      <th>Description</th>

    </tr>
  </thead>
  <tbody>
    ${taskList
        .map(
          (task, index) => `
      <tr>
      <td>${index + 1}</td>
        <td>${task.task}</td>
        <td>${task.description}</td>
      </tr>
    `
        )
        .join("")}
  </tbody>
  </table>
  <br/>
  <p>Thank you for using our service. We are glad to have you here.</p>
  <p>Wishing you a day filled with productivity and purpose.</p>
  <br/>
  <h3>Warm regards</h3>
  <span>Todo List Team</span>
  </body>`;

    axios.post("/api/sendMail", {
        subject: "Elevate Your Productivity with To-Do List 🚀",
        toEmail: email,
        message: message3,
      })
      .then((response) => {
        toast("Email Sent Successfully !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  let renderTask = <h2 className="font-semibold">No task available</h2>;

  if (taskList.length > 0) {
    renderTask = taskList.map((task, index) => {
      return (
        <tr key={task.id} className="bg-gray-100">
          <td className="border px-4 py-2">{index + 1}</td>
          <td className="border px-4 py-2 font-semibold">{task.task}</td>
          <td className="border px-4 py-2">{task.description}</td>
          <td className="border px-4 py-2">
            <button
              onClick={() => {
                deleteHandler(task.id);
              }}
              className="bg-red-400 text-white rounded m-2 px-3 py-1 font-bold hover:bg-red-500"
            >
              Delete
            </button>

            <Button
              onClick={() => {
                setObjectid(task.id);
                setModalShow(true);
              }}
              className="bg-indigo-500 text-white rounded m-2 px-3 py-1 font-bold hover:bg-indigo-600"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Edit
            </Button>
            {/* <Modal-----------------------------------------------------------------------------------> */}
            <MyVerticallyCenteredModal
              modalShow={modalShow}
              setModalShow={setModalShow}
              onHide={() => setModalShow(false)}
              editTask={editTask}
              editDesc={editDesc}
              updateData={updateData}
              seteditTask={seteditTask}
              seteditDesc={seteditDesc}
            />
            {/* <-----------------------------------------------------------------------------------> */}
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <Head>
        <title>ToDo-List</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="bg-gray-400">
        <h1 className="bg-dark text-slate-300 text-center p-4 text-4xl font-bold">
          {auth.currentUser && `${auth.currentUser.displayName} Todo List`}
        </h1>
        <div className="row">
          <div className="col col-lg-2">
            <div>
              <button onClick={exportToMail}
                className=" bg-teal-600 text-white m-5 px-2 py-1 font-bold  rounded float-right hover:bg-teal-500"
              >
                Export To Mail
              </button>
            </div>
          </div>
          <div className="col">
            <center>
              <div className="col">
                <center>
                  <form onSubmit={submitHandler} className="m-5 px-4 py-2">
                    <input
                      type="text"
                      required
                      className="border-2 border-gray-400 rounded-lg px-4 py-2 mb-4 block w-full focus:outline-none focus:border-blue-500"
                      placeholder="Enter your task"
                      value={task}
                      onChange={(e) => {
                        setTask(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      required
                      className="border-2 border-gray-400 rounded-lg px-4 py-2 mb-4 block w-full focus:outline-none focus:border-blue-500"
                      placeholder="Enter description here"
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                    />
                    <button
                      type="submit"
                      className="bg-green-600 text-white rounded px-2 py-1 font-bold hover:bg-green-500"
                    >
                      Add Task
                    </button>
                  </form>
                </center>
              </div>
            </center>
          </div>
          <div className="col col-lg-2">
            <div>
              <button
                className="bg-rose-800 text-white m-5 px-3 py-1 font-bold  rounded float-right hover:bg-rose-700"

                onClick={signOutFromGoogle}
              >
                SignOut
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-600 my-2" />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 008-8h-4a4 4 0 01-4 4v4zm5.657-5.657a7.962 7.962 0 01-3 2.647l-3-2.647a3.96 3.96 0 002-3.415V12a4 4 0 014 4h-4z"
            ></path>
          </svg>
          <span>Loading...</span>
        </div>
      ) : (<div className="table-responsive">
        <table className="w-full" id="customers">
          <thead className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Task</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTask}</tbody>
        </table>
      </div>
      )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      <footer className=" bottom-0 bg-dark p-2 text-center w-full  font-bold ">
        <p className="text-slate-300">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤
          </span>{" "}
          by Gaurav Singh Jadaun
        </p>
      </footer>
      
    </>
  );
}

export default Home;
