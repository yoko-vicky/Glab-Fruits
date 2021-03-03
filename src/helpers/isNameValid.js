const isNameValid = (inputName) => inputName.length >= 3 && inputName.length <= 10 && inputName.match(/[a-zA-Z0-9]/g);

export default isNameValid;
