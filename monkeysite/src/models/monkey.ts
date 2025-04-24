export class Monkey {
    id: string;
    commonName: string;
    genus: string;
    species: string;
    subSpecies: string;
    avgLifespan: number;
    habitat: string;
    description: string;
    imageUrl: string;

    constructor(id: string, commonName: string, genus: string, species: string, subSpecies: string, avgLifespan: number, habitat: string, description: string, imageUrl: string) {
        this.id = id;
        this.commonName = commonName;
        this.genus = genus;
        this.species = species;
        this.subSpecies = subSpecies;
        this.avgLifespan = avgLifespan;
        this.habitat = habitat;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    getFullLatinName(): string {
        return `${this.genus} ${this.species}${this.subSpecies ? ` ${this.subSpecies}` : ''}`;
    }

    static apiResponseToMonkey(res: any): Monkey {
        return new Monkey(
            res._id,
            res.commonName,
            res.genus,
            res.species,
            res.subSpecies || "",
            res.avgLifespan,
            res.habitat,
            res.description,
            res.imageUrl
        );
    }
}

export interface IMonkey {
    commonName: string;
    genus: string;
    species: string;
    subSpecies: string;
    avgLifespan: number;
    habitat: string;
    description: string;
    imageUrl: string;
}