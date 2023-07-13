import React, { Component } from "react";
import {connect} from 'react-redux';
import { addSV } from "../../redux/reducers/QuanLySinhVienAction";

class FormSinhVien extends Component {
  state = {
    maSV: '',
    hoTen: '',
    email: '',
    soDienThoai: ''
  }

  getValueInput = (event) => {
    let {name, value} = event.target;
    // console.log(name, value);
    this.setState({
      [name]: value
    },()=>{
      console.log(this.state);
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    let sinhVien = {...this.state}
    this.props.themSinhVien(sinhVien);

  }



  render() {
    return (
      <div className="my-3">
        <div className="card text-start">
          <div className="card-header bg-dark text-white">
            Thông tin sinh viên
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="form-group col-6">
                  <label className="form-label">
                    Mã SV
                  </label>
                  <input
                    type="text"
                    name="maSV"
                    className="form-control"
                    value={this.state.maSV}
                    onChange={this.getValueInput}
                  />
                </div>
                <div className="form-group col-6">
                  <label className="form-label">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    name="hoTen"
                    className="form-control"
                    value={this.state.hoTen}
                    onChange={this.getValueInput}
                  />
                </div>
              </div>
              <div className="row my-3">
              <div className="form-group col-6">
                  <label className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.getValueInput}
                  />
                </div>
                <div className="form-group col-6">
                  <label className="form-label">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="soDienThoai"
                    className="form-control"
                    value={this.state.soDienThoai}
                    onChange={this.getValueInput}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-success">Thêm Sinh Viên</button>
                </div>
              </div>
              
              
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    themSinhVien: (sinhVien) => {
      // const action = {
      //   type: 'THEM_SINH_VIEN',
      //   payload: sinhVien
      // }
      dispatch(addSV(sinhVien));
    }
  };
};

export default connect(null, mapDispatchToProps)(FormSinhVien);

