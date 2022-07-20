import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import style from '../styles/modules/app.module.scss';
import TodModel from './TodModel';
import { updateFilterStaus } from '../Slices/todoSlice';

function AppHeader() {
  const [isOpened, setIsOpened] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(updateFilterStaus(e.target.value));
  };

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

      <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">ALL</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
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
