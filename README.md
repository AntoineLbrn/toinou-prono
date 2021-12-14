# Welcome to ToinouProno

ToinouProno is an open-source application meant to be used on Discord servers. You can create your own competitions and predictions, with your own points systems. 
 
**WARNING** : If you only want to set up the bot on your discord server, please go [there](http://toinou-prono.heroku.com/doc)

# Getting started

1. ```git clone https://github.com/AntoineLbrn/toinou-prono.git```
2. ```yarn``` or ```npm install``` in every `./backend`, `./backoffice` and `./discord-bot`folders
3. ```docker-compose up -d```
4. ```docker exec backend yarn typeorm migration:run -c```

Then, backoffice should be running on http://localhost:8080.

If you want to get your own bot running, you need to create it on [https://discord.com/developers/applications](https://discord.com/developers/applications).
