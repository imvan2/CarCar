# CarCar :red_car:

## Team

- Van Tu - Service microservice
- Kim Geraghty - Auto Sales

## Features

CarCar is an application for managing an automobile dealership. It allows the user to enter and save data relevant to their inventory, their sales, and their service center.

The application runs with three separate microservices.

The inventory can be used to keep track of manufacturers, models, and automobiles in stock.

The sales can be used to keep track of sales reps, sales customers, and sale records (with a detailed view per sales rep.

The services can be used to keep track of technicians, VIP customers (who purchased their car from the dealership), and booked, cancelled or finished service appointments.

## Get started / installation

To start using the application, you must have Docker and Python installed. We recommend a computer with 16Gb of RAM or more. You will need a GitLab account to access the repo.

1. Go to GitLab and fork the git repo. Once forked, copy the path to git clone.

2. Go to your terminal and enter:  
   ```git clone <<git clone path here>>```  

3. Enter the new repo on your computer:  
   ```cd <<repo name here>>```

4. make sure Docker is running, then run these commands in your terminal:  
   ```docker volume create beta-data```  
   ```docker-compose build```  
   ```docker-compose up```  

5. Make migrations: you can access each terminal with the following commands:  
   ```docker exec -it <<container name here>> bash```  
   ```> > > python manage.py makemigrations```  
   ```> > > python manage.py migrate```  

6. Turn the two poller containers off and on again in Docker.

## Usage

1. Go to localhost:3000 in your browser to view the webpage. The menu is an offcanvas type. You will find it in the right upper corner of the screen.

2. The menu has dropdown menus for each part of the application. The database will be empty when you first start using the application.

3. Start with inventory first. Create a manufacturer, then a model, then you can create an automobile.

4. In sales, start by creating a sales rep, then a sales customer, then you can create a sale record. You can see past sale records on the sale record page. You can see the detail by sales rep on the sale rep record page.

5. In services, start by creating a technician, then you can create a service appointment. If the appointment gets cancelled, you can remove it by clicking the Cancel button. If the appointment is done, you can log it by clicking the Finish button. You can look up past service appointments by the auto's vin number on the search service history page.

## Images / screenshots

- Landing page:
![Landing page](/images/landing_page.png)

- Offcanvas menu:
![Offcanvas menu](/images/offcanvas_menu.png)

- Sales forms:
![Sale forms](/images/sales_forms.png)

- Sales list (sale records and sales reps):
![Sales lists](/images/)

- Service forms:
![Service forms](/images/service_forms.png)

- Service lists (services and service history)
![Service lists](/images/service_lists.png)

- Inventory forms:
![Inventory forms](/images/inventory_forms.png)

- Inventory list(manufacturers, models, automobiles):
![Inventory lists](/images/inventory_lists.png)

## Built with

**Bootstrap** - Layout and formatting  
**React (JSX)** - Frontend  
**Django (Python)** - Backend  
**RESTful APIs** - Connecting frontend and backend  

To run servers: Docker-compose.yml  
Database: Postgres:14.2-bullseye  

## Domain Driven Design Diagram
![Domain Driven Design Diagram](/images/CarCardomaindiagram.png)

## Helpful commands

### *Redo your database*
1. Stop all containers
2. Run ```docker container prune -f```  
3. Run ```docker volume rm beta-data```  
4. Run ```docker volume create beta-data```  
5. Run ```docker-compose up```  

> Thanks for reading! :smile: