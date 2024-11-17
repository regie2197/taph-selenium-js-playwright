const request = require('supertest');

let chai;
let expect;

describe('API Testing Examples', function () {
    const baseUrl = 'https://jsonplaceholder.typicode.com'; // Base URL for API testing

    before(async function () {
        chai = await import('chai');
        expect = chai.expect; 
    });


    it('GET /posts - should retrieve a list of posts', async function () {
        const response = await request(baseUrl)
            .get('/posts')
            .expect(200);

        // Check response structure
        expect(response.body).to.be.an('array'); // Verify it's an array
        expect(response.body.length).to.be.greaterThan(0); // Expect some posts
        expect(response.body[0]).to.have.property('userId'); // Each post should have a userId
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('title');
        console.log(response.body[0]);
        expect(response.body[0]).to.have.property('body');
    });

    it('POST /posts - should create a new post', async function () {
        const newPost = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };

        const response = await request(baseUrl)
            .post('/posts')
            .send(newPost)
            .expect(201);

        // Verify response structure
        expect(response.body).to.have.property('id'); // New post should have an ID
        expect(response.body.title).to.equal(newPost.title);
        expect(response.body.body).to.equal(newPost.body);
        expect(response.body.userId).to.equal(newPost.userId);
    });

    it('PUT /posts/1 - should update an existing post', async function () {
        const updatedPost = {
            title: 'updated title',
            body: 'updated body',
            userId: 1
        };

        const response = await request(baseUrl)
            .put('/posts/1')
            .send(updatedPost)
            .expect(200);

        expect(response.body).to.have.property('id', 1); // ID should remain the same
        expect(response.body.title).to.equal(updatedPost.title);
        expect(response.body.body).to.equal(updatedPost.body);
        expect(response.body.userId).to.equal(updatedPost.userId);
    });

    it('PATCH /posts/1 - should partially update an existing post', async function () {
        const updatedFields = {
            title: 'partially updated title'
        };

        const response = await request(baseUrl)
            .patch('/posts/1')
            .send(updatedFields)
            .expect(200);

        // Verify the updated fields
        expect(response.body).to.have.property('id', 1); // ID should remain the same
        expect(response.body.title).to.equal(updatedFields.title); // Verify the title was updated
    });


    it('DELETE /posts/1 - should delete the post by ID', async function () {
        const response = await request(baseUrl)
            .delete('/posts/1')
            .expect(200);

    });
});
