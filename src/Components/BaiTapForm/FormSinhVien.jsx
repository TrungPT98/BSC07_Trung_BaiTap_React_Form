import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  validateForm,
  validateHoTen,
  validateEmail,
  validatePhone,
} from "../../validation/validationForm";
import { addSV } from "../../redux/reducers/QuanLySinhVienAction";

const FormSinhVien = () => {
  const [data, setData] = useState({
    maSV: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
  });

  const [error, setError] = useState({
    maSV: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
  });

  // tạo mảng để thêm sinh viên
  const [danhSachSV, setDanhSachSV] = useState([]);

  // tạo state submit cho nút Thêm SV
  const [btnAdd, setBtnAdd] = useState(true);

  // validate rỗng
  const kiemTraRong = validateForm(data);

  const isText = validateHoTen(data);
  const isEmail = validateEmail(data);
  const isNumber = validatePhone(data);

  const handleChange = (event) => {
    event.persist();
    const { id, value, dataset } = event.target;
    const { type } = dataset;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    switch (type) {
      case "number":
        {
          const regexNumber = /^\d+$/;
          const result = regexNumber.test(data.soDienThoai*1);
          if (!result) {
            setError((prevError) => ({
              ...prevError,
              [id]: "Vui lòng nhập số",
            }));
          } else {
            setError((prevError) => ({
              ...prevError,
              [id]: "",
            }));
          }
        }
        break;
      case "letter":
        {
          const regexLetter = /^[a-zA-Z\u00C0-\u00FF\s]+$/;
          const result = regexLetter.test(data.hoTen);
          if (!result) {
            setError((prevError) => ({
              ...prevError,
              [id]: "Vui lòng chỉ nhập chữ",
            }));
          } else {
            setError((prevError) => ({
              ...prevError,
              [id]: "",
            }));
          }
        }
        break;
      case "email":
        {
          const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const result = regexEmail.test(data.email);
          if (!result) {
            setError((prevError) => ({
              ...prevError,
              [id]: "Vui lòng nhập đúng định dang Email",
            }));
          } else {
            setError((prevError) => ({
              ...prevError,
              [id]: "",
            }));
          }
        }
        break;
    }


    if (kiemTraRong && isText && isNumber && isEmail) {
      setBtnAdd(false);
    } else {
      setBtnAdd(true);
    }
  };

  const dispatch = useDispatch();

  // thêm sinh viên
  const handleSubmit = (event) => {
    if (!kiemTraRong) {
      return;
    }
    event.preventDefault();
    const newSinhVien = { ...data };
    setDanhSachSV([...danhSachSV, newSinhVien]);

    // lưu dữ liệu xuống local
    localStorage.setItem("danhSachSV", JSON.stringify(danhSachSV));
    dispatch(addSV(data));
    setData({
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    });
    setBtnAdd(true);
  };

  // lấy dữ liệu từ local
  useEffect(() => {
    const storeDataList = localStorage.getItem("danhSachSV");
    if (storeDataList) {
      setDanhSachSV(JSON.parse(storeDataList));
    }
  }, []);

  // xoá sinh viên
  const xoaSinhVien = (id) => {
    const capNhatDanhSach = danhSachSV.filter(
      (sinhVien) => sinhVien.maSV !== id
    );
    setDanhSachSV(capNhatDanhSach);
  };

  // lấy dữ liệu từ hàm timSinhVien
  const [suaSinhVien, setSuaSinhVien] = useState(null);

  // tìm sinh viên
  const timSinhVien = (id) => {
    const sinhVienDangChon = danhSachSV.find((sinhVien) => sinhVien.maSV == id);
    setData({
      maSV: sinhVienDangChon.maSV,
      hoTen: sinhVienDangChon.hoTen,
      email: sinhVienDangChon.email,
      soDienThoai: sinhVienDangChon.soDienThoai,
    });
    setSuaSinhVien(sinhVienDangChon);
  };
  // console.log(suaSinhVien);

  // cập nhật sinh viên
  const capNhatSinhVien = () => {
    if (!suaSinhVien) {
      return;
    }
    const updateList = danhSachSV.map((sinhVien) => {
      if (sinhVien.maSV === suaSinhVien.maSV) {
        return data;
      }
      return sinhVien;
    });
    setDanhSachSV(updateList);
    setSuaSinhVien(null);
    setData({
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    });
    setBtnAdd(true);
  };

  return (
    <div className="my-3">
      <div className="card text-start">
        <div className="card-header bg-dark text-white">
          Thông tin sinh viên
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-6">
                <label className="form-label">Mã SV</label>
                <input
                  type="text"
                  id="maSV"
                  className="form-control"
                  value={data.maSV}
                  onChange={handleChange}
                  disabled={suaSinhVien}
                  data-type="number"
                />
                <p className="mt-2 text-danger">{error.maSV}</p>

              </div>
              <div className="form-group col-6">
                <label className="form-label">Họ tên</label>
                <input
                  type="text"
                  id="hoTen"
                  className="form-control"
                  value={data.hoTen}
                  onChange={handleChange}
                  data-type="letter"
                />
                <p className="mt-2 text-danger">{error.hoTen}</p>

              </div>
            </div>
            <div className="row my-3">
              <div className="form-group col-6">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={data.email}
                  onChange={handleChange}
                  data-type="email"
                />
                <p className="mt-2 text-danger">{error.email}</p>

              </div>
              <div className="form-group col-6">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  id="soDienThoai"
                  className="form-control"
                  value={data.soDienThoai}
                  onChange={handleChange}
                  data-type="number"
                />
                <p className="mt-2 text-danger">{error.soDienThoai}</p>

              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={btnAdd}
                >
                  Thêm Sinh Viên
                </button>
                <button
                  disabled={!suaSinhVien}
                  type="button"
                  onClick={capNhatSinhVien}
                  className="btn btn-warning ms-3"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {danhSachSV.map((sinhVien, index) => (
              <tr key={index}>
                <td>{sinhVien.maSV}</td>
                <td>{sinhVien.hoTen}</td>
                <td>{sinhVien.email}</td>
                <td>{sinhVien.soDienThoai}</td>
                <td>
                  <button
                    onClick={() => {
                      xoaSinhVien(sinhVien.maSV);
                    }}
                    s
                    className="btn btn-danger"
                  >
                    Xoá
                  </button>
                  <button
                    onClick={() => {
                      timSinhVien(sinhVien.maSV);
                    }}
                    className="btn btn-warning ms-1"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormSinhVien;
