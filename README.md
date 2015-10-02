# TableMaker

AJC producer/reporter tool. Will be used to build searchable and sortable HTML tables. More details coming soon. Work in progress, not ready for public use.

Lives here: http://ajc-tablemaker.herokuapp.com/


### Dependencies

* NPM 
* Heroku 
* AWS S3 credentials 

## How do I set this thing up?

To run locally, you need an AWS bucket to hold the json files that populate the tables, and npm running on your computer.

* Clone this repo and cd into the folder. Then, run `npm install` to install all the dependencies listed in the package.json file.
	
		$ git clone https://github.com/NewsappAJC/tablemaker.git
		$ cd tablemaker
		$ npm install

* Create a `.env` file in the tablemaker directory to put your AWS credentials.

		$ touch .env
		$ 'AWS_ACCESS_KEY=xxx' >> .env
		$ 'AWS_SECRET_KEY=yyy' >> .env
		$ 'S3_BUCKET=zzz' >> .env

	You can run `cat .env` to see all of your environment variables.

