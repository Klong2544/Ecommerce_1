/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

const FileIpload = ({ values, setvalues }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangfile = (e) => {
    const file = e.target.files;
    if (file) {
      let allfileupload = values.images;
      for (let i = 0; i < file.length; i++) {
        Resize.imageFileResizer(
          file[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                import.meta.env.VITE_REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.user.token,
                  },
                }
              )
              .then((res) => {
                allfileupload.push(res.data.url);
                setvalues({
                  ...values,
                  images: allfileupload,
                });
              })
              .catch((err) => console.log(err.response));
          },
          "base64"
        );
      }
    }
  };
  const handleRemoveFile = (public_id) => {
    const { images } = values;
    axios
      .post(
        import.meta.env.VITE_REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        let filterImage = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setvalues({ ...values, images: filterImage });
      })
      .catch((err) => console.log(err));
  };
  console.log(values);
  return (
    <div className="mt-3 flex flex-col-reverse gap-3">
      <div>
        {values.images &&
          values.images.map((item, index) => (
            <div key={index} className="indicator ml-5 mt-2">
              <span
                onClick={() => handleRemoveFile(item.public_id)}
                className="indicator-item badge badge-ghost cursor-pointer"
              >
                x
              </span>
              <img
                src={item.url}
                className="grid w-32 h-32 bg-base-300 place-items-center"
              />
            </div>
          ))}
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="text-lg font-medium text-gray-700">
          เลือกไฟล์
        </label>
        <input
          type="file"
          name="file"
          accept="images/*"
          multiple
          className="file-input w-full max-w-xs bg-gray-300"
          onChange={(e) => handleChangfile(e)}
        />
      </div>
    </div>
  );
};

export default FileIpload;
