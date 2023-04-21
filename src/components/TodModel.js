/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {BeatLoader} from 'react-spinners'
import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns/esm';
import { addTodo, UpdateTodo } from '../Slices/todoSlice';
import style from '../styles/modules/modal.module.scss';
import Button from './Button';

const dropin = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },

  visible: {
    opacity: 1,
    transform: 'scale(1)',
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
    exit: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
  },
};

function TodModel({ type, setOpen, todo, taskId }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [Tod, setTod] = useState()
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [dueDate, setdueDate] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
      setdescription(todo.description);
      setdueDate(todo.dueDate);
      console.log(taskId)
    } else {
      setTitle('');
      setStatus('incomplete');
      setdescription('');
      setdueDate('');
    }
  }, [type, todo, setOpen]);

  const handleSubmit = (e) => {
    //     console.log(
    //       typeof parseInt(dueDate),
    //       dueDate,
    //       new Date().getMinutes(),
    //       new Date(
    //         new Date().setMinutes(new Date().getMinutes() + parseInt(dueDate))
    //       ).toLocaleString(),
    //       new Date().toLocaleString()
    //     );
    e.preventDefault();
    //     if (title === '') {
    //       toast.error('Please enter a title');
    //     }
    //     if (title && status) {
    //       if (type === 'add') {
    //         dispatch(
    //           addTodo({
    //             id: uuid(),
    //             title,
    //             status,
    //             description,
    //             dueDate: new Date(
    //               new Date().setMinutes(new Date().getMinutes() + parseInt(dueDate))
    //             ).toLocaleString(),
    //             time: new Date().toLocaleString(),
    //           })
    //         );
    //         toast.success('Task Added Succesfully');
    //         setOpen(false);
    //       }
    //       if (type === 'update') {
    //         if (
    //           todo.title !== title ||
    //           todo.status !== status ||
    //           todo.description !== description ||
    //           todo.dueDate !== dueDate
    //         ) {
    //           dispatch(
    //             UpdateTodo({
    //               ...todo,
    //               title,
    //               status,
    //               description,
    //               dueDate,
    //             })
    //           );
    //           toast.success('Task Updated Succesfully');
    //         } else {
    //           toast.error('NO CHANGES MADE');
    //           return;
    //         }
    //         setOpen(false);
    //       }
    //
  };

  //   user_id: 4,
  //   title,
  //   status,
  //   description,
  //   due_date: null,

  const createTasks = async () => {
    setLoader(true)    
    console.log(
        JSON.parse(localStorage.getItem('userId'))
    );
    
    if (type === 'add'){
        await axios
      .post('https://tasks-app-backend-5lk0.onrender.com/tasks/save', {
        user_id: JSON.parse(localStorage.getItem('userId')),
        title,
        description,
        status,
        due_date: dueDate
      })
      .then((res) => {
        setLoader(false);
        location.reload()
        setOpen(false);
        console.log(res);
      })
      .catch((err) => {
        setLoader(false)
        console.log(err);
      });
    }

    if (type === 'update'){
        await axios
      .post('https://tasks-app-backend-5lk0.onrender.com/tasks/save', {
        task_id: taskId,
        title,
        description,
        status,
        due_date: dueDate
      })
      .then((res) => {
        setLoader(false)
        location.reload()    
        setOpen(false);
        setTitle(res.data.data.title);
      setStatus(res.data.data.status);
      setdescription(res.data.data.description);
      setdueDate(res.data.data.dueDate);
        console.log(res);
      })
      .catch((err) => {
        setLoader(false)
        console.log(err);
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={style.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={style.container}
          variants={dropin}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={style.closeButton}
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
            role="button"
            tabIndex={0}
            initial={{ opacity: 0, top: 40 }}
            animate={{ opacity: 1, top: -10 }}
            exit={{ opacity: 0, top: 40 }}
          >
            <MdOutlineClose />
          </motion.div>
          <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={style.formTitle}>
              {type === 'update' ? 'Update' : 'Add'} Task
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label htmlFor="description">
              Description
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </label>

            <label htmlFor="description">
              Due Date
              <input
                type="date"
                id="dueDate"
                placeholder="In minutes"
                value={dueDate}
                onChange={(e) =>
                  type === 'update' ? {} : setdueDate(e.target.value)
                }
              />
            </label>

            <label htmlFor="status">
              Status
              <select
                type="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={style.buttonContainer}>
              <Button variants="primary" type="submit" onClick={createTasks}>
                {loader ? <BeatLoader color="#fff" size={10} /> : (type === 'update' ? 'Update Task' : 'Add Task')}
              </Button>

              <Button
                variants="secondary"
                onClick={() => setOpen(false)}
                onKeyDown={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TodModel;
