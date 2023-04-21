/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FadeLoader } from 'react-spinners';
import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem';
import style from '../styles/modules/app.module.scss';

function AppContent() {
  const [data, setData] = useState();
  const [load, setload] = useState(false);
  const [loader, setloader] = useState(true);
  const todoList = useSelector((state) => state.todo.todoList);
  const sortTodoList = [...todoList];
  const sortedTodoList = sortTodoList.sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }

    return item.status === filterStatus;
  });

  const getTasks = async () => {
    setloader(true);
    console.log('getting data');
    let responce;
    if (localStorage.getItem('filter')) {
      console.log(localStorage.getItem('filter'));

      if (localStorage.getItem('filter') === 'all') {
        console.log('alllss');

        responce = await fetch(
          `https://tasks-app-backend-5lk0.onrender.com/tasks?user_id=${localStorage.getItem(
            'userId'
          )}`
        );
      }
      console.log(localStorage.getItem('filter'));
      responce = await fetch(
        `https://tasks-app-backend-5lk0.onrender.com/tasks?user_id=${localStorage.getItem(
          'userId'
        )}&${localStorage.getItem('filter')}=true`
      );
    } else {
      console.log('normal');
      responce = await fetch(
        `https://tasks-app-backend-5lk0.onrender.com/tasks?user_id=${localStorage.getItem(
          'userId'
        )}`
      );
    }

    const result = await responce.json();

    console.log(result.data);
    setloader(false);
    setData(result.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },

    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div
      className={style.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {loader ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FadeLoader color="#3641d6" />
        </div>
      ) : (
        <AnimatePresence>
          {/* {filteredTodoList && filteredTodoList.length > 0 ? (
              filteredTodoList.map((todo) => <TodoItem todo={todo} key={todo.id} />)
            ) : (
              <motion.p className={style.emptyText} variants={child}>
                NO TODO
              </motion.p>
            )} */}

          {data?.length > 0 ? (
            data?.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                setload={setload}
                load={load}
              />
            ))
          ) : (
            <motion.p className={style.emptyText} variants={child}>
              NO TODO
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default AppContent;
