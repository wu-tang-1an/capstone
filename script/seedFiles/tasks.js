const today = new Date()

const getStartDate = (endpoint, numDays) => {
  return new Date(endpoint.setDate(endpoint.getDate() - numDays))
}

const getRandomPastDayInt = () => Math.ceil(Math.random() * 20)

console.log(getStartDate(today, getRandomPastDayInt()))

module.exports = [
  {
    name: 'refactor components',
    isActiveBadge: false,
    completionDate: '4/1/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'marketing work',
    isActiveBadge: true,
    completionDate: '4/2/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'design logo',
    isActiveBadge: false,
    completionDate: '4/3/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'design header',
    isActiveBadge: true,
    completionDate: '4/4/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'update vscode',
    isActiveBadge: false,
    completionDate: '4/5/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'update oauth',
    isActiveBadge: true,
    completionDate: '4/6/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'changeover localSecrets.js',
    isActiveBadge: false,
    completionDate: '4/7/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'oversee merge',
    isActiveBadge: true,
    completionDate: '4/8/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'build component tree',
    isActiveBadge: false,
    completionDate: '4/9/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'diagram changes',
    isActiveBadge: true,
    completionDate: '4/10/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'update layout',
    isActiveBadge: false,
    completionDate: '4/11/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'modularize css',
    isActiveBadge: true,
    completionDate: '4/12/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'write user stories',
    isActiveBadge: false,
    completionDate: '4/13/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'refactor db',
    isActiveBadge: true,
    completionDate: '4/14/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'update models',
    isActiveBadge: false,
    completionDate: '4/15/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'write gatekeeping middleware',
    isActiveBadge: true,
    completionDate: '4/16/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'reverse linked list',
    isActiveBadge: false,
    completionDate: '4/17/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'buy popcorn',
    isActiveBadge: true,
    completionDate: '4/18/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'play guitar hero',
    isActiveBadge: false,
    completionDate: '4/19/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'deploy on heroku',
    isActiveBadge: true,
    completionDate: '4/20/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'rewrite markup',
    isActiveBadge: false,
    completionDate: '4/9/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'purchase snacks',
    isActiveBadge: true,
    completionDate: '4/10/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'reboot server',
    isActiveBadge: false,
    completionDate: '4/11/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'install centOS',
    isActiveBadge: true,
    completionDate: '4/12/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'play backgammon',
    isActiveBadge: false,
    completionDate: '4/13/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'eat more greens',
    isActiveBadge: true,
    completionDate: '4/14/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'update schema',
    isActiveBadge: false,
    completionDate: '4/15/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'learn sass',
    isActiveBadge: true,
    completionDate: '4/16/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'convert to context',
    isActiveBadge: false,
    completionDate: '4/17/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'refactor store',
    isActiveBadge: true,
    completionDate: '4/18/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
  {
    name: 'play guitar hero again',
    isActiveBadge: false,
    completionDate: '4/19/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 0,
  },
  {
    name: 'deploy on Travis-CI',
    isActiveBadge: true,
    completionDate: '4/20/2021',
    editTimeStamp: new Date(
      Date.parse(getStartDate(today, getRandomPastDayInt()))
    ),
    createdBy: 'Albert Turtlesworth',
    index: 1,
  },
]
