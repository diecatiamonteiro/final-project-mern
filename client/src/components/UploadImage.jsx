import { useState } from "react";
import axios from "axios";

export default function UploadImage() {
  const [image, setImage] = useState(null);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const config = {
      method: "PATCH",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", // If using FormData
      },
    };
    const response = await axios.patch(
      `http://localhost:8000/api/users/67d9787538abedcfa89660f3/update-profile`,
      formData,
      config
    );

    console.log(response);
  };

  return (
    <div>
      <input type="file" onChange={imageHandler} />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}
