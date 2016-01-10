# Time Exchange
## Requirement
* [Node.js v5.2.0](https://nodejs.org/)
* [MongoDB](https://www.mongodb.org/)

## Setup
```
npm install
```
__p.s. You must launch mongoDB while running server.__

## Run project
```
npm start
```


## API

### User

__POST /api/signup__
	
	// Apply for new account
	req.body.username 
	req.body.email
	req.body.password

__POST /api/signup/isAvailable__

	// Check if username and email are available.
	req.body.username 
	req.body.email
	
__POST /api/login__

	// login
	req.body.username
	req.body.password

__POST /api/login/thirdParty__

	// Third-party login
	req.body.provider // ex: facebook, github, google, etc.
	req.body.token
	


