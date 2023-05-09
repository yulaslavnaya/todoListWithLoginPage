import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri';
import Button from '../../UI/Button';

function TodoActions({ clearCompleted, resetTodo, completed }) {
    return (
        <>
            <Button onClick={resetTodo} title="Reset Todos">
                <RiRefreshLine />
            </Button>
            <Button
                onClick={clearCompleted}
                title="Clear completed Todos"
                disabled={!completed}
            >
                <RiDeleteBin2Line />
            </Button>
        </>
    );
}

export default TodoActions;
