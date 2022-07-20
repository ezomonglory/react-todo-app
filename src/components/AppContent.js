import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem';
import style from '../styles/modules/app.module.scss';

function AppContent() {
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
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => <TodoItem todo={todo} key={todo.id} />)
        ) : (
          <motion.p className={style.emptyText} variants={child}>
            NO TODO
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
