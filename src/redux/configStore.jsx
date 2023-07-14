import { configureStore } from '@reduxjs/toolkit';
import { QuanLySinhVienReducer } from './reducers/QuanLySinhVienReducer';


const store = configureStore({
    reducer: {
        sinhVien: QuanLySinhVienReducer,
    }
})
export default store;