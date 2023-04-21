/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import style from '../styles/modules/app.module.scss';
import TodModel from './TodModel';
import { updateFilterStaus } from '../Slices/todoSlice';

function AppHeader() {
  const [val, setVal] = useState();
  const [isOpened, setIsOpened] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(updateFilterStaus(e.target.value));
  };

  const getVal = async () => {
    if (localStorage.getItem('filter')) {
      setVal(localStorage.getItem('filter'));
    }
  };

  const handleFilter = (e) => {
    localStorage.setItem('filter', e.target.value);
    setVal(e.target.value);
    location.reload();
  };

  useEffect(() => {
    getVal();
  }, []);

  return (
    <div className={style.appHeader}>
      <Button
        variants="primary"
        type="button"
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        Add Task
      </Button>

      <SelectButton
        value={val}
        id="status"
        onChange={(e) => {
          handleFilter(e);
        }}
      >
        <option value="all">ALL</option>
        <option value="title">Title</option>
        <option value="status">Status</option>
        <option value="due_date">Due-Date</option>
      </SelectButton>
      {isOpened ? (
        <TodModel type="add" open={isOpened} setOpen={setIsOpened} />
      ) : (
        ''
      )}
    </div>
  );
}

export default AppHeader;
