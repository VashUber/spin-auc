import { Metadata } from 'next';
import { Home } from '~pages';

export const metadata: Metadata = {
  title: 'Spin Auction',
  description: 'Spin Auction'
};

const HomePage = function () {
  return <Home />;
};

export default HomePage;
