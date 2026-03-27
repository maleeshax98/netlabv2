export type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Alex Johnson",
    role: "Embedded Systems Engineer",
    content: "Netlab has the best selection of microcontrollers I've found. Delivery was incredibly fast and the components were well-packaged.",
    avatar: "https://i.pravatar.cc/150?u=t1",
    rating: 5,
  },
  {
    id: "t2",
    name: "Sarah Chen",
    role: "IoT Hobbyist",
    content: "Found some rare sensors here that were out of stock everywhere else. The documentation links on the product pages are a lifesaver!",
    avatar: "https://i.pravatar.cc/150?u=t2",
    rating: 5,
  },
  {
    id: "t3",
    name: "David Miller",
    role: "Robotics Student",
    content: "As a student, I appreciate the fair pricing and the high quality of the breadboards and jumper wires. Everything works perfectly.",
    avatar: "https://i.pravatar.cc/150?u=t3",
    rating: 4,
  },
  {
    id: "t4",
    name: "Emily Wang",
    role: "Product Designer",
    content: "The user interface of the website is so clean and easy to use. Finding exactly what I need for my prototypes has never been easier.",
    avatar: "https://i.pravatar.cc/150?u=t4",
    rating: 5,
  },
];
