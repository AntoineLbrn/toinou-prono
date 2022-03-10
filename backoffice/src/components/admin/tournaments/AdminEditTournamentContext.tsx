import { createContext, useState } from "react";


interface AdminEditTournamentContextProps {
    displayerOpened: string;
    setDisplayerOpened: (label: string) => void
}

export const AdminEditTournamentContext = createContext<AdminEditTournamentContextProps>({
    displayerOpened: '',
    setDisplayerOpened: () => void(0),
});
export const AdminEditTournamentContextProvider = ({ children }: any) => {
    const [displayerOpened, setDisplayerOpened] = useState<string>('')
 
    return (
        <AdminEditTournamentContext.Provider value={{displayerOpened, setDisplayerOpened}}>
            {children}
        </AdminEditTournamentContext.Provider>
    )
}