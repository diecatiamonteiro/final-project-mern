import { useState } from "react";
import axios from "axios";

export default function UploadImage() {
  const [image, setImage] = useState(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("upload_preset", "The Greenroom");

    const config = {
      method: "POST",
    };

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
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
