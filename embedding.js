const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

// const Course = mongoose.model('Course', new mongoose.Schema({
//   name: String,
//   author: authorSchema
// }));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [ authorSchema ]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
    const course = await Course.findByIdAndUpdate(courseId, {
        $set: {
            'author.name': 'John Smith'
        }
    })
    // const course = await Course.findById(courseId);
    // course.author.name = 'Monsh';
    // course.save();
    console.log('done');
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
    console.log('removed');
}

// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }),
//     new Author({ name: 'Naco' }),
//     new Author({ name: 'Precious' })
// ]);
// updateAuthor('63597d46f5971ce0832cd9f7');
// addAuthor('6359807777dceb0930f6eba9', new Author({ name: 'Preshy' }));
removeAuthor('6359807777dceb0930f6eba9', '63598568bf0f4359fe45f7b5')