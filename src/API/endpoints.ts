export const endpoints = {
  "GET /": {
    "description": "serves a json representation of all the available endpoints of the api"
  },
  "GET /products": {
    "description": "serves an array of all products",
    "queries": ["category", "priceMin", "priceMax", "title"],
    "exampleRequest" : "/products?priceMax=20",
    "exampleResponse": {
      "products": [
        {
          "id": "621f912430f443d5067c39f1",
          "title": "Blue Whale Plush",
          "description": "A small whale teddy",
          "img_url": "https://images.unsplash.com/photo1",
          "price": 8,
          "categories": ["Toys"]
        },
        {
          "id": "621f912430f443d5067c39f0",
          "title": "Abacus",
          "description": "A wooden abacus that will help teach counting skills",
          "img_url": "https://images.unsplash.com/photo2",
          "price": 10,
          "categories": ["Education", "Toys"]
        }
      ]
    }
  },
  "GET /products/:id": {
    "description": "serves an object of a product of the given ID",
    "queries": [],
    "exampleRequest": "/products/621f912430f443d5067c39f0",
    "exampleResponse": {
      "product": {
        "id": "621f912430f443d5067c39f0",
        "title": "Abacus",
        "description": "A wooden abacus that will help teach counting skills",
        "img_url": "https://images.unsplash.com/photo2",
        "price": 10,
        "categories": ["Education", "Toys"]
      }
    }
  },
  "POST /products": {
    "description": "accepts an object of a new product and returns it",
    "queries": [],
    "exampleRequest": "/products",
    "exampleRequestBody": {
      "title": "A new product",
      "description": "This is shiny and brand new",
      "img_url": "https://img_url.com",
      "price": 100,
      "categories": ["6220f9ab230ed15af3d3dffc", "6220f9ab230ed15af3d3dffb"]
    },
    "exampleResponse": {
      "product": {
        "id": "621f912430f443d5067c39f1",
        "title": "A new product",
        "description": "This is shiny and brand new",
        "img_url": "https://img_url.com",
        "price": 100,
        "categories": ["Household", "Toys"]
      }
    }
  },
  "PATCH /products/:id": {
    "description": "accepts an object containing product fields to update and returns the updated product",
    "queries": [],
    "exampleRequest": "/products/621f912430f443d5067c39f1",
    "exampleRequestBody": {
      "title": "A fairly new product",
      "description": "This is shiny and quite new",
      "price": 80
    },
    "exampleResponse": {
      "product": {
        "id": "621f912430f443d5067c39f1",
        "title": "A fairly new product",
        "description": "This is shiny and quite new",
        "img_url": "https://img_url.com",
        "price": 80,
        "categories": ["Household", "Toys"]
      }
    }
  },
  "DELETE /products/:id": {
    "description": "removes the product of the given ID from the database",
    "queries": [],
    "exampleRequest": "/products/621f912430f443d5067c39f0",
    "exampleResponse": "No response"
  },
  "GET /categories": {
    "description": "serves an array of all categories",
    "queries": [],
    "exampleRequest": "/categories",
    "exampleResponse": {
      "categories": [
        {
          "id": "6220f9ab230ed15af3d3dffc",
          "category_name": "Household",
          "category_description": "Home is where the heart is, so find products that you love"
        },
        {
          "id": "6220f9ab230ed15af3d3dffb",
          "category_name": "Toys",
          "category_description": "Fun for all ages"
        }
      ]
    }
  },
  "GET /categories/:id": {
    "description": "serves an object of a category of the given ID",
    "queries": [],
    "exampleRequest": "/categories/6220f9ab230ed15af3d3dffb",
    "exampleResponse": {
      "category": {
        "id": "6220f9ab230ed15af3d3dffb",
        "category_name": "Toys",
        "category_description": "Fun for all ages"
      }
    }
  },
  "POST /categories": {
    "description": "accepts an object of a new category and returns it",
    "queries": [],
    "exampleRequest": "/categories",
    "exampleRequestBody": {
      "category_name": "Technology",
      "category_description": "Is it technology or is it magic?"
    },
    "exampleResponse": {
      "category": {
        "id": "6233246d2c4bc091a3b1a0c6",
        "category_name": "Technology",
        "category_description": "Is it technology or is it magic?"
      }
    }
  },
  "PATCH /categories/:id": {
    "description": "accepts an object containing category fields to update and returns the updated category",
    "queries": [],
    "exampleRequest": "/categories/6220f9ab230ed15af3d3dffb",
    "exampleRequestBody": {
      "category_description": "You're never too old to play"
    },
    "exampleResponse": {
      "category": {
        "id": "6220f9ab230ed15af3d3dffb",
        "category_name": "Toys",
        "category_description": "You're never too old to play"
      }
    }
  },
  "DELETE /categories/:id": {
    "description": "removes the category of the given ID from the database",
    "queries": [],
    "exampleRequest": "/categories/6233246d2c4bc091a3b1a0c6",
    "exampleResponse": "No response"
  }
}
