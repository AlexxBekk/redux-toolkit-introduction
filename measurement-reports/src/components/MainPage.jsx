import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPassport } from "../features/passportSlice";
import { selectSelectedDevice } from "../features/deviceSlice";
import {
  selectResults,
  selectUsedDevice,
  addResults,
  clearResults,
} from "../features/resultsSlice";
import "../styles/globalStyles.css";
import PassportModal from "./PassportModal";
import DeviceModal from "./DevicesModal";

const MainPage = () => {
  const selectedDevice = useSelector(selectSelectedDevice);
  const results = useSelector(selectResults);
  const usedDevice = useSelector(selectUsedDevice);
  const passportData = useSelector(selectPassport);
  const dispatch = useDispatch();

  const [modalType, setModalType] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const openPassportModal = () => setModalType("passport");
  const openDeviceModal = () => setModalType("device");
  const closeModal = () => setModalType(null);

  const generateMeasurements = () => {
    const randomResults = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100)
    );
    return randomResults;
  };

  const handleStartMeasurement = () => {
    if (!selectedDevice) {
      alert("Пожалуйста, выберите прибор");
      return;
    }

    const newResults = generateMeasurements();
    console.log(newResults);
    dispatch(addResults({ results: newResults, usedDevice: selectedDevice }));
  };
  const handleGenerateReport = () => {
    if (!results.length || !usedDevice || !passportData) {
      alert("Нет данных для отчета");
      return;
    }
    setShowReport(true);
  };

  const handleClearResults = () => {
    dispatch(clearResults());
    setShowReport(false);
  };

  const memoizedReport = useMemo(() => {
    if (!showReport || !usedDevice) return null;

    const passportInfo = passportData.name ? (
      <div>
        <h3>Паспортные данные:</h3>
        <p>Название измерения: {passportData.name}</p>
        <p>Дата: {passportData.date}</p>
        <p>Оператор: {passportData.operator}</p>
      </div>
    ) : (
      <p>Паспортные данные отсутствуют</p>
    );

    return (
      <div>
        <h3>Отчет:</h3>
        <p>
          <strong>Прибор:</strong> {usedDevice.name}
        </p>
        <p>
          <strong>Результаты измерений:</strong> {results.join(", ")}
        </p>
        {passportInfo}
      </div>
    );
  }, [showReport, results, usedDevice, passportData]);

  return (
    <div>
      <h2>Measurement Reports</h2>
      <div className={"buttons"}>
        <button onClick={openPassportModal}>Занести паспортные данные</button>
        <button onClick={openDeviceModal}>Выбрать прибор</button>
      </div>
      <div className={"buttons"}>
        <button onClick={handleStartMeasurement}>Начать измерения</button>
        <button onClick={handleGenerateReport}>Сформировать отчёт</button>
      </div>

      {usedDevice && (
        <div>
          <h3>Выбранный прибор: {usedDevice.name}</h3>
        </div>
      )}

      {results && (
        <div>
          <h3>Результаты измерений</h3>
          <ul className={"measurementsList"}>
            {results.map((result, index) => (
              <li key={index}>
                <span className={"measure"}>Измерение {index + 1}: </span>
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}

      {memoizedReport}
      {modalType === "passport" && <PassportModal onClose={closeModal} />}
      {modalType === "device" && <DeviceModal onClose={closeModal} />}

      <button onClick={handleClearResults}>Очистить результаты</button>
    </div>
  );
};

export default MainPage;
