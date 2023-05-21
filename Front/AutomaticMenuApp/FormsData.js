export const userData = [
    {
      id: "10",
      categoryName: "Sexe",
      arg: [
        {
            id: "11",
            selected: true,
            name: "Dona",
            image: require('./src/assets/icons/female.png'),
            categoryName: "Sexe",
        },
        {
            id: "12",
            selected: false,
            name: "Home",
            image: require('./src/assets/icons/male.png'),
            categoryName: "Sexe",
        }
      ]
    },
    {
      id: "20",
      categoryName: "Rutina d'exercici",
      arg: [
        {
            id: "21",
            selected: false,
            name: "Mai",
            image: require('./src/assets/icons/exerciseRoutineNever.png'),
            categoryName: "Rutina d'exercici",
        },
        {
            id: "22",
            selected: false,
            name: "A vegades",
            image: require('./src/assets/icons/exerciseRoutineSometimes.png'),
            categoryName: "Rutina d'exercici",
        },
        {
            id: "23",
            selected: true,
            name: "Sovint",
            image: require('./src/assets/icons/exerciseRoutineOften.png'),
            categoryName: "Rutina d'exercici",
        },
        {
            id: "24",
            selected: false,
            name: "A diari",
            image: require('./src/assets/icons/exerciseRoutineDaily.png'),
            categoryName: "Rutina d'exercici",
        }
      ]
    },
    {
      id: "30",
      categoryName: "Intensitat d'exercici",
      arg: [
        {
            id: "31",
            selected: false,
            name: "Baixa",
            image: require('./src/assets/icons/exerciseIntensityLow.png'),
            categoryName: "Intensitat d'exercici",
        },
        {
            id: "32",
            selected: true,
            name: "Mitjana",
            image: require('./src/assets/icons/exerciseIntensityMid.png'),
            categoryName: "Intensitat d'exercici",
        },
        {
            id: "33",
            selected: false,
            name: "Alta",
            image: require('./src/assets/icons/exerciseIntensityHigh.png'),
            categoryName: "Intensitat d'exercici",
        }
      ]
    },
    {
      id: "40",
      categoryName: "Ets vegà o vegetarià?",
      arg: [
        {
            id: "41",
            selected: false,
            name: "Sí",
            image: require('./src/assets/icons/Preferences/Vegetables/leavesAndStems.png'),
            categoryName: "Ets vegà o vegetarià?",
        },
        {
            id: "42",
            selected: true,
            name: "No",
            image: require('./src/assets/icons/Preferences/Proteins/meat.png'),
            categoryName: "Ets vegà o vegetarià?",
        }
      ]
    },
    {
      id: "50",
      categoryName: "Àpats",
      arg: [
        {
            id: "51",
            selected: false,
            name: 2,
            image: require('./src/assets/icons/Preferences/Meals/breakfast.png'),
            categoryName: "Àpats",
        },
        {
            id: "52",
            selected: false,
            name: 3,
            image: require('./src/assets/icons/Preferences/Meals/brunch.png'),
            categoryName: "Àpats",
        },
        {
            id: "53",
            selected: true,
            name: 4,
            image: require('./src/assets/icons/Preferences/Meals/lunch.png'),
            categoryName: "Àpats",
        },
        {
            id: "54",
            selected: false,
            name: 5,
            image: require('./src/assets/icons/Preferences/Meals/snack.png'),
            categoryName: "Àpats",
        }
      ]
    }
  ]

export const userDataSimple = [
{
    id: "10",
    categoryName: "Correu",
},
{
    id: "20",
    categoryName: "Contrasenya",
},
{
    id: "30",
    categoryName: "Nom",
},
{
    id: "40",
    categoryName: "Edat",
},
{
    id: "50",
    categoryName: "Pes",
},
{
    id: "60",
    categoryName: "Sexe",
},
{
    id: "70",
    categoryName: "Rutina d'exercici",
},
{
    id: "80",
    categoryName: "Intensitat d'exercici",
},
{
    id: "90",
    categoryName: "Vegà/Vegetarià",
},
];

export const ageDropdownData = [
  { label: '10 - 14', export: 12, value: '1' },
  { label: '15 - 19', export: 17, value: '2' },
  { label: '20 - 24', export: 22, value: '3' },
  { label: '25 - 29', export: 27, value: '4' },
  { label: '30 - 39', export: 35, value: '5' },
  { label: '40 - 49', export: 45, value: '6' },
  { label: '50 - 59', export: 55, value: '7' },
  { label: '60 - 69', export: 65, value: '8' },
  { label: '> 69', export: 75, value: '9' },
];

export const weightDropdownData = [
  { label: '< 20kg', export: 15, value: '1' },
  { label: '20 - 29kg', export: 25, value: '2' },
  { label: '30 - 39kg', export: 35, value: '3' },
  { label: '40 - 49kg', export: 45, value: '4' },
  { label: '50 - 59kg', export: 55, value: '5' },
  { label: '60 - 69kg', export: 65, value: '6' },
  { label: '70 - 79kg', export: 75, value: '7' },
  { label: '80 - 89kg', export: 85, value: '8' },
  { label: '90 - 99kg', export: 95, value: '9' },
  { label: '> 99kg', export: 105, value: '10' },
];

export const heightDropdownData = [
  { label: '140cm - 150cm', export: 145, value: '1' },
  { label: '150cm - 160cm', export: 155, value: '2' },
  { label: '160cm - 170cm', export: 165, value: '3' },
  { label: '170cm - 180cm', export: 175, value: '4' },
  { label: '180cm - 190cm', export: 185, value: '5' },
  { label: '190cm - 200cm', export: 195, value: '6' },
  { label: '> 200cm', export: 205, value: '7' },
];

export const preferencesData = [
  {
      id: "50",
      categoryName: "Al·lèrgies i intoleràncies",
      arg: [
      {
          id: "51",
          selected: true,
          name: "Gluten",
          image: require('./src/assets/icons/Preferences/IntoAndAller/gluten.png')
      },
      {
          id: "52",
          selected: false,
          name: "Fructosa",
          image: require('./src/assets/icons/Preferences/IntoAndAller/fructose.png')
      },
      {
          id: "53",
          selected: false,
          name: "Lactosa",
          image: require('./src/assets/icons/Preferences/IntoAndAller/lactose.png')
      },
      {
          id: "54",
          selected: true,
          name: "Fruits secs",
          image: require('./src/assets/icons/Preferences/IntoAndAller/nuts.png')
      },
      {
          id: "55",
          selected: false,
          name: "Marisc",
          image: require('./src/assets/icons/Preferences/IntoAndAller/seafood.png')
      },
      {
          id: "56",
          selected: false,
          name: "Ous",
          image: require('./src/assets/icons/Preferences/IntoAndAller/egg.png')
      }
    ]
  },
  {
    id: "10",
    categoryName: "Proteïnes",
    arg: [
      {
          id: "11",
          selected: true,
          name: "Carn",
          image: require('./src/assets/icons/Preferences/Proteins/meat.png')
      },
      {
          id: "12",
          selected: false,
          name: "Pollastre",
          image: require('./src/assets/icons/Preferences/Proteins/chicken.png')
      },
      {
          id: "13",
          selected: true,
          name: "Gall dindi",
          image: require('./src/assets/icons/Preferences/Proteins/turkey.png')
      },
      {
          id: "14",
          selected: false,
          name: "Porc",
          image: require('./src/assets/icons/Preferences/Proteins/pork.png')
      },
      {
          id: "15",
          selected: false,
          name: "Peix",
          image: require('./src/assets/icons/Preferences/Proteins/fish.png')
      },
      {
          id: "16",
          selected: true,
          name: "Tonyina",
          image: require('./src/assets/icons/Preferences/Proteins/tuna.png')
      },
      {
          id: "17",
          selected: false,
          name: "Ou",
          image: require('./src/assets/icons/Preferences/Proteins/egg.png')
      },
      {
          id: "18",
          selected: false,
          name: "Fruits secs",
          image: require('./src/assets/icons/Preferences/Proteins/nuts.png')
      }
    ]
  },
  {
    id: "20",
    categoryName: "Cereals",
    arg: [
      {
          id: "21",
          selected: false,
          name: "Pa",
          image: require('./src/assets/icons/Preferences/Grains/bread.png')
      },
      {
          id: "22",
          selected: true,
          name: "Arròs",
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
          selected: true,
          name: "Pasta",
          image: require('./src/assets/icons/Preferences/Grains/pasta.png')
      },
      {
          id: "25",
          selected: false,
          name: "Civada",
          image: require('./src/assets/icons/Preferences/Grains/oat.png')
      }
    ]
  },
  {
    id: "30",
    categoryName: "Verdures",
    arg: [
      {
          id: "31",
          selected: true,
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
          name: "Cols",
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
          name: "Arrels",
          image: require('./src/assets/icons/Preferences/Vegetables/roots.png')
      },
      {
          id: "36",
          selected: false,
          name: "Fulles",
          image: require('./src/assets/icons/Preferences/Vegetables/leavesAndStems.png')
      },
      {
          id: "37",
          selected: false,
          name: "Espàrecs",
          image: require('./src/assets/icons/Preferences/Vegetables/asparagus.png')
      },
      {
          id: "38",
          selected: false,
          name: "Bolets",
          image: require('./src/assets/icons/Preferences/Vegetables/mushrooms.png')
      },
      {
          id: "39",
          selected: false,
          name: "Carxofes",
          image: require('./src/assets/icons/Preferences/Vegetables/artichoke.png')
      },
      {
          id: "391",
          selected: true,
          name: "Patates",
          image: require('./src/assets/icons/Preferences/Vegetables/potatoes.png')
      },
    ]
  },
  {
    id: "40",
    categoryName: "Fruites",
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
          name: "Cítrics",
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
          selected: true,
          name: "Baies",
          image: require('./src/assets/icons/Preferences/Fruits/berries.png')
      },
      {
          id: "45",
          selected: false,
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
    categoryName: "Llet i derivats",
    arg: [
      {
          id: "51",
          selected: true,
          name: "Llet",
          image: require('./src/assets/icons/Preferences/MilkAndDerivatives/milk.png')
      },
      {
          id: "52",
          selected: true,
          name: "Iogurt",
          image: require('./src/assets/icons/Preferences/MilkAndDerivatives/yogurt.png')
      },
      {
          id: "53",
          selected: false,
          name: "Formatge",
          image: require('./src/assets/icons/Preferences/MilkAndDerivatives/cheese.png')
      },
      {
          id: "54",
          selected: false,
          name: "Mantega",
          image: require('./src/assets/icons/Preferences/MilkAndDerivatives/butter.png')
      },
      {
          id: "55",
          selected: true,
          name: "Xocolata",
          image: require('./src/assets/icons/Preferences/MilkAndDerivatives/chocolate.png')
      }
    ]
  },
  {
    id: "60",
    categoryName: "Llegums",
    arg: [
      {
          id: "61",
          selected: true,
          name: "Cigrons",
          image: require('./src/assets/icons/Preferences/Legumes/chickpeas.png')
      },
      {
          id: "62",
          selected: true,
          name: "Llenties",
          image: require('./src/assets/icons/Preferences/Legumes/lentils.png')
      },
      {
          id: "63",
          selected: false,
          name: "Mongetes",
          image: require('./src/assets/icons/Preferences/Legumes/beans.png')
      },
      {
          id: "64",
          selected: false,
          name: "Soja",
          image: require('./src/assets/icons/Preferences/Legumes/soybeans.png')
      },
      {
          id: "65",
          selected: true,
          name: "Pèsols",
          image: require('./src/assets/icons/Preferences/Legumes/peas.png')
      }
    ]
  }
]