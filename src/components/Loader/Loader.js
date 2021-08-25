import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './LoaderSpinner.module.scss';

const LoaderSpinner = () => (
  <div className={styles.LoaderSpinner}>
    <Loader width={200} height={200} color="blue" type="Audio" />
  </div>
);

export default LoaderSpinner;
