export const userData = [
    {
      id: "10",
      categoryName: "Genre",
      arg: [
        {
            id: "11",
            selected: true,
            name: "Woman",
            image: "woman"
        },
        {
            id: "12",
            selected: false,
            name: "Man",
            image: "man"
        }
      ]
    },
    {
      id: "20",
      categoryName: "Exercise Routine",
      arg: [
        {
            id: "21",
            selected: false,
            name: "Never",
            image: require('./src/assets/icons/exerciseRoutineNever.png')
        },
        {
            id: "22",
            selected: true,
            name: "Sometimes",
            image: require('./src/assets/icons/exerciseRoutineSometimes.png')
        },
        {
            id: "23",
            selected: false,
            name: "Often",
            image: require('./src/assets/icons/exerciseRoutineOften.png')
        },
        {
            id: "24",
            selected: false,
            name: "Daily",
            image: require('./src/assets/icons/exerciseRoutineDaily.png')
        }
      ]
    },
    {
      id: "30",
      categoryName: "Exercise Intensity",
      arg: [
        {
            id: "31",
            selected: false,
            name: "Low",
            image: require('./src/assets/icons/exerciseRoutineNever.png')
        },
        {
            id: "32",
            selected: true,
            name: "Mid",
            image: require('./src/assets/icons/exerciseRoutineNever.png')
        },
        {
            id: "33",
            selected: false,
            name: "High",
            image: require('./src/assets/icons/exerciseRoutineNever.png')
        }
      ]
    }
  ]

export const ageDropdownData = [
  { label: '10 - 14', value: '1' },
  { label: '15 - 19', value: '2' },
  { label: '20 - 24', value: '3' },
  { label: '25 - 29', value: '4' },
  { label: '30 - 39', value: '5' },
  { label: '40 - 49', value: '6' },
  { label: '50 - 59', value: '7' },
  { label: '60 - 69', value: '8' },
  { label: '> 69', value: '9' },
];

export const weightDropdownData = [
  { label: '< 20kg', value: '1' },
  { label: '20 - 29kg', value: '2' },
  { label: '30 - 39kg', value: '3' },
  { label: '40 - 49kg', value: '4' },
  { label: '50 - 59kg', value: '5' },
  { label: '60 - 69kg', value: '6' },
  { label: '70 - 79kg', value: '7' },
  { label: '80 - 89kg', value: '8' },
  { label: '90 - 99kg', value: '9' },
  { label: '> 99kg', value: '10' },
];