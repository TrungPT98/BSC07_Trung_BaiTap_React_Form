import { addSV } from "./QuanLySinhVienAction";

const initialState = {
  sinhVien: {
    maSV: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
  },
};

export const QuanLySinhVienReducer = (state = initialState, action) => {
  switch (action.type) {
    case addSV: {
      return {
        ...state,
        sinhVien: { ...state.sinhVien, ...action.payload },
      };
    }
    //   break;
    default:
      return state;
  }
};
