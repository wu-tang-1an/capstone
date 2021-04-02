const getRandNum = () => Math.ceil(Math.random() * 10000)

module.exports = [
  {
    name: 'SingleCycle',
    imageUrl: `https://source.unsplash.com/random?sig=${getRandNum()}/600x400`,
  },
  {
    name: 'Readr',
    imageUrl: `https://source.unsplash.com/random?sig=${getRandNum()}/600x400`,
  },
  {
    name: 'Skimm',
    imageUrl: `https://source.unsplash.com/random?sig=${getRandNum()}/600x400`,
  },
  {
    name: 'NorEaster',
    imageUrl: `https://source.unsplash.com/random?sig=${getRandNum()}/600x400`,
  },
]
