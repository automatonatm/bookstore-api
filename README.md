
## Book App API(NestJs)

## Getting Started

### Prerequisites

- Node.js (>= 18.x)
- npm (>= 8.x)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Documentation
 - To access the documentation
[localhost:500/api/docs](localhost:500/api/doc)




## Books Database

```sql
/*
-- Query: SELECT * FROM book_store_db.books
LIMIT 0, 10

-- Date: 2024-07-29 07:09
*/
INSERT INTO `books` (`id`,`title`,`author`,`genre`,`price`,`stock`,`version`,`createdAt`,`updatedAt`) VALUES (41,'The Great Gatsby','F. Scott Fitzgerald','FICTION',11,50,0,'2024-07-27 22:32:46','2024-07-27 22:32:46');
INSERT INTO `books` (`id`,`title`,`author`,`genre`,`price`,`stock`,`version`,`createdAt`,`updatedAt`) VALUES (141,'The Hobbit','J.R.R. Tolkien','FANTASY',15,100,0,'2024-07-27 21:50:22','2024-07-27 21:50:22');
INSERT INTO `books` (`id`,`title`,`author`,`genre`,`price`,`stock`,`version`,`createdAt`,`updatedAt`) VALUES (142,'1984','George Orwell','FANTASY',12,200,0,'2024-07-27 21:50:22','2024-07-27 21:50:22');
INSERT INTO `books` (`id`,`title`,`author`,`genre`,`price`,`stock`,`version`,`createdAt`,`updatedAt`) VALUES (143,'To Kill a Mockingbird','Harper Lee','FICTION',10,150,0,'2024-07-27 21:50:22','2024-07-27 21:50:22');
INSERT INTO `books` (`id`,`title`,`author`,`genre`,`price`,`stock`,`version`,`createdAt`,`updatedAt`) VALUES (144,'The Great Gatsby','F. Scott Fitzgerald','FANTASY',8,80,0,'2024-07-27 21:50:22','2024-07-27 21:50:22');
INSERT INTO `books` (`id`,`title`,`author`,`genre`,`price`,`stock`,`version`,`createdAt`,`updatedAt`) VALUES (145,'Pride and Prejudice','Jane Austen','ROMANCE',9,75,0,'2024-07-27 21:50:22','2024-07-28 23:58:32');
INSERT INTO `books` (`id`,`title`,`author`,`genre`,`price`,`stock`,`version`,`createdAt`,`updatedAt`) VALUES (146,'The Catcher in the Rye','J.D. Salinger','FICTION',11,42,0,'2024-07-27 21:50:22','2024-07-28 23:58:32');
INSERT INTO `books` (`id`,`title`,`author`,`genre`,`price`,`stock`,`version`,`createdAt`,`updatedAt`) VALUES (147,'Harry Potter and the Sorcerer\'s Stone','J.K. Rowling','FANTASY',20,300,0,'2024-07-27 21:50:22','2024-07-27 21:50:22');
INSERT INTO `books` (`id`,`title`,`author`,`genre`,`price`,`stock`,`version`,`createdAt`,`updatedAt`) VALUES (148,'The Lord of the Rings','J.R.R. Tolkien','FANTASY',25,120,0,'2024-07-27 21:50:22','2024-07-27 21:50:22');
INSERT INTO `books` (`id`,`title`,`author`,`genre`,`price`,`stock`,`version`,`createdAt`,`updatedAt`) VALUES (149,'Animal Farm','George Orwell','FANTASY',7,130,0,'2024-07-27 21:50:22','2024-07-27 21:50:22');

```
