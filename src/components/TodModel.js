import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
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

function TodModel({ type, setOpen, todo }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, todo, setOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task Added Succesfully');
        setOpen(false);
      }
      if (type === 'update') {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            UpdateTodo({
              ...todo,
              title,
              status,
            })
          );
          toast.success('Task Updated Succesfully');
        } else {
          toast.error('NO CHANGES MADE');
          return;
        }
        setOpen(false);
      }
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
            <label htmlFor="status">
              Status
              <select
                type="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={style.buttonContainer}>
              <Button variants="primary" type="submit">
                {type === 'update' ? 'Update' : 'Add'} Task
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
