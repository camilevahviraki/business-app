import React, { useState } from 'react';
import singularize from '../singularize/singulartze';
import './inputSelect.css';

const InputSelect = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [listShown, setlistShown] = useState([]);
  const [listVisible, setListVisible] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const {
    getSelectedData,
    data,
    inputClass,
    inputWrapperClassName,
    inputLabel,
    placeholder,
    listClass,
  } = props;

  document.addEventListener('mouseup', (e) => {
    const container = document.getElementById('select-element');
    if (!container.contains(e.target)) {
      setListVisible(false);
    }
  });

  const list = data;

  const searchElement = (e) => {
    const { value } = e.target;

    const newlist = list.filter((element) => element.name.toLowerCase().includes(value.toLowerCase()));
    setInputValue(value);
    setlistShown(newlist);
    setListVisible(true);

    const element = list.filter((element) => element.name === inputValue);
    if (getSelectedData && element.length > 0) {
      getSelectedData(element[0]);
    }
  };

  const selectElement = (element) => {
    setSelectedData(element);
    setInputValue(`${singularize(element.name)} at ${element.entity.name}`);
    setListVisible(false);
    if (getSelectedData) {
      getSelectedData(element);
    }
  };

  return (

    <div
      id="select-element"
      className={inputWrapperClassName || 'formR-input-wrap'}
    >
      {inputLabel ? (
        <label htmlFor='in-select'>{inputLabel}</label>
      ) : (
        <></>
      )}
      <input
        type="text"
        id='in-select'
        value={inputValue}
        onChange={searchElement}
        autoComplete="off"
        onClick={() => {
          setListVisible(true);
          if (inputValue === '') {
            setlistShown(list);
          }
        }}
        placeholder={placeholder || 'search element'}
        className={inputClass || 'element-search-input'}
      />
      {
        listVisible ? (
          <div className={listClass ? `countries-list ${listClass}` : 'countries-list'}>
            {
                listShown.map((element) => (
                  <div
                    key={element.name}
                    className={element.name === selectedData.name ? 'element-item selected-element' : 'element-item'}
                    onClick={() => selectElement(element)}
                  >
                    <p>
                      {singularize(element.name)}{' at '}{element.entity.name}
                    </p>
                  </div>
                ))
              }
          </div>
        )
          : (<></>)
       }
    </div>
  );
};

export default InputSelect;
