export class Monkey {
    id: number;
    commonName: string;
    genus: string;
    species: string;
    subSpecies: string;
    avgLifespan: number;
    habitat: string;
    description: string;
    imageUrl: string;

    constructor(id: number, commonName: string, genus: string, species: string, subSpecies: string, avgLifespan: number, habitat: string, description: string, imageUrl: string) {
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
}