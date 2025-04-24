import { Monkey, IMonkey } from "../models/monkey";

const API_URL = "http://localhost:3000";

export const getMonkeys = async (): Promise<Monkey[]> => {
    try {
        const res = await fetch(`${API_URL}/monkeys`);

        if (!res.ok) {
            throw new Error(`Fetching all failed! Status code: ${res.status}`);
        }

        const json = await res.json();
        console.log(json);

        const monkeys = json.data.map((monkey: any) => Monkey.apiResponseToMonkey(monkey));

        return monkeys;
    } catch (error: any) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

export const postMonkey = async (monkey: IMonkey): Promise<Monkey> => {
    try {
        const res = await fetch(`${API_URL}/monkeys`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(monkey),
        });

        if (!res.ok) {
            throw new Error("Failed to post data!");
        }

        const json = await res.json();
        return Monkey.apiResponseToMonkey(json.data);

    } catch (error: any) {
        console.error(`Error posting data: ${error.message}`);
    }
}

export const putMonkey = async (monkey: Monkey): Promise<Monkey> => {
    try {
        const res = await fetch(`${API_URL}/monkeys/${monkey.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(monkey),
        });

        if (!res.ok) {
            throw new Error("Failed to put data!");
        }

        const json = await res.json();
        return Monkey.apiResponseToMonkey(json.data);
    } catch (error: any) {
        console.error(`Error updating monkey: ${error.message}`);
    }
}

export const deleteMonkeyById = async (id: String): Promise<void> => {
    try {
        const res = await fetch(`${API_URL}/monkeys/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Failed to delete data!");
        }
    } catch (error: any) {
        console.error(`Error updating monkey: ${error.message}`);
    }
}