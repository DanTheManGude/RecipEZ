const cookbook = [
  {
    "Cookbook_UUID": "478dbf45-0af1-4a08-81c8-9c5fb31e434f",
    "User_UUID": "8d17eb94-7c0d-4987-86b3-411151df29b3"
  }
];

const food = [
  {
    "Food_Name": "Milk",
    "Food_UUID": "2783ed46-7b7b-4b19-a6d6-63bdf5ac53cd"
  },
  {
    "Food_Name": "Flour",
    "Food_UUID": "50c673a5-48ca-4f61-84ed-72a253e0516c"
  },
  {
    "Food_Name": "Baking Soda",
    "Food_UUID": "12a77f33-e063-4a00-95a5-4f2535bb843b"
  },
  {
    "Food_Name": "Cornstarch",
    "Food_UUID": "80217944-9d7c-4c8e-a1cd-7fa4f6248aaa"
  },
  {
    "Food_Name": "Salt",
    "Food_UUID": "68114b27-e885-4fba-a3ed-474afc9b152f"
  },
  {
    "Food_Name": "Butter",
    "Food_UUID": "a2ed45bb-67a3-4215-a916-c969112e81d1"
  },
  {
    "Food_Name": "Brown Sugar",
    "Food_UUID": "46a89555-eaa4-4889-b3cf-e490c63d9b48"
  },
  {
    "Food_Name": "Granulated Sugar",
    "Food_UUID": "81f64add-a502-48bf-8b45-136439c3069b"
  },
  {
    "Food_Name": "Eggs",
    "Food_UUID": "81f64add-a502-48bf-8b45-136439c3069c"
  },
  {
    "Food_Name": "Vanilla Extract",
    "Food_UUID": "4ef8b987-01dd-41d3-bcb2-cb5c10dffe1b"
    },
  {
    "Food_Name": "Chocolate Chips",
    "Food_UUID": "63f4dafb-c306-4a09-8338-c2235cf44c57"
    },
  {
    "Food_Name": "Bread",
    "Food_UUID": "6f0aa1ca-6be0-48ff-83a5-4acfc6c2435f"
    },
  {
    "Food_Name": "Cheddar Cheese",
    "Food_UUID": "ab1d4ac0-41d1-40ca-8496-b47f34603397"
  }
];

const ingredient = [
  {
    "Ingredient_UUID": "4530e861-e231-40ef-98ea-d62d5d4bac6f",
    "Ingredient_Amount": "2 1/4 Cups",
    "Food_UUID": "50c673a5-48ca-4f61-84ed-72a253e0516c"
  },
  {
    "Ingredient_UUID": "b8ed5702-26a8-40b0-920f-927ac313f6d6",
    "Ingredient_Amount": "1 teaspoon",
    "Food_UUID": "12a77f33-e063-4a00-95a5-4f2535bb843b"
  },
  {
    "Ingredient_UUID": "dd933903-5697-4a0b-9fb8-a1ac53efa64f",
    "Ingredient_Amount": "1 1/2 teaspoon",
    "Food_UUID": "80217944-9d7c-4c8e-a1cd-7fa4f6248aaa"
  },
  {
    "Ingredient_UUID": "cc0f24ab-2ad8-4840-829f-d0b68f264301",
    "Ingredient_Amount": "1/2 teaspoon",
    "Food_UUID": "68114b27-e885-4fba-a3ed-474afc9b152f"
  },
  {
    "Ingredient_UUID": "606ae92c-5642-479f-b044-46fa4ec4805a",
    "Ingredient_Amount": "1/2 sticks",
    "Food_UUID": "a2ed45bb-67a3-4215-a916-c969112e81d1"
  },
  {
    "Ingredient_UUID": "e975b564-e231-4705-b7f0-efd62a8181b9",
    "Ingredient_Amount": "3/4 Cups",
    "Food_UUID": "46a89555-eaa4-4889-b3cf-e490c63d9b48"
  },
  {
    "Ingredient_UUID": "2f23ffd4-4c89-48af-ae3d-b9c3abcaf6d0",
    "Ingredient_Amount": "1/2 Cup",
    "Food_UUID": "81f64add-a502-48bf-8b45-136439c3069b"
  },
  {
    "Ingredient_UUID": "1b3a6b18-5939-470e-baed-5d2d1ae85cab",
    "Ingredient_Amount": "1 Egg",
    "Food_UUID": "81f64add-a502-48bf-8b45-136439c3069b"
  },
  {
    "Ingredient_UUID": "a98c85fb-e1a5-4e04-bc6c-c9b2f97f2aa4",
    "Ingredient_Amount": "2 teaspoons",
    "Food_UUID": "4ef8b987-01dd-41d3-bcb2-cb5c10dffe1b"
  },
  {
    "Ingredient_UUID": "8b2da18b-6044-4c66-a38b-a5b913cf2ec1",
    "Ingredient_Amount": "1 1/4 Cups",
    "Food_UUID": "63f4dafb-c306-4a09-8338-c2235cf44c57"
  },
  {
    "Ingredient_UUID": "0b26937f-6842-423f-871e-8fffb69fc695",
    "Ingredient_Amount": "3 Slices",
    "Food_UUID": "ab1d4ac0-41d1-40ca-8496-b47f34603397"
  },
  {
    "Ingredient_UUID": "915dd072-7c87-43fb-9c97-f425eb32dac0",
    "Ingredient_Amount": "1 Scoop",
    "Food_UUID": "a2ed45bb-67a3-4215-a916-c969112e81d1"
  },
  {
    "Ingredient_UUID": "397ff478-1e20-46c9-a796-6b3a3e2af243",
    "Ingredient_Amount": "2 Slices",
    "Food_UUID": "6f0aa1ca-6be0-48ff-83a5-4acfc6c2435f"
  }
]

const pantry = [
  {
    "Pantry_UUID": "aa40457d-4631-4267-a120-cf68421cdf1c",
    "User_UUID": "8d17eb94-7c0d-4987-86b3-411151df29b3",
    "Pantry_Foods": [
      "2783ed46-7b7b-4b19-a6d6-63bdf5ac53cd",
      "50c673a5-48ca-4f61-84ed-72a253e0516c",
      "12a77f33-e063-4a00-95a5-4f2535bb843b",
      "80217944-9d7c-4c8e-a1cd-7fa4f6248aaa",
      "68114b27-e885-4fba-a3ed-474afc9b152f",
      "a2ed45bb-67a3-4215-a916-c969112e81d1",
      "46a89555-eaa4-4889-b3cf-e490c63d9b48",
      "81f64add-a502-48bf-8b45-136439c3069b",
      "81f64add-a502-48bf-8b45-136439c3069c",
      "4ef8b987-01dd-41d3-bcb2-cb5c10dffe1b",
      "63f4dafb-c306-4a09-8338-c2235cf44c57",
      "6f0aa1ca-6be0-48ff-83a5-4acfc6c2435f"
    ]
  }
]

const recipe = [
  {
    "Cookbook_UUID": "478dbf45-0af1-4a08-81c8-9c5fb31e434f",
    "Recipe_UUID": "53ebb536-51b2-477d-9504-5449b0cf6992",
    "Recipe_Ingredients": [
      "4530e861-e231-40ef-98ea-d62d5d4bac6f",
      "b8ed5702-26a8-40b0-920f-927ac313f6d6",
      "dd933903-5697-4a0b-9fb8-a1ac53efa64f",
      "cc0f24ab-2ad8-4840-829f-d0b68f264301",
      "606ae92c-5642-479f-b044-46fa4ec4805a",
      "e975b564-e231-4705-b7f0-efd62a8181b9",
      "2f23ffd4-4c89-48af-ae3d-b9c3abcaf6d0",
      "1b3a6b18-5939-470e-baed-5d2d1ae85cab",
      "a98c85fb-e1a5-4e04-bc6c-c9b2f97f2aa4",
      "8b2da18b-6044-4c66-a38b-a5b913cf2ec1"
    ],
    "Recipe_Name": "Cookies"
  },
  {
    "Cookbook_UUID": "478dbf45-0af1-4a08-81c8-9c5fb3",
    "Recipe_UUID": "35d60605-1789-42cc-bc3a-b351e5ad5a0c",
    "Recipe_Ingredients": [
      "0b26937f-6842-423f-871e-8fffb69fc695",
      "915dd072-7c87-43fb-9c97-f425eb32dac0",
      "397ff478-1e20-46c9-a796-6b3a3e2af243"
    ],
    "Recipe_Name": "Grilled Cheese"
  }
]

const user = [
  {
    "User_Name": "Username",
    "User_Password": "Password",
    "User_UUID": "8d17eb94-7c0d-4987-86b3-411151df29b3"
  }
]

module.exports = { cookbook, food, ingredient, pantry, recipe, user }
