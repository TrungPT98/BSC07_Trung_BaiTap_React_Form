const initialState = {
  mangSinhVien: [
    {
      maSV: 1,
      hoTen: "Nguyễn Văn A",
      soDienThoai: "090909999",
      email: "vanA@gmail.com",
    },
  ],
};

export const QuanLySinhVienReducer = (state = initialState, action) => {
  switch (action.type) {
    case "THEM_SINH_VIEN":
      {
        // console.log(action);
        const mangSVUpdate = [...state.mangSinhVien, action.payload];
        console.log(mangSVUpdate);
        state.mangSinhVien = mangSVUpdate;
        console.log(state.mangSinhVien);
        console.log({...state})
        return { 
            ...state,
            // mangSVUpdate
         };
      }
    //   break;
    default: {
      return { ...state };
    }
  }
};
