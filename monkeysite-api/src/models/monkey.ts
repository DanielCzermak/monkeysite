import mongoose from "mongoose";

export interface IMonkey extends mongoose.Document {
    commonName: string;
    genus: string;
    species: string;
    subSpecies: string;
    avgLifespan: number;
    habitat: string;
    description: string;
    imageUrl: string;
}

const monkeySchema = new mongoose.Schema<IMonkey>({
    commonName: {
        type: String,
        required: true
    },
    genus: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    subSpecies: {
        type: String,
        required: false
    },
    avgLifespan: {
        type: Number,
        min: 0,
        max: 100
    },
    habitat: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    }
});

monkeySchema.methods.getFullLatinName = function(): string {
    return `${this.genus} ${this.species} ${this.subSpecies || ""}`;
}

export default mongoose.model<IMonkey>("Monkey", monkeySchema);