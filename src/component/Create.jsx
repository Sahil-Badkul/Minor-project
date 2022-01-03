import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import db from "../database/Config";
import { storage } from "../database/Config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./create.css";
const Create = ({ isAuth }) => {
  // init services
  const servicesCollectionRef = collection(db, "Services");
  //form component
  const [name, setName] = useState("");
  const [category, setCategory] = useState("hostel");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => setError(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL)
        });
      }
    );
  };

  //adding service
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (progress === 100) {
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
    }
  };
  return (
    <>
      <section className="dark">
        <div className="inner-width">
          <h1 className="section-title">Add Services</h1>
          {error && <div>Error occured : {error}</div>}

          <form onSubmit={formHandler} className="form-container">
            <p>Step 1 : Upload your brand image</p>
            <input type="file" className="input" required/>
            <button type="submit" disabled={progress}>Upload</button>
          <div>uploaded image {progress} %</div>
          </form>

          {progress === 100 && <form onSubmit={handleSubmit} className="form-container">
            <p>Step 2 : Give basic info</p>
            <label>Enter title/name:</label>
            <input
              type="text"
              required
              placeholder="Add your brand name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description:</label>
            <textarea
              required
              placeholder="Says something about you..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Category:</label>
            <select
              value={category}
              placeholder="Select your service.."
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="hostel">Hostel</option>
              <option value="mess">Mess</option>
            </select>
            <button type="submit" className="btn">
              Add service
            </button>
          </form>}
        </div>
      </section>
    </>
  );
};

export default Create;
