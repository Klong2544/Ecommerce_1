// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBar from "../../Layouts/NavBar";
import {
  getAllUser,
  changRole,
  changStatus,
  removeuser,
  repassworduser,
} from "../../Functions/user";
import { useSelector } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setdata] = useState([]);
  const [values, setvalues] = useState({
    id: "",
    password: "",
  });
  const roleData = ["admin", "user"];

  useEffect(() => {
    loaddata();
  }, []);

  const loaddata = () => {
    getAllUser()
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleChangRole = (e, id) => {
    let values = {
      id: id,
      role: e.target.value,
    };
    console.log(values);
    changRole(user.user.token, values)
      .then((res) => {
        console.log(res.data);
        loaddata();
      })
      .catch((err) => console.log(err));
  };
  const handleOnChang = (e, id) => {
    console.log(e.target.checked);
    const values = {
      id: id,
      enabled: e.target.checked,
    };
    changStatus(user.user.token, values)
      .then((res) => {
        console.log(res);
        loaddata();
      })
      .catch((err) => console.log(err));
  };
  const handleremove = (id) => {
    Swal.fire({
      title: "Are you sure Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
        removeuser(user.user.token, id)
          .then((res) => {
            console.log(res.data);
            loaddata();
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const handleChangRepassword = (e) => {
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handlevalueid = (id) => {
    setvalues({
      ...values,
      id: id,
    });
  };
  const handlerepassword = () => {
    repassworduser(user.user.token, values.id, { values })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="overflow-hidden h-screen">
      <NavBar />
      <div className="w-full h-screen flex justify-start bg-gray-200 overflow-y-auto max-h-screen">
        <table className=" w-full h-3/5 border border-gray-300 ">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center border border-gray-300">
            {data.map((item, index) => (
              <tr key={index} className="border border-gray-300">
                <th>{index + 1}</th>
                <td className="text-black text-[14px] md:text-[16px]">{item.username}</td>
                <td>
                  <select
                    className="select select-bordered w-full max-w-xs bg-gray-300 text-gray-700"
                    value={item.role}
                    onChange={(e) => handleChangRole(e, item._id)}
                  >
                    {roleData.map((roleItem, idrole) => (
                      <option key={idrole} value={roleItem}>
                        {roleItem}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    className="checkbox checkbox-success"
                    onChange={(e) => handleOnChang(e, item._id)}
                  />
                </td>
                <td className="text-black text-[14px] md:text-[16px]">
                  {moment(item.createAt).format("DD/MM/YYYY")}
                </td>
                <td className="flex flex-col md:flex-row gap-3 justify-center h-full items-center">
                  <button
                    onClick={() => handleremove(item._id)}
                    className="btn btn-outline btn-error text-white hover:bg-rose-700 md:text-[16px]"
                  >
                    ลบ
                  </button>
                  <button
                    className="btn btn-outline btn-warning md:text-[16px]"
                    onClick={() => {
                      document.getElementById("my_modal_1").showModal();
                      handlevalueid(item._id);
                    }}
                  >
                    เเก้ไข
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box  flex flex-col items-center gap-5 bg-gray-200">
                      <h4 className="text-2xl text-gray-700">เปลี่ยนรหัสผ่าน</h4>
                      <input
                        type="text"
                        name="password"
                        placeholder="รหัสผ่าน"
                        className="input input-bordered w-full max-w-xs bg-gray-200 border border-gray-500"
                        onChange={(e) => handleChangRepassword(e)}
                      />
                      <div className="modal-action">
                        <form method="dialog">
                          <div className="flex gap-4">
                            <button
                              className="btn btn-success"
                              onClick={handlerepassword}
                            >
                              ตกลง
                            </button>
                            <button className="btn btn-error">ยกเลิก</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAdmin;
