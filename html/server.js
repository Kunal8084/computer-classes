const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database file paths
const DATA_DIR = path.join(__dirname, 'data');
const COURSES_FILE = path.join(DATA_DIR, 'courses.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const SHOP_SETTINGS_FILE = path.join(DATA_DIR, 'shop-settings.json');

// Initialize data directory and files if they don't exist
function initializeData() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Initialize courses if not exists
    if (!fs.existsSync(COURSES_FILE)) {
        const courses = [
            {
                id: 1,
                name: "DCA (Diploma in Computer Application)",
                duration: "6 months",
                fee: "₹8,000",
                description: "Complete diploma in computer application covering MS Office, Internet, and basic programming",
                features: ["MS Office", "Internet", "Tally Prime", "Photoshop", "Certificate"]
            },
            {
                id: 2,
                name: "Tally Prime",
                duration: "3 months",
                fee: "₹5,000",
                description: "Master accounting software with Tally Prime",
                features: ["GST", "Billing", "Inventory", "Payroll", "Taxation"]
            },
            {
                id: 3,
                name: "ADCA (Advanced Diploma in Computer Application)",
                duration: "12 months",
                fee: "₹15,000",
                description: "Advanced diploma with programming and web development",
                features: ["Web Development", "Python", "Java", "Database", "Hardware"]
            },
            {
                id: 4,
                name: "CCC (Course on Computer Concepts)",
                duration: "2 months",
                fee: "₹3,500",
                description: "Basic computer course for beginners",
                features: ["Windows", "MS Office", "Internet", "Email"]
            },
            {
                id: 5,
                name: "Online Form Fill Services",
                duration: "Instant",
                fee: "₹50-500",
                description: "We help you fill various online forms",
                features: ["Job Forms", "Admission Forms", "Government Forms", "Railway/Air Tickets"]
            }
        ];
        fs.writeFileSync(COURSES_FILE, JSON.stringify(courses, null, 2));
    }

    // Initialize products if not exists
    if (!fs.existsSync(PRODUCTS_FILE)) {
        const products = [
            {
                id: 1,
                name: "Laptop/Computer",
                category: "Hardware",
                price: 25000,
                description: "New laptop/computer available for students",
                image: "laptop.jpg"
            },
            {
                id: 2,
                name: "Wireless Mouse",
                category: "Accessories",
                price: 299,
                description: "High quality wireless mouse",
                image: "mouse.jpg"
            },
            {
                id: 3,
                name: "USB Keyboard",
                category: "Accessories",
                price: 499,
                description: "USB keyboard with multimedia keys",
                image: "keyboard.jpg"
            },
            {
                id: 4,
                name: "Stereo Headphone with Mic",
                category: "Accessories",
                price: 599,
                description: "Perfect for online classes",
                image: "headphone.jpg"
            },
            {
                id: 5,
                name: "Pen Drive 32GB",
                category: "Storage",
                price: 350,
                description: "32GB USB pen drive",
                image: "pendrive.jpg"
            },
            {
                id: 6,
                name: "Pen Drive 64GB",
                category: "Storage",
                price: 550,
                description: "64GB USB pen drive",
                image: "pendrive.jpg"
            },
            {
                id: 7,
                name: "HD Webcam",
                category: "Accessories",
                price: 899,
                description: "HD webcam for online classes",
                image: "webcam.jpg"
            },
            {
                id: 8,
                name: "USB WiFi Adapter",
                category: "Networking",
                price: 449,
                description: "High speed WiFi adapter",
                image: "wifi.jpg"
            },
            {
                id: 9,
                name: "Laptop Bag",
                category: "Accessories",
                price: 699,
                description: "Quality laptop bag",
                image: "bag.jpg"
            },
            {
                id: 10,
                name: "External Hard Drive 1TB",
                category: "Storage",
                price: 3500,
                description: "1TB external hard drive",
                image: "hdd.jpg"
            }
        ];
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    }

    // Initialize orders if not exists
    if (!fs.existsSync(ORDERS_FILE)) {
        fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
    }

    // Initialize shop settings if not exists
    if (!fs.existsSync(SHOP_SETTINGS_FILE)) {
        const shopSettings = {
            name: "Swadeep Online Computer Classes",
            tagline: "Best Computer Education & Accessories Shop",
            address: "Koderma, Jharkhand",
            phone: "+91 9876543210",
            whatsapp: "+91 9876543210",
            email: "swadeep@example.com",
            openingHours: "Mon-Sat: 9:00 AM - 7:00 PM",
            upiId: "swadeep@upi",
            bankDetails: {
                bankName: "State Bank of India",
                accountNumber: "1234567890",
                ifscCode: "SBIN0001234",
                accountName: "Swadeep Computer Classes"
            },
            shopImages: [],
            socialLinks: {
                facebook: "",
                instagram: "",
                twitter: ""
            }
        };
        fs.writeFileSync(SHOP_SETTINGS_FILE, JSON.stringify(shopSettings, null, 2));
    }
}

// Helper functions
function readJSON(file) {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// API Routes

// Get all courses
app.get('/api/courses', (req, res) => {
    const courses = readJSON(COURSES_FILE);
    res.json(courses);
});

// Get single course
app.get('/api/courses/:id', (req, res) => {
    const courses = readJSON(COURSES_FILE);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// Add new course
app.post('/api/courses', (req, res) => {
    const courses = readJSON(COURSES_FILE);
    const newCourse = {
        id: courses.length + 1,
        ...req.body
    };
    courses.push(newCourse);
    writeJSON(COURSES_FILE, courses);
    res.status(201).json(newCourse);
});

// Update course
app.put('/api/courses/:id', (req, res) => {
    const courses = readJSON(COURSES_FILE);
    const index = courses.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
        courses[index] = { ...courses[index], ...req.body };
        writeJSON(COURSES_FILE, courses);
        res.json(courses[index]);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// Delete course
app.delete('/api/courses/:id', (req, res) => {
    const courses = readJSON(COURSES_FILE);
    const filteredCourses = courses.filter(c => c.id !== parseInt(req.params.id));
    writeJSON(COURSES_FILE, filteredCourses);
    res.json({ message: 'Course deleted successfully' });
});

// Get all products
app.get('/api/products', (req, res) => {
    const products = readJSON(PRODUCTS_FILE);
    res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    const products = readJSON(PRODUCTS_FILE);
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Add new product
app.post('/api/products', (req, res) => {
    const products = readJSON(PRODUCTS_FILE);
    const newProduct = {
        id: products.length + 1,
        ...req.body
    };
    products.push(newProduct);
    writeJSON(PRODUCTS_FILE, products);
    res.status(201).json(newProduct);
});

// Update product
app.put('/api/products/:id', (req, res) => {
    const products = readJSON(PRODUCTS_FILE);
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        writeJSON(PRODUCTS_FILE, products);
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
    const products = readJSON(PRODUCTS_FILE);
    const filteredProducts = products.filter(p => p.id !== parseInt(req.params.id));
    writeJSON(PRODUCTS_FILE, filteredProducts);
    res.json({ message: 'Product deleted successfully' });
});

// Place order
app.post('/api/orders', (req, res) => {
    const orders = readJSON(ORDERS_FILE);
    const order = {
        id: orders.length + 1,
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    orders.push(order);
    writeJSON(ORDERS_FILE, orders);
    res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
});

// Get all orders
app.get('/api/orders', (req, res) => {
    const orders = readJSON(ORDERS_FILE);
    res.json(orders);
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
    const orders = readJSON(ORDERS_FILE);
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// Update order status
app.put('/api/orders/:id', (req, res) => {
    const orders = readJSON(ORDERS_FILE);
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index !== -1) {
        orders[index] = { ...orders[index], ...req.body };
        writeJSON(ORDERS_FILE, orders);
        res.json({ message: 'Order updated successfully', order: orders[index] });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// Delete order
app.delete('/api/orders/:id', (req, res) => {
    const orders = readJSON(ORDERS_FILE);
    const filteredOrders = orders.filter(o => o.id !== parseInt(req.params.id));
    writeJSON(ORDERS_FILE, filteredOrders);
    res.json({ message: 'Order deleted successfully' });
});

// Get shop info
app.get('/api/shop-info', (req, res) => {
    const shopSettings = readJSON(SHOP_SETTINGS_FILE);
    res.json(shopSettings);
});

// Update shop settings
app.put('/api/shop-settings', (req, res) => {
    const shopSettings = readJSON(SHOP_SETTINGS_FILE);
    const updatedSettings = { ...shopSettings, ...req.body };
    writeJSON(SHOP_SETTINGS_FILE, updatedSettings);
    res.json({ message: 'Shop settings updated successfully', settings: updatedSettings });
});

// Update shop address
app.put('/api/shop-address', (req, res) => {
    const shopSettings = readJSON(SHOP_SETTINGS_FILE);
    shopSettings.address = req.body.address;
    writeJSON(SHOP_SETTINGS_FILE, shopSettings);
    res.json({ message: 'Address updated successfully', address: shopSettings.address });
});

// Add shop image
app.post('/api/shop-images', (req, res) => {
    const shopSettings = readJSON(SHOP_SETTINGS_FILE);
    if (!shopSettings.shopImages) {
        shopSettings.shopImages = [];
    }
    const newImage = {
        id: shopSettings.shopImages.length + 1,
        ...req.body
    };
    shopSettings.shopImages.push(newImage);
    writeJSON(SHOP_SETTINGS_FILE, shopSettings);
    res.status(201).json({ message: 'Image added successfully', image: newImage });
});

// Delete shop image
app.delete('/api/shop-images/:id', (req, res) => {
    const shopSettings = readJSON(SHOP_SETTINGS_FILE);
    if (shopSettings.shopImages) {
        shopSettings.shopImages = shopSettings.shopImages.filter(img => img.id !== parseInt(req.params.id));
        writeJSON(SHOP_SETTINGS_FILE, shopSettings);
    }
    res.json({ message: 'Image deleted successfully' });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Initialize data and start server
initializeData();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swadeep Online Computer Classes Website`);
});
