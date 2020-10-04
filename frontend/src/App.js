import React from "react";
import axios from "axios";

export default function App() {
  async function ping(e) {
    e.preventDefault();

    const res = await axios.get("/pingme").catch((error) => {
      console.log(error.response);
    });

    if (res && res.data) {
      alert(JSON.stringify(res.data));
    } else {
      alert("Error: maybe express server is not running?");
    }
  }

  return (
    <div>
      <h3>Woah, such empty</h3>

      <div>
        <label>just a little test</label>
        <button onClick={ping}>ping the server</button>
      </div>
    </div>
  );
}
