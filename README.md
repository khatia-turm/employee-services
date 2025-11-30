User Stories checked:

1. created JSON file with mocked data for all users
2. used fetch API to retrieve said data
3. rendered users
4. implemented switch between layours using JS, both list view and grid view
5.
6.
7.
8. implement basic search

- i do retrieve data with id, first name, last name
- having problems with switching between two pages
- user details doesn't load, have to find out how to get id from URL and display them with that id

to do list for monday:

- handleUSerSearch gets values from form fields and switches to detailed page with retrieved id, if one exists
- btnBasicSubmit?.addEventListener calls handleUserSearch
- displayDetailedUser has template literal for html and inserts it before end of userDetails container on userDetails.html
- loadUserDetails -> this should get id from changed url and call displayUserDetails with that id and i need to fix issues with it, because it doesn't load anything
- something's wrong with the flow of program and i need to write details down about plan how it should all function, data flow
