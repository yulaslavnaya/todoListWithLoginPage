import Todo from './Todo';

function TodoList({ posts, deleteTodo, toglleTodo }) {
    return (
        <div>
            {!posts.length && <h2>Todo list is empty</h2>}
            {posts.map((post) => {
                return (
                    <Todo
                        post={post}
                        key={post.id}
                        deleteTodo={deleteTodo}
                        toglleTodo={toglleTodo}
                    />
                );
            })}
        </div>
    );
}

export default TodoList;
