import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import style from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import { deleteTodo, UpdateTodo } from '../Slices/todoSlice';
import TodModel from './TodModel';
import CheckButton from './CheckButton';

const child = {
  hidden: {
    opacity: 1,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

function TodoItem({ todo }) {
  const [isOpened, setIsOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Tast Deleted Succesfully');
  };

  const handleUpdate = () => {
    setIsOpened(true);
  };

  const handleChecked = () => {
    setChecked(!checked);
    dispatch(
      UpdateTodo({
        ...todo,
        status: checked ? 'incomplete' : 'complete',
      })
    );
  };
  return (
    <>
      <motion.div className={style.item} variants={child}>
        <div className={style.todoDetails}>
          <CheckButton
            todo={todo}
            checked={checked}
            handleChecked={handleChecked}
          />
          <div className={style.text}>
            <p
              className={getClasses([
                style.todoText,
                todo.status === 'complete' && style['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={style.time}>
              {format(new Date(todo.time), 'p, MM/dd, yyyy')}
            </p>
          </div>
        </div>
        <div className={style.todoActions}>
          <div
            className={style.icon}
            onClick={handleDelete}
            tabIndex={0}
            onKeyDown={handleDelete}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={style.icon}
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      {isOpened ? (
        <TodModel
          type="update"
          todo={todo}
          open={isOpened}
          setOpen={setIsOpened}
        />
      ) : (
        ' '
      )}
    </>
  );
}

export default TodoItem;
