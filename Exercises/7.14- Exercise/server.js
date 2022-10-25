const mongoose = require('mongoose');
const Course = require('./models/Course');

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
        .then(res => console.log('connected to mongodb'))
        .catch(errror => console.log(errror));

async function getCourses() {
    const courses = await Course
                                .find({ isPublished: true, tags: 'backend' })
                                .sort({ name: -1 })
                                .select({ name: 1, author: 1 });

    console.log(courses);
}

getCourses();
