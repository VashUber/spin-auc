import { enableStaticRendering } from 'mobx-react-lite';
export { lotsStore } from './lots';

enableStaticRendering(typeof window === 'undefined');
