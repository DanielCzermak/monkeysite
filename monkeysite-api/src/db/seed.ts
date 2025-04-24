import Monkey from "../models/monkey";

const monkeys = [
    {
        commonName: 'Common marmoset',
        genus: 'Callithrix',
        species: 'jacchus',
        subSpecies: '',
        avgLifespan: 8,
        habitat: 'Brazil',
        description: 'The common marmoset is a New World monkey. It originally lived on the northeastern coast of Brazil, in the states of Piauí, Paraíba, Ceará, Rio Grande do Norte, Pernambuco, Alagoas, Sergipe, and Bahia.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Wei%C3%9Fb%C3%BCschelaffe_%28Callithrix_jacchus%29.jpg'
    },
    {
        commonName: 'Orangutan',
        genus: 'Pongo',
        species: 'pygmaeus',
        subSpecies: '',
        avgLifespan: 50,
        habitat: 'Indonesia and Malaysia',
        description: 'Orangutans are great apes native to the rainforests of Indonesia and Malaysia. They are now found only in parts of Borneo and Sumatra.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG'
    },
    {
        commonName: 'Japanese Macaque',
        genus: 'Macaca',
        species: 'fuscata',
        subSpecies: '',
        avgLifespan: 30,
        habitat: 'Japan',
        description: 'Also known as the snow monkey, it is a terrestrial Old World monkey species native to Japan.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Macaca_fuscata%2C_grooming%2C_Iwatayama%2C_20090201.jpg/1024px-Macaca_fuscata%2C_grooming%2C_Iwatayama%2C_20090201.jpg'
    },
    {
        commonName: 'Mandrill',
        genus: 'Mandrillus',
        species: 'sphinx',
        subSpecies: '',
        avgLifespan: 20,
        habitat: 'Central Africa',
        description: 'The mandrill is a primate of the Old World monkey family, closely related to the baboons and even more closely to the drill.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Mandrill_at_san_francisco_zoo.jpg/800px-Mandrill_at_san_francisco_zoo.jpg'
    },
    {
        commonName: 'Golden Lion Tamarin',
        genus: 'Leontopithecus',
        species: 'rosalia',
        subSpecies: '',
        avgLifespan: 15,
        habitat: 'Brazil',
        description: 'The golden lion tamarin is a small New World monkey of the family Callitrichidae. Native to the Brazilian coastal forests.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Leontopithecus_rosalia_-_Copenhagen_Zoo_-_DSC09082.JPG/687px-Leontopithecus_rosalia_-_Copenhagen_Zoo_-_DSC09082.JPG'
    },
    {
        commonName: 'Western Gorilla',
        genus: 'Gorilla',
        species: 'gorilla',
        subSpecies: 'gorilla',
        avgLifespan: 35,
        habitat: 'Central Africa',
        description: 'The western lowland gorilla is the most numerous and widespread gorilla subspecies, found in Central Africas dense rainforests.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/WesternLowlandGorilla05.jpg/960px-WesternLowlandGorilla05.jpg'
    },
    {
        commonName: 'Bonobo',
        genus: 'Pan',
        species: 'paniscus',
        subSpecies: '',
        avgLifespan: 40,
        habitat: 'Democratic Republic of the Congo',
        description: 'Bonobos are one of the closest relatives to humans and are known for their matriarchal social structure and peaceful behavior.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Apeldoorn_Apenheul_zoo_Bonobo.jpg/775px-Apeldoorn_Apenheul_zoo_Bonobo.jpg'
    },
    {
        commonName: 'Barbary Macaque',
        genus: 'Macaca',
        species: 'sylvanus',
        subSpecies: '',
        avgLifespan: 25,
        habitat: 'North Africa and Gibraltar',
        description: 'The Barbary macaque is the only macaque species found outside of Asia, and it is known for its presence in Gibraltar.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Macaca_sylvanus.Mother_and_baby.jpg/1024px-Macaca_sylvanus.Mother_and_baby.jpg'
    },
    {
        commonName: 'Geoffroys Spider Monkey',
        genus: 'Ateles',
        species: 'geoffroyi',
        subSpecies: 'yucatanensis',
        avgLifespan: 25,
        habitat: 'Central America',
        description: 'Geoffroys spider monkey, particularly the Yucatán subspecies, is an agile primate native to Central Americas forests.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Geoffroy%27s_spider_monkey_%28Ateles_geoffroyi_yucatanensis%29_Peten.jpg/1024px-Geoffroy%27s_spider_monkey_%28Ateles_geoffroyi_yucatanensis%29_Peten.jpg'
    },
    {
        commonName: 'Vervet Monkey',
        genus: 'Chlorocebus',
        species: 'pygerythrus',
        subSpecies: 'hilgerti',
        avgLifespan: 24,
        habitat: 'Sub-Saharan Africa',
        description: 'Vervet monkeys are highly adaptive primates found in Sub-Saharan Africa, with subspecies such as *C. pygerythrus hilgerti* present in East Africa.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Vervet_monkeys_Kruger.jpg'
    }
]

export default async function seedDB(): Promise<void> {
    try {
        await Monkey.deleteMany({});
        const result = await Monkey.insertMany(monkeys);
        console.log(`Seed successful! ${result.length} monkeys added.`);
    } catch (error: any) {
        console.log(`Seed failed! ${error.message}`);
    }
}