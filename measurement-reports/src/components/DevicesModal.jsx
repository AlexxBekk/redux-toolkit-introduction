import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import devicesApi from "../services/devices";
import {
  setDevices,
  selectDevices,
  selectDevice,
  selectSelectedDevice,
} from "../features/deviceSlice";
import styles from "../styles/DeviceModal.module.css";
import modalStyles from "../styles/Modal.module.css";

const DeviceModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);
  const selectedDevice = useSelector(selectSelectedDevice);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devicesData = await devicesApi.getAll();
        dispatch(setDevices(devicesData));
      } catch (error) {
        console.error("Ошибка загрузки устройств:", error);
      }
    };

    fetchDevices();
  }, [dispatch]);

  useEffect(() => {
    if (selectedDevice) {
      setSelected(selectedDevice);
    }
  }, [selectedDevice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      dispatch(selectDevice(selected));
      onClose();
    }
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
        <h2>Выберите прибор</h2>
        <form onSubmit={handleSubmit}>
          <ul className={styles.list}>
            {devices.length === 0 ? (
              <li>Загрузка устройств...</li>
            ) : (
              devices.map((device) => (
                <li key={device.id} className={styles.listItem}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="device"
                      value={device.name}
                      checked={selected?.id === device.id}
                      onChange={() => setSelected(device)}
                    />
                    {device.name}
                  </label>
                </li>
              ))
            )}
          </ul>
          <div className={styles.submitButtons}>
            <button type="submit" disabled={!selected}>
              Сохранить
            </button>
            <button
              type="button"
              onClick={onClose}
              className={modalStyles.cancelButton}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeviceModal;
