import React, { useState } from "react";

export default function ListItem(props) {
  // Declare a new state variable, which we'll call "count"
  const [isSublist, setSublist] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  return (
    <>
      <li>
        {props.title}
        <button
          onClick={() => props.moveDown(props.index)}
          className="down-button"
        >
          &darr;
        </button>
        <button onClick={() => props.moveUp(props.index)} className="up-button">
          &uarr;
        </button>
        <button onClick={() => setSublist(!isSublist)}>
          {isSublist ? "Remove Sublist" : "Add Sublist"}
        </button>
        <button onClick={() => props.remove(props.index)}>Remove</button>
        {isSublist && (
          <>
            <ul>
              {listItems.map((item, index) => (
                <ListItem
                  title={item}
                  key={item}
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
          </>
        )}
      </li>
    </>
  );
}
