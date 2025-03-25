

export const registerFormControls = [
    {
        name: 'userName',
        label: 'Username',
        placeholder: 'Enter Your Name...',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        label: 'email',
        placeholder: 'Enter Your Email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'password',
        placeholder: 'Enter Your Password',
        componentType: 'input',
        type: 'password',
    }
]

export const LoginFormControls = [

    {
        name: 'email',
        label: 'email',
        placeholder: 'Enter Your Email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'password',
        placeholder: 'Enter Your Password',
        componentType: 'input',
        type: 'password',
    }
]


export const AddProductFormElements = [
    {
        label: 'Title',
        name: 'title',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter Product Title'
    },
    {
        label: 'Description',
        name: 'description',
        componentType: 'textarea',
        placeholder: 'Enter Product Description'
    },
    {
        label: 'Category',
        name: 'category',
        componentType: 'select',
        options: [
            { id: 'men', label: 'Men' },
            { id: 'women', label: 'Women' },
            { id: 'kids', label: 'Kids' },
            { id: 'accessories', label: 'Accessories' },
            { id: 'footwear', label: 'Footwear' },
        ]
    },
    {
        label: 'Brand',
        name: 'brand',
        componentType: 'select',
        options: [
            { id: 'nike', label: 'Nike' },
            { id: 'adidas', label: 'Adidas' },
            { id: 'puma', label: 'Puma' },
            { id: 'levi', label: 'Levi' },
            { id: 'zara', label: 'Zara' },
            { id: 'h&m', label: 'H&M' },
        ]
    },
    {
        label: 'Prize',
        name: 'prize',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter Product Prize'
    },
    {
        label: 'Sale Prize',
        name: 'salePrize',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter Product Sale Product'
    },
    {
        label: 'Total Stock',
        name: 'totalStock',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter Total Stock'
    },


]


export const shoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shope/home'
    },
    {
        id: 'products',
        label: 'Products',
        path: '/shope/listing'
    },
    {
        id: 'men',
        label: 'Men',
        path: '/shope/listing'
    },
    {
        id: 'women',
        label: 'Women',
        path: '/shope/listing'
    },
    {
        id: 'kids',
        label: 'kids',
        path: '/shope/listing'
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shope/listing'
    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shope/listing'
    },
    {
        id: 'search',
        label: 'Search',
        path: '/shope/search'
    }
]


export const filterOption = {
    categories: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
    brands: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  };
  

  export const sortOptions = [
    { id: 'price-lowtohigh', label: 'Price: Low To High'},
    { id: 'price-hightolow', label: 'Price: High To Low'},
    { id: 'title-atoz', label: 'Title: A to Z'},
    { id: 'title-ztoa', label: 'Title: Z to A'},

  ]


  export const addressFormControls = [
    {
        label: "Address",
        name: "address",
        componentType: "input",
        type: "text",
        placeholder: "Enter your address"
    },
    {
        label: "City",
        name: "city",
        componentType: "input",
        type: "text",
        placeholder: "Enter your city"
    },
    {
        label: "Pincode",
        name: "pincode",
        componentType: "input",
        type: "number",
        placeholder: "Enter your pincode"
    },
    {
        label: "Phone",
        name: "phone",
        componentType: "input",
        type: "tel",
        placeholder: "Enter your phone number"
    },
    {
        label: "Notes",
        name: "notes",
        componentType: "textarea",
        type: "text",
        placeholder: "Additional notes (optional)"
    }
];
