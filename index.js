const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test-db')
        .then(res => console.log('connected to mongodb'))
        .catch(errror => console.log(errror));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    // tags: [ String ],
    tags: {
        type: Array,
        validate: {
            // validator: function (v) {
            //     return v && v.length > 0;
            // },
            validator: (v) => {
                const result = v && v.length > 0;
                return Promise.resolve(result)
            },
            message: 'A course should have at least one tag'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean
    },
    price: {
        min: 5,
        max: 200,
        type: Number,
        required: function () { return this.isPublished },
        get: (v) => Math.round(v),
        set: (v) => Math.round(v),
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    try {
        const course = new Course({
            name: 'Angular Course',
            category: 'web',
            author: 'Nacojohn',
            tags: [],
            isPublished: true,
        });
        
        const result = await course.save();
        console.log(result);
    } catch (error) {
        // console.log(error.errors);
        for (let field in error.errors)
            console.log(error.errors[field].message);
    }
}

async function getCourses() {
    const courses = await Course
                                .find({ author: { $in: ['Nacojohn', 'Naco'] } })
                                .limit(2)
                                .sort({ name: -1 })
                                .select({ name: 1, tags: 1 })
                                .count();

    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findById(id);

    if (!course) return;
    course.isPublished = true;
    course.author = 'Nnanna John';
    const result = await course.save();
    console.log(result);

    // course.set({
    //     isPublished: true,
    //     author: 'Nnanna JOhn'
    // });
}

async function updateCourse2(id) {
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'Naco',
            isPublished: false
        }
    }, { new: true });
    console.log(result);
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    // const course = await Course.findByIdAndDelete({ _id: id });
    console.log(result);
}

createCourse();
// getCourses();
// updateCourse2('635829c077dfee2eab14cd46')
