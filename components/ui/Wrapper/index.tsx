import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import styles from './styles.module.scss';
import { LocationProvider } from '~/utils/LocationContext';
import { AccountProvider } from '~/utils/AccountContext';
import { ActivityProvider } from '~/utils/ActivityContext';

type WrapperTypes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

const Wrapper = ({ children }: WrapperTypes) => (
  <AccountProvider>
  <LocationProvider>
    <ActivityProvider>
    <div className={styles.app}>
      <Navbar />
      <main className="h-full">{children}</main>
      <Footer />
    </div>
    </ActivityProvider>
  </LocationProvider>
  </AccountProvider>
);

export default Wrapper;