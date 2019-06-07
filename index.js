import React, { useState } from "react";
import ReactDOM from "react-dom";

import ListItem from "./ListItem.js";
import "./styles.css";

function App() {
  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  return (
    <div className="App">
      <h1>List editor</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ul>
        {listItems.map((item, index) => (
          <ListItem
            title={item}
            key={index}
            index={index}
            moveUp={index => {
              const newListItems = [...listItems];
              [newListItems[index], newListItems[index - 1]] = [
                newListItems[index - 1],
                newListItems[index]
              ];
              setListItems(newListItems);
            }}
            moveDown={index => {
              const newListItems = [...listItems];
              [newListItems[index], newListItems[index + 1]] = [
                newListItems[index + 1],
                newListItems[index]
              ];
              setListItems(newListItems);
            }}
            remove={index => {
              const newListItems = [...listItems];
              newListItems.splice(index, 1);
              setListItems(newListItems);
            }}
          />
        ))}
      </ul>
      <input value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button
        onClick={() => {
          setListItems([...listItems, newItem]);
          setNewItem("");
        }}
      >
        Add
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
