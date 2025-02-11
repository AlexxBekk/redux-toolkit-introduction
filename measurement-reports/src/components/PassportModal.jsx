import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPassportData, selectPassport } from "../features/passportSlice";
import styles from "../styles/PassportModal.module.css";
import modalStyles from "../styles/Modal.module.css";

const PassportModal = ({ onClose }) => {
  const passportData = useSelector(selectPassport);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: passportData.name || "",
    date: passportData.date || "",
    operator: passportData.operator || "",
  });

  useEffect(() => {
    setFormData(passportData);
  }, [passportData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setPassportData(formData));
    onClose();
  };

  return (
    <div className={modalStyles.modalBackground} onClick={onClose}>
      <div
        className={modalStyles.modalContent}
        onClick={(event) => event.stopPropagation()}
      >
        <button onClick={onClose} className={modalStyles.closeButton}>
          &times;
        </button>
        <h2>Веведите паспортные данные</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Название измерения"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="date"
            name="date"
            placeholder="Дата"
            value={formData.date}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="operator"
            placeholder="Оператор"
            value={formData.operator}
            onChange={handleChange}
            className={styles.input}
          />
          <div className={styles.buttons}>
            <button type="submit" className={`${styles.button}`}>
              Сохранить
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`${styles.button} ${modalStyles.cancelButton}`}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PassportModal;
