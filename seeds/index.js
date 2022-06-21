const seedUsers = require('./Users')
const seedBlogs = require('./Blogs')
const seedComments = require('./Comment')


const sequelize = require('../config/connection')

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers(); 
    await seedBlogs();
    await seedComments();
    process.exit(0);
};

seedAll();