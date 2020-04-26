# auth_boiler
	1) clone repo, but with different name
		a. git clone <repo_link> <new_name>
			i. for example: git clone github.com:royceu/node-auth-boiler.git new-auth-boiler-proj
	2) Install the modules from package.json
		a. npm i
	3) Customize the new project
	remove defaulty stuff.  For example:
			i. for example: 
			• Title in `layout.ejs`
			• Logo field in the nav bar
			• Description and Repository fields in package.json
			• Remove this boilerplate's readme content
			• Switch Favicon to project-specific (one in layout.ejs)
	4) Create database for the new project
		a. createdb <new_db_name>
			i. example: createdb datNew
	5) Alter sequelize config file
	in `config/config.json`, update the database name to the one created in step 4.  Other settings likely ok, but check username, password and dialect.
	
	6) check user model for relevance to new project's needs
			i. for example, if the new project need a birthday field, then delete it from the user model and user migration files.
	7) Run the sequelize migrations
		a. sequelize db:migrate
	8) Create a file for environment variables
		a. touch .env
	Include the following .env variables:
		SESSION_SECRET - this is a key for the session to use
		
	9) Run the server and make sure it works
		a. nodemon
	10) Delete old origin that points to the boilerplate repository
	currently if we run this command:
		git remove -v
	It will show origin as being hooked up to boiler plate repository.  We want a fresh repo instead, so let's delete the origin remote:
		git remote remove origin
		
	11) Create an empty git repository
	via the github website.  Follow the directions as they show up when you create a new repository.
		a. git init
		b. git add .
		c. git commit -m 'initial commit'
		d. git remote add origin <new_repo_link>
		e. git push origin master

	12) use the link in github to push
		a. git remote add origin https://github.com/royce-u/test_proj2.git
		
		
		
