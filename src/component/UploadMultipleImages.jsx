import { useState } from "react";
import { storage } from "../database/Config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import 'firebase/storage';
const UploadMultipleImages = () => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = uuidv4();
      setImages((prevState) => [...prevState, newImage]);
    }
  };
  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
    const sotrageRef = ref(storage, `images/${uuidv4() + image.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUrls((prevState) => [...prevState, downloadURL]);
            });
        },
      );
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };

  console.log("images: ", images);
  console.log("urls", urls);

  return (
    <section>
      <div className="inner-width">
      <h1 className="section-title">Upload multiple images</h1>
      <div>
        <progress value={progress} max="100" />
        <br />
        <br />
        <input type="file" multiple onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <br />
        {urls.map((url, i) => (
            <>
          <img
            key={i}
            style={{ width: "200px", height:200, margin: 10 }}
            src={url || "http://via.placeholder.com/300"}
            alt="firebase-image"
          />
          </>
        ))}
      </div>
      </div>
    </section>
  );
};

export default UploadMultipleImages;