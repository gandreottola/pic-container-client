# Chicken Pix: An Image Hosting Application

### Deployed Link
<https://gandreottola.github.io/pic-container-client/>

### Heroku Link:
<https://pic-container.herokuapp.com/>

### Back End Repo:
https://github.com/gandreottola/pic-container-server

### Front End Repo:
https://github.com/gandreottola/pic-container-client

### Authors (aka The Coherent Chickens):
- ##### Lori Pinkham (@lpinkham) | *Project Lead / Product Lead*
- ##### Gabriel Andreottola (@gandreottola) | *Quality Assurance Lead*
- ##### Seth Sprague (@swsprague) | *Back-End Lead*
- ##### James Hankins (@JHankins09) | *Front-End Lead*

### Application Overview:

Chicken Pix is an app to help you organize your images. This app allows you to upload your photos to an Amazon Web Services S3 Bucket and store metadata for each photo, including a photo name, date created/modified, ownership, and descriptive tags, to a MongoDB Database system. Create an account, sign-in and get started!

### Development Process

#### Planning

Day 1
- Initial Discussion and Planning Meeting
- Daily Meeting Schedule
- Initial Sprint Establishment - Backend Authorization and AWS Setup / Backend Communication

Day 2
- Image Backend Routing
- Connecting Front-End API Calls to Backend for Auth and Image Resource
- CRUD Action Feature Build Out

Day 3
- Finalize CRUD Actions
- Debug and Testing / QA
- Styling
- ReadMe

#### Initial User Stories

- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to upload an image to AWS.
- As a signed in user, I would like to update the meta-data of my image on AWS.
- As a signed in user, I would like to see the name of all images on AWS.
- As a signed in user, I would like to see the thumbnail of all images on AWS.
- As a signed in user, I would like to delete the reference of my image from the database.
- As a signed in user, I would like to see the following meta-data for any image:
  - date created/uploaded
  - date modified
  - owner (user who uploaded the image)
  - tag
- As a signed in user, I would like to crete an album.
- As a signed in user, I would like to update the name of album.
- As a signed in user, I would like to see all my created albums.
- As a signed in user, I would like to delete the album.

#### Initial Wire framing

##### Client
![WIREFRAME][frame]

[frame]: https://media.git.generalassemb.ly/user/21061/files/a8045f00-b9c7-11e9-9ef4-9dd1ba38e8d2

![p2][wfp2]

[wfp2]: https://media.git.generalassemb.ly/user/21061/files/b5214e00-b9c7-11e9-8424-a0067c400fdb

![p3][wfp3]

[wfp3]: https://media.git.generalassemb.ly/user/21061/files/c66a5a80-b9c7-11e9-9e78-5bdd1e324f03

##### ERD:

![ERD][logo]

[logo]: https://i.imgur.com/DlhMCsf.jpg "ERD"

#### This project was planned to be built in 3 primary parts:
  1. Build out API
    - Build out API to allow for users and images relationship, as well as AWS implimentation for image hosting.
    - Apply relationships that allow for creation and deletion of images and to tie them to user accounts
    - Update image and date updated record implimented as well.
  2. Development of Client
    - Build out user authentication functionality including sign-up, sign-in, change-password, etc.
    - Apply semantic code to section out front end develpment and seperate user functionality.
    - Build out image functionality to view, delete and update. Also allows to tag images with multiple comma seperated attributes.
  3. Reduce code quantity by refactoring for callback usage
    - Continuous improvement for refactoring of code-blocks to allow for better legibility and future development.

### Development Process

Development split amongst 4 primary team members. Scope of project created numorous conflicts as features were built and imported to master code block, creating some repetition in content build. Team may have been too large or project scope to small.

Notes/Images from Scrum meetings:

![p4][wfp4]

[wfp4]: https://user-images.githubusercontent.com/25508215/62913814-a1753f00-bd5b-11e9-9c13-b26043d18ef6.png

![p5][wfp5]

[wfp5]: https://user-images.githubusercontent.com/25508215/62913843-bfdb3a80-bd5b-11e9-8cc7-1b431d4723a7.png

![p6][wfp6]

[wfp6]: https://user-images.githubusercontent.com/25508215/62913851-c4075800-bd5b-11e9-9fa8-61133ea5e749.png

![p7][wfp7]

[wfp7]: https://user-images.githubusercontent.com/25508215/62913854-c8337580-bd5b-11e9-9090-c5dec820d3fe.png

![p8][wfp8]

[wfp8]: https://user-images.githubusercontent.com/25508215/62913842-bc47b380-bd5b-11e9-96e3-04cd43f31782.png


### ROUTING:
##### User-Routes
- post - sign-up
- post - sign-in
- delete - sign-out
- patch - change-pw

##### Image-Routes
- get - list all images from all users - read/index (read-only)
- get - list current user's images - read/index (authenticated / editable)
- get - a single image - read/show
- post - create/upload new image - create
- patch - change image name / tags - update
- delete - delete an image - destroy

## Unresolved issues / features for future release

- Responsive Design
  * Mobile UI
  * Tablet UI

- Interactive UI
  * Stronger form usage
  * Higher sign-up rate upon visit

- Automatic Sign In

- Sort and filter functionality by tag

- Public image space for users to like, comment or follow other users

- SEO enabled

- Smoother navigation and landing pages

## Technologies Used:
#### Front-End
  - HTML5 & CSS3
  - Javascript
  - Handlebars
  - AJAX based JSON calls
  - Bootstrap
  - jQuery
  - Git / Github
  - Grunt Serve

#### Back-End
  - AWS
  - MongoDB and Mongoose
    - Powered by Express
  - javascript
  - Node.js
  - Git / Github
  - Heroku
  - Multer
  - AWS-SDK
  - NPM Server


## Acknowledgments
This project is built as the result of participating in General Assembly Boston's Software Engineering Immersive course.
