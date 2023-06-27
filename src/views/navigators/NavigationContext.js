import { createContext } from 'react';

export const NavigationContext = createContext({
    selectedTab: 'Home',
    setSelectedTab: () => { },
});