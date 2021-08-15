const randomInt = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1) + min);

const jane = {
    age: randomInt(),
    name: 'Jane Doe',
    twitter: '@janedoe',
    website: 'janedoe.com',
};

const john = {
    age: randomInt(),
    name: 'John Doe',
    twitter: '@johndoe',
    website: 'johndoe.com',
};

export {jane, john};
