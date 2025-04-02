import { createContext } from "preact";
import { useEffect, useState } from "preact/hooks";

import { monkeysData } from "./monkeysData";
import { Monkey } from "../models/monkey";

interface MonkeyContextType {
    data: Monkey[];
    addMonkey: (monkey: Monkey) => void;
    updateMonkey: (monkey: Monkey) => void;
    deleteMonkey: (id: number) => void;
}

export const MonkeyContext = createContext<MonkeyContextType | undefined>(undefined);

export const MonkeyProvider = ({ children }: { children: preact.ComponentChildren }) => {
    
    // Retrieves monkeys from local storage or defaults to monkeysData.ts values
    const [monkeys, setMonkeys] = useState<Monkey[]>(
        () => {
            const storedMonkeys = localStorage.getItem("monkeys");
            return storedMonkeys 
                ? JSON.parse(storedMonkeys).map((monkey: Monkey) => new Monkey(
                    monkey.id, monkey.commonName, monkey.genus, monkey.species, monkey.subSpecies, monkey.avgLifespan, monkey.habitat, monkey.description, monkey.imageUrl
                ))
                 : monkeysData;
    });

    // Updates local storage when context is changed
    useEffect(() => {
        localStorage.setItem("monkeys", JSON.stringify(monkeys));
    }, [monkeys]);


    // Adds a new monkey with an auto incremented id
    function addMonkey(monkey: Monkey) {
        const id = monkeys.length > 0 ? Math.max(...monkeys.map((m: Monkey) => m.id)) + 1 : 1;
        monkey.id = id; 
        setMonkeys([...monkeys, monkey]);
    }

    // Updates received monkey with the same id    
    function updateMonkey(monkey: Monkey) {
        setMonkeys(monkeys.map((m: Monkey) => m.id === monkey.id ? monkey : m));
    }

    // Deletes monkey with the received id
    function deleteMonkey(id: number) {
        setMonkeys(monkeys.filter((monkey: Monkey) => monkey.id !== id));
    }

    return (
        <MonkeyContext.Provider value={{ data: monkeys, addMonkey, updateMonkey, deleteMonkey }}>
            {children}
        </MonkeyContext.Provider>
    );
}