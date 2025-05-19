import { RingLoader } from 'react-spinners';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <RingLoader
      className={css.loader}
      color="#007bff"
      size={80}
      loading={true}
    />
  );
}
