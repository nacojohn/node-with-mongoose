const mongoose = require('mongoose');
const Course = require('./models/Course');

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
        .then(res => console.log('connected to mongodb'))
        .catch(errror => console.log(errror));

async function exercise1() {
    const courses = await Course
                                .find({ isPublished: true, tags: 'backend' })
                                .sort({ name: 1 })
                                .select({ name: 1, author: 1 });

    console.log(courses);
}

async function exercise2() {
    const courses = await Course
                                .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
                                .sort('-price')
                                .select('name author price');

    console.log(courses);
}

async function exercise3() {
    const courses = await Course
                                .find({ isPublished: true })
                                .or([
                                    { price: { $gte: 15 } },
                                    { name: /.*by.*/ }
                                ])
                                .select('name author price');

    console.log(courses);
}


exercise3();