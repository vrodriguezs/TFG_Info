export const userData = [
    {
      id: "10",
      categoryName: "Gender",
      arg: [
        {
            id: "11",
            selected: true,
            name: "Woman",
            image: require('./src/assets/icons/female.png')
        },
        {
            id: "12",
            selected: false,
            name: "Man",
            image: require('./src/assets/icons/male.png')
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
            selected: false,
            name: "Sometimes",
            image: require('./src/assets/icons/exerciseRoutineSometimes.png')
        },
        {
            id: "23",
            selected: true,
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
            image: require('./src/assets/icons/exerciseIntensityLow.png')
        },
        {
            id: "32",
            selected: true,
            name: "Mid",
            image: require('./src/assets/icons/exerciseIntensityMid.png')
        },
        {
            id: "33",
            selected: false,
            name: "High",
            image: require('./src/assets/icons/exerciseIntensityHigh.png')
        }
      ]
    },
    {
      id: "40",
      categoryName: "Meals",
      arg: [
        {
            id: "41",
            selected: true,
            name: "Breakfast",
            image: require('./src/assets/icons/exerciseIntensityLow.png')
        },
        {
            id: "42",
            selected: false,
            name: "Elevenses",
            image: require('./src/assets/icons/exerciseIntensityMid.png')
        },
        {
            id: "43",
            selected: true,
            name: "Lunch",
            image: require('./src/assets/icons/exerciseIntensityHigh.png')
        },
        {
            id: "44",
            selected: true,
            name: "Snack",
            image: require('./src/assets/icons/exerciseIntensityHigh.png')
        },
        {
            id: "45",
            selected: true,
            name: "Dinner",
            image: require('./src/assets/icons/exerciseIntensityHigh.png')
        }
      ]
    },
    {
      id: "50",
      categoryName: "Allergies and Intolerances",
      arg: [
        {
            id: "51",
            selected: true,
            name: "Lactose",
            image: require('./src/assets/icons/exerciseIntensityLow.png')
        },
        {
            id: "52",
            selected: false,
            name: "Fructose",
            image: require('./src/assets/icons/exerciseIntensityMid.png')
        },
        {
            id: "53",
            selected: false,
            name: "Gluten",
            image: require('./src/assets/icons/exerciseIntensityHigh.png')
        },
        {
            id: "54",
            selected: false,
            name: "Eggs",
            image: require('./src/assets/icons/exerciseIntensityHigh.png')
        }
      ]
    },
    {
      id: "60",
      categoryName: "Are you vegan or vegetarian?",
      arg: [
        {
            id: "61",
            selected: false,
            name: "Yes",
            image: require('./src/assets/icons/exerciseIntensityLow.png')
        },
        {
            id: "62",
            selected: true,
            name: "No",
            image: require('./src/assets/icons/exerciseIntensityMid.png')
        }
      ]
    }
  ]

export const userDataSimple = [
{
    id: "10",
    categoryName: "Name",
},
{
    id: "20",
    categoryName: "Genre",
},
{
    id: "30",
    categoryName: "Exercise Routine",
},
{
    id: "40",
    categoryName: "Exercise Intensity",
},
{
    id: "50",
    categoryName: "Age",
},
{
    id: "60",
    categoryName: "Weight",
},
{
    id: "80",
    categoryName: "Email",
},
{
    id: "90",
    categoryName: "Password",
}
];

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

export const preferencesData = [
  {
    id: "10",
    categoryName: "Proteins",
    arg: [
      {
          id: "11",
          selected: true,
          name: "Meat",
          image: require('./src/assets/icons/Preferences/Proteins/meat.png')
      },
      {
          id: "12",
          selected: false,
          name: "Chicken",
          image: require('./src/assets/icons/Preferences/Proteins/chicken.png')
      },
      {
          id: "13",
          selected: false,
          name: "Turkey",
          image: require('./src/assets/icons/Preferences/Proteins/turkey.png')
      },
      {
          id: "14",
          selected: false,
          name: "Pork",
          image: require('./src/assets/icons/Preferences/Proteins/pork.png')
      },
      {
          id: "15",
          selected: false,
          name: "Fish",
          image: require('./src/assets/icons/Preferences/Proteins/fish.png')
      },
      {
          id: "16",
          selected: false,
          name: "Tuna",
          image: require('./src/assets/icons/Preferences/Proteins/tuna.png')
      },
      {
          id: "17",
          selected: false,
          name: "Egg",
          image: require('./src/assets/icons/Preferences/Proteins/egg.png')
      },
      {
          id: "18",
          selected: false,
          name: "Nuts",
          image: require('./src/assets/icons/Preferences/Proteins/nuts.png')
      }
    ]
  },
  {
    id: "20",
    categoryName: "Grains",
    arg: [
      {
          id: "21",
          selected: false,
          name: "Bread",
          image: require('./src/assets/icons/Preferences/Grains/bread.png')
      },
      {
          id: "22",
          selected: true,
          name: "Rice",
          image: require('./src/assets/icons/Preferences/Grains/rice.png')
      },
      {
          id: "23",
          selected: false,
          name: "Cereal",
          image: require('./src/assets/icons/Preferences/Grains/cereal.png')
      },
      {
          id: "24",
          selected: false,
          name: "Pasta",
          image: require('./src/assets/icons/Preferences/Grains/pasta.png')
      },
      {
          id: "25",
          selected: false,
          name: "Oat",
          image: require('./src/assets/icons/Preferences/Grains/oat.png')
      }
    ]
  },
  {
    id: "30",
    categoryName: "Vegetables",
    arg: [
      {
          id: "31",
          selected: false,
          name: "Fruits",
          image: require('./src/assets/icons/Preferences/Vegetables/fruits.png')
      },
      {
          id: "32",
          selected: true,
          name: "Bulbs",
          image: require('./src/assets/icons/Preferences/Vegetables/bulbs.png')
      },
      {
          id: "33",
          selected: false,
          name: "Cabbages",
          image: require('./src/assets/icons/Preferences/Vegetables/cabbages.png')
      },
      {
          id: "34",
          selected: false,
          name: "Pepo",
          image: require('./src/assets/icons/Preferences/Vegetables/pepo.png')
      },
      {
          id: "35",
          selected: true,
          name: "Roots",
          image: require('./src/assets/icons/Preferences/Vegetables/roots.png')
      },
      {
          id: "36",
          selected: false,
          name: "Leaves",
          image: require('./src/assets/icons/Preferences/Vegetables/leavesAndStems.png')
      },
      {
          id: "37",
          selected: false,
          name: "Asparagus",
          image: require('./src/assets/icons/Preferences/Vegetables/asparagus.png')
      },
      {
          id: "38",
          selected: true,
          name: "Mushroom",
          image: require('./src/assets/icons/Preferences/Vegetables/mushrooms.png')
      },
      {
          id: "39",
          selected: false,
          name: "Artichoke",
          image: require('./src/assets/icons/Preferences/Vegetables/artichoke.png')
      },
      {
          id: "391",
          selected: false,
          name: "Corn",
          image: require('./src/assets/icons/Preferences/Vegetables/corn.png')
      },
      {
          id: "392",
          selected: false,
          name: "Potatoes",
          image: require('./src/assets/icons/Preferences/Vegetables/potatoes.png')
      },
    ]
  },
  {
    id: "40",
    categoryName: "Fruits",
    arg: [
      {
          id: "41",
          selected: false,
          name: "Pomes",
          image: require('./src/assets/icons/Preferences/Fruits/pomes.png')
      },
      {
          id: "42",
          selected: true,
          name: "Citrus",
          image: require('./src/assets/icons/Preferences/Fruits/citrus.png')
      },
      {
          id: "43",
          selected: false,
          name: "Drupes",
          image: require('./src/assets/icons/Preferences/Fruits/drupes.png')
      },
      {
          id: "44",
          selected: false,
          name: "Berries",
          image: require('./src/assets/icons/Preferences/Fruits/berries.png')
      },
      {
          id: "45",
          selected: true,
          name: "Melons",
          image: require('./src/assets/icons/Preferences/Fruits/melons.png')
      },
      {
          id: "46",
          selected: false,
          name: "Tropical",
          image: require('./src/assets/icons/Preferences/Fruits/tropical.png')
      }
    ]
  },
  {
    id: "50",
    categoryName: "Milk and derivatives",
    arg: [
      {
          id: "51",
          selected: false,
          name: "Milk",
          image: require('./src/assets/icons/Preferences/MilkAndDerivatives/milk.png')
      },
      {
          id: "52",
          selected: true,
          name: "Yogurt",
          image: require('./src/assets/icons/Preferences/MilkAndDerivatives/yogurt.png')
      },
      {
          id: "53",
          selected: false,
          name: "Cheese",
          image: require('./src/assets/icons/Preferences/MilkAndDerivatives/cheese.png')
      },
      {
          id: "54",
          selected: false,
          name: "Butter",
          image: require('./src/assets/icons/Preferences/MilkAndDerivatives/butter.png')
      },
      {
          id: "55",
          selected: false,
          name: "Chocolate",
          image: require('./src/assets/icons/Preferences/MilkAndDerivatives/chocolate.png')
      }
    ]
  },
  {
    id: "60",
    categoryName: "Legumes",
    arg: [
      {
          id: "61",
          selected: false,
          name: "Chickpeas",
          image: require('./src/assets/icons/Preferences/Legumes/chickpeas.png')
      },
      {
          id: "62",
          selected: true,
          name: "Lentils",
          image: require('./src/assets/icons/Preferences/Legumes/lentils.png')
      },
      {
          id: "63",
          selected: false,
          name: "Beans",
          image: require('./src/assets/icons/Preferences/Legumes/beans.png')
      },
      {
          id: "64",
          selected: false,
          name: "Soybeans",
          image: require('./src/assets/icons/Preferences/Legumes/soybeans.png')
      },
      {
          id: "65",
          selected: false,
          name: "Peas",
          image: require('./src/assets/icons/Preferences/Legumes/peas.png')
      }
    ]
  }
]