import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import db from "../database/Config";
import "./form.css";
const Create = () => {
  // init services
  const servicesCollectionRef = collection(db, "Services");
  //form component
  const [name, setName] = useState("");
  const [category, setCategory] = useState("hostel");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  //adding service
  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = { name, image, category, description };
    console.log(info);

    addDoc(servicesCollectionRef, {
      name,
      description,
      image,
      category,
    }).then(() => {
      console.log("Info added");
    });
    navigate("/services");
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="form-container">
          <h1>Add service</h1>
          <label>Enter title/name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Upload image:</label>
          <input
            type="file"
            required
            value={image}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <label>Description:</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="hostel">Hostel</option>
            <option value="mess">Mess</option>
          </select>
          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
