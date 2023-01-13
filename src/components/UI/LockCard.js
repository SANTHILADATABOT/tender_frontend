import styles from './PreLoader.module.css';

const LockCard = (props) => {
return (
    <div className={styles.divPreloader}>
        {props.locked && <div className={styles.loading}>
          <img id="loading_image" className={`${styles.loading_image} ${styles.fitimage}`} src="/assets/img/lock.png" alt="Locked" />
        </div>}
        {props.children}
    </div>
)
}

export default LockCard;