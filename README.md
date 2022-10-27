# CarCar :red_car:

# Table of Contents
1. [Team](#Team)
2. [Features](#Features)
3. [Get started / installation](#Get-started-/-installation)
4. [Usage](#Usage)
5. [Images / screenshots](#Images-/-screenshots)
6. [Built with](#Built-with)
7. [Domain Driven Design Diagram](#Domain-Driven-Design-Diagram)
8. [Helpful commands](#Helpful-commands)
9. [Design details](#Design-details)


## Team <a name="Team"></a>

- Van Tu - Service microservice
- Kim Geraghty - Sales microservice

## Features <a name="Features"></a>

CarCar is an application for managing an automobile dealership. It allows the user to enter and save data relevant to their inventory, their sales, and their service center.

The application runs with three separate microservices.

The **inventory** microservice can be used to keep track of manufacturers, models, and automobiles in stock.

The **sales** microservice can be used to keep track of sales reps, sales customers, and sale records (with a detailed view per sales rep).

The **service** microservice can be used to keep track of technicians, VIP customers (who purchased their car from the dealership), and booked, cancelled or finished service appointments.

## Get started / installation <a name="Get-started-/-installation"></a>

To start using the application, you must have Docker and Python installed. We recommend a computer with 16Gb of RAM or more. You will need a GitLab account to access the repo.

1. Go to GitLab and fork the git repo. Once forked, copy the path to git clone.

2. Go to your terminal and enter:
   `git clone <<git clone path here>>`

3. Enter the new repo on your computer:
   `cd <<repo name here>>`

4. make sure Docker is running, then run these commands in your terminal:
   `docker volume create beta-data`  
   `docker-compose build`  
   `docker-compose up`  

5. Make migrations: you can access each terminal with the following commands:
   `docker exec -it <<container name here>> bash`  
   `> > > python manage.py makemigrations`  
   `> > > python manage.py migrate`  

6. Turn the two poller containers off and on again in Docker.

## Usage <a name="Usage"></a>

1. Go to localhost:3000 in your browser to view the webpage. The menu is an offcanvas type. You will find it in the right upper corner of the screen.

2. The menu has dropdown menus for each part of the application. The database will be empty when you first start using the application.

3. Start with inventory first. Create a manufacturer, then a model, then you can create an automobile.

4. In sales, start by creating a sales rep, then a sales customer, then you can create a sale record. You can see past sale records on the sale record page. You can see the detail by sales rep on the sale rep record page.

5. In services, start by creating a technician, then you can create a service appointment. If the appointment gets cancelled, you can remove it by clicking the Cancel button. If the appointment is done, you can log it by clicking the Finish button. You can look up past service appointments by the auto's vin number on the search service history page.

## Images / screenshots <a name="Images-/-screenshots"></a>

- Landing page:
  ![Landing page](/images/landing_page.png)

- Offcanvas menu:
  ![Offcanvas menu](/images/offcanvas_menu.png)

- Sales forms:
  ![Sale forms](/images/sales_forms.png)

- Sales list (sale records and sales reps):
  ![Sales lists](/images/sales_list.png)

- Service forms:
  ![Service forms](/images/service_forms.png)

- Service lists (services and service history)
  ![Service lists](/images/service_lists.png)

- Inventory forms:
  ![Inventory forms](/images/inventory_forms.png)

- Inventory list(manufacturers, models, automobiles):
  ![Inventory lists](/images/inventory_lists.png)

- Here's what your docker container should look like:
  ![Docker image](/images/dockerimage.png)

## Built with <a name="Built-with"></a>

**Bootstrap** - Layout and formatting  
**React (JSX)** - Frontend  
**Django (Python)** - Backend  
**RESTful APIs** - Connecting frontend and backend  

To run servers: Docker-compose.yml  
Database: Postgres:14.2-bullseye

## Domain Driven Design Diagram <a name="Domain-Driven-Design-Diagram"></a>

![Domain Driven Design Diagram](/images/CarCardomaindiagram.png)

## Helpful commands <a name="Helpful-commands"></a>

### _Redo your database_

1. Stop all containers
2. Run `docker container prune -f`
3. Run `docker volume rm beta-data`
4. Run `docker volume create beta-data`
5. Run `docker-compose up`

## Design details <a name="Design-details"></a>

### _Sales_

| Action                | Method | URL                                       |
| --------------------- | ------ | ----------------------------------------- |
| Create sales rep      | POST   | http://localhost:8090/api/salesreps/      |
| List sales reps       | GET    | http://localhost:8090/api/salesreps/      |
| Create sales customer | POST   | http://localhost:8090/api/salescustomers/ |
| List sales customers  | GET    | http://localhost:8090/api/salescustomers/ |
| Create sale record    | POST   | http://localhost:8090/api/salerecords/    |
| List sale records     | GET    | http://localhost:8090/api/salerecords/    |

1- _Create sales rep_:
http://localhost:8090/api/salesreps/
POST:

```
{
	"name": "Kim Bassinger",
	"employee_id": "301"
}
```

Expected response:

```
{
	"name": "Kim Bassinger",
	"employee_id": "301"
}
```

_List sales reps_:
http://localhost:8090/api/salesreps/
GET request with expected response:

```
{
	"sales_reps": [
		{
			"name": "Bob Ross",
			"employee_id": "2"
		},
		{
			"name": "Kim Bassinger",
			"employee_id": "301"
		}
	]
}
```

2- _Create sales customer_:
http://localhost:8090/api/salescustomers/
POST:

```
{
  "name": "Maria Ruth",
  "address": "123 A Street Los Angeles CA 90017",
  "phone_number": "0004567890"
}
```

Expected response:

```
{
	"name": "Maria Ruth",
	"address": "123 A Street Los Angeles CA 90017",
	"phone_number": "0004567890"
}
```

_List sales customers_
http://localhost:8090/api/salescustomers/
GET request with expected response:

```
{
	"sales_customers": [
		{
			"name": "Babe Ruth",
			"phone_number": "1234567890"
		},
		{
			"name": "Maria Ruth",
			"phone_number": "0004567890"
		}
	]
}
```

3- _Create sale record_:
http://localhost:8090/api/salerecords/
POST:

```
{
"sales_price": "15000",
"sales_customer": "456790123",
"sales_rep": "3",
"sales_automobile": "1C3CC5FB2AN120161"
}
```

Expected response:

```{
"sales_price": "15000",
  "sales_customer": "Martha Stuart",
  "sales_rep_id": "3",
  "sales_automobile": "1C3CC5FB2AN120161",
  "sales_rep_name": "Mary Stuart"
}
```

_List sale records_:
http://localhost:8090/api/salerecords/
GET request with expected response:

```
{
	"sale_records": [
		{
			"sales_price": 10000,
			"sales_customer": "Babe Ruth",
			"sales_rep_id": "2",
			"sales_automobile": "1C3CC5FB2AN120174",
			"sales_rep_name": "Bob Ross"
		},
		{
			"sales_price": 15000,
			"sales_customer": "Martha Stuart",
			"sales_rep_id": "3",
			"sales_automobile": "1C3CC5FB2AN120161",
			"sales_rep_name": "Mary Stuart"
		}
	]
}
```

### _Services_

| Action                      | Method | URL                                     |
| --------------------------- | ------ | --------------------------------------- |
| _List services_             | GET    | http://localhost:8080/api/services/     |
| _Create services_           | POST   | http://localhost:8080/api/services/     |
| _Get a specific service_    | GET    | http://localhost:8080/api/services/:id/ |
| _Update a specific service_ | PUT    | http://localhost:8080/api/services/:id/ |
| _Delete a service_          | DELETE | http://localhost:8080/api/services/:id/ |
| _List technicians_          | GET    | http://localhost:8080/api/technicians/  |
| _Create technician_         | POST   | http://localhost:8080/api/technicians/  |

1 - _Create technician_:
http://localhost:8080/api/technicians/
POST:

```
{
	"name": "Kim",
	"employee_number": "43515"
}
```

Expected response:

```
{
   "name": "kim",
   "employee_number": 43515
}
```

_List technicians_
GET expected response:

```
{
	"technicians": [
		{
			"name": "Kim",
			"employee_number": 43515
		}
```

2 - _Create services_:
http://localhost:8080/api/services/
POST:

```
{
	"vin": "JSNGKJ2131",
	"owner": "Fred K.",
	"appointment_time": "2022-05-11",
	"technician": "84655",
	"service_reason": "oil change",
	"if_finished": false
}
```

Expected Response:

```
{
	"vin": "JSNGKJ2131",
	"owner": "Fred K.",
	"appointment_time": "2022-05-11",
	"service_reason": "oil change",
	"if_finished": false,
	"id": 10,
	"is_vip": true,
	"technician": {
		"name": "Van",
		"number": 84655
	}
}
```

_List services_
GET expected response:

```
{
   "services": [
      {
         "vin": "JSNGKJ2131",
         "owner": "Fred K.",
         "appointment_time": "2022-05-11T10:00:00+00:00",
         "service_reason": "il change",
         "if_finished": false,
         "id": 10,
         "is_vip": true,
         "technician": {
            "name": "Van"
         }
      }
```

_Delete a service_:
http://localhost:8080/api/services/<int:pk>/
DELETE:
Expected response:

```
{
	"deleted": true
}
```

### _Inventory_

**Manufacturers**
Action | Method | URL
------------ | ------------- | -------------
_List manufacturers_ | GET | http://localhost:8100/api/manufacturers/
_Create a manufacturer_ | POST | http://localhost:8100/api/manufacturers/
_Get a specific manufacturer_ | GET | http://localhost:8100/api/manufacturers/:id/
_Update a specific manufacturer_ | PUT | http://localhost:8100/api/manufacturers/:id/
_Delete a specific manufacturer_ | DELETE | http://localhost:8100/api/manufacturers/:id/

Creating and updating a manufacturer requires only the manufacturer's name.

```
{
  "name": "Chrysler"
}
```

The return value of creating, getting, and updating a single manufacturer is its name, href, and id.

```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.

```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

**Vehicle models**
Action | Method | URL
------------ | ------------- | -------------
_List vehicle models_ | GET |http://localhost:8100/api/models/
_Create a vehicle model_ | POST |http://localhost:8100/api/models/
_Get a specific vehicle model_ | GET | http://localhost:8100/api/models/:id/
_Update a specific vehicle model_ | PUT | http://localhost:8100/api/models/:id/
_Delete a specific vehicle model_ | DELETE | http://localhost:8100/api/models/:id/

Creating and updating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.

```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

Updating a vehicle model can take the name and/or the picture URL.

```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```

Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.

```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```

Getting a list of vehicle models returns a list of the detail information with the key "models".

```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

**Automobiles**
Action | Method | URL
------------ | ------------- | -------------
_List automobiles_ | GET | http://localhost:8100/api/automobiles/
_Create an automobile_ | POST | http://localhost:8100/api/automobiles/
_Get a specific automobile_ | GET | http://localhost:8100/api/automobiles/:vin/
_Update a specific automobile_ | PUT | http://localhost:8100/api/automobiles/:vin/
_Delete a specific automobile_ | DELETE | http://localhost:8100/api/automobiles/:vin/

You can create an automobile with the below:

```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

To get the details of a car, use the VIN:
http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```

To update the color and/or year:

```
{
  "color": "red",
  "year": 2012
}
```

Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information:

```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}
```

> Thanks for reading! :smile: