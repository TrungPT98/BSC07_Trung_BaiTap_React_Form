// Validate form rỗng
export const validateForm = (data) => {
  const { maSV, hoTen, email, soDienThoai } = data;
  if (maSV !== "" && hoTen !== "" && email !== "" && soDienThoai !== "") {
    return true;
  }
};
// Validate text
export const validateHoTen = (data) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(data.hoTen);
};

// Validate email
export const validateEmail = (data) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(data.email);
};

// Validate number
export const validatePhone = (data) => {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(data.soDienThoai);
};

