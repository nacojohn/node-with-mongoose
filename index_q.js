const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test-db')
        .then(res => console.log('connected to mongodb'))
        .catch(errror => console.log(errror));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Nacojohn',
        tags: ['javascript', 'angular'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
                                // .find({ isPublished: true })
                                // .find({ price: { $gte: 10 } })
                                // .find({ price: { $in: [10, 20, 30] } })
                                // .find()
                                // .or([ { isPublished: false, author: { $in: ['Nacojohn', 'Naco'] } }, { name: 'Angular Course' } ])
                                // .and([ { isPublished: true }, { name: 'Angular Course' } ])

                                // using regular exp
                                // starts with Naco
                                .find({ author: /^Naco/ })

                                // ends with Naco with case insensitivity
                                .find({ author: /Naco$/i })

                                // contains the word Naco
                                .find({ author: /.*Naco.*/i })
                                .limit(2)
                                .sort({ name: -1 })
                                .select({ name: 1, tags: 1 });

    console.log(courses);
}

async function getCoursesPagination() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
                                .find()
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .sort({ name: -1 })
                                .select({ name: 1, tags: 1 });

    console.log(courses);
}

// createCourse();
getCourses();
