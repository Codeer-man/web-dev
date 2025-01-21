const menu = [
  {
    id: 1,
    title: "Home",
    icon: "home", // Icon name (e.g., React Icons like FaHome)
    path: "/",
    children: [], // No further nesting
  },
  {
    id: 2,
    title: "About Us",
    icon: "info-circle",
    path: "/about",
    children: [], // No further nesting
  },
  {
    id: 3,
    title: "Services",
    icon: "briefcase",
    path: "/services",
    children: [
      {
        id: 31,
        title: "Web Development",
        path: "/services/web-development",
        children: [], // No further nesting
      },
      {
        id: 32,
        title: "Mobile Development",
        path: "/services/mobile-development",
        children: [], // No further nesting
      },
    ],
  },
  {
    id: 4,
    title: "Products",
    icon: "shopping-bag",
    path: "/products",
    children: [
      {
        id: 41,
        title: "Electronics",
        path: "/products/electronics",
        children: [
          {
            id: 411,
            title: "Mobile Phones",
            path: "/products/electronics/mobile-phones",
            children: [], // No further nesting
          },
          {
            id: 412,
            title: "Laptops",
            path: "/products/electronics/laptops",
            children: [], // No further nesting
          },
        ],
      },
      {
        id: 42,
        title: "Fashion",
        path: "/products/fashion",
        children: [
          {
            id: 421,
            title: "Men",
            path: "/products/fashion/men",
            children: [], // No further nesting
          },
          {
            id: 422,
            title: "Women",
            path: "/products/fashion/women",
            children: [], // No further nesting
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Contact",
    icon: "phone",
    path: "/contact",
    children: [], // No further nesting
  },
];

export default menu;
