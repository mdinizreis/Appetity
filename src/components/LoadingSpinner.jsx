import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  /*====================
  LOADS THE DIV ELEMENTS FOR THE LOADING SPINNER ANIMATION
  ====================*/
  return (
    <div className={styles.panLoader}>
      <div className={styles.loader}></div>
      <div className={styles.panContainer}>
        <div className={styles.pan}></div>
        <div className={styles.handle}></div>
      </div>
      <div className={styles.shadow}></div>
    </div>
  );
};

export default LoadingSpinner;
