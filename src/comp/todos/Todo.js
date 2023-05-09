import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import styles from './Todo.module.css';

function Todo({ post, deleteTodo, toglleTodo }) {
    return (
        <div
            className={`${styles.todo} ${
                post.isComplited ? styles.completedTodo : ''
            }`}
        >
            <BsFillBookmarkHeartFill className={styles.todoIcon} />
            <div className={styles.todoText}>{post.content}</div>
            <RiDeleteBin2Line
                className={styles.deleteIcon}
                onClick={() => deleteTodo(post.id)}
            />
            <FaCheck
                className={styles.checkIcon}
                onClick={() => toglleTodo(post.id)}
            />
        </div>
    );
}

export default Todo;
