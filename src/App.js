import { useState, useEffect } from "react";
import Alert from "./Alert";
import "./App.css";
import ToDo from "./ToDo";
import image from "./todo-image.png";


const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState(""); 
  const [list, setList] = useState(getLocalStorage()); 
  const [isEditing, setIsEditing] = useState(false); 
  const [editID, setEditID] = useState(null); 
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  }); // is an object from we can display alert information

  const handleSubmit = (e) => {
    e.preventDefault(); // the preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur. // clicking on a "Submit" button, prevent it from submitting a form
    //  console.log('hello');
    if (!name) {
      // check if the value in input is empty and if is empty then display the alert
      showAlert(true, "danger", "please enter value"); // display alert
    } else if (name && isEditing) {
      // check if there's something in the value and if the editing is true
      setList(
        list.map((item) => {
          // we have our list and we're iterating over it
          if (item.id === editID) {
            // if the item Id matches to whatever we have in a state, the return all the propreties
            return { ...item, title: name }; // return Id and change the title to whatever is the state
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      // show alert
      showAlert(true, "success", "new task added to the list");
      const newItem = {
        // create a new item is equil to the object with an unique ID and a title tht will be equil to the name value that is coming from the state
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]); // ... get me the previous values from the state add add a new one
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    // parameters by default
    setAlert({ show, type, msg }); // if the property name matches to the variable name that holds the value then show and type an message
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "task removed");
    setList(list.filter((item) => item.id !== id)); // list filter always return a new array / if item Id matches to whatever idea passed into remove item, then don't return it from thos filter function. If item Id doesn't match, then it's going to be added to the new array
  };

  const editItem = (id) => {
    // get a specific item whose Id matches
    const specificItem = list.find((item) => item.id === id); // if the item Id matches, then return that item
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div>
        <section className="section-center">
        {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}

          <h3 className="title">Todo App</h3>
          <form className="todo-form" onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                className="todo"
                placeholder="Enter a new task to do"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="submit-btn">
                {isEditing ? "edit" : "add"}{" "}
              </button>
            </div>
          </form>
          {list.length > 0 && (
            <div className="todo-container">
              <ToDo items={list} removeItem={removeItem} editItem={editItem} />{" "}
              {/* list as a prop into Todo component named 'items' */}
              <button className="clear-btn" onClick={clearList}>
                clear items
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
