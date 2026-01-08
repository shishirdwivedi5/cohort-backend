import { useState } from "react";
import { API } from "../api/image.api.jsx";

export default function ImageCaptionApp() {
  const [image, setImage] = useState();

  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const formData = new FormData();
    // const file = Array.from(e.target.files);
    // console.log("file selected:", file);

    // if (!file) return;

    // if (file.length > 2) {
    //   alert("You can upload a maximum of 2 images.");
    //   return;
    // }

    // file.map((files) => {
    //   return formData.append("image", files);
    // });

    // const previewUrls = file.map((img) => {
    //   return URL.createObjectURL(img);
    // });

    // setPreview(previewUrls);

    // const show = file.map((img) => {
    //   return img;
    // });

    // setImage(show);

    const file = e.target.files[0];
    console.log("file selected:", file);
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setImage(file);
    formData.append("image", file);

    try {
      await API.post("/auth/uplode", formData).then((res) => {
        console.log("response from backend:", res);
        setCaption(res.data.result);
        if (res) {
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("error uploading image:", error);
      if (error) {
        setImage("");
        setPreview("");
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please select an image");

    setLoading(true);

    // 🔹 Dummy API call (replace with your backend API)
    // setTimeout(() => {
    //   setCaption("Bold monochrome energy captured in motion. Where style meets confidence.");
    //   setLoading(false);
    // }, 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          AI Image Caption Generator
        </h1>

        {/* Image Upload */}
        <div className="flex flex-col items-center gap-4">
          <label className="w-full cursor-pointer border-2 border-dashed border-gray-500 rounded-xl p-6 text-center text-gray-300 hover:border-indigo-500 transition">
            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {preview ? (
              <img
                src={preview}
                alt="image not uplode"
                className="mx-auto mb-4 max-h-64 object-contain"
              />
            ) : (
              <span>Click to upload an image</span>
            )}
          </label>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {loading === false ? "Generate Caption" : "Generating Caption..."}
          </button>
        </div>

        {/* Caption Box */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">
            Generated Caption
          </h2>
          <div className="min-h-20 bg-black/40 border border-white/10 rounded-xl p-4 text-gray-300">
            {caption || "Your AI-generated caption will appear here."}
          </div>
        </div>
      </div>
    </div>
  );
}
