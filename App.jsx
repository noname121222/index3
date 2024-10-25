import React, { useReducer, useState } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [arr, setArr] = useState([]);
  const [check , setCheck] =  useState (true)
  const [editIndex, setEditIndex] = useState(null); // Track which item is being edited
  const [editText, setEditText] = useState(""); // Track the text of the item being edited

  function handleInput(e) {
    setInput(e.target.value);
  }



  function onDelete(item) {
    let updatedArr = arr.filter((string) => string !== item);
    setArr(updatedArr);
  }

  function handleEdit(index, string) {
    setEditIndex(index);
    setEditText(string); // Pre-fill the input with the item's current value
  }

  function saveEdit(index) {
    let updatedArr = [...arr];
    updatedArr[index] = editText; // Update the item with the new value
    setArr(updatedArr);
    setEditIndex(null); // Exit edit mode
  }
  
 function handlecheck(){
   setCheck(!check)
  console.log(check)
 }

 function reducer( state, action){
  const {type,payload} = action
   
 switch (type) {
  case "ADD":
    if (input.trim() !== "") {
      let updatedArr = [...arr, input];
      setArr(updatedArr);
      setInput("");
    }
    break;
 
  default:
    break;
 }

 }
 

 const [state , dispatch] = useReducer(reducer, [])
 console.log(state)


  return (
    <div>
      <div className="flex gap-5 max-w-xl mx-auto my-10">
        <input
          type="text"
          className="border border-blue-500 outline-none rounded-lg px-3"
          placeholder="Text..."
          value={input}
          onChange={handleInput}
        />
        <button className="btn btn-primary bg-blue" onClick={()=>dispatch({type:"ADD",payload : "ishaldi"})}>
          Add
        </button>
      </div>

      {arr.length !== 0 ? (
        arr.map((string, index) => (
          <div
            key={index}
            className="items-center flex gap-5 max-w-3xl mx-auto justify-between"
          >
            {editIndex === index ? (
              // Render input for editing
              <div className="flex gap-3">
                <input
                  type="text"
                  className="border border-blue-500 outline-none rounded-lg px-3"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="btn btn-primary" onClick={() => saveEdit(index)}>
                  Save
                </button>
              </div>
            ) : (
              // Display the text item
            check? <p className="text-xl font-bold">
                {index + 1}. {string}
              </p> :<p className="text-xl text-gray-400  font-bold">
                {index + 1}. {string}
              </p>
            )}
            {editIndex !== index && (
              <div className="flex gap-3">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handlecheck(index, string)}
                >
                  check
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleEdit(index, string)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(string)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="flex gap-5 max-w-xl mx-auto text-xl">Nodata...</div>
      )}
    </div>
  );
}

export default App;
