# blockParty

Block party is an app that brings you closer to your community.  A place to support your local shopkeeper, join the neighborhood watch.  

Use the New Post tab to submit a new post to the feed.
	First select the category your post falls under:
		Incident - Any incident you would like to report, from a simple noise disturbance to a burglary/theft.
		Use the map to tag the exact location of the incident.
		Event - Yoga in the park, doggy play dates, fundraisers, all social events belong here.
		Classified - For sale, for trade, lost, found, all classifieds belong here.
		People - A page for the culturally curious.  A space to find similarities between cultures to bring us closer together.  Trade recipes, dishes and ask questions.   

Installation
	1) Fork and Clone repository
	2) Install the modules from package.json
		a. npm i
	3) Create database for the new project
		a. createdb <new_db_name>
			i. example: createdb newDb
	4) Alter sequelize config file
	in `config/config.json`, update the database name to the one created in step 4.  Other settings likely ok, but check username, password and dialect.
	5) check user model for relevance to new project's needs
			i. for example, if the new project need a birthday field, then delete it from the user model and user migration files.
	6) Run the sequelize migrations
		a. sequelize db:migrate
	7) Create a file for environment variables
		a. touch .env
	Include the following .env variables:
		SESSION_SECRET - this is a key for the session to use
	8) Run the server and make sure it works
		a. nodemon
	9) Delete old origin that points to the boilerplate repository
	currently if we run this command:
		git remove -v
	It will show origin as being hooked up to blockPaty repository.  We want a fresh repo instead, so let's delete the origin remote:
		git remote remove origin
		
	10) Create an empty git repository
	via the github website.  Follow the directions as they show up when you create a new repository.
		a. git init
		b. git add .
		c. git commit -m 'initial commit'
		d. git remote add origin <new_repo_link>
		e. git push origin master

	11) use the link in github to push
		a. git remote add origin https://github.com/royce-u/test_proj2.git

Usage

Contributing
		1)Fork it!
		2)Create your feature branch: git checkout -b my-new-feature
		3)Commit your changes: git commit -am 'Add some feature'
		4)Push to the branch: git push origin my-new-feature
		5)Submit a pull request
	