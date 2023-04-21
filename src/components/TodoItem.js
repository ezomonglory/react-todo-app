/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';
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

function TodoItem({ todo, setload, load }) {
  const [isOpened, setIsOpened] = useState(false);
  const [loader, setloader] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = async () => {
    setloader(true);
    dispatch(deleteTodo(todo.id));
    console.log(todo.id);
    try {
      await axios.delete(
        'https://tasks-app-backend-5lk0.onrender.com/tasks/delete',
        {
          data: { task_ids: [todo.id] },
        }
      );
      console.log('delete');
      toast.success('Tast Deleted Succesfully');
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    setIsOpened(true);
    console.log(todo.id);
  };

  const handleChecked = () => {
    setChecked(!checked);
    console.log(checked);
    checked !== true
      ? (todo.status = 'incomplete')
      : (todo.status = 'complete');
  };

  return (
    <>
      {loader ? (
        <div
          className={style.item}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BeatLoader color="#3641d6" size={10} />
        </div>
      ) : (
        <motion.div className={style.item} variants={child}>
          <div className={style.todoDetails}>
            <div className={style.text}>
              <p
                className={getClasses([
                  style.todoText,
                  todo.status === 'complete' && style['todoText--completed'],
                ])}
              >
                {todo.title}
              </p>
              <p
                className={getClasses([
                  style.description,
                  todo.status === 'complete' && style['todoText--completed'],
                ])}
              >
                {todo.description}
              </p>

              <p
                className={getClasses([
                  style.status,
                  todo.status === 'complete' && style['todoText--completed'],
                ])}
              >
                {todo.status}
              </p>

              <p className={style.time}>
                {/* {format(new Date(todo.due_date), 'p, MM/dd, yyyy')} */}
                {todo.due_date}
              </p>
            </div>
          </div>
          <div className={style.todoActions}>
            <div
              className={style.icon}
              onClick={handleDelete}
              tabIndex={0}
              // onKeyDown={handleDelete}
              role="button"
            >
              <MdDelete />
            </div>
            <div
              className={style.icon}
              onClick={handleUpdate}
              tabIndex={0}
              role="button"
            >
              <MdEdit />
            </div>
          </div>
        </motion.div>
      )}
      {isOpened ? (
        <TodModel
          type="update"
          todo={todo}
          open={isOpened}
          taskId={todo.id}
          setOpen={setIsOpened}
          setload={setload}
          load={load}
        />
      ) : (
        ' '
      )}
    </>
  );
}

export default TodoItem;
