import React, { Component } from "react";
import { connect } from "react-redux";

class TableSinhVien extends Component {
  renderSinhVien = () => {
    const { mangSinhVien } = this.props.mangSinhVien;
    return mangSinhVien.map((sinhVien, index) => {
      return (
        <tr key={index}>
          <td>{sinhVien.maSV}</td>
          <td>{sinhVien.hoTen}</td>
          <td>{sinhVien.soDienThoai}</td>
          <td>{sinhVien.email}</td>
        </tr>
      );
    });
  };

  render() {
    // console.log(this.props.mangSinhVien);
    return (
      <div>
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.renderSinhVien()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mangSinhVien: state.mangSinhVien,
  };
};

export default connect(mapStateToProps)(TableSinhVien);

