import styles from './Button.module.css';

function Button(props) {
	const { children, disabled = false } = props;
	return (
		<button {...props} disabled={disabled} className={styles.add}>
			{children}
		</button>
	);
}

export default Button;
