import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Navbar from '../Navbar';
import styles from './styles.module.scss';
import { LocationProvider } from '~/utils/LocationContext';
import { ActivityProvider } from '~/utils/ActivityContext';

type WrapperTypes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

const Wrapper = ({ children }: WrapperTypes) => (
  <LocationProvider>
    <ActivityProvider>
    <div className={styles.app}>
      <Navbar />
      <main className="h-full">{children}</main>
    </div>
    </ActivityProvider>
  </LocationProvider>
);

export default Wrapper;