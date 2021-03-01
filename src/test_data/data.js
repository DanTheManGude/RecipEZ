const cookbook = [
  {
    "cookbook_uuid": "478dbf45-0af1-4a08-81c8-9c5fb31e434f",
    "user_uuid": "8d17eb94-7c0d-4987-86b3-411151df29b3"
  }
];

const food = [
  {
    "food_name": "Milk",
    "food_uuid": "2783ed46-7b7b-4b19-a6d6-63bdf5ac53cd"
  },
  {
    "food_name": "Flour",
    "food_uuid": "50c673a5-48ca-4f61-84ed-72a253e0516c"
  },
  {
    "food_name": "Baking Soda",
    "food_uuid": "12a77f33-e063-4a00-95a5-4f2535bb843b"
  },
  {
    "food_name": "Cornstarch",
    "food_uuid": "80217944-9d7c-4c8e-a1cd-7fa4f6248aaa"
  },
  {
    "food_name": "Salt",
    "food_uuid": "68114b27-e885-4fba-a3ed-474afc9b152f"
  },
  {
    "food_name": "Butter",
    "food_uuid": "a2ed45bb-67a3-4215-a916-c969112e81d1"
  },
  {
    "food_name": "Brown Sugar",
    "food_uuid": "46a89555-eaa4-4889-b3cf-e490c63d9b48"
  },
  {
    "food_name": "Granulated Sugar",
    "food_uuid": "81f64add-a502-48bf-8b45-136439c3069b"
  },
  {
    "food_name": "Eggs",
    "food_uuid": "81f64add-a502-48bf-8b45-136439c3069c"
  },
  {
    "food_name": "Vanilla Extract",
    "food_uuid": "4ef8b987-01dd-41d3-bcb2-cb5c10dffe1b"
    },
  {
    "food_name": "Chocolate Chips",
    "food_uuid": "63f4dafb-c306-4a09-8338-c2235cf44c57"
    },
  {
    "food_name": "Bread",
    "food_uuid": "6f0aa1ca-6be0-48ff-83a5-4acfc6c2435f"
    },
  {
    "food_name": "Cheddar Cheese",
    "food_uuid": "ab1d4ac0-41d1-40ca-8496-b47f34603397"
  }
];

const ingredient = [
  {
    "ingredient_uuid": "4530e861-e231-40ef-98ea-d62d5d4bac6f",
    "ingredient_amount": "2 1/4 Cups",
    "food_uuid": "50c673a5-48ca-4f61-84ed-72a253e0516c"
  },
  {
    "ingredient_uuid": "b8ed5702-26a8-40b0-920f-927ac313f6d6",
    "ingredient_amount": "1 teaspoon",
    "food_uuid": "12a77f33-e063-4a00-95a5-4f2535bb843b"
  },
  {
    "ingredient_uuid": "dd933903-5697-4a0b-9fb8-a1ac53efa64f",
    "ingredient_amount": "1 1/2 teaspoon",
    "food_uuid": "80217944-9d7c-4c8e-a1cd-7fa4f6248aaa"
  },
  {
    "ingredient_uuid": "cc0f24ab-2ad8-4840-829f-d0b68f264301",
    "ingredient_amount": "1/2 teaspoon",
    "food_uuid": "68114b27-e885-4fba-a3ed-474afc9b152f"
  },
  {
    "ingredient_uuid": "606ae92c-5642-479f-b044-46fa4ec4805a",
    "ingredient_amount": "1/2 sticks",
    "food_uuid": "a2ed45bb-67a3-4215-a916-c969112e81d1"
  },
  {
    "ingredient_uuid": "e975b564-e231-4705-b7f0-efd62a8181b9",
    "ingredient_amount": "3/4 Cups",
    "food_uuid": "46a89555-eaa4-4889-b3cf-e490c63d9b48"
  },
  {
    "ingredient_uuid": "2f23ffd4-4c89-48af-ae3d-b9c3abcaf6d0",
    "ingredient_amount": "1/2 Cup",
    "food_uuid": "81f64add-a502-48bf-8b45-136439c3069b"
  },
  {
    "ingredient_uuid": "1b3a6b18-5939-470e-baed-5d2d1ae85cab",
    "ingredient_amount": "1 Egg",
    "food_uuid": "81f64add-a502-48bf-8b45-136439c3069b"
  },
  {
    "ingredient_uuid": "a98c85fb-e1a5-4e04-bc6c-c9b2f97f2aa4",
    "ingredient_amount": "2 teaspoons",
    "food_uuid": "4ef8b987-01dd-41d3-bcb2-cb5c10dffe1b"
  },
  {
    "ingredient_uuid": "8b2da18b-6044-4c66-a38b-a5b913cf2ec1",
    "ingredient_amount": "1 1/4 Cups",
    "food_uuid": "63f4dafb-c306-4a09-8338-c2235cf44c57"
  },
  {
    "ingredient_uuid": "0b26937f-6842-423f-871e-8fffb69fc695",
    "ingredient_amount": "3 Slices",
    "food_uuid": "ab1d4ac0-41d1-40ca-8496-b47f34603397"
  },
  {
    "ingredient_uuid": "915dd072-7c87-43fb-9c97-f425eb32dac0",
    "ingredient_amount": "1 Scoop",
    "food_uuid": "a2ed45bb-67a3-4215-a916-c969112e81d1"
  },
  {
    "ingredient_uuid": "397ff478-1e20-46c9-a796-6b3a3e2af243",
    "ingredient_amount": "2 Slices",
    "food_uuid": "6f0aa1ca-6be0-48ff-83a5-4acfc6c2435f"
  }
]

const pantry = [
  {
    "pantry_uuid": "aa40457d-4631-4267-a120-cf68421cdf1c",
    "user_uuid": "8d17eb94-7c0d-4987-86b3-411151df29b3",
    "pantry_foods": [
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
    "cookbook_uuid": "478dbf45-0af1-4a08-81c8-9c5fb31e434f",
    "recipe_uuid": "53ebb536-51b2-477d-9504-5449b0cf6992",
    "recipe_ingredients": [
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
    "recipe_name": "Cookies"
  },
  {
    "cookbook_uuid": "478dbf45-0af1-4a08-81c8-9c5fb3",
    "recipe_uuid": "35d60605-1789-42cc-bc3a-b351e5ad5a0c",
    "recipe_ingredients": [
      "0b26937f-6842-423f-871e-8fffb69fc695",
      "915dd072-7c87-43fb-9c97-f425eb32dac0",
      "397ff478-1e20-46c9-a796-6b3a3e2af243"
    ],
    "recipe_name": "Grilled Cheese"
  }
]

const user = [
  {
    "username": "Username",
    "password": "Password",
    "user_uuid": "8d17eb94-7c0d-4987-86b3-411151df29b3"
  }
]

module.exports = { cookbook, food, ingredient, pantry, recipe, user }
