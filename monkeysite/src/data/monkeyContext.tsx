import { createContext } from "preact";
import { useEffect, useState } from "preact/hooks";

import { getMonkeys, postMonkey, putMonkey, deleteMonkeyById } from "./monkeyService";
import { Monkey, IMonkey } from "../models/monkey";

interface MonkeyContextType {
    data: Monkey[];
    addMonkey: (monkey: IMonkey) => Promise<Monkey>;
    updateMonkey: (monkey: Monkey) => Promise<Monkey>;
    deleteMonkey: (id: string) => Promise<void>;
}

export const MonkeyContext = createContext<MonkeyContextType | undefined>(undefined);

export const MonkeyProvider = ({ children }: { children: preact.ComponentChildren }) => {
    const [monkeys, setMonkeys] = useState<Monkey[]>([]);

    useEffect(() => {
        const loadMonkeys = async () => {
            const monkeys = await getMonkeys();
            setMonkeys(monkeys);
        };
        loadMonkeys();
    }, []);

    // Adds a new monkey
    async function addMonkey(monkey: IMonkey): Promise<Monkey> {
        const newMonkey = await postMonkey(monkey);
        setMonkeys([...monkeys, newMonkey]);
        return newMonkey;
    }

    // Updates received monkey with the same id    
    async function updateMonkey(monkey: Monkey): Promise<Monkey> {
        const updatedMonkey = await putMonkey(monkey);
        setMonkeys(monkeys.map((m: Monkey) => m.id === updatedMonkey.id ? updatedMonkey : m));
        return updatedMonkey;
    }

    // Deletes monkey with the received id
    async function deleteMonkey(id: string): Promise<void> {
        await deleteMonkeyById(id);
        setMonkeys(monkeys.filter((monkey: Monkey) => monkey.id !== id));
    }

    return (
        <MonkeyContext.Provider value={{ data: monkeys, addMonkey, updateMonkey, deleteMonkey }}>
            {children}
        </MonkeyContext.Provider>
    );
}