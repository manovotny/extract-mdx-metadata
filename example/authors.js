const randomInt = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1) + min);

export const jane = {
    name: 'Jane Doe',
    twitter: '@janedoe',
    website: 'janedoe.com',
    age: randomInt(),
};

export const john = {
    name: 'John Doe',
    twitter: '@johndoe',
    website: 'johndoe.com',
    age: randomInt(),
};
