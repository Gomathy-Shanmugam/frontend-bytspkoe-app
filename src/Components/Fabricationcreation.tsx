import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FabricationCreation.css';
import NotificationPopup from './NotificationPopup';

interface FibreGroup {
  classification: string;
  fibreName: string;
  fComposition: string;
}

interface YarnData {
  nDescription: string;
  nValue: string;
  yComposition: string;
  fibreGroups: FibreGroup[];
}

interface LocationState {
  isEditMode?: boolean;
  fabricData?: {
    id: number;
    fabricName: string;
    gsm: string;
    numYarns: number;
    status: string;
    yarnCompositions: YarnData[];
  };
}

const FabricationCreation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [numYarns, setNumYarns] = useState(1);
  const [fabricName, setFabricName] = useState('Fabric 1');
  const [gsm, setGsm] = useState('');
  const [status, setStatus] = useState('Active');
  const [yarnCompositions, setYarnCompositions] = useState<YarnData[]>([]);
  const [yarnError, setYarnError] = useState('');
  const [fibreError, setFibreError] = useState('');
  const [emptyFibreError, setEmptyFibreError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [emptyFieldError, setEmptyFieldError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [emptyFields, setEmptyFields] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (state?.isEditMode && state.fabricData) {
      setIsEditMode(true);
      setEditId(state.fabricData.id);
      setFabricName(state.fabricData.fabricName);
      setGsm(state.fabricData.gsm);
      setNumYarns(state.fabricData.numYarns);
      setStatus(state.fabricData.status);
      setYarnCompositions(state.fabricData.yarnCompositions || []);
    } else {
      const initialYarns = Array(numYarns).fill(null).map((_, index) => ({
        nDescription: 'Count',
        nValue: '',
        yComposition: numYarns === 1 ? '100' : '',
        fibreGroups: [{
          classification: '',
          fibreName: '',
          fComposition: numYarns === 1 ? '100' : ''
        }]
      }));
      setYarnCompositions(initialYarns);
    }
  }, [state, numYarns]);

  const getPanelWidth = () => {
    const panelWidth = 25;
    return `${numYarns * panelWidth}%`;
  };

  const validateForm = () => {
    const emptyFieldsMap: Record<string, boolean> = {};
    
    // Check main fields
    if (!fabricName) emptyFieldsMap.fabricName = true;
    if (!gsm) emptyFieldsMap.gsm = true;
    
    // Check yarn fields
    yarnCompositions.forEach((yarn, yarnIndex) => {
      if (!yarn.nValue) emptyFieldsMap[`yarn-${yarnIndex}-nValue`] = true;
      if (!yarn.yComposition) emptyFieldsMap[`yarn-${yarnIndex}-yComposition`] = true;
      
      yarn.fibreGroups.forEach((fibre, fibreIndex) => {
        if (!fibre.fibreName) emptyFieldsMap[`yarn-${yarnIndex}-fibre-${fibreIndex}-fibreName`] = true;
        if (!fibre.classification) emptyFieldsMap[`yarn-${yarnIndex}-fibre-${fibreIndex}-classification`] = true;
        if (!fibre.fComposition) emptyFieldsMap[`yarn-${yarnIndex}-fibre-${fibreIndex}-fComposition`] = true;
      });
    });

    setEmptyFields(emptyFieldsMap);
    
    const hasEmptyFields = Object.keys(emptyFieldsMap).length > 0;
    const allYarnsFilled = yarnCompositions.every(y => y.yComposition !== '');
    const yarnTotal = yarnCompositions.reduce(
      (sum, yarn) => sum + (parseInt(yarn.yComposition) || 0), 0
    );
    
    let fibresValid = true;
    yarnCompositions.forEach(yarn => {
      const fibreTotal = yarn.fibreGroups.reduce(
        (sum, fibre) => sum + (parseInt(fibre.fComposition) || 0), 0
      );
      if (fibreTotal !== 100) fibresValid = false;
    });

    setEmptyFieldError(hasEmptyFields ? 'All fields are required' : '');
    setEmptyFibreError(yarnCompositions.some(y => 
      y.fibreGroups.some(f => !f.fComposition)) 
      ? 'F.Composition should not be empty' : '');
    setYarnError(allYarnsFilled && yarnTotal !== 100 ? 'Yarn compositions must total 100%' : '');
    setFibreError(!fibresValid ? 'Fibre compositions must total 100%' : '');

    return !hasEmptyFields && allYarnsFilled && yarnTotal === 100 && fibresValid;
  };

  const handleYarnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, Math.min(4, Number(e.target.value) || 1));
    setNumYarns(val);
  };

  const handleYCompositionChange = (yarnIndex: number, value: string) => {
    if (value !== '' && (!/^\d*$/.test(value) || parseInt(value) > 100)) return;
    
    const newData = [...yarnCompositions];
    newData[yarnIndex] = {
      ...newData[yarnIndex],
      yComposition: value
    };
    setYarnCompositions(newData);
    
    // Clear error when user starts typing
    if (value) {
      setEmptyFields(prev => ({ ...prev, [`yarn-${yarnIndex}-yComposition`]: false }));
    }
  };

  const handleFCompositionChange = (yarnIndex: number, fibreIndex: number, value: string) => {
    if (value !== '' && (!/^\d*$/.test(value) || parseInt(value) > 100)) return;
    
    const newData = [...yarnCompositions];
    const currentYarn = newData[yarnIndex];
    const currentFibres = [...currentYarn.fibreGroups];
    
    const currentTotalWithoutNewValue = currentFibres.reduce(
      (sum, fibre, idx) => sum + (idx === fibreIndex ? 0 : parseInt(fibre.fComposition) || 0), 0
    );
    
    const newValue = parseInt(value) || 0;
    if (value !== '' && currentTotalWithoutNewValue + newValue > 100) return;
    
    currentFibres[fibreIndex] = {
      ...currentFibres[fibreIndex],
      fComposition: value
    };
    
    const currentTotal = currentTotalWithoutNewValue + newValue;
    
    if (currentTotal < 100 && fibreIndex === currentFibres.length - 1) {
      currentFibres.push({
        classification: '',
        fibreName: '',
        fComposition: ''
      });
    } else if (currentTotal === 100) {
      for (let i = currentFibres.length - 1; i > 0; i--) {
        if (!currentFibres[i].fComposition) {
          currentFibres.pop();
        } else {
          break;
        }
      }
    }
    
    newData[yarnIndex] = {
      ...currentYarn,
      fibreGroups: currentFibres
    };
    setYarnCompositions(newData);
    
    // Clear error when user starts typing
    if (value) {
      setEmptyFields(prev => ({ ...prev, [`yarn-${yarnIndex}-fibre-${fibreIndex}-fComposition`]: false }));
    }
  };

  const handleSave = () => {
    setHasUserInteracted(true);
    const isValid = validateForm();
    
    if (!isValid) return;

    const existingData = JSON.parse(localStorage.getItem('fabricationData') || '[]');
    
    if (isEditMode && editId) {
      const updatedData = existingData.map((item: any) => 
        item.id === editId ? {
          ...item,
          fabricName,
          gsm,
          numYarns,
          status,
          noOfFibre: yarnCompositions.reduce((sum, yarn) => sum + yarn.fibreGroups.length, 0).toString(),
          yarnCompositions
        } : item
      );
      localStorage.setItem('fabricationData', JSON.stringify(updatedData));
      setPopupMessage('Fabric updated successfully!');
    } else {
      const newEntry = {
        id: existingData.length + 1,
        fabricName,
        gsm,
        numYarns,
        status: 'Active',
        createdOn: new Date().toLocaleDateString('en-GB'),
        createdBy: 'Admin',
        noOfFibre: yarnCompositions.reduce((sum, yarn) => sum + yarn.fibreGroups.length, 0).toString(),
        countDenier: '30s',
        yarnCompositions
      };
      localStorage.setItem('fabricationData', JSON.stringify([...existingData, newEntry]));
      setPopupMessage('Fabric saved successfully!');
    }

    setShowPopup(true);
    setTimeout(() => {
      navigate('/fabrication-list');
    }, 2000);
  };

  // Helper function to check if a field is empty
  const isFieldEmpty = (fieldId: string) => {
    return hasUserInteracted && emptyFields[fieldId];
  };

  return (
    <div className={`fabrication-container ${hasUserInteracted ? 'show-errors' : ''}`}>
      <div className="breadcrumb">Home &gt; Fabric Composition Creation</div>

      <div className="error-messages-container">
        {emptyFieldError && <div className="global-error-message">{emptyFieldError}</div>}
        {yarnError && <div className="global-error-message">{yarnError}</div>}
        {fibreError && <div className="global-error-message">{fibreError}</div>}
        {emptyFibreError && <div className="global-error-message">{emptyFibreError}</div>}
      </div>

      <div className="control-panel-wrapper" style={{ width: getPanelWidth() }}>
        <div className="control-panel">
          <div className="control-first-line">
            <div className="control-group yarn-count-group">
              <label>No.of Yarn</label>
              <input
                type="number"
                min="1"
                max="4"
                value={numYarns}
                onChange={handleYarnChange}
              />
            </div>
            
            {isEditMode && (
              <div className="control-group status-group">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Active</option>
                  <option>In-Active</option>
                </select>
              </div>
            )}

            <div className="control-group edit-group">
              <label>Actions</label>
              {isEditMode && (
                <button className="edit-icon-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="control-second-line">
            <div className="control-group fabric-group">
              <label>Select Fabric</label>
              <select
                className={isFieldEmpty('fabricName') ? 'error' : ''}
                value={fabricName}
                onChange={(e) => {
                  setFabricName(e.target.value);
                  if (e.target.value) {
                    setEmptyFields(prev => ({ ...prev, fabricName: false }));
                  }
                }}
              >
                {/* <option value="">Select</option> */}
                <option>Single Jersey</option>
                <option>Double Jersey</option>
                <option>Lacoste</option>
              </select>
            </div>
            
            <div className="control-group gsm-group">
              <label>GSM</label>
              <input
                type="text"
                className={isFieldEmpty('gsm') ? 'error' : ''}
                value={gsm}
                onChange={(e) => {
                  setGsm(e.target.value);
                  if (e.target.value) {
                    setEmptyFields(prev => ({ ...prev, gsm: false }));
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="yarn-scroll-container">
        <div className="yarn-panels-container" style={{ width: getPanelWidth() }}>
          {yarnCompositions.map((yarn, yarnIndex) => (
            <div 
              key={`yarn-${yarnIndex}`} 
              className={`yarn-panel ${yarnError ? 'error-border' : ''}`}
              style={{ width: '25%' }}
            >
              <h3 className="yarn-heading">Yarn {yarnIndex + 1}</h3>
              
              <div className="yarn-composition">
                <div className="left-column">
                  <div className="form-group">
                    <label>N-Description</label>
                    <select
                      value={yarn.nDescription}
                      onChange={(e) => {
                        const newData = [...yarnCompositions];
                        newData[yarnIndex].nDescription = e.target.value;
                        setYarnCompositions(newData);
                      }}
                    >
                      <option>Count</option>
                      <option>Denier</option>
                      <option>Tex</option>
                      <option>Lea</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>N-Value</label>
                    <input
                      type="text"
                      className={isFieldEmpty(`yarn-${yarnIndex}-nValue`) ? 'error' : ''}
                      value={yarn.nValue}
                      onChange={(e) => {
                        const newData = [...yarnCompositions];
                        newData[yarnIndex].nValue = e.target.value;
                        setYarnCompositions(newData);
                        if (e.target.value) {
                          setEmptyFields(prev => ({ ...prev, [`yarn-${yarnIndex}-nValue`]: false }));
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="right-column">
                  <div className="form-group y-composition-group">
                    <label>Y.Composition</label>
                    <div className={`y-composition-input ${yarnError ? 'error' : ''} ${isFieldEmpty(`yarn-${yarnIndex}-yComposition`) ? 'error' : ''}`}>
                      <input
                        type="text"
                        value={yarn.yComposition}
                        onChange={(e) => handleYCompositionChange(yarnIndex, e.target.value)}
                      />
                      <span className="percentage-symbol">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {yarn.fibreGroups.map((fibre, fibreIndex) => (
                <div key={`fibre-${fibreIndex}`} className="fibre-details">
                  <h4 className="fibre-heading">Fibre Details {fibreIndex + 1}</h4>
                  
                  <div className="fibre-fields-container">
                    <div className="fibre-field-row">
                      <div className="fibre-field-group">
                        <label>Fibre Name</label>
                        <select
                          className={isFieldEmpty(`yarn-${yarnIndex}-fibre-${fibreIndex}-fibreName`) ? 'error' : ''}
                          value={fibre.fibreName}
                          onChange={(e) => {
                            const newData = [...yarnCompositions];
                            newData[yarnIndex].fibreGroups[fibreIndex].fibreName = e.target.value;
                            setYarnCompositions(newData);
                            
                            if (e.target.value) {
                              setEmptyFields((prev) => ({
                                ...prev,
                                [yarn-${yarnIndex}-fibre-${fibreIndex}-fibreName]: false
                              }));
                            }
                          }}
                        >
                          <option value="">Select</option>
                          <option>Cotton</option>
                          <option>Polyster</option>
                          <option>Modal</option>
                          <option>Nylon</option>
                          <option>Spandex</option>
                          <option>Rayon</option>
                          <option>Lyocel</option>
                          <option>Viscose</option>
                          <option>Acrylic</option>
                        </select>
                      </div>
                    </div>

                    <div className="fibre-field-row">
                      <div className="fibre-field-group classification-group">
                        <label>Classification</label>
                        <select
                          className={isFieldEmpty(`yarn-${yarnIndex}-fibre-${fibreIndex}-classification`) ? 'error' : ''}
                          value={fibre.classification}
                          onChange={(e) => {
                            const newData = [...yarnCompositions];
                            newData[yarnIndex].fibreGroups[fibreIndex].classification = e.target.value;
                            setYarnCompositions(newData);
                            if (e.target.value) {
                              setEmptyFields(prev => ({ ...prev, [yarn-${yarnIndex}-fibre-${fibreIndex}-classification]: false }));
                            }
                          }}
                        >
                          <option value="">Select</option>
                          <option>BCI</option>
                          <option>OCS</option>
                          <option>Regular</option>
                          <option>Recycled</option>
                          <option>Organic</option>
                          <option>Virgin</option>
                          <option>CMIA</option>
                          <option>Mixed Grade</option>
                        </select>
                      </div>
                      
                      <div className="fibre-field-group">
                        <label>F.Composition</label>
                        <div className={`f-composition-input ${fibreError || emptyFibreError ? 'error' : ''} ${isFieldEmpty(`yarn-${yarnIndex}-fibre-${fibreIndex}-fComposition`) ? 'error' : ''}`}>
                          <input
                            type="text"
                            value={fibre.fComposition}
                            onChange={(e) => handleFCompositionChange(yarnIndex, fibreIndex, e.target.value)}
                          />
                          <span className="percentage-symbol">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="save-button-container">
        <button 
          onClick={handleSave}
          className="active-save"
        >
          {isEditMode ? 'Update' : 'Save'}
        </button>
      </div>

      {showPopup && (
        <NotificationPopup
          message={popupMessage}
          type="success"
          onClose={() => setShowPopup(false)}
          duration={2000}
        />
      )}
    </div>
  );
};

export default FabricationCreation;
function handleSave(event: React.MouseEvent<HTMLButtonElement>): void {
  throw new Error('Function not implemented.');
}

function setShowPopup(arg0: boolean): void {
  throw new Error('Function not implemented.');
}

